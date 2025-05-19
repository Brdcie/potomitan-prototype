// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d’informations.

// src/components/ReponseCreole.js
import React from 'react';

const reponses = [
  {
    creole: "An ni mal an kè an mwen",
    francais: "J'ai mal à la poitrine",
    audio: "reponses/Poitrine.mp3"
  },
  {
    creole: "An pé pa respiwé byen",
    francais: "Je ne peux pas bien respirer",
    audio: "reponses/Pasrespirer.mp3"
  },
  {
    creole: "An tonbé épi an blesé pyé an mwen",
    francais: "Je suis tombé et je me suis blessé au pied",
    audio: "reponses/pied.mp3"
  },
  {
    creole: "Wi, an pé konprann",
    francais: "Oui, je comprends",
    audio: "reponses/comprend.mp3"
  },
  {
    creole: "Non, an pa ka sonjé",
    francais: "Non, je ne m'en souviens pas",
    audio: "reponses/Souviens.mp3"
  }
];

function ReponseCreole({ onSelect }) {
  return (
    <div className="reponses-container">
      <div className="reponses-header">
        <h3 className="font-bold text-potomitan-dark-blue">Simulation des réponses patient</h3>
        <small className="text-gray-600">Cliquez sur une réponse pour simuler la communication bidirectionnelle</small>
      </div>
      <div className="reponses-list flex flex-wrap gap-2 mt-3">
        {reponses.map((reponse, index) => (
          <div 
            key={index} 
            className="reponse-item bg-potomitan-light-blue p-2 rounded-md cursor-pointer hover:bg-potomitan-medium-blue hover:text-white transition"
            onClick={() => onSelect(reponse)}
          >
            <p className="italic">{reponse.creole}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReponseCreole;
