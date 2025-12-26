import Link from 'next/link';

// FIX 26/12/2025: Added smooth scroll handler for anchor links
const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.getElementById(href.substring(1));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-zinc-800 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* About Us Column */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-medium text-white">Spectrum AI Labs</h3>
            <p className="text-white/70 text-sm sm:text-base">
              AI automation agency helping businesses go AI-first.
            </p>
          </div>

          {/* Links Column */}
          {/* FIX 26/12/2025: Changed from Next.js Link to regular anchor tags with smooth scroll for internal anchor links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-medium text-white">Links</h3>
            <div className="space-y-2 sm:space-y-4">
              <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer">
                Services
              </a>
              <a href="#process" onClick={(e) => handleAnchorClick(e, '#process')} className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer">
                Process
              </a>
              <a href="#industries" onClick={(e) => handleAnchorClick(e, '#industries')} className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer">
                Industries
              </a>
              {/* FIX 26/12/2025: Removed pricing and team links - solo founder agency */}
              <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer">
                Contact
              </a>
              <a href="#faq" onClick={(e) => handleAnchorClick(e, '#faq')} className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer">
                FAQ
              </a>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-0">
            <h3 className="text-xl sm:text-2xl font-medium text-white">Social Media</h3>
            <div className="space-y-2 sm:space-y-4">
              <Link href="https://x.com/buildwithparas" target="_blank" rel="noopener noreferrer" className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors">
                Twitter
              </Link>
              <Link href="https://www.linkedin.com/in/paras-tiwari-221a9b34b/" target="_blank" rel="noopener noreferrer" className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-0">
            <h3 className="text-xl sm:text-2xl font-medium text-white">Legal</h3>
            <div className="space-y-2 sm:space-y-4">
              <Link href="/terms" className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors">
                Terms & conditions
              </Link>
              <Link href="/privacy" className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors">
                Privacy policy
              </Link>
              <Link href="/refund" className="block text-white text-sm sm:text-base hover:text-amber-400 transition-colors">
                Refund policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-800/50 text-center text-zinc-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} Spectrum AI Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 