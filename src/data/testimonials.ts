import { TestimonialItem } from '../types';

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't1',
    author: 'Dr. Rajesh Patel',
    role: 'Medical Director & Founder',
    company: 'Patel Multi-Speciality Clinic',
    industry: 'Healthcare',
    location: 'Ahmedabad, India',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    highlightMetric: '+310%',
    metricLabel: {
      en: 'Patient Inquiries via WhatsApp',
      hi: 'व्हाट्सएप के जरिए मरीज पूछताछ',
      es: 'Consultas de pacientes por WhatsApp'
    },
    quote: {
      en: 'GWL WebLab redesigned our clinic web presence from scratch. Within 45 days, our Google Maps ranking jumped to #1 in our district, and appointment requests via the instant WhatsApp trigger tripled.',
      hi: 'GWL वेबलैब ने हमारे क्लिनिक की वेब उपस्थिति को शुरू से फिर से तैयार किया। 45 दिनों में, हमारी गूगल मैप्स रैंकिंग जिले में #1 हो गई, और त्वरित व्हाट्सएप पूछताछ 3 गुना बढ़ गई।',
      es: 'GWL WebLab rediseñó la presencia web de nuestra clínica desde cero. En 45 días, nuestra posición en Google Maps subió al #1 en el distrito y las citas triplicaron.'
    },
    serviceTag: 'Website + Local Google Maps Pack',
    verified: true
  },
  {
    id: 't2',
    author: 'Elena Rostova',
    role: 'Managing Partner',
    company: 'Apex Legal & Corporate Advisory',
    industry: 'Legal & Corporate',
    location: 'Madrid, Spain',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    highlightMetric: '1.05s',
    metricLabel: {
      en: 'Average Page Load Time',
      hi: 'औसत पेज लोड समय',
      es: 'Tiempo promedio de carga'
    },
    quote: {
      en: 'We had serious doubts about hiring an agency after two bad experiences with bloated WordPress templates. GWL WebLab delivered a custom engineered, blazingly fast site. Corporate lead inquiries increased by 4.2x in the first quarter.',
      hi: 'दो खराब अनुभवों के बाद हमारे मन में एजेंसी के बारे में संदेह था। GWL वेबलैब ने एक कस्टम इंजीनियर्ड, बेहद तेज वेबसाइट दी। पहली तिमाही में कॉर्पोरेट लीड पूछताछ 4.2 गुना बढ़ गई।',
      es: 'Teníamos serias dudas tras dos malas experiencias previas. GWL WebLab entregó un sitio diseñado a medida y sumamente rápido. Las consultas corporativas aumentaron 4.2 veces en el primer trimestre.'
    },
    serviceTag: 'High-Performance Corporate Web',
    verified: true
  },
  {
    id: 't3',
    author: 'Vikramaditya Singhania',
    role: 'Chief Executive Officer',
    company: 'Singhania Industrial Logistics',
    industry: 'B2B Logistics & Freight',
    location: 'Mumbai, India',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    highlightMetric: '4.8x',
    metricLabel: {
      en: 'Quote Request Conversion Rate',
      hi: 'कोटेशन अनुरोध रूपांतरण दर',
      es: 'Tasa de conversión de cotizaciones'
    },
    quote: {
      en: 'Their focus on sales flow and zero-fluff engineering is unmatched. Rather than giving us meaningless animations, they built an interactive quote estimator and inquiry funnel that pays for itself every single week.',
      hi: 'बिक्री प्रवाह और सटीक इंजीनियरिंग पर उनका ध्यान बेजोड़ है। व्यर्थ एनिमेशन के बजाय, उन्होंने एक इंटरैक्टिव कोटेशन अनुमानक बनाया जो हर हफ्ते अपनी लागत वसूल करता है।',
      es: 'Su enfoque en embudos de ventas e ingeniería limpia es incomparable. Construyeron un estimador de cotizaciones interactivo que genera un retorno rentable cada semana.'
    },
    serviceTag: 'B2B Portal & Conversion Architecture',
    verified: true
  },
  {
    id: 't4',
    author: 'Sofia Mendoza',
    role: 'Founder & Head of Operations',
    company: 'Lumina Skin & Aesthetics',
    industry: 'Aesthetic Wellness',
    location: 'Barcelona, Spain',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    highlightMetric: '+240%',
    metricLabel: {
      en: 'Consultation Bookings',
      hi: 'परामर्श बुकिंग में वृद्धि',
      es: 'Reservas de consultas'
    },
    quote: {
      en: 'The clean glassmorphic aesthetic perfectly represents our premium clinic aesthetic. Prospective clients constantly mention how trustworthy and modern our booking portal feels on mobile.',
      hi: 'साफ-सुथरी और प्रीमियम डिजाइन हमारे क्लिनिक के स्तर से बिल्कुल मेल खाती है। नए ग्राहक अक्सर बताते हैं कि मोबाइल पर हमारा पोर्टल कितना आधुनिक और भरोसेमंद लगता है।',
      es: 'La estética limpia y sofisticada representa fielmente el nivel de nuestra clínica. Los clientes destacan constantemente la confianza y rapidez que transmite en móviles.'
    },
    serviceTag: 'Luxury Aesthetic & Mobile Funnel',
    verified: true
  },
  {
    id: 't5',
    author: 'Ananya Sharma',
    role: 'Director of Admissions',
    company: 'Horizon Academy & STEM Labs',
    industry: 'Education & EdTech',
    location: 'Bengaluru, India',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    highlightMetric: '99.4%',
    metricLabel: {
      en: 'Google PageSpeed Score',
      hi: 'गूगल पेजस्पीड स्कोर',
      es: 'Puntaje Google PageSpeed'
    },
    quote: {
      en: 'Parents used to drop off halfway during our registration form. GWL WebLab built a multi-step, interactive onboarding experience that reduced form drop-offs by 64%. The transparent pricing and timeline gave us total confidence.',
      hi: 'अभिभावक पहले हमारे फॉर्म में बीच में ही छोड़ देते थे। GWL वेबलैब ने एक मल्टी-स्टेप ऑनबोर्डिंग अनुभव तैयार किया जिसने फॉर्म ड्रॉप-ऑफ को 64% कम कर दिया।',
      es: 'Los padres solían abandonar el registro a la mitad. GWL WebLab creó una experiencia guiada paso a paso que redujo el abandono un 64%. Máxima transparencia y cumplimiento puntual.'
    },
    serviceTag: 'Custom Interactive Enrolment App',
    verified: true
  },
  {
    id: 't6',
    author: 'Carlos Delgado',
    role: 'Managing Director',
    company: 'Iberia Prime Properties',
    industry: 'Real Estate & Hospitality',
    location: 'Valencia, Spain',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    highlightMetric: 'Top 3',
    metricLabel: {
      en: 'Regional Google Search Keywords',
      hi: 'क्षेत्रीय गूगल खोज कीवर्ड रैंकिंग',
      es: 'Palabras clave en Google regional'
    },
    quote: {
      en: 'We closed 3 high-value international property deals directly through organic search inquiries within 90 days of launching the new site. The speed, SEO structure, and WhatsApp routing work like clockwork.',
      hi: 'नई साइट लॉन्च करने के 90 दिनों के भीतर हमने ऑर्गेनिक सर्च पूछताछ से सीधे 3 बड़े सौदे हासिल किए। स्पीड, एसईओ और व्हाट्सएप रूटिंग शानदार काम करते हैं।',
      es: 'Cerramos 3 operaciones inmobiliarias internacionales de alto valor gracias a consultas orgánicas en los primeros 90 días de lanzamiento. Todo funciona con precisión suiza.'
    },
    serviceTag: 'Real Estate Engine + Local Discovery',
    verified: true
  }
];
