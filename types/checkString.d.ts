import { StringRule } from './type';
export declare function checkString(rule: StringRule, value: any): {
    rule: StringRule;
    reason: string;
} | undefined;
