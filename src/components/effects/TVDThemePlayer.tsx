'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export function TVDThemePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  // Notas do tema de piano nostálgico e sombrio de The Vampire Diaries (Michael Suby)
  // Tema melancólico em Lá menor / Dó menor com violoncelo e piano
  const melodyNotes = [
    { freq: 220.00, dur: 1.2 }, // A3
    { freq: 261.63, dur: 0.8 }, // C4
    { freq: 329.63, dur: 1.4 }, // E4
    { freq: 293.66, dur: 1.0 }, // D4
    { freq: 261.63, dur: 1.2 }, // C4
    { freq: 246.94, dur: 1.4 }, // B3
    { freq: 220.00, dur: 2.0 }, // A3
    { freq: 196.00, dur: 1.2 }, // G3
    { freq: 220.00, dur: 2.4 }, // A3
  ];

  // Suporte a violoncelo sombrio em conjunto com o piano
  const playCelloBass = (freq: number, duration: number, ctx: AudioContext) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq / 2, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore
    }
  };

  const playPianoNote = (freq: number, duration: number, ctx: AudioContext) => {
    try {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Som aveludado de piano vitoriano sombrio
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);

      // Envelope ADSR de piano clássico
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      // Adiciona ressonância grave de violoncelo a cada compasso
      if (freq <= 220) {
        playCelloBass(freq, duration * 1.5, ctx);
      }
    } catch {
      // AudioContext suspenso até interação
    }
  };

  const startMusic = () => {
    // Tenta primeiro áudio real se existir
    if (audioElRef.current) {
      audioElRef.current.play().then(() => {
        setIsPlaying(true);
        setIsAudioLoaded(true);
        return;
      }).catch(() => {
        // Fallback para sintetizador Web Audio API de TVD
        fallbackToSynth();
      });
    } else {
      fallbackToSynth();
    }
  };

  const fallbackToSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      setIsPlaying(true);
      let noteIndex = 0;

      const playNext = () => {
        if (!audioContextRef.current) return;
        const currentNote = melodyNotes[noteIndex % melodyNotes.length];
        playPianoNote(currentNote.freq, currentNote.dur, audioContextRef.current);
        noteIndex++;
      };

      playNext();
      intervalRef.current = setInterval(playNext, 1400);
    } catch {
      console.warn("AudioContext não disponível");
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioElRef.current) {
      audioElRef.current.pause();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Audio element com fonte local opcional */}
      <audio
        ref={audioElRef}
        src="/audio/tvd-theme.mp3"
        loop
        preload="none"
      />

      <button
        onClick={toggleMusic}
        title={isPlaying ? "Silenciar Trilha de Mystic Falls" : "Tocar Tema de The Vampire Diaries"}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer text-[10px] font-cinzel uppercase tracking-wider ${
          isPlaying
            ? 'border-[#E5C384] bg-[#7A0C1E]/60 text-[#E5C384] shadow-[0_0_12px_rgba(201,168,106,0.4)] animate-pulse'
            : 'border-[#C9A86A]/40 bg-[#120F17]/80 text-[#FAF6EE]/60 hover:border-[#E5C384] hover:text-[#E5C384]'
        }`}
      >
        <Music className="w-3 h-3 text-[#E5C384]" />
        <span>{isPlaying ? 'Trilha TVD Ativa' : 'Trilha TVD'}</span>
        {isPlaying ? (
          <Volume2 className="w-3 h-3 text-[#E5C384]" />
        ) : (
          <VolumeX className="w-3 h-3 text-stone-500" />
        )}
      </button>
    </div>
  );
}
