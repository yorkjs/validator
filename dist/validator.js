/**
 * validator.js v0.0.4
 * (c) 2021-2022 musicode
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Validator = {}));
}(this, (function (exports) { 'use strict';

  var ref = Object.prototype;
  var toString = ref.toString;
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
          return 'type';
      }
      var length = value.length;
      if (rule.min !== undefined && length < rule.min) {
          return 'min';
      }
      if (rule.max !== undefined && length > rule.max) {
          return 'max';
      }
      var itemType = rule.itemType;
      if (!itemType) {
          return;
      }
      for (var i = 0; i < length; i++) {
          if (getType(value[i]) !== itemType) {
              return 'itemType';
          }
      }
  }

  function checkBoolean(rule, value) {
      if (typeof value !== 'boolean') {
          return 'type';
      }
      if (rule.value !== undefined
          && rule.value !== value) {
          return 'value';
      }
  }

  function checkString(rule, value) {
      if (typeof value !== 'string') {
          return 'type';
      }
      if (value === '') {
          // 是否允许为空，默认不允许
          if (rule.empty === true) {
              return;
          }
          return 'empty';
      }
      if (rule.min !== undefined && value.length < rule.min) {
          return 'min';
      }
      if (rule.max !== undefined && value.length > rule.max) {
          return 'max';
      }
      if (rule.pattern !== undefined && !rule.pattern.test(value)) {
          return 'pattern';
      }
      if (rule.custom !== undefined) {
          var result = rule.custom(value);
          if (result) {
              return result;
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
          pattern: PATTERN_DATE,
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
          pattern: PATTERN_DATE_TIME,
      });
      return checkString(newRule, value);
  }

  function checkEnum(rule, value) {
      if (!Array.isArray(rule.values) || rule.values.indexOf(value) < 0) {
          return 'type';
      }
  }

  function checkInteger(rule, value) {
      if (typeof value !== 'number' || value % 1 !== 0) {
          return 'type';
      }
      if (rule.min !== undefined && value < rule.min) {
          return 'min';
      }
      if (rule.max !== undefined && value > rule.max) {
          return 'max';
      }
  }

  function checkNumber(rule, value) {
      if (typeof value !== 'number' || isNaN(value)) {
          return 'type';
      }
      if (rule.min !== undefined && value < rule.min) {
          return 'min';
      }
      if (rule.max !== undefined && value > rule.max) {
          return 'max';
      }
      if (rule.precision !== undefined) {
          var parts = ('' + value).split('.');
          if (parts.length === 2 && parts[1].length > rule.precision) {
              return 'precision';
          }
      }
  }

  function checkObject(_, value) {
      if (!isObject(value)) {
          return 'type';
      }
  }

  var Validator = function() {
      this.rules = {
          int: checkInteger,
          integer: checkInteger,
          number: checkNumber,
          string: checkString,
          bool: checkBoolean,
          boolean: checkBoolean,
          enum: checkEnum,
          array: checkArray,
          object: checkObject,
          date: checkDate,
          dateTime: checkDateTime,
      };
      this.messages = {};
  };
  Validator.prototype.add = function (name, handler, message) {
      if (isObject(name)) {
          Object.assign(this.rules, name);
          if (isObject(handler)) {
              Object.assign(this.messages, handler);
          }
      }
      else {
          this.rules[name] = handler;
          this.messages[name] = message;
      }
  };
  Validator.prototype.validate = function (data, rules, messages) {
      var errors;
      for (var key in rules) {
          var value = rules[key];
          var rule = (void 0);
          switch (getType(value)) {
              case 'string':
                  rule = {
                      type: value,
                  };
                  break;
              case 'array':
                  rule = {
                      type: 'enum',
                      values: value,
                  };
                  break;
              case 'regexp':
                  rule = {
                      type: 'string',
                      pattern: value,
                  };
                  break;
              default:
                  rule = value;
                  break;
          }
          if (!isObject(rule) || !rule.type) {
              throw new Error((key + "'s rule is not found."));
          }
          var reason = (void 0);
          if (data[key] !== undefined) {
              reason = this.rules[rule.type](rule, data[key], data);
          }
          else {
              // 默认必传
              if (rule.required !== false) {
                  reason = 'required';
              }
              else {
                  continue;
              }
          }
          if (reason) {
              var message = messages && messages[key] && messages[key][reason];
              if (typeof message !== 'string' && typeof message !== 'function') {
                  message = this.messages[rule.type] && this.messages[rule.type][reason];
              }
              if (!errors) {
                  errors = {};
              }
              switch (typeof message) {
                  case 'string':
                      errors[key] = message;
                      break;
                  case 'function':
                      errors[key] = message(rule);
                      break;
                  default:
                      errors[key] = reason;
                      break;
              }
          }
      }
      return errors;
  };
  /**
   * 版本
   */
  var version = "0.0.4";

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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=validator.js.map
