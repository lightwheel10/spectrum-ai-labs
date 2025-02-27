import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Icons for each step
const stepIcons = {
  form: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm6 0h-4v-2h4v2zm2-5H5v-1h14v1zm0-4H5V7h14v1z"/>
    </svg>
  ),
  hubspot: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    </svg>
  ),
  salesforce: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
      <path d="M18.5 8c-.8 0-1.5.3-2.1.8-1-.7-2.1-1-3.4-1-1 0-1.9.2-2.8.7-.8-.8-2-1.3-3.2-1.3-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c.3 0 .6 0 .8-.1.7 1.1 1.9 1.9 3.2 1.9.7 0 1.4-.2 2-.6.6.7 1.5 1.1 2.5 1.1 1.9 0 3.5-1.6 3.5-3.5 0-.2 0-.4-.1-.6.9-.6 1.6-1.7 1.6-2.9 0-1.9-1.6-3.5-3.5-3.5z"/>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7v-5z"/>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </svg>
  )
};

const defaultSteps = [
  "Lead captures via website form",
  "Qualify & score in HubSpot CRM",
  "Create opportunity in Salesforce",
  "Schedule sales consultation",
  "Track conversion metrics"
];

interface WorkflowAnimationProps {
  steps?: string[];
}

const WorkflowAnimation = ({ steps = defaultSteps }: WorkflowAnimationProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Ensure we always have 5 steps by using default steps to fill in any missing ones
  const fullSteps = [...steps];
  if (fullSteps.length < 5) {
    console.log(`Only ${fullSteps.length} steps provided, filling with defaults`);
    for (let i = fullSteps.length; i < 5; i++) {
      fullSteps.push(defaultSteps[i]);
    }
  }
  
  return (
    <div 
      className="relative py-4 px-2 cursor-pointer h-[320px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/5" />
      
      <motion.div
        initial={{ y: 0 }}
        animate={{ 
          y: isHovered ? -80 : 0
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className="space-y-6"
      >
        {fullSteps.map((step, idx) => {
          return (
            <div 
              key={`step-${idx}`}
              className="relative"
              style={{
                transition: 'opacity 0.3s ease, visibility 0.3s ease',
                opacity: idx >= 3 ? (isHovered ? 1 : 0) : 1,
                visibility: idx >= 3 ? (isHovered ? 'visible' : 'hidden') : 'visible'
              }}
            >
              {/* Connecting line */}
              {idx < fullSteps.length - 1 && (
                <div 
                  className="absolute left-4 top-10 w-[2px] h-[24px]" 
                  style={{ 
                    transform: "translateX(-50%)",
                    background: "linear-gradient(to bottom, #E5855E, transparent)"
                  }}
                />
              )}

              <div className="flex items-start gap-6">
                {/* Icon circle */}
                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E5855E]/20 to-transparent" />
                  {idx === 0 && stepIcons.form}
                  {idx === 1 && stepIcons.hubspot}
                  {idx === 2 && stepIcons.salesforce}
                  {idx === 3 && stepIcons.calendar}
                  {idx === 4 && stepIcons.analytics}
                </div>

                {/* Step content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 text-white/80">
                    <span className="font-medium">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WorkflowAnimation; 