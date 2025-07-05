
// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d’informations.

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LogoPotomitan from '../assets/logo-potomitan.svg';

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="w-full p-4 bg-potomitan-dark-blue"> 
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className={`rounded-full bg-white p-1 flex items-center justify-center ${isMobile ? 'mr-0' : 'mr-2'}`}>
            <img 
              src={LogoPotomitan} 
              alt="POTOMITAN" 
              className="h-20"
            />
          </div>
          {!isMobile && <span className="text-white text-2xl font-bold">POTOMITAN</span>}
        </Link>
        
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-potomitan-beige">Accueil</Link>
          <Link to="/phrases" className="text-white hover:text-potomitan-beige">Phrases</Link>
          <Link to="/contribuer" className="text-white hover:text-potomitan-beige">Contribuer</Link>
          <span className="bg-white text-potomitan-dark-blue text-xs font-semibold px-2 py-0.5 rounded-md ml-4">v1.1.0</span>
          </div>
      </div>
    </nav>
  );
}