/**
 * DHYUTHI 7.0 — TRACKS & WORKSHOPS LOGIC
 */

export const TRACKS_DATA = [
  {
    id: 'aigenix',
    name: 'AIGENIX',
    sub: 'Artificial Intelligence & Neural Architectures',
    category: ['workshops', 'competitions', 'talks'],
    icon: 'assets/icons/track-aigenix.svg',
    shortDesc: 'Deep-dive into Agentic AI workflows, Large Multimodal Models, autonomous agent swarms, and high-performance inference at the edge.',
    workshops: [
      'Autonomous Agent Swarms with LangGraph & Google Gemini API',
      'Computer Vision & Edge AI with Jetson Nano',
      'Fine-Tuning Open Source LLMs on Custom Domain Datasets'
    ],
    ktuPoints: '30 KTU Activity Points Approved',
    speakers: 'Dr. Radhakrishnan (AI Research Lab), Ananya Sen (Principal ML Engineer)'
  },
  {
    id: 'cellestro',
    name: 'CELLESTRO',
    sub: 'Robotics, Biomedical Systems & IoT',
    category: ['workshops', 'competitions'],
    icon: 'assets/icons/track-cellestro.svg',
    shortDesc: 'Hands-on hardware development combining embedded microcontrollers, robotic kinematics, bio-mechatronics, and smart wireless sensor mesh.',
    workshops: [
      'ROS2 (Robot Operating System) & Autonomous Navigation',
      'Bio-Potential Signal Acquisition (EMG/ECG Interface Design)',
      'ESP32 Industrial IoT & MQTT Mesh Telemetry'
    ],
    ktuPoints: '30 KTU Activity Points Approved',
    speakers: 'K. R. Varma (Robotics Specialist), Dr. Elena Gomez (Biomedical Tech Lead)'
  },
  {
    id: 'incepta',
    name: 'INCEPTA',
    sub: 'Creative Computing, UI/UX & Web3',
    category: ['workshops', 'spotlight'],
    icon: 'assets/icons/track-incepta.svg',
    shortDesc: 'Bridging design philosophy and technical precision: Design tokens, micro-interactions, spatial computing UI, and modern frontend engines.',
    workshops: [
      'Design Systems & Advanced Prototyping in Figma',
      'Interactive 3D Web Graphics with Three.js & WebGL',
      'Product Architecture: Scaling from MVP to Millions'
    ],
    ktuPoints: '30 KTU Activity Points Approved',
    speakers: 'Sarah Mathew (Lead Product Designer), Nikhil Joshi (Staff Frontend Architect)'
  },
  {
    id: 'synkron',
    name: 'SYNKRON',
    sub: 'Cybersecurity, Cloud & Distributed Defense',
    category: ['workshops', 'competitions', 'talks'],
    icon: 'assets/icons/track-synkron.svg',
    shortDesc: 'Offensive and defensive security drills, zero-trust infrastructure, cloud automation with Kubernetes, and vulnerability auditing.',
    workshops: [
      'Advanced Offensive Security & CTF Exploitation Tactics',
      'DevSecOps Pipelines with Docker & GitHub Actions',
      'Cloud Zero Trust Architecture on AWS & GCP'
    ],
    ktuPoints: '30 KTU Activity Points Approved',
    speakers: 'Vikram Menon (Certified Ethical Hacker), Priya Nair (Cloud Security Architect)'
  }
];

export class Tracks {
  constructor() {
    this.init();
  }

  init() {
    const filterButtons = document.querySelectorAll('.track-filter-btn');
    const trackCards = document.querySelectorAll('.track-card');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        trackCards.forEach((card) => {
          const categories = card.getAttribute('data-categories') || '';
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });

    // Handle Explore Track buttons
    document.querySelectorAll('[data-track-explore]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const trackId = e.currentTarget.getAttribute('data-track-explore');
        this.openTrackModal(trackId);
      });
    });
  }

  openTrackModal(trackId) {
    const track = TRACKS_DATA.find((t) => t.id === trackId);
    if (!track) return;

    const modal = document.getElementById('trackDetailModal');
    if (!modal) return;

    document.getElementById('trackModalTitle').textContent = track.name;
    document.getElementById('trackModalSub').textContent = track.sub;
    document.getElementById('trackModalDesc').textContent = track.shortDesc;
    document.getElementById('trackModalKtu').textContent = track.ktuPoints;
    document.getElementById('trackModalSpeakers').textContent = track.speakers;

    const workshopList = document.getElementById('trackModalWorkshops');
    if (workshopList) {
      workshopList.innerHTML = track.workshops.map((w) => `<li>${w}</li>`).join('');
    }

    modal.classList.add('open');
  }
}
