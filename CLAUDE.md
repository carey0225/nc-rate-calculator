# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test suite exists in this project.

## Architecture

Single-page React 19 app built with Vite. All data is hardcoded — there is no backend or API.

**Routing** (React Router DOM, 3 routes):
- `/` — Bill Estimator (`Home` component in [src/App.jsx](src/App.jsx))
- `/deep-dive` — Unbundled cost breakdown ([src/DeepDive.jsx](src/DeepDive.jsx))
- `/data` — Tableau embed ([src/TableauPage.jsx](src/TableauPage.jsx))

**Rate data** lives entirely as inline objects inside the `Home` component (`utilityData` in `App.jsx`). It covers both utilities (DEP = Duke Energy Progress, DEC = Duke Energy Carolinas), both rate types (standard flat rate, TOU), and both current/proposed rate schedules. When updating rates, edit only `utilityData` — the `calculateBill` function applies them dynamically.

**Bill calculation** (`calculateBill` in `App.jsx`): sums customer charge + energy + storm + rider + clean energy rider, then applies a fixed 7% NC sales tax.

**Tableau embed** (`TableauPage.jsx`): dynamically appends the Tableau Embedding API 3 script to `<head>` and uses the `<tableau-viz>` Web Component. The Tableau view URL is hardcoded in the component.

**Analytics**: GA4 initialized in [src/main.jsx](src/main.jsx) with measurement ID `G-N8F8BMCNMG`. Page views are tracked via the `AnalyticsTracker` component (uses `useLocation` effect).

## Styling conventions

All styles are inline `brandStyles` objects defined per-component — there are no CSS modules or shared style constants. NCSEA brand colors used throughout:
- Blue: `#007dc3`
- Dark Blue: `#254c91`
- Green: `#98bf3c`
- Dark Green: `#368843`
- Gray: `#636566`

`App.css` provides a handful of layout classes (`bill-page-bg`, `official-bill-container`, `bill-slider`, etc.) used via `className`.
