import { ArrayRule } from './type';
export declare function checkArray(rule: ArrayRule, value: any): {
    rule: ArrayRule;
    reason: string;
} | undefined;
