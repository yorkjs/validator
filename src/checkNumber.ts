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
}