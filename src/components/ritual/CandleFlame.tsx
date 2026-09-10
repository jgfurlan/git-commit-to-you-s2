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

  return (
    <div 
      className="relative flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onIgnite}
    >
      {/* Halo de luz quente projetado no fundo */}
      {isLit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.35, 0.5, 0.4, 0.55, 0.35],
            scale: [1, 1.05, 0.98, 1.03, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(229,195,132,0.25) 0%, rgba(122,12,30,0.1) 45%, rgba(8,7,10,0) 70%)',
          }}
        />
      )}

      {/* Chama viva com animação orgânica */}
      <div className={`relative ${sizeClasses} flex items-end justify-center`}>
        {isLit ? (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full relative"
          >
            {/* Núcleo azul/branco da base da chama */}
            <div 
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full blur-[0.5px]"
              style={{ background: 'linear-gradient(to top, #6585A8, #FAF6EE)' }}
            />
            {/* Corpo dourado da chama */}
            <motion.div
              animate={{
                scaleY: [1, 1.08, 0.95, 1.04, 1],
                scaleX: [1, 0.96, 1.03, 0.97, 1],
                rotate: [-1, 1.5, -0.5, 1, -1],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full origin-bottom"
              style={{
                borderRadius: '50% 50% 35% 35% / 65% 65% 35% 35%',
                background: 'linear-gradient(to top, #C9A86A 0%, #E5C384 40%, #FAF6EE 90%)',
                boxShadow: '0 0 20px #E5C384, 0 0 35px rgba(201, 168, 106, 0.5)',
              }}
            />
          </motion.div>
        ) : (
          /* Pavio apagado com pequena fumaça */
          <div className="w-1 h-4 bg-stone-700 rounded-t-sm" />
        )}
      </div>

      {/* Pavio da vela */}
      <div className="w-1 h-3 bg-stone-800 -mt-1" />
      {/* Corpo da vela em cera de castiçal */}
      <div className="w-8 h-12 rounded-t-sm bg-gradient-to-b from-[#E9E1D2] to-[#B0A796] shadow-md border-t border-amber-100/20" />
    </div>
  );
}
