import { useState, useRef, useCallback, MouseEvent, CSSProperties } from 'react';

export interface Use3DTiltOptions {
  maxTilt?: number; // max tilt degrees (default: 8)
  perspective?: number; // perspective in px (default: 900)
  scale?: number; // scale on hover (default: 1.02)
  speed?: number; // reset transition speed in ms (default: 400)
  glare?: boolean; // dynamic specular sheen glare
}

export interface Use3DTiltResult {
  tiltProps: {
    onMouseMove: (e: MouseEvent<HTMLElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  tiltStyle: CSSProperties;
  glareStyle: CSSProperties;
  isHovered: boolean;
}

/**
 * High-performance 3D interactive card tilt hook with cursor-tracking perspective
 * and specular lighting flare.
 */
export function use3DTilt({
  maxTilt = 7,
  perspective = 900,
  scale = 1.02,
  speed = 400,
  glare = true
}: Use3DTiltOptions = {}): Use3DTiltResult {
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles inversely
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        setTiltStyle({
          transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transition: 'transform 80ms ease-out',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        });

        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          setGlareStyle({
            opacity: 0.35,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`,
            transition: 'opacity 150ms ease-out'
          });
        }
      });
    },
    [maxTilt, perspective, scale, glare]
  );

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`
    });
    setGlareStyle({
      opacity: 0,
      transition: `opacity ${speed}ms ease-out`
    });
  }, [perspective, speed]);

  return {
    tiltProps: {
      onMouseMove,
      onMouseEnter,
      onMouseLeave
    },
    tiltStyle,
    glareStyle,
    isHovered
  };
}
