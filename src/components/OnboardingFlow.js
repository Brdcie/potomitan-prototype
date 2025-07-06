// src/components/OnboardingFlow.js
import { useOnboarding } from '../context/OnboardingContext';
import { useEmergency } from '../context/EmergencyContext';
import { useState, useEffect } from 'react';
import hautParleurIcon from '../assets/haut-parleur.png';

const STEPS_CONFIG = [
  { 
    id: 'welcome', 
    title: 'Bienvenue', 
    duration: 45,
    description: 'Formation express intervention créolophone'
  },
  { 
    id: 'navigation', 
    title: 'Navigation', 
    duration: 45,
    description: 'Accès rapide aux catégories'
  },
  { 
    id: 'audio', 
    title: 'Audio créole', 
    duration: 90,
    description: 'Phrases de politesse essentielles'
  },
  { 
    id: 'translation', 
    title: 'Traduction', 
    duration: 90,
    description: 'Communication bidirectionnelle'
  },
  { 
    id: 'ready', 
    title: 'Prêt !', 
    duration: 40,
    description: 'Mode urgence disponible'
  }
];

export default function OnboardingFlow() {
  const { onboardingState, nextStep, completeOnboarding, skipOnboarding, getProgress } = useOnboarding();
  const { toggleEmergencyMode } = useEmergency();
  const [timeLeft, setTimeLeft] = useState(45); // Durée de la première étape
  const [hasInteracted, setHasInteracted] = useState(false);

  const currentStepConfig = STEPS_CONFIG[onboardingState.currentStep] || STEPS_CONFIG[0];
  const progress = getProgress();

  // Timer pour chaque étape
  useEffect(() => {
    if (timeLeft > 0 && !hasInteracted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !hasInteracted) {
      // Auto-avancer si pas d'interaction
      handleNext();
    }
  }, [timeLeft, hasInteracted]);

  // Reset timer à chaque nouvelle étape avec durée spécifique
  useEffect(() => {
    setTimeLeft(currentStepConfig.duration);
    setHasInteracted(false);
  }, [onboardingState.currentStep, currentStepConfig.duration]);

  const handleNext = () => {
    setHasInteracted(true);
    if (onboardingState.currentStep < 4) {
      nextStep();
    } else {
      completeOnboarding();
    }
  };

  const handleEmergencyBypass = () => {
    if (window.confirm('Êtes-vous en urgence immédiate ? Cela activera le mode urgence directement.')) {        
      completeOnboarding();
      toggleEmergencyMode();
    }
  };

  return (
    <div className="onboarding-flow min-h-screen bg-potomitan-beige flex flex-col">
      {/* Header avec progression */}
      <div className="bg-potomitan-dark-blue text-white p-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">Formation POTOMITAN</h1>
          <button 
            onClick={handleEmergencyBypass}
            className="bg-potomitan-red px-3 py-1 rounded text-sm font-bold"
          >
            🚨 URGENCE
          </button>
        </div>
        
        {/* Barre de progression */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">Étape {progress.current + 1}/5</span>
          <div className="flex-1 bg-potomitan-medium-blue rounded-full h-2">
            <div 
              className="bg-potomitan-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <span className="text-sm">{progress.percentage}%</span>
        </div>
        
        {/* Timer */}
        <div className="flex items-center gap-2 text-sm">
          <span>⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          <span className="text-potomitan-beige">Formation express (5 min total)</span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        {onboardingState.currentStep === 0 && <WelcomeStep onNext={handleNext} />}
        {onboardingState.currentStep === 1 && <NavigationStep onNext={handleNext} />}
        {onboardingState.currentStep === 2 && <AudioStep onNext={handleNext} />}
        {onboardingState.currentStep === 3 && <TranslationStep onNext={handleNext} />}
        {onboardingState.currentStep === 4 && <ReadyStep onNext={handleNext} />}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t flex justify-between items-center">
        <button 
          onClick={skipOnboarding}
          className="text-gray-500 text-sm underline"
        >
          Ignorer la formation
        </button>
        <div className="text-sm text-gray-600">
          {currentStepConfig.description}
        </div>
      </div>
    </div>
  );
}

// ÉTAPE 1 : Bienvenue
function WelcomeStep({ onNext }) {
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="text-6xl mb-4">👋</div>
        <h2 className="text-2xl font-bold text-potomitan-dark-blue mb-2">
          Bienvenue sur POTOMITAN
        </h2>
        <p className="text-gray-600">
          En 4 minutes, vous serez prêt pour votre intervention créolophone
        </p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-sm text-blue-800">
          💡 <strong>Pendant votre trajet</strong> : Découvrez comment communiquer 
          efficacement avec une personne créolophone en situation d'urgence
        </p>
      </div>

      <button 
        onClick={onNext}
        className="bg-potomitan-medium-blue text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-potomitan-dark-blue transition"
      >
        ▶️ Commencer
      </button>
    </div>
  );
}

// ÉTAPE 2 : Navigation
function NavigationStep({ onNext }) {
  const [hasClicked, setHasClicked] = useState(false);

  const handleMedicalClick = () => {
    setHasClicked(true);
    setTimeout(onNext, 1000); // Auto-avancer après 1s
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="text-6xl mb-4">📍</div>
        <h2 className="text-2xl font-bold text-potomitan-dark-blue mb-2">
          Vous allez chez une personne créolophone
        </h2>
        <p className="text-gray-600 mb-4">
          Tapez "MÉDICAL" pour accéder aux outils d'intervention
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={handleMedicalClick}
          className={`p-6 rounded-md font-bold text-white shadow-md transition ${
            hasClicked 
              ? 'bg-green-500 transform scale-105' 
              : 'bg-potomitan-orange hover:shadow-lg animate-pulse'
          }`}
        >
          {hasClicked ? '✅' : '🏥'} MÉDICAL
        </button>
        <div className="bg-gray-200 p-6 rounded-md text-gray-500 font-bold opacity-50">
          🌪️ ÉVACUATION
        </div>
      </div>

      {hasClicked && (
        <div className="bg-green-50 border border-green-200 p-3 rounded-md">
          <p className="text-green-800 font-medium">
            ✅ Parfait ! Voici vos outils médicaux d'urgence
          </p>
        </div>
      )}

      {!hasClicked && (
        <div className="text-sm text-gray-500">
          👆 Tapez le bouton MÉDICAL
        </div>
      )}
    </div>
  );
}

// ÉTAPE 3 : Audio - Phrases de politesse
function AudioStep({ onNext }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [hasPlayedAll, setHasPlayedAll] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playedPhrases, setPlayedPhrases] = useState(new Set());

  // Phrases de politesse essentielles pour l'onboarding
  const politenessPhrases = [
    { french: 'Bonjour', creole: 'Bonjou', audio: 'bonjou.mp3' }, // Utilise audio existant pour demo
    { french: 'Me comprenez-vous ?', creole: 'És ou ka konprann mwen ?', audio: 'comprendre.mp3' },
    { french: 'S\'il vous plaît', creole: 'Souplé', audio: 'sil_vous_plait.mp3' },
    { french: 'Merci', creole: 'Mèsi', audio: 'merci.mp3' }
  ];

  const currentPhrase = politenessPhrases[currentPhraseIndex];

  const playAudio = (phraseIndex = currentPhraseIndex) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    
    const phrase = politenessPhrases[phraseIndex];
    const audio = new Audio(`/audio/${phrase.audio}`);
    audio.play().catch(err => console.log('Audio error:', err));
    setCurrentAudio(audio);
    
    // Marquer cette phrase comme jouée
    const newPlayedPhrases = new Set(playedPhrases);
    newPlayedPhrases.add(phraseIndex);
    setPlayedPhrases(newPlayedPhrases);
    
    // Si toutes les phrases ont été jouées, permettre d'avancer
    if (newPlayedPhrases.size >= 3) { // Au moins 3 phrases sur 4
      setHasPlayedAll(true);
      setTimeout(onNext, 2000); // Auto-avancer après 2s
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎤</div>
        <h2 className="text-2xl font-bold text-potomitan-dark-blue mb-2">
          Phrases de politesse essentielles
        </h2>
        <p className="text-gray-600 mb-4">
          Écoutez ces phrases de base pour établir le contact
        </p>
      </div>

      {/* Navigation entre phrases */}
      <div className="flex justify-center gap-2 mb-4">
        {politenessPhrases.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhraseIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentPhraseIndex 
                ? 'bg-potomitan-medium-blue' 
                : playedPhrases.has(index)
                ? 'bg-green-400'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Phrase actuelle */}
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <div className="flex justify-between items-center">
          <div className="text-left flex-1">
            <p className="font-medium text-lg">{currentPhrase.french}</p>
            <p className="text-gray-600 italic">{currentPhrase.creole}</p>
          </div>
          <button 
            onClick={() => playAudio()}
            className={`p-3 rounded-full transition ml-4 ${
              playedPhrases.has(currentPhraseIndex)
                ? 'bg-green-500 text-white' 
                : 'bg-potomitan-light-blue hover:bg-potomitan-medium-blue animate-bounce'
            }`}
          >
            {playedPhrases.has(currentPhraseIndex) ? '✅' : <img src={hautParleurIcon} alt="Listen" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation phrases */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setCurrentPhraseIndex(Math.max(0, currentPhraseIndex - 1))}
          disabled={currentPhraseIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          ← Précédent
        </button>
        
        <span className="flex items-center text-sm text-gray-600">
          {currentPhraseIndex + 1} / {politenessPhrases.length}
        </span>
        
        <button
          onClick={() => setCurrentPhraseIndex(Math.min(politenessPhrases.length - 1, currentPhraseIndex + 1))}
          disabled={currentPhraseIndex === politenessPhrases.length - 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Suivant →
        </button>
      </div>

      {/* Progress feedback */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
        <p className="text-sm text-blue-800">
          {playedPhrases.size === 0 && "👆 Écoutez au moins 3 phrases pour continuer"}
          {playedPhrases.size > 0 && playedPhrases.size < 3 && `🎵 ${playedPhrases.size}/3 phrases écoutées`}
          {hasPlayedAll && "✅ Excellent ! Ces phrases créent un contact respectueux"}
        </p>
      </div>

      {/* Liste des phrases restantes */}
      {!hasPlayedAll && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Phrases à découvrir :</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {politenessPhrases.map((phrase, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPhraseIndex(index);
                  playAudio(index);
                }}
                className={`text-xs px-3 py-1 rounded-full border transition ${
                  playedPhrases.has(index)
                    ? 'bg-green-100 border-green-400 text-green-800'
                    : 'bg-gray-100 border-gray-300 hover:bg-blue-100'
                }`}
              >
                {phrase.french}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ÉTAPE 4 : Traduction
function TranslationStep({ onNext }) {
  useEffect(() => {
    // Auto-avancer après 4 secondes de démonstration
    const timer = setTimeout(onNext, 4000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-2xl font-bold text-potomitan-dark-blue mb-2">
          Si elle répond en créole
        </h2>
        <p className="text-gray-600 mb-4">
          L'app traduit automatiquement pour vous
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-400">
          <p className="text-sm text-gray-600 mb-1">Réponse en créole:</p>
          <p className="font-medium italic text-lg">"An ni mal an tchè an mwen"</p>
        </div>

        <div className="text-2xl">⬇️</div>

        <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-400 animate-fadeIn">
          <p className="text-sm text-gray-600 mb-1">Traduction automatique:</p>
          <p className="font-medium text-lg text-green-800">"J'ai mal à la poitrine"</p>
        </div>
      </div>

      <div className="mt-6 bg-potomitan-beige bg-opacity-50 p-3 rounded-md">
        <p className="text-sm text-potomitan-dark-blue font-medium">
          ✅ Vous comprendrez toutes ses réponses !
        </p>
      </div>
    </div>
  );
}

// ÉTAPE 5 : Prêt
function ReadyStep({ onNext }) {
  const { toggleEmergencyMode } = useEmergency();

  const handleActivateEmergency = () => {
    onNext(); // Complète l'onboarding
    toggleEmergencyMode(); // Active le mode urgence
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-potomitan-dark-blue mb-2">
          Vous êtes prêt !
        </h2>
        <p className="text-gray-600 mb-4">
          Le mode urgence est maintenant disponible
        </p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleActivateEmergency}
          className="w-full bg-potomitan-red text-white py-4 rounded-md font-bold text-xl hover:bg-red-600 transition shadow-lg"
        >
          🚨 ACTIVER MODE URGENCE
        </button>

        <button 
          onClick={onNext}
          className="w-full bg-gray-400 text-white py-3 rounded-md font-medium hover:bg-gray-500 transition"
        >
          📚 Explorer en mode normal
        </button>
      </div>

      <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-md">
        <p className="text-sm text-green-800">
          <strong>Formation terminée !</strong><br/>
          Vous savez maintenant utiliser POTOMITAN pour communiquer 
          efficacement avec une personne créolophone.
        </p>
      </div>
    </div>
  );
}