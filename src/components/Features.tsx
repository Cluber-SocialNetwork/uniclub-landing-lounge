
import { 
  Users, MessageCircle, GraduationCap, BookOpen, 
  ShoppingCart, Calendar, Zap
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = featureRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={featureRef}
      className={cn(
        "feature-card",
        "transition-all duration-700 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="mb-4 p-3 rounded-md bg-primary text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Comunidad Exclusiva",
      description: "Conecta con estudiantes de tu universidad, comparte experiencias y crea tu red de contactos."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Chat y Grupos",
      description: "Crea grupos de estudio, comparte apuntes y resuelve dudas con otros estudiantes."
    },
    {
      icon: <ShoppingCart size={24} />,
      title: "Marketplace Estudiantil",
      description: "Compra, vende o intercambia libros, apuntes, y material de estudio entre compañeros."
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Intercambio de Skills",
      description: "Aprende algo nuevo enseñando lo que dominas. Comparte conocimientos y ahorra dinero."
    },
    {
      icon: <Calendar size={24} />,
      title: "Eventos Universitarios",
      description: "Descubre fiestas, talleres, conferencias y todo lo que pasa en tu campus."
    },
    {
      icon: <Zap size={24} />,
      title: "UniGigs",
      description: "Encuentra microtrabajos que se adapten a tus horarios y gana dinero entre clases."
    }
  ];

  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
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

  return (
    <section id="features" className="py-20 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gray-50 slant-bg"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-md">
            CARACTERÍSTICAS
          </span>
          <h2 className="section-title">Todo lo que necesitas para sobrevivir la U</h2>
          <p className="section-subtitle">
            UniClub reúne todas las herramientas que hacen tu vida universitaria más fácil, divertida y productiva.
          </p>
        </div>
        
        <div className="feature-grid">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
