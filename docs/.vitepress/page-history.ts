// Config-time only: never import this module from the client theme.
import { execFileSync } from 'node:child_process'
import { realpathSync, statSync } from 'node:fs'
import path from 'node:path'

export interface PageHistoryEntry {
  hash: string
  subject: string
  author: string
  date: string
}

function sanitize(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').trim()
}

/** Read committed history for one docs Markdown source; never invent missing history. */
export function readPageHistory(repoRoot: string, relativeSourcePath: string, limit = 5): PageHistoryEntry[] {
  try {
    if (typeof repoRoot !== 'string' || typeof relativeSourcePath !== 'string'
      || !Number.isSafeInteger(limit) || limit < 1
      || !relativeSourcePath.startsWith('docs/') || !relativeSourcePath.endsWith('.md')
      || relativeSourcePath.includes('\\') || /[\u0000-\u001f\u007f]/.test(relativeSourcePath)
      || relativeSourcePath.split('/').some((part) => !part || part === '.' || part === '..')) return []

    const root = realpathSync(repoRoot)
    const docs = realpathSync(path.join(root, 'docs'))
    const source = realpathSync(path.join(root, relativeSourcePath))
    if (!statSync(root).isDirectory() || !statSync(source).isFile()
      || !docs.startsWith(root + path.sep) || !source.startsWith(docs + path.sep)) return []

    const git = (args: string[]) => execFileSync('git', ['--no-pager', ...args], {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 5000, maxBuffer: 1024 * 1024,
    })
    if (realpathSync(git(['rev-parse', '--show-toplevel']).trim()) !== root) return []
    // Literal pathspecs also prevent filenames containing glob syntax from selecting other pages.
    const output = git(['--literal-pathspecs', 'log', `-n${Math.min(limit, 5)}`,
      '--format=%H%x00%s%x00%an%x00%aI', '-z', '--', relativeSourcePath])
    const fields = output.split('\0')
    if (fields.at(-1) === '') fields.pop()
    if (fields.length % 4 !== 0) return []
    const history: PageHistoryEntry[] = []
    for (let index = 0; index < fields.length; index += 4) {
      const [hash, subject, author, date] = fields.slice(index, index + 4).map(sanitize)
      if (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(hash)
        || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(date)
        || !Number.isFinite(Date.parse(date))) continue
      history.push({ hash, subject, author, date })
    }
    return history
  } catch {
    // Missing Git, shallow/untracked sources, and unavailable repositories have no claims to show.
    return []
  }
}
