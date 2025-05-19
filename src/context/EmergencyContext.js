// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d’informations.
import { createContext, useState, useContext } from 'react';

const EmergencyContext = createContext();

export function EmergencyProvider({ children }) {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  
  const toggleEmergencyMode = () => {
    setIsEmergencyMode(prev => !prev);
  };

  return (
    <EmergencyContext.Provider value={{ isEmergencyMode, toggleEmergencyMode }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  return useContext(EmergencyContext);
}