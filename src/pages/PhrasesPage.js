// PhrasesPage.js - Version nettoyée
// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d'informations.
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { phrasesData } from '../data/phrasesData';
import hautParleurIcon from '../assets/haut-parleur.png';

export default function PhrasesPage() {
  const { category } = useParams();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [phrases, setPhrases] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  
  // Fonction pour filtrer les phrases par catégorie, incluant les phrases personnalisées
  useEffect(() => {
    const customPhrases = JSON.parse(localStorage.getItem('customPhrases') || '[]');
    
    if (category && phrasesData[category]) {
      const predefinedPhrases = phrasesData[category];
      const categoryCustomPhrases = customPhrases.filter(p => p.category === category);
      setPhrases([...categoryCustomPhrases, ...predefinedPhrases]);
    } else if (!category) {
      const allPredefinedPhrases = Object.values(phrasesData).flat();
      setPhrases([...customPhrases, ...allPredefinedPhrases]);
    } else {
      navigate('/phrases');
    }
  }, [category, navigate]);
  
  // Fonction pour jouer l'audio
  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    
    if (!audioFile) {
      alert("Enregistrement audio en attente");
      return;
    }
    
    const audio = new Audio(`/audio/${audioFile}`);
    audio.play();
    setCurrentAudio(audio);
  };
  
  // Filtrer les phrases par niveau d'urgence
  const filteredPhrases = filter === 'all' 
    ? phrases 
    : phrases.filter(phrase => phrase.urgency === filter);
  
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
  
  // Traduire les niveaux d'urgence en français
  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'critical': return 'Critique';
      case 'high': return 'Important';
      case 'medium': return 'Standard';
      case 'low': return 'Utile';
      default: return urgency;
    }
  };
  
  // Vérifier si une phrase est personnalisée
  const isCustomPhrase = (id) => {
    return id.startsWith('custom_');
  };
  
  return (
    <div className="min-h-screen bg-potomitan-beige">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 capitalize">
          {category ? (category === 'medical' ? 'Médical' : 
                     category === 'evacuation' ? 'Évacuation' : 
                     category === 'secours' ? 'Secours' : 
                     category === 'information' ? 'Information' : 
                     category) : 'Toutes les phrases'}
        </h1>
        
        {/* Filtres par niveau d'urgence */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${filter === 'all' ? 'bg-potomitan-dark-blue text-white' : 'bg-gray-200'}`}
          >
            Tous
          </button>
          <button 
            onClick={() => setFilter('critical')} 
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${filter === 'critical' ? 'bg-potomitan-red text-white' : 'bg-potomitan-red bg-opacity-25 text-potomitan-red'}`}
          >
            Critique
          </button>
          <button 
            onClick={() => setFilter('high')} 
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${filter === 'high' ? 'bg-potomitan-orange text-white' : 'bg-potomitan-orange bg-opacity-25 text-potomitan-orange'}`}
          >
            Important
          </button>
          <button 
            onClick={() => setFilter('medium')} 
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${filter === 'medium' ? 'bg-potomitan-yellow text-white' : 'bg-potomitan-yellow bg-opacity-25 text-potomitan-yellow'}`}
          >
            Standard
          </button>
          <button 
            onClick={() => setFilter('low')} 
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${filter === 'low' ? 'bg-potomitan-green text-white' : 'bg-potomitan-green bg-opacity-25 text-potomitan-green'}`}
          >
            Utile
          </button>
        </div>
        
        {/* Liste des phrases */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          {filteredPhrases.length > 0 ? (
            filteredPhrases.map(phrase => (
              <div 
                key={phrase.id} 
                className={`border-b p-4 ${phrase.urgency === 'critical' ? 'border-l-4 border-red-500 bg-red-50' : ''} ${isCustomPhrase(phrase.id) ? 'border-l-4 border-potomitan-green relative' : ''}`}
              >
                {isCustomPhrase(phrase.id) && (
                  <span className="absolute top-2 right-2 bg-potomitan-yellow text-white text-xs px-2 py-1 rounded-full">
                    En attente de validation
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-lg">{phrase.french}</p>
                    <p className="italic text-gray-700">{phrase.creole}</p>
                    <div className="flex mt-2">
                      <span className={`${getUrgencyColor(phrase.urgency)} text-xs text-white px-2 py-1 rounded-full`}>
                        {getUrgencyLabel(phrase.urgency)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => playAudio(phrase.audio)}
                    className="bg-potomitan-medium-blue p-3 rounded-full text-white hover:bg-potomitan-dark-blue transition ml-4"
                  >
                    <img src={hautParleurIcon} alt="Listen" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Aucune phrase trouvée pour cette catégorie ou ce filtre.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}