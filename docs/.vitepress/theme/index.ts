import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import AiAssistant from './AiAssistant.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AiAssistant', AiAssistant)
  },
  Layout: AiAssistant
} satisfies Theme
