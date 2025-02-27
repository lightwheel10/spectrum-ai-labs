import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants for fade-in effect
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
};

// Team member structure
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

// Hardcoded team members
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Borus',
    role: 'CEO',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
  {
    id: '2',
    name: 'Ethan Walker',
    role: 'Sales',
    image: 'https://randomuser.me/api/portraits/men/71.jpg',
  },
  {
    id: '3',
    name: 'Liam Parker',
    role: 'Developer',
    image: 'https://randomuser.me/api/portraits/men/17.jpg',
  },
  {
    id: '4',
    name: 'Emily Carter',
    role: 'CCO',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
  },
  {
    id: '5',
    name: 'Sophia Scott',
    role: 'Marketing',
    image: 'https://randomuser.me/api/portraits/women/13.jpg',
  },
  {
    id: '6',
    name: 'Lucas Gray',
    role: 'Developer',
    image: 'https://randomuser.me/api/portraits/men/24.jpg',
  },
];

const Team = () => {
  return (
    <section className="relative py-20" id="team">
      {/* Define gradients for consistent styling with other sections */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="team-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#E5855E" offset="0%" />
            <stop stopColor="#FF6B6B" offset="100%" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Radial gradient overlay similar to other sections */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E5855E] rounded-full opacity-5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-[#FF6B6B] rounded-full opacity-5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeInUpVariants}
          className="mb-4"
        >
          <span className="text-[#E5855E] text-sm tracking-wide uppercase">Team</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeInUpVariants}
          className="text-6xl font-normal text-white mb-16"
          style={{
            textShadow: '0 0 80px rgba(255,255,255,0.5)',
            background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.8))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Meet the team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 2}
              variants={fadeInUpVariants}
              className="group"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-[#E5855E]/20 group-hover:border-[#E5855E] transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-white group-hover:text-[#E5855E] transition-colors duration-300">{member.name}</h3>
                <span className="text-[#E5855E] text-sm">{member.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Decorative element similar to other sections */}
        <div className="absolute -bottom-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E5855E]/20 to-transparent" />
      </div>
    </section>
  );
};

export default Team; 