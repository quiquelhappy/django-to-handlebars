import { rule, ruleGroup } from "../rule";

// {% for o in some_list %}
const FOR_START: rule = {
    regex: /{%\s*for\s{1,}[a-zA-Z0-9_]*\s{1,}in\s{1,}([a-zA-Z0-9_]*(?:\.[\w]+)*\s*)%}/g,
    variables: new Map()
        .set('object', {
            regex: /{%\s*for\s{1,}([a-zA-Z0-9_]*(?:\.[\w]+)*)*?\s{1,}in/,
            group: 1
        }),
    replace: new Map()
        .set(/{%\s*for\s{1,}[a-zA-Z0-9_]*\s{1,}in\s{1,}/g, '{{#each ')
        .set(/\s*%}/, ' as | $variable:object |}}'),
}

const FOR_END: rule = {
    regex: /{%\s*endfor\s*%}/g,
    replace: new Map()
        .set(/.*/, '{{/each}}')
}

export const ITERATOR: ruleGroup = {
    rules: [FOR_START, FOR_END]
}