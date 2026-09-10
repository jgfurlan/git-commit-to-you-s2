'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  BookOpen, 
  MessageSquare, 
  Lock, 
  Compass, 
  ShieldCheck, 
  Flame,
  Home as HomeIcon,
  Feather
} from 'lucide-react';

interface SanctuaryHomeProps {
  partnerName?: string;
  creatorName?: string;
  daysTogether?: number;
  onOpenLetter?: () => void;
  onResetRitual?: () => void;
}

export function SanctuaryHome({
  partnerName = 'Minha Amada',
  creatorName = 'jgfurlan',
  daysTogether = 846,
  onResetRitual,
}: SanctuaryHomeProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'grimoire' | 'guardian' | 'vault'>('home');
  const [isSealBroken, setIsSealBroken] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pb-20 bg-[#08070A] text-[#FAF6EE] overflow-x-hidden select-none">
      {/* Luz ambiente de vela bruxuleante */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-35"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(201,168,106,0.18) 0%, rgba(122,12,30,0.1) 40%, rgba(8,7,10,0) 75%)',
        }}
      />

      {/* Cabeçalho do Santuário */}
      <header className="relative z-10 w-full max-w-md flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#C9A86A]/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-[#C9A86A] bg-[#120F17] flex items-center justify-center shadow-[0_0_10px_rgba(201,168,106,0.3)]">
            <Flame className="w-4 h-4 text-[#E5C384] animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-cinzel tracking-widest text-[#E5C384]/70 uppercase block">
              Propriedade Salvatore • Mystic Falls
            </span>
            <h1 className="font-cinzel text-sm tracking-wider font-bold text-[#FAF6EE]">
              Santuário do Nosso Amor
            </h1>
          </div>
        </div>

        <button 
          onClick={onResetRitual}
          title="Reviver o Ritual do Pedido"
          className="w-8 h-8 rounded-full border border-[#C9A86A]/40 bg-[#120F17] flex items-center justify-center text-[#C9A86A] hover:border-[#E5C384] transition-all cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-current text-[#7A0C1E]" />
        </button>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative z-10 w-full max-w-md px-6 py-4 flex flex-col items-center">
        {/* A Orbe Oracular da Guardiã */}
        <div className="flex flex-col items-center text-center my-4">
          <span className="font-cinzel text-[10px] tracking-widest text-[#C9A86A] uppercase mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#E5C384]" /> Vigília do Laço Eterno
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#FAF6EE] mb-3">
            A Guardiã
          </h2>

          {/* Orbe Mística */}
          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            {/* Anéis de energia astral */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-[#C9A86A]/40"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-[#7A0C1E]/60"
            />

            {/* Núcleo da Orbe */}
            <div 
              className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#181420] via-[#2B3B4E] to-[#120F17] border-2 border-[#E5C384] shadow-[0_0_30px_rgba(201,168,106,0.35)] flex flex-col items-center justify-center p-2 text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#7A0C1E]/80 border border-[#E5C384] flex items-center justify-center mb-1">
                <Compass className="w-4 h-4 text-[#E5C384] animate-spin-slow" />
              </div>
              <span className="font-cinzel text-[9px] font-bold text-[#E5C384] tracking-wider uppercase">
                100% em Harmonia
              </span>
              <span className="font-cinzel text-[8px] text-[#FAF6EE]/60 tracking-widest uppercase mt-0.5">
                Em Vigília
              </span>
            </div>
          </div>

          <p className="font-garamond italic text-xs text-[#FAF6EE]/70 max-w-xs mt-2">
            &ldquo;Sussurre à Guardiã para desvelar uma memória guardada deste amor.&rdquo;
          </p>
        </div>

        {/* Card do Pergaminho da Memória do Dia */}
        <div 
          className="relative w-full rounded-lg p-5 my-3 border border-[#C9A86A]/40 text-stone-900 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          style={{
            background: 'linear-gradient(135deg, #FAF6EE 0%, #E9E1D2 70%, #DFD6C3 100%)',
          }}
        >
          <div className="flex items-center justify-between border-b border-stone-400/40 pb-2 mb-3">
            <span className="font-cinzel text-[10px] font-bold tracking-widest text-[#7A0C1E] uppercase">
              Pacto Eterno • Cripta de Mystic Falls
            </span>
            <span className="font-cinzel text-[10px] text-stone-600">
              Noite Eterna
            </span>
          </div>

          <p className="font-garamond italic text-sm text-stone-800 leading-relaxed mb-4">
            {isSealBroken 
              ? `“Desde que nossas almas se entrelaçaram, a eternidade passou a ter nome. O que construímos juntos transcende qualquer tempo ou distância. Eu te amo hoje mais do que ontem, e menos do que amanhã.”`
              : `“Desde que nossas almas se entrelaçaram, descobri que a eternidade só tem sentido ao seu lado. Nos teus olhos encontrei a luz que dissipa qualquer escuridão.”`}
          </p>

          <div className="flex items-center justify-between border-t border-stone-400/30 pt-2 text-[10px] font-cinzel text-stone-600">
            <span>Inscrito por {creatorName} para {partnerName}</span>
            <span>Tomo VII</span>
          </div>

          {/* Botão de romper selo para ler continuação */}
          <button
            onClick={() => setIsSealBroken(!isSealBroken)}
            className="w-full mt-4 py-2 px-4 rounded bg-[#7A0C1E] hover:bg-[#9E1129] transition-all text-[#FAF6EE] font-cinzel text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5C384]" />
            <span>{isSealBroken ? 'Ocultar Revelação' : 'Desvelar Memória Completa'}</span>
          </button>
        </div>

        {/* Três Métricas Reais do Relacionamento */}
        <div className="w-full grid grid-cols-3 gap-2.5 my-3">
          <div className="p-3 rounded-lg bg-[#120F17] border border-[#C9A86A]/30 text-center flex flex-col items-center">
            <span className="font-cinzel text-lg sm:text-xl font-bold text-[#E5C384]">
              {daysTogether}
            </span>
            <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#FAF6EE]/60 mt-0.5">
              Dias Juntos
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#120F17] border border-[#C9A86A]/30 text-center flex flex-col items-center">
            <span className="font-cinzel text-lg sm:text-xl font-bold text-[#E5C384]">
              184
            </span>
            <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#FAF6EE]/60 mt-0.5">
              Memórias
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#120F17] border border-[#C9A86A]/30 text-center flex flex-col items-center">
            <span className="font-cinzel text-lg sm:text-xl font-bold text-[#E5C384]">
              12
            </span>
            <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#FAF6EE]/60 mt-0.5">
              Cartas Seladas
            </span>
          </div>
        </div>

        {/* Relíquias Eternas Desbloqueadas */}
        <div className="w-full mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#E5C384]">
              Relíquias Eternas
            </span>
            <span className="font-cinzel text-[10px] text-[#C9A86A]/60 uppercase">
              Desbloqueadas
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-lg bg-[#120F17] border border-[#2B3B4E] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#7A0C1E]/40 border border-[#E5C384] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#E5C384] fill-[#7A0C1E]" />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-cinzel text-xs font-semibold text-[#FAF6EE] truncate">
                  Relicário de Elena
                </h4>
                <p className="font-garamond text-[10px] text-[#FAF6EE]/60 italic truncate">
                  Proteção de Verbena
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#120F17] border border-[#2B3B4E] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#2B3B4E] border border-[#E5C384] flex items-center justify-center shrink-0 shadow-[0_0_8px_#3D5470]">
                <ShieldCheck className="w-4 h-4 text-[#E5C384]" />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-cinzel text-xs font-semibold text-[#FAF6EE] truncate">
                  Daylight Ring
                </h4>
                <p className="font-garamond text-[10px] text-[#FAF6EE]/60 italic truncate">
                  Lápis-lazúli Eterno
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Barra de Navegação Inferior Gótica */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#08070A]/95 border-t border-[#C9A86A]/20 backdrop-blur-md py-2.5 px-6 flex items-center justify-around max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-[#E5C384] scale-105' : 'text-[#FAF6EE]/50 hover:text-[#C9A86A]'
          }`}
        >
          <HomeIcon className="w-4 h-4" />
          <span className="font-cinzel text-[9px] uppercase tracking-widest">Início</span>
        </button>

        <button
          onClick={() => setActiveTab('grimoire')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'grimoire' ? 'text-[#E5C384] scale-105' : 'text-[#FAF6EE]/50 hover:text-[#C9A86A]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="font-cinzel text-[9px] uppercase tracking-widest">Grimório</span>
        </button>

        <button
          onClick={() => setActiveTab('guardian')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'guardian' ? 'text-[#E5C384] scale-105' : 'text-[#FAF6EE]/50 hover:text-[#C9A86A]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="font-cinzel text-[9px] uppercase tracking-widest">A Guardiã</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'vault' ? 'text-[#E5C384] scale-105' : 'text-[#FAF6EE]/50 hover:text-[#C9A86A]'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span className="font-cinzel text-[9px] uppercase tracking-widest">Cofre</span>
        </button>
      </nav>
    </div>
  );
}
