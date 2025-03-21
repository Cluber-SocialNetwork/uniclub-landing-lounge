import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, BookOpen, Coffee, Laptop, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketplaceItemProps {
  icon: JSX.Element;
  title: string;
  price: string;
  category: string;
  userName: string;
  userAvatar: string;
  delay: number;
}

const MarketplaceItem = ({ icon, title, price, category, userName, userAvatar, delay }: MarketplaceItemProps) => {
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
        "bg-white shadow-lg rounded-lg p-6 transition-all duration-700 transform border-l-4 border-primary hover:shadow-xl hover:-translate-y-1",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="flex items-start">
        <div className="p-4 rounded-md bg-primary text-white mr-5">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-500 text-sm mb-3">{category}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-gray-100">
                <img 
                  src={userAvatar} 
                  alt={userName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">{userName}</span>
            </div>
            <span className="font-bold text-primary text-lg">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Marketplace = () => {
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

  const items = [
    {
      icon: <BookOpen size={24} />,
      title: "Apuntes de Cálculo Diferencial",
      price: "S/15",
      category: "Material de Estudio",
      userName: "Carlos M.",
      userAvatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      icon: <Laptop size={24} />,
      title: "Diseño de Slides para Exposiciones",
      price: "S/25",
      category: "UniGigs",
      userName: "Ana P.",
      userAvatar: "https://i.pravatar.cc/150?img=47"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Manual Economía Política (usado)",
      price: "S/12",
      category: "Libros",
      userName: "Miguel L.",
      userAvatar: "https://i.pravatar.cc/150?img=68"
    },
    {
      icon: <Coffee size={24} />,
      title: "Clases de Inglés Conversacional",
      price: "S/8 x hr",
      category: "Intercambio de Skills",
      userName: "Lucía G.",
      userAvatar: "https://i.pravatar.cc/150?img=45"
    }
  ];

  return (
    <section id="marketplace" className="py-24 bg-gray-200" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block py-1 px-4 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full">
            MARKETPLACE
          </span>
          <h2 className="section-title text-4xl md:text-5xl mb-6">Compra, Vende, Intercambia</h2>
          <p className="section-subtitle text-lg max-w-3xl mx-auto">
            Todo lo que necesitas para tu vida universitaria está aquí: libros usados, apuntes, servicios y más. Intercambia con otros estudiantes y ahorra.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {items.map((item, index) => (
            <MarketplaceItem 
              key={index}
              icon={item.icon}
              title={item.title}
              price={item.price}
              category={item.category}
              userName={item.userName}
              userAvatar={item.userAvatar}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center gap-8 mt-12 mb-10">
          <div className={cn(
            "bg-secondary inline-flex items-center p-5 px-8 rounded-lg text-white shadow-lg transition-all duration-700 transform",
            sectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <ShoppingBag className="text-primary mr-4" size={28} />
            <span className="font-medium text-lg">+800 productos y servicios disponibles</span>
          </div>
          
          <div className={cn(
            "transition-all duration-700 delay-300 transform",
            sectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <a href="#register" className="btn-primary inline-flex items-center px-8 py-4 text-lg">
              <span>Ver marketplace completo</span>
              <ArrowRight size={20} className="ml-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;