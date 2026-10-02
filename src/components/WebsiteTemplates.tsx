import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Smartphone, 
  Tablet, 
  Monitor, 
  X, 
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Briefcase,
  Layers,
  MessageSquare,
  ShieldCheck,
  Pencil,
  Eye,
  Palette,
  Check,
  FileText,
  HeartHandshake,
  PartyPopper,
  Sliders,
  Download,
  Share2,
  Phone,
  Settings2,
  RotateCcw,
  FileJson,
  Server,
  Globe,
  FolderArchive,
  Info,
  HelpCircle,
  Mail,
  MapPin,
  Calendar,
  CheckCheck,
  Star,
  Award,
  Lock,
  RefreshCw,
  Search
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { downloadMultipageZip, CustomizationData } from '../utils/templateZipGenerator';

export interface TemplateFeature {
  title: string;
  desc: string;
}

export interface TemplateFaq {
  q: string;
  a: string;
}

export interface TemplateStat {
  label: string;
  value: string;
}

export interface WebsiteTemplate {
  id: string;
  category: 'healthcare' | 'education' | 'realestate' | 'restaurant' | 'corporate' | 'saas' | 'ecommerce' | 'creator';
  name: string;
  tagline: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  turnaround: string;
  price: string;
  originalPrice: string;
  heroImage: string;
  defaultCta: string;
  highlights: string[];
  techStack: string[];
  primaryColor: string;
  accentColor: string;
  features: TemplateFeature[];
  stats: TemplateStat[];
  faqs: TemplateFaq[];
  sampleMetrics: {
    lighthouse: number;
    speedIndex: string;
    fcp: string;
  };
}

export const TEMPLATES_DATA: WebsiteTemplate[] = [
  {
    id: 'apex-clinic',
    category: 'healthcare',
    name: 'Apex Care & Multispecialty Clinic',
    tagline: 'High-converting patient appointment booking & triage funnel with local Google Maps schema.',
    badge: 'DOCTORS & CLINICS',
    rating: 4.9,
    reviewsCount: 38,
    turnaround: '3-4 Business Days',
    price: 'FREE',
    originalPrice: '₹24,999',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Book Appointment',
    highlights: [
      '5-Page Turnkey Architecture (Home, About, Services, Pricing, Contact)',
      '100% Free For Now — Zero Setup Fee',
      '1-Click WhatsApp Instant Doctor Booking Hook',
      'OPD Slot Schedule & Consultation Fee Calculator',
      'Google Maps & Clinic Hours Schema (Local Pack Top 3)',
      'Doctor Bio, Verified Degrees & Patient Testimonials'
    ],
    techStack: ['HTML5', 'Tailwind CSS', 'Schema.org', 'WhatsApp API'],
    primaryColor: '#059669',
    accentColor: '#0284c7',
    stats: [
      { label: 'Happy Patients', value: '12,500+' },
      { label: 'Specialist Doctors', value: '18+' },
      { label: 'Google Rating', value: '4.9 ★' }
    ],
    features: [
      { title: 'OPD Slot Scheduler', desc: 'Patients pick morning/evening slots directly syncing to doctor WhatsApp triage.' },
      { title: 'Emergency Call Bar', desc: 'Sticky call & directions buttons for mobile users in acute pain.' },
      { title: 'Local SEO Medical Schema', desc: 'MedicalBusiness structured data configured for Google Local 3-Pack rank.' },
      { title: 'Diagnostic Lab Tests Matrix', desc: 'Pre-consultation blood test and radiology checklists with fee breakdown.' },
      { title: 'Doctor Credentials & Bio', desc: 'Displays MD/MS qualifications, hospital affiliations, and verified case studies.' },
      { title: 'Digital Prescription Gateway', desc: 'Patients can request prescription refills and follow-up slots with 1 tap.' }
    ],
    faqs: [
      { q: 'How do patients book an appointment?', a: 'Patients select their preferred specialty and time slot, which formats an instant WhatsApp message to your clinic front desk.' },
      { q: 'Can I add my clinic timing and doctor photos?', a: 'Yes! All clinic hours, doctor profiles, and emergency phone numbers are 100% customizable.' },
      { q: 'Does this template work on shared hosting like Hostinger or cPanel?', a: 'Yes, it compiles to clean, pure HTML/CSS that works on ANY hosting provider with zero database setup.' }
    ],
    sampleMetrics: {
      lighthouse: 99,
      speedIndex: '0.8s',
      fcp: '0.6s'
    }
  },
  {
    id: 'georgians-edtech',
    category: 'education',
    name: 'EduVanguard Academy & Coaching Institute',
    tagline: 'Dual-language admissions engine for schools, coaching centers and entrance exam institutes.',
    badge: 'COACHING & EDTECH',
    rating: 5.0,
    reviewsCount: 52,
    turnaround: '4-5 Business Days',
    price: 'FREE',
    originalPrice: '₹29,999',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Apply For Admission',
    highlights: [
      '5-Page Turnkey Architecture (Home, About, Batches, Pricing, Contact)',
      '100% Free For Now — Zero Setup Fee',
      'Dual Language English & Hindi Student Switcher',
      'Fee Structure & Batch Timing Matrix',
      'Direct WhatsApp Admission Query Automation',
      'Ranker Hall of Fame & Toppers Gallery'
    ],
    techStack: ['HTML5', 'Tailwind', 'Bilingual Engine', 'Core Web Vitals 100'],
    primaryColor: '#2563eb',
    accentColor: '#38bdf8',
    stats: [
      { label: 'Students Enrolled', value: '4,800+' },
      { label: 'Top 100 AIR Ranks', value: '42' },
      { label: 'Selection Ratio', value: '94.2%' }
    ],
    features: [
      { title: 'Admission Inbound Engine', desc: 'Pre-filled WhatsApp inquiries with student class, target year, and batch interest.' },
      { title: 'Faculty & Toppers Showcase', desc: 'Trust-building testimonials, exam ranks, and alumni success stories.' },
      { title: 'Syllabus PDF Lead Magnet', desc: 'Captures parent phone numbers before downloading entrance exam guides.' },
      { title: 'Batch Timetable & Classroom View', desc: 'Displays morning, evening, and weekend batches with seat availability.' },
      { title: 'Fee Installments Calculator', desc: 'Clear scholarship slabs and installment breakdown with zero hidden fees.' },
      { title: 'Parent-Teacher Meet Tracker', desc: 'Notice board for upcoming test series dates and mock analysis reports.' }
    ],
    faqs: [
      { q: 'Can I publish student topper photos and ranks?', a: 'Yes! The Hall of Fame grid allows easy updates with photos, percentile scores, and badges.' },
      { q: 'Does it support both English and Hindi?', a: 'Yes, the language toggle switch allows prospective students to read course details in their preferred language.' },
      { q: 'How do parents inquire for admission?', a: 'Parents click "Apply for Admission" and their student details are sent directly to the admissions counselor on WhatsApp.' }
    ],
    sampleMetrics: {
      lighthouse: 100,
      speedIndex: '0.7s',
      fcp: '0.5s'
    }
  },
  {
    id: 'aurum-realestate',
    category: 'realestate',
    name: 'Aurum Luxury Living & Real Estate',
    tagline: 'High-ticket property portfolio with interactive floor plans, neighborhood map and VIP site booking.',
    badge: 'REAL ESTATE & ARCHITECTURE',
    rating: 4.9,
    reviewsCount: 29,
    turnaround: '5-7 Business Days',
    price: 'FREE',
    originalPrice: '₹39,999',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Book Private Site Visit',
    highlights: [
      '5-Page Turnkey Architecture (Home, Properties, Floor Plans, Pricing, Contact)',
      '100% Free For Now — Zero Setup Fee',
      'Interactive 3D Floor Plan & Gallery Slider',
      'WhatsApp VIP Site Visit Booking Hook',
      'EMI & Down Payment Financial Calculator',
      'Neighborhood Amenity Distances Map'
    ],
    techStack: ['Next-Gen Images', 'Interactive Sliders', 'Mortgage Calc', 'Tailwind'],
    primaryColor: '#d97706',
    accentColor: '#f59e0b',
    stats: [
      { label: 'Units Delivered', value: '350+' },
      { label: 'Sq. Ft. Built', value: '1.2M+' },
      { label: 'Investor ROI', value: '18.4%' }
    ],
    features: [
      { title: 'Site Visit Scheduler', desc: 'Automated date-picker connecting prospective buyers directly to sales managers.' },
      { title: 'Interactive EMI Estimator', desc: 'Allows buyers to calculate monthly mortgage and price per sqft.' },
      { title: 'Luxury Brochure Lead Wall', desc: 'Captures verified investor contact data before PDF brochure download.' },
      { title: 'Neighborhood Distances Map', desc: 'Key landmarks: Airport (15 mins), Metro (3 mins), International School (5 mins).' },
      { title: 'Floor Plan Configuration Matrix', desc: '3 BHK Grand, 4 BHK Sky Villa, and Penthouse carpet area breakdowns.' },
      { title: 'RERA Compliance & Approvals', desc: 'Clear legal disclosures, approved banks, and construction milestone photos.' }
    ],
    faqs: [
      { q: 'Can I add multiple project locations?', a: 'Yes! The architecture supports single flagship towers as well as multi-project residential portfolios.' },
      { q: 'Is the EMI calculator included?', a: 'Yes, an interactive mortgage estimation tool is pre-configured and responsive.' },
      { q: 'Where are lead details sent?', a: 'Inquiries route straight to your sales desk on WhatsApp and can also be saved via contact email.' }
    ],
    sampleMetrics: {
      lighthouse: 98,
      speedIndex: '0.9s',
      fcp: '0.7s'
    }
  },
  {
    id: 'gusto-bistro',
    category: 'restaurant',
    name: 'Gusto Artisan Bistro & Specialty Cafe',
    tagline: 'Mouthwatering culinary landing site with digital QR menu, table reservation engine and catering inquiries.',
    badge: 'RESTAURANTS & CAFES',
    rating: 4.8,
    reviewsCount: 44,
    turnaround: '3-4 Business Days',
    price: 'FREE',
    originalPrice: '₹19,999',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Reserve a Table',
    highlights: [
      '5-Page Turnkey Architecture (Home, Story, Full Menu, Reservations, Contact)',
      '100% Free For Now — Zero Setup Fee',
      'Instant Table Reservation synced to WhatsApp & SMS',
      'Interactive Dish Allergen & Dietary Filter (Veg / Non-Veg)',
      '1-Tap Google Reviews Booster Link',
      'Zomato & Swiggy Direct Ordering Redirection'
    ],
    techStack: ['QR Menu Engine', 'Tailwind CSS', 'Schema Restaurant', 'WhatsApp'],
    primaryColor: '#e11d48',
    accentColor: '#fb7185',
    stats: [
      { label: 'Guests Served', value: '45,000+' },
      { label: 'Artisan Dishes', value: '60+' },
      { label: 'Zomato Rating', value: '4.8 ★' }
    ],
    features: [
      { title: 'Digital Menu with Price Toggles', desc: 'Customers browse items without slow PDF downloads or clunky menus.' },
      { title: 'VIP Table Reservation', desc: 'Direct guest count, date, and special celebration requests via WhatsApp.' },
      { title: '5-Star Google Review Magnet', desc: 'Delivers satisfied patrons to leave reviews directly on Google Maps.' },
      { title: 'Chef Special & Weekend Brunches', desc: 'Spotlight seasonal ingredients, wine pairing notes, and daily specials.' },
      { title: 'Private Party & Catering Form', desc: 'Corporate dinners, birthday parties, and banquet inquiry lead capture.' },
      { title: 'Instagram Foodie Grid Feed', desc: 'Auto-styled aesthetic visual carousel highlighting your most viral dishes.' }
    ],
    faqs: [
      { q: 'Can customers see prices and dietary tags?', a: 'Yes! Items feature vegetarian, vegan, gluten-free tags and clear pricing.' },
      { q: 'How does table booking work?', a: 'Guests select date, time, and party size, which sends a pre-filled booking to your host station.' },
      { q: 'Can I replace the food photos with my dishes?', a: 'Yes! Upload your own food imagery or use the provided royalty-free culinary photos.' }
    ],
    sampleMetrics: {
      lighthouse: 100,
      speedIndex: '0.6s',
      fcp: '0.5s'
    }
  },
  {
    id: 'apex-legal',
    category: 'corporate',
    name: 'Veritas Legal Chambers & Corporate Advisory',
    tagline: 'Authoritative, trust-centered digital footprint for advocates, chartered accountants and consulting firms.',
    badge: 'LEGAL & CORPORATE',
    rating: 4.9,
    reviewsCount: 31,
    turnaround: '4-5 Business Days',
    price: 'FREE',
    originalPrice: '₹34,999',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Book Confidential Consult',
    highlights: [
      '5-Page Turnkey Architecture (Home, Practice, Team, Retainers, Contact)',
      '100% Free For Now — Zero Setup Fee',
      'Confidential Case Evaluation Intake Form',
      'Practice Area Directory (GST, Corporate, Litigation)',
      'Partner Credentials, Bar Council Compliance & Bio Cards',
      'Client Retention Legal Blog & Newsletter Hook'
    ],
    techStack: ['Encrypted Form', 'Compliance Schema', 'Corporate UI', 'Tailwind'],
    primaryColor: '#0f766e',
    accentColor: '#14b8a6',
    stats: [
      { label: 'Cases Resolved', value: '1,400+' },
      { label: 'Corporate Clients', value: '120+' },
      { label: 'Years Experience', value: '22+' }
    ],
    features: [
      { title: 'Confidential Client Intake', desc: 'Secured case briefing form delivering lead directly to senior partners.' },
      { title: 'Practice Areas Grid', desc: 'Clear breakdown of legal services, consultation retainers, and scope.' },
      { title: 'Professional Credibility', desc: 'Bar council compliant disclosures, publications, and landmark cases.' },
      { title: 'Senior Partners Directory', desc: 'High-court advocates, solicitors, and tax counsel bio cards with credentials.' },
      { title: 'Corporate Retainer Packages', desc: 'Transparent tiered legal advisory plans for startups and enterprises.' },
      { title: 'Regulatory Updates Bulletin', desc: 'Brief summary feed of recent GST circulars, tax amendments, and court judgments.' }
    ],
    faqs: [
      { q: 'Is this template compliant with Bar Council rules?', a: 'Yes! It is architected strictly as an informational portfolio without solicitous advertising.' },
      { q: 'Can corporate clients book retainers directly?', a: 'Yes, retainer tiers are outlined with direct consultation scheduling.' },
      { q: 'Can I add multiple office branches?', a: 'Yes! Multiple chamber addresses, email desks, and phone numbers are supported.' }
    ],
    sampleMetrics: {
      lighthouse: 99,
      speedIndex: '0.7s',
      fcp: '0.5s'
    }
  },
  {
    id: 'cloudscale-saas',
    category: 'saas',
    name: 'CloudScale AI & Tech SaaS Platform',
    tagline: 'Modern Silicon-Valley style product landing page with interactive pricing tiers, demo video modal and feature tabs.',
    badge: 'TECH & SAAS',
    rating: 5.0,
    reviewsCount: 65,
    turnaround: '4-6 Business Days',
    price: 'FREE',
    originalPrice: '₹44,999',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Start Free Trial',
    highlights: [
      '5-Page Turnkey Architecture (Home, Product, Solutions, Pricing, Contact)',
      '100% Free For Now — Zero Setup Fee',
      'Monthly / Annual Pricing Switcher with Discount Tag',
      'Interactive Feature Breakdown with Live Tabs',
      'Client Social Proof Marquee & Logo Showcase',
      'Sub-Second Next.js / Vite Static Edge Delivery'
    ],
    techStack: ['HTML5', 'Tailwind CSS', 'Vite', 'Global Edge CDN'],
    primaryColor: '#6366f1',
    accentColor: '#818cf8',
    stats: [
      { label: 'Active Users', value: '180K+' },
      { label: 'API Calls/Day', value: '45M+' },
      { label: 'Uptime SLA', value: '99.99%' }
    ],
    features: [
      { title: 'Interactive Tier Switcher', desc: 'Users toggle Monthly/Annual pricing with instant calculated savings.' },
      { title: 'Interactive Demo Modal', desc: 'Clean popup player to showcase SaaS screen recordings and UI tours.' },
      { title: 'Conversion Hook CTA', desc: 'Lead capture with validation syncing directly to CRM or WhatsApp.' },
      { title: 'API Documentation Teaser', desc: 'Code snippets in cURL, Python, and TypeScript showcasing developer velocity.' },
      { title: 'Security & Compliance Badges', desc: 'SOC2 Type II, GDPR, and ISO 27001 trust badges displayed prominently.' },
      { title: 'Changelog & Product Updates', desc: 'Monthly release notes component keeping users informed of new features.' }
    ],
    faqs: [
      { q: 'Can I integrate my signup webhook or Stripe link?', a: 'Yes! Buttons can point to your app authentication URL or checkout.' },
      { q: 'Does it support dark and clean mode?', a: 'Yes, the UI is styled for sleek modern contrast and readability.' },
      { q: 'Can I export this to Vercel or Netlify?', a: 'Yes! The downloaded ZIP is 100% static and deploys to Vercel/Netlify in 10 seconds.' }
    ],
    sampleMetrics: {
      lighthouse: 99,
      speedIndex: '0.6s',
      fcp: '0.4s'
    }
  },
  {
    id: 'velvet-d2c',
    category: 'ecommerce',
    name: 'Velvet & Oak Direct-to-Consumer Brand',
    tagline: 'Hypnotic storefront for fashion, artisanal cosmetics and luxury lifestyle consumer goods.',
    badge: 'D2C & ECOMMERCE',
    rating: 4.9,
    reviewsCount: 47,
    turnaround: '5-7 Business Days',
    price: 'FREE',
    originalPrice: '₹34,999',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Explore Collection',
    highlights: [
      '5-Page Turnkey Architecture (Home, Catalog, Story, Packages, Contact)',
      '100% Free For Now — Zero Setup Fee',
      'WhatsApp Quick Buy & Cash On Delivery (COD) Checkout',
      'Lookbook & Video Reel Showcase Carousel',
      'Customer Unboxing Video & Verified Review Grid',
      'Zero Shopify 2% Transaction Fee — Full Code Ownership'
    ],
    techStack: ['Headless Catalog', 'WhatsApp Checkout', 'Tailwind', 'PWA Ready'],
    primaryColor: '#7c3aed',
    accentColor: '#a78bfa',
    stats: [
      { label: 'Orders Shipped', value: '28,000+' },
      { label: 'Repeat Customers', value: '68%' },
      { label: '5-Star Reviews', value: '4,200+' }
    ],
    features: [
      { title: 'WhatsApp 1-Tap Checkout', desc: 'Shoppers complete orders directly on WhatsApp with address and item SKU.' },
      { title: 'High-Converting Lookbook', desc: 'Visual lifestyle photo grids with direct "Shop the Look" hotspots.' },
      { title: 'Verified Customer Reviews', desc: 'Authentic photo ratings showcasing real customer delight.' },
      { title: 'Size Guide & Fit Predictor', desc: 'Interactive dimensions table preventing costly customer returns.' },
      { title: 'COD & Free Returns Policy', desc: 'Builds instant buyer trust with guarantees and tracking links.' },
      { title: 'Artisanal Batch Countdown', desc: 'Scarcity banner for limited-edition drops and festive discount codes.' }
    ],
    faqs: [
      { q: 'Do I have to pay monthly Shopify fees?', a: 'No! You own 100% of this storefront with zero monthly platform cuts or commissions.' },
      { q: 'How does WhatsApp checkout work?', a: 'Customers select the product, and clicking "Buy" formats a WhatsApp order with SKU and shipping info.' },
      { q: 'Can I add multiple product categories?', a: 'Yes! The catalog supports tabs for Clothing, Accessories, Home Decor, and more.' }
    ],
    sampleMetrics: {
      lighthouse: 98,
      speedIndex: '0.8s',
      fcp: '0.6s'
    }
  },
  {
    id: 'creator-studio',
    category: 'creator',
    name: 'PulseMedia Creator & Influencer Portfolio',
    tagline: 'Modern personal brand platform with media kit, sponsor booking calendar, podcast/video showcase and link-in-bio.',
    badge: 'CREATOR & INFLUENCER',
    rating: 5.0,
    reviewsCount: 61,
    turnaround: '3-4 Business Days',
    price: 'FREE',
    originalPrice: '₹19,999',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    defaultCta: 'Work With Me',
    highlights: [
      '5-Page Turnkey Architecture (Home, Media Kit, Collaborations, Rates, Contact)',
      '100% Free For Now — Zero Setup Fee',
      'Dynamic Media Kit with Real-Time Follower Stats',
      'Direct Brand Deal Inquiry & Sponsored Post Intake',
      'Integrated YouTube / Spotify / Newsletter Feed',
      'Custom Link-In-Bio Subpage (Replaces paid Linktree)'
    ],
    techStack: ['Media Kit Engine', 'Tailwind CSS', 'Vite', 'Schema.org'],
    primaryColor: '#059669',
    accentColor: '#10b981',
    stats: [
      { label: 'Follower Reach', value: '750K+' },
      { label: 'Brand Collaborations', value: '85+' },
      { label: 'Monthly Views', value: '14.2M' }
    ],
    features: [
      { title: 'Media Kit & Sponsor Deck', desc: 'Displays verified reach, audience demographics, and past brand campaigns.' },
      { title: 'Instant Consultation Slot', desc: 'Followers book and pay for 30-minute mentorship or audit calls.' },
      { title: 'Brand Inquiry Fast-Track', desc: 'Routes PR agencies and brands directly to creator management WhatsApp.' },
      { title: 'Sponsorship Rate Card', desc: 'Transparent pricing for Dedicated YouTube Videos, Instagram Reels, and Newsletters.' },
      { title: 'Recent Collaborations Grid', desc: 'Showcase brand logos and embed high-performing viral video links.' },
      { title: 'Custom Link-In-Bio Engine', desc: 'Modern personal link hub eliminating the need for paid subscription tools.' }
    ],
    faqs: [
      { q: 'Can PR agencies download my media kit?', a: 'Yes! The media kit has verified statistics and a 1-click download spec.' },
      { q: 'Does it replace paid Linktree accounts?', a: 'Yes! It includes a dedicated mobile-optimized link-in-bio page.' },
      { q: 'Can brands book sponsorships directly?', a: 'Yes! Sponsors submit brand deliverables, timeline, and budget straight to your WhatsApp.' }
    ],
    sampleMetrics: {
      lighthouse: 100,
      speedIndex: '0.6s',
      fcp: '0.4s'
    }
  }
];

const PRESET_COLORS = [
  { name: 'Emerald', hex: '#059669' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Teal', hex: '#0f766e' },
  { name: 'Violet', hex: '#7c3aed' }
];

type SimPage = 'home' | 'about' | 'services' | 'pricing' | 'contact';

interface WebsiteTemplatesProps {
  onSelectTemplateForInquiry?: (templateName: string) => void;
}

export const WebsiteTemplates: React.FC<WebsiteTemplatesProps> = ({ onSelectTemplateForInquiry }) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [studioTab, setStudioTab] = useState<'preview' | 'customize'>('preview');

  // Multipage simulation state
  const [activeSimPage, setActiveSimPage] = useState<SimPage>('home');

  // Live in-template customization state
  const [liveBrand, setLiveBrand] = useState<string>('');
  const [liveHeadline, setLiveHeadline] = useState<string>('');
  const [livePhone, setLivePhone] = useState<string>('+91 97550 61139');
  const [liveEmail, setLiveEmail] = useState<string>('contact@business.com');
  const [liveAddress, setLiveAddress] = useState<string>('Medical Plaza / Commercial Towers, Central Avenue');
  const [liveHours, setLiveHours] = useState<string>('Mon – Sat: 09:00 AM – 08:00 PM (Emergency 24/7)');
  const [liveAboutStory, setLiveAboutStory] = useState<string>('');
  const [liveColor, setLiveColor] = useState<string>('#059669');
  const [liveCta, setLiveCta] = useState<string>('Book Appointment');

  // Modals
  const [bookingConfirmationTemplate, setBookingConfirmationTemplate] = useState<WebsiteTemplate | null>(null);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  // Global overlay and escape listeners to prevent trapping users
  React.useEffect(() => {
    const handleDismiss = () => {
      setSelectedTemplate(null);
      setBookingConfirmationTemplate(null);
      setIsHostingGuideOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('close-all-overlays', handleDismiss);
    window.addEventListener('hashchange', handleDismiss);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('close-all-overlays', handleDismiss);
      window.removeEventListener('hashchange', handleDismiss);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenTemplate = (template: WebsiteTemplate, tab: 'preview' | 'customize' = 'preview') => {
    setSelectedTemplate(template);
    setStudioTab(tab);
    setActiveSimPage('home');
    setLiveBrand(template.name);
    setLiveHeadline(template.tagline);
    setLiveColor(template.primaryColor);
    setLivePhone('+91 97550 61139');
    setLiveEmail(`contact@${template.id}.com`);
    setLiveAddress('Central Commercial Complex, MG Road');
    setLiveHours('Mon – Sat: 09:00 AM – 08:00 PM');
    setLiveAboutStory(`${template.name} is dedicated to delivering industry-leading excellence, customer-first service, and transparent outcomes.`);
    setLiveCta(template.defaultCta);
  };

  const handleCloseStudio = () => {
    setSelectedTemplate(null);
  };

  const handleResetCustomizations = () => {
    if (!selectedTemplate) return;
    setLiveBrand(selectedTemplate.name);
    setLiveHeadline(selectedTemplate.tagline);
    setLiveColor(selectedTemplate.primaryColor);
    setLivePhone('+91 97550 61139');
    setLiveEmail(`contact@${selectedTemplate.id}.com`);
    setLiveAddress('Central Commercial Complex, MG Road');
    setLiveHours('Mon – Sat: 09:00 AM – 08:00 PM');
    setLiveAboutStory(`${selectedTemplate.name} is dedicated to delivering industry-leading excellence.`);
    setLiveCta(selectedTemplate.defaultCta);
  };

  const handleNavigateTemplate = (direction: 'next' | 'prev') => {
    if (!selectedTemplate) return;
    const currentIndex = TEMPLATES_DATA.findIndex((t) => t.id === selectedTemplate.id);
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % TEMPLATES_DATA.length
      : (currentIndex - 1 + TEMPLATES_DATA.length) % TEMPLATES_DATA.length;
    const nextTemplate = TEMPLATES_DATA[nextIndex];
    setSelectedTemplate(nextTemplate);
    setActiveSimPage('home');
    setLiveBrand(nextTemplate.name);
    setLiveHeadline(nextTemplate.tagline);
    setLiveColor(nextTemplate.primaryColor);
    setLiveCta(nextTemplate.defaultCta);
  };

  const handleSwitchToSection = (sectionId: string) => {
    setSelectedTemplate(null);
    setBookingConfirmationTemplate(null);
    setIsHostingGuideOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी टेम्प्लेट (All)' : 'All Templates' },
    { id: 'healthcare', label: language === 'hi' ? 'डॉक्टर व क्लिनिक' : 'Doctors & Clinics' },
    { id: 'education', label: language === 'hi' ? 'कोचिंग व शिक्षा' : 'Coaching & EdTech' },
    { id: 'realestate', label: language === 'hi' ? 'रियल एस्टेट' : 'Real Estate' },
    { id: 'restaurant', label: language === 'hi' ? 'रेस्तरां व कैफे' : 'Bistro & Cafes' },
    { id: 'corporate', label: language === 'hi' ? 'कॉर्पोरेट व सीए' : 'Corporate & Law' },
    { id: 'saas', label: language === 'hi' ? 'टेक व स्टार्टअप्स' : 'Tech & SaaS' },
    { id: 'ecommerce', label: language === 'hi' ? 'ई-कॉमर्स' : 'D2C & Retail' },
    { id: 'creator', label: language === 'hi' ? 'क्रिएटर स्टोर' : 'Creator Storefronts' }
  ];

  const filteredTemplates = activeCategory === 'all'
    ? TEMPLATES_DATA
    : TEMPLATES_DATA.filter((t) => t.category === activeCategory);

  const handleInitiateClaim = (template: WebsiteTemplate) => {
    if (!liveBrand || selectedTemplate?.id !== template.id) {
      setLiveBrand(template.name);
      setLiveHeadline(template.tagline);
      setLiveColor(template.primaryColor);
      setLivePhone('+91 97550 61139');
      setLiveCta(template.defaultCta);
    }
    setBookingConfirmationTemplate(template);
  };

  // God-tier WhatsApp message generator
  const handleWhatsAppOrder = (template: WebsiteTemplate) => {
    const brand = liveBrand.trim() || template.name;
    const headline = liveHeadline.trim() || template.tagline;
    const phone = livePhone.trim() || '+91 97550 61139';
    const color = liveColor || template.primaryColor;
    const cta = liveCta.trim() || template.defaultCta;

    const lines = [
      '✨ *GWL WEBLAB — VIP MULTIPAGE TEMPLATE RESERVATION & FREE SETUP* ✨',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '👋 *Namaste & Hello GWL WebLab Engineering Team,*',
      '',
      `I have customized the *${template.name}* (Full 5-Page Multipage Architecture: Home, About, Services, Pricing, Contact) on your studio and would like to claim the *100% Free Turnkey Setup* for my business!`,
      '',
      '🏢 *MY CUSTOMIZED BUSINESS CONFIGURATION:*',
      `• *Base Architecture:* ${template.name} (${template.badge})`,
      `• *My Business Name:* ${brand}`,
      `• *Headline / Tagline:* "${headline}"`,
      `• *Chosen Accent Color:* ${color}`,
      `• *Official Phone / WhatsApp:* ${phone}`,
      `• *Official Email:* ${liveEmail}`,
      `• *Physical Address:* ${liveAddress}`,
      `• *Primary CTA Button:* "${cta}"`,
      '',
      '🎁 *ACTIVE PROMOTION:*',
      `• *Setup Fee:* 100% FREE FOR NOW (Saved ${template.originalPrice} • ₹0 Setup Cost)`,
      `• *Turnaround SLA:* ${template.turnaround}`,
      '• *Ownership:* 100% Full Ownership • Zero Recurring Platform Fees',
      '',
      '⚡ *INCLUDED MULTIPAGE SPECIFICATIONS:*',
      '✅ 5 Fully Responsive HTML Pages (Home, About, Services, Pricing, Contact)',
      '✅ Sub-Second Mobile Speed (98+ Core Web Vitals Guaranteed)',
      '✅ Direct 1-Tap WhatsApp Lead Engine & Call Action Bar',
      '✅ Google Local 3-Pack Schema.org Structured Data',
      '✅ Works on Any Hosting (cPanel, Hostinger, Netlify, Vercel, or Apache)',
      '',
      'Please review my brief and connect with me to launch our digital system. Looking forward to our launch! 🚀',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ];
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/919755061139?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Download complete multipage ZIP package for their hosting
  const handleDownloadZipPackage = async (template: WebsiteTemplate) => {
    try {
      setIsZipping(true);
      const customData: CustomizationData = {
        businessName: liveBrand,
        tagline: liveHeadline,
        phone: livePhone,
        email: liveEmail,
        address: liveAddress,
        primaryColor: liveColor,
        ctaText: liveCta,
        aboutStory: liveAboutStory,
        workingHours: liveHours
      };
      await downloadMultipageZip(template, customData);
    } catch (err) {
      console.error('Error creating ZIP bundle:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleOpenCustomInquiry = (template: WebsiteTemplate) => {
    if (onSelectTemplateForInquiry) {
      onSelectTemplateForInquiry(`Multipage Template: ${template.name} (${template.price})`);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="templates" 
      className="py-24 sm:py-32 relative bg-neutral-950/40 border-t border-white/5 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Quick Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Viewing:</span>
            <span className="text-emerald-400 font-bold">Multipage Web Engine Studio</span>
            <span className="hidden md:inline px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px]">5 Pages Included</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-neutral-500 text-[11px] mr-1 hidden sm:inline">Switch to Section:</span>
            <button
              type="button"
              onClick={() => handleSwitchToSection('home')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3 h-3 text-emerald-400" />
              <span>Home</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchToSection('services')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Briefcase className="w-3 h-3 text-cyan-400" />
              <span>Services</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchToSection('plans')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Layers className="w-3 h-3 text-teal-400" />
              <span>Plans</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchToSection('contact')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Turnkey Multipage Web Engines</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Full <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Multipage Websites</span> You Can Edit & Host Anywhere
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/30 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>🎉 ALL TEMPLATES ARE MULTIPAGE (HOME, ABOUT, SERVICES, PRICING, CONTACT) & 100% FREE FOR NOW</span>
          </div>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Every template is a complete, production-grade 5-page website. Test interactions, customize your branding live, and download the ready-to-upload ZIP package to use on your own hosting — or let us deploy it for you completely free!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12 max-w-5xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/25 border border-emerald-400'
                    : 'glass-card text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col group hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/15"
            >
              {/* Media Preview Header with Browser Chrome Bar */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-neutral-900 flex flex-col">
                {/* Simulated Window Chrome Bar */}
                <div className="bg-neutral-950/90 px-3 py-1.5 border-b border-white/10 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-neutral-400 font-mono truncate max-w-[170px]">
                    <Lock className="w-2.5 h-2.5 text-emerald-400" />
                    <span>https://{template.id}.in</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">5 Pages</div>
                </div>

                <div className="relative flex-grow overflow-hidden">
                  <img
                    src={template.heroImage}
                    alt={template.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                    {template.badge}
                  </div>

                  {/* Multipage Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/50">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{template.sampleMetrics.lighthouse} Score</span>
                  </div>

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => handleOpenTemplate(template, 'preview')}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View 5 Pages</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenTemplate(template, 'customize')}
                      className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Edit & Host</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Server className="w-3.5 h-3.5" />
                    <span>Host on Any Provider</span>
                  </span>
                  <span className="text-neutral-400">⭐ {template.rating} ({template.reviewsCount} reviews)</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {template.name}
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                  {template.tagline}
                </p>

                {/* Key Metrics Stats Pill Bar */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  {template.stats.map((st, i) => (
                    <div key={i}>
                      <div className="text-xs font-extrabold text-white">{st.value}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Pages List Tag */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['Home', 'About', 'Services', 'Pricing', 'Contact'].map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-neutral-300 font-mono">
                      ✓ {p}
                    </span>
                  ))}
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 mb-6 flex-grow">
                  {template.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Card Footer: Pricing & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                  <div>
                    <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono font-bold">
                      100% Free For Now
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-emerald-400">FREE</span>
                      <span className="text-xs text-neutral-500 line-through">{template.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenTemplate(template, 'preview')}
                      className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                      title="View & Edit Multipage Template"
                    >
                      <Pencil className="w-3 h-3 text-cyan-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInitiateClaim(template)}
                      className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Claim Free</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom Banner & Trust Seal */}
        <div className="mt-16 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-950/30 to-neutral-900/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">Want Free Hosting & Domain Setup Included?</h4>
              <p className="text-xs sm:text-sm text-neutral-400">
                You can download your customized code to host on your own cPanel/Hostinger, or our engineering team will deploy it with free SSL at ₹0 setup cost.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsHostingGuideOpen(true)}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>How to Host Guide</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Custom Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Live Multipage Studio Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md cursor-pointer overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseStudio();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-neutral-900 border border-white/15 rounded-2xl w-full max-w-6xl h-[95vh] flex flex-col shadow-2xl overflow-hidden cursor-default relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 🌟 PROMINENT FLOATING CLOSE BUTTON (TOP-RIGHT) */}
              <button
                type="button"
                onClick={handleCloseStudio}
                className="absolute top-3 right-3 z-50 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95 border border-red-400/50"
                title="Close Template Studio (Esc)"
              >
                <X className="w-4 h-4" />
                <span>Close Template</span>
                <span className="text-[10px] opacity-75 font-mono hidden sm:inline">(Esc)</span>
              </button>

              {/* Modal Top Bar */}
              <div className="px-3 sm:px-6 py-3 bg-neutral-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0 pr-36">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={handleCloseStudio}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    title="Return to Main Website"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Back to Website</span>
                  </button>

                  <div className="h-4 w-px bg-white/10 hidden sm:block" />

                  {/* Prev / Next Template Switcher */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleNavigateTemplate('prev')}
                      className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 text-xs transition-colors cursor-pointer"
                      title="Previous Template"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigateTemplate('next')}
                      className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 text-xs transition-colors cursor-pointer"
                      title="Next Template"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="truncate">
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate">{liveBrand || selectedTemplate.name}</h3>
                    <p className="text-[10px] text-emerald-400 font-mono truncate hidden md:block">5-Page Multipage Engine • Ready for Any Host</p>
                  </div>
                </div>

                {/* Studio Mode & Device Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* View vs Edit Tab */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setStudioTab('preview')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        studioTab === 'preview' ? 'bg-emerald-500 text-white font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudioTab('customize')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        studioTab === 'customize' ? 'bg-emerald-500 text-white font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Customize</span>
                    </button>
                  </div>

                  {/* Device Switcher */}
                  <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        previewDevice === 'desktop' ? 'bg-white/20 text-white font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                      title="Desktop view"
                    >
                      <Monitor className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('tablet')}
                      className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        previewDevice === 'tablet' ? 'bg-white/20 text-white font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                      title="Tablet view"
                    >
                      <Tablet className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        previewDevice === 'mobile' ? 'bg-white/20 text-white font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Multipage Page Switcher Tabs & Simulated Browser Bar */}
              <div className="px-4 py-2 bg-neutral-950/80 border-b border-white/10 flex items-center justify-between gap-3 overflow-x-auto shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-neutral-400 mr-1 hidden sm:inline">Active Page:</span>
                  {(['home', 'about', 'services', 'pricing', 'contact'] as SimPage[]).map((pageKey) => {
                    const isActive = activeSimPage === pageKey;
                    return (
                      <button
                        key={pageKey}
                        type="button"
                        onClick={() => setActiveSimPage(pageKey)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer flex items-center gap-1 ${
                          isActive
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                        }`}
                      >
                        {pageKey === 'home' && '🏠 Home'}
                        {pageKey === 'about' && 'ℹ️ About Us'}
                        {pageKey === 'services' && '🛠️ Services'}
                        {pageKey === 'pricing' && '🏷️ Pricing'}
                        {pageKey === 'contact' && '📞 Contact'}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsHostingGuideOpen(true)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Server className="w-3 h-3" />
                    <span className="hidden sm:inline">Host Anywhere Guide</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseStudio}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer font-medium pl-2 border-l border-white/10"
                    title="Close"
                  >
                    <X className="w-3 h-3" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* Modal Body: Split view or full preview based on studioTab */}
              <div className="flex-grow bg-neutral-950 overflow-hidden flex flex-col md:flex-row">
                {/* Full Customizer Sidebar */}
                {studioTab === 'customize' && (
                  <div className="w-full md:w-80 lg:w-96 bg-neutral-900/90 border-b md:border-b-0 md:border-r border-white/10 p-4 sm:p-5 overflow-y-auto shrink-0 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white">Full Live Customizer</h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetCustomizations}
                        className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        title="Reset to Defaults"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    </div>

                    {/* Section: General Identity */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1">Your Business Name</label>
                        <input
                          type="text"
                          value={liveBrand}
                          onChange={(e) => setLiveBrand(e.target.value)}
                          placeholder="e.g. Apex Multispecialty Clinic"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1">Tagline / Headline</label>
                        <textarea
                          rows={2}
                          value={liveHeadline}
                          onChange={(e) => setLiveHeadline(e.target.value)}
                          placeholder="e.g. Compassionate healthcare for your family"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1">Primary CTA Button</label>
                        <input
                          type="text"
                          value={liveCta}
                          onChange={(e) => setLiveCta(e.target.value)}
                          placeholder="e.g. Book Appointment"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="text"
                          value={livePhone}
                          onChange={(e) => setLivePhone(e.target.value)}
                          placeholder="+91 97550 61139"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1">Official Email</label>
                        <input
                          type="email"
                          value={liveEmail}
                          onChange={(e) => setLiveEmail(e.target.value)}
                          placeholder="contact@myclinic.com"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1">Physical Address / City</label>
                        <input
                          type="text"
                          value={liveAddress}
                          onChange={(e) => setLiveAddress(e.target.value)}
                          placeholder="Central Commercial Tower, Main Ring Road"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Color Theme Selector */}
                      <div>
                        <label className="block text-xs font-mono text-neutral-300 mb-1.5 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Brand Theme Color</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {PRESET_COLORS.map((col) => (
                            <button
                              key={col.hex}
                              type="button"
                              onClick={() => setLiveColor(col.hex)}
                              className={`w-7 h-7 rounded-full transition-transform cursor-pointer border ${
                                liveColor === col.hex ? 'scale-110 border-white ring-2 ring-emerald-400' : 'border-black/40 hover:scale-105'
                              }`}
                              style={{ backgroundColor: col.hex }}
                              title={col.name}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={liveColor}
                            onChange={(e) => setLiveColor(e.target.value)}
                            className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                          />
                          <span className="text-xs font-mono text-neutral-400">{liveColor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons inside customizer panel */}
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadZipPackage(selectedTemplate)}
                        disabled={isZipping}
                        className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95 disabled:opacity-50"
                      >
                        <FolderArchive className="w-4 h-4" />
                        <span>{isZipping ? 'Generating Package...' : 'Download Multipage ZIP for My Hosting'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInitiateClaim(selectedTemplate)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>Claim Free Turnkey Deployment</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Viewport Simulation Area with Sleek Browser Window Mock */}
                <div className="flex-grow bg-neutral-950 overflow-y-auto p-3 sm:p-6 flex justify-center items-start">
                  <div
                    className={`bg-white text-slate-900 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl ${
                      previewDevice === 'desktop' ? 'w-full max-w-4xl' : previewDevice === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                    }`}
                  >
                    {/* Realistic Chrome Browser Address Bar */}
                    <div className="bg-slate-100 border-b border-slate-300 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <span 
                          onClick={handleCloseStudio}
                          className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 cursor-pointer flex items-center justify-center text-[8px] text-white" 
                          title="Close Template"
                        >
                          ×
                        </span>
                        <span className="w-3 h-3 rounded-full bg-amber-400" />
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      
                      <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-3 py-1 text-[11px] font-mono text-slate-700 shadow-xs max-w-md w-full mx-4">
                        <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">https://{liveBrand.toLowerCase().replace(/[^a-z0-9]/g, '') || 'mybrand'}.com/{activeSimPage}.html</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <span>SSL Active</span>
                      </div>
                    </div>

                    {/* Simulated Site Header with Real Multipage Navigation */}
                    <header className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                      <div 
                        onClick={() => setActiveSimPage('home')}
                        className="font-extrabold text-base sm:text-lg tracking-tight truncate max-w-[200px] cursor-pointer" 
                        style={{ color: liveColor }}
                      >
                        {liveBrand || selectedTemplate.name}
                      </div>

                      <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-600">
                        <button
                          type="button"
                          onClick={() => setActiveSimPage('home')}
                          className={`hover:text-slate-950 cursor-pointer ${activeSimPage === 'home' ? 'font-bold' : ''}`}
                          style={{ color: activeSimPage === 'home' ? liveColor : undefined }}
                        >
                          Home
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSimPage('about')}
                          className={`hover:text-slate-950 cursor-pointer ${activeSimPage === 'about' ? 'font-bold' : ''}`}
                          style={{ color: activeSimPage === 'about' ? liveColor : undefined }}
                        >
                          About
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSimPage('services')}
                          className={`hover:text-slate-950 cursor-pointer ${activeSimPage === 'services' ? 'font-bold' : ''}`}
                          style={{ color: activeSimPage === 'services' ? liveColor : undefined }}
                        >
                          Services
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSimPage('pricing')}
                          className={`hover:text-slate-950 cursor-pointer ${activeSimPage === 'pricing' ? 'font-bold' : ''}`}
                          style={{ color: activeSimPage === 'pricing' ? liveColor : undefined }}
                        >
                          Pricing
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSimPage('contact')}
                          className={`hover:text-slate-950 cursor-pointer ${activeSimPage === 'contact' ? 'font-bold' : ''}`}
                          style={{ color: activeSimPage === 'contact' ? liveColor : undefined }}
                        >
                          Contact
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleWhatsAppOrder(selectedTemplate)}
                        className="px-3.5 py-1.5 rounded-full text-white text-xs font-bold cursor-pointer transition-transform active:scale-95 shadow-sm"
                        style={{ backgroundColor: liveColor }}
                      >
                        {liveCta || selectedTemplate.defaultCta}
                      </button>
                    </header>

                    {/* Dynamic Simulated Page Content */}
                    {activeSimPage === 'home' && (
                      <div>
                        {/* Simulated Hero */}
                        <div className="p-6 sm:p-10 text-center bg-gradient-to-b from-slate-50 to-white">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
                            <Zap className="w-3 h-3 fill-current" />
                            <span>Sub-Second 99+ Core Web Vitals Ready</span>
                          </div>
                          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 max-w-xl mx-auto mb-3 leading-tight">
                            {liveBrand || selectedTemplate.name}
                          </h1>
                          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                            {liveHeadline || selectedTemplate.tagline}
                          </p>
                          <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <button
                              type="button"
                              onClick={() => handleWhatsAppOrder(selectedTemplate)}
                              className="px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-transform active:scale-95"
                              style={{ backgroundColor: liveColor }}
                            >
                              {liveCta || selectedTemplate.defaultCta}
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveSimPage('services')}
                              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 cursor-pointer"
                            >
                              Explore 5 Pages
                            </button>
                          </div>

                          {/* Hero Image with Floating Trust Badge */}
                          <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 relative">
                            <img
                              src={selectedTemplate.heroImage}
                              alt="Hero preview"
                              className="w-full h-48 sm:h-64 object-cover"
                            />
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-md flex items-center gap-2 text-xs font-bold text-slate-900">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              <span>Verified Industry Architecture</span>
                            </div>
                          </div>
                        </div>

                        {/* Stats Highlights Bar */}
                        <div className="py-4 px-6 bg-slate-100 border-y border-slate-200 grid grid-cols-3 gap-2 text-center">
                          {selectedTemplate.stats.map((st, i) => (
                            <div key={i}>
                              <div className="text-base sm:text-lg font-extrabold text-slate-900" style={{ color: liveColor }}>{st.value}</div>
                              <div className="text-[11px] text-slate-500 font-medium">{st.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Simulated Features Overview */}
                        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
                          <h2 className="text-base font-bold text-center text-slate-900 mb-6">Engineered Deliverables & Modules</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {selectedTemplate.features.map((feat, i) => (
                              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                                <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{feat.title}</h4>
                                <p className="text-slate-600 text-xs">{feat.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer Testimonials & Reviews */}
                        <div className="p-6 sm:p-8 bg-white border-t border-slate-200">
                          <h2 className="text-base font-bold text-center text-slate-900 mb-1">What Clients & Customers Say</h2>
                          <p className="text-center text-slate-500 text-xs mb-6">Verified satisfaction ratings from real engagements</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                              <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                                {'★'.repeat(5)}
                              </div>
                              <p className="text-slate-700 text-xs leading-relaxed mb-3">
                                "The speed and mobile WhatsApp booking workflow completely changed our patient volume. Super responsive and elegant!"
                              </p>
                              <div className="text-xs font-bold text-slate-900">Dr. R. Sharma — Senior Consultant</div>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                              <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                                {'★'.repeat(5)}
                              </div>
                              <p className="text-slate-700 text-xs leading-relaxed mb-3">
                                "Zero monthly Shopify or WordPress fees, sub-second load times on mobile, and immediate client inquiries."
                              </p>
                              <div className="text-xs font-bold text-slate-900">Ananya Verma — Brand Director</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSimPage === 'about' && (
                      <div className="p-6 sm:p-10 bg-white">
                        <div className="text-center max-w-xl mx-auto mb-8">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">Who We Are</span>
                          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">About {liveBrand || selectedTemplate.name}</h2>
                          <p className="text-slate-600 text-xs sm:text-sm mt-2">
                            {liveAboutStory || `${liveBrand || selectedTemplate.name} is built on uncompromising quality, customer-first transparency, and proven results.`}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-8">
                          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                            <img src={selectedTemplate.heroImage} alt="About Us" className="w-full h-48 object-cover" />
                          </div>
                          <div className="space-y-3 text-xs text-slate-700">
                            <h3 className="font-bold text-sm text-slate-950">Our Verified Standards</h3>
                            <div className="flex items-center gap-2">
                              <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Sub-second mobile performance guarantee (98+ Core Web Vitals)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>100% full code ownership — Zero monthly platform fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Dedicated WhatsApp triage & local Google Maps schema</span>
                            </div>
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={() => setActiveSimPage('contact')}
                                className="px-4 py-2 rounded-lg text-white font-bold text-xs cursor-pointer shadow-sm"
                                style={{ backgroundColor: liveColor }}
                              >
                                Connect with Team
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Frequently Asked Questions */}
                        <div className="mt-8 pt-8 border-t border-slate-200">
                          <h3 className="text-sm font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions</h3>
                          <div className="space-y-3">
                            {selectedTemplate.faqs.map((faq, i) => (
                              <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                                <div className="font-bold text-slate-900 mb-1">{faq.q}</div>
                                <div className="text-slate-600 leading-relaxed">{faq.a}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSimPage === 'services' && (
                      <div className="p-6 sm:p-10 bg-slate-50">
                        <div className="text-center max-w-xl mx-auto mb-8">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">Engineered Solutions</span>
                          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Specialized Offerings</h2>
                          <p className="text-slate-600 text-xs sm:text-sm mt-2">Explore tailored services for {liveBrand || selectedTemplate.name}.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          {selectedTemplate.features.map((feat, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-mono text-slate-400 font-bold">MODULE 0{i + 1}</span>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{feat.title}</h4>
                                <p className="text-slate-600 text-xs mb-4">{feat.desc}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleWhatsAppOrder(selectedTemplate)}
                                className="w-full py-1.5 rounded-lg text-white font-semibold text-xs cursor-pointer"
                                style={{ backgroundColor: liveColor }}
                              >
                                Inquire Regarding Service
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSimPage === 'pricing' && (
                      <div className="p-6 sm:p-10 bg-white">
                        <div className="text-center max-w-xl mx-auto mb-8">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">Predictable Investment</span>
                          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Transparent Packages</h2>
                          <p className="text-slate-600 text-xs sm:text-sm mt-2">Zero hidden platform lock-in. Full ownership of your digital assets.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
                            <h4 className="font-bold text-slate-900 text-sm">Essential Launch</h4>
                            <div className="text-xl font-extrabold text-slate-950 my-2">₹14,999</div>
                            <p className="text-xs text-slate-500 mb-4">Complete starter package</p>
                            <button
                              type="button"
                              onClick={() => handleWhatsAppOrder(selectedTemplate)}
                              className="w-full py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
                            >
                              Choose Plan
                            </button>
                          </div>

                          <div className="p-5 rounded-xl border-2 border-emerald-500 bg-white text-center shadow-lg relative">
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                              POPULAR
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm">Growth Accelerator</h4>
                            <div className="text-xl font-extrabold text-emerald-600 my-2">₹24,999</div>
                            <p className="text-xs text-slate-500 mb-4">End-to-end local SEO + Booking</p>
                            <button
                              type="button"
                              onClick={() => handleWhatsAppOrder(selectedTemplate)}
                              className="w-full py-2 rounded-lg text-white text-xs font-bold cursor-pointer shadow-md"
                              style={{ backgroundColor: liveColor }}
                            >
                              Select Growth
                            </button>
                          </div>

                          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
                            <h4 className="font-bold text-slate-900 text-sm">Enterprise</h4>
                            <div className="text-xl font-extrabold text-slate-950 my-2">₹44,999</div>
                            <p className="text-xs text-slate-500 mb-4">Custom CRM & Multi-Location</p>
                            <button
                              type="button"
                              onClick={() => handleWhatsAppOrder(selectedTemplate)}
                              className="w-full py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
                            >
                              Request Custom
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSimPage === 'contact' && (
                      <div className="p-6 sm:p-10 bg-slate-50">
                        <div className="text-center max-w-xl mx-auto mb-8">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">Get in Touch</span>
                          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Contact {liveBrand || selectedTemplate.name}</h2>
                          <p className="text-slate-600 text-xs sm:text-sm mt-2">Connect directly with our team or schedule an appointment.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                          <div className="space-y-4 text-xs text-slate-700 bg-white p-5 rounded-xl border border-slate-200">
                            <div>
                              <strong className="block text-slate-900 font-semibold mb-0.5">📞 Phone / WhatsApp:</strong>
                              <span className="font-mono text-emerald-700">{livePhone}</span>
                            </div>
                            <div>
                              <strong className="block text-slate-900 font-semibold mb-0.5">✉️ Official Email:</strong>
                              <span className="font-mono">{liveEmail}</span>
                            </div>
                            <div>
                              <strong className="block text-slate-900 font-semibold mb-0.5">📍 Location:</strong>
                              <span>{liveAddress}</span>
                            </div>
                            <div>
                              <strong className="block text-slate-900 font-semibold mb-0.5">⏰ Operating Hours:</strong>
                              <span>{liveHours}</span>
                            </div>
                          </div>

                          <div className="bg-white p-5 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-900 text-sm mb-3">Instant Booking Hook</h4>
                            <div className="space-y-2 mb-3">
                              <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                                defaultValue="Sumit Sharma"
                              />
                              <textarea
                                rows={2}
                                placeholder="Service required"
                                className="w-full p-2 text-xs border border-slate-200 rounded-lg resize-none"
                                defaultValue="Interested in priority consultation"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleWhatsAppOrder(selectedTemplate)}
                              className="w-full py-2 rounded-lg text-white font-bold text-xs cursor-pointer shadow-md"
                              style={{ backgroundColor: liveColor }}
                            >
                              Dispatch to WhatsApp
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Direct Contact Bar */}
                    <div className="p-6 bg-slate-900 text-white text-center">
                      <h3 className="text-sm sm:text-base font-bold mb-1">Ready to launch {liveBrand || selectedTemplate.name} on your domain?</h3>
                      <p className="text-xs text-slate-400 mb-4">5 Full Pages • Sub-Second Speed • Host on Any Provider</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDownloadZipPackage(selectedTemplate)}
                          disabled={isZipping}
                          className="px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95 disabled:opacity-50"
                        >
                          <FolderArchive className="w-4 h-4" />
                          <span>{isZipping ? 'Zipping...' : 'Download Multipage ZIP for My Host'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInitiateClaim(selectedTemplate)}
                          className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
                        >
                          <MessageSquare className="w-4 h-4 fill-current" />
                          <span>Claim Free Turnkey Deployment (₹0)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Customization Controls */}
              <div className="px-4 sm:px-6 py-3 bg-neutral-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="hidden sm:inline font-mono">Customized Brand:</span>
                  <span className="text-white font-semibold">{liveBrand || selectedTemplate.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseStudio}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <X className="w-3.5 h-3.5 text-red-400" />
                    <span>Close Studio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadZipPackage(selectedTemplate)}
                    disabled={isZipping}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isZipping ? 'Preparing...' : 'Download ZIP for Hosting'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInitiateClaim(selectedTemplate)}
                    className="px-4 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-transform active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Claim Free Setup</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🌟 Self-Hosting Guide Modal */}
      <AnimatePresence>
        {isHostingGuideOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsHostingGuideOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-900 border border-cyan-500/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative cursor-default my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 p-6 sm:p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <button
                    type="button"
                    onClick={() => setIsHostingGuideOpen(false)}
                    className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <Server className="w-4 h-4 text-cyan-200" />
                  <span>Host On Any Provider</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  How to Use on Your Own Hosting
                </h3>
                <p className="text-cyan-50 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Your customized template generates a 100% static, dependency-free website that runs instantly on any server with zero monthly platform tax.
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10">
                  <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">1</span>
                    <span>cPanel / Hostinger / Shared Web Hosting</span>
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-1">
                    Download the ZIP file. Open your hosting <strong>File Manager</strong>, navigate to <strong>public_html</strong>, upload and extract the files (<code className="text-cyan-300">index.html, about.html, services.html, pricing.html, contact.html, style.css</code>). Your site is immediately live!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10">
                  <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">2</span>
                    <span>Netlify or Vercel (100% Free with Automatic SSL)</span>
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-1">
                    Unzip the downloaded folder on your computer. Drag and drop the folder directly into the Netlify or Vercel dashboard. Your website is live with global CDN edge delivery in ~10 seconds!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/30 bg-emerald-950/10">
                  <h4 className="font-bold text-emerald-300 text-sm mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs">3</span>
                    <span>Prefer Free White-Glove Launch by GWL WebLab?</span>
                  </h4>
                  <p className="text-neutral-300 text-xs leading-relaxed mt-1">
                    If you don't want to deal with domain DNS, SSL certificates, or servers, our team will deploy it on your domain with 99+ Core Web Vitals for free under our active promotion!
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsHostingGuideOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer"
                  >
                    Got It, Close Guide
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🌟 God-Tier Booking Confirmation & VIP Setup Modal */}
      <AnimatePresence>
        {bookingConfirmationTemplate && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setBookingConfirmationTemplate(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-900 border border-emerald-500/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative cursor-default my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glowing Header Banner */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <button
                    type="button"
                    onClick={() => setBookingConfirmationTemplate(null)}
                    className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-xs">
                  <PartyPopper className="w-4 h-4 text-amber-200" />
                  <span>VIP Reservation Confirmed</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  Welcome to the GWL WebLab Family!
                </h3>
                <p className="text-emerald-50 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Your customized <strong className="text-white underline">{liveBrand || bookingConfirmationTemplate.name}</strong> 5-page launch slot is locked in at 100% Free Setup. Zero hidden fees, zero recurring platform tax.
                </p>
              </div>

              {/* Confirmation Details & Next Steps */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Summary Card */}
                <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 font-mono">Your Business Name:</span>
                    <span className="font-bold text-white">{liveBrand || bookingConfirmationTemplate.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 font-mono">Included Architecture:</span>
                    <span className="font-bold text-cyan-300">5 Pages (Home, About, Services, Pricing, Contact)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 font-mono">Commercial Cost:</span>
                    <span className="font-extrabold text-emerald-400">₹0 (100% Free Promotion • Saved {bookingConfirmationTemplate.originalPrice})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 font-mono">Turnaround SLA:</span>
                    <span className="font-medium text-neutral-300">{bookingConfirmationTemplate.turnaround}</span>
                  </div>
                </div>

                {/* What Happens Next Journey */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-emerald-400" />
                    <span>Your 3-Step White-Glove Launch Journey</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="font-bold text-emerald-400 mb-1">1. VIP Handshake</div>
                      <p className="text-neutral-400 leading-relaxed">Our senior engineer connects directly on WhatsApp within 15 minutes.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="font-bold text-teal-400 mb-1">2. Customization</div>
                      <p className="text-neutral-400 leading-relaxed">We insert your real logo, services, doctor/faculty bios, and phone.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="font-bold text-cyan-400 mb-1">3. Live Launch</div>
                      <p className="text-neutral-400 leading-relaxed">Deployed on your domain or provided as clean ZIP for your hosting.</p>
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleWhatsAppOrder(bookingConfirmationTemplate);
                      setBookingConfirmationTemplate(null);
                    }}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Dispatch VIP WhatsApp Handshake (+91 97550 61139)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadZipPackage(bookingConfirmationTemplate)}
                    disabled={isZipping}
                    className="py-3.5 px-4 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-cyan-500/40 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <FolderArchive className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isZipping ? 'Preparing...' : 'Download ZIP for My Host'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WebsiteTemplates;
