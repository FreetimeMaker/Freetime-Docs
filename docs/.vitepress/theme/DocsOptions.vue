<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import LanguageSelector from './LanguageSelector.vue'
import ThemeOptions from './ThemeOptions.vue'

const { page } = useData()
const route = useRoute()
const menu = ref<HTMLDetailsElement>()
const german = computed(() => page.value.relativePath.startsWith('de/'))
watch(() => route.path, () => menu.value?.removeAttribute('open'))
function close(event: KeyboardEvent) {
  if (event.key === 'Escape' && menu.value?.open) {
    menu.value.open = false
    menu.value.querySelector('summary')?.focus()
  }
}
</script>

<template>
  <details ref="menu" class="docs-options" @keydown="close">
    <summary>{{ german ? 'Optionen' : 'Options' }} <span aria-hidden="true">⌄</span></summary>
    <div class="docs-options-panel">
      <ThemeOptions />
      <LanguageSelector />
    </div>
  </details>
</template>
