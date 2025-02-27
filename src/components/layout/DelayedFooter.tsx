import { useState, useEffect } from 'react';
import Footer from './Footer';

const DelayedFooter = () => {
  const [showFooter, setShowFooter] = useState(false);
  
  useEffect(() => {
    // Delay footer appearance to ensure other content loads first
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 2000); // Increased to 2 seconds for better content loading
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showFooter) return null;
  
  return <Footer />;
};

export default DelayedFooter; 