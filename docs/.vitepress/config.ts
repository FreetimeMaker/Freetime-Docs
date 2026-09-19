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
      { text: 'Search', link: '/search/' },
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
          { text: 'Authentication', link: '/projects/all-api/authentication' },
          { text: 'Development', link: '/projects/all-api/development' }
        ]}
      ],
      '/projects/geoweather/': [
        { text: 'GeoWeather', items: [
          { text: 'Overview', link: '/projects/geoweather/' },
          { text: 'Installation & Build', link: '/projects/geoweather/installation' },
          { text: 'Architecture', link: '/projects/geoweather/architecture' }
        ]}
      ],
      '/projects/luma-store/': [
        { text: 'Luma Store', items: [
          { text: 'Overview', link: '/projects/luma-store/' },
          { text: 'Android', link: '/projects/luma-store/android' },
          { text: 'Developer Dashboard', link: '/projects/luma-store/developer-dashboard' },
          { text: 'Linux', link: '/projects/luma-store/linux' }
        ]}
      ],
      '/projects/supersmp-companion/': [
        { text: 'SuperSMP Companion', items: [
          { text: 'Overview', link: '/projects/supersmp-companion/' },
          { text: 'Development', link: '/projects/supersmp-companion/development' }
        ]}
      ],
      '/projects/freetime-news/': [
        { text: 'Freetime News', items: [
          { text: 'Overview', link: '/projects/freetime-news/' },
          { text: 'Development', link: '/projects/freetime-news/development' }
        ]}
      ],
      '/projects/md-blog/': [
        { text: 'MD-Blog', items: [
          { text: 'Overview', link: '/projects/md-blog/' },
          { text: 'Architecture', link: '/projects/md-blog/architecture' }
        ]}
      ],
      '/projects/lumex-client/': [
        { text: 'Lumex Client', items: [
          { text: 'Overview', link: '/projects/lumex-client/' },
          { text: 'Architecture', link: '/projects/lumex-client/architecture' }
        ]}
      ],
      '/projects/multi-ai-chat/': [
        { text: 'Multi AI Chat', items: [
          { text: 'Overview', link: '/projects/multi-ai-chat/' },
          { text: 'Development', link: '/projects/multi-ai-chat/development' }
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
