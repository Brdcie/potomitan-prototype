// scripts/extract-phrases.js
const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage extraction POTOMITAN...');
console.log('📍 Dossier actuel:', process.cwd());

// Lire phrasesData.js comme texte et extraire les données
try {
  const phrasesFilePath = path.join(__dirname, '../src/data/phrasesData.js');
  const fileContent = fs.readFileSync(phrasesFilePath, 'utf8');
  console.log('✅ phrasesData.js trouvé et lu');
  
  // Extraire l'objet phrasesData avec une regex
  const match = fileContent.match(/export const phrasesData = ({[\s\S]*?});?\s*$/);
  if (!match) {
    throw new Error('Impossible de trouver phrasesData dans le fichier');
  }
  
  // Évaluer l'objet JavaScript (sécurisé car c'est notre propre fichier)
  const phrasesDataString = match[1];
  const phrasesData = eval(`(${phrasesDataString})`);
  
  console.log('✅ Données phrasesData extraites et parsées');
  
  // Vérifier le contenu
  const categories = Object.keys(phrasesData);
  console.log('📁 Catégories trouvées:', categories);
  
  // Convertir en format API uniforme
  const allPhrases = [];
  let totalCount = 0;

  categories.forEach(category => {
    const categoryPhrases = phrasesData[category];
    console.log(`📁 Catégorie ${category}: ${categoryPhrases.length} phrases`);
    
    categoryPhrases.forEach(phrase => {
      // Vérifier la structure de phrase
      if (!phrase.id || !phrase.french || !phrase.creole) {
        console.warn(`⚠️  Phrase incomplète dans ${category}:`, phrase);
        return;
      }
      
      allPhrases.push({
        id: phrase.id,
        french: phrase.french,
        creole: phrase.creole,
        audio: phrase.audio || null,
        urgency: phrase.urgency || 'medium',
        category: category,
        source: 'static_data'
      });
      totalCount++;
    });
  });

  // Traiter également ReponseCreole.js si il existe
  try {
    const reponseFilePath = path.join(__dirname, '../src/components/ReponseCreole.js');
    const reponseContent = fs.readFileSync(reponseFilePath, 'utf8');
    
    // Extraire le tableau reponses
    const reponseMatch = reponseContent.match(/const reponses = (\[[\s\S]*?\]);/);
    if (reponseMatch) {
      const reponsesArray = eval(reponseMatch[1]);
      console.log(`✅ ${reponsesArray.length} réponses créoles trouvées`);
      
      reponsesArray.forEach((reponse, index) => {
        allPhrases.push({
          id: `reponse_${index + 1}`,
          french: reponse.francais,
          creole: reponse.creole,
          audio: reponse.audio || null,
          urgency: 'medium',
          category: 'reponses_patients',
          source: 'demo_responses'
        });
        totalCount++;
      });
    }
  } catch (reponseError) {
    console.log('ℹ️  ReponseCreole.js non trouvé ou non parsé, on continue...');
  }

  // Statistiques
  const stats = {
    total: allPhrases.length,
    by_category: {},
    by_urgency: {},
    with_audio: allPhrases.filter(p => p.audio).length,
    without_audio: allPhrases.filter(p => !p.audio).length
  };

  allPhrases.forEach(phrase => {
    stats.by_category[phrase.category] = (stats.by_category[phrase.category] || 0) + 1;
    stats.by_urgency[phrase.urgency] = (stats.by_urgency[phrase.urgency] || 0) + 1;
  });

  // Sauvegarder les données
  const outputFile = path.join(__dirname, 'phrases_extracted.json');
  fs.writeFileSync(
    outputFile, 
    JSON.stringify(allPhrases, null, 2),
    'utf8'
  );

  // Sauvegarder les statistiques
  const statsFile = path.join(__dirname, 'extraction_stats.json');
  fs.writeFileSync(
    statsFile, 
    JSON.stringify(stats, null, 2),
    'utf8'
  );

  // Créer un échantillon pour vérification
  const sampleFile = path.join(__dirname, 'sample_phrases.json');
  fs.writeFileSync(
    sampleFile,
    JSON.stringify(allPhrases.slice(0, 5), null, 2),
    'utf8'
  );

  // Rapport final
  console.log('\n🎉 Extraction terminée !');
  console.log('📊 Statistiques:');
  console.log(`   Total: ${stats.total} phrases`);
  console.log(`   Avec audio: ${stats.with_audio}`);
  console.log(`   Sans audio: ${stats.without_audio}`);
  console.log('\n📁 Par catégorie:');
  Object.entries(stats.by_category).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} phrases`);
  });
  console.log('\n⚡ Par urgence:');
  Object.entries(stats.by_urgency).forEach(([urgency, count]) => {
    console.log(`   ${urgency}: ${count} phrases`);
  });
  console.log(`\n💾 Fichiers créés:`);
  console.log(`   ${outputFile}`);
  console.log(`   ${statsFile}`);
  console.log(`   ${sampleFile} (échantillon)`);

} catch (error) {
  console.error('❌ Erreur lors de l\'extraction:');
  console.error('Message:', error.message);
  console.error('Stack:', error.stack);
  
  // Debug : vérifier la structure
  console.log('\n🔍 Debug - Vérification des fichiers:');
  try {
    const phrasesPath = '../src/data/phrasesData.js';
    if (fs.existsSync(path.join(__dirname, phrasesPath))) {
      console.log('✅ phrasesData.js existe');
      
      // Lire les premières lignes pour debug
      const content = fs.readFileSync(path.join(__dirname, phrasesPath), 'utf8');
      const firstLines = content.split('\n').slice(0, 5).join('\n');
      console.log('📄 Premières lignes du fichier:');
      console.log(firstLines);
    } else {
      console.log('❌ phrasesData.js non trouvé');
    }
  } catch (debugError) {
    console.error('Erreur debug:', debugError.message);
  }
}