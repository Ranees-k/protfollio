export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full h-20 bg-gradient-to-b to-gray-500 from-black via-black/80 to-transparent backdrop-blur-sm z-10 ">
      <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center">

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-gray-300 hover:text-white font-orbitron transition-colors duration-300 font-medium relative group"
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
            onClick={() => scrollToSection('testimonials')}
            className="text-gray-300 hover:text-white transition-colors font-orbitron duration-300 font-medium relative group"
          >
            Testimonials
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