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
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/img/site.webmanifest' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/getting-started/' },
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
      '/projects/all-api/': [
        { text: 'All API', items: [
          { text: 'Overview', link: '/projects/all-api/' },
          { text: 'Getting Started', link: '/projects/all-api/getting-started' },
          { text: 'Authentication', link: '/projects/all-api/authentication' },
          { text: 'Development', link: '/projects/all-api/development' },
          { text: 'Troubleshooting', link: '/projects/all-api/troubleshooting' }
        ]}
      ],
      '/projects/geoweather/': [
        { text: 'GeoWeather', items: [
          { text: 'Overview', link: '/projects/geoweather/' },
          { text: 'Getting Started', link: '/projects/geoweather/getting-started' },
          { text: 'Installation & Build', link: '/projects/geoweather/installation' },
          { text: 'Architecture', link: '/projects/geoweather/architecture' },
          { text: 'Troubleshooting', link: '/projects/geoweather/troubleshooting' }
        ]}
      ],
      '/projects/luma-store/': [
        { text: 'Luma Store', items: [
          { text: 'Overview', link: '/projects/luma-store/' },
          { text: 'Getting Started', link: '/projects/luma-store/getting-started' },
          { text: 'Sources', link: '/projects/luma-store/sources' },
          { text: 'Android', link: '/projects/luma-store/android' },
          { text: 'Developer Dashboard', link: '/projects/luma-store/developer-dashboard' },
          { text: 'Linux', link: '/projects/luma-store/linux' },
          { text: 'Troubleshooting', link: '/projects/luma-store/troubleshooting' }
        ]}
      ],
      '/projects/supersmp-companion/': [
        { text: 'SuperSMP Companion', items: [
          { text: 'Overview', link: '/projects/supersmp-companion/' },
          { text: 'Getting Started', link: '/projects/supersmp-companion/getting-started' },
          { text: 'Development', link: '/projects/supersmp-companion/development' },
          { text: 'Troubleshooting', link: '/projects/supersmp-companion/troubleshooting' }
        ]}
      ],
      '/projects/freetime-news/': [
        { text: 'Freetime News', items: [
          { text: 'Overview', link: '/projects/freetime-news/' },
          { text: 'Getting Started', link: '/projects/freetime-news/getting-started' },
          { text: 'Development', link: '/projects/freetime-news/development' },
          { text: 'Troubleshooting', link: '/projects/freetime-news/troubleshooting' }
        ]}
      ],
      '/projects/md-blog/': [
        { text: 'MD-Blog', items: [
          { text: 'Overview', link: '/projects/md-blog/' },
          { text: 'Getting Started', link: '/projects/md-blog/getting-started' },
          { text: 'Architecture', link: '/projects/md-blog/architecture' },
          { text: 'Troubleshooting', link: '/projects/md-blog/troubleshooting' }
        ]}
      ],
      '/projects/lumex-client/': [
        { text: 'Lumex Client', items: [
          { text: 'Overview', link: '/projects/lumex-client/' },
          { text: 'Getting Started', link: '/projects/lumex-client/getting-started' },
          { text: 'Architecture', link: '/projects/lumex-client/architecture' },
          { text: 'Troubleshooting', link: '/projects/lumex-client/troubleshooting' }
        ]}
      ],
      '/projects/multi-ai-chat/': [
        { text: 'Multi AI Chat', items: [
          { text: 'Overview', link: '/projects/multi-ai-chat/' },
          { text: 'Getting Started', link: '/projects/multi-ai-chat/getting-started' },
          { text: 'Development', link: '/projects/multi-ai-chat/development' },
          { text: 'Troubleshooting', link: '/projects/multi-ai-chat/troubleshooting' }
        ]}
      ],
      '/projects/': [
        { text: 'Projects', items: [
          { text: 'Overview', link: '/projects/' },
          ...projectItems
        ]}
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
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Search docs', buttonAriaLabel: 'Search documentation' },
          modal: { noResultsText: 'No documentation found', resetButtonTitle: 'Clear query', footer: { selectText: 'select', navigateText: 'navigate', closeText: 'close' } }
        }
      }
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
