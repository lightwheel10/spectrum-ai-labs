import { motion } from 'framer-motion';
import Image from 'next/image';

const SurveyGraph = () => (
  <div className="mt-2 space-y-1.5">
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">User Experience</span>
        <span className="text-white">92%</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '92%' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-[#E5855E] to-[#FF6B6B]"
        />
      </div>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">Customer Support</span>
        <span className="text-white">88%</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '88%' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-full rounded-full bg-gradient-to-r from-[#E5855E] to-[#FF6B6B]"
        />
      </div>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">Product Quality</span>
        <span className="text-white">95%</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '95%' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-full rounded-full bg-gradient-to-r from-[#E5855E] to-[#FF6B6B]"
        />
      </div>
    </div>
    <div className="mt-1 text-[10px] text-white/40 text-center">Based on 2,847 responses</div>
  </div>
);

const UXBreakdownGraph = () => (
  <div className="mt-2 space-y-1.5">
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">Navigation</span>
        <span className="text-white">96%</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '96%' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-[#E5855E] to-[#FF6B6B]"
        />
      </div>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">Mobile Experience</span>
        <span className="text-white">94%</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '94%' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-full rounded-full bg-gradient-to-r from-[#E5855E] to-[#FF6B6B]"
        />
      </div>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">Load Times</span>
        <span className="text-white">89%</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '89%' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-full rounded-full bg-gradient-to-r from-[#E5855E] to-[#FF6B6B]"
        />
      </div>
    </div>
  </div>
);

// Define messages array with the graphs
const messages = [
  {
    isAI: false,
    text: "Can you help me analyze our customer satisfaction survey?"
  },
  {
    isAI: true,
    text: "I'll help you analyze the survey results. Which aspects would you like to focus on?"
  },
  {
    isAI: false,
    text: "Show me the satisfaction scores across different categories"
  },
  {
    isAI: true,
    text: "Here are the satisfaction ratings by category:",
    graph: <SurveyGraph />
  },
  {
    isAI: false,
    text: "What's driving the high UX satisfaction score?"
  },
  {
    isAI: true,
    text: "Would you like to see the breakdown by specific UX features or by user demographics?"
  },
  {
    isAI: false,
    text: "Let's see the UX features breakdown first"
  },
  {
    isAI: true,
    text: "Here's how users rated different UX aspects:",
    graph: <UXBreakdownGraph />
  },
  {
    isAI: false,
    text: "The mobile experience score is impressive. What improvements did users mention?"
  },
  {
    isAI: true,
    text: "Users particularly praised the new responsive design and faster load times on mobile. 78% mentioned the improved checkout flow specifically."
  },
  {
    isAI: false,
    text: "Were there any common complaints or areas for improvement?"
  },
  {
    isAI: true,
    text: "The main suggestions were for improved search filters (23% of feedback) and more detailed product comparisons (18%). Would you like me to analyze these areas in detail?"
  }
];

const ChatSimulation = () => {
  const containerVariants = {
    animate: {
      y: [0, -1400],
      transition: {
        duration: 30,
        delay: 0,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear"
      }
    }
  };

  const Avatar = ({ isAI = false }: { isAI?: boolean }) => (
    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
      {isAI ? (
        <Image 
          src="/logos/ai-assistant.svg"
          alt="AI Assistant"
          width={32}
          height={32}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="h-[240px] relative bg-black/80 border border-white/10 p-3 overflow-hidden">
        <motion.div
          variants={containerVariants}
          animate="animate"
          className="space-y-1.5"
        >
          {/* First set of messages */}
          {messages.map((message, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: message.isAI ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.5 }}
              className={`flex ${message.isAI ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${message.isAI ? 'flex-row-reverse' : ''}`}>
                <Avatar isAI={message.isAI} />
                <div className={`${message.isAI ? 'bg-[#E5855E]/20' : 'bg-white/10'} rounded-2xl p-2`}>
                  <div className="text-white/80 text-sm">{message.text}</div>
                  {message.graph && message.graph}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Duplicate all messages for seamless loop */}
          <div className="mt-6">
            {messages.map((message, index) => (
              <motion.div 
                key={`dup-${index}`}
                initial={{ opacity: 0, x: message.isAI ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.5 }}
                className={`flex ${message.isAI ? 'justify-end' : 'justify-start'} mb-1.5`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.isAI ? 'flex-row-reverse' : ''}`}>
                  <Avatar isAI={message.isAI} />
                  <div className={`${message.isAI ? 'bg-[#E5855E]/20' : 'bg-white/10'} rounded-2xl p-2`}>
                    <div className="text-white/80 text-sm">{message.text}</div>
                    {message.graph && message.graph}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="text-[#E5855E] text-center py-3 text-sm">
        AI Assistant
      </div>
    </>
  );
};

export default ChatSimulation; 