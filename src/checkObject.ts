import {
  isObject,
} from './util'

import {
  Rule
} from './type'

export function checkObject(rule: Rule, value: any) {
  if (!isObject(value)) {
    return {
      rule,
      reason: 'type',
    }
  }
}