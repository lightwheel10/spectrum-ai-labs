// FIX 26/12/2025: Render footer immediately with fade-in to prevent layout shift
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

const DelayedFooter = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Delay footer visibility but keep it in layout
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Always render footer to reserve space, just control visibility with opacity
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showFooter ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ willChange: 'opacity' }}
    >
      <Footer />
    </motion.div>
  );
};

export default DelayedFooter; 