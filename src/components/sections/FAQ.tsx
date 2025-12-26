import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <motion.div 
      className="border-b border-gray-800 py-4 sm:py-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <button 
        className="flex w-full items-center justify-between text-left"
        onClick={onClick}
      >
        <h3 className="text-lg sm:text-xl font-medium text-white pr-4">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/80 flex-shrink-0"
        >
          <FiArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.div>
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "What makes Spectrum AI Labs unique?",
      answer: "Our AI solutions are built with cutting-edge technology and deep industry expertise to create truly tailored solutions. With a team of 9 experts, we focus on delivering higher accuracy and faster results than conventional approaches, making your organization more competitive in today's market."
    },
    {
      question: "Is my company a good fit for Spectrum AI Labs?",
      answer: "We work with businesses across various industries including E-commerce, Real Estate, Legal, Finance, and Healthcare. If you're looking to leverage AI to improve efficiency, automate workflows, enhance customer interactions, or gain insights from your data, we're likely a good fit. Our team can assess your specific needs during a consultation."
    },
    {
      question: "How does your subscription model work?",
      answer: "We offer flexible subscription plans starting at $1997/month for our Starter plan, which includes 1 dedicated AI developer. Our Professional plan at $3997/month includes 2 dedicated developers and more advanced features. For larger organizations, we offer custom Enterprise solutions. All plans include the ability to cancel or pause anytime."
    },
    {
      question: "How long does the development phase take?",
      answer: "Our development process follows a structured approach: Analyze & Plan, Build & Implement, and then Optimize & Scale. Development timelines vary based on project complexity, but we provide detailed roadmaps during our initial consultation and keep you updated throughout the process."
    },
    {
      question: "Do you provide support after implementation?",
      answer: "Absolutely. We offer comprehensive post-implementation support including technical assistance, training, and ongoing optimization. Our subscription model ensures continuous improvement of your AI solutions, and our team remains available to ensure your technology evolves with your business needs."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <div className="inline-block px-3 py-1 text-sm font-medium text-[#FF9500] bg-[#FF9500]/10 rounded-md mb-4 sm:mb-6">
                FAQ
              </div>
            </div>
            
            {/* FIX 26/12/2025: Removed y-transform to prevent layout shift */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">FAQ</h2>
              <p className="text-gray-400 max-w-xl text-sm sm:text-base">
                We&apos;ve gone ahead and answered the questions we&apos;re asked most often.
                Can&apos;t find what you&apos;re looking for? Feel free to reach out to us through
                the contact form above!
              </p>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="md:pt-12 lg:pt-16">
            <div className="space-y-0">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 