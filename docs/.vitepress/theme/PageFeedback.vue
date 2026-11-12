<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page } = useData()
const route = useRoute()
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const absoluteUrl = ref('')
watch([() => route.path, mounted], () => {
  if (mounted.value) {
    const url = new URL(window.location.href)
    // Feedback needs the page URL, not potentially private query parameters.
    url.search = ''
    url.hash = ''
    absoluteUrl.value = url.href
  }
}, { immediate: true, flush: 'post' })
const sourcePath = computed(() => page.value.relativePath.replace(/\\/g, '/'))
const title = computed(() => page.value.title || 'Freetime Docs')
const editUrl = computed(() => `https://github.com/FreetimeMaker/Freetime-Docs/edit/main/docs/${sourcePath.value.split('/').map(encodeURIComponent).join('/')}`)
const reportUrl = computed(() => {
  const params = new URLSearchParams({
    title: `[Docs] ${title.value}`,
    body: `Page: ${title.value}\nURL: ${absoluteUrl.value || route.path}\nSource: docs/${sourcePath.value}\n\nWhat is unclear or incorrect?\n\nWhat did you expect?\n\nPlease remove secrets, API keys and personal data before submitting.`
  })
  return `https://github.com/FreetimeMaker/Freetime-Docs/issues/new?${params}`
})
</script>

<template>
  <section v-if="!page.isNotFound" class="page-feedback" aria-label="Documentation feedback">
    <div><strong>Help improve this page</strong><p>Found a missing step or an outdated detail?</p></div>
    <div class="feedback-actions">
      <a :href="editUrl" target="_blank" rel="noopener noreferrer">Edit this page <span aria-hidden="true">↗</span></a>
      <a :href="reportUrl" target="_blank" rel="noopener noreferrer">Report a documentation issue <span aria-hidden="true">↗</span></a>
    </div>
    <p class="feedback-privacy">Links open GitHub; nothing is submitted automatically. Reporting or proposing an edit requires a GitHub account. Do not include credentials or private logs.</p>
  </section>
</template>
