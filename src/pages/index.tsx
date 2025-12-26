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
  { ssr: false }
);

// Empty loader component to prevent flash of loading spinners
const EmptyLoader = () => null;

// Dynamically import sections with loading fallbacks
const Hero = dynamic(() => import('../components/sections/Hero'), { ssr: true, loading: EmptyLoader });
const About = dynamic(() => import('../components/sections/About'), { ssr: false, loading: EmptyLoader });
const Services = dynamic(() => import('../components/sections/Services'), { ssr: false, loading: EmptyLoader });
const Process = dynamic(() => import('../components/sections/Process'), { ssr: false, loading: EmptyLoader });
const Industries = dynamic(() => import('../components/sections/Industries'), { ssr: false, loading: EmptyLoader });
const Founder = dynamic(() => import('../components/sections/Founder'), { ssr: false, loading: EmptyLoader });
const Testimonials = dynamic(() => import('../components/sections/Testimonials'), { ssr: false, loading: EmptyLoader });
const FAQ = dynamic(() => import('../components/sections/FAQ'), { ssr: false, loading: EmptyLoader });
const Contact = dynamic(() => import('../components/sections/Contact'), { ssr: false, loading: EmptyLoader });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

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

      {mounted ? <AnimatedBackground /> : <div className="fixed inset-0 z-0 bg-[#0A0A0A]" />}

      <AnimatePresence mode="wait">
        {mounted && loading ? (
          <LoadingScreen key="loading" />
        ) : mounted ? (
          <motion.div
            key="content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full overflow-x-hidden"
            style={{ willChange: 'opacity' }}
          >
            <motion.main
              key="main"
              className="min-h-screen relative z-10 overflow-x-hidden"
            >
              <Navbar />

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

              <section id="founder">
                <Founder />
              </section>

              <section id="contact">
                <Contact />
              </section>

              <section id="faq">
                <FAQ />
              </section>

              <DelayedFooter />
            </motion.main>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
                  className="h-full w-0"
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
