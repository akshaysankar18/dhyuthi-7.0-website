/**
 * Dhyuthi 7.0 — Tathva-Inspired Chronometer Intro Controller
 * Precision Gyroscopic Astrolabe & Circular Progress Sequence.
 */

export class IntroAnimation {
  constructor(options = {}) {
    this.overlay = document.getElementById('dyuthiIntroOverlay');
    this.skipBtn = document.getElementById('introSkipBtn');
    this.progressCircle = document.getElementById('tathvaProgressCircle');
    this.pctLabel = document.getElementById('introProgressPct');
    this.shockwave = document.getElementById('introFlareShockwave');
    this.audio = options.audio || null;

    this.circumference = 289.03; // 2 * PI * 46
    this.duration = options.duration || 1800; // 1.8s crisp Tathva-style timing
    this.rafId = null;
    this.startTime = null;
    this.isDismissed = false;

    if (!this.overlay) return;

    this.init();
  }

  init() {
    // Check if user has already seen intro during this session
    const seen = sessionStorage.getItem('dyuthi_7_intro_seen');
    if (seen === 'true' && window.location.hash) {
      this.dismiss(true);
      return;
    }

    // Skip button click
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.dismiss();
      });
    }

    // Keyboard ESC key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.isDismissed) {
        this.dismiss();
      }
    });

    // Replay triggers
    document.querySelectorAll('[data-action="replay-intro"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.replay();
      });
    });

    // Start progress
    this.startProgress();
  }

  startProgress() {
    this.startTime = performance.now();
    this.isDismissed = false;
    this.overlay.classList.remove('intro-dismissed');
    if (this.shockwave) this.shockwave.classList.remove('active');

    const animate = (now) => {
      if (this.isDismissed) return;
      const elapsed = now - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // SVG Circular stroke animation
      if (this.progressCircle) {
        const offset = this.circumference * (1 - progress);
        this.progressCircle.style.strokeDashoffset = offset.toFixed(2);
      }

      // Percentage label
      if (this.pctLabel) {
        this.pctLabel.textContent = `${Math.floor(progress * 100)}%`;
      }

      if (progress < 1) {
        this.rafId = requestAnimationFrame(animate);
      } else {
        // Detonate shockwave and dismiss
        if (this.shockwave) {
          this.shockwave.classList.add('active');
        }
        if (this.audio && typeof this.audio.playAwakenChime === 'function') {
          this.audio.playAwakenChime();
        }
        setTimeout(() => {
          this.dismiss();
        }, 320);
      }
    };

    this.rafId = requestAnimationFrame(animate);
  }

  dismiss(instant = false) {
    if (this.isDismissed) return;
    this.isDismissed = true;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    sessionStorage.setItem('dyuthi_7_intro_seen', 'true');

    if (instant) {
      this.overlay.style.transition = 'none';
      this.overlay.classList.add('intro-dismissed');
      setTimeout(() => {
        this.overlay.style.transition = '';
      }, 50);
    } else {
      this.overlay.classList.add('intro-dismissed');
    }

    window.dispatchEvent(new CustomEvent('dyuthi:introComplete'));
  }

  replay() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.shockwave) this.shockwave.classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.overlay.classList.remove('intro-dismissed');
    if (this.progressCircle) {
      this.progressCircle.style.strokeDashoffset = this.circumference;
    }
    if (this.pctLabel) this.pctLabel.textContent = '0%';

    setTimeout(() => {
      this.startProgress();
    }, 100);
  }
}

export function initIntroAnimation(options) {
  return new IntroAnimation(options);
}
