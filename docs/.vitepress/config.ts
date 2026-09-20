import { defineConfig } from 'vitepress'
import versions from '../versions.json' with { type: 'json' }

const archivedVersions = versions.versions.map((version) => ({
  text: `Docs ${version}`,
  link: `/versions/${version}/`
}))

const projectItems = [
  { text: 'Freetime Core', link: '/projects/freetime-core/' },
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

    sidebar: [
      {
        text: 'Freetime Docs',
        items: [
          { text: 'Documentation home', link: '/' },
          { text: 'Getting started', link: '/getting-started/' },
          { text: 'Projects', link: '/projects/' }
        ]
      },
      {
        text: 'Freetime Core',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/freetime-core/' },
          { text: 'Getting Started', link: '/projects/freetime-core/getting-started' },
          { text: 'Modules', link: '/projects/freetime-core/modules' }
        ]
      },
      {
        text: 'All API',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/all-api/' },
          { text: 'Getting Started', link: '/projects/all-api/getting-started' },
          { text: 'Using the API', link: '/projects/all-api/using-the-api' },
          { text: 'API Reference', link: '/projects/all-api/api-reference' },
          { text: 'Authentication', link: '/projects/all-api/authentication' },
          { text: 'Development', link: '/projects/all-api/development' },
          { text: 'Troubleshooting', link: '/projects/all-api/troubleshooting' }
        ]
      },
      {
        text: 'GeoWeather',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/geoweather/' },
          { text: 'Getting Started', link: '/projects/geoweather/getting-started' },
          { text: 'Installation & Build', link: '/projects/geoweather/installation' },
          { text: 'Features', link: '/projects/geoweather/features' },
          { text: 'Configuration', link: '/projects/geoweather/configuration' },
          { text: 'Architecture', link: '/projects/geoweather/architecture' },
          { text: 'Troubleshooting', link: '/projects/geoweather/troubleshooting' }
        ]
      },
      {
        text: 'Luma Store',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/luma-store/' },
          { text: 'Getting Started', link: '/projects/luma-store/getting-started' },
          { text: 'Building Custom Clients', link: '/projects/luma-store/custom-clients' },
          { text: 'Sources', link: '/projects/luma-store/sources' },
          { text: 'App Submissions', link: '/projects/luma-store/submissions' },
          { text: 'Android', link: '/projects/luma-store/android' },
          { text: 'Developer Dashboard', link: '/projects/luma-store/developer-dashboard' },
          { text: 'Linux', link: '/projects/luma-store/linux' },
          { text: 'Troubleshooting', link: '/projects/luma-store/troubleshooting' }
        ]
      },
      {
        text: 'SuperSMP Companion',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/supersmp-companion/' },
          { text: 'Getting Started', link: '/projects/supersmp-companion/getting-started' },
          { text: 'Development', link: '/projects/supersmp-companion/development' },
          { text: 'Troubleshooting', link: '/projects/supersmp-companion/troubleshooting' }
        ]
      },
      {
        text: 'Freetime News',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/freetime-news/' },
          { text: 'Getting Started', link: '/projects/freetime-news/getting-started' },
          { text: 'Development', link: '/projects/freetime-news/development' },
          { text: 'Troubleshooting', link: '/projects/freetime-news/troubleshooting' }
        ]
      },
      {
        text: 'MD-Blog',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/md-blog/' },
          { text: 'Getting Started', link: '/projects/md-blog/getting-started' },
          { text: 'Architecture', link: '/projects/md-blog/architecture' },
          { text: 'Troubleshooting', link: '/projects/md-blog/troubleshooting' }
        ]
      },
      {
        text: 'Lumex Client',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/lumex-client/' },
          { text: 'Getting Started', link: '/projects/lumex-client/getting-started' },
          { text: 'Architecture', link: '/projects/lumex-client/architecture' },
          { text: 'Troubleshooting', link: '/projects/lumex-client/troubleshooting' }
        ]
      },
      {
        text: 'Multi AI Chat',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/projects/multi-ai-chat/' },
          { text: 'Getting Started', link: '/projects/multi-ai-chat/getting-started' },
          { text: 'Development', link: '/projects/multi-ai-chat/development' },
          { text: 'Troubleshooting', link: '/projects/multi-ai-chat/troubleshooting' }
        ]
      },
      {
        text: 'Documentation versions',
        collapsed: true,
        items: [
          { text: 'All versions', link: '/versions/' },
          ...archivedVersions
        ]
      }
    ],

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
      label: 'On this page',
      level: [2, 3]
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    footer: {
      message: 'Documentation for Freetime Maker projects',
      copyright: 'Copyright © Freetime Maker'
    }
  }
})
