import { BooleanRule } from './type';
export declare function checkBoolean(rule: BooleanRule, value: any): {
    rule: BooleanRule;
    reason: string;
} | undefined;
