'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';

interface GeminiAscendant3DProps {
  firstMetDate?: string;
  proposalDate?: string;
  onAligned?: () => void;
}

export function GeminiAscendant3D({
  firstMetDate = '18 de Maio, 2024',
  proposalDate = 'Hoje',
  onAligned,
}: GeminiAscendant3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const targetTiltRef = useRef({ x: 0, y: 0 });

  const playLockClick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(860, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocked(true);
      if (navigator.vibrate) {
        navigator.vibrate([30, 80]);
      }
      playLockClick();
      onAligned?.();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onAligned]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Iluminação
    const keyLight = new THREE.PointLight(0xffeedd, 2.5, 12);
    keyLight.position.set(2.0, 3.0, 4.0);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(0x5a82a6, 1.4);
    blueRimLight.position.set(-3.0, -2.0, 2.0);
    scene.add(blueRimLight);

    const ambientLight = new THREE.AmbientLight(0x1a1622, 1.2);
    scene.add(ambientLight);

    // Materiais PBR
    // Latão Dourado Antigo (Antique Brass)
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.28,
    });

    const darkBrassMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a481e,
      metalness: 0.82,
      roughness: 0.42,
    });

    // Lápis-Lazúli Central
    const lapisMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a3366,
      roughness: 0.15,
      metalness: 0.35,
    });

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Anel Externo de Latão com Bevel e Marcadores
    const outerRingGeo = new THREE.TorusGeometry(2.1, 0.12, 16, 48);
    const outerRing = new THREE.Mesh(outerRingGeo, brassMaterial);
    rootGroup.add(outerRing);

    // Dentes de engrenagem externa
    const gearToothGeo = new THREE.BoxGeometry(0.12, 0.25, 0.12);
    const toothCount = 24;
    for (let t = 0; t < toothCount; t++) {
      const angle = (t / toothCount) * Math.PI * 2;
      const tooth = new THREE.Mesh(gearToothGeo, darkBrassMaterial);
      tooth.position.set(Math.cos(angle) * 2.22, Math.sin(angle) * 2.22, 0);
      tooth.rotation.z = angle;
      rootGroup.add(tooth);
    }

    // 2. Anel Intermediário de Constelações (Gira ao contrário)
    const midGroup = new THREE.Group();
    rootGroup.add(midGroup);

    const midRingGeo = new THREE.TorusGeometry(1.5, 0.09, 16, 36);
    const midRing = new THREE.Mesh(midRingGeo, brassMaterial);
    midGroup.add(midRing);

    // Cruzetas astronômicas
    const crossGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.0, 12);
    const cross1 = new THREE.Mesh(crossGeo, darkBrassMaterial);
    cross1.rotation.z = Math.PI / 4;
    midGroup.add(cross1);

    const cross2 = new THREE.Mesh(crossGeo, darkBrassMaterial);
    cross2.rotation.z = -Math.PI / 4;
    midGroup.add(cross2);

    // 3. Rotor Central com Engrenagem Interna
    const innerGroup = new THREE.Group();
    rootGroup.add(innerGroup);

    const innerRingGeo = new THREE.TorusGeometry(0.85, 0.08, 16, 32);
    const innerRing = new THREE.Mesh(innerRingGeo, brassMaterial);
    innerGroup.add(innerRing);

    // Bússola central
    const needleGeo = new THREE.ConeGeometry(0.15, 1.4, 8);
    const needleNorth = new THREE.Mesh(needleGeo, brassMaterial);
    needleNorth.position.y = 0.5;
    innerGroup.add(needleNorth);

    const needleSouth = new THREE.Mesh(needleGeo, darkBrassMaterial);
    needleSouth.position.y = -0.5;
    needleSouth.rotation.z = Math.PI;
    innerGroup.add(needleSouth);

    // 4. Esfera Central de Lápis-Lazúli
    const lapisGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const lapisSphere = new THREE.Mesh(lapisGeo, lapisMaterial);
    lapisSphere.position.z = 0.05;
    rootGroup.add(lapisSphere);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotação dinâmica que desacelera e trava no destino
      if (!isLocked) {
        outerRing.rotation.z += delta * 0.8;
        midGroup.rotation.z -= delta * 1.2;
        innerGroup.rotation.z += delta * 2.5;
      } else {
        outerRing.rotation.z = THREE.MathUtils.damp(outerRing.rotation.z, 0, 4.0, delta);
        midGroup.rotation.z = THREE.MathUtils.damp(midGroup.rotation.z, 0, 4.0, delta);
        innerGroup.rotation.z = THREE.MathUtils.damp(innerGroup.rotation.z, 0, 4.0, delta);
      }

      // Parallax 3D com cursor
      rootGroup.rotation.x = THREE.MathUtils.damp(rootGroup.rotation.x, targetTiltRef.current.x, 3.5, delta);
      rootGroup.rotation.y = THREE.MathUtils.damp(rootGroup.rotation.y, targetTiltRef.current.y, 3.5, delta);

      // Flutuação mística
      rootGroup.position.y = Math.sin(elapsed * 1.8) * 0.07;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltRef.current = {
        x: ny * 0.45,
        y: nx * 0.55,
      };
    };

    container.addEventListener('mousemove', handlePointerMove);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handlePointerMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isLocked]);

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Canvas 3D do Ascendente dos Gêmeos */}
      <div 
        ref={containerRef}
        className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
      >
        {/* Halo de luz cósmica */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#E5C384]/15 via-[#2B3B4E]/20 to-transparent blur-xl pointer-events-none" />
      </div>

      {/* Exibição das Datas Travadas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isLocked ? 1 : 0.4, y: isLocked ? 0 : 5 }}
        transition={{ duration: 0.8 }}
        className="mt-4 flex flex-col items-center text-center max-w-xs"
      >
        <div className="flex items-center gap-2 text-xs font-cinzel text-[#E5C384] mb-1">
          <Calendar className="w-4 h-4 text-[#C9A86A]" />
          <span>Alinhamento Temporal</span>
          {isLocked && <Sparkles className="w-3.5 h-3.5 text-[#E5C384] animate-spin-slow" />}
        </div>
        <p className="font-garamond text-sm text-[#FAF6EE]">
          De <strong className="text-[#C9A86A] font-cinzel">{firstMetDate}</strong> até <strong className="text-[#E5C384] font-cinzel">{proposalDate}</strong>
        </p>
        <p className="font-garamond italic text-xs text-[#FAF6EE]/70 mt-1">
          {isLocked ? "O mecanismo astronômico travou para a eternidade." : "As engrenagens de Mystic Falls estão alinhando nossas eras..."}
        </p>
      </motion.div>
    </div>
  );
}
