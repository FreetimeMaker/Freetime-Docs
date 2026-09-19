import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const source = resolve('static')
const destination = resolve('docs/public')

if (!existsSync(source)) {
  console.warn('No static directory found; skipping static asset sync.')
  process.exit(0)
}

mkdirSync(destination, { recursive: true })
cpSync(source, destination, { recursive: true, force: true })
console.log('Synced static assets to docs/public')
