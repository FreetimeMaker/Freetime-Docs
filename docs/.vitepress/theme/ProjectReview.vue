<script setup lang="ts">
import { computed } from 'vue'
import reviews from './source-reviews.json'

const props = defineProps<{ project: string }>()
const review = computed(() => reviews[props.project as keyof typeof reviews])
const repositoryUrl = (repository: string, commit: string) => `https://github.com/FreetimeMaker/${repository}/tree/${commit}`
const fileUrl = (repository: string, commit: string, path: string) => `https://github.com/FreetimeMaker/${repository}/blob/${commit}/${path.split('/').map(encodeURIComponent).join('/')}`
</script>

<template>
  <section v-if="review" class="project-review" aria-labelledby="source-review-title">
    <h2 id="source-review-title">Source review</h2>
    <p>Last checked against source: <time :datetime="review.reviewedAt">{{ review.reviewedAt }}</time></p>
    <p><strong>Review scope:</strong> {{ review.scope }}</p>
    <p class="project-context-note">This is a scoped project review, not a claim that every page was tested. The listed source checkouts were clean when inspected. Build results, published artifacts and live services were not verified by this source review. The date is maintained manually, independently of page edits and site builds.</p>
    <details>
      <summary>Inspected revisions and files</summary>
      <div v-for="source in review.sources" :key="source.repository" class="review-source">
        <a :href="repositoryUrl(source.repository, source.commit)" target="_blank" rel="noopener noreferrer">{{ source.repository }} · <code>{{ source.commit.slice(0, 12) }}</code></a>
        <ul>
          <li v-for="path in source.paths" :key="path"><a :href="fileUrl(source.repository, source.commit, path)" target="_blank" rel="noopener noreferrer">{{ path }}</a></li>
        </ul>
      </div>
    </details>
  </section>
</template>
