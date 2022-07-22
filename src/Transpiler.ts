import { DEFAULTS, rule, ruleGroup } from "./rule/rule";

export default class Transpiler {

    public readonly rules: ruleGroup[]

    constructor(rules: ruleGroup[] = DEFAULTS) {
        this.rules = rules
    }

    public convert(template: string): string {
        for (const ruleGroup of this.rules) {
            // TODO: context are group-specific
            for (const rule of ruleGroup.rules) {
                // variables are rule-specific
                for (const match of template.match(rule.regex) ?? []) {
                    let result = match
                    const variables = this.getVariables(match, rule)
                    rule.replace.forEach((value, regex) => {
                        result = result.replace(regex, value)
                    })
                    result = this.applySelector(result, variables, 'variable')
                    template = template.replace(match, result)
                }
            }
        }
        return template
    }

    applySelector(input: string, variables: Map<string, string>, selector: string): string {
        /* https://stackoverflow.com/a/55334886/7280257: not using replaceAll in order to
           prevent browser compatibility issues */

        variables.forEach((value, key) => {
            input = input.split(`$${selector}:${key}`).join(value);
        });
        return input
    }

    getVariables(match: string, rule: rule): Map<string, string> {
        const result = new Map<string, string>()
        if (rule.variables) {
            rule.variables.forEach((variable, key) => {
                const variableMatch = variable.regex.exec(match)
                if (variableMatch) {
                    result.set(key, variableMatch[variable.group] ?? variable.default)
                } else {
                    result.set(key, variable.default)
                }
            });
        }
        return result
    }

}