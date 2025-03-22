import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Añadimos listener de scroll para detectar cuando el usuario hace scroll
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
        'bg-secondary text-white shadow-md py-4 md:py-5',
        // Añadimos una clase específica cuando se hace scroll para manejar estilos específicos
        scrolled && 'scroll-active'
      )}
      style={{ transform: 'translateZ(0)' }} // Forzar composición de capas
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">
              <span className="text-white">Cluber</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link text-white">Características</a>
            <a href="#community" className="nav-link text-white">Comunidad</a>
            <a href="#marketplace" className="nav-link text-white">Marketplace</a>
            <a href="#faq" className="nav-link text-white">FAQ</a>
          </div>

          <div className="hidden md:block">
            <a 
              href="#register" 
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary px-8 py-2.5 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary hover:shadow-lg"
            >
              <span className="mr-2">Registrarse</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Navigation Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
            aria-label="Abrir menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-secondary backdrop-blur-md shadow-md transition-all duration-300 ease-in-out",
          isOpen ? "max-h-screen py-4" : "max-h-0 py-0 overflow-hidden"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a 
            href="#features" 
            className="py-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Características
          </a>
          <a 
            href="#community" 
            className="py-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Comunidad
          </a>
          <a 
            href="#marketplace" 
            className="py-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Marketplace
          </a>
          <a 
            href="#faq" 
            className="py-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </a>
          <a 
            href="#register" 
            className="group relative flex justify-center items-center overflow-hidden rounded-full bg-primary px-8 py-2.5 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary hover:shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-2">Registrarse</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;