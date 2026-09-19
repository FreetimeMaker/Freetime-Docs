import fs from 'node:fs'
import path from 'node:path'

const version = process.argv[2]

if (!version) {
  console.error('Usage: npm run docs:version -- <version>')
  process.exit(1)
}

if (!/^[0-9A-Za-z._-]+$/.test(version)) {
  console.error('Version may only contain letters, numbers, dots, underscores and hyphens.')
  process.exit(1)
}

const root = process.cwd()
const docsDir = path.join(root, 'docs')
const versionsDir = path.join(docsDir, 'versions')
const targetDir = path.join(versionsDir, version)
const metadataPath = path.join(docsDir, 'versions.json')
const versionsIndexPath = path.join(versionsDir, 'index.md')

if (fs.existsSync(targetDir)) {
  console.error(`Version ${version} already exists at ${targetDir}`)
  process.exit(1)
}

const excludedTopLevel = new Set(['.vitepress', 'versions'])

fs.mkdirSync(targetDir, { recursive: true })

for (const entry of fs.readdirSync(docsDir, { withFileTypes: true })) {
  if (excludedTopLevel.has(entry.name)) continue
  if (entry.name === 'versions.json') continue

  const source = path.join(docsDir, entry.name)
  const destination = path.join(targetDir, entry.name)

  fs.cpSync(source, destination, {
    recursive: true,
    errorOnExist: true
  })
}

let metadata = { current: version, versions: [] }

if (fs.existsSync(metadataPath)) {
  metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
}

const previousCurrent = metadata.current
metadata.versions = Array.from(new Set([version, ...(metadata.versions ?? [])]))
metadata.current = previousCurrent || version

fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2) + '\n')

const versionLinks = metadata.versions
  .map((item) => `- [Docs ${item}](/versions/${item}/)`)
  .join('\n')

const indexContent = `# Documentation versions

The current documentation is always available from the normal site paths.

Archived snapshots are stored under \`/versions/<version>/\`.

<!-- versions:start -->
${versionLinks || '_No archived versions yet._'}
<!-- versions:end -->
`

fs.writeFileSync(versionsIndexPath, indexContent)

console.log(`Created documentation snapshot: ${version}`)
console.log(`Path: docs/versions/${version}/`)
