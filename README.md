
# POTOMITAN - Prototype d'Interface

Interface utilisateur intuitive pour l'application de traduction français-créole guadeloupéen, spécialement conçue pour les situations d'urgence en Guadeloupe.

## 📱 Vue d'ensemble

POTOMITAN est une application mobile qui permet aux services d'urgence et à la population créolophone de Guadeloupe de communiquer efficacement lors de situations critiques. Cette interface offre des traductions contextuelles, accompagnées de leur prononciation audio, et propose une fonctionnalité de contribution communautaire.

## 🌟 Caractéristiques principales

- **Mode Urgence** - Interface optimisée pour situations critiques avec code couleur intuitif
- **Catégories spécialisées** - Médical, Évacuation, Secours, Information
- **Lecture audio** - Prononciation authentique des phrases créoles
- **Plateforme contributive** - Ajout et validation de nouvelles traductions par la communauté
- **Utilisable hors-ligne** - Fonctionne sans connexion internet en situation de crise

## 🛠️ Technologies utilisées

- React.js
- Tailwind CSS
- HTML5 Web Audio API
- LocalStorage pour fonctionnalités hors-ligne

## 🚀 Installation et démarrage

Pour installer et lancer le prototype localement:

```bash
# Cloner le dépôt
git clone https://github.com/ton-nom-utilisateur/potomitan-prototype.git

# Accéder au répertoire
cd potomitan-prototype

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

## 📊 Structure du projet

- `/src/components` - Composants réutilisables
- `/src/pages` - Pages principales de l'application
- `/src/context` - Contextes React (mode urgence, audio)
- `/src/hooks` - Hooks personnalisés
- `/src/assets` - Ressources statiques (audio, images)
- `/public/audio` - Fichiers audio de prononciation

## 🔄 Flux d'utilisation clés

1. **Mode Normal** - Navigation intuitive par catégories
2. **Mode Urgence** - Accès rapide aux phrases critiques avec priorisation intelligente
3. **Contribution** - Interface de proposition et enregistrement de nouvelles traductions

## 🌐 Projets associés

- [Creoles Translation](https://github.com/Brdcie/creoles-translation) - Système de règles de transformation et corpus de traduction qui alimente cette interface
- [Creole Crowdsourcing](https://github.com/Brdcie/creole-crowdsourcing) - Plateforme de validation collaborative des traductions

## 🤝 Contribution

Les contributions sont bienvenues! Nous recherchons particulièrement des améliorations sur:
- Interface utilisateur responsive
- Performances audio sur appareils mobiles
- Tests utilisateurs
- Accessibilité

## 📜 LicenceS
## Licences
## 📜 Licences

- Le **code source** de ce dépôt est distribué sous licence [Mozilla Public License 2.0 (MPL-2.0)](LICENSE.txt).
- Les **fichiers médias** (images : PNG, SVG / audio : MP3) sont des créations originales protégées par le droit d’auteur.  
  Ils **ne sont pas couverts** par la MPL-2.0. Voir [`MEDIA_LICENCE.md`](MEDIA_LICENCE.md) pour les conditions d’utilisation.
- Le nom **"POTOMITAN"**, le logo, l’interface utilisateur et les éléments de marque sont protégés indépendamment par le droit des marques et le droit d’auteur.

© 2025 POTOMITAN. Tous droits réservés.

## 📞 Contact

Pour toute question concernant l'interface utilisateur, contactez brigitte.democrite@brdcie.com