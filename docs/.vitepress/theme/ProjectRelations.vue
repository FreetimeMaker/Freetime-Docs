<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { projectBySlug } from './projects'

const props = defineProps<{ project: string }>()
const info = computed(() => projectBySlug(props.project))
</script>

<template>
  <section v-if="info" class="project-relations" aria-labelledby="project-relations-title">
    <p class="project-eyebrow">Connected guides</p>
    <h2 id="project-relations-title">Work with other projects</h2>
    <div v-if="info.related.length" class="related-grid">
      <a v-for="related in info.related" :key="`${related.slug}/${related.page}`" :href="withBase(`/projects/${related.slug}/${related.page}`)" class="project-path">
        <strong>{{ related.label }} <span aria-hidden="true">→</span></strong>
        <span class="path-description">{{ related.reason }}</span>
      </a>
    </div>
    <p v-else class="project-context-note">No direct integration with the other documented projects is required. Multi AI Chat connects directly to external AI providers; see its setup guide for credentials, model availability and privacy considerations.</p>
  </section>
</template>
