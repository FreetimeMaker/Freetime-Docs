import { defineConfig } from 'vitepress'
import versions from '../versions.json' with { type: 'json' }

const archivedVersions = versions.versions.map((version) => ({
  text: `Docs ${version}`,
  link: `/versions/${version}/`
}))

const projectItems = [
  { text: 'All API', link: '/projects/all-api/' },
  { text: 'GeoWeather', link: '/projects/geoweather/' },
  { text: 'Luma Store', link: '/projects/luma-store/' },
  { text: 'SuperSMP Companion', link: '/projects/supersmp-companion/' },
  { text: 'Freetime News', link: '/projects/freetime-news/' },
  { text: 'MD-Blog', link: '/projects/md-blog/' },
  { text: 'Lumex Client', link: '/projects/lumex-client/' },
  { text: 'Multi AI Chat', link: '/projects/multi-ai-chat/' }
]

export default defineConfig({
  title: 'Freetime Docs',
  description: 'Documentation for maintained Freetime Maker projects',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Projects',
        items: projectItems
      },
      {
        text: `Docs ${versions.current}`,
        items: [
          { text: `Current (${versions.current})`, link: '/' },
          { text: 'All versions', link: '/versions/' },
          ...archivedVersions
        ]
      }
    ],

    sidebar: {
      '/projects/': [
        {
          text: 'Projects',
          items: [
            { text: 'Overview', link: '/projects/' },
            ...projectItems
          ]
        }
      ],
      '/guide/': [
        {
          text: 'Freetime Docs',
          items: [
            { text: 'Getting started', link: '/guide/' }
          ]
        }
      ],
      '/versions/': [
        {
          text: 'Documentation versions',
          items: [
            { text: 'Overview', link: '/versions/' },
            ...archivedVersions
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FreetimeMaker/Freetime-Docs' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    },

    footer: {
      message: 'Documentation for Freetime Maker projects',
      copyright: 'Copyright © Freetime Maker'
    }
  }
})
