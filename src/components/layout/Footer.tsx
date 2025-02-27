import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-zinc-800 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Us Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-white">About Us</h3>
            <div className="space-y-4">
              <div>
                <p className="text-amber-500 mb-1">Email</p>
                <Link href="mailto:hello@auralis.com" className="text-white flex items-center hover:text-amber-400 transition-colors">
                  hello@auralis.com
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <div>
                <p className="text-amber-500 mb-1">Phone</p>
                <Link href="tel:+31203439223" className="text-white flex items-center hover:text-amber-400 transition-colors">
                  +31 20 343 9223
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-white">Links</h3>
            <div className="space-y-4">
              <Link href="#services" className="block text-white hover:text-amber-400 transition-colors">
                Services
              </Link>
              <Link href="#process" className="block text-white hover:text-amber-400 transition-colors">
                Process
              </Link>
              <Link href="#industries" className="block text-white hover:text-amber-400 transition-colors">
                Industries
              </Link>
              <Link href="#pricing" className="block text-white hover:text-amber-400 transition-colors">
                Pricing
              </Link>
              <Link href="#team" className="block text-white hover:text-amber-400 transition-colors">
                Team
              </Link>
              <Link href="#contact" className="block text-white hover:text-amber-400 transition-colors">
                Contact
              </Link>
              <Link href="#faq" className="block text-white hover:text-amber-400 transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-white">Social Media</h3>
            <div className="space-y-4">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-amber-400 transition-colors">
                LinkedIn
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-amber-400 transition-colors">
                Youtube
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-amber-400 transition-colors">
                X/Twitter
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-amber-400 transition-colors">
                Instagram
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-white">Legal</h3>
            <div className="space-y-4">
              <Link href="/terms" className="block text-white hover:text-amber-400 transition-colors">
                Terms & conditions
              </Link>
              <Link href="/privacy" className="block text-white hover:text-amber-400 transition-colors">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 