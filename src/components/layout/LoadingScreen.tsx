import { motion } from 'framer-motion';
import { useState, useEffect, memo } from 'react';

const loadingMessages = [
  "Initializing AI Systems",
  "Calibrating Neural Networks",
  "Syncing Cloud Infrastructure",
  "Loading Innovation Protocols"
];

// Animation variants for consistent animations and better performance
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

// Memoized loading message component to prevent unnecessary re-renders
const LoadingMessage = memo(({ message }: { message: string }) => (
  <motion.span
    variants={fadeUpVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="text-sm font-medium text-white/70 inline-block"
  >
    {message}
  </motion.span>
));

// Add display name
LoadingMessage.displayName = 'LoadingMessage';

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        // Only increment if we haven't shown all messages
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev; // Stay on last message
      });
    }, 950); // ~3.8s total / 4 messages = ~950ms per message

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-7xl font-medium mb-12 tracking-[-0.02em] leading-[1.1]"
          style={{
            color: '#fff',
            textShadow: '0 0 80px rgba(255,255,255,0.5)',
          }}
        >
          <span className="bg-gradient-to-r from-[#FF4500] to-[#FF8C00] bg-clip-text text-transparent">
            Spectrum
          </span>
          <span className="text-white mx-3">AI</span>
          <span className="text-white">Labs</span>
        </motion.h1>

        {/* Loading Bar */}
        <div className="relative w-64">
          <motion.div 
            className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
              }}
              style={{
                background: 'linear-gradient(to right, rgba(239, 68, 68, 0.8), rgba(234, 88, 12, 0.8))',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
                willChange: 'width', // Hint to browser for optimization
              }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="absolute -bottom-8 left-0 right-0 text-center h-6" // Fixed height to prevent jumping
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LoadingMessage message={loadingMessages[messageIndex]} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 