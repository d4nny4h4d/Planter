# Treecko

A personal plant and bonsai care app for the phone. It runs as an installable web app (PWA): no app store, no account, and everything is stored on the device.

## What it does

- **Scan** – point the camera at a plant or bonsai to identify it and get a full care sheet.
- **Care sheets** – watering (adjusted for your location, season and today's heat), temperature, sunlight, fertilizer, soil mix and pH, humidity, pruning, propagation, common problems, toxicity and precautions.
- **Personal care plan** – describe where each plant lives (window direction and distance, air conditioning, sun exposure, pot) and Claude writes a plan for exactly those conditions: water volume and timing, placement, AC and light advice, feeding, this month's jobs. Its watering schedule follows the live forecast and the plan rewrites itself when the season, location or spot changes.
- **Plants** – your collection, a built-in library of 26 common plants, and name look-up for anything else.
- **Bonsai** – your trees with watering, feeding, wiring and repotting reminders; 16 species guides with seasonal calendars; 10 styles and 8 technique guides; photo-based styling advice.
- **Today** – what needs doing now, one tap to tick it off, snooze, undo.
- **Journal and photos** – a care log and growth timeline for every plant.
- **Dr. Green** – photograph a plant that looks unwell (up to four photos, plus any symptoms you have noticed) for a diagnosis, a step-by-step cure, what to buy, whether it can spread, and what recovery looks like. Check-ups are kept, and a re-check reminder appears on Today.
- **Backup** – export and restore the whole collection, photos included, as one file.

## Photo recognition

Identification, name look-up, health checks and styling advice call the Claude API directly from the phone using your own API key (Settings → Photo recognition). The key is kept only on the device. The built-in libraries, schedules, journal and guides work without a key.

**Dr. Green chat.** Treecko can set up a "Dr. Green" project in your own Claude account: it writes the project instructions, saves the link, and copies a plant's details for you to paste alongside your photos.

**No API key?** The "Claude app" section does the same jobs by hand: Treecko writes the request, you send it from the Claude app on your own plan, and paste the reply back.

Weather comes from Open-Meteo (no key needed) once a location is set.

## Run it

```sh
npm install
npm run dev      # development server
npm run build    # production build in dist/
npm run preview  # serve the production build
```

The camera needs HTTPS (or localhost).

## Put it on your phone

1. Host the `dist/` folder on any HTTPS static host. A GitHub Pages workflow is included: merge to `main`, then enable Pages under Settings → Pages → Source: GitHub Actions.
2. Open the URL in Chrome on Android and choose **Add to Home screen** / **Install app**.

It then opens full-screen like a native app and works offline, apart from recognition and weather.
