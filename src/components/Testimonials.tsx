
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  content: string;
  name: string;
  role: string;
  university: string;
  avatar: string;
}

const Testimonial = ({ content, name, role, university, avatar }: TestimonialProps) => {
  return (
    <div className="testimonial-card flex flex-col h-full">
      <div className="flex-1">
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <p className="text-gray-700 mb-6">"{content}"</p>
      </div>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <img 
            src={avatar} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{role}, {university}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      content: "UniClub ha transformado mi experiencia universitaria. He encontrado compañeros para grupos de estudio y hasta conseguí un trabajo a tiempo parcial gracias a la sección de UniGigs.",
      name: "Andrea Martínez",
      role: "Estudiante de Psicología",
      university: "Universidad Nacional",
      avatar: "https://i.pravatar.cc/150?img=28"
    },
    {
      content: "El marketplace es increíble. Vendí todos mis libros de semestres anteriores y compré los que necesitaba a un precio mucho mejor que en las librerías.",
      name: "Daniel Peralta",
      role: "Estudiante de Ingeniería",
      university: "Universidad Tecnológica",
      avatar: "https://i.pravatar.cc/150?img=59"
    },
    {
      content: "La función de intercambio de habilidades es genial. Doy clases de estadística y a cambio recibo clases de diseño gráfico. Es un win-win para todos.",
      name: "Valeria Rojas",
      role: "Estudiante de Economía",
      university: "Universidad Central",
      avatar: "https://i.pravatar.cc/150?img=49"
    },
    {
      content: "Me encanta cómo UniClub verifica que todos seamos estudiantes reales. Eso crea un ambiente de confianza que no existe en otras redes sociales.",
      name: "Fernando Díaz",
      role: "Estudiante de Medicina",
      university: "Universidad Nacional",
      avatar: "https://i.pravatar.cc/150?img=61"
    },
    {
      content: "Gracias a los eventos publicados en UniClub he podido asistir a conferencias y talleres increíbles que ni siquiera sabía que existían.",
      name: "Carolina Torres",
      role: "Estudiante de Arquitectura",
      university: "Universidad de Diseño",
      avatar: "https://i.pravatar.cc/150?img=40"
    },
    {
      content: "UniClub ha sido clave para adaptarme a la vida universitaria. Como estudiante de primer año, me ha ayudado a conectar con compañeros y encontrar recursos valiosos.",
      name: "Mateo Suárez",
      role: "Estudiante de Derecho",
      university: "Universidad Central",
      avatar: "https://i.pravatar.cc/150?img=15"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

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

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="testimonials" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full">
            Testimonios
          </span>
          <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
          <p className="section-subtitle">
            Descubre cómo UniClub ha impactado positivamente en la vida universitaria de nuestros miembros.
          </p>
        </div>
        
        <div className="relative">
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {testimonials
              .slice(current * itemsPerPage, (current + 1) * itemsPerPage)
              .map((testimonial, index) => (
                <Testimonial
                  key={index}
                  content={testimonial.content}
                  name={testimonial.name}
                  role={testimonial.role}
                  university={testimonial.university}
                  avatar={testimonial.avatar}
                />
              ))}
          </div>
          
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  current === i ? "bg-primary scale-125" : "bg-gray-300"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 lg:translate-x-8 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
