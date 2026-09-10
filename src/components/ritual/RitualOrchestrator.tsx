'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandleFlame } from './CandleFlame';
import { VervainLocket } from './VervainLocket';
import { GeminiAscendant } from './GeminiAscendant';
import { SalvatoreParchment } from './SalvatoreParchment';
import { DaylightWaxSeal } from './DaylightWaxSeal';
import { FogCanvas } from '../effects/FogCanvas';
import { RavenHarbinger } from '../effects/RavenHarbinger';
import { VignetteOverlay } from '../effects/VignetteOverlay';
import { RITUAL_TEXT } from '@/content/ritual-text';
import { RitualAct } from '@/types/ritual';
import { Moon, Sparkles, BookOpen, Feather } from 'lucide-react';

interface RitualOrchestratorProps {
  partnerName?: string;
  creatorName?: string;
  vowText?: string;
  firstMetDate?: string;
  proposalDate?: string;
  onPactCompleted?: () => void;
}

export function RitualOrchestrator({
  partnerName = 'Minha Amada',
  creatorName = 'Seu Eterno Namorado',
  vowText,
  firstMetDate = '18 de Maio, 2024',
  proposalDate = 'Hoje',
  onPactCompleted,
}: RitualOrchestratorProps) {
  const [currentAct, setCurrentAct] = useState<RitualAct>('ACT_1_FOG_AND_RAVEN');
  const [isCandleLit, setIsCandleLit] = useState(false);
  const [ravenTriggerKey, setRavenTriggerKey] = useState(1);

  const retriggerRaven = () => {
    setRavenTriggerKey((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 bg-[#040305] text-[#FAF6EE] overflow-hidden select-none">
      {/* 1. Efeito de Névoa Volumétrica Animada (Visível no Desktop e Mobile) */}
      <FogCanvas />

      {/* 2. Vinheta Sombria de Cripta */}
      <VignetteOverlay />

      {/* 3. Corvo de Damon & Pena Negra (Reinvocável) */}
      <RavenHarbinger key={ravenTriggerKey} />

      {/* Cabeçalho do Santuário */}
      <header className="relative z-20 w-full max-w-lg flex items-center justify-between border-b border-[#C9A86A]/20 pb-4 pt-2">
        <div className="flex items-center gap-2.5">
          <Moon className="w-5 h-5 text-[#C9A86A] filter drop-shadow-[0_0_8px_#C9A86A]" />
          <div>
            <h1 className="font-cinzel text-xs tracking-widest text-[#E5C384] uppercase">
              {RITUAL_TEXT.act1.title}
            </h1>
            <p className="font-garamond text-[11px] text-[#FAF6EE]/50 italic">
              {RITUAL_TEXT.act1.subtitle}
            </p>
          </div>
        </div>

        {/* Botão de invocar o corvo + Indicador de progresso */}
        <div className="flex items-center gap-3">
          <button
            onClick={retriggerRaven}
            title="Invocar o Vôo do Corvo & Queda da Pena"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#C9A86A]/40 bg-[#120F17]/90 text-[10px] font-cinzel text-[#E5C384] hover:border-[#E5C384] hover:scale-105 transition-all cursor-pointer shadow-md"
          >
            <Feather className="w-3 h-3 text-[#C9A86A]" />
            <span>Corvo</span>
          </button>

          <div className="flex items-center gap-1.5">
            {['ACT_1_FOG_AND_RAVEN', 'ACT_2_VERVAIN_LOCKET', 'ACT_3_GEMINI_ASCENDANT', 'ACT_4_SALVATORE_LETTER', 'ACT_5_DAYLIGHT_SEAL'].map((act) => (
              <div
                key={act}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  currentAct === act 
                    ? 'bg-[#E5C384] scale-125 shadow-[0_0_10px_#C9A86A]' 
                    : 'bg-[#2B3B4E]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Palco Principal do Ritual com AnimatePresence */}
      <main className="relative z-20 w-full max-w-lg flex-1 flex flex-col items-center justify-center my-6">
        <AnimatePresence mode="wait">
          {/* ATO 1: A Névoa & A Vela */}
          {currentAct === 'ACT_1_FOG_AND_RAVEN' && (
            <motion.div
              key="act-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center px-4"
            >
              {/* Pena de corvo repousando acima da vela */}
              <div className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#120F17]/90 border border-[#C9A86A]/40 text-xs font-cinzel text-[#C9A86A] shadow-md">
                <Feather className="w-4 h-4 text-[#E5C384] animate-pulse" />
                <span>A Pena do Corvo em Vigília</span>
              </div>

              <CandleFlame 
                isLit={isCandleLit} 
                onIgnite={() => setIsCandleLit(true)}
                size="lg" 
              />

              <div className="mt-6 max-w-sm">
                <p className="font-garamond italic text-base sm:text-lg text-[#FAF6EE] leading-relaxed mb-6 drop-shadow-md">
                  &ldquo;{RITUAL_TEXT.act1.guardianIntro}&rdquo;
                </p>

                {isCandleLit ? (
                  <button
                    onClick={() => setCurrentAct('ACT_2_VERVAIN_LOCKET')}
                    className="py-2.5 px-6 rounded-full border border-[#C9A86A] bg-[#120F17]/90 hover:bg-[#181420] text-[#E5C384] font-cinzel text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(201,168,106,0.3)] flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <span>Despertar o Relicário</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div 
                    onClick={() => setIsCandleLit(true)}
                    className="p-3 rounded-lg border border-[#C9A86A]/40 bg-[#120F17]/75 cursor-pointer group hover:border-[#E5C384] transition-all shadow-lg"
                  >
                    <p className="font-cinzel text-xs text-[#E5C384] group-hover:scale-105 transition-all tracking-wider">
                      {RITUAL_TEXT.act1.candleHint}
                    </p>
                    <p className="font-garamond italic text-[11px] text-[#FAF6EE]/60 mt-0.5">
                      A chama acenderá na névoa de Mystic Falls
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ATO 2: O Relicário de Verbena */}
          {currentAct === 'ACT_2_VERVAIN_LOCKET' && (
            <motion.div
              key="act-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-2">
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#E5C384]">
                  {RITUAL_TEXT.act2.title}
                </span>
                <p className="font-garamond text-xs text-[#FAF6EE]/60 italic">
                  {RITUAL_TEXT.act2.subtitle}
                </p>
              </div>

              <VervainLocket 
                partnerName={partnerName}
                inscription={RITUAL_TEXT.act2.locketInscription}
                onOpened={() => {}}
              />

              <button
                onClick={() => setCurrentAct('ACT_3_GEMINI_ASCENDANT')}
                className="mt-6 py-2 px-6 rounded-full border border-[#C9A86A]/60 bg-[#120F17]/90 hover:border-[#E5C384] text-[#FAF6EE] font-cinzel text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Consultar o Ascendente dos Gêmeos &rarr;
              </button>
            </motion.div>
          )}

          {/* ATO 3: O Ascendente dos Gêmeos */}
          {currentAct === 'ACT_3_GEMINI_ASCENDANT' && (
            <motion.div
              key="act-3"
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 5 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-2">
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#E5C384]">
                  {RITUAL_TEXT.act3.title}
                </span>
                <p className="font-garamond text-xs text-[#FAF6EE]/60 italic">
                  {RITUAL_TEXT.act3.subtitle}
                </p>
              </div>

              <GeminiAscendant 
                firstMetDate={firstMetDate}
                proposalDate={proposalDate}
              />

              <button
                onClick={() => setCurrentAct('ACT_4_SALVATORE_LETTER')}
                className="mt-6 py-2 px-6 rounded-full border border-[#C9A86A]/60 bg-[#120F17]/90 hover:border-[#E5C384] text-[#FAF6EE] font-cinzel text-[11px] uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Abrir o Diário &rarr;</span>
              </button>
            </motion.div>
          )}

          {/* ATO 4: O Diário dos Salvatore */}
          {currentAct === 'ACT_4_SALVATORE_LETTER' && (
            <motion.div
              key="act-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <SalvatoreParchment
                partnerName={partnerName}
                creatorName={creatorName}
                vowText={vowText}
                onProceed={() => setCurrentAct('ACT_5_DAYLIGHT_SEAL')}
              />
            </motion.div>
          )}

          {/* ATO 5: O Selo da Luz do Dia */}
          {currentAct === 'ACT_5_DAYLIGHT_SEAL' && (
            <motion.div
              key="act-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <DaylightWaxSeal
                onConsagrated={() => {
                  setTimeout(() => {
                    setCurrentAct('RITUAL_CONSECRATED');
                  }, 1200);
                }}
                partnerName={partnerName}
                creatorName={creatorName}
              />
            </motion.div>
          )}

          {/* CLÍMAX: Ritual Consagrado */}
          {currentAct === 'RITUAL_CONSECRATED' && (
            <motion.div
              key="act-consecrated"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center text-center p-6 bg-[#120F17]/95 border-2 border-[#E5C384] rounded-xl shadow-[0_0_60px_rgba(201,168,106,0.45)] max-w-sm z-30"
            >
              <Sparkles className="w-12 h-12 text-[#E5C384] mb-4 animate-bounce" />
              <h2 className="font-cinzel text-lg font-bold text-[#E5C384] uppercase tracking-widest mb-2">
                {RITUAL_TEXT.act5.consecratedTitle}
              </h2>
              <p className="font-garamond italic text-sm text-[#FAF6EE] mb-4">
                {RITUAL_TEXT.act5.consecratedSubtitle}
              </p>

              <div className="w-full p-4 rounded-lg bg-[#08070A] border border-[#2B3B4E] mb-6">
                <span className="font-cinzel text-xs text-[#E5C384] block mb-1">
                  {RITUAL_TEXT.act5.daylightRingTitle}
                </span>
                <p className="font-garamond text-xs text-[#FAF6EE]/80 italic">
                  {RITUAL_TEXT.act5.daylightRingMessage}
                </p>
              </div>

              <button
                onClick={onPactCompleted}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#7A0C1E] via-[#A1122B] to-[#7A0C1E] text-[#FAF6EE] font-cinzel text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                {RITUAL_TEXT.act5.enterSanctuaryButton}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Rodapé Gótico */}
      <footer className="relative z-20 text-center py-2">
        <p className="font-cinzel text-[10px] tracking-widest text-[#C9A86A]/40 uppercase">
          A Guardiã do Nosso Amor • Mystic Falls
        </p>
      </footer>
    </div>
  );
}
