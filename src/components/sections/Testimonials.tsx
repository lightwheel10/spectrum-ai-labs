import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
// FIX 26/12/2025: Added useMemo for proper animation width calculation
// FIX 26/12/2025: Removed unused useRef and useEffect imports
import { useState, useMemo } from 'react';

// FIX 26/12/2025: Changed to opacity-only animations to prevent layout shifts
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

// Twitter-style testimonial card
const TwitterCard = ({ 
  content,
  name,
  handle,
  image,
  date,
  size = 'medium'
}: {
  content: string;
  name: string;
  handle: string;
  image: string;
  date: string;
  size?: 'small' | 'medium' | 'large';
}) => {
  // Determine dimensions based on size
  const dimensions = {
    small: 'h-[300px] w-[280px]',
    medium: 'h-[340px] w-[320px]',
    large: 'h-[380px] w-[380px]',
  };

  return (
    <div 
      className={`p-4 rounded-xl border border-gray-200 bg-white flex flex-col flex-shrink-0 mx-3 dark:border-white/10 dark:bg-black/80 dark:backdrop-blur-sm ${dimensions[size]}`}
      style={{
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      }}
    >
      <div className="flex items-start mb-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border border-gray-100 dark:border-white/10">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <div className="flex items-center">
            <p className="font-bold text-gray-900 dark:text-white">{name}</p>
            <svg viewBox="0 0 24 24" width="18" height="18" className="ml-1" fill="#1D9BF0">
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
            </svg>
          </div>
          <p className="text-gray-500 text-sm dark:text-white/50">@{handle}</p>
        </div>
        <div className="ml-auto">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#1D9BF0">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </svg>
        </div>
      </div>
      <p className="text-gray-800 text-base mb-3 flex-1 leading-relaxed dark:text-white">{content}</p>
      <div className="text-gray-500 text-sm mb-3 dark:text-white/50">{date}</div>
    </div>
  );
};

// LinkedIn-style testimonial card
const LinkedInCard = ({ 
  content,
  name,
  role,
  company,
  image,
  date,
  size = 'medium'
}: {
  content: string;
  name: string;
  role: string;
  company: string;
  image: string;
  date: string;
  size?: 'small' | 'medium' | 'large';
}) => {
  // Determine dimensions based on size - reduce heights to eliminate empty space
  const dimensions = {
    small: 'h-[240px] w-[280px]',
    medium: 'h-[280px] w-[320px]',
    large: 'h-[300px] w-[380px]',
  };

  return (
    <div 
      className={`p-4 rounded-lg border border-gray-200 bg-white flex flex-col flex-shrink-0 mx-3 dark:border-white/10 dark:bg-black/80 dark:backdrop-blur-sm ${dimensions[size]}`}
      style={{
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      }}
    >
      <div className="flex items-start mb-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border border-gray-100 dark:border-white/10">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{name} • <span className="font-normal text-gray-500 dark:text-white/60">1st</span></p>
          <p className="text-gray-600 text-sm dark:text-white/50">{role} at {company}</p>
          <p className="text-gray-500 text-xs dark:text-white/40">{date} • <span>🌎</span></p>
        </div>
        <div className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </div>
      </div>
      <p className="text-gray-800 text-base mb-4 flex-1 leading-relaxed dark:text-white">{content}</p>
    </div>
  );
};

const Testimonials = () => {
  // FIX 26/12/2025: Removed unused carouselRef
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  // FIX 26/12/2025: Removed mounted state - animation now uses CSS variables in globals.css

  // Twitter-style testimonials
  const twitterTestimonials = [
    {
      content: "Just implemented @SpectrumAI's chatbot and it's handling 95% of our customer inquiries. Game-changer! #AI #CustomerService",
      name: "Sarah Johnson",
      handle: "sarahj_cxo",
      image: "https://randomuser.me/api/portraits/women/68.jpg?seed=testimonial-1",
      date: "2:45 PM · Jan 15, 2024",
      size: 'small' as const,
    },
    {
      content: "The voice agent from @SpectrumAI sounds so human it's crazy. Our customers love it and our call handling has improved dramatically. Highly recommend! 🔥",
      name: "Michael Chen",
      handle: "mchen_innovex",
      image: "https://randomuser.me/api/portraits/men/75.jpg?seed=testimonial-2",
      date: "9:22 AM · Mar 18, 2024",
      size: 'medium' as const,
    },
    {
      content: "Been using @SpectrumAI's flexible subscription model for 6 months now. Their developers feel like part of our team! #SoftwareDevelopment",
      name: "Peter Davis",
      handle: "pdavis_atomic",
      image: "https://randomuser.me/api/portraits/men/94.jpg?seed=testimonial-3",
      date: "3:17 PM · Jun 22, 2024",
      size: 'small' as const,
    },
    {
      content: "Spectrum AI's data analytics platform helped us identify patterns we never would have seen. Our decision-making is now backed by solid insights!",
      name: "Aisha Patel",
      handle: "aisha_datascience",
      image: "https://randomuser.me/api/portraits/women/39.jpg?seed=testimonial-4",
      date: "4:30 PM · Sep 8, 2024",
      size: 'medium' as const,
    },
    {
      content: "After 3 months with @SpectrumAI's automation tools, we've cut processing time by 78%! Our team can finally focus on strategic work.",
      name: "Carlos Rodriguez",
      handle: "carlos_tech",
      image: "https://randomuser.me/api/portraits/men/45.jpg?seed=testimonial-5",
      date: "11:15 AM · Nov 12, 2024",
      size: 'small' as const,
    },
    {
      content: "@SpectrumAI's predictive analytics solved our inventory headaches! Never out of stock on hot items & saving on storage costs. 📦📈",
      name: "Raj Patel",
      handle: "raj_globalmarket",
      image: "https://randomuser.me/api/portraits/men/11.jpg?seed=testimonial-6",
      date: "1:45 PM · Feb 3, 2025",
      size: 'small' as const,
    },
  ];

  // LinkedIn-style testimonials
  const linkedinTestimonials = [
    {
      content: "After implementing Spectrum AI's workflow automation, we've seen a 54% increase in productivity across our team. Their solution eliminated busywork from our operations. The ROI has been incredible!",
      name: "John Fisher",
      role: "CEO",
      company: "T&B Real Estate",
      image: "https://randomuser.me/api/portraits/men/22.jpg?seed=testimonial-7",
      date: "January 2024",
      size: 'large' as const,
    },
    {
      content: "Spectrum AI's consulting team identified $2M in potential savings for our organization! They found automation opportunities we never thought of. Implementation was smooth and the results speak for themselves.",
      name: "Emma Wilson",
      role: "CFO",
      company: "TechFlow",
      image: "https://randomuser.me/api/portraits/women/57.jpg?seed=testimonial-8",
      date: "March 2024",
      size: 'medium' as const,
    },
    {
      content: "Working with Spectrum AI transformed our customer support. Their AI-powered solution reduced response times by 65% while maintaining high customer satisfaction scores. The team was responsive throughout.",
      name: "Jamal Washington",
      role: "Director of Customer Experience",
      company: "Nexus Solutions",
      image: "https://randomuser.me/api/portraits/men/29.jpg?seed=testimonial-9",
      date: "June 2024",
      size: 'large' as const,
    },
    {
      content: "As a healthcare provider, data security is paramount. Spectrum AI delivered a HIPAA-compliant solution and helped us optimize our patient intake process. The result? 40% faster processing and happier patients!",
      name: "Mei Lin",
      role: "CTO",
      company: "HealthFirst Partners",
      image: "https://randomuser.me/api/portraits/women/79.jpg?seed=testimonial-10",
      date: "October 2024",
      size: 'medium' as const,
    },
  ];

  // Define types for our testimonials
  type TwitterTestimonial = {
    content: string;
    name: string;
    handle: string;
    image: string;
    date: string;
    size: 'small' | 'medium' | 'large';
  };
  
  type LinkedInTestimonial = {
    content: string;
    name: string;
    role: string;
    company: string;
    image: string;
    date: string;
    size: 'small' | 'medium' | 'large';
  };
  
  type TestimonialItem = 
    | { type: 'twitter'; data: TwitterTestimonial; id: string }
    | { type: 'linkedin'; data: LinkedInTestimonial; id: string };

  const carouselItems = (() => {
    const allItems: TestimonialItem[] = [
      ...twitterTestimonials.map((item, index) => ({ 
        type: 'twitter' as const, 
        data: item, 
        id: `twitter-${index}` 
      })),
      ...linkedinTestimonials.map((item, index) => ({ 
        type: 'linkedin' as const, 
        data: item, 
        id: `linkedin-${index}` 
      })),
    ];

    // Keep static cards for reduced-motion users.
    return reduceMotion ? allItems : [...allItems, ...allItems];
  })();

  // Handle mouse events for pausing the carousel
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // FIX 26/12/2025: Use useMemo to calculate total width once and avoid recalculation on each render
  const totalWidth = useMemo(() => {
    let width = 0;
    const sourceItems = reduceMotion
      ? carouselItems
      : carouselItems.slice(0, carouselItems.length / 2);

    // Add up widths based on sizes
    sourceItems.forEach(item => {
      const size = item.data.size || 'medium';
      if (size === 'small') width += 280 + 6; // width + margin
      else if (size === 'medium') width += 320 + 6;
      else width += 380 + 6;
    });

    return width;
  }, [carouselItems, reduceMotion]);

  return (
    <section className="relative py-20" id="testimonials">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E5855E]/[0.03] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          custom={0}
          className="mb-16"
        >
          <span className="text-[#E5855E] text-sm">Testimonials</span>
          <h2 className="text-6xl font-normal text-white mt-4">What our clients say</h2>
        </motion.div>
        
        <div className="relative">
          {/* Left fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          
          {/* Right fade effect */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
          
          {/* Carousel container */}
          <div 
            className="overflow-hidden relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* FIX 26/12/2025: Removed unused ref={carouselRef} */}
            {/* FIX 26/12/2025: Added CSS variable for scroll width - animation defined in globals.css */}
            <div
              className="flex items-center testimonials-carousel"
              style={{
                '--scroll-width': `-${totalWidth}px`,
                animationDuration: '60s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationName: reduceMotion ? 'none' : 'scroll',
                animationPlayState: reduceMotion ? 'paused' : (isPaused ? 'paused' : 'running'),
                willChange: 'transform'
              } as React.CSSProperties}
            >
              {carouselItems.map((item, index) => (
                item.type === 'twitter' ? (
                  <TwitterCard
                    key={`${item.id}-${index}`}
                    content={item.data.content}
                    name={item.data.name}
                    handle={item.data.handle}
                    image={item.data.image}
                    date={item.data.date}
                    size={item.data.size}
                  />
                ) : (
                  <LinkedInCard
                    key={`${item.id}-${index}`}
                    content={item.data.content}
                    name={item.data.name}
                    role={item.data.role}
                    company={item.data.company}
                    image={item.data.image}
                    date={item.data.date}
                    size={item.data.size}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FIX 26/12/2025: CSS animation moved to globals.css to prevent flicker */}
    </section>
  );
};

export default Testimonials;
