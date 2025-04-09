import { useEmergency } from '../context/EmergencyContext';
import { Link } from 'react-router-dom';
import { useState } from 'react'; // Ajout de useState

const categories = [
  { id: 'medical', name: 'Médical', color: 'bg-potomitan-orange' },
  { id: 'evacuation', name: 'Évacuation', color: 'bg-potomitan-yellow' },
  { id: 'secours', name: 'Secours', color: 'bg-potomitan-green' },
  { id: 'information', name: 'Information', color: 'bg-potomitan-light-blue' },
];

export default function HomePage() {
  const { isEmergencyMode, toggleEmergencyMode } = useEmergency();
  const [currentAudio, setCurrentAudio] = useState(null); // Pour gérer l'audio
  // Fonction pour jouer l'audio (identique à celle de PhrasesPage)
  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    // Charger et jouer l'audio réel
    const audio = new Audio(`/audio/${audioFile}`);
    audio.play();
    setCurrentAudio(audio);
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
         {/* Deuxième phrase (nouvelle) */}
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
  {/* Troisième phrase (nouvelle) */}
  <li className="border-b py-2">
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">Les secours arrivent</p>
        <p className="text-gray-600 italic">Sékou ka rivé</p>
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
        <button className="fixed bottom-6 right-6 bg-potomitan-red text-white p-4 rounded-full shadow-lg">
          112
        </button>
      </div>
    </div>
  );
}