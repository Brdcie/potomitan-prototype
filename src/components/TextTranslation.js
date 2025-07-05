// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d’informations.
import { useState } from 'react';

export default function TextTranslation() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [direction, setDirection] = useState('fr-to-creole');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Veuillez entrer du texte à traduire');
      return;
    }

    setIsTranslating(true);
    setError('');
    console.log('🔄 Début traduction:', inputText.trim(), 'Direction:', direction);

    try {
      const response = await fetch('https://potomitan-translation-api-production.up.railway.app/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText.trim(),
          direction: direction
        })
      });

      console.log('📡 Réponse HTTP:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('❌ Détail erreur:', errorData);
        
        if (response.status === 404 || (errorData.success === false && errorData.error)) {
          throw new Error(`${errorData.error || 'Phrase non trouvée'}. ${errorData.suggestion || 'Essayez une autre phrase.'}`);
        } else {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('✅ Données reçues:', data);
      
      // Gestion améliorée de la réponse selon la direction
      if (data.success) {
        if (direction === 'fr-to-creole') {
          setTranslation(data.creole || 'Traduction créole non disponible');
        } else {
          setTranslation(data.french || 'Traduction française non disponible');
        }
      } else {
        throw new Error(data.error || 'Traduction échouée');
      }

    } catch (err) {
      console.error('❌ Erreur traduction:', err);
      setError(err.message);
      setTranslation('');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslation('');
    setError('');
  };

  // Phrases de test pour chaque direction
  const getTestPhrases = () => {
    if (direction === 'fr-to-creole') {
      return ['Où avez-vous mal ?', 'Restez calme', 'Les secours arrivent'];
    } else {
      return ['Ki koté ou ni mal ?', 'Rété kalm', 'Sékou-la ka rivé'];
    }
  };

  const handleTestPhrase = (phrase) => {
    setInputText(phrase);
    setError('');
  };

  return (
    <div className="text-translation bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">🔄 Traducteur temps réel</h2>
      
      {/* Sélecteur de direction */}
      <div className="direction-selector mb-4">
        <div className="flex rounded-md overflow-hidden border">
          <button
            onClick={() => {
              setDirection('fr-to-creole');
              setInputText('');
              setTranslation('');
              setError('');
            }}
            className={`flex-1 py-2 px-4 font-medium ${
              direction === 'fr-to-creole' 
                ? 'bg-potomitan-medium-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Français → Créole
          </button>
          <button
            onClick={() => {
              setDirection('creole-to-fr');
              setInputText('');
              setTranslation('');
              setError('');
            }}
            className={`flex-1 py-2 px-4 font-medium ${
              direction === 'creole-to-fr' 
                ? 'bg-potomitan-medium-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Créole → Français
          </button>
        </div>
      </div>

      {/* Phrases de test */}
      <div className="test-phrases mb-4 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
        <p className="text-sm text-yellow-800 mb-2">
          💡 <strong>Phrases testées (cliquez pour utiliser) :</strong>
        </p>
        <div className="flex flex-wrap gap-2">
          {getTestPhrases().map((phrase, index) => (
            <button
              key={index}
              onClick={() => handleTestPhrase(phrase)}
              className="text-xs bg-yellow-100 hover:bg-yellow-200 px-2 py-1 rounded border transition-colors"
            >
              {phrase}
            </button>
          ))}
        </div>
        <p className="text-xs text-yellow-600 mt-2">
          ⚠️ La traduction dépend des phrases exactes dans la base de données (65 phrases)
        </p>
      </div>

      {/* Zone de saisie */}
      <div className="input-section mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={direction === 'fr-to-creole' 
            ? "Tapez votre texte en français..." 
            : "Tapez votre texte en créole..."
          }
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-potomitan-medium-blue focus:border-transparent"
          rows={3}
          disabled={isTranslating}
        />
      </div>

      {/* Boutons d'action */}
      <div className="actions mb-4 flex gap-2">
        <button
          onClick={handleTranslate}
          disabled={!inputText.trim() || isTranslating}
          className="bg-potomitan-medium-blue text-white px-6 py-2 rounded-md font-medium hover:bg-potomitan-dark-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTranslating ? '⏳ Traduction...' : '🔄 Traduire'}
        </button>
        
        <button
          onClick={handleClear}
          disabled={!inputText && !translation}
          className="bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🗑️ Effacer
        </button>
      </div>

      {/* Affichage des erreurs */}
      {error && (
        <div className="error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          ❌ {error}
          {error.includes('Phrase non trouvée') && (
            <div className="mt-2 text-sm">
              💡 <strong>Conseil :</strong> Utilisez les phrases de test ci-dessus ou consultez la liste complète des phrases dans l'onglet "Phrases".
            </div>
          )}
        </div>
      )}

      {/* Résultat de la traduction */}
      {translation && !error && (
        <div className="translation-result bg-potomitan-beige bg-opacity-50 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {direction === 'fr-to-creole' ? 'Traduction en créole :' : 'Traduction en français :'}
          </label>
          <p className={`text-lg ${direction === 'fr-to-creole' ? 'italic' : ''} text-potomitan-medium-blue font-medium`}>
            {translation}
          </p>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(translation);
              alert('Traduction copiée !');
            }}
            className="mt-2 text-sm bg-potomitan-green text-white px-3 py-1 rounded-md hover:bg-opacity-90"
          >
            📋 Copier
          </button>
        </div>
      )}

      {/* Debug info (à retirer en production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Debug:</strong> Direction: {direction}, Input: "{inputText}", API Response structure attendue: success + {direction === 'fr-to-creole' ? 'creole' : 'french'}
        </div>
      )}
    </div>
  );
}