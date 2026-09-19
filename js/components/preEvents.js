/**
 * DHYUTHI 7.0 — PRE-EVENTS & COMPETITIONS COMPONENT
 * Manages pre-event modal previews, rules, and instant registrations
 */

export const PRE_EVENTS_DATA = [
  {
    id: 'trail-quest',
    title: 'Trail Quest 7.0',
    tagline: 'The Flagship Campus Cryptography & Scavenger Quest',
    track: 'Campus Adventure & Cryptography',
    poster: 'assets/images/poster-trailquest.jpg',
    prizePool: '₹15,000',
    date: 'OCT 18, 2026 • 09:30 AM',
    mode: 'Offline • SCTCE Campus Grounds',
    teamSize: '2 - 4 Members',
    status: 'Live',
    shortDesc: 'Decode cryptographic ciphers, AR waypoints, and embedded hardware signals across SCTCE campus to unlock the singularity.',
    rules: [
      'Each team must bring at least one smartphone with camera and cellular connectivity.',
      'Campus checkpoints and physical clues must not be displaced or tampered with.',
      'Fastest team to verify all 7 cipher checkpoints wins the grand cash prize.'
    ]
  },
  {
    id: 'doodle-quest',
    title: 'DoodleQuest 7.0',
    tagline: 'Creative Crucible UI/UX & Design Sprint',
    track: 'Incepta Design Chapter',
    poster: 'assets/images/poster-doodlequest.jpg',
    prizePool: '₹12,000',
    date: 'OCT 19, 2026 • 06:00 PM',
    mode: 'Hybrid • Figma & Live Critique',
    teamSize: 'Individual / Duo',
    status: 'Live',
    shortDesc: 'A fast-paced design battle challenging creatives to craft high-conversion user journeys, design systems, and responsive interactive prototypes.',
    rules: [
      'Design theme prompt will be revealed at kickoff on Discord.',
      'Submissions must include atomic design system tokens and interactive prototypes in Figma or Penpot.',
      'Evaluated on typography, spatial balance, usability, and visual innovation.'
    ]
  },
  {
    id: 'strikezone',
    title: 'Strikezone 7.0',
    tagline: 'Inter-College Esports Championship',
    track: 'Gaming & Cyber Arenas',
    poster: 'assets/images/poster-strikezone.jpg',
    prizePool: '₹20,000',
    date: 'OCT 20-22, 2026',
    mode: 'LAN & Live Stream',
    teamSize: '5 Players (Valorant / BGMI)',
    status: 'Upcoming',
    shortDesc: 'High-stakes collegiate clash across Valorant and BGMI with live caster commentary, spectator stage in the main auditorium, and prize distribution.',
    rules: [
      'Official anti-cheat clients must remain active throughout all matches.',
      'All team captains must report to match lobbies 15 minutes before scheduled start.',
      'Decisions of match referees and IEEE esports coordinators are final.'
    ]
  },
  {
    id: 'synapse-ideathon',
    title: 'Synapse Ideathon 7.0',
    tagline: 'Ignite Your Creativity, Innovate The Future',
    track: 'Cross-Track Innovation Sprint',
    poster: 'assets/images/poster-synapse.jpg',
    prizePool: '₹25,000',
    date: 'OCT 21, 2026 • 10:00 AM',
    mode: 'Online Pitch Stage',
    teamSize: '2 - 4 Members',
    status: 'Live',
    shortDesc: 'Pitch disruptive technological solutions addressing sustainable clean energy, disaster mitigation, assistive tech, or AI governance.',
    rules: [
      'Executive pitch deck limited to maximum 8 slides + working prototype demonstration.',
      'Judged on technological novelty, market feasibility, user impact, and prototype maturity.',
      'Top 3 winners qualify for direct incubation mentorship.'
    ]
  },
  {
    id: 'prompt-arena',
    title: 'PromptCraft AI Duel',
    tagline: 'The Ultimate Generative AI Showdown',
    track: 'Aigenix Artificial Intelligence',
    poster: 'assets/images/poster-promptarena.jpg',
    prizePool: '₹10,000',
    date: 'OCT 22, 2026 • 04:00 PM',
    mode: 'Virtual Arena Stage',
    teamSize: 'Solo Competitor',
    status: 'Live',
    shortDesc: 'Real-time generative AI duel: synthesize target multimodal imagery, structured reasoning, and agentic workflows faster than your challenger.',
    rules: [
      'Manual source code writing prohibited; all outputs must be synthesized purely via prompt engineering.',
      'Automated evaluation pipeline scores accuracy, fidelity, and response latency.',
      '3 single-elimination knockout rounds.'
    ]
  }
];

export class PreEvents {
  constructor() {
    this.init();
  }

  init() {
    // Bind quick view buttons
    document.querySelectorAll('[data-preevent-view]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const eventId = e.currentTarget.getAttribute('data-preevent-view');
        this.openDetailModal(eventId);
      });
    });

    // Bind registration triggers
    document.querySelectorAll('[data-preevent-register]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const eventId = e.currentTarget.getAttribute('data-preevent-register');
        this.triggerRegistration(eventId);
      });
    });
  }

  openDetailModal(eventId) {
    const data = PRE_EVENTS_DATA.find((item) => item.id === eventId);
    if (!data) return;

    let modal = document.getElementById('preeventDetailModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'preeventDetailModal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-box bracket-box">
        <div class="bracket-tl"></div>
        <div class="bracket-tr"></div>
        <div class="bracket-bl"></div>
        <div class="bracket-br"></div>

        <div class="modal-header">
          <div class="modal-header-text">
            <h3>${data.title}</h3>
            <p>${data.track} • Dhyuthi 7.0 Official Pre-Event</p>
          </div>
          <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        </div>

        <div class="modal-scroll-body">
          <div style="display: grid; grid-template-columns: minmax(200px, 260px) 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
            <img src="${data.poster}" alt="${data.title}" style="width: 100%; border-radius: var(--radius-sm); border: 1px solid var(--gold-border); object-fit: cover;">
            <div>
              <div class="mono-tag" style="margin-bottom: 0.5rem;">${data.tagline}</div>
              <p style="font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.25rem;">${data.shortDesc}</p>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: rgba(9,8,6,0.85); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid rgba(212,175,55,0.2);">
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Prize Pool</div>
                  <div style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700; color: var(--gold-300);">${data.prizePool}</div>
                </div>
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Team Size</div>
                  <div style="font-family: var(--font-mono); font-size: 0.9rem; color: #ffffff;">${data.teamSize}</div>
                </div>
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Date & Time</div>
                  <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">${data.date}</div>
                </div>
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Venue Mode</div>
                  <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">${data.mode}</div>
                </div>
              </div>
            </div>
          </div>

          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--gold-300); margin-bottom: 0.75rem;">Competition Guidelines & Rules</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; padding: 0; margin-bottom: 2rem;">
            ${data.rules.map((rule) => `
              <li style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.88rem; color: var(--text-body);">
                <span style="color: var(--gold-400); font-family: var(--font-mono); font-weight: 700;">▸</span>
                ${rule}
              </li>
            `).join('')}
          </ul>

          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button class="btn btn-glass" data-modal-close>Close</button>
            <button class="btn btn-gold" id="modalRegTriggerBtn" data-target-event="${data.id}">Register for this Pre-event</button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');

    modal.querySelector('.modal-close-btn').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.querySelector('[data-modal-close]').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    const regBtn = modal.querySelector('#modalRegTriggerBtn');
    if (regBtn) {
      regBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        this.triggerRegistration(data.id);
      });
    }
  }

  triggerRegistration(eventId) {
    const regModal = document.getElementById('registrationModal');
    if (regModal) {
      const select = regModal.querySelector('#regEventSelection');
      if (select) {
        select.value = eventId;
      }
      regModal.classList.add('open');
    }
  }
}
