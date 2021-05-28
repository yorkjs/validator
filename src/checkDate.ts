import {
  checkString
} from './checkString'

import {
  StringRule
} from './type'

// 日期的格式： 2019-11-11
const PATTERN_DATE = /^\d{4}\-\d{2}\-\d{2}$/

export function checkDate(rule: StringRule, value: any) {

  const newRule = { }

  Object.assign(newRule, rule)
  Object.assign(
    newRule,
    {
      type: 'string',
      pattern: PATTERN_DATE,
    }
  )

  return checkString(newRule as StringRule, value)

}