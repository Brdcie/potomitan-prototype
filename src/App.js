// src/App.js - Version modifiée avec onboarding
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmergencyProvider } from './context/EmergencyContext';
import { OnboardingProvider } from './context/OnboardingContext'; // NOUVEAU
// En haut du fichier App.js, ajoute cette ligne :
import { useOnboarding } from './context/OnboardingContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import PhrasesPage from './pages/PhrasesPage';
import ContributePage from './pages/ContributePage';
import OnboardingFlow from './components/OnboardingFlow'; // NOUVEAU
import UserTypeSelector from './components/UserTypeSelector'; // NOUVEAU
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <EmergencyProvider>
        <OnboardingProvider> {/* NOUVEAU wrapper */}
          <AppContent />
        </OnboardingProvider>
      </EmergencyProvider>
    </BrowserRouter>
  );
}

// Logique d'affichage conditionnelle
function AppContent() {
  const { shouldShowOnboarding, onboardingState } = useOnboarding();

  // Si pas de type utilisateur défini, montrer le sélecteur
  if (!onboardingState.userType) {
    return <UserTypeSelector />;
  }

  // Si onboarding requis pour first-responder
  if (shouldShowOnboarding()) {
    return <OnboardingFlow />;
  }

  // App normale (existante)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phrases" element={<PhrasesPage />} />
        <Route path="/phrases/:category" element={<PhrasesPage />} />
        <Route path="/contribuer" element={<ContributePage />} />
      </Routes>
    </>
  );
}

export default App;