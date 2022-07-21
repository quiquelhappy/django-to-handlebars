import { COMMENT } from "./defaults/comment"
import { IF } from "./defaults/If"
import { ITERATOR } from "./defaults/iterator"
import { VARIABLE } from "./defaults/Variable"

export type rule = {
    regex: RegExp,
    replace: Map<RegExp, string>
}

export const DEFAULTS: rule[] = [...COMMENT, ...IF, ...ITERATOR, VARIABLE]