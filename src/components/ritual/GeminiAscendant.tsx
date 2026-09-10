'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Compass } from 'lucide-react';

interface GeminiAscendantProps {
  firstMetDate?: string;
  proposalDate?: string;
  onAligned?: () => void;
}

export function GeminiAscendant({
  firstMetDate = '18 de Maio, 2024',
  proposalDate = 'Hoje',
  onAligned,
}: GeminiAscendantProps) {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocked(true);
      onAligned?.();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onAligned]);

  return (
    <div className="flex flex-col items-center justify-center p-4 select-none">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Anel Externo de Latão Gravado */}
        <motion.div
          animate={{ rotate: isLocked ? 0 : 360 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-[#C9A86A]/70 flex items-center justify-center shadow-[0_0_25px_rgba(201,168,106,0.25)]"
        >
          {/* Glifos astronômicos no perímetro */}
          <div className="absolute top-1 text-[10px] font-cinzel text-[#E5C384]">XII</div>
          <div className="absolute bottom-1 text-[10px] font-cinzel text-[#E5C384]">VI</div>
          <div className="absolute left-1 text-[10px] font-cinzel text-[#E5C384]">IX</div>
          <div className="absolute right-1 text-[10px] font-cinzel text-[#E5C384]">III</div>
        </motion.div>

        {/* Anel Intermediário de Constelações (Gira ao contrário) */}
        <motion.div
          animate={{ rotate: isLocked ? 0 : -360 }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
          className="absolute inset-6 rounded-full border border-[#E5C384]/50 flex items-center justify-center"
        >
          <div className="w-full h-[1px] bg-[#C9A86A]/30 rotate-45" />
          <div className="w-full h-[1px] bg-[#C9A86A]/30 -rotate-45" />
        </motion.div>

        {/* Anel Central com Ponteiros de Engrenagem */}
        <motion.div
          animate={{ rotate: isLocked ? 0 : 720 }}
          transition={{ duration: 2.8, ease: 'easeInOut' }}
          className="absolute inset-12 rounded-full border-2 border-[#C9A86A] bg-[#120F17]/90 flex items-center justify-center shadow-inner"
        >
          <Compass className="w-10 h-10 text-[#C9A86A] animate-spin-slow" />
        </motion.div>

        {/* Centro de Lápis-Lazúli */}
        <div className="absolute w-6 h-6 rounded-full bg-[#2B3B4E] border border-[#E5C384] shadow-[0_0_12px_#3D5470]" />
      </div>

      {/* Exibição das Datas Travadas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isLocked ? 1 : 0.4, y: isLocked ? 0 : 5 }}
        transition={{ duration: 0.8 }}
        className="mt-6 flex flex-col items-center text-center max-w-xs"
      >
        <div className="flex items-center gap-2 text-xs font-cinzel text-[#E5C384] mb-1">
          <Calendar className="w-4 h-4 text-[#C9A86A]" />
          <span>Alinhamento Temporal</span>
        </div>
        <p className="font-garamond text-sm text-[#FAF6EE]">
          De <strong className="text-[#C9A86A] font-cinzel">{firstMetDate}</strong> até <strong className="text-[#E5C384] font-cinzel">{proposalDate}</strong>
        </p>
        <p className="font-garamond italic text-xs text-[#FAF6EE]/70 mt-1">
          O mecanismo astronômico travou para a eternidade.
        </p>
      </motion.div>
    </div>
  );
}
