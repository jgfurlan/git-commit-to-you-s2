'use client';

import React from 'react';

export function VignetteOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[4] select-none"
      style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(4, 3, 5, 0.6) 80%, rgba(2, 1, 3, 0.92) 100%)',
        boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.85)',
      }}
    />
  );
}
