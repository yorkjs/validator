import {
  StringRule
} from './type'

export function checkString(rule: StringRule, value: any) {

  if (typeof value !== 'string') {
    return {
      rule,
      reason: 'type',
    }
  }

  if (value === '') {
    // 是否允许为空，默认不允许
    if (rule.empty === true) {
      return
    }
    return {
      rule,
      reason: 'empty',
    }
  }

  if (rule.min !== undefined && value.length < rule.min) {
    return {
      rule,
      reason: 'min',
    }
  }

  if (rule.max !== undefined && value.length > rule.max) {
    return {
      rule,
      reason: 'max',
    }
  }

  if (rule.pattern !== undefined && !rule.pattern.test(value)) {
    return {
      rule,
      reason: 'pattern',
    }
  }

  if (rule.custom !== undefined) {
    const reason = rule.custom(value)
    if (reason) {
      return {
        rule,
        reason,
      }
    }
  }

}