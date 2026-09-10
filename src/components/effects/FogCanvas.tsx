'use client';

import React, { useEffect, useRef } from 'react';

interface FogCloud {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export function FogCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Névoa volumétrica densa adaptada para Desktop e Mobile
    const cloudCount = Math.max(35, Math.floor(width / 35));
    const clouds: FogCloud[] = [];

    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * width,
        y: height * 0.35 + Math.random() * (height * 0.65), // Concentrada no meio e no chão
        radius: 180 + Math.random() * 260,
        vx: 0.15 + Math.random() * 0.4, // Fluxo constante para a direita como vento frio
        vy: (Math.random() - 0.5) * 0.15,
        baseAlpha: 0.18 + Math.random() * 0.22, // Nitidamente visível contra o fundo preto
        pulseSpeed: 0.0015 + Math.random() * 0.002,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (const cloud of clouds) {
        cloud.x += cloud.vx;
        cloud.y += Math.sin(time * 0.01 + cloud.pulseOffset) * 0.25;

        // Reposiciona em looping infinito horizontal
        if (cloud.x - cloud.radius > width) {
          cloud.x = -cloud.radius;
          cloud.y = height * 0.35 + Math.random() * (height * 0.65);
        }

        const alpha = cloud.baseAlpha * (0.8 + 0.2 * Math.sin(time * cloud.pulseSpeed + cloud.pulseOffset));

        // Gradiente de névoa cinza-espectral/azulada de Mystic Falls
        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.radius
        );

        // Cores claras e visíveis que contrastam com o preto
        gradient.addColorStop(0, `rgba(160, 185, 215, ${alpha * 0.85})`);
        gradient.addColorStop(0.35, `rgba(100, 125, 155, ${alpha * 0.55})`);
        gradient.addColorStop(0.7, `rgba(45, 55, 75, ${alpha * 0.25})`);
        gradient.addColorStop(1, 'rgba(4, 3, 5, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 1. Canvas Dinâmico de Névoa */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[2]"
      />

      {/* 2. Névoa Rasteira de Rodapé (Camada CSS Contínua) */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-72 pointer-events-none z-[3] opacity-60"
        style={{
          background: 'linear-gradient(to top, rgba(140, 165, 195, 0.28) 0%, rgba(60, 80, 110, 0.15) 50%, rgba(4, 3, 5, 0) 100%)',
          filter: 'blur(12px)',
        }}
      />
    </>
  );
}
