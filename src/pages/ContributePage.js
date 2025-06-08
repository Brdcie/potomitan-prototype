
// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d’informations.
import { useState } from 'react';

export default function ContributePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [form, setForm] = useState({
    frenchPhrase: '',
    creoleTranslation: '',
    category: 'medical',
    urgencyLevel: 'medium'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newId = `custom_${Date.now()}`;
    const newPhrase = {
      id: newId,
      french: form.frenchPhrase,
      creole: form.creoleTranslation,
      category: form.category,
      audio: null,
      urgency: form.urgencyLevel
    };
    
    const customPhrases = JSON.parse(localStorage.getItem('customPhrases') || '[]');
    customPhrases.push(newPhrase);
    localStorage.setItem('customPhrases', JSON.stringify(customPhrases));
    
    console.log('Contribution submitted:', newPhrase);
    alert('Merci pour votre contribution ! Votre phrase sera validée par nos experts.');
    
    setForm({
      frenchPhrase: '',
      creoleTranslation: '',
      category: 'medical',
      urgencyLevel: 'medium'
    });
  };

  // Fonction pour ouvrir le pipeline d'annotation dans un nouvel onglet
  const openAnnotationPipeline = () => {
    window.open('https://potomitan-qixr.onrender.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-potomitan-beige">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Contribuer au projet POTOMITAN</h1>
        
        {/* Navigation entre les sections */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Proposer une traduction */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-potomitan-green p-3 rounded-full mr-4">
                  <span className="text-white text-xl">✏️</span>
                </div>
                <h2 className="text-xl font-bold">Proposer une traduction</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Ajoutez de nouvelles phrases françaises et leurs traductions en créole guadeloupéen.
              </p>
              <button 
                onClick={() => setActiveSection('translate')}
                className="w-full bg-potomitan-green text-white py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Commencer
              </button>
            </div>

            {/* Card 2: Valider des transcriptions */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-potomitan-orange p-3 rounded-full mr-4">
                  <span className="text-white text-xl">🎧</span>
                </div>
                <h2 className="text-xl font-bold">Valider des transcriptions</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Aidez-nous à corriger et valider les transcriptions automatiques de l'audio créole.
              </p>
              <button 
                onClick={openAnnotationPipeline}
                className="w-full bg-potomitan-orange text-white py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center"
              >
                <span className="mr-2">Ouvrir l'outil</span>
                <span className="text-sm">↗️</span>
              </button>
            </div>

            {/* Card 3: Enregistrer de l'audio */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-potomitan-medium-blue p-3 rounded-full mr-4">
                  <span className="text-white text-xl">🎤</span>
                </div>
                <h2 className="text-xl font-bold">Enregistrer de l'audio</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Enregistrez la prononciation de phrases en créole pour enrichir notre base audio.
              </p>
              <button 
                onClick={() => setActiveSection('audio')}
                className="w-full bg-potomitan-medium-blue text-white py-2 rounded-md hover:bg-opacity-90 transition"
                disabled={true}
              >
                Bientôt disponible
              </button>
            </div>

          </div>
        )}

        {/* Section Traduction */}
        {activeSection === 'translate' && (
          <div className="bg-white rounded-md shadow-md p-6">
            <div className="flex items-center mb-4">
              <button 
                onClick={() => setActiveSection('overview')}
                className="mr-4 text-potomitan-medium-blue hover:text-potomitan-dark-blue"
              >
                ← Retour
              </button>
              <h2 className="text-xl font-bold">Proposer une nouvelle traduction</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Phrase en français</label>
                <input
                  type="text"
                  name="frenchPhrase"
                  value={form.frenchPhrase}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-potomitan-medium-blue"
                  placeholder="Ex: Où avez-vous mal ?"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Traduction en créole</label>
                <input
                  type="text"
                  name="creoleTranslation"
                  value={form.creoleTranslation}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-potomitan-medium-blue"
                  placeholder="Ex: Ki koté ou ni mal ?"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Catégorie</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-potomitan-medium-blue"
                >
                  <option value="medical">Médical</option>
                  <option value="evacuation">Évacuation</option>
                  <option value="secours">Secours</option>
                  <option value="information">Information</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Niveau d'urgence</label>
                <select
                  name="urgencyLevel"
                  value={form.urgencyLevel}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-potomitan-medium-blue"
                >
                  <option value="critical">Critique (Rouge)</option>
                  <option value="high">Important (Orange)</option>
                  <option value="medium">Standard (Jaune)</option>
                  <option value="low">Utile (Vert)</option>
                </select>
              </div>
              
              <div className="flex justify-between">
                <button 
                  type="button"
                  className="bg-potomitan-dark-blue text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
                  disabled={true}
                >
                  Ajouter un enregistrement audio
                </button>
                
                <button 
                  type="submit"
                  className="bg-potomitan-green text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Section Audio (placeholder pour plus tard) */}
        {activeSection === 'audio' && (
          <div className="bg-white rounded-md shadow-md p-6">
            <div className="flex items-center mb-4">
              <button 
                onClick={() => setActiveSection('overview')}
                className="mr-4 text-potomitan-medium-blue hover:text-potomitan-dark-blue"
              >
                ← Retour
              </button>
              <h2 className="text-xl font-bold">Enregistrement audio</h2>
            </div>
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-xl mb-2">Fonctionnalité en développement</h3>
              <p className="text-gray-600">
                Cette fonctionnalité sera bientôt disponible pour vous permettre d'enregistrer 
                la prononciation des phrases en créole.
              </p>
            </div>
          </div>
        )}

        {/* Informations sur les contributions */}
        <div className="mt-8 bg-white rounded-md shadow-md p-6">
          <h3 className="text-lg font-bold mb-3">Pourquoi contribuer ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🌍</div>
              <h4 className="font-medium mb-1">Préserver la langue</h4>
              <p className="text-sm text-gray-600">Aidez à documenter et préserver le créole guadeloupéen</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🚑</div>
              <h4 className="font-medium mb-1">Sauver des vies</h4>
              <p className="text-sm text-gray-600">Facilitez la communication en situation d'urgence</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-medium mb-1">Communauté</h4>
              <p className="text-sm text-gray-600">Rejoignez une communauté engagée pour l'innovation sociale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}