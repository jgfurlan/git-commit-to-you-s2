'use client';

import React from 'react';

export function VignetteOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 select-none"
      style={{
        background: 'radial-gradient(circle at 50% 45%, transparent 35%, rgba(4, 3, 5, 0.75) 75%, rgba(2, 1, 3, 0.96) 100%)',
        boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.95)',
      }}
    />
  );
}
