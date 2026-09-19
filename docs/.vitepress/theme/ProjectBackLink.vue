<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { page } = useData()

const path = computed(() => page.value.relativePath.replace(/\\/g, '/'))
const isProjectDoc = computed(() => path.value.startsWith('projects/') && path.value !== 'projects/index.md')

const projectName = computed(() => {
  const slug = path.value.split('/')[1]
  const names: Record<string, string> = {
    'all-api': 'All API',
    geoweather: 'GeoWeather',
    'luma-store': 'Luma Store',
    'supersmp-companion': 'SuperSMP Companion',
    'freetime-news': 'Freetime News',
    'md-blog': 'MD-Blog',
    'lumex-client': 'Lumex Client',
    'multi-ai-chat': 'Multi AI Chat'
  }
  return names[slug] || slug
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <nav v-if="isProjectDoc" class="wiki-breadcrumb" aria-label="Breadcrumb">
        <a href="/projects/">Projects</a>
        <span>/</span>
        <a :href="`/projects/${path.split('/')[1]}/`">{{ projectName }}</a>
        <span v-if="!path.endsWith('/index.md')">/</span>
        <span v-if="!path.endsWith('/index.md')" class="current">{{ page.title }}</span>
      </nav>
    </template>
  </Layout>
</template>

<style>
:root {
  --vp-layout-max-width: 1600px;
}

.VPDoc .container {
  max-width: 1500px !important;
}

.VPDoc .content-container {
  max-width: 820px !important;
}

.VPSidebar {
  border-right: 1px solid var(--vp-c-divider);
}

.VPSidebarItem .text {
  font-size: 14px;
}

.VPNavBarSearch {
  flex-grow: 1;
  max-width: 520px;
}

.VPNavBarSearch .DocSearch-Button,
.VPNavBarSearch .VPNavBarSearchButton {
  width: 100%;
}

.wiki-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  margin: 0 0 22px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.wiki-breadcrumb a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.wiki-breadcrumb a:hover {
  text-decoration: underline;
}

.wiki-breadcrumb .current {
  color: var(--vp-c-text-2);
}

.vp-doc h1 {
  letter-spacing: -0.02em;
}

.vp-doc h2 {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 28px;
  margin-top: 40px;
}

@media (min-width: 960px) {
  .VPSidebar {
    width: 290px !important;
  }
}
</style>
