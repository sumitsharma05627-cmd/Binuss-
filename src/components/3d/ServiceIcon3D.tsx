import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, isMobileDevice, prefersReducedMotion } from './webglUtils';

interface ServiceIcon3DProps {
  type: 'website' | 'seo' | 'ads' | 'social' | 'branding' | 'leads' | 'growth' | 'ai';
  isHovered?: boolean;
  isVisible?: boolean;
}

export const ServiceIcon3D: React.FC<ServiceIcon3DProps> = ({
  type,
  isHovered = false,
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

    const isMobile = isMobileDevice();
    const reducedMotion = prefersReducedMotion();

    const width = container.clientWidth || 180;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Subtle lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x34d399, 2.5);
    dirLight.position.set(2, 3, 4);
    scene.add(dirLight);

    const disposables: { dispose: () => void }[] = [];

    // Helper to track and dispose
    const track = <T extends { dispose: () => void }>(res: T): T => {
      disposables.push(res);
      return res;
    };

    // Construct 3D object based on service type
    switch (type) {
      case 'website': {
        // 3D Browser Window with wireframe layout
        const frameGeo = track(new THREE.BoxGeometry(1.6, 1.1, 0.08));
        const frameMat = track(new THREE.MeshStandardMaterial({
          color: 0x09141f,
          metalness: 0.8,
          roughness: 0.2,
          wireframe: false
        }));
        const frame = new THREE.Mesh(frameGeo, frameMat);
        group.add(frame);

        // Header bar
        const barGeo = track(new THREE.BoxGeometry(1.5, 0.18, 0.09));
        const barMat = track(new THREE.MeshBasicMaterial({ color: 0x10b981 }));
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.set(0, 0.4, 0.01);
        group.add(bar);

        // Inner columns
        const col1Geo = track(new THREE.BoxGeometry(0.4, 0.65, 0.09));
        const col1Mat = track(new THREE.MeshBasicMaterial({ color: 0x064e3b, wireframe: true }));
        const col1 = new THREE.Mesh(col1Geo, col1Mat);
        col1.position.set(-0.5, -0.1, 0.01);
        group.add(col1);

        const col2Geo = track(new THREE.BoxGeometry(0.85, 0.65, 0.09));
        const col2Mat = track(new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true }));
        const col2 = new THREE.Mesh(col2Geo, col2Mat);
        col2.position.set(0.25, -0.1, 0.01);
        group.add(col2);
        break;
      }

      case 'seo': {
        // 3D Search & Ascending Ranking Node
        const ringGeo = track(new THREE.TorusGeometry(0.65, 0.08, 16, 48));
        const ringMat = track(new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.7 }));
        const ring = new THREE.Mesh(ringGeo, ringMat);
        group.add(ring);

        const handleGeo = track(new THREE.CylinderGeometry(0.06, 0.06, 0.7, 16));
        const handleMat = track(new THREE.MeshStandardMaterial({ color: 0x059669 }));
        const handle = new THREE.Mesh(handleGeo, handleMat);
        handle.position.set(0.6, -0.6, 0);
        handle.rotation.z = -Math.PI / 4;
        group.add(handle);

        // Ascending ranking nodes in center
        for (let i = 0; i < 3; i++) {
          const rankGeo = track(new THREE.BoxGeometry(0.18, 0.3 + i * 0.25, 0.18));
          const rankMat = track(new THREE.MeshBasicMaterial({ color: i === 2 ? 0x6ee7b7 : 0x047857 }));
          const rank = new THREE.Mesh(rankGeo, rankMat);
          rank.position.set(-0.25 + i * 0.25, -0.1 + i * 0.12, 0);
          group.add(rank);
        }
        break;
      }

      case 'ads': {
        // 3D Advertising Panels & Targeting Crosshair
        const ad1Geo = track(new THREE.BoxGeometry(1.2, 0.75, 0.05));
        const ad1Mat = track(new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.3 }));
        const ad1 = new THREE.Mesh(ad1Geo, ad1Mat);
        ad1.rotation.y = 0.2;
        group.add(ad1);

        const targetGeo = track(new THREE.RingGeometry(0.35, 0.42, 32));
        const targetMat = track(new THREE.MeshBasicMaterial({ color: 0x34d399, side: THREE.DoubleSide }));
        const target = new THREE.Mesh(targetGeo, targetMat);
        target.position.set(0, 0, 0.1);
        group.add(target);

        const dotGeo = track(new THREE.SphereGeometry(0.1, 16, 16));
        const dotMat = track(new THREE.MeshBasicMaterial({ color: 0x6ee7b7 }));
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(0, 0, 0.12);
        group.add(dot);
        break;
      }

      case 'social': {
        // Connected Social Nodes & Orbit Rings
        const centralGeo = track(new THREE.SphereGeometry(0.35, 24, 24));
        const centralMat = track(new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2 }));
        const central = new THREE.Mesh(centralGeo, centralMat);
        group.add(central);

        const orbitRingGeo = track(new THREE.TorusGeometry(0.9, 0.02, 12, 48));
        const orbitRingMat = track(new THREE.MeshBasicMaterial({ color: 0x047857, wireframe: true }));
        const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
        orbitRing.rotation.x = Math.PI / 3;
        group.add(orbitRing);

        // Satellites
        for (let i = 0; i < 4; i++) {
          const satGeo = track(new THREE.SphereGeometry(0.12, 16, 16));
          const satMat = track(new THREE.MeshBasicMaterial({ color: 0x6ee7b7 }));
          const sat = new THREE.Mesh(satGeo, satMat);
          const angle = (i / 4) * Math.PI * 2;
          sat.position.set(Math.cos(angle) * 0.9, Math.sin(angle) * 0.45, Math.sin(angle) * 0.7);
          group.add(sat);
        }
        break;
      }

      case 'branding': {
        // 3D Identity Elements (Faceted Diamond/Prism)
        const prismGeo = track(new THREE.OctahedronGeometry(0.85, 0));
        const prismMat = track(new THREE.MeshPhysicalMaterial({
          color: 0x064e3b,
          metalness: 0.9,
          roughness: 0.1,
          transmission: 0.4,
          clearcoat: 1
        }));
        const prism = new THREE.Mesh(prismGeo, prismMat);
        group.add(prism);

        const cageGeo = track(new THREE.OctahedronGeometry(1.05, 0));
        const cageMat = track(new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true }));
        const cage = new THREE.Mesh(cageGeo, cageMat);
        group.add(cage);
        break;
      }

      case 'leads': {
        // Flowing Data Funnel & Conversion Token
        const funnelGeo = track(new THREE.ConeGeometry(0.85, 1.2, 18, 1, true));
        const funnelMat = track(new THREE.MeshStandardMaterial({
          color: 0x064e3b,
          wireframe: true,
          side: THREE.DoubleSide
        }));
        const funnel = new THREE.Mesh(funnelGeo, funnelMat);
        funnel.rotation.x = Math.PI;
        group.add(funnel);

        // Converted lead token at bottom
        const tokenGeo = track(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 24));
        const tokenMat = track(new THREE.MeshStandardMaterial({ color: 0x34d399, metalness: 0.8 }));
        const token = new THREE.Mesh(tokenGeo, tokenMat);
        token.position.set(0, -0.65, 0);
        group.add(token);
        break;
      }

      case 'growth': {
        // Ascending Geometric Growth Structure
        for (let i = 0; i < 4; i++) {
          const barGeo = track(new THREE.BoxGeometry(0.22, 0.35 + i * 0.35, 0.22));
          const barMat = track(new THREE.MeshStandardMaterial({
            color: i === 3 ? 0x34d399 : 0x047857,
            metalness: 0.5,
            roughness: 0.3
          }));
          const bar = new THREE.Mesh(barGeo, barMat);
          bar.position.set(-0.45 + i * 0.3, -0.4 + (i * 0.35) / 2, 0);
          group.add(bar);
        }
        // Trend Vector Arrow
        const arrowLineGeo = track(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 8));
        const arrowLineMat = track(new THREE.MeshBasicMaterial({ color: 0x6ee7b7 }));
        const arrow = new THREE.Mesh(arrowLineGeo, arrowLineMat);
        arrow.position.set(0, 0.15, 0.2);
        arrow.rotation.z = -Math.PI / 4;
        group.add(arrow);
        break;
      }

      case 'ai': {
        // Intelligent Connected Neural Network
        const nodes: THREE.Vector3[] = [
          new THREE.Vector3(0, 0.6, 0),
          new THREE.Vector3(-0.6, 0.1, 0.3),
          new THREE.Vector3(0.6, 0.1, -0.2),
          new THREE.Vector3(-0.4, -0.5, -0.2),
          new THREE.Vector3(0.4, -0.5, 0.3),
          new THREE.Vector3(0, -0.1, 0)
        ];
        nodes.forEach(pos => {
          const nGeo = track(new THREE.SphereGeometry(0.12, 16, 16));
          const nMat = track(new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.2 }));
          const n = new THREE.Mesh(nGeo, nMat);
          n.position.copy(pos);
          group.add(n);
        });

        // Neural links
        const lineMat = track(new THREE.LineBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.6 }));
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const lineGeo = track(new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]));
            const line = new THREE.Line(lineGeo, lineMat);
            group.add(line);
          }
        }
        break;
      }
    }

    let animationId: number;
    let clock = new THREE.Clock();
    let entranceProgress = isVisibleRef.current ? 0.4 : 0.0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Synchronized entrance progress
      const targetEntrance = isVisibleRef.current ? 1.0 : 0.0;
      entranceProgress += (targetEntrance - entranceProgress) * 0.05;

      const speed = isHoveredRef.current ? 1.8 : 0.8;
      if (!reducedMotion) {
        group.rotation.y += delta * speed;
        group.rotation.x = Math.sin(elapsed * 1.2) * 0.15;
        const entranceScale = 0.8 + entranceProgress * 0.2;
        if (isHoveredRef.current) {
          group.scale.lerp(new THREE.Vector3(1.15 * entranceScale, 1.15 * entranceScale, 1.15 * entranceScale), 0.08);
        } else {
          group.scale.lerp(new THREE.Vector3(1.0 * entranceScale, 1.0 * entranceScale, 1.0 * entranceScale), 0.08);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      disposables.forEach(d => d.dispose());
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center pointer-events-none mx-auto"
      aria-hidden="true"
    />
  );
};
