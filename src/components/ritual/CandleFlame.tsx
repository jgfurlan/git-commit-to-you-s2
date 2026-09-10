'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CandleFlameProps {
  isLit?: boolean;
  onIgnite?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function CandleFlame({ isLit = true, onIgnite, size = 'md' }: CandleFlameProps) {
  const sizeClasses = {
    sm: 'w-6 h-10',
    md: 'w-10 h-16',
    lg: 'w-14 h-24',
  }[size];

  const handleIgnite = () => {
    if (navigator.vibrate) {
      navigator.vibrate([25, 40]);
    }
    onIgnite?.();
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group"
      onClick={handleIgnite}
    >
      {/* 1. Halo de luz ambiente que pulsa com a chama */}
      {isLit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.4, 0.65, 0.45, 0.7, 0.4],
            scale: [1, 1.08, 0.96, 1.05, 1],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(229,195,132,0.3) 0%, rgba(161,18,43,0.12) 40%, rgba(4,3,5,0) 70%)',
          }}
        />
      )}

      {/* 2. Micro-faíscas/brasas flutuando da chama */}
      {isLit && (
        <div className="absolute -top-12 w-16 h-16 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 25, x: 0, opacity: 0, scale: 0.5 }}
              animate={{
                y: [-5, -45],
                x: [(i - 2) * 6, (i - 2) * 12 + (Math.random() - 0.5) * 8],
                opacity: [0, 0.9, 0],
                scale: [0.5, 1, 0.2],
              }}
              transition={{
                duration: 2.2 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.45,
                ease: 'easeOut',
              }}
              className="absolute left-1/2 bottom-0 w-1.5 h-1.5 rounded-full bg-[#E5C384] shadow-[0_0_6px_#C9A86A]"
            />
          ))}
        </div>
      )}

      {/* 3. Chama viva com física orgânica */}
      <div className={`relative ${sizeClasses} flex items-end justify-center`}>
        {isLit ? (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            {/* Núcleo azul/branco puro de alta temperatura na base */}
            <div 
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-4 rounded-full blur-[0.6px] z-10"
              style={{ background: 'linear-gradient(to top, #7A9BBD, #FFFFFF)' }}
            />

            {/* Corpo dourado da chama com ondulação senoidal */}
            <motion.div
              animate={{
                scaleY: [1, 1.12, 0.94, 1.06, 1],
                scaleX: [1, 0.94, 1.04, 0.96, 1],
                rotate: [-1.5, 2, -1, 1.5, -1.5],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full origin-bottom"
              style={{
                borderRadius: '50% 50% 35% 35% / 65% 65% 35% 35%',
                background: 'linear-gradient(to top, #C9A86A 0%, #E5C384 45%, #FAF6EE 90%)',
                boxShadow: '0 0 25px #E5C384, 0 0 45px rgba(201, 168, 106, 0.6)',
              }}
            />
          </motion.div>
        ) : (
          /* Pavio apagado com pequena fumaça espectral */
          <div className="w-1.5 h-5 bg-stone-800 rounded-t-sm relative group-hover:bg-amber-600/80 transition-colors">
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2], y: [-2, -8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-3 left-0 w-1 h-3 bg-stone-500/40 rounded-full blur-[1px]"
            />
          </div>
        )}
      </div>

      {/* Pavio da vela */}
      <div className="w-1 h-3 bg-stone-900 -mt-1" />

      {/* Corpo da vela em cera de castiçal com relevo e gotas */}
      <div className="relative w-9 h-14 rounded-t-sm bg-gradient-to-b from-[#FAF6EE] via-[#E9E1D2] to-[#A89E8C] shadow-lg border-t border-amber-100/30 overflow-hidden">
        {/* Gotas de cera escorrendo */}
        <div className="absolute top-1 left-2 w-1.5 h-5 bg-[#FAF6EE] rounded-full opacity-70 shadow-sm" />
        <div className="absolute top-2 right-2 w-1 h-3.5 bg-[#FAF6EE] rounded-full opacity-60 shadow-sm" />
      </div>
    </div>
  );
}
