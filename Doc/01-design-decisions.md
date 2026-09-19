# Dhyuthi 7.0 — Design Decisions & Visual Identity

## 1. Core Philosophy & Naming
In Sanskrit and Malayalam, **Dhyuthi** (ദ്യുതി / Dhyuthi) signifies **radiance, luster, and inner illumination**. 

For **Dhyuthi 7.0**, the visual identity was reimagined from the ground up to create an awe-inspiring, luxurious, and technically authoritative portal representing the flagship technical festival of IEEE SCT Student Branch (STB64091).

Key pillars:
- **Molten Gold & Deep Obsidian Aesthetic**: A luxurious cosmic void palette where technology and human creativity radiate like coherent photonic energy.
- **Volumetric Prismatic God Rays**: An atmospheric background canvas projecting calm, elegant shafts of golden and violet light emanating from the horizon.
- **Precision Gyroscopic Astrolabe Intro**: A high-tech entrance sequence inspired by premier tech festivals (Tathva NIT Calicut), featuring counter-rotating concentric gyroscopic rings, circular SVG progress tracking, and the monumental golden festival wordmark.
- **Interactive Holographic Campus Radar**: Replacing generic static map embeds with a cybernetic vector SCTCE blueprint featuring pulsing radar beacons, live zone telemetry, and turn-by-turn navigation.

---

## 2. Color Theory & Design Tokens

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--bg-primary` | `#050504` | Obsidian void; maximum contrast, OLED battery optimization, and deep spatial depth. |
| `--bg-secondary` | `#0a0806` | Secondary panel background; subtle surface differentiation. |
| `--gold-500` | `#d4af37` | Canonical Molten Gold; symbol of achievement, illumination, and festival warmth. |
| `--gold-400` | `#e6c280` | High-radiance gold; interactive hover states and beacon reticles. |
| `--gold-300` | `#f3d38c` | Soft champagne gold; metadata tags and progress indicators. |
| `--violet-500` | `#9348fc` | Signature IEEE SCT SB Purple; represents technical depth, robotics, and cyber aesthetics. |
| `--border-glass` | `rgba(243, 211, 140, 0.22)` | Glassmorphic micro-borders with `backdrop-filter: blur(16px)`. |

### Design Rationale:
The gold-obsidian-violet system achieves a balance between institutional prestige (gold/obsidian) and futuristic engineering vitality (violet). The dark canvas ensures glowing light beams and active beacons remain luminescent without visual fatigue.

---

## 3. Typography Hierarchy

1. **Monumental Display & Wordmarks: Cinzel Decorative (Weights: 700, 900)**
   - Classical flared serifs with contemporary precision. Used for the monumental festival title (`DHYUTHI 7.0 / DHYUTHI 7.0`) and major hero brand displays.
2. **Headings & Section Titles: Cinzel (Weights: 400, 600, 700, 900)**
   - Clean, geometric luxury serif with high legibility. Used for section headings, event category banners, and track names.
3. **Body Copy & Interface: Inter (Weights: 300, 400, 500, 600, 700)**
   - Tall x-height and neutral character design for reading workshop curriculum, FAQs, pass tiers, and event guidelines.
4. **Telemetry, Badges & Timers: Share Tech Mono**
   - Monospaced typography for coordinates, dates, prize tags, countdowns, and HUD readouts (`8.4702° N, 76.9786° E • IEEE SCT SB`), reinforcing the high-tech festival identity.

---

## 4. UI/UX Micro-Interactions & Spatial Depth

- **Precision Chronometer Intro**: Minimalist astrolabe gyroscope with smooth SVG circular arc progress (`0% - 100%`), shockwave detonation, and keyboard `ESC` bypass.
- **Volumetric God Rays Canvas**: Custom canvas engine rendering atmospheric light beams anchored firmly at the horizon, decoupled from cursor movement to ensure an elegant, distraction-free reading experience.
- **Interactive Holographic Campus Radar**: SVG-based tactical blueprint of SCTCE campus with rotating cathode radar beam, range rings (50M, 100M, 200M), 5 interactive event zone beacons, real-time telemetry card, and satellite view toggle.
- **Tri-Phase Photonic Continuum**: Multi-column event dates (`23 OCT`, `24 OCT`, `25 OCT`) highlighting flagship milestones across the festival timeline.
- **Glassmorphism**: Layered cards with translucent dark backgrounds, micro-borders (`rgba(212, 175, 55, 0.15)`), and smooth hover lift physics.

---

## 5. Accessibility (a11y) & Inclusivity

- **Dedicated Reduced Motion Mode**: Accessible via the header toggle; immediately dampens canvas beam intensity, stops CSS marquee motion, and simplifies transitions for vestibular sensitivity.
- **WCAG AA Contrast**: All critical text elements maintain a minimum contrast ratio of 4.5:1 against the obsidian background.
- **Keyboard & Screen Reader Support**: Modal dialogs, tabs, and lightboxes feature complete ARIA attributes (`role="dialog"`, `role="tab"`, `aria-modal="true"`, `aria-expanded`) and keyboard navigation (`Escape`, `Tab` focus trap).

---

## 6. Official IEEE & SCT SB Brand Alignment

- Adheres to official IEEE branding guidelines, incorporating the diamond kite emblem, IEEE SCT Student Branch identity, and clear accreditation under IEEE Kerala Section (Region 10).
