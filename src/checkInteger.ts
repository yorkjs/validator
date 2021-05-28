import {
  IntegerRule
} from './type'

export function checkInteger(rule: IntegerRule, value: any) {
  if (typeof value !== 'number' || value % 1 !== 0) {
    return 'type'
  }

  if (rule.min !== undefined && value < rule.min) {
    return 'min'
  }

  if (rule.max !== undefined && value > rule.max) {
    return 'max'
  }
}