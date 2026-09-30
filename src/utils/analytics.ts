export interface AnalyticsEvent {
  id: string;
  name: string;
  timestamp: number;
  properties?: Record<string, any>;
}

export interface AnalyticsSummary {
  totalEvents: number;
  ctaCounts: Record<string, number>;
  recentEvents: AnalyticsEvent[];
}

const STORAGE_EVENTS_KEY = 'gwl_analytics_events';
const STORAGE_COUNTS_KEY = 'gwl_analytics_counts';
const MAX_STORED_EVENTS = 100;

/**
 * Lightweight, zero-dependency analytics tracker for monitoring user actions and CTAs.
 */
export const trackEvent = (name: string, properties?: Record<string, any>): AnalyticsEvent => {
  const event: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    timestamp: Date.now(),
    properties: properties || {}
  };

  try {
    // 1. Update rolling events list
    const existingRaw = localStorage.getItem(STORAGE_EVENTS_KEY);
    const existingEvents: AnalyticsEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updatedEvents = [event, ...existingEvents].slice(0, MAX_STORED_EVENTS);
    localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(updatedEvents));

    // 2. Update aggregate counts
    const countsRaw = localStorage.getItem(STORAGE_COUNTS_KEY);
    const counts: Record<string, number> = countsRaw ? JSON.parse(countsRaw) : {};
    counts[name] = (counts[name] || 0) + 1;

    // Track specific CTA name if provided
    if (properties?.cta) {
      const ctaKey = `cta_${String(properties.cta).toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      counts[ctaKey] = (counts[ctaKey] || 0) + 1;
    }

    localStorage.setItem(STORAGE_COUNTS_KEY, JSON.stringify(counts));
  } catch {
    // Graceful silent fallback if localStorage is disabled or storage quota is exceeded
  }

  // Dispatch custom browser event for real-time listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('gwl:analytics', {
        detail: event
      })
    );
  }

  return event;
};

/**
 * Dedicated helper to track core CTA clicks like 'Start Project' and 'View Plans'.
 */
export const trackCtaClick = (
  ctaName: 'Start Project' | 'View Plans' | 'Explore Services' | 'Select Plan' | 'Proceed Custom Plan' | string,
  extraProperties?: Record<string, any>
): AnalyticsEvent => {
  return trackEvent('cta_click', {
    cta: ctaName,
    ...extraProperties
  });
};

/**
 * Retrieve aggregated analytics summary.
 */
export const getAnalyticsSummary = (): AnalyticsSummary => {
  try {
    const eventsRaw = localStorage.getItem(STORAGE_EVENTS_KEY);
    const countsRaw = localStorage.getItem(STORAGE_COUNTS_KEY);

    const recentEvents: AnalyticsEvent[] = eventsRaw ? JSON.parse(eventsRaw) : [];
    const ctaCounts: Record<string, number> = countsRaw ? JSON.parse(countsRaw) : {};

    return {
      totalEvents: recentEvents.length,
      ctaCounts,
      recentEvents
    };
  } catch {
    return {
      totalEvents: 0,
      ctaCounts: {},
      recentEvents: []
    };
  }
};

/**
 * Reset analytics data.
 */
export const clearAnalyticsData = (): void => {
  try {
    localStorage.removeItem(STORAGE_EVENTS_KEY);
    localStorage.removeItem(STORAGE_COUNTS_KEY);
  } catch {
    // Graceful fallback
  }
};

// Expose safe inspection interface on window for debugging/testing
if (typeof window !== 'undefined') {
  (window as any).__GWL_ANALYTICS__ = {
    track: trackEvent,
    trackCta: trackCtaClick,
    getSummary: getAnalyticsSummary,
    clear: clearAnalyticsData
  };
}
