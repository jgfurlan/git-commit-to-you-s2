'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield } from 'lucide-react';

interface VervainLocketProps {
  onOpened?: () => void;
  inscription?: string;
  partnerName?: string;
}

export function VervainLocket({ 
  onOpened, 
  inscription, 
  partnerName = 'Minha Eterna Amada' 
}: VervainLocketProps) {
  const [isOpen, setIsOpen] = useState(false);

  const playLocketSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Som metálico sutil de engrenagem/fecho prateado de joia
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // ignore
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      if (navigator.vibrate) {
        navigator.vibrate([20, 60, 20]);
      }
      playLocketSound();
      setIsOpen(true);
      onOpened?.();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 select-none">
      {/* Relicário Fiel da Série de TV (The Vampire Diaries CW Screen Replica) */}
      <div 
        onClick={handleToggle}
        className="relative w-64 h-72 cursor-pointer flex items-center justify-center"
      >
        {/* Corrente de Elos Prateados Antigos de Mystic Falls */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <div className="w-1 h-20 bg-gradient-to-b from-stone-600 via-stone-400 to-stone-300 opacity-80 shadow-md" />
          {/* Elo superior conector triangular trabalhado */}
          <div className="w-4 h-5 border-2 border-stone-400 rounded-t-full bg-stone-800 -mt-1 shadow-sm" />
        </div>

        {/* 1. Base Interior do Medalhão (Aberto) */}
        <div 
          className="absolute w-52 h-52 rounded-full border-4 border-stone-500 bg-gradient-to-br from-[#120F17] via-[#0D0A12] to-[#040305] shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-4 flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9), 0 0 20px rgba(43,59,78,0.3)',
          }}
        >
          {/* Textura de veludo preto/carmesim no fundo da cavidade */}
          <div className="absolute inset-2 rounded-full border border-stone-600/50 bg-[#08070A]/90" />

          {/* Folhas de Verbena Seca Reais no interior (Canônico de TVD) */}
          <div className="absolute inset-4 rounded-full opacity-35 pointer-events-none overflow-hidden">
            <div className="w-full h-full bg-[radial-gradient(#3D5A40_1px,transparent_1px)] [background-size:8px_8px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-3">
            {/* Ícone de proteção de verbena */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <Shield className="w-4 h-4 text-[#C9A86A]" />
              <span className="font-cinzel text-[9px] uppercase tracking-widest text-[#E5C384]">
                Verbena de Mystic Falls
              </span>
            </div>

            <p className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#FAF6EE] mb-1">
              {partnerName}
            </p>

            <p className="font-garamond italic text-[11px] leading-relaxed text-[#FAF6EE]/90 text-center px-1">
              {inscription || "Nem a compulsão do mais antigo vampiro alteraria o que sinto por você. O que sinto por ti é puro, livre e eterno."}
            </p>

            <div className="mt-2 flex items-center gap-1 text-[8px] font-cinzel text-[#C9A86A]/70 uppercase tracking-widest">
              <Sparkles className="w-2.5 h-2.5 text-[#E5C384]" /> Amuleto de Proteção de Elena
            </div>
          </div>
        </div>

        {/* 2. Tampa Frontal Articulada (Réplica Idêntica ao Medalhão da Série) */}
        <motion.div
          animate={{
            rotateY: isOpen ? -135 : 0,
          }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-52 h-52 rounded-full border-4 border-stone-400 bg-gradient-to-br from-[#E2DDD6] via-[#9B958C] to-[#4A453F] shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-center z-20 backface-hidden"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
        >
          {/* Borda externa com beaded rim esculpido (microesferas prateadas) */}
          <div className="absolute inset-1 rounded-full border-2 border-dashed border-stone-300/70" />

          {/* Filigrana Rendada Geométrica Vitoriana (Modelo Exato de TVD) */}
          <div className="absolute inset-3 rounded-full border border-stone-700/60 flex items-center justify-center">
            {/* 4 Pétalas Góticas que cercam a pedra central */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-stone-700 stroke-[1.2]">
              {/* Círculo guia */}
              <circle cx="50" cy="50" r="32" stroke="#2B2724" strokeWidth="1" />
              {/* Arabescos florais e laços */}
              <path d="M50,18 C40,30 40,40 50,50 C60,40 60,30 50,18 Z" fill="#6E6862" opacity="0.6" />
              <path d="M50,82 C40,70 40,60 50,50 C60,60 60,70 50,82 Z" fill="#6E6862" opacity="0.6" />
              <path d="M18,50 C30,40 40,40 50,50 C40,60 30,60 18,50 Z" fill="#6E6862" opacity="0.6" />
              <path d="M82,50 C70,40 60,40 50,50 C60,60 70,60 82,50 Z" fill="#6E6862" opacity="0.6" />
              {/* Diagonais de filigrana */}
              <circle cx="28" cy="28" r="3" fill="#4A453F" />
              <circle cx="72" cy="28" r="3" fill="#4A453F" />
              <circle cx="28" cy="72" r="3" fill="#4A453F" />
              <circle cx="72" cy="72" r="3" fill="#4A453F" />
            </svg>
          </div>

          {/* 4 Pequenas Granadas nos Pontos Cardeais (Norte, Sul, Leste, Oeste) */}
          <div className="absolute top-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#9E1129] to-[#42050E] border border-stone-400 shadow-sm" />
          <div className="absolute bottom-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#9E1129] to-[#42050E] border border-stone-400 shadow-sm" />
          <div className="absolute left-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#9E1129] to-[#42050E] border border-stone-400 shadow-sm" />
          <div className="absolute right-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#9E1129] to-[#42050E] border border-stone-400 shadow-sm" />

          {/* Pedra Central: Granada Vermelho Sangue (Elena's Red Gemstone) */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#B31532] via-[#7A0C1E] to-[#38040B] border-2 border-stone-300 shadow-[0_0_18px_rgba(122,12,30,0.8)] flex items-center justify-center">
            {/* Lapidação facetada em relevo da pedra */}
            <div className="w-4 h-4 bg-white/35 rounded-full blur-[0.8px] -translate-y-1.5 -translate-x-1" />
            <div className="absolute inset-1 rounded-full border border-stone-900/40" />
          </div>

          {/* Dobradiça lateral e fecho mecânico de pressão da série */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-7 bg-stone-600 rounded-l-sm border-l border-stone-300" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-5 bg-stone-500 rounded-r-md border border-stone-800" />
        </motion.div>
      </div>

      <AnimatePresence>
        {!isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 font-cinzel text-xs tracking-wider text-[#E5C384] animate-pulse flex items-center gap-1.5"
          >
            <span>Toque no fecho para abrir o Relicário</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
