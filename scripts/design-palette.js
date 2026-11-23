import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";

export const DEFAULT_SETTINGS = Object.freeze({ seed: "#00639b" });
export const STORAGE_KEY = "freetime-docs-design";

export function normalizeSettings(value) {
  return {
    seed:
      typeof value?.seed === "string" && /^#[\da-f]{6}$/i.test(value.seed)
        ? value.seed.toLowerCase()
        : DEFAULT_SETTINGS.seed,
  };
}

export function createPalette(seed, dark) {
  const { palettes, schemes } = themeFromSourceColor(
    argbFromHex(normalizeSettings({ seed }).seed),
  );
  const scheme = dark ? schemes.dark : schemes.light;
  const roles = {
    primary: scheme.primary,
    "on-primary": scheme.onPrimary,
    "primary-container": scheme.primaryContainer,
    "on-primary-container": scheme.onPrimaryContainer,
    "secondary-container": scheme.secondaryContainer,
    "on-secondary-container": scheme.onSecondaryContainer,
    "tertiary-container": scheme.tertiaryContainer,
    "on-tertiary-container": scheme.onTertiaryContainer,
    surface: palettes.neutral.tone(dark ? 6 : 98),
    "surface-container-low": palettes.neutral.tone(dark ? 10 : 96),
    "surface-container": palettes.neutral.tone(dark ? 12 : 94),
    "surface-container-high": palettes.neutral.tone(dark ? 17 : 92),
    "on-surface": scheme.onSurface,
    "on-surface-variant": scheme.onSurfaceVariant,
    outline: scheme.outline,
    "outline-variant": scheme.outlineVariant,
  };
  return Object.fromEntries(
    Object.entries(roles).map(([role, color]) => [
      `--md-${role}`,
      hexFromArgb(color),
    ]),
  );
}
