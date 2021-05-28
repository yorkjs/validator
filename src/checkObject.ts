import {
  isObject,
} from './util'

import {
  Rule
} from './type'

export function checkObject(_: Rule, value: any) {
  if (!isObject(value)) {
    return 'type'
  }
}