/**
 * DHYUTHI 7.0 — LIVE EVENT SEARCH & CATEGORY FILTER
 * Inspired by Drishti CET Trivandrum & Tathva NIT Calicut
 * Fast, instant client-side event filtering across tracks, workshops, and pre-events
 */

export class EventSearch {
  constructor() {
    this.input = document.getElementById('eventSearchInput');
    this.chips = document.querySelectorAll('.filter-chip-btn');
    this.counter = document.getElementById('eventResultsCount');
    this.activeCategory = 'all';
    this.searchQuery = '';

    if (!this.input && !this.chips.length) return;

    this.init();
  }

  init() {
    // Search input listener
    if (this.input) {
      this.input.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.filter();
      });
    }

    // Category filter chips
    this.chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        this.chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeCategory = chip.dataset.category || 'all';
        this.filter();
      });
    });
  }

  filter() {
    // Target both track cards and pre-event cards
    const trackCards = document.querySelectorAll('.track-card');
    const preCards = document.querySelectorAll('.pre-event-card, .pre-event-item');

    let visibleCount = 0;
    const allCards = [...trackCards, ...preCards];

    allCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const category = (card.dataset.category || '').toLowerCase();

      // Check category match
      const matchesCategory =
        this.activeCategory === 'all' ||
        category.includes(this.activeCategory.toLowerCase()) ||
        text.includes(this.activeCategory.toLowerCase());

      // Check keyword search match
      const matchesSearch =
        !this.searchQuery || text.includes(this.searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update counter
    if (this.counter) {
      this.counter.textContent = `Showing ${visibleCount} event${visibleCount === 1 ? '' : 's'}`;
    }
  }
}
