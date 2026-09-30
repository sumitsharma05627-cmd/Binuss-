import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion, getDevicePerformanceProfile } from './webglUtils';
import { ProjectItem } from '../../types';

interface PortfolioScreen3DProps {
  project: ProjectItem;
  isHovered: boolean;
  isVisible?: boolean;
}

export const PortfolioScreen3D: React.FC<PortfolioScreen3DProps> = ({
  project,
  isHovered,
  isVisible = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;

    const profile = getDevicePerformanceProfile();
    const isMobile = profile.isMobile;
    const reducedMotion = prefersReducedMotion();

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: true,
      powerPreference: profile.isLowEnd ? 'low-power' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxPixelRatio));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Canvas texture generating realistic UI screenshot layout for the project
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark slate background
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, 512, 320);

      // Top Browser Bar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 512, 36);

      // Browser dots
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(20, 18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(36, 18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(52, 18, 4, 0, Math.PI * 2);
      ctx.fill();

      // Search URL capsule
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.roundRect(80, 8, 300, 20, 10);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`https://${project.id}.gwlweblab.internal`, 94, 22);

      // Hero banner inside canvas
      ctx.fillStyle = '#061325';
      ctx.fillRect(24, 52, 464, 110);
      ctx.strokeStyle = project.accentColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(24, 52, 464, 110);

      // Project Badge
      ctx.fillStyle = project.accentColor;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(project.category.toUpperCase(), 40, 78);

      // Headline
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(project.title, 40, 102);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(project.tagline.slice(0, 50) + '...', 40, 124);

      // CTA button inside preview
      ctx.fillStyle = project.accentColor;
      ctx.roundRect(40, 136, 110, 18, 4);
      ctx.fill();
      ctx.fillStyle = '#05070c';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('EXPLORE SYSTEM', 50, 149);

      // Grid columns underneath
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(24 + i * 158, 178, 146, 120);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeRect(24 + i * 158, 178, 146, 120);

        ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
        ctx.fillRect(36 + i * 158, 192, 60, 6);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(36 + i * 158, 206, 110, 4);
        ctx.fillRect(36 + i * 158, 216, 90, 4);

        // Chart or card detail
        ctx.fillStyle = project.accentColor;
        ctx.fillRect(36 + i * 158, 250, 18, 34);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(60 + i * 158, 260, 18, 24);
        ctx.fillRect(84 + i * 158, 244, 18, 40);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;

    // Screen Bezel Mesh
    const screenGeo = new THREE.BoxGeometry(2.4, 1.5, 0.06);
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070c,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    group.add(screen);

    // Display Surface
    const displayGeo = new THREE.PlaneGeometry(2.32, 1.42);
    const displayMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide
    });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.z = 0.032;
    group.add(display);

    // Glowing rim border
    const rimGeo = new THREE.EdgesGeometry(screenGeo);
    const rimMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(project.accentColor),
      transparent: true,
      opacity: 0.4
    });
    const rim = new THREE.LineSegments(rimGeo, rimMat);
    group.add(rim);

    // Light
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(2, 3, 4);
    scene.add(dir);

    let animId: number;
    let clock = new THREE.Clock();
    let entranceProgress = isVisibleRef.current ? 0.3 : 0.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Entrance interpolation
      const targetEntrance = isVisibleRef.current ? 1.0 : 0.0;
      entranceProgress += (targetEntrance - entranceProgress) * 0.05;

      const isH = isHoveredRef.current;
      const targetZ = isH ? 0.35 : 0;
      const targetScale = (isH ? 1.06 : 1.0) * (0.85 + entranceProgress * 0.15);
      const targetRotY = isH ? 0.12 : 0;

      group.position.z = THREE.MathUtils.lerp(group.position.z, targetZ, 0.1);
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      if (!reducedMotion) {
        // Gentle float
        group.position.y = Math.sin(elapsed * 1.5) * 0.04;
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY + Math.sin(elapsed * 0.8) * 0.03, 0.08);
        group.rotation.x = Math.cos(elapsed * 1.1) * 0.02;
      }

      rimMat.opacity = isH ? 0.9 : 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      texture.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      displayGeo.dispose();
      displayMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [project]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[220px] sm:h-[260px] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
};
