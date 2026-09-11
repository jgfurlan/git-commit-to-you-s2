'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useHoldToSeal } from '@/hooks/useHoldToSeal';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface DaylightWaxSeal3DProps {
  onConsagrated: () => void;
  partnerName?: string;
  creatorName?: string;
}

export function DaylightWaxSeal3D({
  onConsagrated,
  partnerName,
  creatorName,
}: DaylightWaxSeal3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heatLightRef = useRef<THREE.PointLight | null>(null);
  const waxMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const sealGroupRef = useRef<THREE.Group | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#7A0C1E', '#9E1129', '#C9A86A', '#E5C384', '#2B3B4E'],
    });
  };

  const { progress, isHolding, isSealed, startHolding, cancelHolding } = useHoldToSeal({
    holdDurationMs: 3000,
    onComplete: () => {
      triggerConfetti();
      if (navigator.vibrate) {
        navigator.vibrate([40, 100, 40]);
      }
      onConsagrated();
    },
  });

  // Vibração rítmica tipo batimento cardíaco durante o toque
  useEffect(() => {
    if (!isHolding || isSealed) return;
    const interval = setInterval(() => {
      if (navigator.vibrate) {
        navigator.vibrate(18);
      }
    }, 450);
    return () => clearInterval(interval);
  }, [isHolding, isSealed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Iluminação
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    keyLight.position.set(2.0, 4.0, 3.0);
    scene.add(keyLight);

    const heatLight = new THREE.PointLight(0xffaa44, 0.0, 8);
    heatLight.position.set(0, 0, 1.2);
    scene.add(heatLight);
    heatLightRef.current = heatLight;

    const ambientLight = new THREE.AmbientLight(0x181420, 1.4);
    scene.add(ambientLight);

    // Materiais PBR
    const waxMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a0c1e,
      roughness: 0.32,
      metalness: 0.18,
    });
    waxMaterialRef.current = waxMaterial;

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c384,
      metalness: 0.9,
      roughness: 0.22,
    });

    const lapisMaterial = new THREE.MeshStandardMaterial({
      color: 0x224477,
      roughness: 0.15,
      metalness: 0.45,
    });

    // Grupo do Selo 3D
    const sealGroup = new THREE.Group();
    scene.add(sealGroup);
    sealGroupRef.current = sealGroup;

    // 1. Poça de Cera Externa Irregular
    const waxBaseGeo = new THREE.CylinderGeometry(1.6, 1.68, 0.18, 36);
    const waxBase = new THREE.Mesh(waxBaseGeo, waxMaterial);
    waxBase.rotation.x = Math.PI / 2;
    sealGroup.add(waxBase);

    // Borda deformada de cera quente
    const rimGeo = new THREE.TorusGeometry(1.58, 0.14, 16, 40);
    const rimMesh = new THREE.Mesh(rimGeo, waxMaterial);
    rimMesh.position.z = 0.06;
    sealGroup.add(rimMesh);

    // 2. Anel Interno Dourado em Baixo-Relevo
    const goldRingGeo = new THREE.TorusGeometry(1.15, 0.05, 12, 36);
    const goldRing = new THREE.Mesh(goldRingGeo, goldMaterial);
    goldRing.position.z = 0.1;
    sealGroup.add(goldRing);

    // 3. Pedra Central de Lápis-Lazúli (Amuleto Daylight)
    const gemGeo = new THREE.SphereGeometry(0.55, 24, 24);
    gemGeo.scale(1, 1, 0.45);
    const gemMesh = new THREE.Mesh(gemGeo, lapisMaterial);
    gemMesh.position.z = 0.12;
    sealGroup.add(gemMesh);

    // Engaste de prata circular ao redor do lápis-lazúli
    const bezelGeo = new THREE.TorusGeometry(0.57, 0.05, 12, 32);
    const bezel = new THREE.Mesh(bezelGeo, goldMaterial);
    bezel.position.z = 0.12;
    sealGroup.add(bezel);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Rotação sutil e flutuação
      sealGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.04;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      waxBaseGeo.dispose();
      rimGeo.dispose();
      gemGeo.dispose();
      renderer.dispose();
    };
  }, []);

  // Reação dinâmica do material 3D conforme o progresso de 3 segundos
  useEffect(() => {
    if (waxMaterialRef.current && heatLightRef.current) {
      if (isHolding) {
        heatLightRef.current.intensity = 2.5 + progress * 4.0;
        waxMaterialRef.current.emissive.setHex(0x440810);
        waxMaterialRef.current.emissiveIntensity = progress * 0.6;
      } else {
        heatLightRef.current.intensity = 0.0;
        waxMaterialRef.current.emissive.setHex(0x000000);
      }
    }
  }, [isHolding, progress]);

  const circumference = 2 * Math.PI * 68;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 select-none">
      {/* Pergunta Solene */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm mb-4"
      >
        <span className="font-cinzel text-xs text-[#E5C384] uppercase tracking-widest block mb-2">
          O Pacto da Eternidade
        </span>
        <h2 className="font-garamond italic text-lg sm:text-xl text-[#FAF6EE] leading-relaxed">
          &ldquo;Você aceita selar este pacto e ser minha namorada por esta vida e por toda a eternidade?&rdquo;
        </h2>
      </motion.div>

      {/* Botão Interativo com Render 3D e Anel de Cera Quente */}
      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* SVG do Anel de Progresso Circular */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10">
          <circle
            cx="104"
            cy="104"
            r="68"
            className="stroke-[#181420]"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="104"
            cy="104"
            r="68"
            className="stroke-[#E5C384] transition-all duration-75"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: isHolding ? 'drop-shadow(0 0 10px #C9A86A)' : 'none',
            }}
          />
        </svg>

        {/* Canvas WebGL 3D do Selo */}
        <motion.div
          onPointerDown={startHolding}
          onPointerUp={cancelHolding}
          onPointerLeave={cancelHolding}
          onContextMenu={(e) => e.preventDefault()}
          animate={{
            scale: isHolding ? 0.94 : isSealed ? 1.06 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="relative w-44 h-44 cursor-pointer flex items-center justify-center rounded-full"
        >
          <div ref={containerRef} className="w-full h-full" />
        </motion.div>
      </div>

      {/* Instrução Dinâmica */}
      <div className="mt-4 text-center">
        {isSealed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-[#E5C384] font-cinzel text-xs uppercase tracking-widest"
          >
            <ShieldCheck className="w-4 h-4" /> Pacto Selado na Eternidade
          </motion.div>
        ) : (
          <div>
            <p className="font-cinzel text-xs tracking-wider text-[#C9A86A]">
              {isHolding ? 'Gravando o pacto nas estrelas...' : 'Pressione e segure por 3 segundos'}
            </p>
            <p className="font-garamond italic text-[11px] text-[#FAF6EE]/60 mt-0.5">
              {isHolding
                ? `${Math.round(progress * 100)}% consagrado`
                : 'O selo de cera carmesim responderá ao seu toque'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
