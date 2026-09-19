import { defineConfig } from 'vitepress'
import versions from '../versions.json' with { type: 'json' }

const archivedVersions = versions.versions.map((version) => ({
  text: `Docs ${version}`,
  link: `/versions/${version}/`
}))

export default defineConfig({
  title: 'Freetime Docs',
  description: 'Documentation for Freetime projects',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: `Docs ${versions.current}`,
        items: [
          { text: `Current (${versions.current})`, link: '/' },
          ...archivedVersions
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting started', link: '/guide/' }
          ]
        }
      ],
      '/versions/': [
        {
          text: 'Versions',
          items: archivedVersions
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FreetimeMaker/Freetime-Docs' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Freetime Docs',
      copyright: 'Copyright © Freetime Maker'
    }
  }
})
