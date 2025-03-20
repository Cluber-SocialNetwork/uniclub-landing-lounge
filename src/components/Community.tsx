
import { useState, useEffect, useRef } from 'react';
import { Users, Globe, Shield, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Community = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const benefits = [
    {
      icon: <Users size={24} />,
      title: "Conexiones relevantes",
      description: "Conecta con estudiantes de tu carrera y comparte tus experiencias."
    },
    {
      icon: <Globe size={24} />,
      title: "Red nacional",
      description: "Expande tu red de contactos con estudiantes de otras universidades de todo el país."
    },
    {
      icon: <Shield size={24} />,
      title: "Entorno seguro",
      description: "Verificamos que todos los miembros sean estudiantes universitarios activos."
    },
    {
      icon: <Heart size={24} />,
      title: "Comunidad colaborativa",
      description: "Cultura de apoyo mutuo donde todos pueden contribuir y beneficiarse."
    }
  ];

  return (
    <section id="community" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className={cn(
            "lg:w-1/2 transition-all duration-700 transform",
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          )}>
            <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              Comunidad UniClub
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Una comunidad <span className="text-gradient">diseñada</span> para universitarios
            </h2>
            <p className="text-lg text-gray-600 mb-8">
            UniClub crea un espacio donde la colaboración y las conexiones profesionales entre estudiantes se convierten en ventajas tangibles para tu futuro académico y profesional
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-2 mr-4 rounded-lg bg-primary/10 text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <a href="#register" className="btn-primary">
                Unirse a la comunidad
              </a>
            </div>
          </div>
          
          <div className={cn(
            "lg:w-1/2 transition-all duration-1000 delay-300",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          )}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl transform -rotate-3 scale-105"></div>
              <div className="glass-card p-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
                  alt="Estudiantes universitarios colaborando" 
                  className="rounded-xl w-full h-auto shadow-lg"
                />
                
                <div className="absolute -bottom-6 -right-6 glass-card p-4 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                          <img
                            src={`https://i.pravatar.cc/100?img=${i+20}`}
                            alt="User avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">+50 universidades</p>
                      <p className="text-xs text-gray-500">Ya conectadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
