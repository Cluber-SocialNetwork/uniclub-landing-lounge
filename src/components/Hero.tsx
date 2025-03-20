
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full transform translate-x-1/2 translate-y-1/2 animate-spin-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <div className={cn(
              "transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                Exclusivo para estudiantes universitarios
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Conecta, Colabora y <span className="text-gradient">Crece</span> con tu comunidad universitaria
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
                UniClub es la red social exclusiva donde los estudiantes universitarios conectan, intercambian habilidades y acceden a oportunidades únicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#register" className="btn-primary">
                  Unirse ahora
                </a>
                <a href="#features" className="btn-outline">
                  Descubrir más
                </a>
              </div>
              
              <div className="mt-8 flex items-center justify-center md:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/100?img=${i+10}`}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-600">
                  <span className="font-semibold">+1,500</span> estudiantes ya se unieron
                </p>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 delay-300",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="glass-card p-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                  alt="Estudiantes universitarios colaborando" 
                  className="rounded-xl w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
