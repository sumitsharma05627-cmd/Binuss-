import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion, getDevicePerformanceProfile } from './webglUtils';
import { GROWTH_PIPELINE_STAGES } from '../../data/growth';

interface GrowthPipeline3DProps {
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
  isVisible?: boolean;
}

export const GrowthPipeline3D: React.FC<GrowthPipeline3DProps> = ({
  activeStageIndex,
  onSelectStage,
  isVisible = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeStageIndex);
  activeIndexRef.current = activeStageIndex;
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;

    const profile = getDevicePerformanceProfile();
    const isMobile = profile.isMobile;
    const reducedMotion = prefersReducedMotion();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, isMobile ? 8.5 : 7.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: true,
      powerPreference: profile.isLowEnd ? 'low-power' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxPixelRatio));
    container.appendChild(renderer.domElement);

    const stageNodes: THREE.Mesh[] = [];
    const stageHalos: THREE.Mesh[] = [];
    const nodeCount = GROWTH_PIPELINE_STAGES.length; // 5 stages
    const spacing = isMobile ? 1.4 : 1.7;
    const startX = -((nodeCount - 1) * spacing) / 2;

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Nodes along curve
    const curvePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = startX + i * spacing;
      const y = Math.sin((i / (nodeCount - 1)) * Math.PI) * 0.4;
      const z = Math.cos((i / (nodeCount - 1)) * Math.PI) * 0.3;
      curvePoints.push(new THREE.Vector3(x, y, z));

      // 3D Node Mesh (Octahedron for modern tech feel)
      const geo = new THREE.OctahedronGeometry(isMobile ? 0.35 : 0.45, 0);
      const mat = new THREE.MeshPhysicalMaterial({
        color: i === activeIndexRef.current ? 0x10b981 : 0x064e3b,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 0.9,
        wireframe: false
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      masterGroup.add(mesh);
      stageNodes.push(mesh);

      // Glowing Wireframe Halo around each stage
      const haloGeo = new THREE.IcosahedronGeometry(isMobile ? 0.5 : 0.65, 0);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        wireframe: true,
        transparent: true,
        opacity: i === activeIndexRef.current ? 0.8 : 0.2
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(x, y, z);
      masterGroup.add(halo);
      stageHalos.push(halo);
    }

    // Connect with smooth tube / curved line
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(
      curve,
      profile.particleBudgets.curveResolution,
      0.035,
      profile.particleBudgets.tubeRadialSegments,
      false
    );
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.5
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    masterGroup.add(tube);

    // Traveling Energy Pulse
    const pulseGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    masterGroup.add(pulse);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0x34d399, 2.5);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    // Raycasting for clicking in 3D canvas
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(stageNodes);
      if (intersects.length > 0) {
        const hitIdx = stageNodes.indexOf(intersects[0].object as THREE.Mesh);
        if (hitIdx !== -1) {
          onSelectStage(hitIdx);
        }
      }
    };

    container.addEventListener('click', handlePointerDown);

    let animId: number;
    let clock = new THREE.Clock();
    let entranceProgress = isVisibleRef.current ? 0.3 : 0.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Synchronized entrance progress interpolation
      const targetProgress = isVisibleRef.current ? 1.0 : 0.0;
      entranceProgress += (targetProgress - entranceProgress) * 0.045;

      const entranceScale = 0.84 + entranceProgress * 0.16;
      masterGroup.scale.set(entranceScale, entranceScale, entranceScale);
      tubeMat.opacity = 0.35 * entranceProgress;

      // Update pulse position along curve
      const t = (elapsed * 0.25) % 1;
      const pointOnCurve = curve.getPointAt(t);
      pulse.position.copy(pointOnCurve);

      // Rotate nodes & update active styling
      stageNodes.forEach((node, i) => {
        const isActive = i === activeIndexRef.current;
        if (!reducedMotion) {
          node.rotation.y += delta * (isActive ? 1.5 : 0.6);
          node.rotation.x += delta * 0.4;
          stageHalos[i].rotation.y -= delta * (isActive ? 1.2 : 0.4);
          stageHalos[i].rotation.z += delta * 0.5;
        }

        const targetScale = isActive ? 1.3 : 1.0;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        stageHalos[i].scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const nodeMat = node.material as THREE.MeshPhysicalMaterial;
        nodeMat.color.setHex(isActive ? 0x10b981 : 0x064e3b);
        const haloMat = stageHalos[i].material as THREE.MeshBasicMaterial;
        haloMat.opacity = isActive ? 0.85 : 0.18;
      });

      // Subtle master group tilt
      if (!reducedMotion) {
        masterGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.08;
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
      container.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      tubeGeo.dispose();
      tubeMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      stageNodes.forEach(n => {
        n.geometry.dispose();
        (n.material as THREE.Material).dispose();
      });
      stageHalos.forEach(h => {
        h.geometry.dispose();
        (h.material as THREE.Material).dispose();
      });
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectStage]);

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full cursor-pointer"
        title="Click on any stage node to explore details"
      />
      <div className="absolute bottom-2 text-xs text-neutral-400 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Interactive 3D Pipeline — Click any node to inspect stage mechanics
      </div>
    </div>
  );
};
