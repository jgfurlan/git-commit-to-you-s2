'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RavenHarbingerProps {
  onFeatherLanded?: () => void;
}

export function RavenHarbinger({ onFeatherLanded }: RavenHarbingerProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Silhueta do Corvo Voando no Topo */}
      <motion.div
        initial={{ x: '-20vw', y: '10vh', scale: 0.7, opacity: 0 }}
        animate={{
          x: ['0vw', '45vw', '110vw'],
          y: ['8vh', '14vh', '6vh'],
          opacity: [0, 0.9, 0],
          scale: [0.75, 0.95, 0.8],
        }}
        transition={{ duration: 4.5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 text-stone-950"
      >
        {/* SVG do Corvo de Damon com asas abertas */}
        <svg
          viewBox="0 0 120 70"
          className="w-24 h-16 fill-[#050406] filter drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]"
        >
          {/* Corpo e bico */}
          <path d="M55,35 Q60,32 70,36 Q80,38 88,34 Q85,39 75,41 Q65,43 55,42 Z" />
          {/* Cabeça e bico afiado */}
          <path d="M75,37 Q85,32 96,35 Q86,40 76,41 Z" />
          {/* Asa Esquerda Superior */}
          <path d="M58,35 Q40,10 15,5 Q28,22 48,34 Z" />
          <path d="M48,34 Q32,18 10,14 Q22,28 45,36 Z" />
          {/* Asa Direita Superior */}
          <path d="M62,35 Q75,12 105,8 Q90,24 68,36 Z" />
          {/* Cauda em leque */}
          <path d="M55,42 Q40,55 30,65 Q45,55 58,45 Z" />
        </svg>
      </motion.div>

      {/* A Pena de Corvo Caindo em Balanço Senoidal */}
      <motion.div
        initial={{ y: -60, x: '50vw', rotate: -25, opacity: 0 }}
        animate={{
          y: ['0vh', '25vh', '50vh', '68vh'],
          x: ['48vw', '54vw', '46vw', '50vw'],
          rotate: [-20, 25, -15, 10],
          opacity: [0, 1, 1, 0.9],
        }}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          times: [0, 0.35, 0.7, 1],
        }}
        onAnimationComplete={onFeatherLanded}
        className="absolute top-0 left-0"
      >
        {/* SVG Realista de Pena de Corvo Negra com Raque Dourada */}
        <div className="relative w-10 h-24 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          <svg viewBox="0 0 40 100" className="w-full h-full">
            {/* Raque central da pena (haste) */}
            <path
              d="M20,5 Q20.5,50 20,95"
              stroke="#C9A86A"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Barba esquerda da pena (Preto Ônix com leve reflexo) */}
            <path
              d="M20,10 Q6,30 8,65 Q12,80 20,90 Q17,70 16,40 Z"
              fill="url(#ravenGradientLeft)"
            />
            {/* Barba direita da pena */}
            <path
              d="M20,10 Q34,30 32,65 Q28,80 20,90 Q23,70 24,40 Z"
              fill="url(#ravenGradientRight)"
            />
            {/* Ranhuras sutis da pena */}
            <path d="M20,25 L12,32 M20,40 L10,48 M20,55 L13,62" stroke="#2B3B4E" strokeWidth="0.5" opacity="0.6" />
            <path d="M20,25 L28,32 M20,40 L30,48 M20,55 L27,62" stroke="#2B3B4E" strokeWidth="0.5" opacity="0.6" />

            <defs>
              <linearGradient id="ravenGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#181420" />
                <stop offset="50%" stopColor="#0A080D" />
                <stop offset="100%" stopColor="#040305" />
              </linearGradient>
              <linearGradient id="ravenGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#221C2B" />
                <stop offset="60%" stopColor="#0D0A12" />
                <stop offset="100%" stopColor="#050406" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
