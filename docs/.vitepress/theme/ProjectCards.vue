<script setup lang="ts">
import { withBase } from 'vitepress'
import { projects, projectUrl, sourceUrl } from './projects'
</script>

<template>
  <div class="project-grid">
    <article v-for="project in projects" :key="project.slug" class="project-card">
      <span class="project-icon" aria-hidden="true">{{ project.icon }}</span>
      <h3><a :href="withBase(projectUrl(project))">{{ project.name }}</a></h3>
      <p>{{ project.description }}</p>
      <ul class="project-tags" aria-label="Platforms and technologies">
        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
      </ul>
      <div class="project-card-links">
        <a :href="withBase(projectUrl(project))" :aria-label="`${project.name} documentation`">Documentation <span aria-hidden="true">→</span></a>
        <a :href="sourceUrl(project)" target="_blank" rel="noopener noreferrer" :aria-label="`${project.name} source code on GitHub`">Source code <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  </div>
</template>
