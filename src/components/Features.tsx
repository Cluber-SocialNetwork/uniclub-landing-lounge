
import { 
  Users, MessageCircle, GraduationCap, BookOpen, 
  ShoppingCart, Calendar
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
      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
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
      icon: <Users size={32} />,
      title: "Comunidad Exclusiva",
      description: "Conecta con estudiantes de tu universidad y de todo el país en un entorno exclusivo y seguro."
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Mensajería Inteligente",
      description: "Comunícate fácilmente, crea grupos por materias o intereses, y comparte recursos académicos."
    },
    {
      icon: <ShoppingCart size={32} />,
      title: "Marketplace Estudiantil",
      description: "Compra, vende o intercambia libros, apuntes y materiales específicos para tus estudios."
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Intercambio de Habilidades",
      description: "Enseña lo que sabes y aprende lo que necesitas con el sistema 'Aprende X, Enseña Y'."
    },
    {
      icon: <Calendar size={32} />,
      title: "Eventos Universitarios",
      description: "Descubre, organiza y participa en eventos académicos, deportivos y sociales de tu interés."
    },
    {
      icon: <BookOpen size={32} />,
      title: "UniGigs Microtrabajos",
      description: "Encuentra oportunidades laborales flexibles compatibles con tus horarios de estudio."
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
    <section id="features" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full">
            Características
          </span>
          <h2 className="section-title">Todo lo que necesitas en un solo lugar</h2>
          <p className="section-subtitle">
            UniClub integra todas las herramientas que un estudiante universitario necesita para su vida académica y social.
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
