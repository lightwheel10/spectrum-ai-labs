import { motion } from 'framer-motion';
import { GlowingButton, CalendarGlowingButton } from '../ui/GlowingButton';
import { memo, useEffect, useState } from 'react';
import Image from 'next/image';

// Optimize company logos animation with memoization
const CompanyLogos = memo(() => {
  // Add responsive state to adjust animation speed on smaller screens
  const [animationDuration, setAnimationDuration] = useState(25);

  // Adjust animation speed based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAnimationDuration(15); // Faster on mobile
      } else {
        setAnimationDuration(25);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="flex gap-6 sm:gap-8 md:gap-12 items-center"
      animate={{
        x: [0, -1200],
      }}
      transition={{
        x: {
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      }}
      style={{
        width: "fit-content",
        filter: "brightness(1.2) contrast(1.1)",
        willChange: "transform", // Hint to browser for optimization
      }}
    >
      {/* First set of logos - reduced sizes for mobile */}
      <Image src="/logos/nexus-core.svg" alt="NexusCore" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/quantum-sphere.svg" alt="QuantumSphere" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/synth-mind.svg" alt="SynthMind" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/apex-labs.svg" alt="Apex Labs" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/data-nova.svg" alt="DataNova" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/cyber-flux.svg" alt="CyberFlux" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/tensor-labs.svg" alt="TensorLabs" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/nova-scale.svg" alt="NovaScale" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      
      {/* Duplicate set for seamless loop */}
      <Image src="/logos/nexus-core.svg" alt="NexusCore" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/quantum-sphere.svg" alt="QuantumSphere" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/synth-mind.svg" alt="SynthMind" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/apex-labs.svg" alt="Apex Labs" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/data-nova.svg" alt="DataNova" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/cyber-flux.svg" alt="CyberFlux" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/tensor-labs.svg" alt="TensorLabs" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
      <Image src="/logos/nova-scale.svg" alt="NovaScale" width={192} height={64} className="h-8 w-24 sm:h-10 sm:w-32 md:h-16 md:w-48 opacity-90 hover:opacity-100 transition-opacity" priority />
    </motion.div>
  );
});

// Add display name
CompanyLogos.displayName = 'CompanyLogos';

// Animation variants for consistent animations and better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1.0], // Improved easing curve
      delay: custom * 0.1
    }
  })
};

const Hero = () => {
  // Smooth scroll function for button clicks
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Spacer for navbar */}
      <div className="h-16 md:h-20" />

      {/* Content */}
      <div className="flex-1 flex items-center mt-8 sm:mt-12 md:mt-16">
        <div className="relative z-10 text-center w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium mb-4 sm:mb-6 tracking-[-0.02em] leading-[1.1]"
            style={{
              color: '#fff',
              textShadow: '0 0 80px rgba(255,255,255,0.5)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            AI Solutions
            <br />
            Built for Growth
          </motion.h1>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInUpVariants}
            className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textShadow: '0 0 40px rgba(255,255,255,0.3)'
            }}
          >
            We build AI solutions that drive real business results.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeInUpVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
          >
            <GlowingButton 
              onClick={() => scrollToSection('services')} 
              className="hero-button static w-full sm:w-auto"
              size="default"
              skipCalendar={true}
            >
              Our Services <span className="ml-2">↗</span>
            </GlowingButton>
            <CalendarGlowingButton 
              className="hero-button work-with-us w-full sm:w-auto mt-4 sm:mt-0"
              size="default"
            >
              Work with us <span className="ml-2">↗</span>
            </CalendarGlowingButton>
          </motion.div>

          {/* Company Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            variants={fadeInUpVariants}
            className="mt-12 sm:mt-16 md:mt-20 text-center"
          >
            <p className="text-white/60 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm font-medium">You&apos;re in good company</p>
            <div className="relative w-full max-w-full mx-auto overflow-hidden">
              <div className="relative w-full overflow-hidden mix-blend-screen">
                <CompanyLogos />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 