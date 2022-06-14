import {
  getType
} from './util'

import {
  ArrayRule
} from './type'

export function checkArray(rule: ArrayRule, value: any) {

  if (!Array.isArray(value)) {
    return {
      rule,
      reason: 'type',
    }
  }

  const { length } = value

  if (rule.min !== undefined && length < rule.min) {
    return {
      rule,
      reason: 'min',
    }
  }

  if (rule.max !== undefined && length > rule.max) {
    return {
      rule,
      reason: 'max',
    }
  }

  const { itemType } = rule
  if (!itemType) {
    return
  }

  for (let i = 0; i < length; i++) {
    if (getType(value[ i ]) !== itemType) {
      return {
        rule,
        reason: 'itemType',
      }
    }
  }

}