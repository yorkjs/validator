import { checkArray } from './checkArray';
import { checkBoolean } from './checkBoolean';
import { checkDate } from './checkDate';
import { checkDateTime } from './checkDateTime';
import { checkEnum } from './checkEnum';
import { checkInteger } from './checkInteger';
import { checkNumber } from './checkNumber';
import { checkObject } from './checkObject';
import { checkString } from './checkString';
import { ArrayRule, BooleanRule, EnumRule, IntegerRule, NumberRule, StringRule, Message, Handler } from './type';
declare class Validator {
    rules: Record<string, Handler>;
    messages: Record<string, Message>;
    constructor();
    add(name: string | Record<string, Handler>, handler: Handler | Record<string, Message>, message: Message): void;
    validate(data: Record<string, any>, rules: Record<string, string | any[] | RegExp | ArrayRule | BooleanRule | EnumRule | IntegerRule | NumberRule | StringRule>, messages?: Record<string, Message>): void | Record<string, string>;
}
/**
 * 版本
 */
declare const version = "0.0.2";
export { Validator, checkArray, checkBoolean, checkDate, checkDateTime, checkEnum, checkInteger, checkNumber, checkObject, checkString, version, };
