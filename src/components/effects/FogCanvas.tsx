'use client';

import React, { useEffect, useRef } from 'react';

interface MistParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  layer: 'bg' | 'mid' | 'fg';
}

export function FogCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Rastreamento de interação do cursor/toque para dispersão de névoa
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Criação de partículas de névoa multicamada para profundidade cinematográfica 3D
    const particles: MistParticle[] = [];
    const count = Math.min(55, Math.max(30, Math.floor(width / 28)));

    for (let i = 0; i < count; i++) {
      const layer: 'bg' | 'mid' | 'fg' = i % 5 === 0 ? 'fg' : i % 2 === 0 ? 'bg' : 'mid';
      const isFg = layer === 'fg';
      const isBg = layer === 'bg';

      particles.push({
        x: Math.random() * width,
        y: height * 0.25 + Math.random() * (height * 0.75),
        radius: isFg ? 220 + Math.random() * 200 : isBg ? 280 + Math.random() * 240 : 160 + Math.random() * 180,
        vx: isFg ? 0.45 + Math.random() * 0.35 : isBg ? 0.12 + Math.random() * 0.18 : 0.25 + Math.random() * 0.25,
        vy: (Math.random() - 0.5) * 0.12,
        baseAlpha: isFg ? 0.08 + Math.random() * 0.08 : isBg ? 0.14 + Math.random() * 0.12 : 0.18 + Math.random() * 0.16,
        pulseSpeed: 0.001 + Math.random() * 0.002,
        pulseOffset: Math.random() * Math.PI * 2,
        layer,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      // Interpolação suave do mouse
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Renderiza cada partícula de névoa volumétrica
      for (const p of particles) {
        p.x += p.vx;
        p.y += Math.sin(time * 0.008 + p.pulseOffset) * 0.3;

        // Dispersão física quando o cursor passa pela névoa
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        const pushRadius = 180;

        if (dist < pushRadius && dist > 0) {
          const force = (1 - dist / pushRadius) * 2.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Looping horizontal infinito contínuo
        if (p.x - p.radius > width) {
          p.x = -p.radius;
          p.y = height * 0.25 + Math.random() * (height * 0.75);
        }

        const alphaPulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        const currentAlpha = Math.max(0.02, p.baseAlpha * (0.85 + 0.25 * alphaPulse));

        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );

        // Paleta gótica de Mystic Falls: azul ardósia gélido, fumaça espectral e penumbra
        if (p.layer === 'fg') {
          grad.addColorStop(0, `rgba(180, 205, 235, ${currentAlpha * 0.9})`);
          grad.addColorStop(0.4, `rgba(120, 145, 175, ${currentAlpha * 0.45})`);
          grad.addColorStop(1, 'rgba(4, 3, 5, 0)');
        } else if (p.layer === 'bg') {
          grad.addColorStop(0, `rgba(70, 90, 120, ${currentAlpha * 0.7})`);
          grad.addColorStop(0.5, `rgba(35, 45, 65, ${currentAlpha * 0.35})`);
          grad.addColorStop(1, 'rgba(4, 3, 5, 0)');
        } else {
          grad.addColorStop(0, `rgba(145, 175, 205, ${currentAlpha * 0.85})`);
          grad.addColorStop(0.35, `rgba(90, 115, 145, ${currentAlpha * 0.5})`);
          grad.addColorStop(0.75, `rgba(40, 50, 70, ${currentAlpha * 0.2})`);
          grad.addColorStop(1, 'rgba(4, 3, 5, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Névoa rasteira ondulante do chão desenhada em curvas bezier no canvas
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height - 120 + Math.sin(time * 0.015) * 20);

      const segments = 6;
      const segWidth = width / segments;
      for (let s = 1; s <= segments; s++) {
        const cpX = (s - 0.5) * segWidth;
        const cpY = height - 140 + Math.sin(time * 0.02 + s * 1.5) * 35;
        const endX = s * segWidth;
        const endY = height - 110 + Math.cos(time * 0.018 + s) * 25;
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const floorGrad = ctx.createLinearGradient(0, height - 160, 0, height);
      floorGrad.addColorStop(0, 'rgba(140, 170, 205, 0)');
      floorGrad.addColorStop(0.4, 'rgba(110, 140, 175, 0.22)');
      floorGrad.addColorStop(1, 'rgba(18, 25, 38, 0.65)');
      ctx.fillStyle = floorGrad;
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[2]"
      />

      {/* Camada suave de névoa rasteira adicional com blur orgânico */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none z-[3] opacity-60"
        style={{
          background: 'linear-gradient(to top, rgba(130, 160, 195, 0.35) 0%, rgba(50, 70, 95, 0.15) 55%, rgba(4, 3, 5, 0) 100%)',
          filter: 'blur(16px)',
        }}
      />
    </>
  );
}
