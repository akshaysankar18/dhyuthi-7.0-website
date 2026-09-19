# Dhyuthi 7.0 — Technical Frontend Architecture

## 1. Architectural Principles

The Dhyuthi 7.0 frontend is engineered to satisfy four core technical criteria:
1. **Ultra-Fast Performance**: Instant First Contentful Paint (FCP < 0.6s) and Largest Contentful Paint (LCP < 1.0s) without bundle compilation lag.
2. **Zero-Dependency Core**: Pure standards-compliant HTML5, Vanilla CSS3 tokens, and ES6 JavaScript Modules. No external framework dependencies that deprecate or break over time.
3. **Modularity & Reusability**: Components are decoupled into discrete ES6 classes and component stylesheets that can be directly lifted into future IEEE student branch websites.
4. **Resilient Local Hosting**: Built for high availability with static asset resolution, zero backend runtime requirement, and seamless deployment to GitHub Pages, Vercel, or Netlify.

---

## 2. Directory Structure

```
web Dhyuthi/
├── index.html                  # Semantic, accessible HTML5 entrypoint
├── css/
│   ├── variables.css           # Design tokens, color scales, typography, glassmorphism
│   ├── base.css                # Base resets, typography hierarchy, utilities, bracket HUDs
│   ├── components/             # Discrete modular component stylesheets
│   │   ├── intro.css           # Tathva-inspired astrolabe chronometer intro & shockwave
│   │   ├── header.css          # Sticky glassmorphic nav, pill menus, sound toggle
│   │   ├── hero.css            # Monumental typography, god rays anchor, tri-phase dates
│   │   ├── ticker.css          # Live announcement marquee with duplicate loop
│   │   ├── pre-events.css      # Pre-event poster cards, prize badges, challenge modals
│   │   ├── tracks.css          # Flagship track cards & category tabs (AIGENIX, etc.)
│   │   ├── schedule.css        # 3-day festival agenda tabs & dynamic .ics exporter
│   │   ├── gallery.css         # Media gallery grid & fullscreen lightbox modal
│   │   ├── tickets.css         # Pass tiers, price calculator, IEEE member discount switch
│   │   ├── faq-venue.css       # Accordions, interactive campus radar HUD, transit chips
│   │   ├── modal.css           # Universal registration dialog & receipt generator
│   │   ├── stage-rail.css      # Left fixed stage rail navigator
│   │   ├── metrics-pronite.css # Festival statistics counter & Pronite artist stage
│   │   └── footer.css          # IEEE SCT SB accreditation, logos, & sitemap
│   └── responsive.css          # Adaptive media queries (desktop, tablet, mobile <= 480px)
├── js/
│   ├── main.js                 # App coordinator, scrollspy, event wiring
│   └── components/
│       ├── introAnimation.js   # Astrolabe gyroscopic rotation & SVG circular progress
│       ├── particleCanvas.js   # Volumetric Prismatic God Rays background engine
│       ├── stageRail.js        # Scroll-driven left stage tracking indicator
│       ├── eventSearch.js      # Real-time event search & tag filter engine
│       ├── campusRadar.js      # Interactive SCTCE tactical radar, beacons, & GPS HUD
│       ├── audioSynthesizer.js # Web Audio API atmospheric harmonic synthesizers
│       ├── ticker.js           # Seamless continuous loop marquee controller
│       ├── preEvents.js        # Pre-event modal previews & registration dispatch
│       ├── tracks.js           # Track category filter & syllabus modal controller
│       ├── schedule.js         # 3-Day timeline tabs & dynamic RFC 5545 .ics calendar exporter
│       ├── gallery.js          # Lightbox viewer & category filter
│       ├── ticketCalculator.js # Real-time discount engine & pass checkout calculator
│       └── faq.js              # Accessible accordion controller with keyboard navigation
├── Doc/                        # Project Documentation folder
│   ├── 01-design-decisions.md  # Visual identity, typography, color theory
│   ├── 02-technical-architecture.md # Frontend architecture, algorithms, performance
│   ├── 03-backend-system-design.md # Proposed backend architecture, DDL, workflows
│   ├── 04-component-guide.md   # Reusability catalog for future IEEE webmasters
│   └── 05-api-specification.md # REST API OpenAPI 3.1 specifications
└── assets/
    ├── icons/                  # Scalable vector graphics (IEEE, SCT SB, Dhyuthi, Track badges)
    └── images/                 # Optimized JPEG event posters & gallery photos
```

---

## 3. Volumetric God Rays Canvas Engine (`particleCanvas.js`)

The background features a custom lightweight 2D canvas simulation rendering **Volumetric Prismatic God Rays**:
- **Anchored Horizon Perspective**: Rays originate from a single focal horizon origin ($X_{origin} = \text{center}$, $Y_{origin} = \text{height} \times 0.28$) and fan outwards toward the bottom viewport.
- **Harmonic Angular Oscillation**: Each light beam's angle oscillates smoothly via sinusoidal harmonics:
  $$\theta_i(t) = \theta_{base, i} + A_i \cdot \sin(\omega_i \cdot t + \phi_i)$$
- **Decoupled from Cursor Movement**: In direct response to user testing feedback, light beams remain anchored and stable during reading, avoiding disorienting visual flutter.
- **Prismatic Additive Blending**: Beams utilize `ctx.globalCompositeOperation = 'screen'` with linear gradient falloffs, causing ray intersections to bloom into pure golden radiance.
- **Auto-Throttle on Hidden Tabs**: The animation loop automatically pauses when `document.hidden` is true, preserving battery and mobile resources.

---

## 4. Interactive Holographic Campus Radar (`campusRadar.js`)

Replacing standard iframe maps, the campus radar provides a sci-fi tactical venue overview:
- **Vector Blueprint**: Scalable SVG representation of SCTCE Pappanamcode campus with NH 66 corridor and building footprints (Auditorium, Mech Workshop, CCF Labs, Open Air Arena, Main Gate).
- **Cathode Sweep Beam**: Rotating golden sweep ray with a trailing phosphor gradient (`animation: radarSweepRotate 5.5s linear infinite`).
- **Interactive Hotspot Beacons**: 5 interactive DOM nodes with expanding wave pulses, targeting reticles, and keyboard navigation (`role="button"`, `aria-selected`).
- **Dynamic Telemetry Drawer**: Clicking any zone updates activity highlights, capacity badges, walking time, and plays Web Audio blips.
- **Dual-Mode Layering**: A smooth toggle allows delegates to switch instantly between the Tactical Radar and Google Maps Satellite/street view.

---

## 5. Web Audio API Harmonic Synthesis (`audioSynthesizer.js`)

Rather than streaming heavy MP3/WAV audio files over the network, all acoustic feedback is synthesized directly on the client using the browser's native `AudioContext`:
- **Celestial Awakening Chime**: Generates golden ratio harmonic overtones (432Hz, 540Hz, 648Hz, 864Hz) with exponential decay ramps (`gain.exponentialRampToValueAtTime`).
- **Radar Node Blips**: High-frequency sine tone pings (980Hz - 1200Hz) upon beacon selection.
- **Hardware Mute Switch**: Includes global mute control in the navigation bar and respects browser autoplay gesture policies.

---

## 6. Offline Dynamic Calendar Generation (.ICS) (`schedule.js`)

The festival schedule incorporates a client-side iCalendar generator:
- Generates RFC 5545 compliant `.ics` data on the fly using a JavaScript `Blob`.
- Enables attendees to export the 3-day festival program directly into Google Calendar, Apple Calendar, or Outlook without needing an internet connection.
