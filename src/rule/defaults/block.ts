import { ruleGroup } from "../rule";

// requires https://github.com/shannonmoeller/handlebars-layouts

export const BLOCK: ruleGroup = {
    rules: [
        {
            regex: /{%\s*block\s{1,}([a-zA-Z0-9_]*\s*)%}/g,
            replace: new Map()
                .set(/{%\s*block\s{1,}/, '{{#block ')
                .set(/\s*%}/g, '}}')
        },
        {
            regex: /{%\s*endblock\s*%}/g,
            replace: new Map()
                .set(/.*/, '{{/block}}')
        },
    ]
}