import {
  StringRule
} from './type'

export function checkString(rule: StringRule, value: any) {

  if (typeof value !== 'string') {
    return 'type'
  }

  if (value === '') {
    // 是否允许为空，默认不允许
    if (rule.empty === true) {
      return
    }
    return 'empty'
  }

  if (rule.min !== undefined && value.length < rule.min) {
    return 'min'
  }

  if (rule.max !== undefined && value.length > rule.max) {
    return 'max'
  }

  if (rule.pattern !== undefined && !rule.pattern.test(value)) {
    return 'pattern'
  }

  if (rule.custom !== undefined) {
    const result = rule.custom(value)
    if (result) {
      return result
    }
  }

}