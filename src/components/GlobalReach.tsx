import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Globe2,
  MapPin,
  Activity,
  Wifi,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Building,
  GraduationCap,
  HeartPulse,
  Languages,
  Layers,
  Server,
  Compass,
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export interface ClientLocationNode {
  id: string;
  name: string;
  clientType: 'client' | 'edge';
  category: 'education' | 'healthcare' | 'language' | 'edtech' | 'infrastructure';
  city: string;
  region: string;
  country: string;
  coordinates: { x: number; y: number }; // percentage on 2D map (0-100)
  globeCoords: { lat: number; lng: number }; // latitude, longitude for 3D projection
  tagline: string;
  impactSnippet?: string;
  deliverables: string[];
  metrics: string;
  ping: string;
  status: string;
  accentColor: string;
  hasCaseStudy?: boolean;
  projectTargetId?: string;
}

export const CLIENT_LOCATIONS: ClientLocationNode[] = [
  {
    id: 'georgians-academy',
    name: 'Georgians Academy',
    clientType: 'client',
    category: 'education',
    city: 'Morar Cantt & Bada Gaon',
    region: 'Gwalior, Madhya Pradesh',
    country: 'India',
    coordinates: { x: 70.2, y: 46.5 },
    globeCoords: { lat: 26.22, lng: 78.23 },
    tagline: 'Premier Coaching Institute for Class 1 to 12 (PCM)',
    impactSnippet: '+185% increase in student admissions via localized bilingual portal & instant WhatsApp enrollment triage.',
    deliverables: ['Bilingual EN/HI Platform', 'WhatsApp Admission Engine', 'Digital Smart Classroom Showcase'],
    metrics: '+185% Inbound Admissions',
    ping: '8ms',
    status: 'Live Client Deployment',
    accentColor: '#eab308',
    hasCaseStudy: true,
    projectTargetId: 'portfolio-item-georgians-academy'
  },
  {
    id: 'yanshi-physiotherapy',
    name: 'Yanshi Physiotherapy Center',
    clientType: 'client',
    category: 'healthcare',
    city: 'M.H. Chauraha, Morar',
    region: 'Gwalior, Madhya Pradesh',
    country: 'India',
    coordinates: { x: 70.5, y: 47.1 },
    globeCoords: { lat: 26.21, lng: 78.24 },
    tagline: 'Advanced Clinical Physiotherapy & Pain Rehabilitation',
    impactSnippet: 'Zero-friction online patient booking triage eliminating manual phone booking bottlenecks for 6 rehabilitation disciplines.',
    deliverables: ['Online Appointment Booking Form', 'Direct Patient WhatsApp Care', '6 Clinical Disciplines Taxonomy'],
    metrics: 'Zero-Friction Booking',
    ping: '9ms',
    status: 'Live Client Deployment',
    accentColor: '#0fb9b1',
    hasCaseStudy: true,
    projectTargetId: 'portfolio-item-yanshi-physiotherapy'
  },
  {
    id: 'brightedge-academy',
    name: 'BrightEdge Academy',
    clientType: 'client',
    category: 'edtech',
    city: 'Virtual Campus / Pan-India',
    region: 'National Online EdTech',
    country: 'India',
    coordinates: { x: 69.2, y: 44.8 },
    globeCoords: { lat: 28.61, lng: 77.20 },
    tagline: 'Next-Gen Online Coaching for Biology, Chemistry & Maths (NEET)',
    impactSnippet: 'Pan-India student portal with Dark/Light theme toggle and automated GST tuition fee calculations.',
    deliverables: ['Dark/Light Mode Theme Toggle', 'Student LMS Portal UI', 'Automated GST Pricing Calculator'],
    metrics: 'NEET & Board Foundation',
    ping: '12ms',
    status: 'Live Client Deployment',
    accentColor: '#00f0ff',
    hasCaseStudy: true,
    projectTargetId: 'portfolio-item-brightedge-academy'
  },
  {
    id: 'tell-well-institute',
    name: 'Tell Well English Institute',
    clientType: 'client',
    category: 'language',
    city: 'Gwalior Center',
    region: 'Gwalior, Madhya Pradesh',
    country: 'India',
    coordinates: { x: 69.8, y: 46.8 },
    globeCoords: { lat: 26.22, lng: 78.18 },
    tagline: 'Practical Spoken English, Grammar & Personality Development',
    impactSnippet: 'High-converting mobile-first funnel with 1-click WhatsApp student counseling and instant lead capture.',
    deliverables: ['Instant 1-Click WhatsApp Funnel', 'High-Converting Clean Landing', 'Curriculum Showcase'],
    metrics: 'Instant Student Inbound',
    ping: '10ms',
    status: 'Live Client Deployment',
    accentColor: '#22c55e',
    hasCaseStudy: true,
    projectTargetId: 'portfolio-item-tell-well-institute'
  },
  {
    id: 'mumbai-edge',
    name: 'Mumbai Commercial Node',
    clientType: 'edge',
    category: 'infrastructure',
    city: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    coordinates: { x: 68.6, y: 49.5 },
    globeCoords: { lat: 19.07, lng: 72.87 },
    tagline: 'Digital Commerce, Payment Gateway & High-Volume Routing',
    impactSnippet: 'Sub-15ms edge routing, payment webhook processing, and local database read replicas.',
    deliverables: ['Edge Database Read Replicas', 'Payment Webhook Reliability', 'Sub-second SSR'],
    metrics: '< 15ms Indian Subcontinent',
    ping: '14ms',
    status: 'High-Throughput Node',
    accentColor: '#a855f7'
  },
  {
    id: 'dubai-edge',
    name: 'Dubai / GCC Gateway',
    clientType: 'edge',
    category: 'infrastructure',
    city: 'Dubai',
    region: 'Middle East & Gulf',
    country: 'UAE',
    coordinates: { x: 61.2, y: 43.6 },
    globeCoords: { lat: 25.20, lng: 55.27 },
    tagline: 'International Services & Multi-Currency Commerce Edge',
    impactSnippet: 'GCC low-latency edge cache delivering fast multi-language Arabic & English client assets.',
    deliverables: ['Low-Latency GCC Edge Cache', 'Multi-Language Arabic/English', 'Regional CDN Mesh'],
    metrics: 'Global CDN Connected',
    ping: '28ms',
    status: 'Active Regional Edge',
    accentColor: '#f59e0b'
  },
  {
    id: 'london-edge',
    name: 'London European Hub',
    clientType: 'edge',
    category: 'infrastructure',
    city: 'London',
    region: 'Western Europe',
    country: 'United Kingdom',
    coordinates: { x: 48.5, y: 28.2 },
    globeCoords: { lat: 51.50, lng: -0.12 },
    tagline: 'Enterprise Full-Stack Architecture & Cloud Edge',
    impactSnippet: 'GDPR-compliant Jamstack edge serverless cluster providing 99.99% European uptime.',
    deliverables: ['Jamstack Edge Serverless', 'GDPR-Compliant Analytics', 'Anycast Routing'],
    metrics: '99.99% Node Uptime',
    ping: '32ms',
    status: 'Active Global Node',
    accentColor: '#3b82f6'
  },
  {
    id: 'nyc-edge',
    name: 'New York Anycast Edge',
    clientType: 'edge',
    category: 'infrastructure',
    city: 'New York',
    region: 'East Coast',
    country: 'United States',
    coordinates: { x: 27.2, y: 34.0 },
    globeCoords: { lat: 40.71, lng: -74.00 },
    tagline: 'High-Availability Cloudflare & Vercel Global Anycast Hub',
    impactSnippet: 'Anycast DDoS protection and automatic edge failover ensuring sub-40ms North American speeds.',
    deliverables: ['DDoS Protection Layer', 'Automatic Edge Failover', 'Global Asset Compression'],
    metrics: 'Sub-40ms North America',
    ping: '38ms',
    status: 'Global CDN Mesh',
    accentColor: '#ec4899'
  },
  {
    id: 'singapore-edge',
    name: 'Singapore APAC Hub',
    clientType: 'edge',
    category: 'infrastructure',
    city: 'Singapore',
    region: 'Southeast Asia',
    country: 'Singapore',
    coordinates: { x: 77.8, y: 55.6 },
    globeCoords: { lat: 1.35, lng: 103.81 },
    tagline: 'Fast Southeast Asian Content Delivery & Edge Compute',
    impactSnippet: 'Edge compute and real-time WebSocket layer for high-speed Southeast Asian client delivery.',
    deliverables: ['APAC Edge Compute', 'Dynamic Asset Routing', 'Real-time WebSocket Layer'],
    metrics: 'Sub-25ms East Asia',
    ping: '22ms',
    status: 'Active Global Node',
    accentColor: '#10b981'
  }
];

interface GlobalReachProps {
  onSelectClientForInquiry?: (clientName: string) => void;
  className?: string;
}

type FilterCategory = 'all' | 'clients' | 'india' | 'global';
type ViewMode = 'map' | 'globe';

export const GlobalReach: React.FC<GlobalReachProps> = ({
  onSelectClientForInquiry,
  className = ''
}) => {
  const { themeConfig } = useTheme();
  const { t } = useLanguage();

  const [selectedNode, setSelectedNode] = useState<ClientLocationNode>(CLIENT_LOCATIONS[0]);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [globeRotation, setGlobeRotation] = useState<number>(75); // Center on India/Asia
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const rotationRef = useRef<number | null>(null);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    switch (filter) {
      case 'clients':
        return CLIENT_LOCATIONS.filter((n) => n.clientType === 'client');
      case 'india':
        return CLIENT_LOCATIONS.filter((n) => n.country === 'India');
      case 'global':
        return CLIENT_LOCATIONS.filter((n) => n.country !== 'India');
      default:
        return CLIENT_LOCATIONS;
    }
  }, [filter]);

  // Smooth Globe Rotation Loop
  useEffect(() => {
    if (viewMode !== 'globe' || !isRotating) return;

    const interval = setInterval(() => {
      setGlobeRotation((prev) => (prev + 0.35) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [viewMode, isRotating]);

  // Category Icon resolver
  const getCategoryIcon = (category: ClientLocationNode['category']) => {
    switch (category) {
      case 'education':
        return GraduationCap;
      case 'healthcare':
        return HeartPulse;
      case 'language':
        return Languages;
      case 'edtech':
        return Sparkles;
      default:
        return Server;
    }
  };

  // 3D Sphere projection calculator for Globe View
  const getSphereCoordinates = (node: ClientLocationNode) => {
    const radius = 130; // Radius in pixels
    const cx = 170; // Center X
    const cy = 170; // Center Y

    // Calculate relative longitude based on rotation
    const adjustedLng = (node.globeCoords.lng - globeRotation + 540) % 360 - 180;
    const isVisible = adjustedLng > -90 && adjustedLng < 90;

    const latRad = (node.globeCoords.lat * Math.PI) / 180;
    const lngRad = (adjustedLng * Math.PI) / 180;

    const x = cx + radius * Math.cos(latRad) * Math.sin(lngRad);
    const y = cy - radius * Math.sin(latRad);
    const scale = Math.cos(latRad) * Math.cos(lngRad);

    return { x, y, isVisible, scale };
  };

  const handleScrollToCaseStudy = (targetId?: string) => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);

  const handleMarkerClick = (node: ClientLocationNode) => {
    setSelectedNode(node);
    setActiveTooltipId((prev) => (prev === node.id ? null : node.id));
    setIsRotating(false);
  };

  const handleCloseTooltip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveTooltipId(null);
    setIsRotating(true);
  };

  const activeGlobeNode = useMemo(() => {
    if (!activeTooltipId) return null;
    const node = CLIENT_LOCATIONS.find((n) => n.id === activeTooltipId);
    if (!node) return null;
    const coords = getSphereCoordinates(node);
    return { node, coords };
  }, [activeTooltipId, globeRotation]);

  const activeMapNode = useMemo(() => {
    if (!activeTooltipId) return null;
    return filteredNodes.find((n) => n.id === activeTooltipId);
  }, [activeTooltipId, filteredNodes]);

  const renderTooltipCard = (node: ClientLocationNode) => {
    const Icon = getCategoryIcon(node.category);
    return (
      <div className="relative">
        {/* Glow behind card */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-20 blur-md pointer-events-none"
          style={{ backgroundColor: node.accentColor }}
        />

        <div className="relative">
          {/* Top Header Row */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${node.accentColor}25`,
                  border: `1px solid ${node.accentColor}60`
                }}
              >
                <Icon className="w-3 h-3" style={{ color: node.accentColor }} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                {node.clientType === 'client' ? 'Client Impact' : 'Edge Infrastructure'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCloseTooltip}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Client's Name */}
          <h4 className="font-display font-bold text-white text-sm sm:text-base leading-snug">
            {node.name}
          </h4>

          {/* Location */}
          <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1 font-mono">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>{node.city}, {node.country}</span>
          </div>

          {/* Impact Metric Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold mt-2"
            style={{
              backgroundColor: `${node.accentColor}18`,
              color: node.accentColor,
              border: `1px solid ${node.accentColor}40`
            }}
          >
            <TrendingUp className="w-3 h-3" />
            <span>Impact: {node.metrics}</span>
          </div>

          {/* Brief Snippet of Project Impact */}
          <div className="mt-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Project Impact Snippet</span>
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed font-sans">
              {node.impactSnippet || node.tagline}
            </p>
          </div>

          {/* Interactive Action Buttons */}
          {node.hasCaseStudy ? (
            <button
              type="button"
              onClick={() => {
                handleCloseTooltip();
                handleScrollToCaseStudy(node.projectTargetId);
              }}
              className="w-full mt-2.5 py-2 px-3 rounded-xl text-xs font-bold tooltip-accent-btn flex items-center justify-center gap-1.5 transition-all shadow-md hover:brightness-110 cursor-pointer"
              style={{ backgroundColor: node.accentColor, color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>Explore Live Client Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" style={{ color: '#ffffff' }} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleCloseTooltip();
                onSelectClientForInquiry?.(node.name);
              }}
              className="w-full mt-2.5 py-2 px-3 rounded-xl text-xs font-bold tooltip-accent-btn flex items-center justify-center gap-1.5 transition-all shadow-md hover:brightness-110 cursor-pointer"
              style={{ backgroundColor: node.accentColor, color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>Inquire Deployment</span>
              <ArrowRight className="w-3.5 h-3.5" style={{ color: '#ffffff' }} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="reach"
      aria-label="GWL Weblab Global Reach and Client Deployments"
      className={`relative py-20 sm:py-28 overflow-hidden select-none ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Global Client Deployments & Network Reach</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Local Grounding.{' '}
              <span className="theme-gradient-text">Global Engineering Reach.</span>
            </h2>
          </div>

          <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
            Headquartered in Gwalior with active client production systems, high-speed regional CDN edge nodes, and international client delivery across multiple continents.
          </p>
        </div>

        {/* Control Bar: Filters & View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 rounded-2xl glass-card theme-card-bg border border-white/10">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Deployments', count: CLIENT_LOCATIONS.length },
              { id: 'clients', label: 'Client Case Studies', count: 4 },
              { id: 'india', label: 'Gwalior & India', count: 5 },
              { id: 'global', label: 'Global Edge Nodes', count: 4 }
            ].map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as FilterCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'theme-btn-primary shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-inherit' : 'bg-white/10 text-neutral-400'}`}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Interactive Map vs 3D Globe */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setViewMode('globe')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'globe'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>3D Orbital Globe</span>
            </button>
          </div>
        </div>

        {/* Main Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visual Area (Interactive Map or 3D Globe) */}
          <div className="lg:col-span-8 rounded-3xl glass-card theme-card-bg border border-white/10 p-4 sm:p-6 overflow-hidden relative shadow-2xl flex flex-col justify-between min-h-[440px] sm:min-h-[500px]">
            {/* Header Status Bar inside Canvas */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">LIVE DEPLOYMENT MESH</span>
                <span className="text-neutral-400 hidden sm:inline">• Click any marker to view client impact</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <span>Selected: <strong className="text-emerald-400">{selectedNode.city}</strong></span>
                <span className="text-neutral-500 hidden sm:inline">RTT: {selectedNode.ping}</span>
              </div>
            </div>

            {/* Visual Canvas */}
            <div className="relative flex-1 w-full h-full flex items-center justify-center min-h-[340px] sm:min-h-[400px]">
              {viewMode === 'map' ? (
                /* Mode 1: High-Tech World Grid Vector Map */
                <div
                  className="relative w-full h-full flex items-center justify-center overflow-hidden"
                  onClick={() => {
                    if (activeTooltipId) handleCloseTooltip();
                  }}
                >
                  {/* Background Grid Lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

                  {/* World Map SVG Vector Silhouette */}
                  <svg
                    viewBox="0 0 100 60"
                    className="w-full h-full max-h-[380px] pointer-events-none opacity-40"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Continents Silhouettes (Abstract Geo Polygons) */}
                    {/* North America */}
                    <path
                      d="M 12 12 Q 18 10 28 14 Q 34 22 30 34 Q 22 36 18 28 Z"
                      fill="rgba(255,255,255,0.06)"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="0.4"
                    />
                    {/* South America */}
                    <path
                      d="M 28 36 Q 34 40 33 52 Q 27 58 25 46 Z"
                      fill="rgba(255,255,255,0.05)"
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth="0.4"
                    />
                    {/* Europe */}
                    <path
                      d="M 44 14 Q 52 12 56 20 Q 50 28 44 24 Z"
                      fill="rgba(255,255,255,0.06)"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="0.4"
                    />
                    {/* Africa */}
                    <path
                      d="M 46 26 Q 58 25 56 44 Q 50 54 46 38 Z"
                      fill="rgba(255,255,255,0.05)"
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth="0.4"
                    />
                    {/* Asia & India */}
                    <path
                      d="M 58 14 Q 78 12 84 24 Q 76 42 66 48 Q 62 36 58 26 Z"
                      fill="rgba(255,255,255,0.08)"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="0.5"
                    />
                    {/* Australia */}
                    <path
                      d="M 80 44 Q 88 42 86 52 Q 78 54 78 46 Z"
                      fill="rgba(255,255,255,0.05)"
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth="0.4"
                    />

                    {/* Animated Connection Arcs from Gwalior HQ (70.2, 46.5) */}
                    {/* Gwalior to London */}
                    <path
                      d="M 70.2 46.5 Q 58 20 48.5 28.2"
                      fill="none"
                      stroke={themeConfig.primaryColor}
                      strokeWidth="0.5"
                      strokeDasharray="1.5 1.5"
                      className="opacity-70 animate-pulse"
                    />
                    {/* Gwalior to Dubai */}
                    <path
                      d="M 70.2 46.5 Q 65 42 61.2 43.6"
                      fill="none"
                      stroke={themeConfig.accentColor}
                      strokeWidth="0.6"
                      strokeDasharray="1.5 1.5"
                      className="opacity-80"
                    />
                    {/* Gwalior to NYC */}
                    <path
                      d="M 70.2 46.5 Q 48 10 27.2 34.0"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="0.4"
                      strokeDasharray="2 2"
                      className="opacity-50"
                    />
                    {/* Gwalior to Singapore */}
                    <path
                      d="M 70.2 46.5 Q 74 52 77.8 55.6"
                      fill="none"
                      stroke={themeConfig.primaryColor}
                      strokeWidth="0.5"
                      strokeDasharray="1.5 1.5"
                      className="opacity-70"
                    />
                  </svg>

                  {/* Deployment Node Pins */}
                  {filteredNodes.map((node) => {
                    const isSelected = selectedNode.id === node.id;
                    const isTooltipOpen = activeTooltipId === node.id;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkerClick(node);
                        }}
                        onMouseEnter={() => setSelectedNode(node)}
                        style={{
                          left: `${node.coordinates.x}%`,
                          top: `${node.coordinates.y}%`
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                        aria-label={`${node.name}, ${node.city}`}
                        title={`${node.name} - Click to view project impact`}
                      >
                        <div className="relative flex items-center justify-center">
                          {/* Outer pulse wave */}
                          <span
                            className={`absolute rounded-full animate-ping opacity-60 ${
                              isSelected || isTooltipOpen ? 'w-8 h-8' : 'w-4 h-4'
                            }`}
                            style={{ backgroundColor: node.accentColor }}
                          />

                          {/* Glowing node badge */}
                          <div
                            className={`relative rounded-full flex items-center justify-center transition-all duration-300 ${
                              isSelected || isTooltipOpen
                                ? 'w-8 h-8 ring-4 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-110'
                                : 'w-5 h-5 hover:scale-125'
                            } bg-slate-900 border border-white/20`}
                            style={{
                              borderColor: node.accentColor,
                              boxShadow: (isSelected || isTooltipOpen) ? `0 0 16px ${node.accentColor}` : undefined
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: node.accentColor }}
                            />
                          </div>

                          {/* Quick Hover Tooltip Label */}
                          <div
                            className={`absolute -top-7 whitespace-nowrap text-[10px] font-mono px-2 py-0.5 rounded-md pointer-events-none transition-all duration-200 ${
                              isSelected || isTooltipOpen
                                ? 'opacity-100 -translate-y-1 bg-black/90 text-white border border-white/20 shadow-md font-bold'
                                : 'opacity-0 group-hover:opacity-100 bg-slate-900/90 text-neutral-300'
                            }`}
                          >
                            {node.city}
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Interactive Tooltip Card for Map */}
                  <AnimatePresence>
                    {activeMapNode && (
                      <div
                        style={{
                          position: 'absolute',
                          left: `${Math.min(Math.max(activeMapNode.coordinates.x, 22), 78)}%`,
                          top: `${Math.min(Math.max(activeMapNode.coordinates.y, 25), 75)}%`,
                          transform: 'translate(-50%, -100%) translateY(-14px)',
                          zIndex: 50
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.div
                          key={`map-tooltip-${activeMapNode.id}`}
                          initial={{ opacity: 0, scale: 0.9, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className="w-[265px] sm:w-[290px] p-3 sm:p-3.5 rounded-2xl bg-[#090e1c]/95 border shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-left pointer-events-auto"
                          style={{ borderColor: `${activeMapNode.accentColor}60` }}
                        >
                          {renderTooltipCard(activeMapNode)}
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Mode 2: 3D Interactive Rotating Orbital Globe */
                <div
                  className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center"
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {
                    if (!activeTooltipId) setIsRotating(true);
                  }}
                  onClick={() => {
                    if (activeTooltipId) handleCloseTooltip();
                  }}
                >
                  {/* Globe Base Sphere & Atmospheric Glow */}
                  <div
                    className="relative w-[340px] h-[340px] rounded-full border border-emerald-500/25 flex items-center justify-center shadow-[inset_0_0_60px_rgba(16,185,129,0.15)]"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, rgba(16,185,129,0.15) 0%, rgba(10,14,23,0.95) 70%)'
                    }}
                  >
                    {/* Concentric latitude & longitude rings */}
                    <div className="absolute w-[336px] h-[336px] rounded-full border border-white/5 pointer-events-none" />
                    <div className="absolute w-[240px] h-[240px] rounded-full border border-white/5 pointer-events-none" />
                    <div className="absolute w-[140px] h-[140px] rounded-full border border-white/5 pointer-events-none" />
                    <div className="absolute w-full h-px bg-white/10 pointer-events-none" />
                    <div className="absolute h-full w-px bg-white/10 pointer-events-none" />

                    {/* Orbiting Axis Indicator */}
                    <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-slate-900 border border-white/10 text-[9px] font-mono text-emerald-400">
                      ROTATION: {Math.round(globeRotation)}°
                    </div>

                    {/* Globe Nodes Projected in 3D Perspective */}
                    <div className="absolute inset-0">
                      {CLIENT_LOCATIONS.map((node) => {
                        const { x, y, isVisible, scale } = getSphereCoordinates(node);
                        if (!isVisible) return null;

                        const isSelected = selectedNode.id === node.id;
                        const isTooltipOpen = activeTooltipId === node.id;

                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkerClick(node);
                            }}
                            style={{
                              left: `${x}px`,
                              top: `${y}px`,
                              opacity: Math.max(0.2, scale),
                              transform: `translate(-50%, -50%) scale(${0.75 + scale * 0.4})`
                            }}
                            className="absolute z-20 group cursor-pointer"
                            title={`${node.name} - Click to view project impact`}
                          >
                            <div className="relative flex items-center justify-center">
                              {(isSelected || isTooltipOpen) && (
                                <span
                                  className="absolute w-8 h-8 rounded-full animate-ping opacity-60"
                                  style={{ backgroundColor: node.accentColor }}
                                />
                              )}
                              <div
                                className={`rounded-full flex items-center justify-center p-1.5 transition-all ${
                                  isSelected || isTooltipOpen
                                    ? 'ring-2 shadow-[0_0_15px_rgba(16,185,129,0.7)] scale-110'
                                    : 'hover:scale-125'
                                } bg-slate-900 border`}
                                style={{ borderColor: node.accentColor }}
                              >
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: node.accentColor }}
                                />
                              </div>

                              <span
                                className={`absolute -bottom-5 whitespace-nowrap text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-white border border-white/10 ${
                                  isSelected || isTooltipOpen ? 'opacity-100 font-bold' : 'opacity-0 group-hover:opacity-100'
                                }`}
                              >
                                {node.name}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Interactive Tooltip Card for Clicked Globe Marker */}
                    <AnimatePresence>
                      {activeGlobeNode && activeGlobeNode.coords.isVisible && (
                        <div
                          style={{
                            position: 'absolute',
                            left: activeGlobeNode.coords.x > 170
                              ? `${Math.max(-20, activeGlobeNode.coords.x - 285)}px`
                              : `${Math.min(65, activeGlobeNode.coords.x + 18)}px`,
                            top: `${Math.min(Math.max(-20, activeGlobeNode.coords.y - 70), 160)}px`,
                            zIndex: 50
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <motion.div
                            key={`globe-tooltip-${activeGlobeNode.node.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 6 }}
                            transition={{ duration: 0.2 }}
                            className="w-[265px] sm:w-[290px] p-3 sm:p-3.5 rounded-2xl bg-[#090e1c]/95 border shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-left pointer-events-auto"
                            style={{ borderColor: `${activeGlobeNode.node.accentColor}60` }}
                          >
                            {renderTooltipCard(activeGlobeNode.node)}
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Legend & Live Telemetry Strip */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Client Platforms</span>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Edge Infrastructure</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero downtime across regional edge clusters</span>
              </div>
            </div>
          </div>

          {/* Right Column: Node Inspector & Case Study Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl glass-card theme-card-bg border border-white/10 p-6 shadow-2xl relative overflow-hidden"
              >
                {/* Glow accent */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{ background: selectedNode.accentColor }}
                />

                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${selectedNode.accentColor}20`,
                      color: selectedNode.accentColor,
                      border: `1px solid ${selectedNode.accentColor}40`
                    }}
                  >
                    {selectedNode.status}
                  </span>

                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    <span>{selectedNode.ping}</span>
                  </span>
                </div>

                {/* Node Title & City */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                  {selectedNode.name}
                </h3>

                <p className="text-xs text-neutral-400 flex items-center gap-1 mb-3 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{selectedNode.city}, {selectedNode.region}</span>
                </p>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {selectedNode.tagline}
                </p>

                {/* Project Impact Snippet Card */}
                {selectedNode.impactSnippet && (
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mb-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>Project Impact Snippet</span>
                    </div>
                    <p className="text-xs text-[var(--theme-text-main)] leading-relaxed font-sans">
                      {selectedNode.impactSnippet}
                    </p>
                  </div>
                )}

                {/* Deliverables List */}
                <div className="space-y-1.5 mb-5 pb-4 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Engineered Capabilities:
                  </span>
                  {selectedNode.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics Highlight Box */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between mb-5">
                  <span className="text-xs text-neutral-400 font-mono">System Metric</span>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: selectedNode.accentColor }}
                  >
                    {selectedNode.metrics}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  {selectedNode.hasCaseStudy ? (
                    <button
                      type="button"
                      onClick={() => handleScrollToCaseStudy(selectedNode.projectTargetId)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold theme-btn-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>View Live Client Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectClientForInquiry?.(`Deployment Inquiry for ${selectedNode.city} Edge`)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold theme-btn-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Inquire for {selectedNode.city} Region</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <a
                    href="#contact"
                    className="w-full py-2 px-4 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-center cursor-pointer"
                  >
                    Request Global Performance Audit
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Deployment Stats Card */}
            <div className="rounded-2xl glass-card theme-card-bg border border-white/10 p-4 grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-bold font-mono text-emerald-400">4+ Live</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Client Platforms</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-bold font-mono text-cyan-400">&lt; 35ms</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Avg Edge RTT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
