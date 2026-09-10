'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Heart } from 'lucide-react';

interface SalvatoreParchmentProps {
  partnerName?: string;
  creatorName?: string;
  vowText?: string;
  onProceed?: () => void;
}

export function SalvatoreParchment({
  partnerName = 'Minha Eterna Amada',
  creatorName = 'Seu Eterno Namorado',
  vowText,
  onProceed,
}: SalvatoreParchmentProps) {
  const defaultVow = `Passei tanto tempo na escuridão até você surgir. Você não iluminou apenas os meus dias; você me deu uma razão para querer que o tempo parasse.

Se eu tivesse que escolher entre a eternidade sozinho ou uma única existência ao seu lado, eu escolheria você em cada vida, em cada segundo, em cada batimento do meu coração.`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative max-w-md w-full mx-auto p-6 my-4 select-none"
    >
      {/* Moldura de couro escuro exterior */}
      <div className="absolute inset-0 rounded-lg bg-[#181420] border-2 border-[#C9A86A]/40 shadow-[0_25px_50px_rgba(0,0,0,0.9)]" />

      {/* Folha de pergaminho antigo interior */}
      <div 
        className="relative z-10 rounded-md p-6 sm:p-8 border border-[#C9A86A]/30 text-stone-900"
        style={{
          background: 'linear-gradient(135deg, #FAF6EE 0%, #E9E1D2 60%, #DFD6C3 100%)',
          boxShadow: 'inset 0 0 40px rgba(139, 115, 85, 0.35)',
        }}
      >
        {/* Cabeçalho do diário */}
        <div className="flex items-center justify-between border-b border-stone-400/40 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-[#7A0C1E]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-stone-800 font-bold">
              Diário dos Salvatore
            </span>
          </div>
          <span className="font-garamond italic text-xs text-stone-600">
            Meia-Noite
          </span>
        </div>

        {/* Destinatária */}
        <h3 className="font-cinzel text-sm sm:text-base font-semibold text-[#7A0C1E] mb-3">
          Para: {partnerName}
        </h3>

        {/* Corpo do Voto */}
        <div className="font-garamond text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-6 italic">
          {vowText || defaultVow}
        </div>

        {/* Assinatura em caligrafia dourada/tinteiro */}
        <div className="flex flex-col items-end border-t border-stone-400/30 pt-4">
          <span className="font-pinyon text-2xl sm:text-3xl text-[#7A0C1E]">
            {creatorName}
          </span>
          <span className="font-cinzel text-[10px] tracking-wider text-stone-500 uppercase mt-1">
            Inscrito sob a luz da lua
          </span>
        </div>

        {/* Botão de avanço para o selo */}
        {onProceed && (
          <button
            onClick={onProceed}
            className="w-full mt-6 py-2.5 px-4 rounded bg-[#7A0C1E] hover:bg-[#9E1129] transition-all text-[#FAF6EE] font-cinzel text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Prosseguir para o Selo</span>
            <Heart className="w-4 h-4 fill-current text-[#E5C384]" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
