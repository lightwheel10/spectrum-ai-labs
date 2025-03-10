import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarGlowingButton } from '../ui/GlowingButton';
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#industries", label: "Industries" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#pricing", label: "Pricing" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" }
  ];

  const handleNavClick = (href: string) => {
    // Close mobile menu when a nav item is clicked
    setMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

        /* Mobile menu animation */
        .mobile-menu-enter {
          opacity: 0;
          transform: translateY(-20px);
        }
        .mobile-menu-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
        .mobile-menu-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-menu-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 300ms, transform 300ms;
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

              {/* Center Menu - Desktop */}
              <div className="hidden md:flex flex-1 justify-center">
                <div className="flex items-center space-x-8">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                    >
                      <Link 
                        href={item.href} 
                        className="text-white/80 hover:text-white transition-colors text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  className="text-white p-2 rounded-md"
                  onClick={toggleMobileMenu}
                  aria-expanded={mobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="hidden md:block flex-shrink-0"
              >
                <CalendarGlowingButton size="small">
                  Work with us
                </CalendarGlowingButton>
              </motion.div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden z-50"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="px-3 py-3">
                    <CalendarGlowingButton size="small" className="w-full">
                      Work with us
                    </CalendarGlowingButton>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar; 