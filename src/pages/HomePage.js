// src/pages/HomePage.js - Version corrigée
// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TextTranslation from '../components/TextTranslation';
import hautParleurIcon from '../assets/haut-parleur.png';

const categories = [
  { id: 'medical', name: 'Médical', color: 'bg-potomitan-red', urgent: true },
  { id: 'evacuation', name: 'Évacuation', color: 'bg-potomitan-orange', urgent: true },
  { id: 'secours', name: 'Secours', color: 'bg-potomitan-yellow', urgent: false },
  { id: 'information', name: 'Information', color: 'bg-potomitan-light-blue', urgent: false },
];

export default function HomePage() {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [showTranslator, setShowTranslator] = useState(false);
  
  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(`/audio/${audioFile}`);
    audio.play().catch(err => console.log('Erreur audio:', err));
    setCurrentAudio(audio);
  };
  
  return (
    <div className="min-h-screen bg-potomitan-beige">
      <div className="container mx-auto p-4">
        
        {/* Traducteur */}
        <div className="mb-6">
          <button 
            onClick={() => setShowTranslator(!showTranslator)}
            className="w-full bg-potomitan-medium-blue text-white py-4 rounded-md font-bold text-xl shadow-lg hover:bg-potomitan-dark-blue transition"
          >
            {showTranslator ? '📚 Fermer traducteur' : '🔄 Traducteur français ↔ créole'}
          </button>
        </div>
        
        {showTranslator && (
          <div className="mb-6">
            <TextTranslation />
          </div>
        )}
        
        {/* Catégories */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/phrases/${category.id}`}
              className={`${category.color} p-6 rounded-md text-center font-bold text-white shadow-md hover:shadow-lg transition ${
                category.urgent ? 'ring-4 ring-red-300 ring-opacity-50' : ''
              }`}
            >
              {category.name}
              {category.urgent && <div className="text-sm mt-1">⚡ URGENT</div>}
            </Link>
          ))}
        </div>
        
        {/* Phrases critiques */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3 text-potomitan-red">🚨 Phrases critiques :</h2>
          <ul className="bg-white rounded-md shadow-md">
            <li className="border-b p-4 border-l-4 border-red-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">Où avez-vous mal ?</p>
                  <p className="text-gray-600 italic">Ki koté ou ni mal ?</p>
                </div>
                <button 
                  onClick={() => playAudio('ou_mal.mp3')} 
                  className="bg-potomitan-red p-3 rounded-full text-white shadow-lg hover:bg-opacity-90"
                >
                  <img src={hautParleurIcon} alt="Listen" className="w-4 h-4" />
                </button>
              </div>
            </li>
            <li className="border-b p-4 border-l-4 border-orange-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">Restez calme</p>
                  <p className="text-gray-600 italic">Rété kalm</p>
                </div>
                <button 
                  onClick={() => playAudio('calme.mp3')} 
                  className="bg-potomitan-orange p-3 rounded-full text-white shadow-lg hover:bg-opacity-90"
                >
                  <img src={hautParleurIcon} alt="Listen" className="w-4 h-4" />
                </button>
              </div>
            </li>
            <li className="p-4 border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">Les secours arrivent</p>
                  <p className="text-gray-600 italic">Sékou-la ka rivé</p>
                </div>
                <button 
                  onClick={() => playAudio('secours_arrivent.mp3')} 
                  className="bg-potomitan-green p-3 rounded-full text-white shadow-lg hover:bg-opacity-90"
                >
                  <img src={hautParleurIcon} alt="Listen" className="w-4 h-4" />
                </button>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Section contribution */}
        <div className="mt-8 bg-gradient-to-r from-potomitan-green to-potomitan-light-blue bg-opacity-10 p-6 rounded-lg shadow-md border border-potomitan-green border-opacity-30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-potomitan-green rounded-full flex items-center justify-center text-white text-xl">
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-potomitan-dark-blue">
              🫱🏾‍🫲🏼 🤝🏾 🫱🏾‍🫲🏼Votre créole peut sauver des vies ! 🫱🏾‍🫲🏼 🤝🏾 🫱🏾‍🫲🏼
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Vous parlez créole guadeloupéen ? Votre expertise est précieuse ! 
                Aidez-nous à enrichir POTOMITAN en validant des traductions, 
                ajoutant de nouvelles phrases d'urgence ou enregistrant l'audio authentique.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/contribuer"
                  className="bg-potomitan-green text-white px-6 py-3 rounded-md font-bold text-center hover:bg-opacity-90 transition shadow-md"
                >
                  ✨ Je veux contribuer
                </Link>
                <button 
                  onClick={() => alert('Fonctionnalité en développement')}
                  className="bg-white border-2 border-potomitan-green text-potomitan-green px-6 py-3 rounded-md font-medium hover:bg-potomitan-green hover:text-white transition"
                >
                  📊 Mes contributions
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                💡 Chaque contribution améliore la communication d'urgence en Guadeloupe
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bouton 112 uniquement */}
      <a 
        href="tel:112"
        className="fixed bottom-6 right-6 bg-potomitan-red text-white p-4 rounded-full shadow-lg text-xl font-bold hover:bg-opacity-90 transition animate-pulse z-30"
      >
        📞 112
      </a>
    </div>
  );
}