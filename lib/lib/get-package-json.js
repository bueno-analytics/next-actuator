import * as fs from 'fs/promises';
let cache = null;
export async function getPackageJson() {
    if (cache !== null)
        return cache;
    const packageJson = await fs.readFile('./package.json', 'utf-8');
    const parsed = JSON.parse(packageJson);
    const result = {
        name: parsed.name,
        description: parsed.description,
        version: parsed.version
    };
    cache = result;
    return result;
}
