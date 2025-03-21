import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, School, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section id="register" className="py-10 relative overflow-hidden bg-gradient-to-br from-white to-gray-300" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl shadow-lg backdrop-blur-sm bg-white/80 border border-white/20">
            <div 
              className={cn(
                "text-center mb-12 transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
            >
              <span className="inline-block py-1 px-4 mb-4 text-sm font-semibold bg-primary/10 text-primary rounded-full">
                Lista de espera exclusiva
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ¿Listo para transformar tu vida universitaria?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Sé de los primeros en acceder a Cluber cuando lancemos en tu universidad. 
                Regístrate ahora y obtén beneficios exclusivos desde el primer día.
              </p>
            </div>
            
            <form 
              onSubmit={handleSubmit}
              className={cn(
                "max-w-xl mx-auto transition-all duration-1000 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              )}
            >
              <div className="space-y-6">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico institucional
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu.nombre@universidad.edu"
                      className={cn(
                        "w-full px-4 py-3 pl-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm hover:shadow-md",
                        !isEmailValid ? "border-red-500 bg-red-50" : "border-gray-200"
                      )}
                      required
                    />
                  </div>
                  {!isEmailValid && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <span className="mr-1">⚠️</span> Por favor introduce un correo institucional válido (.edu)
                    </p>
                  )}
                </div>
                
                <div className="relative">
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                    Universidad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <School size={18} />
                    </div>
                    <input
                      type="text"
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="Nombre de tu universidad"
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full btn-primary flex justify-center items-center py-3.5 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Unirse a la lista de espera</span>
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                  
                  {isSubmitted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 flex items-center justify-center animate-fade-in">
                      <CheckCircle size={18} className="mr-2" />
                      <span>¡Gracias por tu interés! Te enviaremos información pronto.</span>
                    </div>
                  )}
                </div>
              </div>
            </form>
            
            <div className={cn(
              "mt-12 flex flex-wrap justify-center gap-8 transition-all duration-1000 delay-300",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <div className="flex items-center space-x-3 bg-white p-3 px-5 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Acceso prioritario</p>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-3 px-5 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Beneficios exclusivos</p>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-3 px-5 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">100% gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;