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
    title: "Chatbot Development",
    desc: "Smart chatbots that handle common tasks and make your business work better and faster.",
    icon: ChatBubbleLeftIcon,
    demo: {
      type: "chat",
      content: {}
    }
  },
  {
    title: "Voice Agents",
    desc: "Voice assistants that sound like real people to help with customer support and sales calls.",
    icon: MicrophoneIcon,
    demo: {
      type: "voice",
      content: {
        waveform: true
      }
    }
  },
  {
    title: "Workflow Automations",
    desc: "Link your apps together to remove boring tasks and make your work more accurate and simple.",
    icon: CogIcon,
    steps: [
      "New Framer form submission",
      "Format & clean lead data in Zapier",
      "Add lead to Airtable database"
    ]
  },
  {
    title: "AI Consulting",
    desc: "Find ways AI can help your business work better, faster and save money on daily operations.",
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
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <span className="text-[#E5855E] text-sm">Services</span>
          <h2 className="text-6xl font-normal text-white mt-4">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-8 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm h-[440px] overflow-hidden"
            >
              <h3 className="text-4xl font-normal text-white mb-4">{service.title}</h3>
              <p className="text-white/60 mb-6 text-lg leading-relaxed">
                {service.desc}
              </p>

              {service.demo?.type === "chat" && (
                <div className="rounded-lg overflow-hidden">
                  <ChatSimulation />
                </div>
              )}

              {service.demo?.type === "voice" && (
                <div className="rounded-lg overflow-hidden">
                  <div className="h-[240px] relative">
                    <VoiceWaveform />
                  </div>
                  <div className="text-[#E5855E] text-center py-3 text-sm">
                    Voice Agent
                  </div>
                </div>
              )}

              {service.steps && (
                <div className="overflow-hidden">
                  <WorkflowAnimation steps={service.steps} />
                </div>
              )}

              {service.metrics && (
                <div>
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