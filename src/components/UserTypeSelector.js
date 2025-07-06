// src/components/UserTypeSelector.js
import { useOnboarding } from '../context/OnboardingContext';
import { useState } from 'react';

export default function UserTypeSelector() {
  const { startOnboarding } = useOnboarding();
  const [selectedType, setSelectedType] = useState(null);

  const handleSelection = (userType) => {
    setSelectedType(userType);
    // Petit délai pour feedback visuel
    setTimeout(() => {
      startOnboarding(userType);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-potomitan-beige flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🚑</div>
          <h1 className="text-3xl font-bold text-potomitan-dark-blue mb-2">
            POTOMITAN
          </h1>
          <p className="text-gray-600">
            Traduction français-créole pour situations d'urgence
          </p>
        </div>

        {/* Sélection du type d'utilisateur */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold text-center text-potomitan-dark-blue mb-6">
            Qui êtes-vous ?
          </h2>

          {/* First Responder */}
          <button
            onClick={() => handleSelection('first-responder')}
            className={`w-full p-6 rounded-lg border-2 transition transform ${
              selectedType === 'first-responder'
                ? 'border-potomitan-red bg-red-50 scale-105'
                : 'border-gray-200 bg-white hover:border-potomitan-red hover:shadow-lg'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🚒</div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-potomitan-dark-blue">
                  Secouriste / Soignant
                </h3>
                <p className="text-sm text-gray-600">
                  Pompier, SAMU, médecin, infirmier
                </p>
                <p className="text-xs text-potomitan-red font-medium">
                  → Formation 5 minutes requise
                </p>
              </div>
            </div>
          </button>

          {/* Regular User */}
          <button
            onClick={() => handleSelection('regular')}
            className={`w-full p-6 rounded-lg border-2 transition transform ${
              selectedType === 'regular'
                ? 'border-potomitan-green bg-green-50 scale-105'
                : 'border-gray-200 bg-white hover:border-potomitan-green hover:shadow-lg'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">👥</div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-potomitan-dark-blue">
                  Grand public
                </h3>
                <p className="text-sm text-gray-600">
                  Famille, proche, bénévole
                </p>
                <p className="text-xs text-potomitan-green font-medium">
                  → Accès direct à l'application
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Information contextuelle */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <div className="flex gap-3">
            <div className="text-blue-500 text-xl">💡</div>
            <div>
              <p className="text-sm text-blue-800">
                <strong>Pourquoi cette distinction ?</strong>
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Les secouristes bénéficient d'une formation rapide pendant leur trajet 
                pour optimiser leur intervention créolophone.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback visuel sélection */}
        {selectedType && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-potomitan-medium-blue"></div>
              <span className="text-sm text-potomitan-medium-blue font-medium">
                Chargement...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}