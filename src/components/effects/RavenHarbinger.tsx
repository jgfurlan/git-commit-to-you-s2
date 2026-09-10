'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RavenHarbingerProps {
  onFeatherLanded?: () => void;
}

export function RavenHarbinger({ onFeatherLanded }: RavenHarbingerProps) {
  const [hasLanded, setHasLanded] = useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[25]">
      {/* 1. Silhueta Majestosa do Corvo Cruzando o Céu de Mystic Falls */}
      <motion.div
        initial={{ x: '-20vw', y: '8vh', scale: 0.85, opacity: 0 }}
        animate={{
          x: ['-10vw', '45vw', '115vw'],
          y: ['6vh', '15vh', '4vh'],
          opacity: [0, 1, 0],
          scale: [0.8, 1.15, 0.85],
        }}
        transition={{ duration: 5.5, ease: 'easeInOut' }}
        className="absolute top-0 left-0"
      >
        {/* SVG detalhado do Corvo com asas abertas e bico afiado */}
        <svg
          viewBox="0 0 140 80"
          className="w-36 h-20 fill-[#040305] filter drop-shadow-[0_0_15px_rgba(201,168,106,0.35)]"
        >
          {/* Cabeça e bico afiado */}
          <path d="M85,38 Q98,34 110,36 Q98,42 88,43 Z" />
          {/* Corpo e plumagem */}
          <path d="M60,35 Q72,32 86,39 Q80,48 65,46 Q50,47 42,42 Z" />
          {/* Asa Esquerda Superior (Grande envergadura) */}
          <path d="M62,36 Q45,8 15,2 Q30,22 52,36 Z" />
          <path d="M52,36 Q35,16 8,12 Q24,28 48,39 Z" />
          <path d="M48,39 Q32,25 5,22 Q20,35 44,42 Z" />
          {/* Asa Direita Superior */}
          <path d="M68,36 Q85,10 120,5 Q102,24 76,38 Z" />
          <path d="M74,38 Q92,18 126,14 Q106,30 80,41 Z" />
          {/* Cauda em leque de penas */}
          <path d="M45,43 Q30,60 18,72 Q35,62 50,48 Z" />
          <path d="M48,44 Q35,65 24,76 Q40,64 52,48 Z" />
        </svg>
      </motion.div>

      {/* 2. A Pena de Corvo Negra em Queda com Balanço Senoidal Natural */}
      <AnimatePresence>
        <motion.div
          key="falling-feather"
          initial={{ y: -80, x: '50vw', rotate: -35, opacity: 0 }}
          animate={
            hasLanded
              ? {
                  y: '18vh',
                  x: '50vw',
                  rotate: [12, -8, 12],
                  opacity: 0.95,
                  scale: 1,
                }
              : {
                  y: ['-5vh', '8vh', '14vh', '18vh'],
                  x: ['48vw', '54vw', '46vw', '50vw'],
                  rotate: [-35, 30, -20, 10],
                  opacity: [0, 1, 1, 0.95],
                  scale: [0.9, 1.1, 1, 1],
                }
          }
          transition={
            hasLanded
              ? { rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
              : { duration: 4.8, ease: 'easeInOut', times: [0, 0.35, 0.7, 1] }
          }
          onAnimationComplete={() => {
            if (!hasLanded) {
              setHasLanded(true);
              onFeatherLanded?.();
            }
          }}
          className="absolute top-0 left-0 -translate-x-1/2 cursor-pointer pointer-events-auto group"
        >
          {/* SVG Hiperdetalhado da Pena de Corvo Negra com Brilho Dourado */}
          <div className="relative w-12 h-32 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)]">
            <svg viewBox="0 0 50 120" className="w-full h-full">
              {/* Raque central da pena em folha de ouro antigo */}
              <path
                d="M25,5 Q26,60 25,115"
                stroke="#E5C384"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 3px rgba(229,195,132,0.8))' }}
              />

              {/* Barba esquerda da pena (Preto Ônix com reflexos esmeralda/azul de TVD) */}
              <path
                d="M25,10 Q6,35 8,80 Q14,100 25,110 Q20,85 19,45 Z"
                fill="url(#ravenLeft)"
              />
              {/* Barba direita da pena */}
              <path
                d="M25,10 Q44,35 42,80 Q36,100 25,110 Q30,85 31,45 Z"
                fill="url(#ravenRight)"
              />

              {/* Detalhes de nervuras das barbas */}
              <g stroke="#C9A86A" strokeWidth="0.6" opacity="0.4">
                <line x1="25" y1="25" x2="14" y2="35" />
                <line x1="25" y1="40" x2="12" y2="52" />
                <line x1="25" y1="58" x2="15" y2="70" />
                <line x1="25" y1="76" x2="18" y2="88" />
                
                <line x1="25" y1="25" x2="36" y2="35" />
                <line x1="25" y1="40" x2="38" y2="52" />
                <line x1="25" y1="58" x2="35" y2="70" />
                <line x1="25" y1="76" x2="32" y2="88" />
              </g>

              <defs>
                <linearGradient id="ravenLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E1926" />
                  <stop offset="45%" stopColor="#0B0910" />
                  <stop offset="100%" stopColor="#030204" />
                </linearGradient>
                <linearGradient id="ravenRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2D2438" />
                  <stop offset="55%" stopColor="#120F17" />
                  <stop offset="100%" stopColor="#050406" />
                </linearGradient>
              </defs>
            </svg>

            {/* Aura espectral suave ao redor da pena após o pouso */}
            {hasLanded && (
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full blur-sm bg-gradient-to-b from-[#C9A86A]/20 via-transparent to-[#7A0C1E]/20 pointer-events-none"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
