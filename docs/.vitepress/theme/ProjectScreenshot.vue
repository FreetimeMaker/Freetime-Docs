<script setup lang="ts">
import { withBase } from 'vitepress'
defineProps<{ src: string; alt: string; caption: string }>()
</script>

<template>
  <figure class="project-screenshot">
    <a :href="withBase(src)" aria-label="Open full-size screenshot">
      <img :src="withBase(src)" :alt="alt" width="720" height="1600" loading="lazy" decoding="async" />
    </a>
    <figcaption>{{ caption }} <span>Repository screenshot; the current interface may differ. Select the image to view it full-size.</span></figcaption>
  </figure>
</template>
