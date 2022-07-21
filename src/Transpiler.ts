import { DEFAULTS, rule } from "./rule/rule";

export default class Transpiler {

    public readonly rules: rule[]

    constructor(rules: rule[] = DEFAULTS) {
        this.rules = rules
    }

    public convert(template: string): string {
        for (const rule of this.rules) {
            for (const match of template.match(rule.regex) ?? []) {
                let result = match
                rule.replace.forEach((value, regex) => {
                    result = result.replace(regex, value)
                })
                template = template.replace(match, result)
            }
        }
        return template
    }

}