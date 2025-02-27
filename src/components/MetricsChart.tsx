import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MetricsChart = ({}: Record<string, never>) => {
  const [isInView, setIsInView] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const efficiencyData = [15, 25, 32, 38, 42, 46];
  const costData = [-2, -5, -7, -9, -10, -11];
  const years = ["2023", "2024", "2025", "2026", "2027", "2028"];

  const showStats = (index: number) => {
    return hoveredIndex === index || (hoveredIndex === null && index === 1);
  };

  // Calculate dot positions for upward trajectory
  const getYPosition = (value: number) => {
    const maxValue = Math.max(...efficiencyData);
    const minValue = Math.min(...efficiencyData);
    const range = maxValue - minValue;
    const normalizedValue = (value - minValue) / range;
    return 100 - (normalizedValue * 40 + 30);
  };

  return (
    <motion.div 
      className="space-y-2"
      onViewportEnter={() => setIsInView(true)}
    >
      <div className="relative w-full h-[200px] bg-black/90 rounded-lg border border-white/10 overflow-hidden px-4 py-6">
        {/* Gradient definitions */}
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <linearGradient id="textGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFB088" />
              <stop offset="100%" stopColor="#E5855E" />
            </linearGradient>
            <linearGradient id="activeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FFB088" />
            </linearGradient>
            <linearGradient id="dotGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E5855E" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Stats container */}
        <div className="absolute inset-x-4 top-2">
          <div className="grid grid-cols-6 w-full">
            {efficiencyData.map((value, i) => (
              <AnimatePresence key={`stats-${i}`}>
                {showStats(i) && (
                  <motion.div
                    className="col-start-[var(--col)] col-span-1 text-center"
                    style={{ 
                      '--col': i + 1,
                    } as React.CSSProperties}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="text-white whitespace-nowrap text-xs"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="text-white/60">Efficiency</span>{' '}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFB088] to-[#E5855E]">
                        +{value}%
                      </span>
                    </motion.div>

                    <motion.div
                      className="text-white whitespace-nowrap mt-0.5 text-xs"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.15, delay: 0.05 }}
                    >
                      <span className="text-white/60">Cost</span>{' '}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFB088] to-[#E5855E]">
                        {costData[i]}%
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </div>

        {/* Dots container */}
        <div className="absolute inset-x-4 top-14 bottom-10 flex justify-between items-stretch">
          {efficiencyData.map((value, i) => (
            <div 
              key={i} 
              className="relative flex-1 flex items-center group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="absolute"
                style={{ 
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: `${getYPosition(value)}%` 
                }}
              >
                {/* Dot */}
                <motion.div
                  className={`w-2 h-2 rounded-full relative cursor-pointer z-10 ${
                    hoveredIndex === i || (hoveredIndex === null && i === 1)
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFB088]'
                      : 'bg-gradient-to-r from-[#E5855E] to-[#FF6B6B]'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: hoveredIndex === i || (hoveredIndex === null && i === 1) ? 1.4 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Years */}
        <div className="absolute bottom-2 inset-x-4 flex justify-between">
          {years.map((year, i) => (
            <motion.span
              key={year}
              className={`text-xs transition-colors duration-200 ${
                hoveredIndex === i || (hoveredIndex === null && i === 1)
                  ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#FFB088]'
                  : 'text-white/40'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ delay: i * 0.1 }}
            >
              {year}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsChart;