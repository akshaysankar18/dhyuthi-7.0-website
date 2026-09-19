# Dhyuthi 7.0 — Official Website & Visual Identity
### *Step into the light. Make your mark.*
**IEEE SCT Student Branch Flagship Technical & Cultural Festival**  
*Sree Chitra Thirunal College of Engineering (SCTCE), Trivandrum, Kerala*

---

## 🌟 Executive Summary

**Dhyuthi 7.0** is the premier technical and cultural symposium organized by the IEEE SCT Student Branch. Departing from previous editions, Dhyuthi 7.0 introduces a brand new visual identity: **The Light Core** — an interactive computational singularity built on a high-contrast palette of **Molten Gold (`#f6c453`)** and **Royal Violet (`#9348fc`)**.

This repository contains the complete frontend codebase and comprehensive system architecture documentation.

---

## 🚀 Key Features

1. **Light Core Procedural Canvas Engine**:
   - Interactive HTML5 Canvas stage simulating an illuminated observation chamber with telemetry corner brackets (`[ ]`), an isometric perspective grid floor, floating multifaceted crystals, and a dynamic double-helix flame.
   - Spring-damped cursor tracking that reacts to user mouse velocity and touch drags.
   - Built-in Web Audio API synthesizer producing atmospheric harmonic chimes upon awakening.
2. **Accessible by Design**:
   - Prominent **Reduced Motion Switch** on the hero interface that pauses canvas oscillations, stabilizes particles, and silences CSS marquees for users with vestibular sensitivity.
   - Full keyboard navigation and ARIA attributes on modals, accordions, and image lightboxes.
3. **Live Announcement Marquee**:
   - Telemetry ticker with pulse indicator, interactive category chips, and pause/play marquee controls.
4. **Comprehensive Pre-Events Showcase**:
   - Dedicated poster slots, status tags (*Live / Upcoming*), countdowns, and instant registration triggers for:
     - **Trail Quest 2.0** (Campus Scavenger Hunt & Cryptography)
     - **DoodleQuest** (UI/UX Creative Crucible)
     - **Strikezone Dhyuthi** (Inter-College Esports Tournament)
     - **Synapse Ideathon** (24h Innovation Sprint)
     - **Prompt Arena** (Generative AI Prompt Duel)
5. **Flagship Tracks & Workshops**:
   - 4 specialized tracks: **AIGENIX** (AI/ML), **CELLESTRO** (Robotics & IoT), **INCEPTA** (UI/UX & Web3), and **SYNKRON** (Cybersecurity & Cloud).
   - Interactive syllabus drawer, prerequisites, and KTU activity points certification details.
6. **3-Day Festival Schedule & .ICS Sync**:
   - Day-by-day tabbed timeline with venue markers.
   - One-click **"Sync to Calendar"** button that dynamically generates an RFC 5545 compliant `.ics` calendar invitation file.
7. **Dynamic Pass Calculator**:
   - Real-time price calculation across Single Track (₹499), All-Access (₹899), and Pre-Events (₹199) tiers.
   - Instant 20% discount calculation when toggling the active **IEEE Member** status switch.
8. **Interactive Gallery & Lightbox**:
   - Category filtering (Auditorium, Workshops, Awards) with full-screen keyboard-navigable lightbox (`ArrowLeft`, `ArrowRight`, `Esc`).
9. **Zero-Dependency Architecture**:
   - Built purely with standard semantic HTML5, CSS custom properties, and native ES6 JavaScript modules. Zero build step required, no framework churn, 100/100 performance profile.

---

## 📁 Repository Structure

```
├── index.html                  # Semantic, SEO-optimized entrypoint
├── css/
│   ├── variables.css           # Design tokens, color scales, glassmorphism
│   ├── base.css                # Resets, typography, utilities, bracket HUDs
│   ├── components/             # Reusable UI component stylesheets
│   └── responsive.css          # Breakpoints (Mobile, Tablet, Desktop)
├── js/
│   ├── main.js                 # Application coordinator & event bindings
│   └── components/             # Modular ES6 components (Canvas, Ticker, etc.)
├── assets/
│   ├── icons/                  # Scalable vector graphics (Dhyuthi logo, IEEE suite)
│   └── images/                 # Event posters & festival gallery photos
├── Doc/                        # Official Documentation Suite
│   ├── 01-design-decisions.md  # Visual identity, theme theory, typography
│   ├── 02-technical-architecture.md # Modular frontend architecture
│   ├── 03-backend-system-design.md  # PostgreSQL schema, auth & payment gateway
│   ├── 04-component-guide.md   # Reusability guide for future IEEE SB websites
│   └── 05-api-specification.md # REST OpenAPI 3.1 endpoints
├── package.json                # Local dev scripts
└── README.md                   # Project documentation
```

---

## 🛠️ Quick Start & Local Development

No compilation or complex bundler installation is required.

### Method 1: Using npx / Node.js
```bash
# Clone the repository
git clone https://github.com/<your-username>/dhyuthi-7-official.git
cd dhyuthi-7-official

# Start local development server
npm run dev
# Or: npx serve . -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 2: Python Simple HTTP Server
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000).

---

## 🌐 Free Hosting Deployment Guide

### GitHub Pages (Recommended)
1. Push this repository to GitHub as a **public** repository.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Within 60 seconds, your site will be live at:
   `https://<your-username>.github.io/<repository-name>/`

### Vercel / Netlify
- Simply import your GitHub repository into Vercel or Netlify.
- Framework preset: `Other` (Static HTML).
- Build command: *leave empty*.
- Output directory: *leave empty or `.`*.
- Deploy instantly with SSL enabled.

---

## 📄 Submission Checklist
- [x] Public GitHub repository with clean modular architecture
- [x] "Doc" folder containing all 5 comprehensive system design documents
- [x] High-fidelity Light Core interactive canvas & hero match
- [x] Pre-events showcase with real posters and registration flows
- [x] Working pass calculator with IEEE member 20% discount
- [x] 3-Day schedule with `.ics` calendar generation
- [x] Responsive layout across all screen sizes
- [x] Space and vector assets for official IEEE & IEEE SCT SB branding
