'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface VervainLocketProps {
  onOpened?: () => void;
  inscription?: string;
  partnerName?: string;
}

export function VervainLocket({ 
  onOpened, 
  inscription, 
  partnerName = 'Minha Amada' 
}: VervainLocketProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpened?.();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 select-none">
      {/* Relicário com perspectiva 3D */}
      <div 
        onClick={handleToggle}
        className="relative w-52 h-64 cursor-pointer perspective-[1000px] flex items-center justify-center"
      >
        {/* Corrente prateada vitoriana pendendo do topo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-gradient-to-b from-stone-500 via-stone-400 to-amber-200/40 rounded-full opacity-70 shadow-sm" />

        {/* Base Interior do Medalhão (Aberto) */}
        <div 
          className="absolute inset-0 rounded-[50%_50%_45%_45%] border-2 border-[#C9A86A]/60 bg-gradient-to-b from-[#181420] via-[#120F17] to-[#08070A] shadow-[0_15px_35px_rgba(0,0,0,0.8)] p-4 flex flex-col items-center justify-center text-center overflow-hidden"
        >
          {/* Efeito de veludo carmesim forrando o interior */}
          <div className="absolute inset-2 rounded-[50%_50%_45%_45%] bg-[#7A0C1E]/20 border border-[#C9A86A]/30" />
          
          <div className="relative z-10 flex flex-col items-center px-2">
            <Heart className="w-8 h-8 text-[#C9A86A] fill-[#7A0C1E] mb-2 animate-pulse" />
            <p className="font-cinzel text-xs uppercase tracking-widest text-[#E5C384] mb-1">
              {partnerName}
            </p>
            <p className="font-garamond italic text-[11px] leading-tight text-[#FAF6EE] text-center px-1 opacity-90">
              {inscription || "Nem a compulsão do mais antigo vampiro alteraria o que sinto por você."}
            </p>
            <div className="mt-2 text-[9px] font-cinzel text-[#C9A86A]/70 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C9A86A]" /> Verbena Consagrada
            </div>
          </div>
        </div>

        {/* Tampa do Medalhão (Gira 3D ao abrir) */}
        <motion.div
          animate={{
            rotateY: isOpen ? -135 : 0,
            transformOrigin: 'left center',
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 rounded-[50%_50%_45%_45%] border-2 border-[#C9A86A] bg-gradient-to-br from-[#DCD7D0] via-[#8C8680] to-[#403B38] shadow-[0_20px_40px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center z-20 backface-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Detalhes de filigrana vitoriana prateada */}
          <div className="absolute inset-3 rounded-[50%_50%_45%_45%] border border-amber-100/40 opacity-80 flex items-center justify-center">
            {/* Rubi central em relevo */}
            <div className="relative w-12 h-16 rounded-full bg-gradient-to-br from-[#A1122B] via-[#7A0C1E] to-[#42050E] border-2 border-[#E5C384] shadow-[0_0_15px_rgba(161,18,43,0.7)] flex items-center justify-center">
              <div className="w-3 h-5 bg-white/40 rounded-full blur-[1px] -translate-y-2 -translate-x-1" />
            </div>
          </div>

          {/* Fecho prateado sutil */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-5 bg-[#C9A86A] rounded-r-md border border-stone-800" />
        </motion.div>
      </div>

      <AnimatePresence>
        {!isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 font-cinzel text-xs tracking-wider text-[#C9A86A] animate-pulse"
          >
            Toque para abrir o medalhão
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
