import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion, getDevicePerformanceProfile } from './webglUtils';
import { useTheme } from '../../context/ThemeContext';

interface HeroCore3DProps {
  className?: string;
  isCompact?: boolean;
  isVisible?: boolean;
}

export const HeroCore3D: React.FC<HeroCore3DProps> = ({
  className = '',
  isCompact = false,
  isVisible = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;
  const { themeConfig } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;

    const profile = getDevicePerformanceProfile();
    const isMobile = profile.isMobile;
    const reducedMotion = prefersReducedMotion();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const primaryHex = parseInt(themeConfig.primaryColor.replace('#', ''), 16);
    const accentHex = parseInt(themeConfig.accentColor.replace('#', ''), 16);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = isCompact ? 7.5 : isMobile ? 8.5 : 7.0;

    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: true,
      powerPreference: profile.isLowEnd ? 'low-power' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxPixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Floating Geometric Core (Icosahedron + Wireframe cage)
    const coreGeo = new THREE.IcosahedronGeometry(isCompact ? 1.0 : 1.3, isMobile ? 1 : 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x051a14,
      metalness: 0.85,
      roughness: 0.15,
      transmission: 0.5,
      thickness: 1.2,
      reflectivity: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Inner glowing core
    const innerGeo = new THREE.OctahedronGeometry(isCompact ? 0.6 : 0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: primaryHex,
      wireframe: true
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerCore);

    // Wireframe outer cage
    const cageGeo = new THREE.IcosahedronGeometry(isCompact ? 1.25 : 1.6, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: primaryHex,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    masterGroup.add(cageMesh);

    // 2. Gimbal Orbit Rings
    const ring1Geo = new THREE.TorusGeometry(isCompact ? 1.8 : 2.3, 0.018, 16, isMobile ? 64 : 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      transparent: true,
      opacity: 0.45
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(isCompact ? 2.1 : 2.7, 0.015, 16, isMobile ? 64 : 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: primaryHex,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    masterGroup.add(ring2);

    // 3. Digital Floating Panels (representing websites, data graphs, conversions)
    const panelCount = isMobile ? 3 : 5;
    const panels: THREE.Mesh[] = [];
    const panelGeo = new THREE.PlaneGeometry(0.7, 0.45);

    // Canvas texture for digital panels
    const createPanelTexture = (type: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#06131d';
        ctx.fillRect(0, 0, 256, 160);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(4, 4, 248, 152);

        // Header bar
        ctx.fillStyle = '#10b981';
        ctx.fillRect(8, 8, 240, 18);
        ctx.fillStyle = '#05070c';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(type === 0 ? 'SYSTEM.GROWTH // 99.4%' : type === 1 ? 'CONVERSION.FUNNEL' : 'SEO.RANK // #1', 14, 21);

        // Simulated graph / lines
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
        ctx.beginPath();
        ctx.moveTo(16, 130);
        ctx.lineTo(60, 110);
        ctx.lineTo(110, 120);
        ctx.lineTo(160, 80);
        ctx.lineTo(210, 60);
        ctx.lineTo(240, 45);
        ctx.stroke();

        // Bar markers
        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        for (let i = 0; i < 5; i++) {
          const h = 20 + i * 15;
          ctx.fillRect(20 + i * 44, 140 - h, 14, h);
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    for (let i = 0; i < panelCount; i++) {
      const texture = createPanelTexture(i % 3);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const panel = new THREE.Mesh(panelGeo, mat);
      const angle = (i / panelCount) * Math.PI * 2;
      const radius = isCompact ? 2.2 : 2.9;
      panel.position.set(
        Math.cos(angle) * radius,
        (i % 2 === 0 ? 0.7 : -0.7) + (Math.sin(i) * 0.4),
        Math.sin(angle) * radius
      );
      panel.lookAt(0, 0, 0);
      panel.rotateY(Math.PI);
      masterGroup.add(panel);
      panels.push(panel);
    }

    // 4. Connected Nodes & Light Lines
    const nodeCount = profile.isLowEnd ? 8 : isMobile ? 12 : 24;
    const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.9 + Math.random() * 1.5;
      const pos = new THREE.Vector3(
        dist * Math.sin(phi) * Math.cos(theta),
        dist * Math.sin(phi) * Math.sin(theta),
        dist * Math.cos(phi)
      );
      node.position.copy(pos);
      masterGroup.add(node);
      nodes.push(node);
      nodePositions.push(pos);
    }

    // Connect some nodes with subtle line segments
    const lineIndices: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.7) {
          lineIndices.push(i, j);
        }
      }
    }
    const linePositions = new Float32Array(lineIndices.length * 3);
    for (let i = 0; i < lineIndices.length; i++) {
      const idx = lineIndices[i];
      linePositions[i * 3] = nodePositions[idx].x;
      linePositions[i * 3 + 1] = nodePositions[idx].y;
      linePositions[i * 3 + 2] = nodePositions[idx].z;
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: primaryHex,
      transparent: true,
      opacity: 0.22
    });
    const connectorLines = new THREE.LineSegments(linesGeo, linesMat);
    masterGroup.add(connectorLines);

    // 5. Subtle Dust / Floating Data Particles
    const particleCount = profile.particleBudgets.heroDustParticles;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = (Math.random() - 0.5) * 12;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: accentHex,
      size: 0.04,
      transparent: true,
      opacity: profile.isLowEnd ? 0.3 : 0.4
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f231e, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(accentHex, 2.5);
    mainLight.position.set(4, 5, 5);
    scene.add(mainLight);

    const backRimLight = new THREE.PointLight(primaryHex, 3, 15);
    backRimLight.position.set(-4, -3, -3);
    scene.add(backRimLight);

    // Mouse Tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      targetX = ((clientX / rect.width) * 2 - 1) * 0.7;
      targetY = -((clientY / rect.height) * 2 - 1) * 0.7;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let entranceProgress = isVisibleRef.current ? 0.3 : 0.0;

    const animate = () => {
       animationFrameId = requestAnimationFrame(animate);
       const delta = clock.getDelta();
       const elapsedTime = clock.getElapsedTime();

       // Synchronized entrance interpolation (smooth ease-out)
       const targetProgress = isVisibleRef.current ? 1.0 : 0.0;
       entranceProgress += (targetProgress - entranceProgress) * 0.045;

       // Smooth interpolation for mouse
       mouseX += (targetX - mouseX) * 0.05;
       mouseY += (targetY - mouseY) * 0.05;

       if (!reducedMotion) {
         // Master group entrance scale & slow autonomous rotation
         const entranceScale = 0.82 + entranceProgress * 0.18;
         masterGroup.scale.set(entranceScale, entranceScale, entranceScale);

         // Ring opacities synchronize with entrance
         ringMat.opacity = 0.45 * entranceProgress;
         ring2Mat.opacity = 0.35 * entranceProgress;
         cageMat.opacity = 0.28 * entranceProgress;

         masterGroup.rotation.y += delta * 0.25;
         masterGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + mouseY * 0.6;
         masterGroup.rotation.z = mouseX * 0.4;

         // Counter-rotation of inner core
         innerCore.rotation.x -= delta * 0.4;
         innerCore.rotation.y -= delta * 0.5;

         // Rings rotation
         ring1.rotation.z += delta * 0.3;
         ring2.rotation.z -= delta * 0.25;

         // Floating breath effect
         const breath = Math.sin(elapsedTime * 1.5) * 0.03;
         coreMesh.scale.set(1 + breath, 1 + breath, 1 + breath);
         cageMesh.scale.set(1 - breath * 0.5, 1 - breath * 0.5, 1 - breath * 0.5);

        // Subtle camera tracking
        camera.position.x = mouseX * 0.8;
        camera.position.y = mouseY * 0.6;
        camera.lookAt(0, 0, 0);

        // Panels face camera slightly
        panels.forEach((panel, idx) => {
          panel.position.y += Math.sin(elapsedTime * 2 + idx) * 0.001;
        });

        // Drift background particles
        particleSystem.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      // Dispose Three.js objects
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      panelGeo.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isCompact, themeConfig.primaryColor, themeConfig.accentColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
};
