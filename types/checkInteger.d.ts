import { IntegerRule } from './type';
export declare function checkInteger(rule: IntegerRule, value: any): {
    rule: IntegerRule;
    reason: string;
} | undefined;
