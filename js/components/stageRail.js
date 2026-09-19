/**
 * DHYUTHI 7.0 — FIXED LEFT STAGE RAIL CONTROLLER
 * Inspired by Tathva NIT Calicut
 * Uses IntersectionObserver to track and highlight active festival stages (01 - 08)
 */

export class StageRail {
  constructor(railSelector = '.stage-rail-fixed') {
    this.rail = document.querySelector(railSelector);
    if (!this.rail) return;

    this.nodes = this.rail.querySelectorAll('.stage-rail-node');
    this.observer = null;
    this.init();
  }

  init() {
    // Collect target sections mapped by href
    const targets = [];
    this.nodes.forEach((node) => {
      const targetId = node.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const el = document.querySelector(targetId);
        if (el) targets.push({ node, el });
      }

      node.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = node.getAttribute('href');
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    if (!targets.length) return;

    // IntersectionObserver with threshold
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = targets.find((t) => t.el === entry.target);
          if (match) {
            this.nodes.forEach((n) => n.classList.remove('active'));
            match.node.classList.add('active');
          }
        }
      });
    }, observerOptions);

    targets.forEach((t) => this.observer.observe(t.el));
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
  }
}
