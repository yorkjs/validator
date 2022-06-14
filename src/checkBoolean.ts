import {
  BooleanRule
} from './type'

export function checkBoolean(rule: BooleanRule, value: any) {

  if (typeof value !== 'boolean') {
    return {
      rule,
      reason: 'type',
    }
  }

  if (rule.value !== undefined
    && rule.value !== value
  ) {
    return {
      rule,
      reason: 'value',
    }
  }

}