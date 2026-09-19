/**
 * DHYUTHI 7.0 — MAIN APPLICATION COORDINATOR
 * Connects ParticleCanvas, CompassWidget, AudioSynthesizer, and Interactive Sections
 */

import { IntroAnimation } from './components/introAnimation.js';
import { ParticleCanvas } from './components/particleCanvas.js';
import { AudioSynthesizer } from './components/audioSynthesizer.js';
import { Ticker } from './components/ticker.js';
import { PreEvents } from './components/preEvents.js';
import { Tracks } from './components/tracks.js';
import { Schedule } from './components/schedule.js';
import { Gallery } from './components/gallery.js';
import { TicketCalculator } from './components/ticketCalculator.js';
import { Faq } from './components/faq.js';
import { EventSearch } from './components/eventSearch.js';
import { CampusRadar } from './components/campusRadar.js';
import { Countdown } from './components/countdown.js';

class DhyuthiApp {
  constructor() {
    this.audio = new AudioSynthesizer();
    this.introAnimation = null;
    this.particleCanvas = null;
    this.eventSearch = null;
    this.campusRadar = null;
    this.countdown = null;
    this.init();
  }

  init() {
    // 0. Initialize Tathva-Inspired Chronometer Intro Sequence
    this.introAnimation = new IntroAnimation({ audio: this.audio });

    // 1. Initialize Volumetric Prismatic Light Rays Canvas (God Rays)
    this.particleCanvas = new ParticleCanvas('bgParticleCanvas');

    // 2. Initialize Live Festival Solar Chronometer (Countdown)
    this.countdown = new Countdown();

    // 3. Initialize Live Event Search & Filter (Drishti CET-inspired)
    this.eventSearch = new EventSearch();

    // 4. Initialize Interactive Holographic Campus Radar
    this.campusRadar = new CampusRadar({ audio: this.audio });

    // 5. Initialize Interactive Components
    new Ticker('.ticker-section');
    new PreEvents();
    new Tracks();
    new Schedule();
    new Gallery();
    new TicketCalculator();
    new Faq();

    // 4. Navigation & Scrollspy
    this.initNavigation();

    // 5. Accessibility: Reduced Motion Toggle
    this.initReducedMotion();

    // 6. Sound & Ambient Chime Controls
    this.initAudioControls();

    // 7. Universal Modal Controls
    this.initUniversalModals();
  }

  initNavigation() {
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-item-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('mobileDrawerBackdrop');

    // Header scroll background toggle & Scrollspy
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      let currentSection = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 180;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

    // Mobile Drawer Toggle
    if (mobileToggle && mobileDrawer && drawerBackdrop) {
      const toggleMenu = () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileToggle.classList.toggle('open');
        drawerBackdrop.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      };

      mobileToggle.addEventListener('click', toggleMenu);
      drawerBackdrop.addEventListener('click', toggleMenu);

      document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          mobileToggle.classList.remove('open');
          drawerBackdrop.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  initReducedMotion() {
    const toggle = document.getElementById('reducedMotionSwitch');
    if (!toggle) return;

    // Check system preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      toggle.checked = true;
      document.body.classList.add('reduced-motion');
      if (this.particleCanvas) this.particleCanvas.setReducedMotion(true);
    }

    toggle.addEventListener('change', (e) => {
      const isReduced = e.target.checked;
      if (isReduced) {
        document.body.classList.add('reduced-motion');
        if (this.particleCanvas) this.particleCanvas.setReducedMotion(true);
      } else {
        document.body.classList.remove('reduced-motion');
        if (this.particleCanvas) this.particleCanvas.setReducedMotion(false);
      }
    });
  }

  initAudioControls() {
    const soundStatus = document.getElementById('soundSequenceStatus');

    if (soundStatus) {
      soundStatus.addEventListener('click', () => {
        const isSoundOn = this.audio.toggleMute();
        this.audio.playAwakenChime();
        const label = soundStatus.querySelector('.sound-status-label');
        if (label) {
          label.textContent = isSoundOn ? 'Sound chime active' : 'Sound chime muted';
        }
      });
    }
  }

  initUniversalModals() {
    document.querySelectorAll('.modal-close-btn, [data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('open');
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach((m) => m.classList.remove('open'));
      }
    });

    // IEEE Member ID toggle in registration form
    const memberCheck = document.getElementById('regIeeeMemberCheck');
    const idGroup = document.getElementById('regIeeeIdGroup');
    if (memberCheck && idGroup) {
      memberCheck.addEventListener('change', (e) => {
        idGroup.style.display = e.target.checked ? 'flex' : 'none';
      });
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.dyuthiApp = new DhyuthiApp();
});
