/**
 * DHYUTHI 7.0 — VOLUMETRIC PRISMATIC LIGHT RAYS (CINEMATIC GOD RAYS)
 * Majestic, atmospheric celestial light shafts radiating from the solar horizon.
 * Pure physical optics: additive caustic screen blending, slow harmonic angular drift,
 * interactive 3D perspective parallax, and multi-spectrum chromatic dispersion.
 *
 * Replaces both the 11:11 floating particle dust and wavy sine curves with
 * authentic, monumental god rays embodying the Sanskrit meaning of Dhyuthi (Light & Radiance).
 */

export class ParticleCanvas {
  constructor(canvasId = 'bgParticleCanvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.rays = [];
    this.animationFrameId = null;
    this.reducedMotion = false;
    this.isTabVisible = true;
    this.time = 0;
    this.lastTimestamp = performance.now();

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Fixed Origin: Top-center celestial horizon (anchored, non-distracting)
    this.baseOriginX = this.width * 0.5;
    this.baseOriginY = -this.height * 0.06;
    this.originX = this.baseOriginX;
    this.originY = this.baseOriginY;

    this.init();
  }

  init() {
    this.resize();
    this.createRays();
    this.bindEvents();
    this.checkReducedMotionPreference();
    this.startLoop();
  }

  createRays() {
    // Curated spectrum palette: Dhyuthi Solar Gold, Celestial White, Imperial Brass,
    // with subtle Prismatic Amethyst and Cyan chromatic dispersion at ray peripheries
    const spectralColors = [
      { r: 246, g: 196, b: 83, name: 'solar-gold' },      // Core Gold
      { r: 255, g: 250, b: 235, name: 'celestial-white' }, // Pure Brilliance
      { r: 212, g: 175, b: 55, name: 'imperial-brass' },   // Deep Brass
      { r: 230, g: 154, b: 25, name: 'radiant-amber' },    // Solar Amber
      { r: 180, g: 130, b: 255, name: 'prismatic-amethyst' }, // Amethyst dispersion
      { r: 120, g: 220, b: 255, name: 'prismatic-cyan' },     // Cyan dispersion
      { r: 255, g: 220, b: 120, name: 'corona-flame' }     // Warm Glow
    ];

    // 13 monumental volumetric shafts fanning downward across the viewport (from 22° to 158°)
    const rayCount = 13;
    const startAngle = Math.PI * 0.12; // ~21.6 deg
    const endAngle = Math.PI * 0.88;   // ~158.4 deg
    const angleStep = (endAngle - startAngle) / (rayCount - 1);

    this.rays = [];

    for (let i = 0; i < rayCount; i++) {
      const baseAngle = startAngle + i * angleStep + (Math.random() - 0.5) * 0.04;
      const color = spectralColors[i % spectralColors.length];
      const spread = 0.06 + Math.random() * 0.09; // Angular width in radians

      this.rays.push({
        baseAngle,
        spread,
        color,
        // Base opacity: soft, elegant, non-intrusive for optimal text legibility
        alphaBase: 0.06 + Math.random() * 0.09,
        // Extremely slow celestial breathing speeds (NOT rapid waves)
        driftSpeed: 0.00035 + Math.random() * 0.0004,
        driftAmp: 0.035 + Math.random() * 0.04, // Gentle angular sway
        pulseSpeed: 0.0008 + Math.random() * 0.0012,
        phase: (i * 1.618) + Math.random() * Math.PI,
        lengthMult: 1.5 + Math.random() * 0.5
      });
    }
  }

  bindEvents() {
    this.onResize = this.handleResize.bind(this);
    this.onVisibilityChange = this.handleVisibilityChange.bind(this);

    window.addEventListener('resize', this.onResize);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // Reduced motion switch listener in UI
    const motionSwitch = document.getElementById('reducedMotionSwitch');
    if (motionSwitch) {
      motionSwitch.addEventListener('change', (e) => {
        this.setReducedMotion(e.target.checked);
      });
    }
  }

  handleVisibilityChange() {
    this.isTabVisible = !document.hidden;
    if (this.isTabVisible && !this.reducedMotion) {
      this.lastTimestamp = performance.now();
      this.startLoop();
    } else {
      this.stopLoop();
    }
  }

  checkReducedMotionPreference() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      this.setReducedMotion(true);
    }
    mediaQuery.addEventListener('change', (e) => {
      this.setReducedMotion(e.matches);
    });
  }

  setReducedMotion(enabled) {
    this.reducedMotion = enabled;
    if (this.reducedMotion) {
      this.stopLoop();
      this.renderStatic();
    } else {
      this.startLoop();
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);

    this.baseOriginX = this.width * 0.5;
    this.baseOriginY = -this.height * 0.06;
    this.originX = this.baseOriginX;
    this.originY = this.baseOriginY;
  }

  handleResize() {
    this.resize();
    this.createRays();
    if (this.reducedMotion) {
      this.renderStatic();
    }
  }

  startLoop() {
    if (this.animationFrameId) return;
    const animate = (timestamp) => {
      const dt = Math.min(timestamp - this.lastTimestamp, 64);
      this.lastTimestamp = timestamp;
      this.time += dt;

      this.render();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  stopLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Origin is solidly anchored at the celestial horizon
    this.originX = this.baseOriginX;
    this.originY = this.baseOriginY;

    ctx.clearRect(0, 0, w, h);

    const maxReach = Math.hypot(w, h) * 1.5;

    // 1. Core Solar Horizon Atmospheric Bloom (Layered Diffuse Glows)
    this.drawHorizonAtmosphere(ctx, maxReach);

    // 2. Volumetric God Rays (Screen composite for authentic caustic interference)
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];

      // Slow majestic angular drift (harmonic oscillation)
      const currentAngle = ray.baseAngle + Math.sin(this.time * ray.driftSpeed + ray.phase) * ray.driftAmp;
      const currentAlpha = ray.alphaBase * (0.82 + 0.28 * Math.cos(this.time * ray.pulseSpeed + ray.phase));
      const reach = maxReach * ray.lengthMult;
      const halfSpread = ray.spread * 0.5;

      const angle1 = currentAngle - halfSpread;
      const angle2 = currentAngle + halfSpread;

      const x1 = this.originX + Math.cos(angle1) * reach;
      const y1 = this.originY + Math.sin(angle1) * reach;
      const x2 = this.originX + Math.cos(angle2) * reach;
      const y2 = this.originY + Math.sin(angle2) * reach;

      // Axial Linear Gradient from Horizon to Edge
      const midAngle = currentAngle;
      const endX = this.originX + Math.cos(midAngle) * reach;
      const endY = this.originY + Math.sin(midAngle) * reach;

      const grad = ctx.createLinearGradient(this.originX, this.originY, endX, endY);
      const { r, g, b } = ray.color;

      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 1.4})`);
      grad.addColorStop(0.18, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.9})`);
      grad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.4})`);
      grad.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.1})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(this.originX, this.originY);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.fill();
    }

    // 3. Central Crepuscular Light Pillar (Vertical Horizon Column)
    this.drawCentralLightPillar(ctx, w, h);

    // 4. Subtle Prismatic Anamorphic Horizon Streak
    this.drawAnamorphicHorizonStreak(ctx, w);

    ctx.restore();
  }

  drawHorizonAtmosphere(ctx, maxReach) {
    // Inner Brilliant Core
    const innerBloom = ctx.createRadialGradient(
      this.originX, this.originY, 5,
      this.originX, this.originY, Math.min(this.width * 0.28, 220)
    );
    innerBloom.addColorStop(0, 'rgba(255, 252, 242, 0.28)');
    innerBloom.addColorStop(0.4, 'rgba(246, 196, 83, 0.14)');
    innerBloom.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = innerBloom;
    ctx.beginPath();
    ctx.arc(this.originX, this.originY, Math.min(this.width * 0.28, 220), 0, Math.PI * 2);
    ctx.fill();

    // Wide Solar Corona
    const coronaBloom = ctx.createRadialGradient(
      this.originX, this.originY, 20,
      this.originX, this.originY, Math.min(this.width * 0.65, 680)
    );
    coronaBloom.addColorStop(0, 'rgba(246, 196, 83, 0.10)');
    coronaBloom.addColorStop(0.5, 'rgba(180, 130, 255, 0.035)');
    coronaBloom.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = coronaBloom;
    ctx.beginPath();
    ctx.arc(this.originX, this.originY, Math.min(this.width * 0.65, 680), 0, Math.PI * 2);
    ctx.fill();
  }

  drawCentralLightPillar(ctx, w, h) {
    const pillarWidth = Math.min(w * 0.35, 340);
    const pillarHeight = h * 0.85;

    const pillarGrad = ctx.createLinearGradient(
      this.originX, this.originY,
      this.originX, this.originY + pillarHeight
    );
    pillarGrad.addColorStop(0, 'rgba(255, 248, 220, 0.16)');
    pillarGrad.addColorStop(0.3, 'rgba(246, 196, 83, 0.08)');
    pillarGrad.addColorStop(0.7, 'rgba(212, 175, 55, 0.025)');
    pillarGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = pillarGrad;
    ctx.beginPath();
    ctx.moveTo(this.originX - pillarWidth * 0.15, this.originY);
    ctx.lineTo(this.originX + pillarWidth * 0.15, this.originY);
    ctx.lineTo(this.originX + pillarWidth * 0.5, this.originY + pillarHeight);
    ctx.lineTo(this.originX - pillarWidth * 0.5, this.originY + pillarHeight);
    ctx.closePath();
    ctx.fill();
  }

  drawAnamorphicHorizonStreak(ctx, w) {
    const streakWidth = Math.min(w * 0.8, 900);
    const streakHeight = 3;
    const streakY = this.originY + 15;

    const streakGrad = ctx.createLinearGradient(
      this.originX - streakWidth * 0.5, streakY,
      this.originX + streakWidth * 0.5, streakY
    );
    streakGrad.addColorStop(0, 'rgba(120, 220, 255, 0)');
    streakGrad.addColorStop(0.2, 'rgba(120, 220, 255, 0.08)');
    streakGrad.addColorStop(0.5, 'rgba(255, 250, 235, 0.22)');
    streakGrad.addColorStop(0.8, 'rgba(180, 130, 255, 0.08)');
    streakGrad.addColorStop(1, 'rgba(180, 130, 255, 0)');

    ctx.fillStyle = streakGrad;
    ctx.fillRect(this.originX - streakWidth * 0.5, streakY - streakHeight * 0.5, streakWidth, streakHeight);
  }

  renderStatic() {
    // Accessibility fallback: crisp, static volumetric rays with zero motion
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);
    const maxReach = Math.hypot(w, h) * 1.5;

    this.drawHorizonAtmosphere(ctx, maxReach);

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      const reach = maxReach * ray.lengthMult;
      const angle1 = ray.baseAngle - ray.spread * 0.5;
      const angle2 = ray.baseAngle + ray.spread * 0.5;

      const x1 = this.originX + Math.cos(angle1) * reach;
      const y1 = this.originY + Math.sin(angle1) * reach;
      const x2 = this.originX + Math.cos(angle2) * reach;
      const y2 = this.originY + Math.sin(angle2) * reach;

      const endX = this.originX + Math.cos(ray.baseAngle) * reach;
      const endY = this.originY + Math.sin(ray.baseAngle) * reach;

      const grad = ctx.createLinearGradient(this.originX, this.originY, endX, endY);
      const { r, g, b } = ray.color;

      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${ray.alphaBase * 1.2})`);
      grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${ray.alphaBase * 0.6})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(this.originX, this.originY);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.fill();
    }

    this.drawCentralLightPillar(ctx, w, h);
    ctx.restore();
  }

  destroy() {
    this.stopLoop();
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }
}

// Named alias for semantic clarity
export const LightRaysCanvas = ParticleCanvas;
