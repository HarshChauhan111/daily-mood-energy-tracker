# Daily Mood & Energy Tracker

A calm, journal-styled React app for logging how each day feels — mood,
energy level, and a short note — with a history you can filter, search,
and review over time. Built for the Daily Mood & Energy Tracker
assessment brief.

**Live logic, no backend.** Everything is stored in the browser via
`localStorage`, so entries survive a page refresh but never leave the
device.

## Getting started

```bash
npm install
npm start
```

This runs the app at `http://localhost:3000` using Create React App's
dev server. To produce a production build:

```bash
npm run build
```

## Folder structure

```
mood-tracker/
├── public/
│   └── index.html              # HTML shell, loads Fraunces + Inter fonts
├── src/
│   ├── components/
│   │   ├── MoodEntryForm.jsx          # Section 1 — new entry form + validation
│   │   ├── MoodEntryForm.module.css
│   │   ├── MoodFilter.jsx             # Section 2 — mood filter chips
│   │   ├── MoodFilter.module.css
│   │   ├── MoodHistory.jsx            # Section 3 — list wrapper + empty state
│   │   ├── MoodHistory.module.css
│   │   ├── MoodEntryCard.jsx          # Single history entry + delete confirm
│   │   ├── MoodEntryCard.module.css
│   │   ├── MoodSummary.jsx            # Section 4 — total/top mood/avg energy
│   │   └── MoodSummary.module.css
│   ├── hooks/
│   │   └── useLocalStorage.js  # Generic state <-> localStorage sync hook
│   ├── utils/
│   │   ├── moodConfig.js       # Single source of truth: moods, colors, limits
│   │   └── dateHelpers.js      # ISO date + human-readable date formatting
│   ├── styles/
│   │   └── global.css          # Design tokens (color/type/radius/shadow) + resets
│   ├── App.jsx                 # Top-level layout, owns entries/filter/search state
│   ├── App.module.css
│   └── index.jsx               # React DOM entry point
└── package.json
```

### Why this structure

- **One component, one job.** Each of the four required UI sections
  (entry form, filter, history, summary) is its own component with its
  own CSS Module, so styles never leak across sections and each piece
  can be tested or reused independently.
- **`App.jsx` is the only place that owns shared state** — the list of
  entries, the active mood filter, and the search term. Children
  receive data and callbacks as props and stay "dumb," which keeps the
  data flow easy to trace.
- **`moodConfig.js` is the single source of truth** for the five moods,
  their emoji, and their accent colors. Every component (form, filter,
  card, summary) reads from this file, so adding a sixth mood later
  means editing one array, not five components.
- **`useLocalStorage` is generic**, not "useMoodEntries" — it just
  syncs any piece of state to `localStorage` by key. That keeps
  persistence logic decoupled from mood-tracking logic specifically.

## Functional checklist

- **Add entry** — pick a mood, pick an energy level (1–5), optionally
  write a note (200 char max with a live counter), date is set
  automatically to today.
- **Validation** — mood and energy are required; clear inline error
  messages appear under the relevant field instead of a generic alert.
- **Persistence** — entries are written to `localStorage` on every
  change and reloaded on startup, so a refresh doesn't lose data.
- **History** — newest entry first, each shown as a card with mood
  emoji + label, an energy "dot" meter, the note (or a placeholder if
  empty), and the formatted date.
- **Filter** — chips for All + each of the five moods, with a live
  count next to each one.
- **Delete** — clicking the ✕ swaps the button for an inline "Delete
  this entry? / Delete / Cancel" confirmation rather than a browser
  `confirm()` popup, to stay in keeping with the visual design.
- **Summary** — total entries, most-selected mood (computed from the
  *entire* history, not the filtered view), and average energy,
  rendered as three stat "stamps."

## Bonus features included

- **Search by note** — a search field above the history filters
  entries by note text, composable with the mood filter.
- **Responsive design** — the layout, mood chips, and energy scale
  reflow for narrow/mobile viewports.
- **Subtle motion** — new entries settle into place with a short
  fade/slide; all transitions respect `prefers-reduced-motion`.
- **Accessible by default** — radio-group semantics for mood/energy
  pickers, `aria-live`-friendly error messages, and visible focus
  rings throughout.

## Design notes

The brief is emotional, not transactional, so the visual direction
deliberately avoids the "analytics dashboard" look (dark mode, bar
charts, KPI cards) in favor of something closer to a paper journal:
a warm cream background, a serif display face (Fraunces) for headings
and mood labels paired with Inter for UI text and data, and mood
entries styled like index cards with a colored spine rather than
generic list rows. Energy is shown as a row of filled dots — a small
tally mark instead of a generic progress bar — to keep the "marking
off how you feel" metaphor consistent throughout the app.
