# CoproGest — Système de Gestion de Copropriété

## 📋 Description

CoproGest est une application web complète de gestion de copropriété développée dans le cadre du cours de Génie Logiciel (L3 Semestre 2). Elle centralise la gestion administrative et financière d'un immeuble en copropriété.

## 🌐 Site en ligne

**URL :** https://coprogest-effcb.web.app

## 🛠️ Stack Technique

- **Frontend :** HTML5, CSS3, JavaScript (Vanilla)
- **Backend / Base de données :** Firebase (Firestore, Authentication, Hosting)
- **Hébergement :** Firebase Hosting

## 👥 Profils utilisateurs

| Profil | Accès |
|---|---|
| 🏛️ Syndic | Accès complet — gestion totale |
| 🏠 Copropriétaire | Ses lots, charges, votes, incidents |
| ⚖️ Conseil Syndical | Supervision, finances, incidents |
| 🔑 Locataire | Son logement, incidents, documents |

## 📁 Structure des fichiers

```
├── index.html          # Page d'accueil publique
├── setup.html          # Configuration initiale (Syndic fondateur)
├── login.html          # Connexion Firebase
├── register.html       # Inscription locataire
├── dashboard.html      # Tableau de bord adapté par profil
├── admin.html          # Gestion des résidents (Syndic)
├── vote.html           # Votes et assemblées générales
├── finances.html       # Budget, charges, dépenses
├── lots.html           # Gestion immeubles et lots
├── baux.html           # Gestion des baux locatifs
├── incidents.html      # Signalement et suivi incidents
├── documents.html      # Bibliothèque documentaire
├── annonces.html       # Annonces de la copropriété
├── firebase-config.js  # Configuration Firebase
└── sidebar.js          # Sidebar dynamique partagée
```

## 🗄️ Collections Firestore

| Collection | Description |
|---|---|
| `users` | Profils des résidents |
| `votes` | Votes et résolutions |
| `charges` | Appels de charges |
| `depenses` | Dépenses de la copropriété |
| `incidents` | Incidents signalés |
| `documents` | Bibliothèque documentaire |
| `annonces` | Annonces publiées |
| `lots` | Immeubles et lots |
| `baux` | Contrats de location |
| `config` | Configuration système |

## 🚀 Déploiement

```bash
firebase deploy
```

## 👤 Auteur

**CoproGest Group** — Licence 3 Informatique, Génie Logiciel  
Année universitaire 2025-2026