import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
    { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
    { name: 'WooCommerce', logo: 'https://cdn.worldvectorlogo.com/logos/woocommerce.svg' },
    { name: 'PayPal', logo: 'https://www.paypalobjects.com/webstatic/icon/pp258.png' },
    { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' }
  ],
  "Real Estate": [
    { name: 'Salesforce', logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
    { name: 'HubSpot', logo: 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg' },
    { name: 'Google', logo: 'https://cdn.cdnlogo.com/logos/g/35/google-icon.svg' },
    { name: 'Zoom', logo: 'https://download.logo.wine/logo/Zoom_Video_Communications/Zoom_Video_Communications-Logo.wine.png' }
  ],
  "Legal": [
    { name: 'Dropbox', logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-1.svg' },
    { name: 'Google', logo: 'https://cdn.cdnlogo.com/logos/g/35/google-icon.svg' },
    { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
    { name: 'Adobe', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-2.svg' }
  ],
  "Finance": [
    { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
    { name: 'Coinbase', logo: 'https://cdn.worldvectorlogo.com/logos/coinbase-1.svg' },
    { name: 'PayPal', logo: 'https://www.paypalobjects.com/webstatic/icon/pp258.png' },
    { name: 'Wise', logo: 'https://wise.com/public-resources/assets/logos/wise/brand_logo.svg' }
  ],
  "Healthcare": [
    { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
    { name: 'Salesforce', logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
    { name: 'Oracle', logo: 'https://cdn.worldvectorlogo.com/logos/oracle-2.svg' },
    { name: 'Google', logo: 'https://cdn.cdnlogo.com/logos/g/35/google-icon.svg' }
  ]
};

// Industry-specific waveform patterns
const getIndustryWaveform = (industry: IndustryName): number[] => {
  const baseAmplitude: Record<IndustryName, number> = {
    "E-commerce": 80,
    "Real Estate": 60,
    "Legal": 40,
    "Finance": 50,
    "Healthcare": 30
  };
  
  return Array.from({ length: 40 }, () => Math.random() * (baseAmplitude[industry] || 50));
};

interface SolutionVisualProps {
  type: string;
  industry: IndustryName;
}

const SolutionVisual = ({ type, industry }: SolutionVisualProps) => {
  const [waveform, setWaveform] = useState<number[]>(getIndustryWaveform(industry));
  const [messageIndex, setMessageIndex] = useState(0);
  const [toolIndex, setToolIndex] = useState(0);
  const currentChat = industryChats[industry];
  const currentTools = industryTools[industry];

  useEffect(() => {
    if (type === 'voice') {
      const interval = setInterval(() => {
        setWaveform(getIndustryWaveform(industry));
      }, 100);
      return () => clearInterval(interval);
    }
    
    if (type === 'chat') {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % currentChat.length);
      }, 2000);
      return () => clearInterval(interval);
    }

    if (type === 'automation') {
      const interval = setInterval(() => {
        setToolIndex((prev) => (prev + 1) % currentTools.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [type, industry, currentChat.length, currentTools.length]);

  if (type === 'chat') {
    return (
      <div className="bg-black/80 rounded-xl p-4 h-[140px] overflow-hidden backdrop-blur-sm relative">
        {/* Messages container */}
        <div className="h-full flex flex-col justify-center space-y-3">
          {currentChat.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
              animate={{ 
                opacity: idx === messageIndex ? 1 : 0,
                x: 0
              }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2 ${msg.isBot ? '' : 'justify-end'}`}
            >
              {msg.isBot && (
                <div className="w-4 h-4 rounded-full bg-[#E5855E]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#E5855E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <div className={`rounded-2xl px-3 py-1.5 text-xs max-w-[75%] ${
                msg.isBot 
                  ? 'bg-gradient-to-r from-[#E5855E]/20 to-[#E5855E]/5 text-white border border-[#E5855E]/10' 
                  : 'bg-[#E5855E]/10 text-white/90'
              }`}>
                {msg.text}
              </div>
              {!msg.isBot && (
                <div className="w-4 h-4 rounded-full bg-[#E5855E]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#E5855E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="absolute bottom-3 left-4 flex items-center gap-1"
        >
          <div className="w-1 h-1 rounded-full bg-[#E5855E]/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 rounded-full bg-[#E5855E]/40 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-1 rounded-full bg-[#E5855E]/40 animate-bounce" style={{ animationDelay: '300ms' }} />
        </motion.div>
      </div>
    );
  }

  if (type === 'voice') {
    return (
      <div className="bg-black/95 rounded-2xl p-8 h-[140px] flex items-center justify-center backdrop-blur-sm">
        <div className="flex items-center gap-[3px] h-24">
          {waveform.map((height, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 2 }}
              animate={{ height: `${height}%` }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut"
              }}
              className="w-[4px] bg-gradient-to-t from-[#E5855E]/10 via-[#E5855E] to-[#E5855E]/10 rounded-full shadow-[0_0_8px_rgba(229,133,94,0.3)]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'automation') {
    return (
      <div className="bg-black/95 rounded-2xl p-8 h-[140px] backdrop-blur-sm overflow-hidden">
        <div className="relative h-full flex items-center justify-center">
          <div className="relative w-[200px] h-[90px] flex items-center justify-center">
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
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${
                    isCenter ? 'ring-2 ring-[#E5855E] shadow-[0_0_25px_rgba(229,133,94,0.4)] bg-gradient-to-b from-[#E5855E]/10 to-transparent' : ''
                  }`}>
                    <Image 
                      src={tool.logo} 
                      alt={tool.name}
                      width={28}
                      height={28}
                      className={`w-7 h-7 object-contain transition-all duration-300 ${
                        isCenter ? 'brightness-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'brightness-50'
                      }`}
                      unoptimized={true}
                    />
                  </div>
                  <span className={`text-[13px] mt-3 transition-all duration-300 ${
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-white">
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[#E5855E] text-sm tracking-wide uppercase"
        >
          Industries
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-[5.5rem] font-bold mt-4 mb-8 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent"
        >
          Industries we work with
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-400 text-xl max-w-3xl mx-auto mb-16"
        >
          Hear the success stories of the businesses we&apos;ve helped thrive with AI. We work with a variety of different industries.
        </motion.p>

        <div className="relative z-10 flex justify-center gap-8 flex-wrap">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <div className={`w-24 h-24 bg-black/40 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 relative
                ${index === activeIndex ? 'bg-black/60 shadow-[0_0_20px_rgba(229,133,94,0.3)]' : 'group-hover:bg-black/60'}
                before:absolute before:inset-0 before:rounded-lg before:border before:border-[#E5855E]/20 before:transition-all before:duration-300
                ${index === activeIndex ? 'before:border-[#E5855E] before:shadow-[0_0_15px_rgba(229,133,94,0.2)]' : 'before:group-hover:border-[#E5855E]/40'}`}
              >
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-[#E5855E]/10 to-transparent transition-opacity duration-300
                  ${index === activeIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
                />
                <div className="relative z-10 transition-all duration-300">
                  <div className={`transition-all duration-300
                    ${index === activeIndex 
                      ? 'text-[#E5855E] drop-shadow-[0_0_8px_rgba(229,133,94,0.3)]' 
                      : 'text-white group-hover:text-[#E5855E]'}`}
                  >
                    {industry.icon}
                  </div>
                </div>
              </div>
              <p className={`relative z-10 text-center text-lg transition-all duration-300 bg-gradient-to-r bg-clip-text text-transparent
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

        <div className="grid grid-cols-3 gap-8 mt-16">
          {industries[activeIndex].solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 rounded-lg p-8 relative"
            >
              <SolutionVisual 
                type={solution.title.toLowerCase().includes('chat') ? 'chat' : 
                      solution.title.toLowerCase().includes('voice') ? 'voice' : 'automation'} 
                industry={industries[activeIndex].name as IndustryName}
              />
              <div className="flex items-center justify-center mt-8 mb-4">
                <h3 className="text-2xl font-semibold">{solution.title}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
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