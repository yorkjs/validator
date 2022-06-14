import {
  NumberRule
} from './type'

export function checkNumber(rule: NumberRule, value: any) {
  if (typeof value !== 'number' || isNaN(value)) {
    return {
      rule,
      reason: 'type',
    }
  }

  if (rule.min !== undefined && value < rule.min) {
    return {
      rule,
      reason: 'min',
    }
  }

  if (rule.max !== undefined && value > rule.max) {
    return {
      rule,
      reason: 'max',
    }
  }

  if (rule.precision !== undefined) {
    const parts = ('' + value).split('.')
    if (parts.length === 2 && parts[1].length > rule.precision) {
      return {
        rule,
        reason: 'precision',
      }
    }
  }
}