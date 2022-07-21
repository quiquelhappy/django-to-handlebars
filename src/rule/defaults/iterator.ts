import { rule } from "../rule";

// {% for o in some_list %}
const FOR_START: rule = {
    regex: /{%\s*for\s{1,}[a-zA-Z0-9_]\s{1,}in\s{1,}([a-zA-Z0-9_]*(?:\.[\w]+)*\s*)%}/g,
    replace: new Map()
        .set(/{%\s*for\s{1,}[a-zA-Z0-9_]\s{1,}in\s{1,}/g, '{{#each ')
        .set(/\s*%}/g, '}}')
}

const FOR_END: rule = {
    regex: /{%\s*endfor\s*%}/g,
    replace: new Map()
        .set(/.*/, '{{/each}}')
}

export const ITERATOR = [FOR_START, FOR_END]