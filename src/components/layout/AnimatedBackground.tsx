import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

// Restored original numbers of elements but kept other optimizations
const NUM_POINTS = 30; // Restored original value
const MAX_DISTANCE = 300; // Restored original value
const ANIMATION_INTERVAL = 50; // Kept optimization (increased from 30)
const NUM_DECORATIVE_LINES = 8; // Restored original value
const NUM_STARS = 20; // Restored original value

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState<Point[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Memoize the resize handler to prevent recreation on each render
  const handleResize = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  // Intersection Observer to pause animation when off-screen
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
    // Only run client-side
    if (typeof window === 'undefined') return;

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    setMounted(true);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Generate initial points - memoized to only run when dimensions change
  useEffect(() => {
    if (!mounted || dimensions.width === 0) return;

    const newPoints = Array.from({ length: NUM_POINTS }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 1, // Restored original velocity
      vy: (Math.random() - 0.5) * 1, // Restored original velocity
    }));

    setPoints(newPoints);

    // Animation function with performance optimizations
    const animate = () => {
      // Only animate when visible
      if (!isVisible) return;

      setPoints(currentPoints =>
        currentPoints.map(point => ({
          x: ((point.x + point.vx + dimensions.width) % dimensions.width),
          y: ((point.y + point.vy + dimensions.height) % dimensions.height),
          vx: point.vx,
          vy: point.vy,
        }))
      );
    };

    const interval = setInterval(animate, ANIMATION_INTERVAL);
    return () => clearInterval(interval);
  }, [mounted, dimensions, isVisible]);

  // Calculate lines between nearby points - kept optimizations but restored max connections
  const lines = useMemo(() => {
    if (points.length === 0) return [];
    
    const result: Line[] = [];
    const maxDistanceSquared = MAX_DISTANCE * MAX_DISTANCE;
    
    for (let i = 0; i < points.length; i++) {
      // Removed connection limit to restore original behavior
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distanceSquared = dx * dx + dy * dy;
        
        if (distanceSquared < maxDistanceSquared) {
          const opacity = (1 - Math.sqrt(distanceSquared) / MAX_DISTANCE) * 0.8; // Restored original opacity
          result.push({
            x1: points[i].x,
            y1: points[i].y,
            x2: points[j].x,
            y2: points[j].y,
            opacity,
          });
        }
      }
    }
    
    return result;
  }, [points]);

  // Memoize decorative lines to prevent recreation on each render
  const decorativeLines = useMemo(() => {
    return Array.from({ length: NUM_DECORATIVE_LINES }, (_, i) => ({
      id: `decor-line-${i}`,
      x1: `${Math.random() * 100}%`,
      y1: `${Math.random() * 100}%`,
      x2: `${Math.random() * 100}%`,
      y2: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 2
    }));
  }, []);

  // Memoize stars to prevent recreation on each render
  const stars = useMemo(() => {
    if (!mounted || dimensions.width === 0) return [];
    
    return Array.from({ length: NUM_STARS }, (_, i) => ({
      id: `star-${i}`,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      opacity: Math.random() * 0.5 + 0.25,
      duration: Math.random() * 10 + 10
    }));
  }, [mounted, dimensions]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-[#0A0A0A] overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.9), rgba(239, 68, 68, 0.15)), radial-gradient(circle at top right, rgba(234, 88, 12, 0.25), transparent 50%)',
          backgroundBlendMode: 'multiply'
        }}
      />

      {/* Network and Line Animations - restored original complexity */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.3)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.1)' }} />
            </linearGradient>
          </defs>
          
          {/* Network Lines */}
          {lines.map((line, i) => (
            <motion.line
              key={`network-line-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.75"
              initial={{ opacity: 0 }}
              animate={{ opacity: line.opacity }}
              transition={{ duration: 0.5 }}
            />
          ))}

          {/* Network Dots */}
          {points.map((point, i) => (
            <motion.circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r="2" // Restored original size
              fill="rgba(255,255,255,1)"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 2, // Restored original duration
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1 // Kept optimization (added delay between animations)
              }}
            />
          ))}

          {/* Decorative Lines */}
          {decorativeLines.map((line) => (
            <motion.line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }} // Restored original opacity
              transition={{
                duration: line.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                repeatDelay: 0.5 // Kept optimization (added delay between animations)
              }}
            />
          ))}
        </svg>
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            initial={{
              opacity: star.opacity,
              x: star.x,
              y: star.y,
            }}
            animate={{
              opacity: [null, 0, star.opacity, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1 // Kept optimization (added delay between animations)
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground; 