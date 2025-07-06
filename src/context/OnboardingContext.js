// src/context/OnboardingContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [onboardingState, setOnboardingState] = useState({
    isCompleted: false,
    currentStep: 0,
    userType: null, // 'first-responder' | 'regular' | null
    startTime: null,
    completedSteps: []
  });

  // Charger l'état depuis localStorage au démarrage
  useEffect(() => {
    const loadOnboardingState = () => {
      const savedState = localStorage.getItem('potomitan_onboarding');
      console.log('🔍 Loading savedState:', savedState); // Debug
      
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          console.log('✅ Parsed state:', parsed); // Debug
          
          // Vérifier si pas trop ancien (7 jours)
          const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
          if (parsed.startTime && parsed.startTime > weekAgo) {
            setOnboardingState(parsed);
            console.log('✅ State loaded successfully'); // Debug
          } else {
            console.log('❌ State too old, resetting'); // Debug
            resetOnboarding();
          }
        } catch (error) {
          console.error('❌ Error parsing state:', error);
          resetOnboarding();
        }
      } else {
        console.log('ℹ️ No saved state found'); // Debug
      }
    };
  
    // Charger immédiatement
    loadOnboardingState();
  }, []);

  // Sauvegarder l'état à chaque changement
  useEffect(() => {
    // Ne sauvegarder que si on a de vraies données
    if (onboardingState.userType !== null) {
      console.log('💾 Saving state:', onboardingState); // Debug
      localStorage.setItem('potomitan_onboarding', JSON.stringify(onboardingState));
    }
  }, [onboardingState]);

  const startOnboarding = (userType = 'first-responder') => {
    setOnboardingState({
      isCompleted: false,
      currentStep: 0,
      userType,
      startTime: Date.now(),
      completedSteps: []
    });
  };

  const nextStep = () => {
    setOnboardingState(prev => {
      const newCompletedSteps = [...prev.completedSteps, prev.currentStep];
      return {
        ...prev,
        currentStep: prev.currentStep + 1,
        completedSteps: newCompletedSteps
      };
    });
  };

  const completeOnboarding = () => {
    setOnboardingState(prev => ({
      ...prev,
      isCompleted: true,
      currentStep: 5 // Total steps completed
    }));
  };

  const resetOnboarding = () => {
    setOnboardingState({
      isCompleted: false,
      currentStep: 0,
      userType: null,
      startTime: null,
      completedSteps: []
    });
    localStorage.removeItem('potomitan_onboarding');
  };

  const skipOnboarding = () => {
    setOnboardingState(prev => ({
      ...prev,
      isCompleted: true,
      currentStep: 5
    }));
  };

  // Vérifications utiles pour l'UX
  const shouldShowOnboarding = () => {
    return !onboardingState.isCompleted && 
           onboardingState.userType === 'first-responder';
  };

  const canAccessEmergencyMode = () => {
    return onboardingState.isCompleted || 
           onboardingState.userType === 'regular';
  };

  const getProgress = () => {
    return {
      current: onboardingState.currentStep,
      total: 5,
      percentage: Math.round((onboardingState.currentStep / 5) * 100)
    };
  };

  return (
    <OnboardingContext.Provider value={{
      onboardingState,
      startOnboarding,
      nextStep,
      completeOnboarding,
      resetOnboarding,
      skipOnboarding,
      shouldShowOnboarding,
      canAccessEmergencyMode,
      getProgress
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}