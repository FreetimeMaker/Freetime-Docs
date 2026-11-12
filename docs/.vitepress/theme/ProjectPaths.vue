<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { projectBySlug, projectUrl } from './projects'

const props = defineProps<{ project: string; compact?: boolean; current?: string }>()
const info = computed(() => projectBySlug(props.project))
const links = computed(() => info.value?.paths.filter(link => link.path !== props.current) ?? [])
</script>

<template>
  <div v-if="info" :class="['project-paths', { compact }]">
    <a v-for="(link, index) in links" :key="link.path" class="project-path" :href="withBase(projectUrl(info, link.path))">
      <span v-if="!compact" class="path-number" aria-hidden="true">0{{ index + 1 }}</span>
      <span><strong>{{ link.label }} <span aria-hidden="true">→</span></strong><span class="path-description">{{ link.description }}</span></span>
    </a>
  </div>
</template>
