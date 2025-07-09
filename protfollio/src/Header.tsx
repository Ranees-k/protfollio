import { useState, useEffect } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset for fixed header
      const headerHeight = 80; // Height of your header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed w-full h-20 bg-gradient-to-b to-gray-500 from-black via-black/80 to-transparent backdrop-blur-sm z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center">

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-gray-300 hover:text-white font-orbitron transition-colors duration-300 font-medium relative group cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-white font-orbitron transition-colors duration-300 font-medium relative group"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-gray-300 hover:text-white transition-colors font-orbitron duration-300 font-medium relative group"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-gray-300 hover:text-white font-orbitron transition-colors duration-300 font-medium relative group"
          >
            Contact
          </button>
        </div>
      </nav>
    </header>
  );
}