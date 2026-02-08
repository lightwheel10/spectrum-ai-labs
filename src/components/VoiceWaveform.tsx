import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const VoiceWaveform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if we're on a mobile device initially
    const checkMobileView = () => {
      const mobileBreakpoint = 768; // Standard tablet/mobile breakpoint
      setIsMobileView(window.innerWidth < mobileBreakpoint);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    window.addEventListener('orientationchange', checkMobileView);

    return () => {
      window.removeEventListener('resize', checkMobileView);
      window.removeEventListener('orientationchange', checkMobileView);
    };
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

  useEffect(() => {
    // Skip canvas animation for mobile/reduced motion/off-screen.
    if (isMobileView || reduceMotion || !isVisible || !canvasRef.current || !containerRef.current) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container || !canvasRef.current) return;
      
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas size accounting for device pixel ratio
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      
      // Get context and set scale immediately after resize
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Reset transform before applying scale to prevent compounding
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    
    // Listen to both resize and orientationchange events
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!canvas || !ctx) return;
      
      const WIDTH = canvas.width / (window.devicePixelRatio || 1);
      const HEIGHT = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      const centerX = WIDTH / 2;
      
      // Base size calculations on viewport width for better responsiveness
      const isSmallScreen = WIDTH < 375;
      const barWidth = isSmallScreen ? 2 : 3;
      const gap = isSmallScreen ? 8 : 12;
      const maxBars = isSmallScreen ? 7 : 11;
      
      timeRef.current += 0.016;
      const time = timeRef.current;

      for (let i = 0; i < maxBars; i++) {
        const heightMultiplier = Math.min(1, 0.4 + (i < maxBars / 2 ? i : (maxBars - i)) / (maxBars / 2));
        const baseHeight = HEIGHT * 0.3 * heightMultiplier;
        
        const positionPhase = i / maxBars * Math.PI;
        const timePhase = time * 1.5 + positionPhase;
        
        const wave1 = Math.sin(timePhase) * 20;
        const wave2 = Math.sin(timePhase * 0.5) * 10;
        const variation = (wave1 + wave2) * (0.6 + Math.sin(time * 0.5) * 0.4);
        
        const barHeight = Math.max(isSmallScreen ? 16 : 20, baseHeight + variation);
        
        const spacing = barWidth + gap;
        
        const gradient = ctx.createLinearGradient(0, HEIGHT / 2 - barHeight, 0, HEIGHT / 2 + barHeight);
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0)');
        gradient.addColorStop(0.2, 'rgba(239, 68, 68, 0.98)');
        gradient.addColorStop(0.4, 'rgba(234, 88, 12, 1)');
        gradient.addColorStop(0.6, 'rgba(229, 133, 94, 1)');
        gradient.addColorStop(0.8, 'rgba(234, 88, 12, 0.98)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        
        ctx.fillStyle = gradient;
        
        ctx.shadowColor = 'rgba(234, 88, 12, 0.6)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Scale offset proportionally to screen width
        const screenRatio = Math.max(0.5, Math.min(1, WIDTH / 500));
        const baseOffset = isSmallScreen ? 8 : 15;
        const adjustedOffset = Math.round(baseOffset * screenRatio);
        
        const barPositionLeft = centerX - (i + 1) * spacing - adjustedOffset;
        const barPositionRight = centerX + i * spacing + adjustedOffset;
        
        ctx.fillRect(barPositionLeft, HEIGHT / 2 - barHeight / 2, barWidth, barHeight);
        ctx.fillRect(barPositionRight, HEIGHT / 2 - barHeight / 2, barWidth, barHeight);
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobileView, reduceMotion, isVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!isMobileView && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full -z-10"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="absolute w-28 sm:w-40 h-28 sm:h-40 rounded-full bg-[#E5855E]"
          animate={reduceMotion ? { opacity: 0.05, scale: 1, filter: "blur(12px)" } : {
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.1, 1],
            filter: ["blur(12px)", "blur(16px)", "blur(12px)"]
          }}
          transition={{
            duration: 2,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="relative w-20 sm:w-28 h-20 sm:h-28 rounded-full border border-[#E5855E]/30 z-10"
          animate={reduceMotion ? {
            scale: 1,
            boxShadow: '0 0 15px 3px rgba(229, 133, 94, 0.15), inset 0 0 10px 3px rgba(229, 133, 94, 0.1)'
          } : {
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 0 15px 3px rgba(229, 133, 94, 0.15), inset 0 0 10px 3px rgba(229, 133, 94, 0.1)',
              '0 0 25px 8px rgba(229, 133, 94, 0.2), inset 0 0 15px 5px rgba(229, 133, 94, 0.15)',
              '0 0 15px 3px rgba(229, 133, 94, 0.15), inset 0 0 10px 3px rgba(229, 133, 94, 0.1)'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-[#E5855E]"
            animate={reduceMotion ? { opacity: 0.1, filter: "blur(3px)" } : {
              opacity: [0.05, 0.2, 0.05],
              filter: ["blur(3px)", "blur(5px)", "blur(3px)"]
            }}
            transition={{
              duration: 1.5,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg 
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              viewBox="0 0 24 24" 
              fill="none"
              animate={reduceMotion ? { scale: 1 } : {
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut"
              }}
            >
              <path 
                d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                className="fill-white"
              />
              <path 
                d="M19 10v2a7 7 0 0 1-14 0v-2M12 18.5v3.5M8 22h8"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceWaveform; 
