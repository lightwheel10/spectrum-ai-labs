import { CpuChipIcon, WrenchScrewdriverIcon, ArrowPathRoundedSquareIcon, BeakerIcon } from '@heroicons/react/24/outline';
import VoiceWaveform from '../VoiceWaveform';
import ChatSimulation from '../ChatSimulation';
import WorkflowAnimation from '../WorkflowAnimation';
import MetricsChart from '../MetricsChart';
import { useEffect, useRef, useState } from 'react';

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
    title: "AI Agents & Agentic Workflows",
    desc: "Deploy intelligent AI agents that reason, plan, and execute complex tasks autonomously. From customer interactions to multi-step business processes, our agents handle it end-to-end, reducing manual effort by up to 80%.",
    icon: CpuChipIcon,
    demo: {
      type: "chat",
      content: {}
    }
  },
  {
    title: "AI-Powered Internal Tools",
    desc: "Custom-built tools that supercharge your team's productivity. From intelligent dashboards to automated reporting systems, we build internal software that thinks, so your team can focus on what matters.",
    icon: WrenchScrewdriverIcon,
    steps: [
      "Team submits a request or query",
      "AI processes and enriches the data",
      "Insights delivered to dashboard in real-time"
    ]
  },
  {
    title: "AI Integration Consulting",
    desc: "Get a clear roadmap to embed AI across your operations. We audit your workflows, identify high-impact opportunities, and architect integrations that deliver measurable ROI from day one.",
    icon: ArrowPathRoundedSquareIcon,
    metrics: {
      efficiency: "+46%",
      cost: "-11%",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    }
  },
  {
    title: "Custom AI Solutions",
    desc: "Purpose-built AI systems tailored to your unique challenges. From RAG pipelines and fine-tuned models to real-time data processing, we engineer solutions that off-the-shelf tools can't match.",
    icon: BeakerIcon,
    demo: {
      type: "voice",
      content: {
        waveform: true
      }
    }
  }
];

const DemoPlaceholder = ({ className }: { className: string }) => (
  <div className={`rounded-lg border border-white/10 bg-white/[0.03] animate-pulse ${className}`} />
);

const ServiceCard = ({ service }: { service: Service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    // Mount expensive demo widgets only when a card is near viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: '180px 0px' }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-6 sm:p-8 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm h-auto sm:h-[440px] overflow-hidden"
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-3 sm:mb-4">{service.title}</h3>
      <p className="text-white/60 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
        {service.desc}
      </p>

      {service.demo?.type === "chat" && (
        <div className="rounded-lg overflow-hidden">
          {isActivated ? <ChatSimulation /> : <DemoPlaceholder className="h-[232px]" />}
        </div>
      )}

      {service.demo?.type === "voice" && (
        <div className="rounded-lg overflow-hidden flex flex-col items-center">
          {isActivated ? (
            <>
              <div className="h-[180px] sm:h-[240px] relative w-full max-w-[280px] mx-auto">
                <VoiceWaveform />
              </div>
              <div className="text-[#E5855E] text-center py-2 sm:py-3 text-sm">
                Custom AI
              </div>
            </>
          ) : (
            <DemoPlaceholder className="h-[232px] w-full max-w-[280px]" />
          )}
        </div>
      )}

      {service.steps && (
        <div className="overflow-hidden sm:h-[320px] h-[270px]">
          {isActivated ? (
            <WorkflowAnimation steps={service.steps} />
          ) : (
            <DemoPlaceholder className="h-[270px] sm:h-[320px]" />
          )}
        </div>
      )}

      {service.metrics && (
        <div className="h-[200px] sm:h-auto">
          {isActivated ? <MetricsChart /> : <DemoPlaceholder className="h-[200px]" />}
        </div>
      )}
    </div>
  );
};

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
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 
