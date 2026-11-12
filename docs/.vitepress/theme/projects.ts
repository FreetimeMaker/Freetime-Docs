export interface ProjectLink {
  label: string;
  path: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  icon: string;
  description: string;
  tags: string[];
  source: string;
  paths: ProjectLink[];
  related: { slug: string; page: string; label: string; reason: string }[];
}

export const projects: Project[] = [
  {
    slug: "freetime-core",
    name: "Freetime Core",
    icon: "FC",
    description: "Shared building blocks for expressive Android applications.",
    tags: ["Android", "Kotlin", "Library"],
    source: "Freetime-Core",
    related: [
      {
        slug: "geoweather",
        page: "architecture",
        label: "GeoWeather architecture",
        reason:
          "See how an Android application combines shared libraries with weather data and background work.",
      },
      {
        slug: "luma-store",
        page: "android",
        label: "Luma Store Android",
        reason:
          "Explore another Compose client using Freetime Core. Check its pinned Core version before copying an integration.",
      },
    ],
    paths: [
      {
        label: "Use the libraries",
        path: "getting-started",
        description: "Add the Maven repository and your first dependency.",
      },
      {
        label: "Explore the modules",
        path: "modules",
        description: "Find the building blocks your app needs.",
      },
      {
        label: "Build your interface",
        path: "design",
        description: "Integrate themes and floating navigation.",
      },
    ],
  },
  {
    slug: "geoweather",
    name: "GeoWeather",
    icon: "GW",
    description:
      "Forecasts, weather alerts and home-screen widgets for Android.",
    tags: ["Android", "Compose", "Weather"],
    source: "GeoWeather",
    related: [
      {
        slug: "freetime-core",
        page: "getting-started",
        label: "Freetime Core integration",
        reason:
          "Understand the shared Android foundation; GeoWeather may pin an earlier library version.",
      },
      {
        slug: "luma-store",
        page: "getting-started",
        label: "Luma Store discovery",
        reason:
          "Explore the Android store ecosystem that distributes GeoWeather.",
      },
    ],
    paths: [
      {
        label: "Use the app",
        path: "getting-started",
        description: "Start with locations, forecasts and widgets.",
      },
      {
        label: "Build from source",
        path: "installation",
        description: "Prepare the Android toolchain and run a build.",
      },
      {
        label: "Explore the architecture",
        path: "architecture",
        description: "Understand weather data, storage and background work.",
      },
    ],
  },
  {
    slug: "luma-store",
    name: "Luma Store",
    icon: "LS",
    description: "Android app discovery, publishing and developer tools.",
    tags: ["Android", "Web", "App store"],
    source: "Luma-Store-Android",
    related: [
      {
        slug: "all-api",
        page: "api-reference",
        label: "Luma catalog API",
        reason:
          "Find the versioned catalog endpoints behind store integrations.",
      },
      {
        slug: "freetime-core",
        page: "design",
        label: "Shared Android design",
        reason:
          "Understand theme and navigation building blocks used by the Android client.",
      },
    ],
    paths: [
      {
        label: "Discover the store",
        path: "getting-started",
        description: "Find your way around clients and publishing tools.",
      },
      {
        label: "Build the Android app",
        path: "android",
        description: "Set up and build the native store client.",
      },
      {
        label: "Integrate a client",
        path: "custom-clients",
        description: "Connect your own client to the store ecosystem.",
      },
    ],
  },
  {
    slug: "supersmp-companion",
    name: "SuperSMP Companion",
    icon: "SC",
    description: "An unofficial Android companion for the SuperSMP community.",
    tags: ["Android", "Community", "Companion"],
    source: "SuperSMP-Companion-App",
    related: [
      {
        slug: "freetime-core",
        page: "getting-started",
        label: "Freetime Core integration",
        reason:
          "Learn the shared Android library conventions used by the companion.",
      },
      {
        slug: "luma-store",
        page: "getting-started",
        label: "Luma Store discovery",
        reason: "Explore the store ecosystem where the companion is listed.",
      },
    ],
    paths: [
      {
        label: "Use the companion",
        path: "getting-started",
        description: "Explore server status, coordinates and community links.",
      },
      {
        label: "Build from source",
        path: "development",
        description: "Configure and build the Android application.",
      },
      {
        label: "Resolve a problem",
        path: "troubleshooting",
        description: "Check connectivity and external service limitations.",
      },
    ],
  },
  {
    slug: "all-api",
    name: "All API",
    icon: "API",
    description: "Backend services, authentication and shared project APIs.",
    tags: ["Node.js", "Express", "Backend"],
    source: "All-API-Node",
    related: [
      {
        slug: "md-blog",
        page: "getting-started",
        label: "Connect MD-Blog",
        reason: "Point the blog renderer at the backend through ALL_API_URL.",
      },
      {
        slug: "luma-store",
        page: "custom-clients",
        label: "Build a store client",
        reason:
          "Use the Luma catalog without confusing it with the separate frontend submission feed.",
      },
    ],
    paths: [
      {
        label: "Make a request",
        path: "using-the-api",
        description: "Learn versioned routes and response handling.",
      },
      {
        label: "Run locally",
        path: "getting-started",
        description: "Configure the backend and start development.",
      },
      {
        label: "Integrate a service",
        path: "api-reference",
        description: "Look up endpoints and authentication requirements.",
      },
    ],
  },
  {
    slug: "md-blog",
    name: "MD-Blog",
    icon: "MD",
    description: "A lightweight Markdown blog frontend powered by All API.",
    tags: ["Node.js", "Markdown", "Web"],
    source: "MD-Blog",
    related: [
      {
        slug: "all-api",
        page: "api-reference",
        label: "Blog API contract",
        reason:
          "Look up the post, category and detail endpoints consumed by the renderer.",
      },
      {
        slug: "all-api",
        page: "getting-started",
        label: "Run the backend locally",
        reason: "Prepare a separate backend port before setting ALL_API_URL.",
      },
    ],
    paths: [
      {
        label: "Start the blog",
        path: "getting-started",
        description: "Run locally and connect your content backend.",
      },
      {
        label: "Understand the renderer",
        path: "architecture",
        description: "Trace routes, templates and API-backed posts.",
      },
      {
        label: "Resolve a problem",
        path: "troubleshooting",
        description: "Diagnose missing posts, routing and backend errors.",
      },
    ],
  },
  {
    slug: "multi-ai-chat",
    name: "Multi AI Chat",
    icon: "AI",
    description: "Multiple AI providers in one JetBrains IDE workflow.",
    tags: ["JetBrains", "Kotlin", "Plugin"],
    source: "Multi-AI-Chat",
    related: [],
    paths: [
      {
        label: "Install and configure",
        path: "getting-started",
        description: "Build the plugin and configure a provider.",
      },
      {
        label: "Develop the plugin",
        path: "development",
        description: "Explore the toolchain and provider clients.",
      },
      {
        label: "Resolve a problem",
        path: "troubleshooting",
        description: "Check models, credentials and IDE compatibility.",
      },
    ],
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
export const projectUrl = (project: Project, page = "") =>
  `/projects/${project.slug}/${page}`;
export const sourceUrl = (project: Project) =>
  `https://github.com/FreetimeMaker/${project.source}`;
