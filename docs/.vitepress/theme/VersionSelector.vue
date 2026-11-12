<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import metadata from '../../versions.json'

const { page, theme } = useData()
const router = useRouter()
const versions = [metadata.current, ...new Set(metadata.versions.filter((version) => version !== metadata.current))]
const selected = computed(() => versions.find((version) => version !== metadata.current && page.value.relativePath.startsWith(`versions/${version}/`)) ?? metadata.current)

const logicalPage = computed(() => selected.value === metadata.current
  ? page.value.relativePath
  : page.value.relativePath.slice(`versions/${selected.value}/`.length))
const manifest = computed(() => (theme.value as { versionPages?: Record<string, string[]> }).versionPages ?? {})

function changeVersion(event: Event) {
  const target = (event.target as HTMLSelectElement).value
  const pages = manifest.value[target] ?? []
  const logical = logicalPage.value
  const candidates = [logical]

  candidates.push('index.md')
  const destination = candidates.find((candidate) => pages.includes(candidate))
  if (!destination) return
  const route = destination === 'index.md' ? '' : destination.replace(/index\.md$/, '').replace(/\.md$/, '')
  const prefix = target === metadata.current ? '/' : `/versions/${target}/`
  void router.go(withBase(prefix + route))
}
</script>

<template>
  <div class="version-selector">
    <label>
      <span>Documentation version</span>
      <select :value="selected" @change="changeVersion">
        <option v-for="version in versions" :key="version" :value="version">
          {{ version === metadata.current ? `${version} (current)` : version }}
        </option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.version-selector { padding: 0 0 20px; }
label { display: grid; gap: 8px; color: var(--vp-c-text-2); font-size: 12px; font-weight: 600; }
select { width: 100%; min-height: 40px; padding: 8px 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; font-size: 14px; appearance: auto; cursor: pointer; }
select:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
</style>
