import { NumberRule } from './type';
export declare function checkNumber(rule: NumberRule, value: any): {
    rule: NumberRule;
    reason: string;
} | undefined;
