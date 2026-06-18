# MovieMood Pro

A premium, Netflix-inspired movie discovery app. Find movies by trending/popular/top-rated lists, or by mood. Built with React + Vite, powered by the TMDB API.

## ⚠️ Important security note

If you previously pasted a TMDB API token into a chat, browser console, or anywhere public, **revoke it now** at https://www.themoviedb.org/settings/api and generate a new one. Only put the new token in your local `.env` file, which is git-ignored and never leaves your machine.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your local environment file:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and paste your TMDB **v4 Read Access Token** (the long Bearer-style token, not the short v3 API key):
   ```
   VITE_TMDB_API_TOKEN=your_real_token_here
   ```
   Get one free at https://www.themoviedb.org/settings/api (click "API Read Access Token").

4. Run the dev server:
   ```bash
   npm run dev
   ```
   Open the printed local URL (default `http://localhost:5173`).

5. Build for production:
   ```bash
   npm run build
   npm run preview   # optional, serves the production build locally
   ```

## I haven't been able to test-run this build

Network access was unavailable in the environment I built this in, so I could not run `npm install` or `npm run dev`/`build` myself to confirm it compiles and runs end-to-end. I've manually traced every import/export pair and JSX block for correctness, but **please run it locally and tell me about any errors** — I can fix them immediately once I see real output (e.g. paste a terminal error or browser console error back to me).

## Project structure

```
src/
  components/   Reusable UI: Header, Footer, MovieCard, MovieRow, Hero,
                TrailerModal, MoodCard, Skeletons, States (error/empty),
                ErrorBoundary, LazyImage
  pages/        Home, Moods, MoodResults, MovieDetails, Favorites, NotFound
  context/      FavoritesContext (localStorage-backed)
  hooks/        useAsync (data fetching), useMovieSearch (debounced search)
  services/     tmdb.js — all TMDB API calls, centralized with error handling
  utils/        moods.js (mood → genre mapping), format.js (date/runtime/etc.)
  styles/       global.css — black/red theme tokens, glass utility, animations
```

## Notes on how moods work

There's no "mood" concept in TMDB's API, so each mood (Happy, Sad, Excited, etc.) is mapped in `src/utils/moods.js` to a combination of genre IDs, sort order, and a minimum rating threshold, then queried via TMDB's `/discover/movie` endpoint. Tweak `src/utils/moods.js` to change which genres/ratings define each mood.

## Deployment

- **Vercel**: `vercel.json` is included for SPA routing (so `/movie/123` doesn't 404 on refresh). Set `VITE_TMDB_API_TOKEN` in your Vercel project's Environment Variables.
- **Netlify**: `public/_redirects` is included for the same reason. Set the env var in Netlify's site settings.
- For any other static host, make sure all routes fall back to `index.html`, and that `VITE_TMDB_API_TOKEN` is set at **build time** (Vite inlines env vars into the build — there's no real server-side secret in a static SPA; the key will be visible in the built JS bundle to anyone who inspects it).

## A note on "server-side loading"

This is a client-side SPA (Vite + React, no Node server), so movie data is fetched from the browser on each page load, not pre-rendered server-side. If you need true SSR/SSG (so the key never reaches the browser and pages are pre-rendered), that requires a different framework like Next.js — let me know if you'd like me to port it.
