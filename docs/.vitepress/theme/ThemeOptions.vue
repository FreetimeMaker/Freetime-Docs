<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { useData } from 'vitepress'

const { page, site, isDark } = useData()
const german = computed(() => page.value.relativePath.startsWith('de/'))
const ready = ref(false)
const preferredDark = usePreferredDark()
const forced = computed(() => !site.value.appearance || site.value.appearance === 'force-dark' || site.value.appearance === 'force-auto')
const initialMode = site.value.appearance === 'dark' ? 'dark' : 'auto'
const storageAvailable = ref(true)
// The same key and VueUse storage events keep VitePress's useDark in control.
const mode = useStorage<string>('vitepress-theme-appearance', initialMode, undefined, {
  initOnMounted: true,
  writeDefaults: false,
  onError: () => { storageAvailable.value = false }
})
const selected = computed(() => {
  if (site.value.appearance === 'force-dark') return 'dark'
  if (site.value.appearance === 'force-auto') return 'auto'
  if (!site.value.appearance) return 'light'
  return ['auto', 'light', 'dark'].includes(mode.value) ? mode.value : initialMode
})

onMounted(() => {
  try {
    window.localStorage.getItem('vitepress-theme-appearance')
  } catch {
    storageAvailable.value = false
  }
  ready.value = true
})

// If browser storage is blocked, use the existing isDark ref for this session.
watch([mode, preferredDark, storageAvailable], () => {
  if (!storageAvailable.value && !forced.value) {
    isDark.value = selected.value === 'auto' ? preferredDark.value : selected.value === 'dark'
  }
})

function changeTheme(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (!forced.value && ['auto', 'light', 'dark'].includes(value)) mode.value = value
}
</script>

<template>
  <div class="theme-options">
    <label>
      <span>{{ german ? 'Darstellung' : 'Appearance' }}</span>
      <select :value="selected" :disabled="!ready || forced" @change="changeTheme">
        <option value="auto">System</option>
        <option value="light">{{ german ? 'Hell' : 'Light' }}</option>
        <option value="dark">{{ german ? 'Dunkel' : 'Dark' }}</option>
      </select>
    </label>
    <p v-if="forced">{{ german ? 'Die Darstellung wird von dieser Website vorgegeben.' : 'Appearance is controlled by this site.' }}</p>
    <p v-else-if="!storageAvailable">{{ german ? 'Die Auswahl gilt nur für diese Sitzung, da Browserspeicher nicht verfügbar ist.' : 'Browser storage is unavailable; this choice applies only to this session.' }}</p>
  </div>
</template>

<style scoped>
.theme-options { padding-bottom: 20px; }
label { display: grid; gap: 8px; color: var(--vp-c-text-2); font-size: 12px; font-weight: 600; }
select { width: 100%; min-height: 40px; padding: 8px 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; font-size: 14px; appearance: auto; cursor: pointer; }
select:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
select:disabled { cursor: not-allowed; opacity: 0.7; }
p { margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 12px; line-height: 1.5; }
</style>
