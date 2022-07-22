import { rule, ruleGroup } from "../rule";

const SINGLE_LINE: rule = {
    regex: /{#\s*(.*)\s*#}/g,
    replace: new Map()
        .set(/{#\s*/g, '{{! ')
        .set(/\s*#}/g, '}}')
}

const MULTI_LINE_START: rule = {
    regex: /{%\s*comment(\s{1,}".*")?\s*%}/g,
    replace: new Map()
        .set(/.*/, '{{!--')
}

const MULTI_LINE_END: rule = {
    regex: /{%\s*endcomment\s*%}/g,
    replace: new Map()
        .set(/.*/, ' --}}')
}

export const COMMENT: ruleGroup = {
    rules: [SINGLE_LINE, MULTI_LINE_START, MULTI_LINE_END]
}