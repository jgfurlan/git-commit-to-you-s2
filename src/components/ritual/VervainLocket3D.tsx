'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

interface VervainLocket3DProps {
  onOpened?: () => void;
  inscription?: string;
  partnerName?: string;
}

export function VervainLocket3D({
  onOpened,
  inscription,
  partnerName = 'Minha Eterna Amada',
}: VervainLocket3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Referências para animação Three.js
  const lidPivotRef = useRef<THREE.Group | null>(null);
  const targetLidAngleRef = useRef(0);
  const targetTiltRef = useRef({ x: 0, y: 0 });

  const playMetallicLatchSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      if (navigator.vibrate) {
        navigator.vibrate([20, 60, 20]);
      }
      playMetallicLatchSound();
      targetLidAngleRef.current = -Math.PI * 0.75; // -135 graus de abertura 3D
      setIsOpen(true);
      onOpened?.();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 360;

    // Cena e Câmera 3D com perspectiva precisa
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Iluminação Cinematográfica de Mystic Falls
    // 1. Luz de vela quente (PointLight em tom dourado/âmbar)
    const candleLight = new THREE.PointLight(0xffeedd, 2.2, 15);
    candleLight.position.set(2.5, 3.5, 4.0);
    scene.add(candleLight);

    // 2. Luz de luar gélida lateral (Rim light azul ardósia)
    const moonRimLight = new THREE.DirectionalLight(0x7da5cc, 1.6);
    moonRimLight.position.set(-4.0, -1.0, 3.0);
    scene.add(moonRimLight);

    // 3. Luz ambiente gótica suave
    const ambientLight = new THREE.AmbientLight(0x1a1622, 1.2);
    scene.add(ambientLight);

    // Materiais PBR Realistas
    // Prata de Lei Envelhecida de Mystic Falls
    const silverMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 1.0,
    });

    const darkSilverMaterial = new THREE.MeshStandardMaterial({
      color: 0x44444a,
      metalness: 0.85,
      roughness: 0.38,
    });

    // Granada Vermelho-Sangue Facetada
    const garnetMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8a0c1e,
      emissive: 0x220206,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.65,
      ior: 1.76,
      thickness: 0.8,
    });

    // Interior de veludo escuro
    const velvetMaterial = new THREE.MeshStandardMaterial({
      color: 0x08060a,
      roughness: 0.95,
      metalness: 0.05,
    });

    // Verbena seca
    const herbMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d5a40,
      roughness: 0.85,
      metalness: 0.1,
    });

    // Grupo Principal do Relicário (para inclinação orbital com o cursor)
    const locketRoot = new THREE.Group();
    scene.add(locketRoot);

    // 1. CORRENTE PRATEADA SUPERIOR
    const chainGroup = new THREE.Group();
    chainGroup.position.set(0, 2.2, 0);
    const linkGeo = new THREE.TorusGeometry(0.16, 0.045, 8, 16);
    for (let c = 0; c < 5; c++) {
      const link = new THREE.Mesh(linkGeo, silverMaterial);
      link.position.set(0, c * 0.22, 0);
      link.rotation.y = c % 2 === 0 ? 0 : Math.PI / 2;
      chainGroup.add(link);
    }
    locketRoot.add(chainGroup);

    // 2. BASE DO RELICÁRIO (Câmara interior)
    const baseGroup = new THREE.Group();
    locketRoot.add(baseGroup);

    // Corpo circular da caixa
    const bodyGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.32, 48);
    const bodyMesh = new THREE.Mesh(bodyGeo, silverMaterial);
    bodyMesh.rotation.x = Math.PI / 2;
    baseGroup.add(bodyMesh);

    // Borda pontilhada (Beaded rim em miniesferas)
    const beadCount = 36;
    const beadGeo = new THREE.SphereGeometry(0.065, 8, 8);
    for (let b = 0; b < beadCount; b++) {
      const angle = (b / beadCount) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, silverMaterial);
      bead.position.set(Math.cos(angle) * 1.82, Math.sin(angle) * 1.82, 0.16);
      baseGroup.add(bead);
    }

    // Cavidade interior de veludo
    const cavityGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.2, 36);
    const cavityMesh = new THREE.Mesh(cavityGeo, velvetMaterial);
    cavityMesh.rotation.x = Math.PI / 2;
    cavityMesh.position.z = 0.08;
    baseGroup.add(cavityMesh);

    // Folhas de verbena seca espalhadas no interior
    for (let h = 0; h < 14; h++) {
      const leafGeo = new THREE.BoxGeometry(0.18 + Math.random() * 0.22, 0.08, 0.03);
      const leaf = new THREE.Mesh(leafGeo, herbMaterial);
      const r = Math.random() * 1.1;
      const th = Math.random() * Math.PI * 2;
      leaf.position.set(Math.cos(th) * r, Math.sin(th) * r, 0.18);
      leaf.rotation.set(Math.random(), Math.random(), Math.random());
      baseGroup.add(leaf);
    }

    // 3. TAMPA DO RELICÁRIO ARTICULADA NO PIVÔ ESQUERDO (Hinge)
    const lidPivot = new THREE.Group();
    lidPivot.position.set(-1.8, 0, 0.17); // Eixo da dobradiça esquerda
    baseGroup.add(lidPivot);
    lidPivotRef.current = lidPivot;

    const lidMeshGroup = new THREE.Group();
    lidMeshGroup.position.set(1.8, 0, 0); // Desloca para centralizar no pivô
    lidPivot.add(lidMeshGroup);

    // Disco frontal de prata
    const lidDiscGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.12, 48);
    const lidDisc = new THREE.Mesh(lidDiscGeo, silverMaterial);
    lidDisc.rotation.x = Math.PI / 2;
    lidMeshGroup.add(lidDisc);

    // Arabesco em cruz de filigrana rendada (4 braços estilizados)
    for (let arm = 0; arm < 4; arm++) {
      const armGeo = new THREE.TorusGeometry(0.55, 0.05, 8, 24, Math.PI);
      const armMesh = new THREE.Mesh(armGeo, darkSilverMaterial);
      armMesh.rotation.z = (arm * Math.PI) / 2;
      armMesh.position.z = 0.08;
      lidMeshGroup.add(armMesh);
    }

    // Borda esculpida da tampa
    for (let b = 0; b < beadCount; b++) {
      const angle = (b / beadCount) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, silverMaterial);
      bead.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0.07);
      lidMeshGroup.add(bead);
    }

    // 4 Granadas menores nos pontos cardeais
    const miniGarnetGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const cardinalPositions = [
      [0, 1.25, 0.08],
      [0, -1.25, 0.08],
      [-1.25, 0, 0.08],
      [1.25, 0, 0.08],
    ];
    cardinalPositions.forEach(([gx, gy, gz]) => {
      const miniG = new THREE.Mesh(miniGarnetGeo, garnetMaterial);
      miniG.position.set(gx, gy, gz);
      lidMeshGroup.add(miniG);
    });

    // Granada Central Oval Lapidada em Relevo (Elena's Red Gemstone)
    const centerGarnetGeo = new THREE.SphereGeometry(0.5, 24, 24);
    centerGarnetGeo.scale(1, 1, 0.65);
    const centerGarnet = new THREE.Mesh(centerGarnetGeo, garnetMaterial);
    centerGarnet.position.set(0, 0, 0.12);
    lidMeshGroup.add(centerGarnet);

    // Engaste de prata circular ao redor da granada central
    const bezelGeo = new THREE.TorusGeometry(0.52, 0.06, 8, 36);
    const bezelMesh = new THREE.Mesh(bezelGeo, silverMaterial);
    bezelMesh.position.set(0, 0, 0.11);
    lidMeshGroup.add(bezelMesh);

    // Dobradiça esquerda física
    const hingeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
    const hingeMesh = new THREE.Mesh(hingeGeo, darkSilverMaterial);
    hingeMesh.position.set(-1.82, 0, 0.08);
    baseGroup.add(hingeMesh);

    setIsLoaded(true);

    // Animação 3D contínua a 60fps
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Oscilação suave da vela sobre a cena
      candleLight.intensity = 2.0 + Math.sin(elapsed * 5.5) * 0.25 + Math.cos(elapsed * 8.2) * 0.15;

      // Animação de rotação suave da tampa articulada
      if (lidPivotRef.current) {
        lidPivotRef.current.rotation.y = THREE.MathUtils.damp(
          lidPivotRef.current.rotation.y,
          targetLidAngleRef.current,
          4.5,
          delta
        );
      }

      // Parallax 3D com o cursor
      locketRoot.rotation.x = THREE.MathUtils.damp(locketRoot.rotation.x, targetTiltRef.current.x, 3.5, delta);
      locketRoot.rotation.y = THREE.MathUtils.damp(locketRoot.rotation.y, targetTiltRef.current.y, 3.5, delta);

      // Flutuação mística sutil
      locketRoot.position.y = Math.sin(elapsed * 1.5) * 0.08;

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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Container WebGL 3D do Relicário */}
      <div
        ref={containerRef}
        onClick={handleToggle}
        className="relative w-80 h-80 sm:w-96 sm:h-96 cursor-pointer flex items-center justify-center filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
      >
        {/* Glow dourado sutil de fundo */}
        <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-[#C9A86A]/10 via-[#7A0C1E]/15 to-transparent blur-2xl pointer-events-none" />
      </div>

      {/* Instrução / Revelação Interior */}
      <div className="mt-2 text-center max-w-sm px-4">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.p
              key="tap-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-cinzel text-xs tracking-widest text-[#E5C384] animate-pulse flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5C384]" />
              <span>Toque na joia de prata para abrir o Relicário 3D</span>
            </motion.p>
          ) : (
            <motion.div
              key="inscription-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-4 rounded-lg bg-[#120F17]/90 border border-[#C9A86A]/40 shadow-2xl text-center"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1 text-[#E5C384] font-cinzel text-[10px] uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                <span>Verbena de Mystic Falls • Proteção Eterna</span>
              </div>
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#FAF6EE] mb-1">
                {partnerName}
              </h4>
              <p className="font-garamond italic text-xs leading-relaxed text-[#FAF6EE]/90">
                &ldquo;{inscription || "Nem a compulsão do mais antigo vampiro alteraria o que sinto por você. O que sinto por ti é puro, livre e eterno."}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
