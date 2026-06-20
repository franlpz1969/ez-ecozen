import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './icons/SocialIcons';
import { XIcon } from './icons/XIcon';

const Footer: React.FC = () => {
  // Easter egg state and logic for admin access
  const [clickCount, setClickCount] = useState(0);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const requiredClicks = 5;
  // IMPORTANTE: Reemplaza esta URL de marcador de posición con la URL real de tu Google Sheet
  const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1X5YvmyTat6w5IdCkgovTOC0JqKVWKTGRBh9y1MyjeQs/edit?gid=0#gid=0';

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (clickCount > 0 && clickCount < requiredClicks) {
      // Reinicia el contador de clics si el usuario no completa la secuencia a tiempo
      timer = setTimeout(() => setClickCount(0), 2000); 
    }
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleCopyrightClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount >= requiredClicks) {
      setClickCount(0);
      setPasswordInput('');
      setPasswordError('');
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordInput === 'adriana') {
      setIsPasswordModalOpen(false);
      window.open(googleSheetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setPasswordError('Contraseña incorrecta.');
      setPasswordInput('');
    }
  };


  return (
    <>
      <footer className="bg-dark text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and mission */}
            <div className="md:col-span-1">
              <NavLink to="/" className="flex items-center mb-4">
                 <img src="https://i.imgur.com/PYO6el1.png" alt="EcoZen Logo" className="h-20 w-auto" />
                 <span className="ml-4 font-serif text-3xl font-bold text-white tracking-wider">EcoZen</span>
              </NavLink>
              <p className="text-gray-400 text-sm">
                Limpieza ecológica para un hogar en armonía y un planeta saludable.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white tracking-wider mb-4">Navegación</h3>
              <nav className="flex flex-col space-y-2">
                <NavLink to="/nosotros" className="text-gray-400 hover:text-primary transition-colors">Nosotros</NavLink>
                <NavLink to="/servicios" className="text-gray-400 hover:text-primary transition-colors">Servicios</NavLink>
                <NavLink to="/reseñas" className="text-gray-400 hover:text-primary transition-colors">Reseñas</NavLink>
                <NavLink to="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</NavLink>
                <NavLink to="/contacto" className="text-gray-400 hover:text-primary transition-colors">Contacto</NavLink>
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-white tracking-wider mb-4">Contacto</h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li><a href="mailto:eco.zen.ac@gmail.com" className="hover:text-primary">eco.zen.ac@gmail.com</a></li>
                <li><a href="tel:697850970" className="hover:text-primary">697 85 09 70</a></li>
                <li>Madrid, España</li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
               <h3 className="font-semibold text-white tracking-wider mb-4">Síguenos</h3>
               <div className="flex space-x-4">
                 <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FacebookIcon /></a>
                 <a href="#" className="text-gray-400 hover:text-primary transition-colors"><InstagramIcon /></a>
                 <a href="#" className="text-gray-400 hover:text-primary transition-colors"><TwitterIcon /></a>
               </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
            <p>
              <span
                onClick={handleCopyrightClick}
                title="Acceso administrativo"
                className="cursor-pointer"
              >
                &copy; {new Date().getFullYear()} EcoZen.
              </span>
              {' '}Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
      
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-sm relative animate-fade-in text-dark">
            <button 
                onClick={() => setIsPasswordModalOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="Cerrar modal"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-dark mb-4 text-center">Acceso Restringido</h3>
            <p className="text-center text-gray-600 mb-6">Introduce la contraseña para continuar.</p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="admin-password" className="sr-only">Contraseña</label>
                  <input 
                    type="password" 
                    id="admin-password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500"
                    placeholder="Contraseña"
                    autoFocus
                  />
                </div>
                {passwordError && (
                  <p className="text-red-600 text-sm text-center">{passwordError}</p>
                )}
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
                  >
                    Acceder
                  </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;