import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const VoiceWaveform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container || !canvasRef.current) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvasRef.current.width = width * window.devicePixelRatio;
      canvasRef.current.height = height * window.devicePixelRatio;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const draw = () => {
      const WIDTH = canvas.width / window.devicePixelRatio;
      const HEIGHT = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      const centerX = WIDTH / 2;
      const barWidth = WIDTH < 300 ? 2 : 3;
      const gap = WIDTH < 300 ? 8 : 12;
      const maxBars = WIDTH < 300 ? 7 : 11;
      
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
        
        const barHeight = Math.max(WIDTH < 300 ? 16 : 20, baseHeight + variation);
        
        const spacing = barWidth + gap;
        // const centerGap = WIDTH < 300 ? 30 : 50;  // Defined but not used
        
        // const indexOffset = maxBars / 2;  // Defined but not used
        // const position = i - indexOffset;  // Defined but not used
        
        // These variables are defined but not used
        // const x = centerX + position * spacing;
        // const leftX = centerX - (maxBars - i) * spacing - centerGap;
        // const rightX = centerX + i * spacing + centerGap;
        
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
        
        const barPositionLeft = centerX - (i + 1) * spacing - (WIDTH < 300 ? 10 : 15);
        const barPositionRight = centerX + i * spacing + (WIDTH < 300 ? 10 : 15);
        
        ctx.fillRect(barPositionLeft, HEIGHT / 2 - barHeight / 2, barWidth, barHeight);
        ctx.fillRect(barPositionRight, HEIGHT / 2 - barHeight / 2, barWidth, barHeight);
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="absolute w-28 sm:w-40 h-28 sm:h-40 rounded-full bg-[#E5855E]"
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.1, 1],
            filter: ["blur(12px)", "blur(16px)", "blur(12px)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="relative w-20 sm:w-28 h-20 sm:h-28 rounded-full border border-[#E5855E]/30 z-10"
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 0 15px 3px rgba(229, 133, 94, 0.15), inset 0 0 10px 3px rgba(229, 133, 94, 0.1)',
              '0 0 25px 8px rgba(229, 133, 94, 0.2), inset 0 0 15px 5px rgba(229, 133, 94, 0.15)',
              '0 0 15px 3px rgba(229, 133, 94, 0.15), inset 0 0 10px 3px rgba(229, 133, 94, 0.1)'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-[#E5855E]"
            animate={{
              opacity: [0.05, 0.2, 0.05],
              filter: ["blur(3px)", "blur(5px)", "blur(3px)"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg 
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              viewBox="0 0 24 24" 
              fill="none"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
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