# One Time Hockey — Stickhandling Program

## File Structure
```
oth_stickhandling/
  index.html        Home / overview / progress dashboard
  foundation.html   Level 1: Foundation (8 drills)
  tricks.html       Level 2: Tricks (9 drills)
  advanced.html     Level 3: Advanced (6 drills)
  guide.html        Full printable reference (all 23 drills)
  css/style.css     All styles
  js/main.js        All drill data + progress + interactivity
  README.md         This file
```

## Adding Video Demonstrations

1. Upload your drill videos to YouTube as **Unlisted**
2. Open the video → Share → Embed → copy the URL inside `src="..."`
   Format: `https://www.youtube.com/embed/XXXXXXXXXXX`
3. Open `js/main.js`
4. Find the drill by ID (e.g., F1, T4, A2)
5. Replace `VIDEO_PLACEHOLDER` with the embed URL

Example:
```js
// Before
video: VIDEO_PLACEHOLDER

// After
video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
```

The video will appear on the drill card automatically.

## Deploying to One Time Hockey Website

Drop the `oth_stickhandling/` folder inside your existing site:
```
onetimehockey/
  index.html       (main site)
  oth_stickhandling/   ← here
```

Back-links to `../index.html`, `../book.html` etc. will work automatically.

## Updating Drills

Edit the drill arrays in `js/main.js`:
- `FOUNDATION` — Foundation drills (F1–F8)
- `TRICKS` — Tricks drills (T1–T9)  
- `ADVANCED` — Advanced drills (A1–A6)

Each drill object: `id, name, tag, duration, desc, steps[], tip, keyPoints[], video`

Steps are a plain JS array — one string per step.

© 2026 One Time Hockey LLC · Raleigh, NC
