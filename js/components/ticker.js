/**
 * DHYUTHI 7.0 — LIVE ANNOUNCEMENT TICKER COMPONENT
 */

export class Ticker {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.track = this.container.querySelector('.ticker-marquee-track');
    this.ctrlBtn = this.container.querySelector('.ticker-ctrl-btn');
    this.isPaused = false;

    this.init();
  }

  init() {
    if (!this.track) return;

    // Clone ticker items once to ensure seamless infinite looping marquee
    const items = Array.from(this.track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      this.track.appendChild(clone);
    });

    if (this.ctrlBtn) {
      this.ctrlBtn.addEventListener('click', () => this.togglePlayPause());
    }

    // Connect clicks on pills to sections
    this.container.querySelectorAll('.ticker-pill-item').forEach((pill) => {
      pill.addEventListener('click', (e) => {
        const target = pill.getAttribute('data-target');
        if (target) {
          e.preventDefault();
          const targetEl = document.querySelector(target);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  togglePlayPause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.track.classList.add('paused');
      this.ctrlBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      `;
      this.ctrlBtn.setAttribute('title', 'Resume live updates ticker');
    } else {
      this.track.classList.remove('paused');
      this.ctrlBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
      `;
      this.ctrlBtn.setAttribute('title', 'Pause live updates ticker');
    }
  }
}
