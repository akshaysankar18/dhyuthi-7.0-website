/**
 * DHYUTHI 7.0 — SOLAR CHRONOMETER (COUNTDOWN TIMER) COMPONENT
 * Handles live countdown calculation, tick micro-animations, and live status.
 */

export class Countdown {
  constructor(options = {}) {
    // Festival Launch: October 23, 2026, 09:00:00 IST (UTC+05:30)
    this.targetDate = options.targetDate 
      ? new Date(options.targetDate).getTime() 
      : new Date('2026-10-23T09:00:00+05:30').getTime();

    this.container = document.getElementById('heroCountdown');
    if (!this.container) return;

    this.daysEl = document.getElementById('countdownDays');
    this.hoursEl = document.getElementById('countdownHours');
    this.minsEl = document.getElementById('countdownMinutes');
    this.secsEl = document.getElementById('countdownSeconds');
    this.badgeTextEl = this.container.querySelector('.countdown-badge-text');

    this.lastSec = null;
    this.timerId = null;

    this.init();
  }

  init() {
    this.update();
    this.timerId = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = Date.now();
    const diff = this.targetDate - now;

    if (diff <= 0) {
      if (this.daysEl) this.daysEl.textContent = '00';
      if (this.hoursEl) this.hoursEl.textContent = '00';
      if (this.minsEl) this.minsEl.textContent = '00';
      if (this.secsEl) this.secsEl.textContent = '00';
      if (this.badgeTextEl) {
        this.badgeTextEl.textContent = 'DHYUTHI 7.0 IS LIVE NOW!';
      }
      if (this.timerId) clearInterval(this.timerId);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');

    if (this.daysEl && this.daysEl.textContent !== formattedDays) {
      this.daysEl.textContent = formattedDays;
    }
    if (this.hoursEl && this.hoursEl.textContent !== formattedHours) {
      this.hoursEl.textContent = formattedHours;
    }
    if (this.minsEl && this.minsEl.textContent !== formattedMins) {
      this.minsEl.textContent = formattedMins;
    }

    if (this.secsEl) {
      if (this.secsEl.textContent !== formattedSecs) {
        this.secsEl.textContent = formattedSecs;
        
        // Micro-tick animation on second step
        this.secsEl.classList.remove('tick');
        // Trigger reflow to restart CSS animation
        void this.secsEl.offsetWidth;
        this.secsEl.classList.add('tick');
      }
    }
  }

  destroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
