import { defineConfigWithTheme, type DefaultTheme } from "vitepress";
import versions from "../versions.json" with { type: "json" };
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { buildArchiveSidebar, buildVersionPages } from "./version-navigation";

const docsDir = fileURLToPath(new URL("../", import.meta.url));
const docsBase = process.env.DOCS_BASE ?? "/Freetime-Docs/";
if (
  !/^\/(?:[A-Za-z0-9._~-]+\/)*$/.test(docsBase) ||
  docsBase.split("/").some((segment) => segment === "." || segment === "..")
) {
  throw new Error(
    "DOCS_BASE must be a root-relative path beginning and ending with '/', without dot segments.",
  );
}

const projectSidebar = [
  {
    text: "Freetime Core",
    collapsed: true,
    items: [
      { text: "Overview", link: "/projects/freetime-core/" },
      {
        text: "Getting Started",
        link: "/projects/freetime-core/getting-started",
      },
      { text: "Modules", link: "/projects/freetime-core/modules" },
      {
        text: "Design & Liquid Glass",
        link: "/projects/freetime-core/design",
      },
      {
        text: "FreetimeWarn",
        link: "/projects/freetime-core/freetime-warn",
      },
      {
        text: "Troubleshooting",
        link: "/projects/freetime-core/troubleshooting",
      },
    ],
  },
  {
    text: "All API",
    collapsed: true,
    items: [
      { text: "Overview", link: "/projects/all-api/" },
      {
        text: "Getting Started",
        link: "/projects/all-api/getting-started",
      },
      { text: "Using the API", link: "/projects/all-api/using-the-api" },
      { text: "API Reference", link: "/projects/all-api/api-reference" },
      { text: "Authentication", link: "/projects/all-api/authentication" },
      { text: "Development", link: "/projects/all-api/development" },
      {
        text: "Troubleshooting",
        link: "/projects/all-api/troubleshooting",
      },
    ],
  },
  {
    text: "GeoWeather",
    collapsed: true,
    items: [
      { text: "Overview", link: "/projects/geoweather/" },
      {
        text: "Getting Started",
        link: "/projects/geoweather/getting-started",
      },
      {
        text: "Installation & Build",
        link: "/projects/geoweather/installation",
      },
      { text: "Features", link: "/projects/geoweather/features" },
      { text: "Configuration", link: "/projects/geoweather/configuration" },
      { text: "Architecture", link: "/projects/geoweather/architecture" },
      {
        text: "Troubleshooting",
        link: "/projects/geoweather/troubleshooting",
      },
    ],
  },
  {
    text: "Luma Store",
    collapsed: true,
    items: [
      { text: "Overview", link: "/projects/luma-store/" },
      {
        text: "Getting Started",
        link: "/projects/luma-store/getting-started",
      },
      {
        text: "Building Custom Clients",
        link: "/projects/luma-store/custom-clients",
      },
      { text: "Sources", link: "/projects/luma-store/sources" },
      { text: "App Submissions", link: "/projects/luma-store/submissions" },
      { text: "Android", link: "/projects/luma-store/android" },
      {
        text: "Developer Dashboard",
        link: "/projects/luma-store/developer-dashboard",
      },
      { text: "Linux", link: "/projects/luma-store/linux" },
      {
        text: "Troubleshooting",
        link: "/projects/luma-store/troubleshooting",
      },
    ],
  },
  {
    text: "SuperSMP Companion",
    collapsed: true,
    items: [
      { text: "Overview", link: "/projects/supersmp-companion/" },
      {
        text: "Getting Started",
        link: "/projects/supersmp-companion/getting-started",
      },
      {
        text: "Development",
        link: "/projects/supersmp-companion/development",
      },
      {
        text: "Troubleshooting",
        link: "/projects/supersmp-companion/troubleshooting",
      },
    ],
  },

  {
    text: "MD-Blog",
    collapsed: true,
    items: [
      { text: "Overview", link: "/projects/md-blog/" },
      {
        text: "Getting Started",
        link: "/projects/md-blog/getting-started",
      },
      { text: "Architecture", link: "/projects/md-blog/architecture" },
      {
        text: "Troubleshooting",
        link: "/projects/md-blog/troubleshooting",
      },
    ],
  },
  {
    text: "Multi AI Chat",
    collapsed: true,
    items: [
      { text: "Overview", link: "/projects/multi-ai-chat/" },
      {
        text: "Getting Started",
        link: "/projects/multi-ai-chat/getting-started",
      },
      { text: "Development", link: "/projects/multi-ai-chat/development" },
      {
        text: "Troubleshooting",
        link: "/projects/multi-ai-chat/troubleshooting",
      },
    ],
  },
];

const currentSidebar = [
  { text: "Getting Started", link: "/getting-started/" },
  { text: "Overview", link: "/" },
  { text: "Projects", link: "/projects/" },
  ...projectSidebar,
];

export default defineConfigWithTheme<
  DefaultTheme.Config & { versionPages: Record<string, string[]> }
>({
  title: "Freetime Docs",
  description: "Documentation for maintained Freetime Maker projects",
  base: docsBase,
  cleanUrls: true,
  async buildEnd(config) {
    await writeFile(
      join(config.outDir, ".deployment.json"),
      JSON.stringify({ base: config.site.base }) + "\n",
    );
  },
  lastUpdated: true,
  markdown: {
    externalLinks: { target: "_blank", rel: "noopener noreferrer" },
  },
  head: [
    ["link", { rel: "icon", href: `${docsBase}img/favicon.ico` }],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `${docsBase}img/favicon-32x32.png`,
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `${docsBase}img/favicon-16x16.png`,
      },
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: `${docsBase}img/apple-touch-icon.png`,
      },
    ],
    ["link", { rel: "manifest", href: `${docsBase}img/site.webmanifest` }],
  ],

  appearance: true,
  locales: {
    root: { label: "English", lang: "en", link: "/" },
    de: { label: "Deutsch", lang: "de", link: "/de/" },
  },
  transformPageData(pageData) {
    pageData.frontmatter.lang = pageData.relativePath.startsWith("de/")
      ? "de"
      : "en";
  },
  themeConfig: {
    i18nRouting: false,
    versionPages: buildVersionPages(docsDir, versions),
    sidebar: {
      "/": currentSidebar,
      "/de/": [
        { text: "Erste Schritte", link: "/de/getting-started/" },
        { text: "Übersicht", link: "/de/" },
        { text: "Projekte (Englisch)", link: "/projects/" },
        ...projectSidebar,
      ],
      ...Object.fromEntries(
        versions.versions
          .filter((version) => version !== versions.current)
          .map((version) => [
            `/versions/${version}/`,
            buildArchiveSidebar(docsDir, version),
          ]),
      ),
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/FreetimeMaker/Freetime-Docs",
      },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Search docs",
            buttonAriaLabel: "Search documentation",
          },
          modal: {
            noResultsText: "No documentation found",
            resetButtonTitle: "Clear query",
            footer: {
              selectText: "select",
              navigateText: "navigate",
              closeText: "close",
            },
          },
        },
      },
    },

    outline: {
      label: "On this page",
      level: [2, 3],
    },

    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },

    footer: {
      message: "Documentation for Freetime Maker projects",
      copyright: "Copyright © Freetime Maker",
    },
  },
});
