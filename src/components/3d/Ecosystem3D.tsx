import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion, getDevicePerformanceProfile } from './webglUtils';
import { ECOSYSTEM_NODES } from '../../data/growth';

interface Ecosystem3DProps {
  activeNodeIndex: number;
  onHoverNode: (index: number) => void;
  isVisible?: boolean;
}

export const Ecosystem3D: React.FC<Ecosystem3DProps> = ({
  activeNodeIndex,
  onHoverNode,
  isVisible = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeNodeIndex);
  activeIndexRef.current = activeNodeIndex;
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;

    const profile = getDevicePerformanceProfile();
    const isMobile = profile.isMobile;
    const reducedMotion = prefersReducedMotion();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 8.2 : 6.8);

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

    const nodeMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];
    const count = ECOSYSTEM_NODES.length; // 6 nodes
    const startY = 2.2;
    const stepY = 0.88;

    // Build 6 vertical cascading nodes with slight zigzag
    for (let i = 0; i < count; i++) {
      const y = startY - i * stepY;
      const x = Math.sin(i * 1.1) * 0.45;
      const z = Math.cos(i * 1.1) * 0.2;

      // Node geometry: faceted octahedron/diamond
      const geo = new THREE.OctahedronGeometry(0.32, 0);
      const mat = new THREE.MeshPhysicalMaterial({
        color: i === activeIndexRef.current ? 0x10b981 : 0x064e3b,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      group.add(mesh);
      nodeMeshes.push(mesh);

      // Orbiting wireframe ring
      const ringGeo = new THREE.TorusGeometry(0.48, 0.015, 12, 36);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, y, z);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);
      ringMeshes.push(ring);
    }

    // Connect vertical stages with glowing pipeline curves
    const points: THREE.Vector3[] = nodeMeshes.map(m => m.position.clone());
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(
      curve,
      profile.particleBudgets.curveResolution,
      0.025,
      profile.particleBudgets.tubeRadialSegments,
      false
    );
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.35
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    group.add(tube);

    // Downward flowing energy light
    const energyGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const energyMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
    const energy = new THREE.Mesh(energyGeo, energyMat);
    group.add(energy);

    // Ambient & directional lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const light = new THREE.DirectionalLight(0x34d399, 2.5);
    light.position.set(3, 3, 5);
    scene.add(light);

    // Raycast on hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const hitIdx = nodeMeshes.indexOf(intersects[0].object as THREE.Mesh);
        if (hitIdx !== -1) {
          onHoverNode(hitIdx);
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);

    let animId: number;
    let clock = new THREE.Clock();
    let entranceProgress = isVisibleRef.current ? 0.3 : 0.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Synchronized entrance progression
      const targetProgress = isVisibleRef.current ? 1.0 : 0.0;
      entranceProgress += (targetProgress - entranceProgress) * 0.045;

      const entranceScale = 0.82 + entranceProgress * 0.18;
      group.scale.set(entranceScale, entranceScale, entranceScale);

      // Flowing downward pulse
      const t = (elapsed * 0.2) % 1;
      const pt = curve.getPointAt(t);
      energy.position.copy(pt);

      // Rotate nodes & rings
      nodeMeshes.forEach((mesh, idx) => {
        const isActive = idx === activeIndexRef.current;
        if (!reducedMotion) {
          mesh.rotation.y += delta * (isActive ? 1.6 : 0.6);
          ringMeshes[idx].rotation.z += delta * (isActive ? 1.4 : 0.5);
        }
        const targetScale = isActive ? 1.35 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        const mat = mesh.material as THREE.MeshPhysicalMaterial;
        mat.color.setHex(isActive ? 0x34d399 : 0x064e3b);
      });

      if (!reducedMotion) {
        group.rotation.y = Math.sin(elapsed * 0.5) * 0.12;
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
      container.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      tubeGeo.dispose();
      tubeMat.dispose();
      energyGeo.dispose();
      energyMat.dispose();
      nodeMeshes.forEach(n => {
        n.geometry.dispose();
        (n.material as THREE.Material).dispose();
      });
      ringMeshes.forEach(r => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onHoverNode]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] cursor-pointer"
      title="Hover over any 3D node to inspect"
    />
  );
};
