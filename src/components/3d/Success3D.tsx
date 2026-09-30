import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from './webglUtils';

export const Success3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Central geometric diamond prism
    const geo = new THREE.OctahedronGeometry(1.0, 0);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      transmission: 0.4
    });
    const crystal = new THREE.Mesh(geo, mat);
    group.add(crystal);

    // Wireframe outer bloom
    const wireGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const wireCage = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireCage);

    // Concentric ripple rings
    const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
      transparent: true,
      opacity: 0.7
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    // Dispersed sparkle particles
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVel: THREE.Vector3[] = [];
    for (let i = 0; i < pCount; i++) {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize().multiplyScalar(Math.random() * 1.8);
      pPos[i * 3] = dir.x;
      pPos[i * 3 + 1] = dir.y;
      pPos[i * 3 + 2] = dir.z;
      pVel.push(dir.clone().multiplyScalar(0.02));
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.06,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(pGeo, pMat);
    group.add(particles);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0x34d399, 3);
    dirLight.position.set(2, 3, 4);
    scene.add(dirLight);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      crystal.rotation.y += delta * 1.5;
      crystal.rotation.x += delta * 0.8;
      wireCage.rotation.y -= delta * 1.2;
      ring.rotation.z += delta * 1.0;

      // Pulse bloom
      const pulse = 1 + Math.sin(elapsed * 4) * 0.08;
      crystal.scale.set(pulse, pulse, pulse);
      wireCage.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      geo.dispose();
      mat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
};
