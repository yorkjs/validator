export interface Rule {
  type: string
  required?: boolean
}

export interface ArrayRule extends Rule {
  min?: number
  max?: number
  itemType?: string
}

export interface BooleanRule extends Rule {
  value?: boolean
}

export interface EnumRule extends Rule {
  values?: any[]
}

export interface IntegerRule extends Rule {
  min?: number
  max?: number
}

export interface NumberRule extends Rule {
  min?: number
  max?: number
  precision?: number
}

export interface StringRule extends Rule {
  empty?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: string) => string | void
}

type MessageGenerator = (rule: Rule) => string

export type Message = Record<string, string | MessageGenerator>

export type Handler = (rule: ArrayRule | BooleanRule | EnumRule | IntegerRule | NumberRule | StringRule, value: any, data?: Record<string, any>) => string | undefined
