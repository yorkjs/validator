import { checkArray } from './checkArray'
import { checkBoolean } from './checkBoolean'
import { checkDate } from './checkDate'
import { checkDateTime } from './checkDateTime'
import { checkEnum } from './checkEnum'
import { checkInteger } from './checkInteger'
import { checkNumber } from './checkNumber'
import { checkObject } from './checkObject'
import { checkString } from './checkString'

import {
  extend,
  getType,
  isObject
} from './util'

import {
  Rule,
  ArrayRule,
  BooleanRule,
  EnumRule,
  IntegerRule,
  NumberRule,
  StringRule,
  CheckResult,
  Message,
  Handler,
} from './type'

class Validator {

  rules: Record<string, Handler>

  messages: Record<string, Message>

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
    }
    this.messages = { }
  }

  add(name: string | Record<string, Handler>, handler: Handler | Record<string, Message>, message: Message) {

    if (isObject(name)) {
      extend(this.rules, name as Record<string, Handler>)
      if (isObject(handler)) {
        extend(this.messages, handler as Record<string, Message>)
      }
    }
    else {
      this.rules[ name as string ] = handler as Handler
      this.messages[ name as string ] = message
    }

  }

  validate(data: Record<string, any>, rules: Record<string, string | any[] | RegExp | ArrayRule | BooleanRule | EnumRule | IntegerRule | NumberRule | StringRule>, messages?: Record<string, Message>) {

    let errors: Record<string, string> | void

    for (let key in rules) {

      const value = rules[key]

      let rule: Rule

      switch (getType(value)) {
        case 'string':
          rule = {
            type: value as string,
          }
          break

        case 'array':
          rule = {
            type: 'enum',
            values: value as any[],
          } as EnumRule
          break

        case 'regexp':
          rule = {
            type: 'string',
            pattern: value as RegExp,
          } as StringRule
          break

        default:
          rule = value as Rule
          break
      }

      if (!isObject(rule) || !rule.type) {
        throw new Error(`${key}'s rule is not found.`)
      }

      let checkResult: CheckResult | void

      if (data[key] !== undefined) {
        checkResult = this.rules[ rule.type ](rule, data[ key ], data)
      }
      else {
        // 默认必传
        if (rule.required !== false) {
          checkResult = {
            rule,
            reason: 'required',
          }
        }
        else {
          continue
        }
      }

      if (checkResult) {

        let message = messages && messages[ key ] && messages[ key ][ checkResult.reason ]
        if (typeof message !== 'string' && typeof message !== 'function') {
          message = this.messages[ rule.type ] && this.messages[ rule.type ][ checkResult.reason ]
        }

        if (!errors) {
          errors = {}
        }

        switch (typeof message) {
          case 'string':
            errors[key] = message
            break

          case 'function':
            errors[key] = message(checkResult.rule)
            break

          default:
            errors[key] = checkResult.reason
            break
        }

      }

    }

    return errors

  }

}

/**
 * 版本
 */
const version = process.env.NODE_VERSION

export {
  Validator,
  checkArray,
  checkBoolean,
  checkDate,
  checkDateTime,
  checkEnum,
  checkInteger,
  checkNumber,
  checkObject,
  checkString,
  version,
}