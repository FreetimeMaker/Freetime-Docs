import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import ProjectBackLink from "./ProjectBackLink.vue";
import ProjectCards from "./ProjectCards.vue";
import ProjectHeader from "./ProjectHeader.vue";
import ProjectPaths from "./ProjectPaths.vue";
import ProjectDiagram from "./ProjectDiagram.vue";
import ProjectScreenshot from "./ProjectScreenshot.vue";
import PageFeedback from "./PageFeedback.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: ProjectBackLink,
  enhanceApp({ app }) {
    app.component("ProjectCards", ProjectCards);
    app.component("ProjectHeader", ProjectHeader);
    app.component("ProjectPaths", ProjectPaths);
    app.component("ProjectDiagram", ProjectDiagram);
    app.component("ProjectScreenshot", ProjectScreenshot);
    app.component("PageFeedback", PageFeedback);
  },
} satisfies Theme;
