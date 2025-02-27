import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';

const tools = {
  facebook: {
    name: 'Facebook',
    symbol: '👥',
    color: 'bg-blue-500',
    logo: 'https://cdn.simpleicons.org/facebook/white'
  },
  zapier: {
    name: 'Zapier',
    symbol: '🔄',
    color: 'bg-orange-500',
    logo: 'https://cdn.simpleicons.org/zapier/white'
  },
  openai: {
    name: 'OpenAI',
    symbol: '🤖',
    color: 'bg-green-500',
    logo: 'https://cdn.simpleicons.org/openai/white'
  },
  airtable: {
    name: 'Airtable',
    symbol: '⚡',
    color: 'bg-yellow-500',
    logo: 'https://cdn.simpleicons.org/airtable/white'
  },
  notion: {
    name: 'Notion',
    symbol: '📝',
    color: 'bg-gray-800',
    logo: 'https://cdn.simpleicons.org/notion/white'
  }
};

const steps = [
  {
    title: "Analyze & Plan",
    subtitle: "We analyze your workflow, identify AI opportunities, and create detailed implementation roadmaps for maximum impact.",
    path: "Analysis",
    content: (
      <div className="relative h-[300px] p-8">
        <div className="flex items-start justify-between mt-12 group">
          {/* Base continuous line */}
          <div className="absolute w-[calc(100%-4rem)] left-8 top-[calc(50%-4px)] transition-all duration-300">
            {/* Base line with gradient opacity */}
            <div className="absolute w-full h-[8px] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E5855E]/10 via-[#E5855E]/40 to-[#E5855E]/10" />
              {/* Hover highlight sections */}
              <div className="absolute inset-0 flex">
                {Object.keys(tools).map((_, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div
                      className={`w-8 h-full bg-gradient-to-b from-[#E5855E]/40 via-[#E5855E]/60 to-[#E5855E]/40 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#E5855E] group-hover:bg-gradient-to-b group-hover:from-[#E5855E]/60 group-hover:via-[#E5855E] group-hover:to-[#E5855E]/60`}
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
            
            return (
              <div 
                key={key} 
                className="flex items-center flex-1 relative"
              >
                <div className={`flex flex-col items-center w-full transition-all duration-300 z-10 ${
                  i !== 2 ? `${getBlurOpacity()} group-hover:blur-0 group-hover:opacity-100` : ''
                }`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 bg-black/20 backdrop-blur-sm ${
                    i === 2 ? 'ring-2 ring-[#E5855E]/50' : ''
                  }`}>
                    <Image 
                      src={tool.logo} 
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                      unoptimized={true}
                    />
                  </div>
                  <span className="text-white/60 text-[13px] mt-8">{tool.name}</span>
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
      <div className="relative h-[300px] p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-[#E5855E]/10 shadow-[0_0_0_1px_rgba(229,133,94,0.1),0_0_20px_-15px_#E5855E] transition-all duration-500 group hover:border-[#E5855E]/20 hover:shadow-[0_0_0_1px_rgba(229,133,94,0.2),0_0_30px_-15px_#E5855E]">
          {/* Editor Header */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 flex items-center px-4 gap-2 border-b border-white/5 transition-colors duration-500 group-hover:border-[#E5855E]/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_10px_rgba(255,95,87,0.3)] transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(255,95,87,0.5)] group-hover:scale-110"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.3)] transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(255,189,46,0.5)] group-hover:scale-110"></div>
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_10px_rgba(40,200,64,0.3)] transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(40,200,64,0.5)] group-hover:scale-110"></div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-white/40 text-sm transition-colors duration-500 group-hover:text-white/60">ai_assistant.py</span>
              <div className="w-2 h-2 rounded-full bg-[#E5855E] animate-pulse"/>
            </div>
          </div>
          
          {/* Code Content */}
          <div className="absolute top-12 left-12 right-0 bottom-0 p-8 font-mono text-sm overflow-hidden transition-all duration-500 group-hover:bg-black/10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">import</span>
                <span className="text-[#98C379]">openai</span>
              </div>
              <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">from</span>
                <span className="text-[#98C379]">typing</span>
                <span className="text-[#C678DD]">import</span>
                <span className="text-[#E06C75]">List</span>
                <span className="text-white/80">,</span>
                <span className="text-[#E06C75]">Dict</span>
              </div>
              
              <div className="mt-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">class</span>
                <span className="text-[#61AFEF] ml-2">AIAssistant</span>
                <span className="text-white/80">:</span>
              </div>

              <div className="ml-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">def</span>
                <span className="text-[#61AFEF] ml-2">__init__</span>
                <span className="text-white/80">(self, api_key: str):</span>
              </div>

              <div className="ml-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white/80">self.</span>
                <span className="text-[#E06C75]">client</span>
                <span className="text-white/80"> = openai.OpenAI(api_key=api_key)</span>
              </div>

              <div className="ml-8 mt-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">async</span>
                <span className="text-[#C678DD] ml-2">def</span>
                <span className="text-[#61AFEF] ml-2">process_message</span>
                <span className="text-white/80">(self, message: str) -&gt; Dict:</span>
              </div>

              <div className="ml-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#C678DD]">try</span>
                <span className="text-white/80">:</span>
              </div>

              <div className="ml-16 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#E06C75]">response</span>
                <span className="text-white/80"> = </span>
                <span className="text-[#C678DD]">await</span>
                <span className="text-white/80"> self.client.chat.completions.create(</span>
              </div>
            </div>
          </div>

          {/* Line Numbers */}
          <div className="absolute top-12 left-0 w-12 bottom-0 bg-black/40 flex flex-col items-center py-8 text-white/20 font-mono text-sm border-r border-white/5 transition-colors duration-500 group-hover:border-[#E5855E]/20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-[32px] transition-colors duration-500 group-hover:text-white/30">{i + 1}</div>
            ))}
          </div>

          {/* Cursor Animation */}
          <div className="absolute top-[270px] left-[140px] w-[2px] h-[16px] bg-[#E5855E] animate-pulse"/>
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
      <div className="relative h-[300px] p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-[#E5855E]/10 shadow-[0_0_0_1px_rgba(229,133,94,0.1),0_0_20px_-15px_#E5855E] transition-all duration-500 group hover:border-[#E5855E]/20 hover:shadow-[0_0_0_1px_rgba(229,133,94,0.2),0_0_30px_-15px_#E5855E]">
          {/* Dashboard Header */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 flex items-center justify-between px-4 border-b border-white/5 transition-colors duration-500 group-hover:border-[#E5855E]/20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E5855E] animate-pulse"/>
              <span className="text-white/60 text-sm">System Status</span>
            </div>
            <div className="text-white/40 text-sm">Last checked: Just now</div>
          </div>

          {/* Dashboard Content */}
          <div className="absolute top-12 left-0 right-0 bottom-0 p-6 grid grid-cols-2 gap-4">
            {/* Performance Metrics */}
            <div className="space-y-4">
              <div className="bg-black/40 rounded-lg p-4 transition-all duration-300 hover:bg-black/50 group/item">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Response Time</span>
                  <span className="text-[#E5855E] text-sm">98.2ms avg</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-gradient-to-r from-[#E5855E]/60 to-[#E5855E] group-hover/item:shadow-[0_0_10px_#E5855E]"/>
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 transition-all duration-300 hover:bg-black/50 group/item">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Success Rate</span>
                  <span className="text-[#E5855E] text-sm">99.9%</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full w-[99%] bg-gradient-to-r from-[#E5855E]/60 to-[#E5855E] group-hover/item:shadow-[0_0_10px_#E5855E]"/>
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 transition-all duration-300 hover:bg-black/50 group/item">
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
            <div className="bg-black/40 rounded-lg p-4 overflow-hidden">
              <div className="text-white/60 text-sm mb-4">Recent Updates</div>
              <div className="space-y-3">
                {[
                  { time: '2m ago', text: 'Performance optimization complete', type: 'success' },
                  { time: '15m ago', text: 'New model version deployed', type: 'info' },
                  { time: '1h ago', text: 'Automated backup successful', type: 'success' },
                  { time: '3h ago', text: 'System health check passed', type: 'success' }
                ].map((update, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm group/update">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      update.type === 'success' ? 'bg-[#E5855E]' : 'bg-blue-400'
                    }`}/>
                    <div className="flex-1">
                      <p className="text-white/80 transition-colors duration-300 group-hover/update:text-white">
                        {update.text}
                      </p>
                      <span className="text-white/40 text-xs">{update.time}</span>
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

// Add new variants for content transitions
const contentVariants = {
  enter: {
    opacity: 0
  },
  center: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

// Add new variants for diagrams
const diagramVariants = {
  enter: {
    opacity: 0
  },
  center: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(Date.now());
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;
      
      // Throttle rapid scrolling
      if (timeSinceLastScroll < 50) return;
      lastScrollTime.current = now;

      // Calculate step based on scroll position
      const progress = Math.min(Math.max(latest, 0), 1);
      let targetStep;

      if (progress < 0.33) {
        targetStep = 0;
      } else if (progress < 0.66) {
        targetStep = 1;
      } else {
        targetStep = 2;
      }

      // Ensure we only move one step at a time
      if (targetStep !== activeStep) {
        const stepDiff = targetStep - activeStep;
        const nextStep = activeStep + Math.sign(stepDiff);
        
        setDirection(stepDiff > 0 ? 1 : -1);
        setActiveStep(nextStep);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeStep]);

  const currentContent = useMemo(() => (
    <div className="relative grid grid-cols-12 gap-8">
      {/* Left side - Steps */}
      <div className="col-span-6 overflow-hidden">
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
            className="relative min-h-[300px] flex items-center"
          >
            <div>
              <h3 className="text-[2.75rem] font-light leading-tight" style={gradientTextStyle}>
                {steps[activeStep].title}
              </h3>
              <p className="text-white/80 text-xl mt-4 leading-relaxed">
                {steps[activeStep].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side - Content */}
      <div className="col-span-6 overflow-hidden">
        <div className="space-y-6">
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
  ), [activeStep, direction]);

  return (
    <section ref={containerRef} className="h-[300vh] relative" role="region" aria-label="Our process">
      <div className="sticky top-0 h-screen flex items-center justify-center w-full">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="mb-16">
            <span className="text-[#E5855E] text-sm tracking-wide uppercase">Our Process</span>
            <h2 className="text-[7.5rem] font-normal mt-4 leading-none" style={gradientTextStyle}>
              How we work
            </h2>
          </div>
          {currentContent}
        </div>
      </div>
      <motion.div 
        className="fixed left-0 bottom-0 h-1 bg-[#E5855E]" 
        style={{ width: scrollYProgress.get() + '%' }} 
      />
    </section>
  );
};

export default Process; 