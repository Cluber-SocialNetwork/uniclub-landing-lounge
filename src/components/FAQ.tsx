
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, delay }: FAQItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

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

    const currentRef = itemRef.current;
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
      ref={itemRef}
      className={cn(
        "faq-item transition-all duration-700 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <button
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <ChevronDown 
          size={20} 
          className={cn(
            "text-primary transition-transform duration-300",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="pb-4 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: "¿Quién puede registrarse en Cluber?",
      answer: "Cluber es exclusivo para estudiantes universitarios con correo electrónico institucional activo. Verificamos cada registro para garantizar un entorno académico seguro y relevante."
    },
    {
      question: "¿Cómo funciona el sistema de intercambio de habilidades?",
      answer: "Nuestro sistema 'Aprende X, Enseña Y' te permite ofrecer tus conocimientos en áreas donde eres fuerte y buscar ayuda en las que necesitas mejorar. Puedes intercambiar horas de enseñanza o establecer tarifas si prefieres monetizar tus habilidades."
    },
    {
      question: "¿Qué tipo de productos puedo encontrar en el marketplace?",
      answer: "El marketplace está enfocado en recursos académicos como libros, apuntes, materiales de estudio, pero también incluye servicios relevantes para estudiantes como tutoría, diseño de presentaciones, edición de trabajos, entre otros."
    },
    {
      question: "¿Cómo garantizan transacciones seguras en el marketplace?",
      answer: "Implementamos un sistema de calificaciones y reseñas, además de un chat integrado para comunicación directa. También ofrecemos recomendaciones para encuentros seguros dentro del campus y opciones de pago protegidas."
    },
    {
      question: "¿Qué son los UniGigs y cómo funcionan?",
      answer: "UniGigs son microtrabajos flexibles ideales para estudiantes. Empresas y particulares publican oportunidades laborales de corta duración o proyectos freelance adaptados a horarios académicos. Tú eliges los que te interesan y negocias directamente."
    },
    {
      question: "¿Cómo puedo organizar un evento en Cluber?",
      answer: "Desde tu perfil puedes crear eventos académicos, deportivos o sociales. Especifica fecha, lugar, descripción y limita la asistencia a tu universidad o ábrelo a toda la comunidad. Incluye formularios de registro personalizados si lo necesitas."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full">
            Preguntas Frecuentes
          </span>
          <h2 className="section-title">¿Tienes dudas?</h2>
          <p className="section-subtitle">
            Respondemos las preguntas más comunes sobre Cluber.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => toggleFAQ(index)}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className={cn(
          "text-center mt-12 transition-all duration-700 delay-500",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
