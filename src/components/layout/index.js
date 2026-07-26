// ─── LAYOUT COMPONENTS BARREL ─────────────────────────────────────────────────
// Structural / chrome components (headers, backgrounds, scaffolding, overlays).

export { default as Header } from './Header';
export { default as Background } from './Background';
export { StatusBarRow } from './StatusBarRow';
export { ScreenScaffold } from './ScreenScaffold';
// NOTE: UserDrawer is intentionally not re-exported here — it is not currently
// wired into any screen and references an avatar asset that must be added before
// use. Import it directly from './UserDrawer' once that asset exists.
