import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { checkBuiltHtml, inspectHtml, validateMetadata } from './check-docs.mjs'

const metadata = () => ({
  projects: [{ slug: 'demo', name: 'Demo', icon: 'D', description: 'Demo project', source: 'Demo', tags: ['Web'], paths: [{ label: 'Start', path: 'getting-started', description: 'Setup' }], related: [] }],
  reviews: { demo: { reviewedAt: '2026-01-01', scope: 'Setup', sources: [{ repository: 'Demo', commit: 'a'.repeat(40), paths: ['src/main.ts'] }] } }
})
test('valid metadata', () => { const { projects, reviews } = metadata(); validateMetadata(projects, reviews) })
for (const [name, mutate, message] of [
  ['duplicate slug', (p) => p.push(p[0]), /duplicate/],
  ['missing description', p => delete p[0].description, /description/],
  ['missing entry paths', p => p[0].paths = [], /entry paths/],
  ['unsafe entry', p => p[0].paths[0].path = '../escape', /entry path/],
  ['missing related', p => delete p[0].related, /related/],
  ['unknown related', p => p[0].related = [{ slug: 'unknown', page: '', label: 'Other', reason: 'Integration' }], /related/],
  ['missing review', (p, r) => delete r.demo, /missing source review/],
  ['invalid calendar date', (p, r) => r.demo.reviewedAt = '2026-02-30', /reviewedAt/],
  ['short commit', (p, r) => r.demo.sources[0].commit = 'abc', /commit/],
  ['unsafe review path', (p, r) => r.demo.sources[0].paths = ['../secret'], /source paths/],
  ['missing scope', (p, r) => r.demo.scope = '', /scope/],
  ['unknown review', (p, r) => r.extra = r.demo, /unknown project/]
]) test(`rejects ${name}`, () => { const { projects, reviews } = metadata(); mutate(projects, reviews); assert.throws(() => validateMetadata(projects, reviews), message) })

test('HTML parser handles entities, unquoted attributes and decorative alt', () => {
  const doc = inspectHtml('<h1 id="a&amp;b">Title</h1><img alt="" src=x><a href="/#a&amp;b">go</a>')
  assert.ok(doc.ids.has('a&b'))
  assert.deepEqual(doc.errors, [])
  assert.ok(doc.references.some(r => r.value === '/#a&b'))
})
async function fixture(t, files) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'check-docs-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  for (const [name, html] of Object.entries(files)) { const file = path.join(dir, name); await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, html) }
  return dir
}
test('checks clean URLs, relative links, encoded hashes and ignores external URLs', async t => {
  const dir = await fixture(t, { 'index.html': '<a href="/guide/?q=1#hello%20world">Go</a><a href="https://example.invalid/no">External</a><a href="mailto:x@example.invalid">Mail</a>', 'guide/index.html': '<h1 id="hello world">Hello</h1><img src="../image.svg" alt=""><a href="../">Home</a>', 'image.svg': '<svg/>' })
  assert.deepEqual(await checkBuiltHtml(dir), [])
})
for (const [name, html, pattern] of [
  ['broken link', '<a href="/missing">Broken</a>', /missing internal target/],
  ['broken hash', '<a href="#missing">Broken</a>', /missing anchor/],
  ['missing alt', '<img src="/image.svg">', /missing alt/],
  ['broken image', '<img alt="test" src="/missing.png">', /missing internal target/],
  ['broken srcset', '<img alt="test" srcset="/missing.png 2x">', /missing internal target/]
]) test(name, async t => { const dir = await fixture(t, { 'index.html': html, 'image.svg': '<svg/>' }); assert.match((await checkBuiltHtml(dir)).join('\n'), pattern) })
test('checks metadata targets even if no HTML link points to them', async t => {
  const dir = await fixture(t, { 'index.html': '<h1>Home</h1>' })
  const { projects } = metadata()
  projects[0].related = [{ slug: 'other', page: 'integration', label: 'Other', reason: 'Integration' }]
  const errors = (await checkBuiltHtml(dir, projects)).join('\n')
  assert.match(errors, /\/projects\/demo\/getting-started/)
  assert.match(errors, /\/projects\/other\/integration/)
})
