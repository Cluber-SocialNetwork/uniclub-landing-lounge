import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center bg-secondary text-white overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-bg"></div>
      
      {/* Background shapes */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <div className={cn(
              "transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/20 text-primary rounded-md">
                PARA ESTUDIANTES COMO TU
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                La red social que <span className="text-gradient">potencia </span> tu vida universitaria
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
                Conecta estudiantes, intercambia tus conocimientos y abre oportunidades a ingresos y eventos exclusivos de tu comunidad.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#register" className="btn-primary inline-flex items-center">
                  <span>¡Únete ahora!</span>
                  <ArrowRight size={18} className="ml-2" />
                </a>
                <a href="#features" className="btn-outline">
                  Explora más
                </a>
              </div>
              
              <div className="mt-8 flex items-center justify-center md:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/100?img=${i+10}`}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-300">
                  <span className="font-semibold text-white">+2,500</span> estudiantes ya se unieron
                </p>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 delay-300",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary via-primary/30 to-accent/30 rounded-2xl transform rotate-2 scale-105"></div>
              <div className="relative bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" 
                  alt="Estudiantes universitarios" 
                  className="rounded-lg w-full h-auto shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white py-2 px-4 rounded-lg shadow-lg transform rotate-2">
                <span className="text-sm font-semibold">¡Se parte de Cluber!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;