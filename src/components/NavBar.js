import { Link } from 'react-router-dom';
import { useEmergency } from '../context/EmergencyContext';

export default function NavBar() {
  const { isEmergencyMode } = useEmergency();
  
  return (
    <nav className={`w-full p-4 ${isEmergencyMode ? 'bg-potomitan-red' : 'bg-potomitan-dark-blue'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">POTOMITAN</Link>
        
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-potomitan-beige">Accueil</Link>
          <Link to="/phrases" className="text-white hover:text-potomitan-beige">Phrases</Link>
          <Link to="/contribuer" className="text-white hover:text-potomitan-beige">Contribuer</Link>
        </div>
      </div>
    </nav>
  );
}