import { COMMENT } from "./defaults/comment"
import { IF } from "./defaults/If"
import { INCLUDE } from "./defaults/include"
import { ITERATOR } from "./defaults/iterator"
import { VARIABLE } from "./defaults/Variable"

type variable = {
    regex: RegExp,
    group: number,
    default: string
}

export type rule = {
    regex: RegExp,
    replace: Map<RegExp, string>,
    variables?: Map<string, variable>,
}

export type ruleGroup = {
    rules: rule[],
}

export const DEFAULTS: ruleGroup[] = [COMMENT, IF, INCLUDE, ITERATOR, VARIABLE]