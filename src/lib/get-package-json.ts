import * as fs from 'fs/promises'

interface PackageMetrics {
  name: string
  description: string
  version: string
}

let cache: PackageMetrics | null = null

export async function getPackageJson(): Promise<PackageMetrics> {
  if (cache !== null) return cache

  const packageJson = await fs.readFile('./package.json', 'utf-8')
  const parsed = JSON.parse(packageJson)

  const result: PackageMetrics = {
    name: parsed.name,
    description: parsed.description,
    version: parsed.version
  }

  cache = result

  return result
}
