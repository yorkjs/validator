import {
  getType
} from './util'

import {
  ArrayRule
} from './type'

export function checkArray(rule: ArrayRule, value: any) {

  if (!Array.isArray(value)) {
    return 'type'
  }

  const { length } = value

  if (rule.min !== undefined && length < rule.min) {
    return 'min'
  }

  if (rule.max !== undefined && length > rule.max) {
    return 'max'
  }

  const { itemType } = rule
  if (!itemType) {
    return
  }

  for (let i = 0; i < length; i++) {
    if (getType(value[ i ]) !== itemType) {
      return 'itemType'
    }
  }

}