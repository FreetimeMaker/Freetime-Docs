import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import {
  createPalette,
  DEFAULT_SETTINGS,
  normalizeSettings,
} from "../scripts/design-palette.js";

function luminance(hex) {
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    .map((value) => parseInt(value, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

test("settings reject invalid seeds and migrate legacy design selections", () => {
  for (const value of [
    null,
    undefined,
    {},
    false,
    "wrong",
    { design: "other", seed: "red" },
  ]) {
    assert.deepEqual(normalizeSettings(value), DEFAULT_SETTINGS);
  }
  assert.deepEqual(
    normalizeSettings({ design: "material-you", seed: "#ABCDEF" }),
    {
      seed: "#abcdef",
    },
  );
  assert.deepEqual(
    normalizeSettings({ design: "expressive", seed: "#123456" }),
    { seed: "#123456" },
  );
  assert.deepEqual(
    normalizeSettings({ seed: "#123; color:red" }),
    DEFAULT_SETTINGS,
  );
});

test("static fallback uses the default Material You palette in both themes", () => {
  const css = fs.readFileSync("assets/css/material3.css", "utf8");
  const blocks = [
    css.match(/:root\s*\{([^}]+)\}/s)[1],
    css.match(/html\[data-theme="dark"\]\s*\{([^}]+)\}/s)[1],
  ];
  for (const [index, block] of blocks.entries()) {
    const roles = Object.fromEntries(
      [...block.matchAll(/(--md-[\w-]+):\s*(#[\da-f]{6})/gi)].map((match) => [
        match[1],
        match[2],
      ]),
    );
    assert.deepEqual(
      roles,
      createPalette(DEFAULT_SETTINGS.seed, Boolean(index)),
    );
  }
});

test("palettes are deterministic and light/dark schemes differ", () => {
  assert.deepEqual(
    createPalette("#6750a4", false),
    createPalette("#6750a4", false),
  );
  assert.notDeepEqual(
    createPalette("#6750a4", false),
    createPalette("#6750a4", true),
  );
  assert.notDeepEqual(
    createPalette("#6750a4", false),
    createPalette("#008577", false),
  );
  assert.deepEqual(
    createPalette("invalid", false),
    createPalette(DEFAULT_SETTINGS.seed, false),
  );
});

for (const seed of [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#6750a4",
  "#008577",
  "#00639b",
]) {
  for (const dark of [false, true]) {
    test(`${seed} ${dark ? "dark" : "light"} has complete, contrast-paired roles`, () => {
      const palette = createPalette(seed, dark);
      assert.equal(Object.keys(palette).length, 16);
      for (const value of Object.values(palette))
        assert.match(value, /^#[\da-f]{6}$/i);
      for (const [fg, bg] of [
        ["on-primary", "primary"],
        ["on-primary-container", "primary-container"],
        ["on-secondary-container", "secondary-container"],
        ["on-tertiary-container", "tertiary-container"],
        ["on-surface", "surface"],
        ["on-surface-variant", "surface-container-high"],
        ["primary", "surface"],
      ]) {
        assert.ok(
          contrast(palette[`--md-${fg}`], palette[`--md-${bg}`]) >= 4.5,
          `${fg} / ${bg}`,
        );
      }
    });
  }
}
