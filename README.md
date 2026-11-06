# yt-clone

A YouTube clone built with **React 18** and styled entirely with **Material UI** (MUI v5), bundled with **Vite**.

## Features

- Responsive header with YouTube-style logo, pill search bar and theme toggle
- Collapsible sidebar on desktop, temporary drawer on mobile
- Category chips and a responsive video grid (1 / 2 / 3 / 4 columns) with hover play overlays and duration / LIVE badges
- Watch page with a mock player (play, pause, seek, timer), like / subscribe toggles, expandable description, comments and an "Up next" rail
- Search filters videos by title, channel and category
- Dark and light MUI themes, with all colours driven by the theme

All video content in `src/data.js` is demo data; thumbnails and avatars are loaded from `picsum.photos` with a gradient fallback. The player is a visual mock and does not play real video files.

## Getting started

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

## Production build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploying

This is a static single-page app, so no server is needed. Any static host works — set the build command to `npm run build` and the output directory to `dist`.

Do not commit `node_modules/` or `dist/`; both are ignored by `.gitignore` and must be produced by the host's install/build step.

## Project structure

```
index.html
vite.config.js
src/
  main.jsx              # theme provider + mount
  theme.js              # MUI light/dark theme
  App.jsx               # layout, sidebar state, view switching
  data.js               # demo videos, categories, comments
  components/
    Navbar.jsx          # header, search, theme toggle
    Sidebar.jsx         # navigation rail
    CategoryChips.jsx   # category filter row
    VideoCard.jsx       # grid card + compact related card
    Player.jsx          # mock video player
  pages/
    Home.jsx            # category filtering, search results, grid
    Watch.jsx           # player, metadata, comments, related videos
```

## Requirements

- Node.js 18 or newer (Node 20+ recommended)
