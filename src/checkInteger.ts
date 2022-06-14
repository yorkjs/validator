import {
  IntegerRule
} from './type'

export function checkInteger(rule: IntegerRule, value: any) {
  if (typeof value !== 'number' || value % 1 !== 0) {
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
}