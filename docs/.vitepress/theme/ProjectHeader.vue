<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { projectBySlug, projectUrl, sourceUrl } from './projects'

const props = defineProps<{ project: string }>()
const info = computed(() => projectBySlug(props.project))
</script>

<template>
  <header v-if="info" class="project-header">
    <div class="project-eyebrow"><span class="project-icon" aria-hidden="true">{{ info.icon }}</span> Project guide</div>
    <h1>{{ info.name }}</h1>
    <p class="project-description">{{ info.description }}</p>
    <ul class="project-tags" aria-label="Platforms and technologies">
      <li v-for="tag in info.tags" :key="tag">{{ tag }}</li>
    </ul>
    <div class="project-actions">
      <a class="project-button primary" :href="withBase(projectUrl(info, 'getting-started'))">Get started <span aria-hidden="true">→</span></a>
      <a class="project-button" :href="sourceUrl(info)" target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>
    </div>
    <p class="project-source-note">Version numbers below describe inspected source, not necessarily the latest published release.</p>
  </header>
</template>
