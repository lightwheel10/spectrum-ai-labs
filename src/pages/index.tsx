import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import critical components normally
import Navbar from '../components/layout/Navbar';
import DelayedFooter from '../components/layout/DelayedFooter';

// Keep a static fallback while the client-only background hydrates.
const AnimatedBackground = dynamic(
  () => import('../components/layout/AnimatedBackground'),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-0 bg-[#0A0A0A]" />,
  }
);

// Dynamically import sections with loading fallbacks
// SEO: Enable SSR for key content sections so search engines can index them
const Hero = dynamic(() => import('../components/sections/Hero'), { ssr: true });
const About = dynamic(() => import('../components/sections/About'), { ssr: true });
const Services = dynamic(() => import('../components/sections/Services'), { ssr: true });
const Process = dynamic(() => import('../components/sections/Process'), { ssr: true });
const Industries = dynamic(() => import('../components/sections/Industries'), { ssr: false });
const Founder = dynamic(() => import('../components/sections/Founder'), { ssr: true });
const Testimonials = dynamic(() => import('../components/sections/Testimonials'), { ssr: false });
const FAQ = dynamic(() => import('../components/sections/FAQ'), { ssr: true });
const Contact = dynamic(() => import('../components/sections/Contact'), { ssr: true });

export default function Home() {
  return (
    <>
      <Head>
        <title>Spectrum AI Labs | AI Automation Agency - Make Your Business AI-First</title>
        <meta name="description" content="AI automation agency helping businesses go AI-first. We implement AI into existing processes, build new AI-powered workflows, and provide strategic consulting to transform your operations." />
        <meta name="keywords" content="AI automation agency, AI implementation, business process automation, AI consulting, workflow automation, AI integration, AI-first business, AI transformation, process optimization" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.spectrumailabs.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.spectrumailabs.com/" />
        <meta property="og:title" content="Spectrum AI Labs | AI Automation Agency" />
        <meta property="og:description" content="We help businesses go AI-first. Implement AI into existing processes, build new AI-powered workflows, and get strategic consulting." />
        <meta property="og:image" content="https://www.spectrumailabs.com/og-image.png" />
        <meta property="og:site_name" content="Spectrum AI Labs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.spectrumailabs.com/" />
        <meta name="twitter:title" content="Spectrum AI Labs | AI Automation Agency" />
        <meta name="twitter:description" content="We help businesses go AI-first. Implement AI into existing processes, build new AI-powered workflows, and get strategic consulting." />
        <meta name="twitter:image" content="https://www.spectrumailabs.com/og-image.png" />
        <meta name="twitter:creator" content="@buildwithparas" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Spectrum AI Labs",
              "url": "https://www.spectrumailabs.com",
              "logo": "https://www.spectrumailabs.com/logo.png",
              "description": "AI automation agency helping businesses go AI-first through process implementation and consulting",
              "sameAs": [
                "https://x.com/buildwithparas",
                "https://www.linkedin.com/in/paras-tiwari-221a9b34b/"
              ],
              "founder": {
                "@type": "Person",
                "name": "Paras Tiwari"
              },
              "service": [
                {
                  "@type": "Service",
                  "name": "AI Process Implementation",
                  "description": "Integrate AI into your existing business processes to boost efficiency and reduce costs"
                },
                {
                  "@type": "Service",
                  "name": "AI Workflow Creation",
                  "description": "Design and build new AI-powered workflows tailored to your business needs"
                },
                {
                  "@type": "Service",
                  "name": "AI-First Transformation",
                  "description": "Strategic guidance to help your business adopt AI across all operations"
                },
                {
                  "@type": "Service",
                  "name": "AI Consulting",
                  "description": "Expert consulting to identify AI opportunities and create implementation roadmaps"
                }
              ]
            })
          }}
        />

        {/* FAQ Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What makes Spectrum AI Labs unique?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AI solutions are built with cutting-edge technology and deep industry expertise to create truly tailored solutions. With a team of 9 experts, we focus on delivering higher accuracy and faster results than conventional approaches, making your organization more competitive in today's market."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my company a good fit for Spectrum AI Labs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We work with businesses across various industries including E-commerce, Real Estate, Legal, Finance, and Healthcare. If you're looking to leverage AI to improve efficiency, automate workflows, enhance customer interactions, or gain insights from your data, we're likely a good fit. Our team can assess your specific needs during a consultation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does your subscription model work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer flexible subscription plans starting at $1997/month for our Starter plan, which includes 1 dedicated AI developer. Our Professional plan at $3997/month includes 2 dedicated developers and more advanced features. For larger organizations, we offer custom Enterprise solutions. All plans include the ability to cancel or pause anytime."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does the development phase take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our development process follows a structured approach: Analyze & Plan, Build & Implement, and then Optimize & Scale. Development timelines vary based on project complexity, but we provide detailed roadmaps during our initial consultation and keep you updated throughout the process."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide support after implementation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We offer comprehensive post-implementation support including technical assistance, training, and ongoing optimization. Our subscription model ensures continuous improvement of your AI solutions, and our team remains available to ensure your technology evolves with your business needs."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <AnimatedBackground />

      <main className="min-h-screen relative z-10 overflow-x-hidden">
        <Navbar />

        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="process">
          <Process />
        </section>

        <section id="industries">
          <Industries />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="founder">
          <Founder />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <DelayedFooter />
      </main>
    </>
  );
}
