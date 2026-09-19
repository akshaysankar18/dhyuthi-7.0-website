/**
 * DHYUTHI 7.0 — LIGHT CORE PROCEDURAL CANVAS ENGINE
 * Interactive Light Core chamber with 3D perspective grid,
 * double-helix gold/violet flame, levitating crystals, and cursor physics.
 */

export class LightCoreCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.dpr = window.devicePixelRatio || 1;

    // Physics & Interaction State
    this.mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      awakened: false
    };

    this.reducedMotion = false;
    this.time = 0;
    this.shockwaves = [];
    this.particles = [];
    this.crystals = [];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Event listeners on canvas
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this.onMouseLeave());
    this.canvas.addEventListener('click', (e) => this.onClick(e));
    this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });

    // Initialize crystals
    this.initCrystals();
    // Initialize ambient sparks
    this.initParticles();

    // Start render loop
    requestAnimationFrame((t) => this.render(t));
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    // Default center mouse target
    if (!this.mouse.active) {
      this.mouse.x = this.width * 0.5;
      this.mouse.y = this.height * 0.45;
      this.mouse.targetX = this.mouse.x;
      this.mouse.targetY = this.mouse.y;
    }
  }

  initCrystals() {
    // 4 floating multifaceted crystals surrounding the core (matching screenshot)
    this.crystals = [
      { xRel: 0.18, yRel: 0.48, width: 14, height: 48, speed: 0.0018, phase: 0, color: '#9348fc' },
      { xRel: 0.11, yRel: 0.62, width: 12, height: 40, speed: 0.0022, phase: 1.5, color: '#f6c453' },
      { xRel: 0.88, yRel: 0.42, width: 14, height: 46, speed: 0.0019, phase: 3.2, color: '#9348fc' },
      { xRel: 0.82, yRel: 0.64, width: 12, height: 38, speed: 0.0025, phase: 4.7, color: '#f6c453' }
    ];
  }

  initParticles() {
    this.particles = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.8 - 0.2,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.4 ? '#f6c453' : '#b27bf7'
      });
    }
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.targetX = e.clientX - rect.left;
    this.mouse.targetY = e.clientY - rect.top;
    this.mouse.active = true;

    if (!this.mouse.awakened) {
      this.mouse.awakened = true;
      const hint = document.querySelector('.cursor-interaction-hint');
      if (hint) hint.classList.add('fade-out');
    }
  }

  onMouseLeave() {
    this.mouse.targetX = this.width * 0.5;
    this.mouse.targetY = this.height * 0.45;
    this.mouse.active = false;
  }

  onTouchMove(e) {
    if (e.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.targetX = e.touches[0].clientX - rect.left;
      this.mouse.targetY = e.touches[0].clientY - rect.top;
      this.mouse.active = true;
      if (!this.mouse.awakened) {
        this.mouse.awakened = true;
        const hint = document.querySelector('.cursor-interaction-hint');
        if (hint) hint.classList.add('fade-out');
      }
    }
  }

  onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    this.shockwaves.push({
      x: clickX,
      y: clickY,
      radius: 10,
      maxRadius: Math.max(this.width, this.height) * 0.6,
      alpha: 1
    });
  }

  setReducedMotion(enabled) {
    this.reducedMotion = enabled;
  }

  render(timestamp) {
    if (!this.reducedMotion) {
      this.time = timestamp * 0.0015;
      // Spring smoothing toward mouse
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;
    } else {
      this.time += 0.005;
      this.mouse.x = this.width * 0.5;
      this.mouse.y = this.height * 0.45;
    }

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Perspective Grid Floor
    this.drawPerspectiveGrid(ctx);

    // 2. Base Dais & Concentric Rings
    this.drawDaisRings(ctx);

    // 3. Shockwave Pulses
    this.drawShockwaves(ctx);

    // 4. Levitating Crystals
    this.drawCrystals(ctx);

    // 5. Light Core Double-Helix Flame
    this.drawLightCore(ctx);

    // 6. Floating Spark Particles
    this.drawParticles(ctx);

    requestAnimationFrame((t) => this.render(t));
  }

  drawPerspectiveGrid(ctx) {
    const horizon = this.height * 0.58;
    const bottom = this.height;
    const centerX = this.width * 0.5;

    ctx.save();
    ctx.strokeStyle = 'rgba(246, 196, 83, 0.09)';
    ctx.lineWidth = 1;

    // Horizontal grid lines receding to horizon
    const steps = 14;
    for (let i = 1; i <= steps; i++) {
      const p = Math.pow(i / steps, 2.3);
      const y = horizon + p * (bottom - horizon);
      const alpha = p * 0.35;
      ctx.strokeStyle = `rgba(147, 72, 252, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Perspective vanishing lines
    const rays = 20;
    for (let i = -rays; i <= rays; i++) {
      const xBottom = centerX + i * (this.width * 0.08);
      ctx.strokeStyle = 'rgba(246, 196, 83, 0.06)';
      ctx.beginPath();
      ctx.moveTo(centerX, horizon - 20);
      ctx.lineTo(xBottom, bottom);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawDaisRings(ctx) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.76;

    ctx.save();
    // Ambient floor glow
    const floorGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 220);
    floorGlow.addColorStop(0, 'rgba(246, 196, 83, 0.35)');
    floorGlow.addColorStop(0.3, 'rgba(147, 72, 252, 0.25)');
    floorGlow.addColorStop(1, 'rgba(9, 10, 15, 0)');
    ctx.fillStyle = floorGlow;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 220, 55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Concentric dais rings
    const ringRadii = [180, 140, 100, 60];
    ringRadii.forEach((r, idx) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.26, 0, 0, Math.PI * 2);
      ctx.strokeStyle = idx % 2 === 0 ? 'rgba(246, 196, 83, 0.45)' : 'rgba(147, 72, 252, 0.45)';
      ctx.lineWidth = idx === 0 ? 2 : 1.2;
      ctx.stroke();
    });

    // Central bright pedestal flare
    ctx.beginPath();
    ctx.ellipse(cx, cy, 40, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fffae6';
    ctx.shadowColor = '#f6c453';
    ctx.shadowBlur = 25;
    ctx.fill();

    ctx.restore();
  }

  drawLightCore(ctx) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.74;
    const peakY = this.height * 0.22;
    const flameHeight = cy - peakY;

    // Mouse influence vector
    const dx = (this.mouse.x - cx) * 0.25;
    const dy = (this.mouse.y - (peakY + flameHeight * 0.5)) * 0.15;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // 1. Back Violet Core Glow
    const backGlow = ctx.createRadialGradient(cx + dx * 0.5, peakY + flameHeight * 0.5 + dy, 20, cx, cy - flameHeight * 0.4, flameHeight * 0.7);
    backGlow.addColorStop(0, 'rgba(217, 70, 239, 0.5)');
    backGlow.addColorStop(0.5, 'rgba(147, 72, 252, 0.25)');
    backGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = backGlow;
    ctx.beginPath();
    ctx.arc(cx, cy - flameHeight * 0.4, flameHeight * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // 2. Swirling Double-Helix Ribbons
    const segments = 45;
    const ribbons = [
      { color1: '#ffe58f', color2: '#e69a19', width: 9, offset: 0 },
      { color1: '#c084fc', color2: '#7b3fe4', width: 8, offset: Math.PI },
      { color1: '#ffffff', color2: '#f6c453', width: 4, offset: Math.PI * 0.5 }
    ];

    ribbons.forEach((ribbon) => {
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const currentY = cy - t * flameHeight;
        
        // Helix envelope (wider in middle, tapering at top and bottom)
        const envelope = Math.sin(t * Math.PI);
        const wave = Math.sin(t * 7 - this.time * 2.5 + ribbon.offset);
        const lean = (1 - t) * 0.2 + t * dx;
        const currentX = cx + wave * (envelope * 48) + lean;

        if (i === 0) {
          ctx.moveTo(currentX, currentY);
        } else {
          ctx.lineTo(currentX, currentY);
        }
      }

      ctx.strokeStyle = ribbon.color1;
      ctx.lineWidth = ribbon.width;
      ctx.lineCap = 'round';
      ctx.shadowColor = ribbon.color2;
      ctx.shadowBlur = 20;
      ctx.stroke();
    });

    // 3. Central Flame Teardrop (Outer contour)
    ctx.beginPath();
    const tipX = cx + dx * 1.1;
    const tipY = peakY - 10 + dy * 0.4;
    ctx.moveTo(tipX, tipY);
    ctx.bezierCurveTo(
      cx + 70 + dx * 0.6, peakY + flameHeight * 0.4,
      cx + 45, cy - 10,
      cx, cy
    );
    ctx.bezierCurveTo(
      cx - 45, cy - 10,
      cx - 70 + dx * 0.6, peakY + flameHeight * 0.4,
      tipX, tipY
    );
    
    const flameGrad = ctx.createLinearGradient(cx, tipY, cx, cy);
    flameGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    flameGrad.addColorStop(0.3, 'rgba(246, 196, 83, 0.85)');
    flameGrad.addColorStop(0.7, 'rgba(147, 72, 252, 0.4)');
    flameGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = flameGrad;
    ctx.shadowColor = '#f6c453';
    ctx.shadowBlur = 30;
    ctx.fill();

    // 4. Vertical Beacon Ray from Core
    const ray = ctx.createLinearGradient(cx, tipY, cx, 0);
    ray.addColorStop(0, 'rgba(255, 240, 180, 0.6)');
    ray.addColorStop(1, 'transparent');
    ctx.fillStyle = ray;
    ctx.fillRect(cx - 2, 0, 4, tipY);

    ctx.restore();
  }

  drawCrystals(ctx) {
    ctx.save();
    this.crystals.forEach((c) => {
      const x = this.width * c.xRel;
      // Levitating bobbing motion
      const bob = Math.sin(this.time * 2 + c.phase) * 12;
      const y = this.height * c.yRel + bob;

      ctx.beginPath();
      // Hexagonal / Diamond Prism contour
      ctx.moveTo(x, y - c.height * 0.5);
      ctx.lineTo(x + c.width * 0.5, y - c.height * 0.15);
      ctx.lineTo(x + c.width * 0.5, y + c.height * 0.25);
      ctx.lineTo(x, y + c.height * 0.5);
      ctx.lineTo(x - c.width * 0.5, y + c.height * 0.25);
      ctx.lineTo(x - c.width * 0.5, y - c.height * 0.15);
      ctx.closePath();

      const grad = ctx.createLinearGradient(x - c.width, y, x + c.width, y);
      grad.addColorStop(0, c.color === '#f6c453' ? '#ffe58f' : '#d946ef');
      grad.addColorStop(0.5, c.color);
      grad.addColorStop(1, '#090b14');

      ctx.fillStyle = grad;
      ctx.shadowColor = c.color;
      ctx.shadowBlur = 15;
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Facet center line
      ctx.beginPath();
      ctx.moveTo(x, y - c.height * 0.5);
      ctx.lineTo(x, y + c.height * 0.5);
      ctx.stroke();
    });
    ctx.restore();
  }

  drawShockwaves(ctx) {
    ctx.save();
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += 8;
      sw.alpha -= 0.02;

      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        this.shockwaves.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(246, 196, 83, ${sw.alpha * 0.8})`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#f6c453';
      ctx.shadowBlur = 15;
      ctx.stroke();
    }
    ctx.restore();
  }

  drawParticles(ctx) {
    ctx.save();
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.y < 0) {
        p.y = this.height;
        p.x = Math.random() * this.width;
      }
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
    });
    ctx.restore();
  }
}
