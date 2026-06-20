import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // Cierra el menú cuando cambia la ruta (navegación)
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Bloquea el scroll del body cuando el menú está abierto para mejorar la UX
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);
  
  const headerTextColor = 'text-dark';
  const navLinkClasses = "hover:text-primary transition-colors duration-300 font-semibold";
  const activeLinkClasses = `text-accent`;
  const mobileNavLinkClasses = `text-dark hover:text-primary transition-colors duration-300 font-semibold block py-4 text-xl text-center`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logotipo */}
        <NavLink to="/" className="flex-shrink-0 flex items-center">
          <img src="https://i.imgur.com/PYO6el1.png" alt="EcoZen Logo" className="h-10 md:h-20 w-auto" />
          <span className={`ml-2 md:ml-4 font-serif text-2xl md:text-3xl font-bold tracking-wider ${headerTextColor}`}>EcoZen</span>
        </NavLink>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center justify-end gap-3 sm:gap-4 md:gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkClasses} ${headerTextColor} whitespace-nowrap py-2 ${isActive ? activeLinkClasses : ""} text-sm md:text-base`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              `${navLinkClasses} ${headerTextColor} whitespace-nowrap py-2 ${isActive ? activeLinkClasses : ""} text-sm md:text-base`
            }
          >
            Nosotros
          </NavLink>
          <NavLink
            to="/servicios"
            className={({ isActive }) =>
              `${navLinkClasses} ${headerTextColor} whitespace-nowrap py-2 ${isActive ? activeLinkClasses : ""} text-sm md:text-base`
            }
          >
            Servicios
          </NavLink>
          <NavLink
            to="/reseñas"
            className={({ isActive }) =>
              `${navLinkClasses} ${headerTextColor} whitespace-nowrap py-2 ${isActive ? activeLinkClasses : ""} text-sm md:text-base`
            }
          >
            Reseñas
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `${navLinkClasses} ${headerTextColor} whitespace-nowrap py-2 ${isActive ? activeLinkClasses : ""} text-sm md:text-base`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/contacto"
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 whitespace-nowrap text-sm md:text-base"
          >
            Pide Presupuesto
          </NavLink>
        </nav>

        {/* Botón Menú Móvil */}
        <div className="md:hidden">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${headerTextColor} focus:outline-none p-2 -mr-2 transition-colors duration-300`}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
            >
                {isMenuOpen ? (
                    <XIcon className="h-8 w-8" />
                ) : (
                    <MenuIcon className="h-8 w-8" />
                )}
            </button>
        </div>
      </div>
      
      {/* Menú Móvil Overlay */}
      <div 
        id="mobile-menu"
        className={`
          md:hidden fixed top-[72px] left-0 w-full h-[calc(100%-72px)] bg-white
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col justify-center h-full">
            <nav className="flex flex-col items-center gap-6">
                <NavLink to="/" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-accent' : ""}`} onClick={closeMenu}>Inicio</NavLink>
                <NavLink to="/nosotros" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-accent' : ""}`} onClick={closeMenu}>Nosotros</NavLink>
                <NavLink to="/servicios" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-accent' : ""}`} onClick={closeMenu}>Servicios</NavLink>
                <NavLink to="/reseñas" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-accent' : ""}`} onClick={closeMenu}>Reseñas</NavLink>
                <NavLink to="/blog" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-accent' : ""}`} onClick={closeMenu}>Blog</NavLink>
                <NavLink to="/contacto" className="mt-6 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 text-lg" onClick={closeMenu}>
                    Pide Presupuesto
                </NavLink>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;