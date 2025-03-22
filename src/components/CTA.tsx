import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, School, CheckCircle, AlertCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState(''); // Nuevo estado para nombre y apellido
  const [university, setUniversity] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true); // Estado para validación del nombre
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState(''); // Mensaje de error para el nombre
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
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

  // Validar nombre y apellido
  const validateName = (name: string) => {
    if (!name) {
      setNameError('El nombre y apellido son obligatorios');
      return false;
    }
    
    // Comprobar si contiene al menos dos palabras (nombre y apellido)
    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
      setNameError('Debes ingresar tu nombre y apellido');
      return false;
    }
    
    setNameError('');
    return true;
  };

  // Validar el formato del correo según la universidad seleccionada
  const validateEmail = (email: string, university: string) => {
    if (!email) {
      setEmailError('El correo electrónico es obligatorio');
      return false;
    }

    if (university === 'UPC') {
      // Formato: U20XXXXXXX@upc.edu.pe
      const upcRegex = /^[uU]20[a-zA-Z0-9]+@upc\.edu\.pe$/;
      if (!upcRegex.test(email)) {
        setEmailError('El correo debe tener el formato U20XXXXXXX@upc.edu.pe');
        return false;
      }
    } else if (university === 'PUCP') {
      // Formato: a20XXXXXXX@pucp.edu.pe o nombre.apellido@pucp.edu.pe
      const pucp1Regex = /^[aA]20[a-zA-Z0-9]+@pucp\.edu\.pe$/;
      const pucp2Regex = /^[a-zA-Z]+\.[a-zA-Z]+@pucp\.edu\.pe$/;
      if (!pucp1Regex.test(email) && !pucp2Regex.test(email)) {
        setEmailError('El correo debe tener formato A20XXXXXXX@pucp.edu.pe o nombre.apellido@pucp.edu.pe');
        return false;
      }
    } else {
      setEmailError('Por favor, selecciona una universidad');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValidEmail = validateEmail(email, university);
    const isValidName = validateName(fullName);
    
    setIsEmailValid(isValidEmail);
    setIsNameValid(isValidName);
    
    if (isValidEmail && isNameValid) {
      setIsVerificationSent(true);
      
      try {
        // Hardcodea la URL directamente para solucionar el problema del .env
        const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
        
        // Intenta la solicitud FETCH sin modo no-cors para poder leer la respuesta
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName,
              email,
              university,
              timestamp: new Date().toISOString()
            })
          });
          
          const result = await response.json();
          
          if (result.message === 'email_exists') {
            setEmailError('Este correo ya está registrado en nuestra lista de espera');
            setIsEmailValid(false);
            setIsVerificationSent(false);
            return;
          }
        } catch (corsError) {
          // Si hay un error CORS, volvemos al modo anterior
          console.log("CORS error, using no-cors mode");
          
          await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
              fullName,
              email,
              university,
              timestamp: new Date().toISOString()
            }),
            mode: 'no-cors'
          });
        }
        
        // Si llegamos aquí, asumimos éxito
        setTimeout(() => {
          setIsVerificationSent(false);
          setEmail('');
          setFullName('');
          setUniversity('');
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setIsVerificationSent(false);
      }
    }
  };

  return (
    <section id="register" className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-white to-gray-300" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-6 md:p-12 rounded-2xl shadow-lg backdrop-blur-sm bg-white/80 border border-white/20">
            <div 
              className={cn(
                "text-center mb-10 md:mb-12 transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
            >
              <span className="inline-block py-1 px-4 mb-4 text-sm font-semibold bg-primary/10 text-primary rounded-full">
                Lista de espera exclusiva
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ¿Listo para transformar tu vida universitaria?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              <div className="space-y-5 md:space-y-6">
                {/* Nuevo campo para nombre y apellido */}
                <div className="relative">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre y apellido
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ingresa tu nombre y apellido"
                      className={cn(
                        "w-full px-4 py-3 pl-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm hover:shadow-md",
                        !isNameValid ? "border-red-500 bg-red-50" : "border-gray-200"
                      )}
                      required
                    />
                  </div>
                  {!isNameValid && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {nameError}
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
                    <select
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm hover:shadow-md appearance-none bg-white"
                      required
                    >
                      <option value="">Selecciona tu universidad</option>
                      <option value="UPC">Universidad Peruana de Ciencias Aplicadas</option>
                      <option value="PUCP">Pontificia Universidad Católica del Perú</option>
                    </select>
                  </div>
                </div>
                
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
                      placeholder={university === 'UPC' ? "U20XXXXXXX@upc.edu.pe" : 
                                  university === 'PUCP' ? "A20XXXXXXX@pucp.edu.pe" : 
                                  "Selecciona una universidad primero"}
                      className={cn(
                        "w-full px-4 py-3 pl-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm hover:shadow-md",
                        !isEmailValid ? "border-red-500 bg-red-50" : "border-gray-200"
                      )}
                      required
                    />
                  </div>
                  {!isEmailValid && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {emailError}
                    </p>
                  )}
                </div>
                
                <div className="pt-3 md:pt-4">
                  <button 
                    type="submit" 
                    className="w-full btn-primary flex justify-center items-center py-3.5 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isVerificationSent}
                  >
                    {isVerificationSent ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verificando...
                      </>
                    ) : (
                      <>
                        <span>Unirse a la lista de espera</span>
                        <ArrowRight className="ml-2" size={20} />
                      </>
                    )}
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
              "mt-10 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 transition-all duration-1000 delay-300",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <div className="flex items-center space-x-3 bg-white p-3 px-5 rounded-xl shadow-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base text-gray-700 font-medium">Acceso prioritario</p>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-3 px-5 rounded-xl shadow-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base text-gray-700 font-medium">Beneficios exclusivos</p>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-3 px-5 rounded-xl shadow-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base text-gray-700 font-medium">100% gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;