import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode
} from 'react';

export interface SectionSequenceState {
  isIntersecting: boolean;
  stage: number; // 0 = not in view, 1 = visual entrance starts, 2 = headline/badge, 3 = supporting text/CTA, 4 = cards/staggered details
  progress: number;
}

interface ScrollSequenceContextType {
  registerSection: (
    id: string,
    element: HTMLElement,
    options?: { threshold?: number; rootMargin?: string }
  ) => void;
  unregisterSection: (id: string) => void;
  getSectionState: (id: string) => SectionSequenceState;
  activeSectionId: string | null;
}

const defaultState: SectionSequenceState = {
  isIntersecting: true,
  stage: 4,
  progress: 1
};

const ScrollSequenceContext = createContext<ScrollSequenceContextType>({
  registerSection: () => {},
  unregisterSection: () => {},
  getSectionState: () => defaultState,
  activeSectionId: null
});

interface ScrollSequenceProviderProps {
  children: ReactNode;
}

export const ScrollSequenceProvider: React.FC<ScrollSequenceProviderProps> = ({ children }) => {
  const [sectionStates, setSectionStates] = useState<Record<string, SectionSequenceState>>({});
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const registeredElementsRef = useRef<Map<string, { el: HTMLElement; threshold?: number }>>(
    new Map()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sequenceTimersRef = useRef<Map<string, NodeJS.Timeout[]>>(new Map());

  // Trigger sequence progression for a section
  const triggerSectionSequence = useCallback((id: string) => {
    // Clear any existing timers for this section
    const existingTimers = sequenceTimersRef.current.get(id);
    if (existingTimers) {
      existingTimers.forEach(clearTimeout);
    }
    const timers: NodeJS.Timeout[] = [];

    // Stage 1: Immediate trigger (3D scene initiates entrance transition)
    setSectionStates((prev) => ({
      ...prev,
      [id]: { isIntersecting: true, stage: 1, progress: 0.25 }
    }));

    // Stage 2: Synchronized +120ms (Badges and Primary Headings slide in)
    timers.push(
      setTimeout(() => {
        setSectionStates((prev) => ({
          ...prev,
          [id]: { ...(prev[id] || defaultState), isIntersecting: true, stage: 2, progress: 0.5 }
        }));
      }, 120)
    );

    // Stage 3: Synchronized +260ms (Supporting copy, primary metrics & controls)
    timers.push(
      setTimeout(() => {
        setSectionStates((prev) => ({
          ...prev,
          [id]: { ...(prev[id] || defaultState), isIntersecting: true, stage: 3, progress: 0.75 }
        }));
      }, 260)
    );

    // Stage 4: Synchronized +420ms (Interactive cards, staggered items, full completion)
    timers.push(
      setTimeout(() => {
        setSectionStates((prev) => ({
          ...prev,
          [id]: { ...(prev[id] || defaultState), isIntersecting: true, stage: 4, progress: 1.0 }
        }));
      }, 420)
    );

    sequenceTimersRef.current.set(id, timers);
  }, []);

  // Initialize centralized IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Single centralized observer for the entire page
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = (entry.target as HTMLElement).dataset.sequenceId;
          if (!targetId) return;

          if (entry.isIntersecting) {
            setActiveSectionId(targetId);
            setSectionStates((prev) => {
              // Only trigger sequence if not already in progress or completed
              if (!prev[targetId] || prev[targetId].stage === 0) {
                // Trigger sequenced cascade
                setTimeout(() => triggerSectionSequence(targetId), 0);
              }
              return prev;
            });
          }
        });
      },
      {
        root: null,
        // Trigger slightly before the section fully enters the center for fluid, seamless anticipation
        rootMargin: '0px 0px -10% 0px',
        threshold: [0.1, 0.25, 0.5]
      }
    );

    observerRef.current = observer;

    // Re-observe any already registered elements
    registeredElementsRef.current.forEach(({ el }) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      sequenceTimersRef.current.forEach((timers) => timers.forEach(clearTimeout));
    };
  }, [triggerSectionSequence]);

  const registerSection = useCallback(
    (id: string, element: HTMLElement, options?: { threshold?: number; rootMargin?: string }) => {
      element.dataset.sequenceId = id;
      registeredElementsRef.current.set(id, { el: element, threshold: options?.threshold });

      if (observerRef.current) {
        observerRef.current.observe(element);
      }

      // Check if element is already in viewport initially (e.g. Hero on page load)
      const rect = element.getBoundingClientRect();
      const isVisibleImmediately = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      if (isVisibleImmediately) {
        triggerSectionSequence(id);
      }
    },
    [triggerSectionSequence]
  );

  const unregisterSection = useCallback((id: string) => {
    const item = registeredElementsRef.current.get(id);
    if (item && observerRef.current) {
      observerRef.current.unobserve(item.el);
    }
    registeredElementsRef.current.delete(id);
    const timers = sequenceTimersRef.current.get(id);
    if (timers) {
      timers.forEach(clearTimeout);
      sequenceTimersRef.current.delete(id);
    }
  }, []);

  const getSectionState = useCallback(
    (id: string): SectionSequenceState => {
      return sectionStates[id] || defaultState;
    },
    [sectionStates]
  );

  return (
    <ScrollSequenceContext.Provider
      value={{
        registerSection,
        unregisterSection,
        getSectionState,
        activeSectionId
      }}
    >
      {children}
    </ScrollSequenceContext.Provider>
  );
};

export const useScrollSequence = () => {
  return useContext(ScrollSequenceContext);
};

/**
 * Custom hook for section components to bind to the centralized observer
 * and get synchronized stage-based animation states.
 */
export const useSectionSequence = (sectionId: string) => {
  const { registerSection, unregisterSection, getSectionState, activeSectionId } =
    useScrollSequence();
  const sectionRef = useRef<HTMLElement | null>(null);

  const state = getSectionState(sectionId);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    registerSection(sectionId, el);

    return () => {
      unregisterSection(sectionId);
    };
  }, [sectionId, registerSection, unregisterSection]);

  return {
    ref: sectionRef,
    isVisible: state.isIntersecting && state.stage >= 1,
    stage: state.stage,
    progress: state.progress,
    isActive: activeSectionId === sectionId
  };
};
