import { EnumRule } from './type';
export declare function checkEnum(rule: EnumRule, value: any): {
    rule: EnumRule;
    reason: string;
} | undefined;
