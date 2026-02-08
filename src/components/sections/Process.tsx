import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// FIX 26/12/2025: Added useCallback for timer cleanup functions
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';

const tools = {
  facebook: {
    name: 'Facebook',
    symbol: '👥',
    color: 'bg-blue-500',
    logo: '/logos/tools/facebook.svg'
  },
  zapier: {
    name: 'Zapier',
    symbol: '🔄',
    color: 'bg-orange-500',
    logo: '/logos/tools/zapier.svg'
  },
  openai: {
    name: 'OpenAI',
    symbol: '🤖',
    color: 'bg-green-500',
    logo: '/logos/tools/openai.svg'
  },
  airtable: {
    name: 'Airtable',
    symbol: '⚡',
    color: 'bg-yellow-500',
    logo: '/logos/tools/airtable.svg'
  },
  notion: {
    name: 'Notion',
    symbol: '📝',
    color: 'bg-gray-800',
    logo: '/logos/tools/notion.svg'
  }
};

const steps = [
  {
    title: "Analyze & Plan",
    subtitle: "We analyze your workflow, identify AI opportunities, and create detailed implementation roadmaps for maximum impact.",
    path: "Analysis",
    content: (
      <div className="relative h-[250px] sm:h-[300px] p-4 sm:p-8">
        <div className="flex items-start justify-between mt-6 sm:mt-12 group">
          {/* Base continuous line */}
          <div className="absolute w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] left-4 sm:left-8 top-[calc(50%-4px)] transition-all duration-300">
            {/* Base line with gradient opacity */}
            <div className="absolute w-full h-[8px] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E5855E]/10 via-[#E5855E]/40 to-[#E5855E]/10" />
              {/* Hover highlight sections */}
              <div className="absolute inset-0 flex">
                {Object.keys(tools).map((_, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div
                      className={`w-6 sm:w-8 h-full bg-gradient-to-b from-[#E5855E]/40 via-[#E5855E]/60 to-[#E5855E]/40 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#E5855E] group-hover:bg-gradient-to-b group-hover:from-[#E5855E]/60 group-hover:via-[#E5855E] group-hover:to-[#E5855E]/60`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Thinner overlay for more intense color */}
            <div className="absolute w-full h-[4px] top-[2px] bg-gradient-to-r from-transparent via-[#E5855E]/60 to-transparent rounded-full" />
          </div>
          
          {Object.entries(tools).map(([key, tool], i) => {
            // Calculate blur and opacity based on distance from center
            const distanceFromCenter = Math.abs(i - 2);
            const getBlurOpacity = () => {
              if (i === 2) return '';  // Center item
              if (distanceFromCenter === 1) return 'blur-[0.5px] opacity-80'; // Adjacent items
              return 'blur-[1px] opacity-60'; // Edge items
            };
            
            // Conditionally hide items on small screens while maintaining the center and adjacent items
            const isVisibleOnSmallScreen = i >= 1 && i <= 3;
            
            return (
              <div 
                key={key} 
                className={`flex items-center flex-1 relative ${!isVisibleOnSmallScreen ? 'hidden sm:flex' : ''}`}
              >
                <div className={`flex flex-col items-center w-full transition-all duration-300 z-10 ${
                  i !== 2 ? `${getBlurOpacity()} group-hover:blur-0 group-hover:opacity-100` : ''
                }`}>
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 bg-black/20 backdrop-blur-sm ${
                    i === 2 ? 'ring-2 ring-[#E5855E]/50' : ''
                  }`}>
                    <Image 
                      src={tool.logo} 
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
                      sizes="(max-width: 768px) 20px, 28px"
                    />
                  </div>
                  <span className="text-white/60 text-[10px] sm:text-[13px] mt-3 sm:mt-8">{tool.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  },
  {
    title: "Build & Integrate",
    subtitle: "We build custom AI solutions using cutting-edge technology and seamlessly integrate them into your existing workflow.",
    path: "Development",
    content: (
      <div className="relative h-[250px] sm:h-[300px] p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-[#E5855E]/10 shadow-[0_0_0_1px_rgba(229,133,94,0.1),0_0_20px_-15px_#E5855E] transition-all duration-500 group hover:border-[#E5855E]/20 hover:shadow-[0_0_0_1px_rgba(229,133,94,0.2),0_0_30px_-15px_#E5855E]">
          {/* Editor Header */}
          <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 bg-black/40 flex items-center px-2 sm:px-4 gap-1 sm:gap-2 border-b border-white/5 transition-colors duration-500 group-hover:border-[#E5855E]/20">
            <div className="flex gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57] shadow-[0_0_10px_rgba(255,95,87,0.3)] transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(255,95,87,0.5)] group-hover:scale-110"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.3)] transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(255,189,46,0.5)] group-hover:scale-110"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#28C840] shadow-[0_0_10px_rgba(40,200,64,0.3)] transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(40,200,64,0.5)] group-hover:scale-110"></div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2">
              <span className="text-white/40 text-xs sm:text-sm transition-colors duration-500 group-hover:text-white/60">ai_assistant.py</span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E5855E] animate-pulse"/>
            </div>
          </div>
          
          {/* Code Content */}
          <div className="absolute top-8 sm:top-12 left-8 sm:left-12 right-0 bottom-0 p-2 sm:p-8 font-mono text-xs sm:text-sm overflow-hidden transition-all duration-500 group-hover:bg-black/10">
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-center gap-1 sm:gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">import</span>
                <span className="text-[#98C379]">openai</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">from</span>
                <span className="text-[#98C379]">typing</span>
                <span className="text-[#C678DD]">import</span>
                <span className="text-[#E06C75]">List</span>
                <span className="text-white/80">,</span>
                <span className="text-[#E06C75]">Dict</span>
              </div>
              
              <div className="mt-3 sm:mt-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">class</span>
                <span className="text-[#61AFEF] ml-1 sm:ml-2">AIAssistant</span>
                <span className="text-white/80">:</span>
              </div>

              <div className="ml-4 sm:ml-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">def</span>
                <span className="text-[#61AFEF] ml-1 sm:ml-2">__init__</span>
                <span className="text-white/80">(self, api_key: str):</span>
              </div>

              <div className="ml-6 sm:ml-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white/80">self.</span>
                <span className="text-[#E06C75]">client</span>
                <span className="text-white/80"> = openai.OpenAI(api_key=api_key)</span>
              </div>

              <div className="ml-4 sm:ml-8 mt-3 sm:mt-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">async</span>
                <span className="text-[#C678DD] ml-1 sm:ml-2">def</span>
                <span className="text-[#61AFEF] ml-1 sm:ml-2">process_message</span>
                <span className="text-white/80">(self, message: str) -&gt; Dict:</span>
              </div>
            </div>
          </div>

          {/* Line Numbers */}
          <div className="absolute top-8 sm:top-12 left-0 w-8 sm:w-12 bottom-0 bg-black/40 flex flex-col items-center py-2 sm:py-8 text-white/20 font-mono text-xs sm:text-sm border-r border-white/5 transition-colors duration-500 group-hover:border-[#E5855E]/20">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[24px] sm:h-[32px] transition-colors duration-500 group-hover:text-white/30">{i + 1}</div>
            ))}
          </div>

          {/* Cursor Animation */}
          <div className="absolute top-[200px] sm:top-[270px] left-[120px] sm:left-[140px] w-[2px] h-[12px] sm:h-[16px] bg-[#E5855E] animate-pulse"/>
        </div>

        {/* Editor Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E5855E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>
      </div>
    )
  },
  {
    title: "Monitor & Improve",
    subtitle: "We continuously monitor performance metrics, optimize systems, and implement improvements to maximize efficiency.",
    path: "Optimization",
    content: (
      <div className="relative h-[250px] sm:h-[300px] p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-[#E5855E]/10 shadow-[0_0_0_1px_rgba(229,133,94,0.1),0_0_20px_-15px_#E5855E] transition-all duration-500 group hover:border-[#E5855E]/20 hover:shadow-[0_0_0_1px_rgba(229,133,94,0.2),0_0_30px_-15px_#E5855E]">
          {/* Dashboard Header */}
          <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 bg-black/40 flex items-center justify-between px-2 sm:px-4 border-b border-white/5 transition-colors duration-500 group-hover:border-[#E5855E]/20">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E5855E] animate-pulse"/>
              <span className="text-white/60 text-xs sm:text-sm">System Status</span>
            </div>
            <div className="text-white/40 text-xs sm:text-sm">Last checked: Just now</div>
          </div>

          {/* Dashboard Content */}
          <div className="absolute top-8 sm:top-12 left-0 right-0 bottom-0 p-3 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Performance Metrics */}
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-black/40 rounded-lg p-2 sm:p-4 transition-all duration-300 hover:bg-black/50 group/item">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-white/60 text-xs sm:text-sm">Response Time</span>
                  <span className="text-[#E5855E] text-xs sm:text-sm">98.2ms avg</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-gradient-to-r from-[#E5855E]/60 to-[#E5855E] group-hover/item:shadow-[0_0_10px_#E5855E]"/>
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-2 sm:p-4 transition-all duration-300 hover:bg-black/50 group/item">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-white/60 text-xs sm:text-sm">Success Rate</span>
                  <span className="text-[#E5855E] text-xs sm:text-sm">99.9%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full w-[99%] bg-gradient-to-r from-[#E5855E]/60 to-[#E5855E] group-hover/item:shadow-[0_0_10px_#E5855E]"/>
                </div>
              </div>

              <div className="hidden sm:block bg-black/40 rounded-lg p-4 transition-all duration-300 hover:bg-black/50 group/item">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">System Load</span>
                  <span className="text-[#E5855E] text-sm">42%</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full w-[42%] bg-gradient-to-r from-[#E5855E]/60 to-[#E5855E] group-hover/item:shadow-[0_0_10px_#E5855E]"/>
                </div>
              </div>
            </div>

            {/* Status Updates */}
            <div className="bg-black/40 rounded-lg p-2 sm:p-4 overflow-hidden">
              <div className="text-white/60 text-xs sm:text-sm mb-2 sm:mb-4">Recent Updates</div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { time: '2m ago', text: 'Performance optimization complete', type: 'success' },
                  { time: '15m ago', text: 'New model version deployed', type: 'info' },
                  { time: '1h ago', text: 'Automated backup successful', type: 'success' },
                  { time: '3h ago', text: 'System health check passed', type: 'success' }
                ].map((update, i) => (
                  <div key={i} className={`flex items-start gap-2 sm:gap-3 text-xs sm:text-sm group/update ${i >= 2 ? 'hidden sm:flex' : ''}`}>
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1 sm:mt-1.5 ${
                      update.type === 'success' ? 'bg-[#E5855E]' : 'bg-blue-400'
                    }`}/>
                    <div className="flex-1">
                      <p className="text-white/80 transition-colors duration-300 group-hover/update:text-white">
                        {update.text}
                      </p>
                      <span className="text-white/40 text-[10px] sm:text-xs">{update.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

// Update the gradient text style to remove animation
const gradientTextStyle = {
  background: "linear-gradient(to right, #fff 20%, #ffffff90 40%, #ffffff90 60%, #fff 80%)",
  backgroundSize: "200% auto",
  color: "transparent",
  WebkitBackgroundClip: "text",
  backgroundClip: "text"
};

// Update the content variants to include y-axis movement for better transitions
const contentVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 20 : -20
  }),
  center: {
    opacity: 1,
    y: 0
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? 20 : -20
  })
};

// Add variants for diagrams with similar transitions
const diagramVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 20 : -20
  }),
  center: {
    opacity: 1,
    y: 0
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? 20 : -20
  })
};

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-cycle timer ref
  const autoCycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Check if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // FIX 26/12/2025: Extracted timer start logic into reusable function to avoid code duplication
  const startAutoCycle = useCallback(() => {
    if (reduceMotion || !isVisible) return;

    // Clear any existing timer first
    if (autoCycleTimerRef.current) {
      clearInterval(autoCycleTimerRef.current);
      autoCycleTimerRef.current = null;
    }

    // Set up new auto-cycling timer
    autoCycleTimerRef.current = setInterval(() => {
      setDirection(1);
      setActiveStep(prevStep => {
        // Loop back to first step after reaching the end
        return prevStep >= steps.length - 1 ? 0 : prevStep + 1;
      });
    }, 3000); // Change step every 3 seconds
  }, [reduceMotion, isVisible]);

  // FIX 26/12/2025: Extracted timer stop logic into reusable function
  const stopAutoCycle = useCallback(() => {
    if (autoCycleTimerRef.current) {
      clearInterval(autoCycleTimerRef.current);
      autoCycleTimerRef.current = null;
    }
  }, []);

  // Auto-cycle effect for both mobile and desktop
  // FIX 26/12/2025: Now uses the extracted functions for cleaner code and proper cleanup
  useEffect(() => {
    if (reduceMotion || !isVisible) return;

    startAutoCycle();

    // Clean up on unmount or when dependencies change
    return () => {
      stopAutoCycle();
    };
  }, [startAutoCycle, stopAutoCycle, reduceMotion, isVisible]);

  // Handle pagination for both mobile and desktop
  // FIX 26/12/2025: Uses extracted functions to ensure consistent timer handling
  const handlePagination = (index: number) => {
    if (index === activeStep) return;

    const newDirection = index > activeStep ? 1 : -1;
    setDirection(newDirection);
    setActiveStep(index);

    // Restart auto-cycle timer after manual interaction
    if (!reduceMotion && isVisible) {
      startAutoCycle();
    }
  };

  const processContent = useMemo(() => (
    <div className="relative grid grid-cols-12 gap-4 md:gap-8">
      {/* Left side - Steps */}
      <div className={`${isMobile ? 'col-span-12 mb-8' : 'col-span-6'} overflow-hidden`}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeStep}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeOut"
            }}
            className={`relative ${isMobile ? 'min-h-[150px]' : 'min-h-[300px]'} flex items-center`}
          >
            <div>
              <h3 
                className={`${isMobile ? 'text-[1.8rem]' : 'text-[2.75rem]'} font-light leading-tight`} 
                style={gradientTextStyle}
              >
                {steps[activeStep].title}
              </h3>
              <p 
                className={`text-white/80 ${isMobile ? 'text-base mt-2' : 'text-xl mt-4'} leading-relaxed`}
              >
                {steps[activeStep].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side - Content */}
      <div className={`${isMobile ? 'col-span-12' : 'col-span-6'} overflow-hidden`}>
        <div className={`space-y-${isMobile ? '4' : '6'}`}>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>Process</span>
            <span>&gt;</span>
            <span className="text-white font-medium">{steps[activeStep].path}</span>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={diagramVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {steps[activeStep].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  ), [activeStep, direction, isMobile]);

  return (
    <section 
      ref={containerRef} 
      className="h-screen relative"
      role="region" 
      aria-label="Our process"
    >
      <div className="h-screen flex items-center justify-center w-full">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className={isMobile ? "mb-8" : "mb-16"}>
            <span className="text-[#E5855E] text-sm tracking-wide uppercase">Our Process</span>
            <h2 
              className={`${isMobile ? 'text-[3rem] mt-2' : 'text-[7.5rem] mt-4'} font-normal leading-none`} 
              style={gradientTextStyle}
            >
              How we work
            </h2>
          </div>
          
          {processContent}
          
          {/* Step indicators for both mobile and desktop */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-4">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePagination(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeStep ? 'bg-[#E5855E] scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process; 
