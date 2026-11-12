<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { projectBySlug, projectUrl } from './projects'
import ProjectPaths from './ProjectPaths.vue'
import ProjectRelations from './ProjectRelations.vue'
import ProjectReview from './ProjectReview.vue'
import PageFeedback from './PageFeedback.vue'
import VersionSelector from './VersionSelector.vue'
import DocsOptions from './DocsOptions.vue'
import SectionNavigation from './SectionNavigation.vue'

const { Layout } = DefaultTheme
const { page } = useData()
const path = computed(() => page.value.relativePath.replace(/\\/g, '/'))
const project = computed(() => path.value.startsWith('projects/') ? projectBySlug(path.value.split('/')[1]) : undefined)
const current = computed(() => path.value.split('/').at(-1)?.replace(/\.md$/, ''))
const root = computed(() => {
  const archive = /^versions\/([^/]+)\//.exec(path.value)?.[1]
  return archive ? `/versions/${archive}/` : path.value.startsWith('de/') ? '/de/' : '/'
})
</script>

<template>
  <Layout>
    <template #layout-top><SectionNavigation /></template>
    <template #nav-bar-content-after><DocsOptions /></template>
    <template #sidebar-nav-before><VersionSelector /></template>
    <template #doc-before>
      <nav v-if="project" class="wiki-breadcrumb" aria-label="Breadcrumb">
        <a :href="withBase('/projects/')">Projects</a>
        <span aria-hidden="true">/</span>
        <a v-if="current !== 'index'" :href="withBase(projectUrl(project))">{{ project.name }}</a>
        <span v-else aria-current="page">{{ project.name }}</span>
        <template v-if="current !== 'index'">
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ page.title }}</span>
        </template>
      </nav>
      <nav v-else class="wiki-breadcrumb" aria-label="Breadcrumb">
        <a :href="withBase(root)">{{ path.startsWith('de/') ? 'Dokumentation' : 'Documentation' }}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ page.title }}</span>
      </nav>
    </template>
    <template #doc-footer-before>
      <ProjectRelations v-if="project && current === 'index'" :project="project.slug" />
      <ProjectReview v-if="project" :project="project.slug" />
    </template>
    <template #doc-after>
      <section v-if="project" class="project-next" aria-labelledby="project-next-title">
        <p class="project-eyebrow">Keep exploring</p>
        <h2 id="project-next-title">{{ current === 'index' ? 'Choose your next step' : `More from ${project.name}` }}</h2>
        <ProjectPaths :project="project.slug" :current="current" compact />
        <a v-if="current !== 'index'" class="project-overview-link" :href="withBase(projectUrl(project))">← Back to project overview</a>
      </section>
      <PageFeedback />
    </template>
  </Layout>
</template>
