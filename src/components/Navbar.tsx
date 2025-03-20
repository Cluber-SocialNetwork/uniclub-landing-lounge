
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary">
              UniClub
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link">Características</a>
            <a href="#community" className="nav-link">Comunidad</a>
            <a href="#marketplace" className="nav-link">Marketplace</a>
            <a href="#testimonials" className="nav-link">Testimonios</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="hidden md:block">
            <a href="#register" className="btn-primary">Registrarse</a>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out",
          isOpen ? "max-h-screen py-4" : "max-h-0 py-0 overflow-hidden"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a 
            href="#features" 
            className="py-2 text-gray-800 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Características
          </a>
          <a 
            href="#community" 
            className="py-2 text-gray-800 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Comunidad
          </a>
          <a 
            href="#marketplace" 
            className="py-2 text-gray-800 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Marketplace
          </a>
          <a 
            href="#testimonials" 
            className="py-2 text-gray-800 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Testimonios
          </a>
          <a 
            href="#faq" 
            className="py-2 text-gray-800 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </a>
          <a 
            href="#register" 
            className="btn-primary text-center"
            onClick={() => setIsOpen(false)}
          >
            Registrarse
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
