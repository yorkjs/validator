import {
  checkString
} from './checkString'

import {
  StringRule
} from './type'

// 日期时间的格式：2019-11-11 11:11:11
const PATTERN_DATE_TIME = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/

export function checkDateTime(rule: StringRule, value: any) {

  const newRule = { }

  Object.assign(newRule, rule)
  Object.assign(
    newRule,
    {
      type: 'string',
      pattern: PATTERN_DATE_TIME,
    }
  )

  return checkString(newRule as StringRule, value)

}