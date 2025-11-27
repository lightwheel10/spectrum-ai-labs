import Head from 'next/head';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import critical components normally
import Navbar from '../components/layout/Navbar';
import LoadingScreen from '../components/layout/LoadingScreen';
import DelayedFooter from '../components/layout/DelayedFooter';

// Dynamically import non-critical components
const AnimatedBackground = dynamic(
  () => import('../components/layout/AnimatedBackground'),
  { ssr: false } // Don't render on server for better performance
);

// Empty loader for Hero section to prevent flash of loading spinner
const EmptyLoader = () => null;

// Dynamically import sections with loading fallbacks
const Hero = dynamic(() => import('../components/sections/Hero'), { ssr: true, loading: () => <EmptyLoader /> });
const About = dynamic(() => import('../components/sections/About'), { ssr: false, loading: () => <SectionLoader /> });
const Services = dynamic(() => import('../components/sections/Services'), { ssr: false, loading: () => <SectionLoader /> });
const Process = dynamic(() => import('../components/sections/Process'), { ssr: false, loading: () => <SectionLoader /> });
const Industries = dynamic(() => import('../components/sections/Industries'), { ssr: false, loading: () => <SectionLoader /> });
const Team = dynamic(() => import('../components/sections/Team'), { ssr: false, loading: () => <SectionLoader /> });
const Testimonials = dynamic(() => import('../components/sections/Testimonials'), { ssr: false, loading: () => <SectionLoader /> });
const Pricing = dynamic(() => import('../components/sections/Pricing'), { ssr: false, loading: () => <SectionLoader /> });
const FAQ = dynamic(() => import('../components/sections/FAQ'), { ssr: false, loading: () => <SectionLoader /> });
const Contact = dynamic(() => import('../components/sections/Contact'), { ssr: false, loading: () => <SectionLoader /> });

// Simple loading fallback component
const SectionLoader = () => (
  null
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Reduced from 3800ms to 3000ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Spectrum AI Labs - Innovative AI Solutions</title>
        <meta name="description" content="Spectrum AI Labs provides cutting-edge artificial intelligence solutions for businesses. Transform your operations with our innovative AI technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://cdn.worldvectorlogo.com" />
        <link rel="preconnect" href="https://cdn.cdnlogo.com" />
        
        {/* Inline critical CSS */}
        <style>{`
          body {
            background: #0A0A0A;
            margin: 0;
            padding: 0;
          }
          #__next {
            opacity: 0;
            animation: fadeIn 0.3s ease-in forwards;
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}</style>
      </Head>

      {/* Static background skeleton for SSR - prevents blank flash */}
      {!mounted && (
        <div className="fixed inset-0 z-0 bg-[#0A0A0A]" />
      )}

      {/* Shared background that stays mounted */}
      {mounted && <AnimatedBackground />}

      {/* Content that transitions */}
      <AnimatePresence mode="wait">
        {mounted && loading ? (
          <LoadingScreen key="loading" />
        ) : mounted ? (
          <motion.div
            key="content-wrapper"
            initial={{ opacity: 0, visibility: 'hidden' }}
            animate={{ opacity: 1, visibility: 'visible' }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full overflow-x-hidden"
          >
                <motion.main 
                  key="main" 
                  className="min-h-screen relative z-10 overflow-x-hidden"
                >
                  <Navbar />
                  
                  {/* Hero section - prioritize loading this first */}
                  <section id="hero">
                    <Hero />
                  </section>
                  
                  <section id="about">
                    <About />
                  </section>
                  
                  <section id="services">
                    <Services />
                  </section>
                  
                  <section id="process">
                    <Process />
                  </section>
                  
                  <section id="industries">
                    <Industries />
                  </section>
                  
                  <section id="testimonials">
                    <Testimonials />
                  </section>
                  
                  <section id="pricing">
                    <Pricing />
                  </section>
                  
                  <section id="team">
                    <Team />
                  </section>
                  
                  <section id="contact">
                    <Contact />
                  </section>
                  
                  <section id="faq">
                    <FAQ />
                  </section>

                  {/* Delayed Footer */}
                  <DelayedFooter />
                </motion.main>
              </motion.div>
            ) : null}
          </AnimatePresence>

      {/* SSR fallback - show static loading skeleton */}
      {!mounted && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-4">
          <div className="relative z-10 flex flex-col items-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 sm:mb-8 md:mb-12 tracking-[-0.02em] leading-[1.1] text-center"
              style={{
                color: '#fff',
                textShadow: '0 0 80px rgba(255,255,255,0.5)',
              }}
            >
              <span className="bg-gradient-to-r from-[#FF4500] to-[#FF8C00] bg-clip-text text-transparent">
                Spectrum
              </span>
              <span className="text-white mx-2 sm:mx-3">AI</span>
              <span className="text-white">Labs</span>
            </h1>
            <div className="w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-[20rem]">
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(to right, rgba(239, 68, 68, 0.8), rgba(234, 88, 12, 0.8))',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
