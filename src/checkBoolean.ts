import {
  BooleanRule
} from './type'

export function checkBoolean(rule: BooleanRule, value: any) {

  if (typeof value !== 'boolean') {
    return 'type'
  }

  if (rule.value !== undefined
    && rule.value !== value
  ) {
    return 'value'
  }

}