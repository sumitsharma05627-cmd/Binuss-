/**
 * Device-Tier Detection Utility
 * Evaluates hardware concurrency, device memory, GPU capabilities via WebGL debug info,
 * screen characteristics, and connection hints to assign a performance tier ('low' | 'mid' | 'high').
 * Dynamically restricts 3D particle counts, curve segments, and pixel ratios to guarantee smooth 60fps.
 */

export type DeviceTier = 'low' | 'mid' | 'high';

export interface ParticleBudgets {
  backgroundParticles: number;
  heroDustParticles: number;
  globeNodes: number;
  globeArcs: number;
  curveResolution: number;
  tubeRadialSegments: number;
}

export interface DevicePerformanceProfile {
  tier: DeviceTier;
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  hardwareConcurrency: number;
  deviceMemory: number; // in GB, or estimated
  gpuRenderer: string;
  gpuVendor: string;
  maxPixelRatio: number;
  antialias: boolean;
  particleBudgets: ParticleBudgets;
}

// Cached profile to prevent redundant WebGL context creation
let cachedProfile: DevicePerformanceProfile | null = null;

/**
 * Probes the GPU renderer string via WebGL debug info extension
 */
function probeGPUInfo(): { renderer: string; vendor: string; isLowEndGPU: boolean; isHighEndGPU: boolean } {
  if (typeof window === 'undefined') {
    return { renderer: '', vendor: '', isLowEndGPU: false, isHighEndGPU: false };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      return { renderer: 'No WebGL', vendor: '', isLowEndGPU: true, isHighEndGPU: false };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    let renderer = '';
    let vendor = '';

    if (debugInfo) {
      renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
    } else {
      renderer = gl.getParameter(gl.RENDERER) || '';
      vendor = gl.getParameter(gl.VENDOR) || '';
    }

    const lowerRenderer = renderer.toLowerCase();

    // Known low-power/software GPUs
    const isLowEndGPU =
      /swiftshader|llvmpipe|software rasterizer|mali-400|mali-450|mali-t|adreno 3|adreno 4|adreno 505|adreno 506|powervr sgx|intel hd graphics 2000|intel hd graphics 3000/i.test(
        lowerRenderer
      );

    // Known high-performance GPUs
    const isHighEndGPU =
      /nvidia|geforce rtx|geforce gtx|radeon rx|apple m|apple a1[5-9]|apple gpu|adreno 7|adreno 8|mali-g7|mali-g9/i.test(
        lowerRenderer
      );

    // Clean up WebGL context
    const loseContext = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    if (loseContext) {
      loseContext.loseContext();
    }

    return { renderer, vendor, isLowEndGPU, isHighEndGPU };
  } catch {
    return { renderer: 'Error probing', vendor: '', isLowEndGPU: false, isHighEndGPU: false };
  }
}

/**
 * Analyzes device capabilities and returns a comprehensive performance profile
 */
export function getDevicePerformanceProfile(forceRefresh = false): DevicePerformanceProfile {
  if (cachedProfile && !forceRefresh) {
    return cachedProfile;
  }

  if (typeof window === 'undefined') {
    return {
      tier: 'high',
      isMobile: false,
      isTablet: false,
      isLowEnd: false,
      hardwareConcurrency: 8,
      deviceMemory: 8,
      gpuRenderer: 'Server',
      gpuVendor: 'Server',
      maxPixelRatio: 1.5,
      antialias: true,
      particleBudgets: {
        backgroundParticles: 280,
        heroDustParticles: 160,
        globeNodes: 48,
        globeArcs: 16,
        curveResolution: 64,
        tubeRadialSegments: 8
      }
    };
  }

  const width = window.innerWidth;
  const isMobile = width < 768 || /Android|iPhone|iPod/i.test(navigator.userAgent);
  const isTablet = (width >= 768 && width < 1024) || /iPad/i.test(navigator.userAgent);

  // CPU cores
  const concurrency = navigator.hardwareConcurrency || 4;

  // Device memory (GB)
  const navAny = navigator as unknown as { deviceMemory?: number; connection?: { saveData?: boolean } };
  const memory = navAny.deviceMemory || (isMobile ? 3 : 8);
  const isSaveData = !!navAny.connection?.saveData;

  // GPU info
  const gpu = probeGPUInfo();

  // Determine score: 0 (weak) to 5 (flagship)
  let score = 2.5;

  // Concurrency adjustments
  if (concurrency <= 2) score -= 1.5;
  else if (concurrency <= 4) score -= 0.5;
  else if (concurrency >= 8) score += 1.0;

  // Memory adjustments
  if (memory <= 2) score -= 1.5;
  else if (memory <= 4) score -= 0.5;
  else if (memory >= 8) score += 1.0;

  // Mobile / form factor adjustment
  if (isMobile) score -= 0.5;

  // GPU adjustments
  if (gpu.isLowEndGPU) score -= 2.0;
  else if (gpu.isHighEndGPU) score += 1.5;

  // Save-data mode
  if (isSaveData) score -= 2.0;

  // Final Tier Classification
  let tier: DeviceTier = 'mid';
  if (score < 1.5) {
    tier = 'low';
  } else if (score >= 3.0 && !isMobile) {
    tier = 'high';
  } else if (score >= 3.5 && isMobile) {
    // Flagship mobile
    tier = 'mid';
  } else {
    tier = 'mid';
  }

  // Define particle budgets according to detected tier
  let particleBudgets: ParticleBudgets;
  let maxPixelRatio: number;
  let antialias: boolean;

  switch (tier) {
    case 'low':
      particleBudgets = {
        backgroundParticles: 48,
        heroDustParticles: 36,
        globeNodes: 16,
        globeArcs: 5,
        curveResolution: 24,
        tubeRadialSegments: 6
      };
      maxPixelRatio = 1.0;
      antialias = false;
      break;

    case 'mid':
      particleBudgets = {
        backgroundParticles: isMobile ? 80 : 130,
        heroDustParticles: isMobile ? 60 : 90,
        globeNodes: 28,
        globeArcs: 9,
        curveResolution: 40,
        tubeRadialSegments: 8
      };
      maxPixelRatio = isMobile ? 1.15 : 1.3;
      antialias = !isMobile;
      break;

    case 'high':
    default:
      particleBudgets = {
        backgroundParticles: 280,
        heroDustParticles: 160,
        globeNodes: 48,
        globeArcs: 16,
        curveResolution: 64,
        tubeRadialSegments: 8
      };
      maxPixelRatio = 1.5;
      antialias = true;
      break;
  }

  cachedProfile = {
    tier,
    isMobile,
    isTablet,
    isLowEnd: tier === 'low',
    hardwareConcurrency: concurrency,
    deviceMemory: memory,
    gpuRenderer: gpu.renderer,
    gpuVendor: gpu.vendor,
    maxPixelRatio,
    antialias,
    particleBudgets
  };

  return cachedProfile;
}

/**
 * Returns the current device tier: 'low' | 'mid' | 'high'
 */
export function getDeviceTier(): DeviceTier {
  return getDevicePerformanceProfile().tier;
}

/**
 * Returns specific particle budget for given component
 */
export function getParticleBudget<K extends keyof ParticleBudgets>(key: K): number {
  return getDevicePerformanceProfile().particleBudgets[key];
}

/**
 * Checks if device is considered low-powered
 */
export function isLowTierDevice(): boolean {
  return getDevicePerformanceProfile().tier === 'low';
}
