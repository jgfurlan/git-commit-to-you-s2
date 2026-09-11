'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FOG_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FOG_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // 2D Hash & Noise procedural para névoa cinematográfica ultra-leve
  float hash(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // Fractional Brownian Motion (FBM) com domínio distorcido para simular fluido/bruma real
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 4; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = uv * aspect;

    // Movimento suave do vento de Mystic Falls para a direita
    float t = uTime * 0.08;
    vec2 wind = vec2(t * 0.6, sin(t * 0.3) * 0.08);

    // Interação com o cursor do usuário (dissipa a névoa ao redor do toque)
    vec2 mouseNorm = (uMouse / uResolution.xy) * aspect;
    float distMouse = length(p - mouseNorm);
    float mouseRepulsion = smoothstep(0.35, 0.0, distMouse) * 0.45;

    // FBM em camadas com vórtice dinâmico
    vec2 q = vec2(fbm(p * 1.6 + wind), fbm(p * 1.6 + vec2(5.2, 1.3) + wind * 0.5));
    vec2 r = vec2(fbm(p * 2.2 + 4.0 * q + vec2(1.7, 9.2) + wind * 0.8),
                  fbm(p * 2.2 + 4.0 * q + vec2(8.3, 2.8) + wind * 0.8));

    float f = fbm(p * 2.5 + 3.0 * r);
    f = (f + 1.0) * 0.5; // Normaliza para [0, 1]

    // Densidade maior no chão (névoa rasteira) e no terço inferior da tela
    float heightDensity = smoothstep(0.9, 0.05, uv.y) * 0.85 + 0.15;
    float finalDensity = f * heightDensity;

    // Subtrai perturbação do cursor
    finalDensity = clamp(finalDensity - mouseRepulsion, 0.0, 1.0);

    // Paleta de Mystic Falls: azul ardósia gélido, fumaça espectral e penumbra gótica
    vec3 colDeep = vec3(0.015, 0.012, 0.02);     // Preto gótico base (#040305)
    vec3 colMistMid = vec3(0.08, 0.11, 0.16);   // Azul ardósia profundo
    vec3 colMistHigh = vec3(0.48, 0.58, 0.72);  // Bruma gélida iluminada pelo luar

    vec3 color = mix(colDeep, colMistMid, smoothstep(0.1, 0.6, finalDensity));
    color = mix(color, colMistHigh, smoothstep(0.5, 0.95, finalDensity));

    // Alpha cinematográfico suave
    float alpha = smoothstep(0.08, 0.8, finalDensity) * 0.62;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function Fog3DCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Renderer WebGL com suporte a transparência e alpha blending
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '2';

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(-1000, -1000) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: FOG_VERTEX_SHADER,
      fragmentShader: FOG_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = -1000;
      let clientY = -1000;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      uniforms.uMouse.value.set(clientX, height - clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[2]" />;
}
