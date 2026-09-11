'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CandleFlame3DProps {
  isLit?: boolean;
  onIgnite?: () => void;
}

const FLAME_VERTEX_SHADER = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distorção senoidal e afunilamento superior da chama
    float taper = 1.0 - uv.y * 0.7;
    float waveX = sin(uTime * 4.0 + pos.y * 5.0) * 0.08 * uv.y;
    float waveZ = cos(uTime * 3.5 + pos.y * 4.0) * 0.06 * uv.y;

    pos.x = (pos.x + waveX) * taper;
    pos.z = (pos.z + waveZ) * taper;
    pos.y += sin(uTime * 6.0) * 0.03 * uv.y;

    vDistortion = waveX;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FLAME_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uLit;
  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    if (uLit < 0.01) {
      discard;
    }

    // Gradiente vertical de temperatura da chama
    // Base: Azul espectral (combustão pura)
    // Meio: Dourado / Âmbar
    // Topo: Branco incandescente / Translúcido
    vec3 colBlue = vec3(0.35, 0.55, 0.85);
    vec3 colGold = vec3(0.92, 0.75, 0.35);
    vec3 colWhite = vec3(1.0, 0.96, 0.88);

    vec3 color = mix(colBlue, colGold, smoothstep(0.0, 0.35, vUv.y));
    color = mix(color, colWhite, smoothstep(0.4, 0.9, vUv.y));

    // Formato de lágrima suave nas bordas laterais
    float edgeDist = abs(vUv.x - 0.5) * 2.0;
    float flameShape = 1.0 - smoothstep(0.2, 0.95, edgeDist + (1.0 - vUv.y) * 0.3);
    float alpha = flameShape * smoothstep(0.02, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

    gl_FragColor = vec4(color, alpha * 0.92 * uLit);
  }
`;

export function CandleFlame3D({ isLit = false, onIgnite }: CandleFlame3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const flameMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const embersRef = useRef<THREE.Points | null>(null);

  const handleIgnite = () => {
    if (navigator.vibrate) {
      navigator.vibrate([25, 45]);
    }
    onIgnite?.();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0.6, 4.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0x181420, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd799, isLit ? 3.0 : 0.0, 10);
    pointLight.position.set(0, 0.85, 0.5);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 1. Corpo da Vela de Cera Antiga
    const candleGroup = new THREE.Group();
    scene.add(candleGroup);

    const candleGeo = new THREE.CylinderGeometry(0.55, 0.58, 2.0, 32);
    const waxMaterial = new THREE.MeshStandardMaterial({
      color: 0xede3d2,
      roughness: 0.6,
      metalness: 0.05,
    });
    const candleMesh = new THREE.Mesh(candleGeo, waxMaterial);
    candleMesh.position.y = -0.55;
    candleGroup.add(candleMesh);

    // Gotas de cera escorrendo
    const dripGeo = new THREE.SphereGeometry(0.12, 12, 12);
    dripGeo.scale(0.8, 1.8, 0.8);
    const dripMesh1 = new THREE.Mesh(dripGeo, waxMaterial);
    dripMesh1.position.set(0.5, 0.2, 0.2);
    candleGroup.add(dripMesh1);

    const dripMesh2 = new THREE.Mesh(dripGeo, waxMaterial);
    dripMesh2.position.set(-0.48, -0.1, 0.2);
    candleGroup.add(dripMesh2);

    // Castiçal / Prato de ferro fundido gótico
    const plateGeo = new THREE.CylinderGeometry(1.3, 1.4, 0.15, 32);
    const ironMaterial = new THREE.MeshStandardMaterial({
      color: 0x242028,
      metalness: 0.85,
      roughness: 0.45,
    });
    const plateMesh = new THREE.Mesh(plateGeo, ironMaterial);
    plateMesh.position.y = -1.6;
    candleGroup.add(plateMesh);

    // Pavio
    const wickGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 12);
    const wickMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const wickMesh = new THREE.Mesh(wickGeo, wickMaterial);
    wickMesh.position.set(0, 0.55, 0);
    candleGroup.add(wickMesh);

    // 2. Chama Procedural em Shader GLSL
    const flameGeo = new THREE.ConeGeometry(0.28, 0.95, 24, 24, true);
    flameGeo.translate(0, 0.475, 0); // Ajusta o pivô para a base da chama

    const flameMat = new THREE.ShaderMaterial({
      vertexShader: FLAME_VERTEX_SHADER,
      fragmentShader: FLAME_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uLit: { value: isLit ? 1.0 : 0.0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    flameMatRef.current = flameMat;

    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, 0.65, 0);
    candleGroup.add(flameMesh);

    // 3. Sistema de 3D Micro-Brasas (Particles)
    const emberCount = 20;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 0.4;
      emberPositions[i * 3 + 1] = 0.8 + Math.random() * 1.5;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      emberSpeeds[i] = 0.015 + Math.random() * 0.02;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xffcc66,
      size: 0.065,
      transparent: true,
      opacity: isLit ? 0.75 : 0.0,
      blending: THREE.AdditiveBlending,
    });

    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);
    embersRef.current = embers;

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      flameMat.uniforms.uTime.value = elapsed;

      // Animação das micro-brasas flutuando no ar
      if (isLit) {
        const positions = emberGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < emberCount; i++) {
          positions[i * 3 + 1] += emberSpeeds[i];
          positions[i * 3] += Math.sin(elapsed * 2.0 + i) * 0.003;
          // Reseta quando atinge altura máxima
          if (positions[i * 3 + 1] > 2.5) {
            positions[i * 3 + 1] = 0.8;
            positions[i * 3] = (Math.random() - 0.5) * 0.3;
          }
        }
        emberGeo.attributes.position.needsUpdate = true;
      }

      // Oscilação orgânica da luz de vela no ambiente
      if (pointLightRef.current && isLit) {
        pointLightRef.current.intensity = 2.8 + Math.sin(elapsed * 6.5) * 0.3 + Math.cos(elapsed * 9.2) * 0.2;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      candleGeo.dispose();
      flameGeo.dispose();
      flameMat.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      renderer.dispose();
    };
  }, [isLit]);

  // Atualiza uniform quando acende
  useEffect(() => {
    if (flameMatRef.current) {
      flameMatRef.current.uniforms.uLit.value = isLit ? 1.0 : 0.0;
    }
    if (pointLightRef.current) {
      pointLightRef.current.intensity = isLit ? 3.0 : 0.0;
    }
    if (embersRef.current) {
      (embersRef.current.material as THREE.PointsMaterial).opacity = isLit ? 0.8 : 0.0;
    }
  }, [isLit]);

  return (
    <div 
      className="flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={handleIgnite}
    >
      {/* Container 3D WebGL da Vela */}
      <div 
        ref={containerRef} 
        className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
      >
        {/* Halo de luz quente suave quando acesa */}
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ 
              opacity: [0.35, 0.6, 0.4, 0.65, 0.35],
              scale: [1, 1.08, 0.98, 1.06, 1],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(229,195,132,0.3) 0%, rgba(161,18,43,0.1) 40%, rgba(4,3,5,0) 70%)',
            }}
          />
        )}
      </div>

      {/* Indicador interativo */}
      {!isLit && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 font-cinzel text-xs text-[#E5C384] tracking-widest uppercase flex items-center gap-1.5 animate-pulse"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Toque na vela para acender a chama de Mystic Falls</span>
        </motion.p>
      )}
    </div>
  );
}
