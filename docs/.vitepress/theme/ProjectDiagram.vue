<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ project: string }>()
const diagrams: Record<string, { caption: string; nodes: { title: string; text: string }[] }> = {
  'all-api': {
    caption: 'Simplified backend request flow. The separate Next.js frontend also has its own routes.',
    nodes: [
      { title: 'Applications & API clients', text: 'Send requests to the versioned backend routes.' },
      { title: 'Express · /v1 and /v2', text: 'Authentication, Wallora and v2 Luma Store / MD-Blog routes.' },
      { title: 'Supabase', text: 'Authentication and service data; privileged credentials stay server-side.' }
    ]
  },
  'luma-store': {
    caption: 'Catalog overview. The separate manually reviewed frontend feed is not the same catalog.',
    nodes: [
      { title: 'Android app & web discovery', text: 'Browse apps and access developer tools.' },
      { title: 'Luma Store services', text: 'Versioned catalog API, submission handlers and APK release sources.' },
      { title: 'Shared Supabase data', text: 'Profiles, submissions, metadata, analytics and storage.' }
    ]
  },
  'md-blog': {
    caption: 'Blog post rendering flow. The homepage separately reads public/md/index.md.',
    nodes: [
      { title: 'Reader · /blog or /blog/<slug>', text: 'Open the listing or an individual post.' },
      { title: 'Node.js handlers → All API', text: 'Fetch posts, categories and Markdown from the configured backend.' },
      { title: 'Marked + local templates', text: 'Render the response as an HTML page.' }
    ]
  }
}
const diagram = computed(() => diagrams[props.project])
</script>

<template>
  <figure v-if="diagram" class="project-diagram">
    <ol aria-label="Architecture flow">
      <li v-for="(node, index) in diagram.nodes" :key="node.title">
        <span class="diagram-number" aria-hidden="true">{{ index + 1 }}</span>
        <div><strong>{{ node.title }}</strong><p>{{ node.text }}</p></div>
        <span v-if="index < diagram.nodes.length - 1" class="diagram-arrow" aria-hidden="true">↓</span>
      </li>
    </ol>
    <figcaption>{{ diagram.caption }}</figcaption>
  </figure>
</template>
