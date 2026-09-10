'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useHoldToSeal } from '@/hooks/useHoldToSeal';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface DaylightWaxSealProps {
  onConsagrated: () => void;
  partnerName?: string;
  creatorName?: string;
}

export function DaylightWaxSeal({ onConsagrated }: DaylightWaxSealProps) {
  const triggerConfetti = () => {
    // Efeito de pétalas carmesim e faíscas douradas
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7A0C1E', '#9E1129', '#C9A86A', '#E5C384', '#2B3B4E'],
    });
  };

  const { progress, isHolding, isSealed, startHolding, cancelHolding } = useHoldToSeal({
    holdDurationMs: 3000,
    onComplete: () => {
      triggerConfetti();
      onConsagrated();
    },
  });

  const circumference = 2 * Math.PI * 54; // raio 54
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 select-none">
      {/* Pergunta Solene */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm mb-6"
      >
        <span className="font-cinzel text-xs text-[#E5C384] uppercase tracking-widest block mb-2">
          O Pacto da Eternidade
        </span>
        <h2 className="font-garamond italic text-lg sm:text-xl text-[#FAF6EE] leading-relaxed">
          &ldquo;Você aceita selar este pacto e ser minha namorada por esta vida e por toda a eternidade?&rdquo;
        </h2>
      </motion.div>

      {/* Botão do Selo de Cera 3D */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* SVG do Anel de Progresso Circular */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          {/* Trilha do anel */}
          <circle
            cx="80"
            cy="80"
            r="54"
            className="stroke-[#181420]"
            strokeWidth="5"
            fill="transparent"
          />
          {/* Preenchimento de cera quente dourada */}
          <circle
            cx="80"
            cy="80"
            r="54"
            className="stroke-[#E5C384] transition-all duration-75"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: isHolding ? 'drop-shadow(0 0 8px #C9A86A)' : 'none',
            }}
          />
        </svg>

        {/* O Selo de Cera em Relevo com Pedra de Lápis-Lazúli */}
        <motion.button
          type="button"
          onPointerDown={startHolding}
          onPointerUp={cancelHolding}
          onPointerLeave={cancelHolding}
          onContextMenu={(e) => e.preventDefault()}
          animate={{
            scale: isHolding ? 0.94 : isSealed ? 1.05 : 1,
            boxShadow: isHolding
              ? '0 0 35px rgba(229,195,132,0.8), inset 0 0 15px rgba(0,0,0,0.6)'
              : '0 15px 30px rgba(0,0,0,0.8), 0 0 15px rgba(122,12,30,0.5)',
          }}
          transition={{ duration: 0.15 }}
          className="relative w-28 h-28 rounded-full cursor-pointer flex items-center justify-center outline-none border-2 border-[#C9A86A]"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #A1122B 0%, #7A0C1E 50%, #42050E 100%)',
          }}
        >
          {/* Anel interno de cera gravada */}
          <div className="absolute inset-2 rounded-full border border-amber-200/30 flex items-center justify-center">
            {/* Pedra central de Lápis-Lazúli (Daylight Ring Amulet) */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D5470] via-[#2B3B4E] to-[#121B24] border border-[#E5C384] shadow-[0_0_10px_#3D5470] flex items-center justify-center">
              {isSealed ? (
                <ShieldCheck className="w-6 h-6 text-[#E5C384]" />
              ) : (
                <span className="font-cinzel-dec font-bold text-sm text-[#E5C384]">
                  S&K
                </span>
              )}
            </div>
          </div>
        </motion.button>
      </div>

      {/* Instrução Dinâmica */}
      <div className="mt-6 text-center">
        {isSealed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-[#E5C384] font-cinzel text-xs uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" /> Pacto Selado na Eternidade
          </motion.div>
        ) : (
          <div>
            <p className="font-cinzel text-xs tracking-wider text-[#C9A86A]">
              {isHolding ? 'Gravando o pacto nas estrelas...' : 'Pressione e segure por 3 segundos'}
            </p>
            <p className="font-garamond italic text-[11px] text-[#FAF6EE]/60 mt-1">
              {isHolding ? `${Math.round(progress * 100)}% consagrado` : 'O selo de cera carmesim responderá ao seu toque'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
