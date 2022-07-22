import Transpiler from "../src/Transpiler";
import fs from "fs/promises"
import path from "path"

(async () => {
    await fs.rm('./test/output', {
        recursive: true,
        force: true
    })

    // test folders
    
    await outputTest("craftingstore/Templates/default/", "craftingstore")

})()

// -----------------------------------------------------------------------

const transpiler = new Transpiler()

async function getFiles(dir: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function testFolder(folderpath: string): Promise<Map<string, string>> {
    const files = await getFiles(`./test/${folderpath}`)
    const result = new Map<string, string>()
    for (const filepath of files) {
        const key = './' + path.relative(__dirname, filepath).replace(/\\/g, '/').replace(folderpath, '')
        result.set(key, transpiler.convert(await fs.readFile(filepath, {
            encoding: 'utf8'
        })))
    }
    return result
}

async function outputTest(folderpath: string, unitName: string) {
    const result = await testFolder(folderpath)
    result.forEach(async (content, outputPath) => {
        const finalPath = `./test/output/${unitName}${outputPath.replace('./', '/')}`
        await fs.mkdir(path.dirname(finalPath), {
            recursive: true
        })
        fs.writeFile(finalPath.replace(/.html$/, '.handlebars'), content, {
            encoding: 'utf8'
        })
    });
}