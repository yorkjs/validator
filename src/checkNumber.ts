import {
  NumberRule
} from './type'

export function checkNumber(rule: NumberRule, value: any) {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'type'
  }

  if (rule.min !== undefined && value < rule.min) {
    return 'min'
  }

  if (rule.max !== undefined && value > rule.max) {
    return 'max'
  }

  if (rule.precision !== undefined) {
    const parts = ('' + value).split('.')
    if (parts.length === 2 && parts[1].length > rule.precision) {
      return 'precision'
    }
  }
}