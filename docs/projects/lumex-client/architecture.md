# Architecture

Lumex Client separates the launcher from the Minecraft in-game client.

## Launcher

The desktop launcher uses Neutralinojs with HTML, CSS and JavaScript. Neutralino provides the native bridge without bundling a Chromium runtime like Electron.

The configured native API allows application, computer, event, filesystem, OS, storage, updater and window operations.

## Desktop window

The default launcher window is 1180×720 with a minimum size of 900×600. Native APIs and the embedded local server are enabled.

## Minecraft client

The in-game component is a separate Fabric mod. This keeps Minecraft-specific code in the Java/Fabric environment while the launcher remains a lightweight web-technology desktop application.

## Platform storage

Launcher-managed data uses platform-aware locations:

- Windows: application data under the user's AppData area.
- Linux: XDG data paths with a home-directory fallback.
- Flatpak: the application's sandboxed data directory.

## Packaging

Neutralino builds the launcher binaries. Linux distribution additionally has a Flatpak foundation.
