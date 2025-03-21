
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
        "bg-white shadow-lg rounded-lg p-4 transition-all duration-700 transform border-l-4 border-primary",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="flex items-start">
        <div className="p-3 rounded-md bg-primary text-white mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-500 text-sm mb-2">{category}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img 
                  src={userAvatar} 
                  alt={userName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-600">{userName}</span>
            </div>
            <span className="font-bold text-primary">{price}</span>
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
    <section id="marketplace" className="py-20 bg-gray-200" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-md">
            MARKETPLACE
          </span>
          <h2 className="section-title">Compra, Vende, Intercambia</h2>
          <p className="section-subtitle">
            Todo lo que necesitas para tu vida universitaria está aquí: libros usados, apuntes, servicios y más. Intercambia con otros estudiantes y ahorra.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-500",
          sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="bg-secondary inline-flex items-center p-4 rounded-lg text-white">
            <ShoppingBag className="text-primary mr-3" size={24} />
            <span className="font-medium">+800 productos y servicios disponibles</span>
          </div>
          
          <div className="mt-8">
            <a href="#register" className="btn-primary inline-flex items-center">
              <span>Ver marketplace completo</span>
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
