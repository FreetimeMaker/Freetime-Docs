# Lumex Client

Lumex Client is a lightweight Minecraft Java launcher/client foundation for Windows and Linux.

**Repository:** [FreetimeMaker/Lumex-Client](https://github.com/FreetimeMaker/Lumex-Client)

## Architecture

The launcher uses Neutralinojs with HTML, CSS and JavaScript rather than Electron or Rust. The in-game client is a separate Fabric mod.

## Current foundation

- Home, Play, Instances, Mods and Settings screens
- Persistent launcher settings
- Windows, Linux and Flatpak-aware data paths
- Java detection
- Instance management
- Minecraft launch service abstraction
- Flatpak packaging foundation
- Fabric client foundation with HUD/client modules

## Development

Install the Neutralino CLI and run:

```bash
npm install -g @neutralinojs/neu
neu update
neu run
```

Build launcher targets with `neu build`. The Fabric client is built separately with Gradle and currently targets a Java 21 Minecraft environment.
