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

/* Global Liquid Glass */
:root {
  --ft-glass-bg: color-mix(in srgb, var(--vp-c-bg) 68%, transparent);
  --ft-glass-bg-strong: color-mix(in srgb, var(--vp-c-bg-soft) 78%, transparent);
  --ft-glass-border: color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);
  --ft-glass-highlight: color-mix(in srgb, white 28%, transparent);
  --ft-glass-shadow: 0 10px 36px rgba(0, 0, 0, 0.10);
  --ft-glass-blur: blur(22px) saturate(155%);
}

.dark {
  --ft-glass-bg: color-mix(in srgb, var(--vp-c-bg) 62%, transparent);
  --ft-glass-bg-strong: color-mix(in srgb, var(--vp-c-bg-soft) 72%, transparent);
  --ft-glass-border: color-mix(in srgb, white 13%, transparent);
  --ft-glass-highlight: color-mix(in srgb, white 9%, transparent);
  --ft-glass-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
}

html {
  background:
    radial-gradient(circle at 12% 8%, color-mix(in srgb, var(--vp-c-brand-1) 13%, transparent), transparent 32rem),
    radial-gradient(circle at 88% 22%, color-mix(in srgb, var(--vp-c-brand-2) 10%, transparent), transparent 34rem),
    var(--vp-c-bg);
  background-attachment: fixed;
}

body,
.Layout,
.VPContent {
  background: transparent !important;
}

.VPNav {
  background: transparent !important;
}

.VPNavBar {
  background: var(--ft-glass-bg) !important;
  border-bottom: 1px solid var(--ft-glass-border) !important;
  box-shadow: inset 0 1px 0 var(--ft-glass-highlight);
  -webkit-backdrop-filter: var(--ft-glass-blur);
  backdrop-filter: var(--ft-glass-blur);
}

.VPSidebar {
  background: var(--ft-glass-bg) !important;
  border-right: 1px solid var(--ft-glass-border) !important;
  box-shadow: inset -1px 0 0 var(--ft-glass-highlight);
  -webkit-backdrop-filter: var(--ft-glass-blur);
  backdrop-filter: var(--ft-glass-blur);
}

.VPNavBarSearchButton,
.DocSearch-Button,
.VPNavBarMenuGroup .button,
.VPNavScreenMenuGroup .button {
  background: var(--ft-glass-bg-strong) !important;
  border: 1px solid var(--ft-glass-border) !important;
  box-shadow: inset 0 1px 0 var(--ft-glass-highlight), 0 5px 18px rgba(0, 0, 0, 0.06);
  -webkit-backdrop-filter: var(--ft-glass-blur);
  backdrop-filter: var(--ft-glass-blur);
}

.VPMenu,
.VPFlyout .menu,
.VPNavScreen {
  background: var(--ft-glass-bg-strong) !important;
  border: 1px solid var(--ft-glass-border) !important;
  box-shadow: var(--ft-glass-shadow), inset 0 1px 0 var(--ft-glass-highlight) !important;
  -webkit-backdrop-filter: var(--ft-glass-blur);
  backdrop-filter: var(--ft-glass-blur);
}

.VPDocAsideOutline {
  padding: 14px 16px;
  border: 1px solid var(--ft-glass-border);
  border-radius: 16px;
  background: var(--ft-glass-bg);
  box-shadow: inset 0 1px 0 var(--ft-glass-highlight);
  -webkit-backdrop-filter: var(--ft-glass-blur);
  backdrop-filter: var(--ft-glass-blur);
}

.vp-doc div[class*='language-'],
.vp-doc table,
.vp-doc .custom-block,
.VPDocFooter .prev-next .pager-link {
  border: 1px solid var(--ft-glass-border) !important;
  background: var(--ft-glass-bg-strong) !important;
  box-shadow: inset 0 1px 0 var(--ft-glass-highlight), 0 8px 28px rgba(0, 0, 0, 0.06);
  -webkit-backdrop-filter: var(--ft-glass-blur);
  backdrop-filter: var(--ft-glass-blur);
}

.vp-doc div[class*='language-'],
.vp-doc .custom-block,
.VPDocFooter .prev-next .pager-link {
  border-radius: 16px !important;
}

.vp-doc table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 14px;
  overflow: hidden;
}

.vp-doc th {
  background: color-mix(in srgb, var(--vp-c-bg-soft) 74%, transparent);
}

.vp-doc code:not(pre code) {
  border: 1px solid var(--ft-glass-border);
  background: var(--ft-glass-bg-strong);
  border-radius: 7px;
}

.VPSidebarItem .item:hover,
.VPSidebarItem.is-active > .item,
.VPMenuLink:hover,
.VPMenuLink.active {
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--ft-glass-bg));
  border-radius: 10px;
}

.wiki-breadcrumb {
  width: fit-content;
  padding: 8px 12px;
  border: 1px solid var(--ft-glass-border);
  border-radius: 999px;
  background: var(--ft-glass-bg);
  box-shadow: inset 0 1px 0 var(--ft-glass-highlight);
  -webkit-backdrop-filter: var(--ft-glass-blur);
  backdrop-filter: var(--ft-glass-blur);
}

.VPDocFooter .prev-next .pager-link {
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
}

.VPDocFooter .prev-next .pager-link:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 42%, var(--ft-glass-border)) !important;
  box-shadow: var(--ft-glass-shadow), inset 0 1px 0 var(--ft-glass-highlight);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .VPNavBar,
  .VPSidebar,
  .VPMenu,
  .VPFlyout .menu,
  .VPNavScreen,
  .VPDocAsideOutline,
  .vp-doc div[class*='language-'],
  .vp-doc table,
  .vp-doc .custom-block,
  .VPDocFooter .prev-next .pager-link,
  .wiki-breadcrumb {
    background: var(--vp-c-bg-soft) !important;
  }
}

@media (prefers-reduced-transparency: reduce) {
  :root {
    --ft-glass-bg: var(--vp-c-bg);
    --ft-glass-bg-strong: var(--vp-c-bg-soft);
    --ft-glass-blur: none;
  }
}

</style>
