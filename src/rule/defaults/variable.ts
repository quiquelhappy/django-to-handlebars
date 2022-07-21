import { rule } from "../rule";

/**
 * removes whitespace from variables as shown on
 * the lang examples. doesn't really matter, but
 * let's follow the standard!
 */

export const VARIABLE: rule = {
    regex: /{{(\s*[a-zA-Z0-9_]*(?:\.[\w-]+)*\s*)}}/g,
    replace: new Map()
        .set(/\s*/g, '')
}