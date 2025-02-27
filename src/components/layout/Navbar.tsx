import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarGlowingButton } from '../ui/GlowingButton';

const Navbar = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes tilt {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }

        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>

      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed w-full z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="relative">
            {/* Background */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-2xl"
              style={{
                boxShadow: '0 0 30px rgba(0,0,0,0.1)',
              }}
            />

            {/* Content */}
            <div className="relative flex items-center justify-between h-16 px-6">
              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex-shrink-0"
              >
                <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Spectrum</span>
                  <span>AI</span>
                  <span>Labs</span>
                </Link>
              </motion.div>

              {/* Center Menu */}
              <div className="hidden md:flex flex-1 justify-center">
                <div className="flex items-center space-x-8">
                  {[
                    { href: "#services", label: "Services" },
                    { href: "#process", label: "Process" },
                    { href: "#industries", label: "Industries" },
                    { href: "#testimonials", label: "Testimonials" },
                    { href: "#pricing", label: "Pricing" },
                    { href: "#team", label: "Team" },
                    { href: "#contact", label: "Contact" },
                    { href: "#faq", label: "FAQ" }
                  ].map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                    >
                      <Link 
                        href={item.href} 
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex-shrink-0"
              >
                <CalendarGlowingButton size="small">
                  Work with us
                </CalendarGlowingButton>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar; 