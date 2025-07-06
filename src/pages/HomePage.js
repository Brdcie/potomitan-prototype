// HomePage.js - Version avec VRAI mode urgence

import { useEmergency } from '../context/EmergencyContext';
import { useOnboarding } from '../context/OnboardingContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TextTranslation from '../components/TextTranslation';
import hautParleurIcon from '../assets/haut-parleur.png';

const categories = [
  { id: 'medical', name: 'Médical', color: 'bg-potomitan-orange' },
  { id: 'evacuation', name: 'Évacuation', color: 'bg-potomitan-yellow' },
  { id: 'secours', name: 'Secours', color: 'bg-potomitan-green' },
  { id: 'information', name: 'Information', color: 'bg-potomitan-light-blue' },
];

// PHRASES CRITIQUES pour mode urgence
const emergencyPhrases = [
  { french: "STOP ! Danger !", creole: "STOP ! Danjé !", audio: "calme.mp3", urgency: "critical" },
  { french: "Où avez-vous mal ?", creole: "Ki koté ou ni mal ?", audio: "ou_mal.mp3", urgency: "critical" },
  { french: "Ne bougez pas", creole: "Pa boujé", audio: "calme.mp3", urgency: "critical" },
  { french: "Restez calme", creole: "Rété kalm", audio: "calme.mp3", urgency: "high" },
  { french: "Les secours arrivent", creole: "Sékou-la ka rivé", audio: "secours_arrivent.mp3", urgency: "high" },
  { french: "Respirez profondément", creole: "Rèspiré fò", audio: "ou_mal.mp3", urgency: "high" }
];

const normalPhrases = [
  { french: "Où avez-vous mal ?", creole: "Ki koté ou ni mal ?", audio: "ou_mal.mp3" },
  { french: "Restez calme", creole: "Rété kalm", audio: "calme.mp3" },
  { french: "Les secours arrivent", creole: "Sékou-la ka rivé", audio: "secours_arrivent.mp3" }
];

export default function HomePage() {
  const { isEmergencyMode, toggleEmergencyMode } = useEmergency();
  const { canAccessEmergencyMode, onboardingState } = useOnboarding();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [showTranslator, setShowTranslator] = useState(false);
  
  // Fonction pour jouer l'audio
  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(`/audio/${audioFile}`);
    audio.play().catch(err => console.log('Erreur audio:', err));
    setCurrentAudio(audio);
  };
  
  // Gestion tentative d'activation mode urgence
  const handleEmergencyModeToggle = () => {
    if (!canAccessEmergencyMode()) {
      window.alert("Veuillez d'abord compléter la formation de 5 minutes pour accéder au mode urgence.");
      return;
    }
    toggleEmergencyMode();
  };

  // RENDU MODE URGENCE - Interface simplifiée
  if (isEmergencyMode) {
    return (
      <div className="min-h-screen bg-potomitan-red">
        <div className="container mx-auto p-4">
          {/* Header mode urgence */}
          <div className="bg-potomitan-red text-white p-4 rounded-md mb-6 flex justify-between items-center border-2 border-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-pulse">🚨</span>
              <span className="font-bold text-xl">URGENCE IMMÉDIATE</span>
            </div>
            <button 
              onClick={toggleEmergencyMode}
              className="bg-white text-potomitan-red px-6 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition"
            >
              EXIT
            </button>
          </div>

          {/* Catégories simplifiées - Seulement 2 principales */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Link 
              to="/phrases/medical"
              className="bg-potomitan-orange p-8 rounded-md text-center font-bold text-white text-2xl shadow-lg hover:shadow-xl transition border-4 border-white"
            >
              🏥 MÉDICAL URGENCE
            </Link>
            <Link 
              to="/phrases/evacuation"
              className="bg-potomitan-yellow p-8 rounded-md text-center font-bold text-white text-2xl shadow-lg hover:shadow-xl transition border-4 border-white"
            >
              🌪️ ÉVACUATION IMMÉDIATE
            </Link>
          </div>

          {/* Phrases critiques prioritaires */}
          <div className="bg-white rounded-md shadow-lg p-6 border-4 border-white">
            <h2 className="text-2xl font-bold mb-6 text-potomitan-red flex items-center gap-2">
              ⚡ PHRASES CRITIQUES
            </h2>
            <div className="space-y-4">
              {emergencyPhrases.map((phrase, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-md border-l-4 ${
                    phrase.urgency === 'critical' 
                      ? 'border-potomitan-red bg-red-50' 
                      : 'border-potomitan-orange bg-orange-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-bold text-xl text-potomitan-dark-blue">{phrase.french}</p>
                      <p className="text-lg italic text-gray-700 mt-1">{phrase.creole}</p>
                      {phrase.urgency === 'critical' && (
                        <span className="inline-block mt-2 bg-potomitan-red text-white text-xs px-3 py-1 rounded-full font-bold">
                          CRITIQUE
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => playAudio(phrase.audio)}
                      className="bg-potomitan-red text-white p-4 rounded-full hover:bg-red-600 transition ml-4"
                    >
                      <img src={hautParleurIcon} alt="Listen" className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton d'urgence - Plus visible */}
          <button className="fixed bottom-6 right-6 bg-white text-potomitan-red p-6 rounded-full shadow-2xl text-3xl font-bold border-4 border-potomitan-red animate-pulse">
            112
          </button>
        </div>
      </div>
    );
  }

  // RENDU MODE NORMAL - Interface complète (existante)
  return (
    <div className="min-h-screen bg-potomitan-beige">
      <div className="container mx-auto p-4">
        
        {/* Bandeau statut formation */}
        {onboardingState.userType === 'first-responder' && !onboardingState.isCompleted && (
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mb-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">ℹ️</span>
              <span className="text-sm text-blue-800">
                <strong>Formation requise</strong> - Complétez la formation de 5 minutes pour débloquer le mode urgence
              </span>
            </div>
          </div>
        )}

        {/* Bouton mode urgence */}
        <button 
          onClick={handleEmergencyModeToggle}
          className={`w-full py-4 mb-6 rounded-md font-bold text-xl transition ${
            canAccessEmergencyMode() 
              ? 'bg-potomitan-red text-white hover:bg-red-600' 
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!canAccessEmergencyMode()}
        >
          {canAccessEmergencyMode() ? '🚨 MODE URGENCE' : '🔒 MODE URGENCE (Formation requise)'}
        </button>
        
        {/* Catégories complètes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/phrases/${category.id}`}
              className={`${category.color} p-6 rounded-md text-center font-bold text-white shadow-md hover:shadow-lg transition`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        {/* Traducteur texte */}
        <div className="mb-6">
          <button 
            onClick={() => setShowTranslator(!showTranslator)}
            className={`w-full py-3 px-4 rounded-md font-bold transition ${
              showTranslator 
                ? 'bg-potomitan-medium-blue text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showTranslator ? '📝 Masquer traducteur' : '📝 Ouvrir traducteur'}
          </button>
          
          {showTranslator && (
            <div className="mt-4">
              <TextTranslation />
            </div>
          )}
        </div>
        
        {/* Phrases essentielles normales */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3">Phrases essentielles:</h2>
          <ul className="bg-white rounded-md shadow-md p-4">
            {normalPhrases.map((phrase, index) => (
              <li key={index} className="border-b py-2 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{phrase.french}</p>
                    <p className="text-gray-600 italic">{phrase.creole}</p>
                  </div>
                  <button 
                    onClick={() => playAudio(phrase.audio)} 
                    className="bg-potomitan-light-blue p-2 rounded-full"
                  >
                    <img src={hautParleurIcon} alt="Listen" className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bouton d'urgence normal */}
        <button className="fixed bottom-6 right-6 bg-potomitan-red text-white p-4 rounded-full shadow-lg">
          112
        </button>
      </div>
    </div>
  );
}