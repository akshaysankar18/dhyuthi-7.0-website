/**
 * DHYUTHI 7.0 — INTERACTIVE HOLOGRAPHIC CAMPUS RADAR
 * Replaces static generic Google Map with a high-tech tactical SCTCE campus radar HUD
 * featuring interactive event beacons, radar sweep animations, and zone telemetry.
 */

export class CampusRadar {
  constructor(options = {}) {
    this.audio = options.audio || null;
    this.container = document.getElementById('campusRadarContainer');
    if (!this.container) return;

    this.zones = {
      'zone-audi': {
        id: 'zone-audi',
        name: 'Main Auditorium (Darsana)',
        category: 'Keynotes & Ceremonials',
        tag: 'CAPACITY: 1,000+',
        coords: '8.4705° N, 76.9789° E',
        desc: 'Central air-conditioned auditorium hosting the Grand Inauguration, Keynote Conclaves, National Tech Quiz, and the Dhyuthi 7.0 Valedictory Ceremony.',
        highlights: ['Acoustic Sound Array', 'Live Stream Broadcast Rig', 'VIP & Speaker Lounge'],
        walkingTime: '2 min walk from Main Gate',
        pinX: 48,
        pinY: 38
      },
      'zone-hack': {
        id: 'zone-hack',
        name: 'Mechanical & Prototyping Workshop',
        category: '24-Hour Flagship Hackathon',
        tag: '24-HR BATTLEGROUND',
        coords: '8.4698° N, 76.9781° E',
        desc: 'High-voltage engineering block equipped with rapid prototyping stations, 3D printers, dedicated 60-team power desks, and the high-energy RoboWars combat arena.',
        highlights: ['24-Hour Gigabit Fiber & UPS', 'Robotics Combat Arena', 'Soldering & Fabrication Desks'],
        walkingTime: '3 min walk from Main Gate',
        pinX: 34,
        pinY: 64
      },
      'zone-ccf': {
        id: 'zone-ccf',
        name: 'Central Computing Facility (CCF)',
        category: 'Software Sprint & Cyber Arena',
        tag: 'TECH LABS & CTF',
        coords: '8.4709° N, 76.9782° E',
        desc: 'Advanced networked computer laboratories hosting Algorithmic Coding Duels, Capture The Flag (CTF) cybersecurity challenges, and AI/ML model hackathons.',
        highlights: ['Gigabit LAN Infrastructure', 'Multi-OS Development Terminals', 'Smart Presentation Halls'],
        walkingTime: '2 min walk from Main Gate',
        pinX: 28,
        pinY: 28
      },
      'zone-open': {
        id: 'zone-open',
        name: 'Open Air Amphitheatre Ground',
        category: 'Pro-Show & Cultural Extravaganza',
        tag: 'DHYUTHI NIGHTS ARENA',
        coords: '8.4700° N, 76.9796° E',
        desc: 'Expansive open-air stadium arena featuring dynamic festival truss rigs, festival line arrays, EDM stage, and star pro-show performances under the night sky.',
        highlights: ['Massive Festival Concert Rig', 'Food Truck & Refreshment Strip', 'Medical & Security Command Pod'],
        walkingTime: '4 min walk from Main Gate',
        pinX: 74,
        pinY: 56
      },
      'zone-gate': {
        id: 'zone-gate',
        name: 'Main Gate & Welcome Checkpoint',
        category: 'Arrival & Registration Desk',
        tag: 'DELEGATE CHECK-IN',
        coords: '8.4712° N, 76.9774° E',
        desc: 'Primary entrance on NH 66. Official IEEE SCT SB Welcome Desk, QR ID-badge verification, delegate kit distribution, and 24/7 outstation support desk.',
        highlights: ['Instant QR Fast-Track Entry', 'Hospitality & Outstation Desk', 'Luggage & Cloak Facility'],
        walkingTime: '0 min (Arrival Point)',
        pinX: 18,
        pinY: 16
      }
    };

    this.activeZoneId = 'zone-audi';
    this.currentMode = 'radar'; // 'radar' | 'satellite'

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.renderZone(this.activeZoneId);
  }

  cacheElements() {
    this.radarView = this.container.querySelector('.radar-vector-view');
    this.satelliteView = this.container.querySelector('.radar-satellite-view');
    this.modeButtons = this.container.querySelectorAll('[data-radar-mode]');
    this.beaconPins = this.container.querySelectorAll('.radar-beacon');
    this.selectorPills = this.container.querySelectorAll('.radar-zone-pill');
    
    // Zone card elements
    this.zoneNameEl = this.container.querySelector('#radarZoneName');
    this.zoneCategoryEl = this.container.querySelector('#radarZoneCategory');
    this.zoneTagEl = this.container.querySelector('#radarZoneTag');
    this.zoneCoordsEl = this.container.querySelector('#radarZoneCoords');
    this.zoneDescEl = this.container.querySelector('#radarZoneDesc');
    this.zoneHighlightsEl = this.container.querySelector('#radarZoneHighlights');
    this.zoneWalkingEl = this.container.querySelector('#radarZoneWalking');
    this.zoneDetailCard = this.container.querySelector('.radar-telemetry-card');

    // Controls
    this.copyCoordsBtn = this.container.querySelector('#radarCopyCoordsBtn');
    this.copyToast = this.container.querySelector('#radarCopyToast');
  }

  bindEvents() {
    // Mode toggling (Tactical Radar vs Satellite)
    this.modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.radarMode;
        this.setMode(mode);
      });
    });

    // Beacon clicks on the radar canvas
    this.beaconPins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const zoneId = pin.dataset.zone;
        if (zoneId && this.zones[zoneId]) {
          this.selectZone(zoneId);
        }
      });
    });

    // Zone selector pills
    this.selectorPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const zoneId = pill.dataset.zone;
        if (zoneId && this.zones[zoneId]) {
          this.selectZone(zoneId);
        }
      });
    });

    // Copy coordinates
    if (this.copyCoordsBtn) {
      this.copyCoordsBtn.addEventListener('click', () => {
        this.copyCoordinates();
      });
    }
  }

  setMode(mode) {
    if (this.currentMode === mode) return;
    this.currentMode = mode;

    this.playBlip(720, 0.08);

    this.modeButtons.forEach(btn => {
      const active = btn.dataset.radarMode === mode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (mode === 'radar') {
      this.radarView.classList.remove('hidden');
      this.satelliteView.classList.add('hidden');
    } else {
      this.radarView.classList.add('hidden');
      this.satelliteView.classList.remove('hidden');
    }
  }

  selectZone(zoneId) {
    if (this.activeZoneId === zoneId && !this.zoneDetailCard.classList.contains('updating')) return;
    this.activeZoneId = zoneId;

    this.playBlip(980, 0.1);

    // Update active classes on beacon pins
    this.beaconPins.forEach(pin => {
      const isMatch = pin.dataset.zone === zoneId;
      pin.classList.toggle('active', isMatch);
      pin.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Update active classes on selector pills
    this.selectorPills.forEach(pill => {
      const isMatch = pill.dataset.zone === zoneId;
      pill.classList.toggle('active', isMatch);
    });

    this.renderZone(zoneId);
  }

  renderZone(zoneId) {
    const data = this.zones[zoneId];
    if (!data || !this.zoneDetailCard) return;

    // Trigger subtle card flash
    this.zoneDetailCard.classList.remove('pulse-in');
    void this.zoneDetailCard.offsetWidth; // Force reflow
    this.zoneDetailCard.classList.add('pulse-in');

    if (this.zoneNameEl) this.zoneNameEl.textContent = data.name;
    if (this.zoneCategoryEl) this.zoneCategoryEl.textContent = data.category;
    if (this.zoneTagEl) this.zoneTagEl.textContent = data.tag;
    if (this.zoneCoordsEl) this.zoneCoordsEl.textContent = data.coords;
    if (this.zoneDescEl) this.zoneDescEl.textContent = data.desc;
    if (this.zoneWalkingEl) this.zoneWalkingEl.textContent = data.walkingTime;

    if (this.zoneHighlightsEl) {
      this.zoneHighlightsEl.innerHTML = data.highlights
        .map(item => `<span class="radar-tag-badge">✓ ${item}</span>`)
        .join('');
    }
  }

  copyCoordinates() {
    const data = this.zones[this.activeZoneId] || { coords: '8.4702° N, 76.9786° E' };
    const textToCopy = `SCTCE Thiruvananthapuram (${data.coords})`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showCopyFeedback();
      }).catch(() => {
        this.fallbackCopy(textToCopy);
      });
    } else {
      this.fallbackCopy(textToCopy);
    }
  }

  fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showCopyFeedback();
    } catch (err) {
      // Ignore
    }
    document.body.removeChild(textArea);
  }

  showCopyFeedback() {
    this.playBlip(1200, 0.12);
    if (!this.copyToast) return;
    this.copyToast.classList.add('visible');
    setTimeout(() => {
      this.copyToast.classList.remove('visible');
    }, 2200);
  }

  playBlip(freq, duration) {
    if (this.audio && typeof this.audio.playSineTone === 'function') {
      try {
        this.audio.playSineTone(freq, duration, 0.025);
      } catch (e) {
        // Safe fallback
      }
    }
  }
}
