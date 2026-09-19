/**
 * DHYUTHI 7.0 — PASS CALCULATOR & REGISTRATION MANAGER
 */

export class TicketCalculator {
  constructor() {
    this.ieeeToggle = document.getElementById('ieeeMemberToggle');
    this.prices = {
      single: { base: 499, discounted: 399 },
      allAccess: { base: 899, discounted: 719 },
      preEvents: { base: 199, discounted: 159 }
    };

    this.init();
  }

  init() {
    if (this.ieeeToggle) {
      this.ieeeToggle.addEventListener('change', (e) => {
        this.updatePrices(e.target.checked);
      });
    }

    // Connect Tier Book Buttons
    document.querySelectorAll('[data-ticket-tier]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const tier = e.currentTarget.getAttribute('data-ticket-tier');
        this.openCheckoutModal(tier);
      });
    });

    // Form Submission Handling
    const regForm = document.getElementById('mainRegistrationForm');
    if (regForm) {
      regForm.addEventListener('submit', (e) => this.handleRegistration(e));
    }
  }

  updatePrices(isMember) {
    const singleEl = document.getElementById('priceSingleTrack');
    const allEl = document.getElementById('priceAllAccess');
    const preEl = document.getElementById('pricePreEvents');

    if (singleEl) {
      singleEl.textContent = isMember ? this.prices.single.discounted : this.prices.single.base;
    }
    if (allEl) {
      allEl.textContent = isMember ? this.prices.allAccess.discounted : this.prices.allAccess.base;
    }
    if (preEl) {
      preEl.textContent = isMember ? this.prices.preEvents.discounted : this.prices.preEvents.base;
    }

    // Auto-check IEEE ID input field inside registration modal if member toggle is on
    const modalIeeeCheck = document.getElementById('regIeeeMemberCheck');
    const modalIeeeIdGroup = document.getElementById('regIeeeIdGroup');
    if (modalIeeeCheck && modalIeeeIdGroup) {
      modalIeeeCheck.checked = isMember;
      modalIeeeIdGroup.style.display = isMember ? 'flex' : 'none';
    }
  }

  openCheckoutModal(tier) {
    const modal = document.getElementById('registrationModal');
    if (!modal) return;

    const select = document.getElementById('regEventSelection');
    if (select) {
      if (tier === 'all-access') select.value = 'pass-all-access';
      else if (tier === 'single-track') select.value = 'pass-single-track';
      else if (tier === 'pre-events') select.value = 'pass-preevents-combo';
    }

    modal.classList.add('open');
  }

  handleRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Generating Pass...';
    }

    setTimeout(() => {
      const formContainer = document.getElementById('registrationFormContainer');
      const successContainer = document.getElementById('registrationSuccessContainer');
      const attendeeName = document.getElementById('regFullName').value || 'Innovator';

      document.getElementById('successAttendeeName').textContent = attendeeName;
      document.getElementById('successTicketToken').textContent = 'DHY7-' + Math.random().toString(36).substring(2, 9).toUpperCase();

      if (formContainer && successContainer) {
        formContainer.style.display = 'none';
        successContainer.style.display = 'block';
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirm Registration';
      }
    }, 900);
  }
}
