import {
  createPalette,
  DEFAULT_SETTINGS,
  normalizeSettings,
  STORAGE_KEY,
} from "./design-palette.js";

// docmd may execute custom scripts again after client-side navigation.
if (!window.freetimeDesignPicker) {
  const root = document.documentElement;
  let settings = readSettings();
  let frame;
  let paletteKey;
  let palette = {};

  function readSettings() {
    try {
      return normalizeSettings(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function apply() {
    const dark = root.dataset.theme === "dark";
    const key = `${settings.seed}:${dark}`;
    if (key !== paletteKey) {
      palette = createPalette(settings.seed, dark);
      paletteKey = key;
    }
    for (const [name, color] of Object.entries(palette))
      root.style.setProperty(name, color);
    syncControls();
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Private/restricted storage must not disable the in-memory selection.
    }
  }

  function syncControls() {
    for (const picker of document.querySelectorAll(".design-picker")) {
      picker.querySelector("input").value = settings.seed;
    }
  }

  function mount() {
    const sidebar = document.querySelector(".summer-sidebar");
    if (!sidebar || sidebar.querySelector(".design-picker")) return;
    const picker = document.createElement("details");
    picker.className = "design-picker";
    picker.innerHTML = `
            <summary>Accent color</summary>
            <div class="design-picker__panel">

                <label class="design-picker__color">Accent color
                    <input type="color" aria-label="Material You accent color">
                </label>
                <button type="button" class="design-picker__reset">Reset color</button>
                <p>Saved in this browser. Light and dark mode follow the existing theme setting.</p>
            </div>`;

    const colorInput = picker.querySelector("input");
    colorInput.addEventListener("input", () => {
      settings = normalizeSettings({ ...settings, seed: colorInput.value });
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    });
    colorInput.addEventListener("change", save);
    picker.querySelector("button").addEventListener("click", () => {
      cancelAnimationFrame(frame);
      settings = { ...DEFAULT_SETTINGS };
      apply();
      save();
    });
    sidebar.insertBefore(picker, sidebar.querySelector("nav"));
    syncControls();
  }

  function refresh() {
    mount();
    apply();
  }

  window.freetimeDesignPicker = { refresh };
  new MutationObserver(apply).observe(root, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      settings = readSettings();
      apply();
    }
  });
  document.addEventListener("docmd:page-mounted", refresh);
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", refresh, { once: true });
  else refresh();
} else {
  window.freetimeDesignPicker.refresh();
}
