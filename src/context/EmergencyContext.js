// src/context/EmergencyContext.js
import { createContext, useState, useContext } from 'react';

const EmergencyContext = createContext();

export function EmergencyProvider({ children }) {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  
  const toggleEmergencyMode = () => {
    setIsEmergencyMode(prev => !prev);
  };

  const activateEmergencyMode = () => {
    setIsEmergencyMode(true);
  };

  const deactivateEmergencyMode = () => {
    setIsEmergencyMode(false);
  };

  return (
    <EmergencyContext.Provider value={{ 
      isEmergencyMode, 
      toggleEmergencyMode,
      activateEmergencyMode,
      deactivateEmergencyMode
    }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within EmergencyProvider');
  }
  return context;
}