import { rule, ruleGroup } from "../rule";

const IF_START: rule = {
    regex: /{%\s*if\s{1,}([a-zA-Z0-9_]*(?:\.[\w]+)*\s*)%}/g,
    replace: new Map()
        .set(/{%\s*/g, '{{#')
        .set(/\s*%}/g, '}}')
}

const IF_ELSE: rule = {
    regex: /{%\s*else\s*%}/g,
    replace: new Map()
        .set(/.*/, '{{else}}')
}

const IF_END: rule = {
    regex: /{%\s*endif\s*%}/g,
    replace: new Map()
        .set(/.*/, '{{/if}}')
}

export const IF: ruleGroup = {
    rules: [IF_START, IF_ELSE, IF_END]
}