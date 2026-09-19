import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ProjectBackLink from './ProjectBackLink.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProjectBackLink', ProjectBackLink)
  },
  Layout: ProjectBackLink
} satisfies Theme
