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
  getType,
  isObject
} from './util'

import {
  Rule,
  EnumRule,
  StringRule,
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
      Object.assign(this.rules, name)
      if (isObject(handler)) {
        Object.assign(this.messages, handler)
      }
    }
    else {
      this.rules[ name as string ] = handler as Handler
      this.messages[ name as string ] = message
    }

  }

  validate(data: Record<string, any>, rules: Record<string, string | any[] | RegExp | Rule>, messages: Record<string, Message>) {

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

      let reason: string | void

      if (data.hasOwnProperty(key)) {
        reason = this.rules[ rule.type ](rule, data[ key ], data)
      }
      else {
        // 默认必传
        if (rule.required !== false) {
          reason = 'required'
        }
        else {
          continue
        }
      }

      if (reason) {

        let message = messages && messages[ key ] && messages[ key ][ reason ]
        if (typeof message !== 'string') {
          message = this.messages[ rule.type ] && this.messages[ rule.type ][ reason ]
        }

        if (!errors) {
          errors = {}
        }
        errors[key] = typeof message === 'string' ? message : reason

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