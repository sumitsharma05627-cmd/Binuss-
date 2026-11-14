import React, { useEffect, useRef, useState, Suspense } from 'react';

interface LazySectionProps {
  anchorId?: string;
  minHeight?: string;
  rootMargin?: string;
  children: React.ReactNode;
}

/**
 * Mounts heavy below-the-fold sections only when they approach the viewport
 * or when an anchor/navigation event requests that section directly.
 */
export const LazySection: React.FC<LazySectionProps> = ({
  anchorId,
  minHeight = '320px',
  rootMargin = '600px 0px',
  children
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    // Immediate mount if current URL hash targets this section
    if (anchorId && typeof window !== 'undefined' && window.location.hash === `#${anchorId}`) {
      setShouldRender(true);
      return;
    }

    const handleForceMount = (e: Event) => {
      const detail = (e as CustomEvent<{ id?: string; all?: boolean }>).detail;
      if (detail?.all || (anchorId && detail?.id === anchorId)) {
        setShouldRender(true);
      }
    };

    window.addEventListener('gwl:mount-section', handleForceMount);

    const el = placeholderRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return () => window.removeEventListener('gwl:mount-section', handleForceMount);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener('gwl:mount-section', handleForceMount);
    };
  }, [shouldRender, anchorId, rootMargin]);

  if (!shouldRender) {
    return (
      <div
        ref={placeholderRef}
        id={anchorId}
        style={{ minHeight }}
        className="w-full"
        aria-hidden="true"
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div
          id={anchorId}
          style={{ minHeight }}
          className="w-full flex items-center justify-center opacity-50"
        />
      }
    >
      {children}
    </Suspense>
  );
};

export function requestMountSection(targetId?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('gwl:mount-section', {
      detail: targetId ? { id: targetId } : { all: true }
    })
  );
}
