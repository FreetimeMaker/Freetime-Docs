<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { page } = useData()

const isProjectDoc = computed(() => {
  const path = page.value.relativePath.replace(/\\/g, '/')
  return path.startsWith('projects/') && path !== 'projects/index.md'
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <a v-if="isProjectDoc" class="project-back-link" href="/projects/">
        ← Back to Projects
      </a>
    </template>
  </Layout>
</template>

<style scoped>
.project-back-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.project-back-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>
