import { motion } from 'framer-motion';
import { GlowingButton, CalendarGlowingButton } from '../ui/GlowingButton';

// FIX 26/12/2025: Changed to opacity-only animations to prevent layout shifts
// Using transform for y movement is GPU-accelerated but can still cause visual jank on load
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: custom * 0.08
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
            variants={fadeInVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium mb-4 sm:mb-6 tracking-[-0.02em] leading-[1.1]"
            style={{
              color: '#fff',
              textShadow: '0 0 80px rgba(255,255,255,0.5)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Make Your Business
            <br />
            AI-First
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInVariants}
            className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textShadow: '0 0 40px rgba(255,255,255,0.3)'
            }}
          >
            We automate your workflows, integrate AI into your processes, and build intelligent systems that work 24/7. Cut costs, save time, scale faster.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeInVariants}
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
        </div>
      </div>
    </div>
  );
};

export default Hero; 