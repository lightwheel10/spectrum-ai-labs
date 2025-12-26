// FIX 26/12/2025: Created Founder section to replace Team section for solo founder agency
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// FIX 26/12/2025: Changed to opacity-only animations to prevent layout shifts
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Founder = () => {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20" id="founder">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="founder-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#E5855E" offset="0%" />
            <stop stopColor="#FF6B6B" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#E5855E] rounded-full opacity-5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-[#FF6B6B] rounded-full opacity-5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeInVariants}
          className="mb-2 sm:mb-3 md:mb-4"
        >
          <span className="text-[#E5855E] text-sm tracking-wide uppercase">Founder</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeInVariants}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-6 sm:mb-8 md:mb-12"
          style={{
            textShadow: '0 0 80px rgba(255,255,255,0.5)',
            background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.8))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The person behind the work
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={fadeInVariants}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#E5855E]/20 hover:border-[#E5855E] transition-all duration-300 flex-shrink-0">
            <Image
              src="https://media.licdn.com/dms/image/v2/D4E03AQFOBeANsQyMAw/profile-displayphoto-scale_200_200/B4EZnKRZLYIkAc-/0/1760035183634?e=1768435200&v=beta&t=FE4usurAnJAdd7FXza7CEbVxa74xdVO6gzNysnC1FF4"
              alt="Paras - Founder"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
              unoptimized
            />
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-2">Paras</h3>
            <span className="text-[#E5855E] text-sm mb-4 block">Founder & AI Specialist</span>
            <p className="text-white/70 text-base sm:text-lg max-w-xl">
              With years of experience in AI development, Spectrum AI Labs was founded to bring enterprise-grade AI solutions to businesses of all sizes. We believe in direct collaboration. When you work with us, you get full attention and expertise, not a revolving door of team members.
            </p>
          </div>
        </motion.div>

        <div className="absolute -bottom-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E5855E]/20 to-transparent" />
      </div>
    </section>
  );
};

export default Founder;
