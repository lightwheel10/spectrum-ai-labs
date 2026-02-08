import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaHospital, FaMicrophone } from 'react-icons/fa';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiScales } from 'react-icons/gi';
import { BsCashCoin } from 'react-icons/bs';
import { HiLink } from 'react-icons/hi';
import { RiRobot2Fill } from 'react-icons/ri';
import Image from 'next/image';

// Types for our data structures
type ChatMessage = {
  text: string;
  isBot: boolean;
};

type Tool = {
  name: string;
  logo: string;
};

type IndustryName = "E-commerce" | "Real Estate" | "Legal" | "Finance" | "Healthcare";

// Industry-specific chat messages
const industryChats: Record<IndustryName, ChatMessage[]> = {
  "E-commerce": [
    { text: "Hi! I'm looking for running shoes", isBot: false },
    { text: "I'll help you find the perfect pair! What's your size?", isBot: true },
    { text: "Size 10, prefer Nike", isBot: false }
  ],
  "Real Estate": [
    { text: "I'm interested in 2BHK apartments in downtown", isBot: false },
    { text: "Great! Your budget range?", isBot: true },
    { text: "Around $2000/month", isBot: false }
  ],
  "Legal": [
    { text: "I need help with trademark registration", isBot: false },
    { text: "I can assist with that. Is this for a business?", isBot: true },
    { text: "Yes, for my new startup", isBot: false }
  ],
  "Finance": [
    { text: "How do I apply for a personal loan?", isBot: false },
    { text: "I'll help you with that. What's your credit score?", isBot: true },
    { text: "It's around 750", isBot: false }
  ],
  "Healthcare": [
    { text: "I need to schedule a checkup", isBot: false },
    { text: "I'll help you book that. Preferred time?", isBot: true },
    { text: "Morning slots next week", isBot: false }
  ]
};

// Industry-specific tools
const industryTools: Record<IndustryName, Tool[]> = {
  "E-commerce": [
    { name: 'Shopify', logo: '/logos/tools/shopify.svg' },
    { name: 'WooCommerce', logo: '/logos/tools/woocommerce.svg' },
    { name: 'PayPal', logo: '/logos/tools/paypal.png' },
    { name: 'Stripe', logo: '/logos/tools/stripe.svg' }
  ],
  "Real Estate": [
    { name: 'Salesforce', logo: '/logos/tools/salesforce.svg' },
    { name: 'HubSpot', logo: '/logos/tools/hubspot.svg' },
    { name: 'Google', logo: '/logos/tools/google.svg' },
    { name: 'Zoom', logo: '/logos/tools/zoom.png' }
  ],
  "Legal": [
    { name: 'Dropbox', logo: '/logos/tools/dropbox.svg' },
    { name: 'Google', logo: '/logos/tools/google.svg' },
    { name: 'Microsoft', logo: '/logos/tools/microsoft.svg' },
    { name: 'Adobe', logo: '/logos/tools/adobe.svg' }
  ],
  "Finance": [
    { name: 'Stripe', logo: '/logos/tools/stripe.svg' },
    { name: 'Coinbase', logo: '/logos/tools/coinbase.svg' },
    { name: 'PayPal', logo: '/logos/tools/paypal.png' },
    { name: 'Wise', logo: '/logos/tools/wise.svg' }
  ],
  "Healthcare": [
    { name: 'Microsoft', logo: '/logos/tools/microsoft.svg' },
    { name: 'Salesforce', logo: '/logos/tools/salesforce.svg' },
    { name: 'Oracle', logo: '/logos/tools/oracle.svg' },
    { name: 'Google', logo: '/logos/tools/google.svg' }
  ]
};

// FIX 26/12/2025: Moved base amplitude outside function to avoid recreation
const industryBaseAmplitude: Record<IndustryName, number> = {
  "E-commerce": 80,
  "Real Estate": 60,
  "Legal": 40,
  "Finance": 50,
  "Healthcare": 30
};

// FIX 26/12/2025: Fixed SSR issue - function now accepts windowWidth as parameter instead of accessing window directly
const getIndustryWaveform = (industry: IndustryName, windowWidth: number = 1024): number[] => {
  // Generate fewer bars for smaller screens
  const barCount = windowWidth < 640 ? 20 : windowWidth < 1024 ? 30 : 40;

  return Array.from({ length: barCount }, () => Math.random() * (industryBaseAmplitude[industry] || 50));
};

// FIX 26/12/2025: Default waveform for SSR to prevent empty flash - 40 bars with varied heights
const DEFAULT_WAVEFORM = Array.from({ length: 40 }, (_, i) =>
  30 + Math.sin(i * 0.5) * 20 + (i % 3) * 10
);

interface SolutionVisualProps {
  type: string;
  industry: IndustryName;
}

const SolutionVisual = ({ type, industry }: SolutionVisualProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  // FIX 26/12/2025: Initialize with default waveform to prevent empty flash on first render
  const [waveform, setWaveform] = useState<number[]>(DEFAULT_WAVEFORM);
  const [messageIndex, setMessageIndex] = useState(0);
  const [toolIndex, setToolIndex] = useState(0);
  const currentChat = industryChats[industry];
  const currentTools = industryTools[industry];

  // FIX 26/12/2025: Generate waveform on client side only to avoid SSR mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setWaveform(getIndustryWaveform(industry, window.innerWidth));
  }, [industry]);

  // Intersection Observer to pause animations when off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% visible
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Disable timer-based animation for users requesting reduced motion.
    if (!isVisible || reduceMotion) return;

    let interval: NodeJS.Timeout | null = null;

    if (type === 'voice') {
      interval = setInterval(() => {
        setWaveform(getIndustryWaveform(industry));
      }, 100);
    } else if (type === 'chat') {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % currentChat.length);
      }, 2000);
    } else if (type === 'automation') {
      interval = setInterval(() => {
        setToolIndex((prev) => (prev + 1) % currentTools.length);
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [type, industry, currentChat.length, currentTools.length, isVisible, reduceMotion]);

  // Add resize handler to update waveform when screen size changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (type === 'voice') {
        setWaveform(getIndustryWaveform(industry));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [industry, type]);

  if (type === 'chat') {
    return (
      <div ref={containerRef} className="bg-black/80 rounded-xl p-3 sm:p-4 h-[100px] sm:h-[120px] md:h-[140px] overflow-hidden backdrop-blur-sm relative">
        {/* Messages container */}
        <div className="h-full flex flex-col justify-center space-y-2 sm:space-y-3">
          {currentChat.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
              animate={{
                opacity: idx === messageIndex ? 1 : 0,
                x: 0
              }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className={`flex items-center gap-1 sm:gap-2 ${msg.isBot ? '' : 'justify-end'}`}
            >
              {msg.isBot && (
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E5855E]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#E5855E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <div className={`rounded-2xl px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs max-w-[75%] ${
                msg.isBot 
                  ? 'bg-gradient-to-r from-[#E5855E]/20 to-[#E5855E]/5 text-white border border-[#E5855E]/10' 
                  : 'bg-[#E5855E]/10 text-white/90'
              }`}>
                {msg.text}
              </div>
              {!msg.isBot && (
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E5855E]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#E5855E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Typing indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: messageIndex === currentChat.length - 1 ? 1 : 0 }}
          className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 flex items-center gap-1"
        >
          <div className={`w-1 h-1 rounded-full bg-[#E5855E]/40 ${reduceMotion ? '' : 'animate-bounce'}`} style={{ animationDelay: '0ms' }} />
          <div className={`w-1 h-1 rounded-full bg-[#E5855E]/40 ${reduceMotion ? '' : 'animate-bounce'}`} style={{ animationDelay: '150ms' }} />
          <div className={`w-1 h-1 rounded-full bg-[#E5855E]/40 ${reduceMotion ? '' : 'animate-bounce'}`} style={{ animationDelay: '300ms' }} />
        </motion.div>
      </div>
    );
  }

  if (type === 'voice') {
    return (
      <div ref={containerRef} className="bg-black/95 rounded-2xl p-4 sm:p-6 md:p-8 h-[100px] sm:h-[120px] md:h-[140px] flex items-center justify-center backdrop-blur-sm">
        <div className="flex items-center gap-[2px] sm:gap-[3px] h-16 sm:h-20 md:h-24">
          {waveform.map((height, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 2 }}
              animate={{ height: reduceMotion ? `${Math.max(height * 0.65, 28)}%` : `${height}%` }}
              transition={{ 
                duration: reduceMotion ? 0 : 0.2,
                ease: "easeInOut"
              }}
              className="w-[2px] sm:w-[3px] md:w-[4px] bg-gradient-to-t from-[#E5855E]/10 via-[#E5855E] to-[#E5855E]/10 rounded-full shadow-[0_0_8px_rgba(229,133,94,0.3)]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'automation') {
    return (
      <div ref={containerRef} className="bg-black/95 rounded-2xl p-4 sm:p-6 md:p-8 h-[100px] sm:h-[120px] md:h-[140px] backdrop-blur-sm overflow-hidden">
        <div className="relative h-full flex items-center justify-center">
          <div className="relative w-[150px] sm:w-[180px] md:w-[200px] h-[70px] sm:h-[80px] md:h-[90px] flex items-center justify-center">
            {currentTools.map((tool, index) => {
              const position = (index - toolIndex + currentTools.length) % currentTools.length;
              const isCenter = position === 1;
              
              return (
                <motion.div
                  key={tool.name}
                  animate={{
                    x: `${(position - 1) * 180}%`,
                    scale: isCenter ? 1.2 : 0.7,
                    opacity: isCenter ? 1 : position === 0 || position === 2 ? 0.3 : 0,
                    zIndex: isCenter ? 2 : 1
                  }}
                  transition={{ 
                    type: reduceMotion ? "tween" : "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: reduceMotion ? 0.2 : undefined,
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${
                    isCenter ? 'ring-2 ring-[#E5855E] shadow-[0_0_25px_rgba(229,133,94,0.4)] bg-gradient-to-b from-[#E5855E]/10 to-transparent' : ''
                  }`}>
                    <Image 
                      src={tool.logo} 
                      alt={tool.name}
                      width={28}
                      height={28}
                      sizes="(max-width: 768px) 24px, 28px"
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain transition-all duration-300 ${
                        isCenter ? 'brightness-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'brightness-50'
                      }`}
                    />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] md:text-[13px] mt-2 sm:mt-3 transition-all duration-300 ${
                    isCenter ? 'text-white opacity-100 translate-y-0 font-medium drop-shadow-[0_0_10px_rgba(229,133,94,0.5)]' : 'text-white/40 opacity-0 translate-y-1'
                  }`}>
                    {tool.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const industries = [
  {
    name: "E-commerce",
    icon: <FaShoppingCart size={32} />,
    solutions: [
      {
        title: "Chatbots",
        icon: <HiLink className="text-[#E5855E]" size={24} />,
        description: "Our e-commerce chatbots handle product inquiries, provide real-time inventory status, process returns, and offer personalized product recommendations based on shopping history."
      },
      {
        title: "AI Voice Agent",
        icon: <FaMicrophone className="text-[#E5855E]" size={24} />,
        description: "Voice agents that handle order tracking, process refunds, and provide shipping updates. They can even help customers find the right product size or color through natural conversation."
      },
      {
        title: "Automations",
        icon: <RiRobot2Fill className="text-[#E5855E]" size={24} />,
        description: "Automated inventory syncing across platforms, dynamic pricing adjustments, order fulfillment workflows, and automated email marketing based on customer behavior."
      }
    ]
  },
  {
    name: "Real Estate",
    icon: <BiBuildingHouse size={32} />,
    solutions: [
      {
        title: "Chatbots",
        icon: <HiLink className="text-[#E5855E]" size={24} />,
        description: "Property-specific chatbots that provide instant property details, schedule viewings, calculate mortgage payments, and qualify leads based on requirements and budget."
      },
      {
        title: "AI Voice Agent",
        icon: <FaMicrophone className="text-[#E5855E]" size={24} />,
        description: "Voice agents that conduct initial property inquiries, schedule property tours, and provide neighborhood statistics and market trends through natural conversation."
      },
      {
        title: "Automations",
        icon: <RiRobot2Fill className="text-[#E5855E]" size={24} />,
        description: "Automated listing updates across platforms, tenant screening workflows, rent collection reminders, and maintenance request processing systems."
      }
    ]
  },
  {
    name: "Legal",
    icon: <GiScales size={32} />,
    solutions: [
      {
        title: "Chatbots",
        icon: <HiLink className="text-[#E5855E]" size={24} />,
        description: "Legal chatbots that handle client intake, document basic legal queries, schedule consultations, and help clients understand their legal rights and options."
      },
      {
        title: "AI Voice Agent",
        icon: <FaMicrophone className="text-[#E5855E]" size={24} />,
        description: "Voice agents that conduct preliminary case assessments, schedule court date reminders, and provide case status updates while maintaining client confidentiality."
      },
      {
        title: "Automations",
        icon: <RiRobot2Fill className="text-[#E5855E]" size={24} />,
        description: "Automated legal document generation, court filing deadline tracking, billing and time tracking systems, and client communication workflows."
      }
    ]
  },
  {
    name: "Finance",
    icon: <BsCashCoin size={32} />,
    solutions: [
      {
        title: "Chatbots",
        icon: <HiLink className="text-[#E5855E]" size={24} />,
        description: "Financial chatbots that handle account inquiries, assist with loan applications, provide investment advice, and help with budgeting and expense tracking."
      },
      {
        title: "AI Voice Agent",
        icon: <FaMicrophone className="text-[#E5855E]" size={24} />,
        description: "Voice agents that process fund transfers, provide real-time market updates, handle credit card services, and assist with fraud detection and reporting."
      },
      {
        title: "Automations",
        icon: <RiRobot2Fill className="text-[#E5855E]" size={24} />,
        description: "Automated transaction reconciliation, risk assessment workflows, compliance monitoring systems, and personalized financial report generation."
      }
    ]
  },
  {
    name: "Healthcare",
    icon: <FaHospital size={32} />,
    solutions: [
      {
        title: "Chatbots",
        icon: <HiLink className="text-[#E5855E]" size={24} />,
        description: "Healthcare chatbots that handle appointment scheduling, symptom assessment, medication reminders, and provide post-care instructions while ensuring HIPAA compliance."
      },
      {
        title: "AI Voice Agent",
        icon: <FaMicrophone className="text-[#E5855E]" size={24} />,
        description: "Voice agents that manage prescription refills, provide lab results, conduct follow-up assessments, and offer 24/7 nurse triage support."
      },
      {
        title: "Automations",
        icon: <RiRobot2Fill className="text-[#E5855E]" size={24} />,
        description: "Automated patient record management, insurance verification workflows, appointment reminder systems, and medical billing processes."
      }
    ]
  }
];

const Industries = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Real Estate selected

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-white">
      {/* Define gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#E5855E" offset="0%" />
            <stop stopColor="#FF6B6B" offset="100%" />
          </linearGradient>
          <linearGradient id="icon-gradient-hover" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#ffffff" offset="0%" />
            <stop stopColor="#ffffff" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* FIX 26/12/2025: Removed y-transforms to prevent layout shifts */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#E5855E] text-sm tracking-wide uppercase"
        >
          Industries
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold mt-2 sm:mt-4 mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent"
        >
          Industries we work with
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          Hear the success stories of the businesses we&apos;ve helped thrive with AI. We work with a variety of different industries.
        </motion.p>

        {/* Replace flex container with a custom 3-2 grid layout */}
        <div className="relative z-10 grid grid-cols-3 max-w-[500px] mx-auto gap-y-8 sm:gap-y-10">
          {/* First row - 3 industries */}
          <div className="col-span-3 flex justify-center gap-3 sm:gap-8 lg:gap-12">
            {industries.slice(0, 3).map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-black/40 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 transition-all duration-300 relative
                  ${index === activeIndex ? 'bg-black/60 shadow-[0_0_20px_rgba(229,133,94,0.3)]' : 'group-hover:bg-black/60'}
                  before:absolute before:inset-0 before:rounded-lg before:border before:border-[#E5855E]/20 before:transition-all before:duration-300
                  ${index === activeIndex ? 'before:border-[#E5855E] before:shadow-[0_0_15px_rgba(229,133,94,0.2)]' : 'before:group-hover:border-[#E5855E]/40'}`}
                >
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-[#E5855E]/10 to-transparent transition-opacity duration-300
                    ${index === activeIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
                  />
                  <div className="relative z-10 transition-all duration-300">
                    <div className={`transition-all duration-300 scale-75 sm:scale-90 lg:scale-100
                      ${index === activeIndex 
                        ? 'text-[#E5855E] drop-shadow-[0_0_8px_rgba(229,133,94,0.3)]' 
                        : 'text-white group-hover:text-[#E5855E]'}`}
                    >
                      {industry.icon}
                    </div>
                  </div>
                </div>
                <p className={`relative z-10 text-center text-sm sm:text-base lg:text-lg transition-all duration-300 bg-gradient-to-r bg-clip-text text-transparent
                  ${index === activeIndex 
                    ? 'from-[#E5855E] to-[#FF6B6B] drop-shadow-[0_0_8px_rgba(229,133,94,0.3)]' 
                    : 'from-gray-400 to-gray-300 group-hover:from-[#E5855E] group-hover:to-[#FF6B6B]'}`}
                >
                  {industry.name}
                </p>
                <div className={`h-0.5 mt-1 transition-all duration-300 bg-[#E5855E]
                  ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`} 
                />
              </motion.div>
            ))}
          </div>
          
          {/* Second row - 2 industries */}
          <div className="col-span-3 flex justify-center gap-3 sm:gap-8 lg:gap-12">
            {industries.slice(3, 5).map((industry, sliceIndex) => {
              const index = sliceIndex + 3; // Adjust index for original array position
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-black/40 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 transition-all duration-300 relative
                    ${index === activeIndex ? 'bg-black/60 shadow-[0_0_20px_rgba(229,133,94,0.3)]' : 'group-hover:bg-black/60'}
                    before:absolute before:inset-0 before:rounded-lg before:border before:border-[#E5855E]/20 before:transition-all before:duration-300
                    ${index === activeIndex ? 'before:border-[#E5855E] before:shadow-[0_0_15px_rgba(229,133,94,0.2)]' : 'before:group-hover:border-[#E5855E]/40'}`}
                  >
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-[#E5855E]/10 to-transparent transition-opacity duration-300
                      ${index === activeIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
                    />
                    <div className="relative z-10 transition-all duration-300">
                      <div className={`transition-all duration-300 scale-75 sm:scale-90 lg:scale-100
                        ${index === activeIndex 
                          ? 'text-[#E5855E] drop-shadow-[0_0_8px_rgba(229,133,94,0.3)]' 
                          : 'text-white group-hover:text-[#E5855E]'}`}
                      >
                        {industry.icon}
                      </div>
                    </div>
                  </div>
                  <p className={`relative z-10 text-center text-sm sm:text-base lg:text-lg transition-all duration-300 bg-gradient-to-r bg-clip-text text-transparent
                    ${index === activeIndex 
                      ? 'from-[#E5855E] to-[#FF6B6B] drop-shadow-[0_0_8px_rgba(229,133,94,0.3)]' 
                      : 'from-gray-400 to-gray-300 group-hover:from-[#E5855E] group-hover:to-[#FF6B6B]'}`}
                  >
                    {industry.name}
                  </p>
                  <div className={`h-0.5 mt-1 transition-all duration-300 bg-[#E5855E]
                    ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`} 
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16">
          {industries[activeIndex].solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08 }}
              className="bg-black/20 rounded-lg p-4 sm:p-6 lg:p-8 relative"
            >
              <SolutionVisual 
                type={solution.title.toLowerCase().includes('chat') ? 'chat' : 
                      solution.title.toLowerCase().includes('voice') ? 'voice' : 'automation'} 
                industry={industries[activeIndex].name as IndustryName}
              />
              <div className="flex items-center justify-center mt-6 sm:mt-8 mb-2 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold">{solution.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries; 
