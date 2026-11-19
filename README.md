# Miku sidebar background

Shows the official Hatsune Miku module artwork from *Project DIVA Future Tone*
in the left sidebar background, and adds a settings page to choose how it picks
the image.

## Install

- **From GitHub:** add this repository as a plugin (Plugins → Add plugin →
  `https://github.com/Qquanwei/dsh-miku`), or
- **From a market index:** add the index URL
  `https://raw.githubusercontent.com/Qquanwei/dsh-miku/main/market/index.json`
  in the plugin market's index sources, then install `dsh-miku` from Discover.

## Settings

Open **Settings → Plugins → Miku background** and choose:

- **Auto-switch by session** — each session gets a stable card (a hash of the
  session id); switching sessions swaps the card.
- **Use a fixed image** — pick one of the 168 module portraits in a paginated
  grid; it stays until you change it.

The choice is saved to the plugin's configuration and applies immediately.

## How it works

- The bundle ships the 168 module portraits (WebP, opacity baked into the alpha
  channel) under `assets/`, exported through `"./assets/*"`.
- Host: `index.js` declares a `Config` schema (`mode`, `fixedImage`) marked
  `.volatile()` so edits apply live, and disables the auto-generated settings
  page in favor of the custom one.
- Client: `client.js` reads the config through `ctx.configForms` and the current
  session through `ctx.uiSession`, paints the chosen card as the sidebar root's
  `background-image`, and registers the settings page into `settings.plugins.tab`.

## Development note

`index.js` imports `@deepseek-ai/schemastery`. Because this bundle is installed
as a local link (whose imports resolve from its own directory tree, not from the
DSH installation), a copy of `@deepseek-ai/schemastery` and its runtime
dependency `@deepseek-ai/cosmokit` is kept under this package's `node_modules/`.
If you move or re-scaffold the bundle, re-copy those two packages (or declare
them as real dependencies and install them).

## License

The module artwork is © SEGA / © Crypton Future Media, Inc., and is used here
only as a personal, local decoration. **Do not redistribute this bundle** with
the bundled artwork. To publish a plugin, replace the images with artwork whose
license permits redistribution.
