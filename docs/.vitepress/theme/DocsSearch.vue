<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, useId, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import type MiniSearch from 'minisearch'
import type { SearchResult } from 'minisearch'

interface Document { title: string; titles: string[] }
type Result = SearchResult & Document & { href: string }
const { site } = useData()
const id = `docs-search-${useId()}`
const container = ref<HTMLElement>()
const input = ref<HTMLInputElement>()
const toggle = ref<HTMLButtonElement>()
const query = ref('')
const open = ref(false)
const mobileOpen = ref(false)
const loading = ref(false)
const error = ref('')
const selected = ref(-1)
const results = shallowRef<Result[]>([])
const visible = computed(() => open.value && !!query.value.trim())
let pending: Promise<MiniSearch<Document>> | undefined
let generation = 0
let returnFocus: HTMLElement | null = null

function loadIndex() {
  if (!pending) {
    pending = Promise.all([import('@localSearchIndex'), import('minisearch')])
      .then(async ([{ default: indexes }, { default: Search }]) => {
        const loader = indexes.root
        if (!loader) throw new Error('Root search index unavailable')
        return Search.loadJSON<Document>((await loader()).default, {
          fields: ['title', 'titles', 'text'],
          storeFields: ['title', 'titles'],
          searchOptions: { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
        })
      }).catch((reason: unknown) => { pending = undefined; throw reason })
  }
  return pending
}
function resultHref(value: string) {
  // Generated IDs already contain the base. Strip it before applying withBase once.
  const base = site.value.base
  const path = base !== '/' && value.startsWith(base) ? `/${value.slice(base.length)}` : value
  return withBase(path)
}
async function search() {
  const current = ++generation
  const text = query.value.trim()
  results.value = []
  selected.value = -1
  error.value = ''
  loading.value = !!text
  if (!text) return
  try {
    const index = await loadIndex()
    if (current !== generation) return
    results.value = (index.search(text).slice(0, 10) as (SearchResult & Document)[])
      .map(result => ({ ...result, href: resultHref(String(result.id)) }))
    selected.value = results.value.length ? 0 : -1
  } catch {
    if (current === generation) error.value = 'Search is unavailable. Please try again.'
  } finally {
    if (current === generation) loading.value = false
  }
}
watch(query, () => { open.value = true; void search() })
function focus() {
  open.value = true
  void loadIndex().catch(() => { /* A query retries loading and displays any error. */ })
}
async function activate() {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  mobileOpen.value = true
  open.value = true
  await nextTick()
  input.value?.focus()
}
function close(restore = false) {
  open.value = false
  if (mobileOpen.value) {
    mobileOpen.value = false
    if (restore) (returnFocus?.isConnected ? returnFocus : toggle.value)?.focus()
  } else if (restore) input.value?.focus()
}
function keydown(event: KeyboardEvent) {
  if (event.isComposing) return
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    close(true)
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    open.value = true
    const count = results.value.length
    if (!count) return
    selected.value = (selected.value + (event.key === 'ArrowDown' ? 1 : -1) + count) % count
    void nextTick(() => container.value?.querySelector<HTMLElement>(`[id="${id}-${selected.value}"]`)?.scrollIntoView({ block: 'nearest' }))
  } else if (event.key === 'Enter' && visible.value && selected.value >= 0) {
    event.preventDefault()
    container.value?.querySelector<HTMLAnchorElement>(`[id="${id}-${selected.value}"]`)?.click()
  }
}
function shortcut(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    void activate()
  }
}
function outside(event: PointerEvent) {
  if (!container.value?.contains(event.target as Node)) close()
}
function focusout(event: FocusEvent) {
  if (!container.value?.contains(event.relatedTarget as Node | null)) close()
}
onMounted(() => {
  document.addEventListener('keydown', shortcut)
  document.addEventListener('pointerdown', outside)
})
onBeforeUnmount(() => {
  generation++
  document.removeEventListener('keydown', shortcut)
  document.removeEventListener('pointerdown', outside)
})
</script>

<template>
  <div ref="container" class="docs-search" :class="{ 'is-mobile-open': mobileOpen }" @focusout="focusout" @keydown="keydown">
    <button ref="toggle" class="docs-search-toggle" type="button" aria-label="Search documentation" :aria-expanded="mobileOpen" :aria-controls="`${id}-field`" @click="activate">
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
    </button>
    <div :id="`${id}-field`" class="docs-search-field">
      <input ref="input" v-model="query" type="search" role="combobox" aria-label="Search documentation" placeholder="Search documentation" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-haspopup="listbox" :aria-expanded="visible" :aria-controls="`${id}-results`" :aria-activedescendant="visible && selected >= 0 ? `${id}-${selected}` : undefined" @focus="focus" @click="open = true" />
      <div v-show="visible" class="docs-search-results">
        <p v-if="loading" role="status">Searching…</p>
        <p v-else-if="error" role="status">{{ error }}</p>
        <p v-else-if="!results.length" role="status">No results found.</p>
        <ul :id="`${id}-results`" role="listbox" aria-label="Search results" :aria-busy="loading">
          <li v-for="(result, index) in results" :key="result.id" role="none">
            <a :id="`${id}-${index}`" :href="result.href" role="option" :aria-selected="selected === index" tabindex="-1" @pointermove="selected = index" @mousedown.prevent @click="close()">
              <small v-if="result.titles?.length">{{ result.titles.join(' › ') }}</small>
              <span>{{ result.title || 'Untitled section' }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.docs-search { position: relative; width: clamp(180px, 24vw, 340px); color: var(--vp-c-text-1); }
.docs-search input[type=search] { display: block; width: 100%; height: 38px; padding: 0 14px; border: 1px solid var(--vp-c-divider); border-radius: 7px; background: var(--vp-c-bg-soft); color: inherit; font: inherit; font-size: 14px; }
.docs-search input:focus { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.docs-search-results { position: absolute; top: calc(100% + 10px); right: 0; z-index: 100; width: min(440px, calc(100vw - 32px)); max-height: min(60vh, 480px); overflow-y: auto; overscroll-behavior: contain; padding: 6px; border: 1px solid var(--vp-c-divider); border-radius: 9px; background: var(--vp-c-bg); box-shadow: 0 12px 32px #0002; }
.docs-search-results ul { list-style: none; margin: 0; padding: 0; }
.docs-search-results a { display: flex; flex-direction: column; gap: 3px; padding: 10px 12px; border-radius: 5px; color: inherit; text-decoration: none; overflow-wrap: anywhere; }
.docs-search-results a[aria-selected=true] { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.docs-search-results a:focus-visible { outline: 2px solid var(--vp-c-brand-1); }
.docs-search-results small { color: var(--vp-c-text-2); font-size: 12px; }
.docs-search-results p { padding: 12px; margin: 0; font-size: 14px; color: var(--vp-c-text-2); }
.docs-search-toggle { display: none; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 6px; }
.docs-search-toggle:focus-visible { outline: 2px solid var(--vp-c-brand-1); }
@media (max-width: 767px) {
  .docs-search { width: 38px; position: static; }
  .docs-search-toggle { display: inline-flex; }
  .docs-search-field { display: none; }
  .is-mobile-open .docs-search-field { display: block; position: absolute; top: 8px; left: 16px; right: 16px; z-index: 101; padding: 4px; background: var(--vp-c-bg); border-radius: 8px; }
  .docs-search-results { width: 100%; }
}
</style>
