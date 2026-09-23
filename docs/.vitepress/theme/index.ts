import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ProjectBackLink from './ProjectBackLink.vue'

export default {
  extends: DefaultTheme,
  Layout: ProjectBackLink
} satisfies Theme
