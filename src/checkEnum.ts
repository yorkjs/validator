import {
  EnumRule
} from './type'

export function checkEnum(rule: EnumRule, value: any) {
  if (!Array.isArray(rule.values) || rule.values.indexOf(value) < 0) {
    return 'type'
  }
}