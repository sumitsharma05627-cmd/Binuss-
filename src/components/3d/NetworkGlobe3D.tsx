import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion, getDevicePerformanceProfile } from './webglUtils';

interface NetworkGlobe3DProps {
  isVisible?: boolean;
}

export const NetworkGlobe3D: React.FC<NetworkGlobe3DProps> = ({ isVisible = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;

    const profile = getDevicePerformanceProfile();
    const isMobile = profile.isMobile;
    const reducedMotion = prefersReducedMotion();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = isMobile ? 6.8 : 5.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: true,
      powerPreference: profile.isLowEnd ? 'low-power' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxPixelRatio));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Dark Translucent Inner Core Sphere
    const sphereSegs = profile.isLowEnd ? 16 : isMobile ? 24 : 32;
    const innerGeo = new THREE.SphereGeometry(1.8, sphereSegs, sphereSegs);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x051410,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.4,
      transparent: true,
      opacity: 0.8
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 2. Wireframe / Latitude Longitude Lines
    const wireSegs = profile.isLowEnd ? 14 : isMobile ? 18 : 24;
    const wireGeo = new THREE.SphereGeometry(1.85, wireSegs, wireSegs);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireSphere);

    // 3. Connected Digital Business Nodes (points on sphere)
    const nodeCount = profile.particleBudgets.globeNodes;
    const nodeGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.86;
      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      globeGroup.add(node);
    }

    // 4. Arcs connecting pairs of nodes (Great Circle Bezier Curves)
    const arcCount = profile.particleBudgets.globeArcs;
    const arcResolution = profile.isLowEnd ? 16 : 32;
    for (let k = 0; k < arcCount; k++) {
      const p1 = nodePositions[Math.floor(Math.random() * nodePositions.length)];
      const p2 = nodePositions[Math.floor(Math.random() * nodePositions.length)];
      if (p1.distanceTo(p2) > 1.2 && p1.distanceTo(p2) < 3.2) {
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const midLength = mid.length();
        mid.normalize().multiplyScalar(midLength + 0.4);

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const curvePoints = curve.getPoints(arcResolution);
        const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const curveMat = new THREE.LineBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.35
        });
        const arc = new THREE.Line(curveGeo, curveMat);
        globeGroup.add(arc);
      }
    }

    // 5. Orbiting Satellites / Data Rings
    const orbitRingGeo = new THREE.TorusGeometry(2.4, 0.015, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x059669,
      transparent: true,
      opacity: 0.3
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.rotation.y = Math.PI / 6;
    globeGroup.add(orbitRing);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0x34d399, 2.5);
    dir.position.set(3, 4, 5);
    scene.add(dir);

    // Mouse tilt
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;
    let clock = new THREE.Clock();
    let entranceProgress = isVisibleRef.current ? 0.3 : 0.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Synchronized entrance progress
      const targetProgress = isVisibleRef.current ? 1.0 : 0.0;
      entranceProgress += (targetProgress - entranceProgress) * 0.045;

      const entranceScale = 0.82 + entranceProgress * 0.18;
      globeGroup.scale.set(entranceScale, entranceScale, entranceScale);
      wireMat.opacity = 0.18 * entranceProgress;
      orbitRingMat.opacity = 0.4 * entranceProgress;

      if (!reducedMotion) {
        globeGroup.rotation.y += delta * 0.2;
        globeGroup.rotation.x = mouseY * 0.25;
        globeGroup.rotation.z = mouseX * 0.15;
        orbitRing.rotation.z += delta * 0.4;
      }

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
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[480px] pointer-events-none"
      aria-hidden="true"
    />
  );
};
