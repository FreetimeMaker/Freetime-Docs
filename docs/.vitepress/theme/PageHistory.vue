<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'

interface HistoryEntry {
  hash: string
  subject: string
  author: string
  date: string
}

const { page } = useData()
const details = ref<HTMLDetailsElement>()
const summary = ref<HTMLElement>()
const cleanString = (value: unknown): value is string => typeof value === 'string'
  && !/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/.test(value)
function isEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Record<string, unknown>
  return cleanString(entry.hash) && /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(entry.hash)
    && cleanString(entry.subject) && cleanString(entry.author) && cleanString(entry.date)
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(entry.date)
    && Number.isFinite(Date.parse(entry.date))
}
const history = computed(() => {
  const value: unknown = page.value.frontmatter.history
  return Array.isArray(value) ? value.filter(isEntry).slice(0, 5) : []
})
const latest = computed(() => history.value[0])
const dateLabel = (date: string) => date.slice(0, 10)
const initials = (author: string) => author.trim().split(/\s+/).filter(Boolean)
  .slice(0, 2).map((part) => Array.from(part)[0]).join('').toUpperCase()
function close(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !details.value?.open) return
  details.value.open = false
  summary.value?.focus()
  event.stopPropagation()
}
watch(() => page.value.relativePath, () => {
  if (details.value) details.value.open = false
})
</script>

<template>
  <details v-if="latest && !page.isNotFound" ref="details" class="page-history" @keydown="close">
    <summary ref="summary">
      Last updated <time :datetime="latest.date">{{ dateLabel(latest.date) }}</time>
      <span class="history-hint">Recent commits</span>
    </summary>
    <div class="history-popover">
      <h2>Recent commits</h2>
      <ol class="history-commits">
        <li v-for="(commit, index) in history" :key="`${commit.hash}-${index}`">
          <span class="history-avatar" aria-hidden="true">{{ initials(commit.author) }}</span>
          <div class="history-entry">
            <a :href="`https://github.com/FreetimeMaker/Freetime-Docs/commit/${commit.hash}`"
              :title="commit.subject" target="_blank" rel="noopener noreferrer">
              {{ commit.subject }}<span class="history-new-window"> (opens in a new tab)</span>
            </a>
            <div class="history-meta">
              <span>{{ commit.author }}</span>
              <time :datetime="commit.date">{{ dateLabel(commit.date) }}</time>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </details>
</template>

<style scoped>
.page-history { position: relative; margin-top: 24px; color: var(--vp-c-text-2); font-size: 13px; }
summary { cursor: pointer; width: fit-content; }
summary:focus-visible, a:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 4px; }
.history-hint { margin-left: 8px; color: var(--vp-c-brand-1); }
.history-popover { position: absolute; bottom: calc(100% + 12px); right: 0; z-index: 20; width: min(360px, 100%); max-height: 60vh; overflow: auto; padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-elv); box-shadow: var(--vp-shadow-3); }
.history-popover h2 { margin: 0 0 12px; padding: 0; border: 0; font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); }
.history-commits { list-style: none; margin: 0; padding: 0; }
.history-commits li { display: flex; gap: 10px; margin: 0; padding: 10px 0; }
.history-commits li + li { border-top: 1px solid var(--vp-c-divider); }
.history-avatar { display: flex; flex: 0 0 30px; height: 30px; align-items: center; justify-content: center; border-radius: 50%; background: var(--vp-c-default-soft); font-size: 11px; }
.history-entry { min-width: 0; }
.history-entry a { display: block; overflow-wrap: anywhere; color: var(--vp-c-brand-1); }
.history-meta { display: flex; flex-wrap: wrap; gap: 4px 10px; margin-top: 4px; overflow-wrap: anywhere; }
.history-new-window { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
