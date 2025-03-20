
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation - check for educational email
    const isEduEmail = email.endsWith('.edu') || email.includes('edu.');
    setIsEmailValid(isEduEmail);
    
    if (isEduEmail) {
      // Here you would handle the form submission
      console.log('Form submitted:', { email, university });
      // Reset form
      setEmail('');
      setUniversity('');
      alert('¡Gracias por tu interés! Te enviaremos información pronto.');
    }
  };

  return (
    <section id="register" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <div className="text-center mb-10">
              <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                Lista de espera
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para transformar tu vida universitaria?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Sé de los primeros en acceder a UniClub cuando lancemos en tu universidad. Regístrate ahora en nuestra lista de espera.
              </p>
            </div>
            
            <form 
              onSubmit={handleSubmit}
              className={cn(
                "max-w-xl mx-auto transition-all duration-1000 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              )}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico institucional
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu.nombre@universidad.edu"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary transition-colors",
                      !isEmailValid ? "border-red-500" : "border-gray-300"
                    )}
                    required
                  />
                  {!isEmailValid && (
                    <p className="mt-1 text-sm text-red-500">
                      Por favor introduce un correo institucional válido (.edu)
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                    Universidad
                  </label>
                  <input
                    type="text"
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="Nombre de tu universidad"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full btn-primary flex justify-center items-center"
                  >
                    <span>Unirse a la lista de espera</span>
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>
            </form>
            
            <div className={cn(
              "mt-10 flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-300",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">Acceso prioritario</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">Beneficios exclusivos</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">100% gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
