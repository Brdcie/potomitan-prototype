// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d’informations.
import { useState } from 'react';

export default function ContributePage() {
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
    
    // Créer un nouvel ID unique pour la phrase
    const newId = `custom_${Date.now()}`;
    
    // Créer l'objet de nouvelle phrase
    const newPhrase = {
      id: newId,
      french: form.frenchPhrase,
      creole: form.creoleTranslation,
      category: form.category, // Important d'ajouter la catégorie
      audio: null, // Pas d'audio pour l'instant
      urgency: form.urgencyLevel
    };
    
    // Stocker dans localStorage pour persister entre les sessions
    const customPhrases = JSON.parse(localStorage.getItem('customPhrases') || '[]');
    customPhrases.push(newPhrase);
    localStorage.setItem('customPhrases', JSON.stringify(customPhrases)); // Correction ici
    
    console.log('Contribution submitted:', newPhrase);
    alert('Merci pour votre contribution ! Votre phrase sera validée par nos experts.');
    
    // Réinitialiser le formulaire
    setForm({
      frenchPhrase: '',
      creoleTranslation: '',
      category: 'medical',
      urgencyLevel: 'medium'
    });
  };

  return (
    <div className="min-h-screen bg-potomitan-beige">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Contribuer</h1>
        
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Proposer une nouvelle traduction</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Phrase en français</label>
              <input
                type="text"
                name="frenchPhrase"
                value={form.frenchPhrase}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
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
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Catégorie</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
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
                className="w-full p-2 border rounded-md"
              >
                <option value="critical">Critique (Rouge)</option>
                <option value="high">Important (Orange)</option>
                <option value="medium">Standard (Jaune)</option>
                <option value="low">Utile (Vert)</option>
              </select>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                type="button"
                className="bg-potomitan-dark-blue text-white px-6 py-2 rounded-md"
              >
                Ajouter un enregistrement audio
              </button>
              
              <button 
                type="submit"
                className="bg-potomitan-green text-white px-6 py-2 rounded-md"
              >
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}