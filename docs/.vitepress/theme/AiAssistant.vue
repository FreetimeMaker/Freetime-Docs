<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { ref } from 'vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { page } = useData()

const open = ref(false)
const question = ref('')
const answer = ref('')
const loading = ref(false)
const error = ref('')

async function ask() {
  const value = question.value.trim()
  if (!value || loading.value) return

  loading.value = true
  error.value = ''
  answer.value = ''

  try {
    const pageText = typeof document === 'undefined'
      ? ''
      : document.querySelector('.VPDoc .content')?.textContent?.trim() || ''

    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: value,
        page: page.value.title,
        path: page.value.relativePath,
        context: pageText.slice(0, 16000)
      })
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'The AI assistant is unavailable.')
    answer.value = data.answer
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'The AI assistant is unavailable.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Layout />
  <button class="ai-fab" type="button" aria-label="Open AI assistant" @click="open = !open">
    ✦ AI
  </button>

  <aside v-if="open" class="ai-panel" aria-label="Freetime Docs AI Assistant">
    <div class="ai-header">
      <div>
        <strong>Freetime Docs AI</strong>
        <small>Ask about this documentation</small>
      </div>
      <button type="button" aria-label="Close AI assistant" @click="open = false">×</button>
    </div>

    <div class="ai-body">
      <p class="ai-hint">I use the current documentation page as context. For broader discovery, use the Search box in the navigation.</p>
      <textarea
        v-model="question"
        rows="4"
        placeholder="How does this project work?"
        @keydown.ctrl.enter.prevent="ask"
      />
      <button class="ai-ask" type="button" :disabled="loading || !question.trim()" @click="ask">
        {{ loading ? 'Thinking…' : 'Ask AI' }}
      </button>
      <p v-if="error" class="ai-error">{{ error }}</p>
      <div v-if="answer" class="ai-answer">{{ answer }}</div>
    </div>
  </aside>
</template>
