import { ChatBubbleLeftIcon, MicrophoneIcon, CogIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import VoiceWaveform from '../VoiceWaveform';
import ChatSimulation from '../ChatSimulation';
import WorkflowAnimation from '../WorkflowAnimation';
import MetricsChart from '../MetricsChart';

interface Service {
  title: string;
  desc: string;
  icon: React.ElementType;
  demo?: {
    type: "chat" | "voice";
    content: {
      waveform?: boolean;
    };
  };
  steps?: string[];
  metrics?: {
    efficiency: string;
    cost: string;
    months: string[];
  }
}

const services: Service[] = [
  {
    title: "AI Chatbots",
    desc: "Deploy AI agents that handle customer inquiries 24/7, qualify leads automatically, and never take a day off. Reduce support costs by up to 80%.",
    icon: ChatBubbleLeftIcon,
    demo: {
      type: "chat",
      content: {}
    }
  },
  {
    title: "Voice Agents",
    desc: "AI that answers calls, books appointments, and handles customer conversations with human-like fluency. Scale your phone support without hiring.",
    icon: MicrophoneIcon,
    demo: {
      type: "voice",
      content: {
        waveform: true
      }
    }
  },
  {
    title: "Process Automation",
    desc: "Connect your tools, eliminate manual data entry, and automate repetitive workflows. What takes hours now happens in seconds.",
    icon: CogIcon,
    steps: [
      "New lead comes in via form",
      "AI enriches and qualifies data",
      "Auto-routes to CRM + triggers follow-up"
    ]
  },
  {
    title: "AI Strategy",
    desc: "Get a roadmap to become AI-first. We audit your operations, identify automation opportunities, and show you exactly where AI delivers the biggest ROI.",
    icon: ChartBarIcon,
    metrics: {
      efficiency: "+46%",
      cost: "-11%",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    }
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 sm:mb-16">
          <span className="text-[#E5855E] text-sm">Services</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white mt-4">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 sm:p-8 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm h-auto sm:h-[440px] overflow-hidden"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-3 sm:mb-4">{service.title}</h3>
              <p className="text-white/60 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                {service.desc}
              </p>

              {service.demo?.type === "chat" && (
                <div className="rounded-lg overflow-hidden">
                  <ChatSimulation />
                </div>
              )}

              {service.demo?.type === "voice" && (
                <div className="rounded-lg overflow-hidden flex flex-col items-center">
                  <div className="h-[180px] sm:h-[240px] relative w-full max-w-[280px] mx-auto">
                    <VoiceWaveform />
                  </div>
                  <div className="text-[#E5855E] text-center py-2 sm:py-3 text-sm">
                    Voice Agent
                  </div>
                </div>
              )}

              {service.steps && (
                <div className="overflow-hidden sm:h-[320px] h-[270px]">
                  <WorkflowAnimation steps={service.steps} />
                </div>
              )}

              {service.metrics && (
                <div className="h-[200px] sm:h-auto">
                  <MetricsChart />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 