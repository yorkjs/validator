/**
 * validator.js v0.1.0
 * (c) 2021-2022 musicode
 * Released under the MIT License.
 */

const { toString } = Object.prototype;
function getType(value) {
    return toString.call(value).toLowerCase().slice(8, -1);
}
function isObject(value) {
    return value && getType(value) === 'object' ? true : false;
}
function extend(source, target) {
    for (let key in target) {
        source[key] = target[key];
    }
}

function checkArray(rule, value) {
    if (!Array.isArray(value)) {
        return {
            rule,
            reason: 'type',
        };
    }
    const { length } = value;
    if (rule.min !== undefined && length < rule.min) {
        return {
            rule,
            reason: 'min',
        };
    }
    if (rule.max !== undefined && length > rule.max) {
        return {
            rule,
            reason: 'max',
        };
    }
    const { itemType } = rule;
    if (!itemType) {
        return;
    }
    for (let i = 0; i < length; i++) {
        if (getType(value[i]) !== itemType) {
            return {
                rule,
                reason: 'itemType',
            };
        }
    }
}

function checkBoolean(rule, value) {
    if (typeof value !== 'boolean') {
        return {
            rule,
            reason: 'type',
        };
    }
    if (rule.value !== undefined
        && rule.value !== value) {
        return {
            rule,
            reason: 'value',
        };
    }
}

function checkString(rule, value) {
    if (typeof value !== 'string') {
        return {
            rule,
            reason: 'type',
        };
    }
    if (value === '') {
        // 是否允许为空，默认不允许
        if (rule.empty === true) {
            return;
        }
        return {
            rule,
            reason: 'empty',
        };
    }
    if (rule.min !== undefined && value.length < rule.min) {
        return {
            rule,
            reason: 'min',
        };
    }
    if (rule.max !== undefined && value.length > rule.max) {
        return {
            rule,
            reason: 'max',
        };
    }
    if (rule.pattern !== undefined && !rule.pattern.test(value)) {
        return {
            rule,
            reason: 'pattern',
        };
    }
    if (rule.custom !== undefined) {
        const reason = rule.custom(value);
        if (reason) {
            return {
                rule,
                reason,
            };
        }
    }
}

// 日期的格式： 2019-11-11
const PATTERN_DATE = /^\d{4}\-\d{2}\-\d{2}$/;
function checkDate(rule, value) {
    const newRule = {};
    extend(newRule, rule);
    extend(newRule, {
        type: 'string',
        pattern: PATTERN_DATE,
    });
    return checkString(newRule, value);
}

// 日期时间的格式：2019-11-11 11:11:11
const PATTERN_DATE_TIME = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/;
function checkDateTime(rule, value) {
    const newRule = {};
    extend(newRule, rule);
    extend(newRule, {
        type: 'string',
        pattern: PATTERN_DATE_TIME,
    });
    return checkString(newRule, value);
}

function checkEnum(rule, value) {
    if (!Array.isArray(rule.values) || rule.values.indexOf(value) < 0) {
        return {
            rule,
            reason: 'type',
        };
    }
}

function checkInteger(rule, value) {
    if (typeof value !== 'number' || value % 1 !== 0) {
        return {
            rule,
            reason: 'type',
        };
    }
    if (rule.min !== undefined && value < rule.min) {
        return {
            rule,
            reason: 'min',
        };
    }
    if (rule.max !== undefined && value > rule.max) {
        return {
            rule,
            reason: 'max',
        };
    }
}

function checkNumber(rule, value) {
    if (typeof value !== 'number' || isNaN(value)) {
        return {
            rule,
            reason: 'type',
        };
    }
    if (rule.min !== undefined && value < rule.min) {
        return {
            rule,
            reason: 'min',
        };
    }
    if (rule.max !== undefined && value > rule.max) {
        return {
            rule,
            reason: 'max',
        };
    }
    if (rule.precision !== undefined) {
        const parts = ('' + value).split('.');
        if (parts.length === 2 && parts[1].length > rule.precision) {
            return {
                rule,
                reason: 'precision',
            };
        }
    }
}

function checkObject(rule, value) {
    if (!isObject(value)) {
        return {
            rule,
            reason: 'type',
        };
    }
}

class Validator {
    constructor() {
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
    }
    add(name, handler, message) {
        if (isObject(name)) {
            extend(this.rules, name);
            if (isObject(handler)) {
                extend(this.messages, handler);
            }
        }
        else {
            this.rules[name] = handler;
            this.messages[name] = message;
        }
    }
    validate(data, rules, messages) {
        let errors;
        for (let key in rules) {
            const value = rules[key];
            let rule;
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
                throw new Error(`${key}'s rule is not found.`);
            }
            let checkResult;
            if (data[key] !== undefined) {
                checkResult = this.rules[rule.type](rule, data[key], data);
            }
            else {
                // 默认必传
                if (rule.required !== false) {
                    checkResult = {
                        rule,
                        reason: 'required',
                    };
                }
                else {
                    continue;
                }
            }
            if (checkResult) {
                let message = messages && messages[key] && messages[key][checkResult.reason];
                if (typeof message !== 'string' && typeof message !== 'function') {
                    message = this.messages[rule.type] && this.messages[rule.type][checkResult.reason];
                }
                if (!errors) {
                    errors = {};
                }
                switch (typeof message) {
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
}
/**
 * 版本
 */
const version = "0.1.0";

export { Validator, checkArray, checkBoolean, checkDate, checkDateTime, checkEnum, checkInteger, checkNumber, checkObject, checkString, version };
//# sourceMappingURL=validator.esm.js.map
