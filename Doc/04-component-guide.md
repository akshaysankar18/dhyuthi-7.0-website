# Dhyuthi 7.0 — Reusable Component Guide for Future IEEE Events

## 1. Overview & Reusability Philosophy

All UI components and scripts in this repository have been engineered to be **agnostic, modular, and configurable**. Future IEEE SCT Student Branch webmasters can adapt this codebase for:
- **Dhyuthi 8.0** and subsequent flagship editions.
- **IEEE Student-Branch Congress / Annual General Meetings (AGM)**.
- **Stand-alone Hackathons (e.g. Synapse, TrailQuest, Robocon)**.
- **Single-track Technical Workshops & Society Conferences (Computer Society, RAS, WIE, ComSoc)**.

---

## 2. Reusable Component Catalog

### 2.1 Volumetric God Rays Background Canvas (`particleCanvas.js` & `hero.css`)
- **Location**: `js/components/particleCanvas.js`, `css/components/hero.css`
- **Purpose**: Procedural light ray canvas anchored firmly at the horizon, casting peaceful atmospheric golden/violet shafts without distracting cursor motion.
- **How to Adapt**:
  ```javascript
  // Inside particleCanvas.js:
  // To modify ray density, colors, or base speed:
  const rayColors = ['rgba(212, 175, 55, 0.12)', 'rgba(147, 72, 252, 0.08)'];
  ```

### 2.2 Gyroscopic Astrolabe Chronometer Intro (`introAnimation.js` & `intro.css`)
- **Location**: `js/components/introAnimation.js`, `css/components/intro.css`
- **Purpose**: High-tech sci-fi entrance sequence featuring rotating gyroscopic concentric rings, circular SVG progress tracking (`0% - 100%`), and smooth dismissal.
- **How to Adapt**:
  - Update festival title or duration in `introAnimation.js`:
    ```javascript
    new IntroAnimation({ duration: 1800 }); // Adjust timer in milliseconds
    ```
  - Replay buttons can be placed anywhere with `data-action="replay-intro"`.

### 2.3 Interactive Holographic Campus Radar (`campusRadar.js` & `faq-venue.css`)
- **Location**: `js/components/campusRadar.js`, `css/components/faq-venue.css`
- **Purpose**: Tactical SVG campus blueprint with rotating sweep ray, interactive beacons, telemetry drawer, and Google Maps satellite toggle.
- **How to Add a Campus Zone / Beacon**:
  Inside `campusRadar.js`, add an entry to `this.zones`:
  ```javascript
  'zone-seminar': {
    id: 'zone-seminar',
    name: 'Seminar Hall 1',
    category: 'Paper Presentation',
    tag: 'CAPACITY: 200',
    coords: '8.4704° N, 76.9785° E',
    desc: 'Audio-visual seminar hall for research symposiums.',
    highlights: ['4K Projector', 'Acoustic Panels'],
    walkingTime: '1 min walk from Main Gate',
    pinX: 52,
    pinY: 42
  }
  ```

### 2.4 Pre-Events Showcase (`preEvents.js` & `pre-events.css`)
- **Location**: `js/components/preEvents.js`, `css/components/pre-events.css`
- **How to Add a New Pre-Event**:
  Append an object to `PRE_EVENTS_DATA` inside `preEvents.js`:
  ```javascript
  {
    id: 'circuit-clash',
    title: 'Circuit Clash',
    tagline: 'Hardware Debugging Challenge',
    track: 'Robotics & Automation Society',
    poster: 'assets/images/poster-circuitclash.jpg',
    prizePool: '₹10,000',
    date: 'OCT 19, 2026',
    mode: 'Hardware Lab',
    teamSize: '2 Members',
    status: 'Live',
    shortDesc: 'Trace PCB faults and assemble microcontroller breadboard routines under time pressure.',
    rules: ['Oscilloscopes provided', 'No internet access during circuit analysis']
  }
  ```

### 2.5 Live Event Search & Filter (`eventSearch.js`)
- **Location**: `js/components/eventSearch.js`
- **Purpose**: Instant client-side fuzzy search across all workshops, hackathons, and pre-events with active tag filter pills.
- **How to Adapt**: Point `EventSearch` at any container with `data-search-title` and `data-search-category` attributes.

### 2.6 Dynamic Pass Calculator (`ticketCalculator.js` & `tickets.css`)
- **Location**: `js/components/ticketCalculator.js`, `css/components/tickets.css`
- **How to Adapt Pricing**:
  Change the price configuration in `ticketCalculator.js`:
  ```javascript
  this.prices = {
    single: { base: 599, discounted: 479 },
    allAccess: { base: 999, discounted: 799 },
    preEvents: { base: 249, discounted: 199 }
  };
  ```

### 2.7 Schedule & One-Click Calendar (.ICS) Exporter (`schedule.js`)
- **Location**: `js/components/schedule.js`
- **How to Adapt**:
  Edit the template string inside `exportIcsCalendar()` to adjust festival dates, session titles, and coordinate descriptions. The function automatically triggers a clean RFC 5545 `.ics` calendar invitation download.

### 2.8 Corner Bracket HUD Container (`.bracket-box`)
- **Location**: `css/base.css`
- **Syntax**:
  ```html
  <div class="glass-card bracket-box">
    <div class="bracket-tl"></div>
    <div class="bracket-tr"></div>
    <div class="bracket-bl"></div>
    <div class="bracket-br"></div>
    <!-- Card content here -->
  </div>
  ```

### 2.9 Solar Chronometer / Festival Countdown (`countdown.js`)
- **Location**: `js/components/countdown.js`, `css/components/countdown.css`
- **Purpose**: Displays a live, four-pod glassmorphic digital astrolabe chronometer (Days, Hours, Minutes, Seconds) with micro-pulse animations and Google Calendar synchronization.
- **How to Adapt**:
  Pass a new ISO date string to the `Countdown` constructor:
  ```javascript
  new Countdown({ targetDate: '2027-10-22T09:00:00+05:30' });
  ```
  The component automatically computes day/hour/minute/second deltas, updates the DOM with zero-padding, triggers the `.tick` pulse on second changes, and seamlessly switches to the `"DHYUTHI 7.0 IS LIVE NOW!"` state upon ignition.

---

## 3. Theme Re-Skinning via CSS Variables

To switch to a completely new event palette, update `css/variables.css`:

```css
/* Example: Cyber-Cyan & Emerald Palette for an IoT / Robotics Summit */
:root {
  --gold-500: #06b6d4; /* Primary Accent */
  --gold-600: #0891b2;
  --gold-glow: rgba(6, 182, 212, 0.45);
  --violet-500: #10b981; /* Secondary Accent */
  --violet-600: #059669;
  --grad-text-gold: linear-gradient(180deg, #ffffff 0%, #67e8f9 45%, #06b6d4 100%);
}
```
All buttons, borders, text gradients, glows, and badges will re-skin uniformly across the entire website.
