
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">Cluber</span>
              <span className="text-primary"></span>
            </h3>
            <p className="text-gray-400 mb-4">
              La red social exclusiva para estudiantes universitarios.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Explora</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-primary transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#community" className="text-gray-400 hover:text-primary transition-colors">
                  Comunidad
                </a>
              </li>
              <li>
                <a href="#marketplace" className="text-gray-400 hover:text-primary transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-primary transition-colors">
                  Testimonios
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Términos de uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">
                hola@Cluber.com
              </li>
              <li className="text-gray-400">
                +123 456 7890
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Soporte
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Cluber. Todos los derechos reservados.
          </p>
          <div className="flex items-center text-gray-400 text-sm">
            <span>Creado por estudiantes, </span>
            <span className="text-primary mx-1">para estudiantes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
