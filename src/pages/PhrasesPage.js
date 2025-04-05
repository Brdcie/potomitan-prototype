import { useParams } from 'react-router-dom';
import { useEmergency } from '../context/EmergencyContext';
import { useState } from 'react';

// Exemple de phrases médicales
const medicalPhrases = [
  { id: 1, french: "Où avez-vous mal ?", creole: "Ki koté ou ni mal ?", audio: "ou_mal.mp3", urgency: "critical" },
  { id: 2, french: "Respirez profondément", creole: "Pran van fò", audio: "respire.mp3", urgency: "high" },
  { id: 3, french: "Prenez ce médicament", creole: "Pran rimèd-la", audio: "medicament.mp3", urgency: "medium" },
  { id: 4, french: "Restez calme", creole: "Rété kalm", audio: "calme.mp3", urgency: "low" },
];

export default function PhrasesPage() {
  const { category } = useParams();
  const { isEmergencyMode } = useEmergency();
  const [currentAudio, setCurrentAudio] = useState(null);
  
  // Fonction pour jouer l'audio
  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    
    // En situation réelle, vous chargeriez vos fichiers audio ici
    // Pour ce prototype, on simule juste l'action
    console.log(`Playing audio: ${audioFile}`);
    setCurrentAudio({ pause: () => console.log('Audio paused') });
  };
  
  // Déterminer la couleur en fonction de l'urgence
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-potomitan-red';
      case 'high': return 'bg-potomitan-orange';
      case 'medium': return 'bg-potomitan-yellow';
      case 'low': return 'bg-potomitan-green';
      default: return 'bg-gray-200';
    }
  };
  
  return (
    <div className={`min-h-screen ${isEmergencyMode ? 'bg-potomitan-red bg-opacity-10' : 'bg-potomitan-beige'}`}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 capitalize">{category || 'Toutes les phrases'}</h1>
        
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          {medicalPhrases.map(phrase => (
            <div 
              key={phrase.id} 
              className={`border-b p-4 ${isEmergencyMode && phrase.urgency === 'critical' ? 'bg-potomitan-red bg-opacity-10' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg">{phrase.french}</p>
                  <p className="italic text-gray-700">{phrase.creole}</p>
                  <div className="flex mt-2">
                    <span className={`${getUrgencyColor(phrase.urgency)} text-xs text-white px-2 py-1 rounded-full`}>
                      {phrase.urgency}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => playAudio(phrase.audio)}
                  className="bg-potomitan-medium-blue p-3 rounded-full text-white"
                >
                  ▶️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}