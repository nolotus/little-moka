# Little Moka

Buildless static app. Serve `dist/`. Run `node tests/recipes.mjs` for model/animation checks.

## Add a drink

Add an entry in `dist/recipes.js` with unique id, version, name, method, base serving size, range, equipment and steps. Existing actions need no runner or page changes. Reuse step objects (as iced moka reuses moka preparation) or compose independent steps. Parameters interpolate `{dose}`, `{milk}`, `{coffee}`, `{target}`, `{water}`, `{bloom}`, `{ice}`.

`makeConfig` owns scaling and cup capacity rules. Add a method rule only for a genuinely new scaling strategy. Moka basket dose does not scale with beverage volume. Hand brew uses approximate 2g/g water retention. Ice volume and foam allowance are approximate; never represent them as measured output.

Steps declare `action`, title/text/tip, optional `requires`/`produces`, optional `seconds`/`timerLabel`, and optional `add` for cumulative serving-cup contents. `validateRecipe` checks dependencies and action availability. Add new actions to the registry and renderer together.

`dist/art.js` retains existing hand-drawn moka equipment and preparation animation. `dist/animation.js` combines those with shared pour, glass, ice and filter actions. Unique SVG IDs prevent cross-card clipping collisions. The serving cup shows accumulated contents scaled to capacity; illustrations are schematic, not physical fluid simulation.

`dist/app.js` owns progress, review mode and timers. Completed actions are derived from completed steps, never replayed as mutations. Timer deadlines use wall time, independent of animation. Recipe/config snapshots are saved locally at start so source edits cannot change an in-progress cup. No backend or paid APIs. Local storage is browser-specific, not account sync.

Keep new recipe versions explicit. A future editor, alternate equipment paths and parallel step scheduling can build on this model; no editor or parallel scheduler is included in this version.

## Visuals and sound

The task card uses 16–19px instruction text, high contrast, highlighted quantities, a paper/tape treatment and a framed illustration stage. Small-screen timer layout keeps controls beside the clock. SVG sketch filters are referenced by per-scene unique IDs.

`dist/sound.js` synthesizes short interface, action and completion cues with Web Audio. First interaction unlocks audio. The sound toggle persists locally and immediately stops scheduled sources. Timers mark notifications once per deadline; no repeating alarm. Background/screen-locked sound depends on browser audio policy. Test scheduling/mute with `node tests/sound.mjs`.
