import type { Alpine } from "alpinejs";
import { initMotion } from "./motion";

export default (Alpine: Alpine) => {
  Alpine.data("neuralNetwork", () => ({
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    dpr: 1,
    animId: null,
    particles: [],
    mouse: {
      x: -9999,
      y: -9999,
      active: false,
      radius: 170,
    },
    synapseRadius: 135,
    pulses: [],

    init() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.onResize();
      this.createParticles();

      this.handlePointerMove = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;
        this.mouse.active = true;
      };

      this.handlePointerLeave = () => {
        this.mouse.active = false;
        this.mouse.x = -9999;
        this.mouse.y = -9999;
      };

      window.addEventListener("pointermove", this.handlePointerMove, {
        passive: true,
      });
      document.addEventListener("mouseleave", this.handlePointerLeave);

      this.pulseInterval = setInterval(() => {
        if (this.particles.length > 5) {
          const startNode =
            this.particles[Math.floor(Math.random() * this.particles.length)];
          startNode.pulse = 1.0;
        }
      }, 1200);

      this.loop = this.loop.bind(this);
      this.animId = requestAnimationFrame(this.loop);
    },

    destroy() {
      if (this.animId) cancelAnimationFrame(this.animId);
      if (this.pulseInterval) clearInterval(this.pulseInterval);
      window.removeEventListener("pointermove", this.handlePointerMove);
      document.removeEventListener("mouseleave", this.handlePointerLeave);
    },

    onResize() {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;

      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.scale(this.dpr, this.dpr);

      if (this.particles && this.particles.length > 0) {
        this.particles.forEach((particle) => {
          if (particle.x > this.width) particle.x = Math.random() * this.width;
          if (particle.y > this.height)
            particle.y = Math.random() * this.height;
        });
      }
    },

    createParticles() {
      this.particles = [];
      const area = this.width * this.height;
      const count = Math.min(Math.max(Math.floor(area / 11000), 45), 110);

      for (let i = 0; i < count; i++) {
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;

        this.particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() < 0.25 ? 3.2 : Math.random() < 0.6 ? 2.2 : 1.5,
          baseRadius: 0,
          pulse: 0,
          energy: Math.random() * Math.PI * 2,
          isCore: Math.random() < 0.18,
        });
      }
    },

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const time = performance.now() * 0.001;
      const mouse = this.mouse;
      const maxDist = this.synapseRadius;
      const mouseR = mouse.radius;

      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];

        particle.x += particle.vx + Math.sin(time + particle.energy) * 0.15;
        particle.y += particle.vy + Math.cos(time + particle.energy) * 0.15;

        if (particle.x < 10) {
          particle.x = 10;
          particle.vx *= -1;
        } else if (particle.x > this.width - 10) {
          particle.x = this.width - 10;
          particle.vx *= -1;
        }

        if (particle.y < 10) {
          particle.y = 10;
          particle.vy *= -1;
        } else if (particle.y > this.height - 10) {
          particle.y = this.height - 10;
          particle.vy *= -1;
        }

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouseR && distance > 0.001) {
            const force = (1 - distance / mouseR) * 3.5;
            const nx = dx / distance;
            const ny = dy / distance;
            particle.x += nx * force;
            particle.y += ny * force;
          }
        }

        if (particle.pulse > 0.02) {
          particle.pulse *= 0.94;
        } else {
          particle.pulse = 0;
        }
      }

      this.ctx.lineWidth = 1;
      for (let i = 0; i < this.particles.length; i++) {
        const particleA = this.particles[i];

        for (let j = i + 1; j < this.particles.length; j++) {
          const particleB = this.particles[j];
          const dx = particleB.x - particleA.x;
          const dy = particleB.y - particleA.y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDist) {
            let severance = 0;

            if (mouse.active) {
              const distanceSquared = distance * distance;
              const progress = Math.max(
                0,
                Math.min(
                  1,
                  ((mouse.x - particleA.x) * dx +
                    (mouse.y - particleA.y) * dy) /
                    distanceSquared,
                ),
              );
              const projectionX = particleA.x + progress * dx;
              const projectionY = particleA.y + progress * dy;
              const distanceToMouse = Math.hypot(
                mouse.x - projectionX,
                mouse.y - projectionY,
              );

              if (distanceToMouse < mouseR) {
                severance = Math.pow(1 - distanceToMouse / mouseR, 1.3);
              }
            }

            const baseAlpha = (1 - distance / maxDist) * 0.45;
            const finalAlpha = baseAlpha * (1 - severance);

            if (finalAlpha > 0.015) {
              const pulseStrength = Math.max(particleA.pulse, particleB.pulse);

              this.ctx.beginPath();
              this.ctx.moveTo(particleA.x, particleA.y);
              this.ctx.lineTo(particleB.x, particleB.y);

              if (pulseStrength > 0.1) {
                this.ctx.strokeStyle = `rgba(183, 243, 77, ${Math.min(finalAlpha + pulseStrength * 0.6, 0.95)})`;
                this.ctx.lineWidth = 1.6;
              } else {
                this.ctx.strokeStyle = `rgba(183, 243, 77, ${finalAlpha})`;
                this.ctx.lineWidth = 0.9;
              }
              this.ctx.stroke();

              if (
                particleA.pulse > 0.7 &&
                particleB.pulse < 0.2 &&
                severance < 0.3
              ) {
                particleB.pulse = particleA.pulse * 0.85;
              }
            }
          }
        }
      }

      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        const isExcited = particle.pulse > 0.1;
        const radius = particle.radius + particle.pulse * 2.5;

        if (particle.isCore || isExcited) {
          const glowRadius = radius * 3.8;
          const glowGradient = this.ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowRadius,
          );
          glowGradient.addColorStop(
            0,
            isExcited ? "rgba(183, 243, 77, 0.45)" : "rgba(183, 243, 77, 0.2)",
          );
          glowGradient.addColorStop(1, "rgba(183, 243, 77, 0)");

          this.ctx.fillStyle = glowGradient;
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = isExcited
          ? "rgba(255, 255, 255, 0.98)"
          : particle.isCore
            ? "rgba(183, 243, 77, 0.95)"
            : "rgba(183, 243, 77, 0.65)";
        this.ctx.fill();
      }

      if (mouse.active) {
        const cursorGlow = this.ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseR * 0.75,
        );
        cursorGlow.addColorStop(0, "rgba(183, 243, 77, 0.08)");
        cursorGlow.addColorStop(0.5, "rgba(64, 123, 255, 0.04)");
        cursorGlow.addColorStop(1, "rgba(183, 243, 77, 0)");

        this.ctx.fillStyle = cursorGlow;
        this.ctx.beginPath();
        this.ctx.arc(mouse.x, mouse.y, mouseR * 0.75, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.animId = requestAnimationFrame(this.loop);
    },
  }));

  Alpine.data("parallaxBand", () => ({
    isVisible: false,
    currentScrollY: 0,
    targetScrollY: 0,
    animId: null,

    init() {
      const section = this.$el;
      const trackTop = this.$refs.trackTop;
      const trackBottom = this.$refs.trackBottom;
      const content = this.$refs.content;
      const bgGrid = this.$refs.bgGrid;
      const glowOrb1 = this.$refs.glowOrb1;
      const glowOrb2 = this.$refs.glowOrb2;

      let currentProgress = 0;
      let targetProgress = 0;

      const updateTarget = () => {
        const rect = section.getBoundingClientRect();
        const winHeight = window.innerHeight;

        if (rect.bottom >= -100 && rect.top <= winHeight + 100) {
          this.isVisible = true;
          const totalDistance = winHeight + rect.height;
          const currentPosition = winHeight - rect.top;
          targetProgress = Math.max(
            0,
            Math.min(1, currentPosition / totalDistance),
          );
        } else {
          this.isVisible = false;
        }
      };

      const render = () => {
        currentProgress += (targetProgress - currentProgress) * 0.12;

        if (
          this.isVisible ||
          Math.abs(targetProgress - currentProgress) > 0.001
        ) {
          const centered = currentProgress - 0.5;

          if (trackTop) {
            trackTop.style.transform = `translate3d(${centered * -380}px, 0, 0)`;
          }

          if (trackBottom) {
            trackBottom.style.transform = `translate3d(${centered * 380 - 200}px, 0, 0)`;
          }

          if (content) {
            content.style.transform = `translate3d(0, ${centered * -45}px, 0)`;
          }

          if (bgGrid) {
            bgGrid.style.transform = `translate3d(0, ${centered * 60}px, 0)`;
          }

          if (glowOrb1) {
            glowOrb1.style.transform = `translate3d(0, ${centered * -90}px, 0)`;
          }
          if (glowOrb2) {
            glowOrb2.style.transform = `translate3d(0, ${centered * 90}px, 0)`;
          }
        }

        this.animId = requestAnimationFrame(render);
      };

      window.addEventListener("scroll", updateTarget, { passive: true });
      window.addEventListener("resize", updateTarget, { passive: true });

      updateTarget();
      currentProgress = targetProgress;
      this.animId = requestAnimationFrame(render);
    },

    destroy() {
      if (this.animId) cancelAnimationFrame(this.animId);
    },
  }));

  document.addEventListener("alpine:initialized", () => initMotion(), {
    once: true,
  });
};
