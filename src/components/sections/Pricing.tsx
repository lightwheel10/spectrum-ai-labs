import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { CalendarGlowingButton } from '../ui/GlowingButton';

// Animation variants for consistent animations
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1.0],
      delay: custom * 0.1
    }
  })
};

const pricingPlans = [
  {
    title: "Starter",
    price: "$1997",
    period: "/month",
    description: "For small businesses starting their AI journey.",
    features: [
      "1 dedicated AI developer",
      "Chatbot or workflow automation",
      "AI implementation consulting",
      "Integration with existing systems",
      "Email & chat support",
      "Cancel & pause anytime"
    ],
    buttonText: "Work with us",
    recommended: false
  },
  {
    title: "Professional",
    price: "$3997",
    period: "/month",
    description: "For organizations looking to unlock the full power of AI & automations.",
    features: [
      "2 dedicated AI developers",
      "Advanced chatbots & automations",
      "Voice agent development",
      "AI business strategy consulting",
      "Continuous optimization",
      "Cancel & pause anytime"
    ],
    buttonText: "Work with us",
    recommended: true
  },
  {
    title: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex AI requirements.",
    features: [
      "3+ dedicated AI developers",
      "Custom AI solution development",
      "Industry-specific implementations",
      "Strategic AI consulting",
      "Dedicated account manager",
      "SLA & priority support"
    ],
    buttonText: "Work with us",
    recommended: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <motion.span 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
            className="text-[#FF8C00] text-sm"
          >
            Pricing
          </motion.span>
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeInUpVariants}
            className="text-6xl font-normal text-white mt-4"
          >
            Our Pricing
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInUpVariants}
            className="text-white/60 mt-4 max-w-2xl text-lg"
          >
            Transparent pricing for AI solutions that deliver real business value
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 3}
              variants={fadeInUpVariants}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                plan.recommended ? 'lg:scale-105 lg:-translate-y-2 z-10 shadow-xl shadow-[#FF8C00]/20 border border-[#FF8C00]/30' : ''
              }`}
            >
              {/* Background with gradient that fades away */}
              <div 
                className="absolute inset-0 z-0" 
                style={{
                  background: plan.recommended 
                    ? 'radial-gradient(circle at top right, rgba(234, 88, 12, 0.5), rgba(10, 10, 10, 0.9) 70%)' 
                    : 'radial-gradient(circle at top right, rgba(234, 88, 12, 0.15), rgba(10, 10, 10, 0.95) 70%)',
                  backdropFilter: 'blur(5px)'
                }}
              />
              
              {/* Subtle particle effect */}
              <div className="absolute inset-0 z-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-[2px] h-[2px] rounded-full bg-[#FF8C00]/60"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.2,
                      animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
                    }}
                  />
                ))}
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-2xl font-normal text-[#FF8C00]">{plan.title}</h3>
                
                {/* Price */}
                <div className="mt-4 mb-4">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-1">{plan.period}</span>
                  </div>
                </div>
                
                {/* Description - fixed height to align buttons */}
                <div className="h-20 mb-6">
                  <p className="text-white/70">{plan.description}</p>
                </div>
                
                {/* Button */}
                <div className="flex justify-center mb-8">
                  <CalendarGlowingButton 
                    className={`hero-button ${plan.recommended ? 'work-with-us' : 'static'} w-full text-lg py-3`}
                    size="default"
                  >
                    {plan.buttonText} <span className="ml-2">↗</span>
                  </CalendarGlowingButton>
                </div>
                
                {/* Divider */}
                <div className="flex justify-center mb-6">
                  <div className="text-[#FF8C00]">★</div>
                </div>
                
                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-[#FF8C00] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Add CSS for the twinkling effect */}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default Pricing; 