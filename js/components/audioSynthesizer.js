/**
 * DHYUTHI 7.0 — WEB AUDIO ATMOSPHERIC SYNTHESIZER
 * Synthesizes subtle sci-fi harmonic frequencies and button feedback
 * without requiring external audio asset files or network dependencies.
 */

export class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return !this.muted;
  }

  // Play ethereal harmonic awakening chime
  playAwakenChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const freqs = [432, 540, 648, 864]; // Ethereal golden ratio overtone series
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSineTone(freq, 1.2, 0.04);
      }, idx * 120);
    });
  }

  // Cinematic Sub-Bass Detonation & Solar Resonant Sweep
  playIgnitionBurst() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Deep Sub-Bass Impact (75Hz dropping to 28Hz)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(75, now);
      subOsc.frequency.exponentialRampToValueAtTime(28, now + 1.0);
      subGain.gain.setValueAtTime(0.22, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.0);

      // 2. Harmonic Resonant Chord (432Hz, 648Hz, 864Hz)
      const freqs = [432, 648, 864];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq * 0.75, now);
        osc.frequency.exponentialRampToValueAtTime(freq, now + 0.3);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + 1.2);
      });
    } catch (e) {
      // Gracefully handle browser autoplay policy
    }
  }

  // Subtle interactive UI blip
  playUiBeep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.playSineTone(880, 0.15, 0.02);
  }

  playSineTone(frequency, duration, volume) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }
}
