'use client';

import React, { useState, useEffect } from 'react';
import { RitualOrchestrator } from '@/components/ritual/RitualOrchestrator';
import { SanctuaryHome } from '@/components/sanctuary/SanctuaryHome';

const STORAGE_KEY = 'covenant_pact_v1';

export default function Home() {
  const [isSealed, setIsSealed] = useState<boolean | null>(null);

  useEffect(() => {
    // Carrega o estado do pacto no client-side
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setIsSealed(Boolean(parsed.isSealed));
      } catch {
        setIsSealed(false);
      }
    } else {
      setIsSealed(false);
    }
  }, []);

  const handlePactCompleted = () => {
    const pactData = {
      isSealed: true,
      sealedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pactData));
    setIsSealed(true);
  };

  const handleResetRitual = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsSealed(false);
  };

  // Enquanto carrega o localStorage, renderiza fundo escuro suave
  if (isSealed === null) {
    return <div className="min-h-screen w-full bg-[#08070A]" />;
  }

  // Se o pacto ainda não foi selado, exibe o Ritual do Pedido de Namoro
  if (!isSealed) {
    return (
      <RitualOrchestrator
        partnerName="Minha Eterna Amada"
        creatorName="jgfurlan"
        firstMetDate="18 de Maio, 2024"
        proposalDate="10 de Setembro, 2026"
        onPactCompleted={handlePactCompleted}
      />
    );
  }

  // Se o pacto já foi consagrado, exibe o Santuário Principal do Grimório
  return (
    <SanctuaryHome
      partnerName="Minha Eterna Amada"
      creatorName="jgfurlan"
      daysTogether={846}
      onResetRitual={handleResetRitual}
    />
  );
}
