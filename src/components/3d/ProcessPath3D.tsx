import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion, getDevicePerformanceProfile } from './webglUtils';
import { PROCESS_STAGES } from '../../data/process';

interface ProcessPath3DProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  isVisible?: boolean;
}

export const ProcessPath3D: React.FC<ProcessPath3DProps> = ({
  currentStep,
  onSelectStep,
  isVisible = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(currentStep);
  stepRef.current = currentStep;
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;

    const profile = getDevicePerformanceProfile();
    const isMobile = profile.isMobile;
    const reducedMotion = prefersReducedMotion();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, isMobile ? 8.5 : 7.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: true,
      powerPreference: profile.isLowEnd ? 'low-power' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxPixelRatio));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 5 Stages Waypoints positioned in an S-curve 3D journey
    const waypoints: THREE.Vector3[] = [
      new THREE.Vector3(-3.2, -0.6, -1.2),
      new THREE.Vector3(-1.6, 0.4, 0.2),
      new THREE.Vector3(0.0, -0.2, -0.4),
      new THREE.Vector3(1.6, 0.5, 0.2),
      new THREE.Vector3(3.2, -0.4, -1.0)
    ];

    const curve = new THREE.CatmullRomCurve3(waypoints);
    const tubeGeo = new THREE.TubeGeometry(
      curve,
      profile.particleBudgets.curveResolution,
      0.045,
      profile.particleBudgets.tubeRadialSegments,
      false
    );
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    masterGroup.add(tube);

    // Waypoint Markers
    const markerMeshes: THREE.Mesh[] = [];
    const haloMeshes: THREE.Mesh[] = [];

    waypoints.forEach((pt, idx) => {
      // Monolith / Waypoint crystal
      const geo = new THREE.CylinderGeometry(0.04, 0.35, 0.8, 6);
      const mat = new THREE.MeshPhysicalMaterial({
        color: idx === stepRef.current ? 0x10b981 : 0x064e3b,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pt);
      mesh.position.y += 0.4;
      masterGroup.add(mesh);
      markerMeshes.push(mesh);

      // Orbital Halo
      const haloGeo = new THREE.TorusGeometry(0.5, 0.015, 12, 36);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        wireframe: true,
        transparent: true,
        opacity: idx === stepRef.current ? 0.9 : 0.25
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(mesh.position);
      halo.rotation.x = Math.PI / 2;
      masterGroup.add(halo);
      haloMeshes.push(halo);
    });

    // Traveling Waypoint Beacon
    const beaconGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    masterGroup.add(beacon);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0x34d399, 2.5);
    dir.position.set(2, 5, 5);
    scene.add(dir);

    // Click handler for waypoints
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(markerMeshes);
      if (intersects.length > 0) {
        const hitIdx = markerMeshes.indexOf(intersects[0].object as THREE.Mesh);
        if (hitIdx !== -1) {
          onSelectStep(hitIdx);
        }
      }
    };

    container.addEventListener('click', handleClick);

    let animId: number;
    let clock = new THREE.Clock();
    let entranceProgress = isVisibleRef.current ? 0.3 : 0.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Synchronized entrance progress
      const targetEntrance = isVisibleRef.current ? 1.0 : 0.0;
      entranceProgress += (targetEntrance - entranceProgress) * 0.045;

      const entranceScale = 0.84 + entranceProgress * 0.16;
      masterGroup.scale.set(entranceScale, entranceScale, entranceScale);
      tubeMat.opacity = 0.45 * entranceProgress;

      // Current active waypoint point
      const activeIdx = stepRef.current;
      const targetPt = waypoints[activeIdx];

      // Smoothly float beacon near active waypoint or along curve
      beacon.position.lerp(new THREE.Vector3(targetPt.x, targetPt.y + 0.9, targetPt.z), 0.1);

      // Spin waypoints
      markerMeshes.forEach((m, idx) => {
        const isCurrent = idx === activeIdx;
        if (!reducedMotion) {
          m.rotation.y += delta * (isCurrent ? 1.5 : 0.4);
          haloMeshes[idx].rotation.z += delta * (isCurrent ? 1.2 : 0.3);
        }
        const scale = isCurrent ? 1.3 : 1.0;
        m.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        (m.material as THREE.MeshPhysicalMaterial).color.setHex(isCurrent ? 0x10b981 : 0x064e3b);
        (haloMeshes[idx].material as THREE.MeshBasicMaterial).opacity = isCurrent ? 0.9 : 0.2;
      });

      if (!reducedMotion) {
        masterGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.08;
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
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      tubeGeo.dispose();
      tubeMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      markerMeshes.forEach(m => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      haloMeshes.forEach(h => {
        h.geometry.dispose();
        (h.material as THREE.Material).dispose();
      });
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectStep]);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full cursor-pointer"
        title="Click on any stage milestone in the 3D path"
      />
      <div className="absolute bottom-2 text-xs text-neutral-400 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        3D Journey Road — Click any milestone to jump directly to that phase
      </div>
    </div>
  );
};
