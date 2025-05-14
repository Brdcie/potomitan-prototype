import { useEmergency } from '../context/EmergencyContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ReponseCreole from '../components/ReponseCreole'; // Importez le nouveau composant

const categories = [
  { id: 'medical', name: 'Médical', color: 'bg-potomitan-orange' },
  { id: 'evacuation', name: 'Évacuation', color: 'bg-potomitan-yellow' },
  { id: 'secours', name: 'Secours', color: 'bg-potomitan-green' },
  { id: 'information', name: 'Information', color: 'bg-potomitan-light-blue' },
];

export default function HomePage() {
  const { isEmergencyMode, toggleEmergencyMode } = useEmergency();
  const [currentAudio, setCurrentAudio] = useState(null);
  // Nouvel état pour la réponse sélectionnée
  const [selectedResponse, setSelectedResponse] = useState(null);
  
  // Fonction pour jouer l'audio
  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    // Charger et jouer l'audio réel
    const audio = new Audio(`/audio/${audioFile}`);
    audio.play().catch(err => console.log('Erreur audio:', err));
    setCurrentAudio(audio);
  };
  
  // Gestion de la sélection de réponse
  const handleResponseSelection = (reponse) => {
    setSelectedResponse(reponse);
    // Jouer l'audio si disponible
    if (reponse.audio) {
      playAudio(reponse.audio);
    }
  };
  
  // Fonction pour afficher/masquer le panneau de réponses
  const toggleResponsePanel = () => {
    const panel = document.getElementById('reponses-demo');
    if (panel) {
      panel.classList.toggle('visible');
    }
  };
  
  return (
    <div className={`min-h-screen ${isEmergencyMode ? 'bg-potomitan-red bg-opacity-10' : 'bg-potomitan-beige'}`}>
      <div className="container mx-auto p-4">
        {isEmergencyMode && (
          <div className="bg-potomitan-red text-white p-3 rounded-md mb-4 flex justify-between items-center">
            <span className="font-bold">URGENCE IMMÉDIATE</span>
            <button 
              onClick={toggleEmergencyMode}
              className="bg-white text-potomitan-red px-4 py-2 rounded-md font-bold"
            >
              EXIT
            </button>
          </div>
        )}
        
        {!isEmergencyMode && (
          <button 
            onClick={toggleEmergencyMode}
            className="w-full bg-potomitan-red text-white py-4 mb-6 rounded-md font-bold text-xl"
          >
            MODE URGENCE
          </button>
        )}
        
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
        
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3">Phrases essentielles:</h2>
          <ul className="bg-white rounded-md shadow-md p-4">
            <li className="border-b py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Où avez-vous mal ?</p>
                  <p className="text-gray-600 italic">Ki koté ou ni mal ?</p>
                </div>
                <button 
                  onClick={() => playAudio('ou_mal.mp3')} 
                  className="bg-potomitan-light-blue p-2 rounded-full"
                >
                  ▶️
                </button>
              </div>
            </li>
            <li className="border-b py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Restez calme</p>
                  <p className="text-gray-600 italic">Rété kalm</p>
                </div>
                <button 
                  onClick={() => playAudio('calme.mp3')} 
                  className="bg-potomitan-light-blue p-2 rounded-full"
                >
                  ▶️
                </button>
              </div>
            </li>
            <li className="border-b py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Les secours arrivent</p>
                  <p className="text-gray-600 italic">Sékou-la ka rivé</p>
                </div>
                <button 
                  onClick={() => playAudio('secours_arrivent.mp3')} 
                  className="bg-potomitan-light-blue p-2 rounded-full"
                >
                  ▶️
                </button>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Affichage de la traduction bidirectionnelle si une réponse est sélectionnée */}
        {selectedResponse && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-md border-l-4 border-potomitan-green">
            <h2 className="text-lg font-bold mb-3">Traduction bidirectionnelle:</h2>
            <div className="flex flex-col gap-2">
              <div className="p-3 bg-potomitan-beige bg-opacity-50 rounded-md">
                <p className="text-sm text-gray-600">Réponse en créole:</p>
                <p className="font-medium italic">{selectedResponse.creole}</p>
              </div>
              <div className="p-3 bg-potomitan-light-blue bg-opacity-30 rounded-md">
                <p className="text-sm text-gray-600">Traduction en français:</p>
                <p className="font-medium">{selectedResponse.francais}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Bouton d'urgence */}
        <button className="fixed bottom-6 right-6 bg-potomitan-red text-white p-4 rounded-full shadow-lg">
          112
        </button>
        
        {/* Bouton pour montrer le panneau de réponses */}
        <button 
          onClick={toggleResponsePanel}
          className="fixed bottom-6 left-6 bg-potomitan-orange text-white px-4 py-2 rounded-md shadow-lg z-10"
        >
          Démo Réponses
        </button>
      </div>
      
      {/* Panneau de réponses (initialement caché) */}
      <div id="reponses-demo" className="reponses-demo fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg transform translate-y-full transition-transform duration-300 ease-in-out z-20">
        <ReponseCreole onSelect={handleResponseSelection} />
      </div>
      
      {/* Styles supplémentaires pour le panneau de réponses */}
      <style jsx>{`
        .reponses-demo.visible {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}