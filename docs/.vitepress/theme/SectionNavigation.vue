<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page } = useData()
const german = computed(() => page.value.relativePath.startsWith('de/'))
const archive = computed(() => /^versions\/([^/]+)\//.exec(page.value.relativePath)?.[1])
const home = computed(() => archive.value ? `/versions/${archive.value}/` : german.value ? '/de/' : '/')
const projects = computed(() => archive.value ? `/versions/${archive.value}/projects/` : '/projects/')
</script>

<template>
  <nav class="docs-section-nav" :aria-label="german ? 'Bereiche' : 'Section navigation'">
    <div class="docs-section-nav-inner">
      <div class="docs-section-tabs">
        <a :href="withBase(home)">{{ german ? 'Dokumentation' : 'Documentation' }}</a>
        <a :href="withBase(projects)">{{ german ? 'Projekte' : 'Projects' }}</a>
      </div>
      <a class="docs-source-link" href="https://github.com/FreetimeMaker/Freetime-Docs" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </nav>
</template>
