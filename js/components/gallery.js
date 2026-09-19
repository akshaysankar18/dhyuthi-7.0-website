/**
 * DHYUTHI 7.0 — GALLERY & LIGHTBOX CONTROLLER
 */

export class Gallery {
  constructor() {
    this.modal = document.getElementById('lightboxModal');
    this.imgEl = document.getElementById('lightboxImg');
    this.titleEl = document.getElementById('lightboxTitle');
    this.subEl = document.getElementById('lightboxSub');
    this.currentIndex = 0;
    this.items = [];

    this.init();
  }

  init() {
    // Collect all gallery items
    const domItems = document.querySelectorAll('.gallery-item');
    this.items = Array.from(domItems).map((el, index) => ({
      index,
      element: el,
      src: el.getAttribute('data-full') || el.querySelector('img').src,
      title: el.querySelector('.gallery-item-caption')?.textContent || 'Dhyuthi Moment',
      tag: el.querySelector('.gallery-item-tag')?.textContent || 'IEEE SCT SB',
      category: el.getAttribute('data-category') || 'all'
    }));

    // Attach click triggers
    this.items.forEach((item) => {
      item.element.addEventListener('click', () => {
        this.openLightbox(item.index);
      });
    });

    // Close button
    const closeBtn = document.getElementById('lightboxCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    // Prev / Next
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this.navigate(1));

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!this.modal || !this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        this.items.forEach((item) => {
          if (filter === 'all' || item.category === filter) {
            item.element.style.display = 'block';
          } else {
            item.element.style.display = 'none';
          }
        });
      });
    });
  }

  openLightbox(index) {
    if (!this.modal || !this.items[index]) return;
    this.currentIndex = index;
    this.updateLightboxContent();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  navigate(dir) {
    this.currentIndex = (this.currentIndex + dir + this.items.length) % this.items.length;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const item = this.items[this.currentIndex];
    if (!item) return;
    if (this.imgEl) this.imgEl.src = item.src;
    if (this.titleEl) this.titleEl.textContent = item.title;
    if (this.subEl) this.subEl.textContent = item.tag;
  }
}
