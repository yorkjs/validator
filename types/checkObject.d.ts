import { Rule } from './type';
export declare function checkObject(rule: Rule, value: any): {
    rule: Rule;
    reason: string;
} | undefined;
