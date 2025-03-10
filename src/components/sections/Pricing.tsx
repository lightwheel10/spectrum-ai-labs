import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { CalendarGlowingButton } from '../ui/GlowingButton';
import { FC } from 'react';

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

// Types for better adaptability
export interface PricingPlan {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  recommended: boolean;
}

export interface PricingProps {
  title?: string;
  subtitle?: string;
  description?: string;
  plans?: PricingPlan[];
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  recommendedCardClassName?: string;
  columnLayout?: 'responsive' | '1-column' | '2-column' | '3-column';
}

// Default pricing plans
const defaultPricingPlans: PricingPlan[] = [
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

const Pricing: FC<PricingProps> = ({
  title = "Our Pricing",
  subtitle = "Pricing",
  description = "Transparent pricing for AI solutions that deliver real business value",
  plans = defaultPricingPlans,
  className = "py-12 sm:py-16 md:py-20 relative",
  containerClassName = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  cardClassName = "relative overflow-hidden rounded-2xl transition-all duration-300 h-full",
  recommendedCardClassName = "border border-[#FF8C00]/30 shadow-lg shadow-[#FF8C00]/20 sm:scale-100 md:scale-[1.02] lg:scale-105 lg:-translate-y-2 z-10",
  columnLayout = "responsive"
}) => {
  // Determine grid columns based on layout preference or number of plans
  const getGridClass = () => {
    if (columnLayout === '1-column') return 'grid-cols-1';
    if (columnLayout === '2-column') return 'grid-cols-1 sm:grid-cols-2';
    if (columnLayout === '3-column') return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    
    // Default responsive behavior based on number of plans
    if (plans.length === 1) return 'grid-cols-1';
    if (plans.length === 2) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id="pricing" className={className}>
      <div className={containerClassName}>
        {/* Header with responsive typography */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <motion.span 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
            className="text-[#FF8C00] text-sm sm:text-base tracking-wide uppercase"
          >
            {subtitle}
          </motion.span>
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeInUpVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mt-2 sm:mt-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInUpVariants}
            className="text-white/60 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
          >
            {description}
          </motion.p>
        </div>

        {/* Responsive grid with adjustable gap sizes */}
        <div className={`grid ${getGridClass()} gap-4 xs:gap-5 sm:gap-6 lg:gap-8 max-w-lg sm:max-w-none mx-auto`}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 3}
              variants={fadeInUpVariants}
              className={`${cardClassName} ${
                plan.recommended ? 
                  `${recommendedCardClassName} order-first sm:order-none ${plans.length === 3 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}` : 
                  ''
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
              
              {/* Recommended badge for small screens */}
              {plan.recommended && (
                <div className="absolute top-0 right-0 z-20 bg-[#FF8C00] text-black text-xs font-medium px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  Recommended
                </div>
              )}
              
              {/* Content with responsive spacing */}
              <div className="relative z-10 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col h-full">
                {/* Title with responsive typography */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-[#FF8C00]">{plan.title}</h3>
                
                {/* Price with responsive typography */}
                <div className="mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-baseline">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-1 text-xs sm:text-sm md:text-base">{plan.period}</span>
                  </div>
                </div>
                
                {/* Description with responsive spacing */}
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <p className="text-white/70 text-xs sm:text-sm md:text-base">{plan.description}</p>
                </div>
                
                {/* Button with responsive spacing */}
                <div className="flex justify-center mb-4 sm:mb-5 md:mb-8">
                  <CalendarGlowingButton 
                    className={`hero-button ${plan.recommended ? 'work-with-us' : 'static'} w-full text-sm sm:text-base py-2 sm:py-3`}
                    size="default"
                    fullWidth={true}
                  >
                    {plan.buttonText} <span className="ml-2">↗</span>
                  </CalendarGlowingButton>
                </div>
                
                {/* Divider with responsive spacing */}
                <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                  <div className="text-[#FF8C00]">★</div>
                </div>
                
                {/* Features with responsive spacing */}
                <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-auto">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FF8C00] mr-1.5 sm:mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-xs sm:text-sm md:text-base">{feature}</span>
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
        
        /* Add xs breakpoint for very small screens */
        @media (min-width: 480px) {
          .xs\\:gap-5 {
            gap: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Pricing; 