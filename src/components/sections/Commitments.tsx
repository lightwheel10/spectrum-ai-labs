import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  KeyIcon,
  PauseCircleIcon,
} from '@heroicons/react/24/outline';

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: custom * 0.1
    }
  })
};

const commitments = [
  {
    title: "Direct access, always",
    desc: "You work directly with the person building your system. No account managers, no handoffs, no telephone game.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "You approve before launch",
    desc: "Every workflow, every AI response, every message gets your sign-off before it touches a customer. Nothing goes live until you've seen it work.",
    icon: ShieldCheckIcon,
  },
  {
    title: "You own everything",
    desc: "Code, data, accounts, and integrations belong to you from day one. If you ever leave, all of it goes with you.",
    icon: KeyIcon,
  },
  {
    title: "Pause or cancel anytime",
    desc: "No lock-in contracts. If we're not delivering value, you stop paying. That keeps us accountable every single month.",
    icon: PauseCircleIcon,
  },
];

const Commitments = () => {
  return (
    <section className="relative py-20">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E5855E]/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          custom={0}
          className="mb-12 sm:mb-16"
        >
          <span className="text-[#E5855E] text-sm">Why Spectrum</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white mt-4">
            Commitments we make to every client
          </h2>
          <p className="text-white/60 mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg">
            We earn trust by how we work, not by logos on a wall. These four
            commitments apply to every engagement, no exceptions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {commitments.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              custom={index + 1}
              className="p-6 sm:p-8 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm"
            >
              <item.icon className="h-8 w-8 text-[#E5855E] mb-4 sm:mb-5" aria-hidden="true" />
              <h3 className="text-xl sm:text-2xl font-normal text-white mb-2 sm:mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Commitments;
