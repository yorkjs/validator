/**
 * validator.js v0.1.0
 * (c) 2021-2025 musicode
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Validator = {}));
})(this, (function (exports) { 'use strict';

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  var toString = Object.prototype.toString;
  function getType(value) {
    return toString.call(value).toLowerCase().slice(8, -1);
  }
  function isObject(value) {
    return value && getType(value) === 'object' ? true : false;
  }
  function extend(source, target) {
    for (var key in target) {
      source[key] = target[key];
    }
  }

  function checkArray(rule, value) {
    if (!Array.isArray(value)) {
      return {
        rule: rule,
        reason: 'type'
      };
    }
    var length = value.length;
    if (rule.min !== undefined && length < rule.min) {
      return {
        rule: rule,
        reason: 'min'
      };
    }
    if (rule.max !== undefined && length > rule.max) {
      return {
        rule: rule,
        reason: 'max'
      };
    }
    var itemType = rule.itemType;
    if (!itemType) {
      return;
    }
    for (var i = 0; i < length; i++) {
      if (getType(value[i]) !== itemType) {
        return {
          rule: rule,
          reason: 'itemType'
        };
      }
    }
  }

  function checkBoolean(rule, value) {
    if (typeof value !== 'boolean') {
      return {
        rule: rule,
        reason: 'type'
      };
    }
    if (rule.value !== undefined && rule.value !== value) {
      return {
        rule: rule,
        reason: 'value'
      };
    }
  }

  function checkString(rule, value) {
    if (typeof value !== 'string') {
      return {
        rule: rule,
        reason: 'type'
      };
    }
    if (value === '') {
      // 是否允许为空，默认不允许
      if (rule.empty === true) {
        return;
      }
      return {
        rule: rule,
        reason: 'empty'
      };
    }
    if (rule.min !== undefined && value.length < rule.min) {
      return {
        rule: rule,
        reason: 'min'
      };
    }
    if (rule.max !== undefined && value.length > rule.max) {
      return {
        rule: rule,
        reason: 'max'
      };
    }
    if (rule.pattern !== undefined && !rule.pattern.test(value)) {
      return {
        rule: rule,
        reason: 'pattern'
      };
    }
    if (rule.custom !== undefined) {
      var reason = rule.custom(value);
      if (reason) {
        return {
          rule: rule,
          reason: reason
        };
      }
    }
  }

  // 日期的格式： 2019-11-11
  var PATTERN_DATE = /^\d{4}\-\d{2}\-\d{2}$/;
  function checkDate(rule, value) {
    var newRule = {};
    extend(newRule, rule);
    extend(newRule, {
      type: 'string',
      pattern: PATTERN_DATE
    });
    return checkString(newRule, value);
  }

  // 日期时间的格式：2019-11-11 11:11:11
  var PATTERN_DATE_TIME = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/;
  function checkDateTime(rule, value) {
    var newRule = {};
    extend(newRule, rule);
    extend(newRule, {
      type: 'string',
      pattern: PATTERN_DATE_TIME
    });
    return checkString(newRule, value);
  }

  function checkEnum(rule, value) {
    if (!Array.isArray(rule.values) || rule.values.indexOf(value) < 0) {
      return {
        rule: rule,
        reason: 'type'
      };
    }
  }

  function checkInteger(rule, value) {
    if (typeof value !== 'number' || value % 1 !== 0) {
      return {
        rule: rule,
        reason: 'type'
      };
    }
    if (rule.min !== undefined && value < rule.min) {
      return {
        rule: rule,
        reason: 'min'
      };
    }
    if (rule.max !== undefined && value > rule.max) {
      return {
        rule: rule,
        reason: 'max'
      };
    }
  }

  function checkNumber(rule, value) {
    if (typeof value !== 'number' || isNaN(value)) {
      return {
        rule: rule,
        reason: 'type'
      };
    }
    if (rule.min !== undefined && value < rule.min) {
      return {
        rule: rule,
        reason: 'min'
      };
    }
    if (rule.max !== undefined && value > rule.max) {
      return {
        rule: rule,
        reason: 'max'
      };
    }
    if (rule.precision !== undefined) {
      var parts = ('' + value).split('.');
      if (parts.length === 2 && parts[1].length > rule.precision) {
        return {
          rule: rule,
          reason: 'precision'
        };
      }
    }
  }

  function checkObject(rule, value) {
    if (!isObject(value)) {
      return {
        rule: rule,
        reason: 'type'
      };
    }
  }

  var Validator = /*#__PURE__*/function () {
    function Validator() {
      _classCallCheck(this, Validator);
      this.rules = {
        "int": checkInteger,
        integer: checkInteger,
        number: checkNumber,
        string: checkString,
        bool: checkBoolean,
        "boolean": checkBoolean,
        "enum": checkEnum,
        array: checkArray,
        object: checkObject,
        date: checkDate,
        dateTime: checkDateTime
      };
      this.messages = {};
    }
    return _createClass(Validator, [{
      key: "add",
      value: function add(name, handler, message) {
        if (isObject(name)) {
          extend(this.rules, name);
          if (isObject(handler)) {
            extend(this.messages, handler);
          }
        } else {
          this.rules[name] = handler;
          this.messages[name] = message;
        }
      }
    }, {
      key: "validate",
      value: function validate(data, rules, messages) {
        var errors = undefined;
        for (var key in rules) {
          var value = rules[key];
          var rule = void 0;
          switch (getType(value)) {
            case 'string':
              rule = {
                type: value
              };
              break;
            case 'array':
              rule = {
                type: 'enum',
                values: value
              };
              break;
            case 'regexp':
              rule = {
                type: 'string',
                pattern: value
              };
              break;
            default:
              rule = value;
              break;
          }
          if (!isObject(rule) || !rule.type) {
            throw new Error("".concat(key, "'s rule is not found."));
          }
          var checkResult = void 0;
          if (data[key] !== undefined) {
            checkResult = this.rules[rule.type](rule, data[key], data);
          } else {
            // 默认必传
            if (rule.required !== false) {
              checkResult = {
                rule: rule,
                reason: 'required'
              };
            } else {
              continue;
            }
          }
          if (checkResult) {
            var message = messages && messages[key] && messages[key][checkResult.reason];
            if (typeof message !== 'string' && typeof message !== 'function') {
              message = this.messages[rule.type] && this.messages[rule.type][checkResult.reason];
            }
            if (!errors) {
              errors = {};
            }
            switch (_typeof(message)) {
              case 'string':
                errors[key] = message;
                break;
              case 'function':
                errors[key] = message(checkResult.rule);
                break;
              default:
                errors[key] = checkResult.reason;
                break;
            }
          }
        }
        return errors;
      }
    }]);
  }();
  /**
   * 版本
   */
  var version = "0.1.0";

  exports.Validator = Validator;
  exports.checkArray = checkArray;
  exports.checkBoolean = checkBoolean;
  exports.checkDate = checkDate;
  exports.checkDateTime = checkDateTime;
  exports.checkEnum = checkEnum;
  exports.checkInteger = checkInteger;
  exports.checkNumber = checkNumber;
  exports.checkObject = checkObject;
  exports.checkString = checkString;
  exports.version = version;

}));
//# sourceMappingURL=validator.js.map
