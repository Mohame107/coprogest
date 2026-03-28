# 🏢 CoproGest — Système de Gestion de Copropriété

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-9.23.0-orange)
![License](https://img.shields.io/badge/licence-MIT-green)
![Status](https://img.shields.io/badge/status-production-brightgreen)

> Application web complète de gestion de copropriété développée dans le cadre du cours de **Génie Logiciel — L3 Informatique** à l'**Université de Djibouti**.

🌐 **Production** : [https://coprogest-effcb.web.app](https://coprogest-effcb.web.app)  
📦 **GitHub** : [https://github.com/Mohame107/coprogest](https://github.com/Mohame107/coprogest)

---

## 📌 Description du Projet

CoproGest est une application web **full-stack sans serveur** qui digitalise la gestion complète d'une copropriété. Elle centralise toutes les opérations administratives, financières et communicatives entre les différents acteurs : Syndic, Copropriétaires, Conseil Syndical et Locataires.

Le projet répond à un besoin réel dans le contexte djiboutien où la gestion des immeubles en copropriété repose encore largement sur des méthodes manuelles. CoproGest offre une solution numérique accessible 24h/24, sans installation, depuis n'importe quel navigateur.

**Copropriété de démonstration** : Résidence Les Jasmin — Djibouti  
**6 lots** | **7 résidents** | **1 350 tantièmes** au total

---

## 🎯 Objectifs

1. **Centraliser** toute la gestion administrative et financière en un seul endroit
2. **Personnaliser** l'interface selon le profil de chaque utilisateur (4 rôles distincts)
3. **Automatiser** les calculs de répartition des charges par tantièmes
4. **Permettre** le vote électronique en temps réel avec validation légale du quorum
5. **Tracer** l'historique complet des incidents, travaux, baux et transferts
6. **Faciliter** la communication interne entre résidents et gestionnaire
7. **Sécuriser** les données avec des règles d'accès strictes par profil
8. **Déployer** une solution accessible sans infrastructure serveur

---

## 👥 Présentation de l'Équipe

| Membre | Rôle | Email |
|--------|------|-------|
| **Mohamed Abdi Ali** | Chef de projet & Développeur principal | mohamedabdiofficiel05@gmail.com |
| **Mouktar Ahmed Omar** | Développeur Frontend & Tests | — |
| **Kadidja Ibrahim Moumin** | Développeur Firebase & Sécurité | — |
| **Mahado Moussa Rayaleh** | Développeur UI/UX & Documentation | — |

**Encadrant** : Dr. Moubarek  
**Filière** : Licence 3 Informatique — Génie Logiciel  
**Université** : Université de Djibouti  
**Année académique** : 2025–2026

---

## ⚙️ Technologies Utilisées

### Frontend
| Technologie | Version | Usage |
|-------------|---------|-------|
| HTML5 | Standard W3C | Structure des 17 pages |
| CSS3 | Standard W3C | Styles, animations, variables CSS |
| JavaScript ES6+ | Vanilla | Logique métier côté client |
| Space Grotesk | Google Fonts | Police des titres |
| Plus Jakarta Sans | Google Fonts | Police du corps de texte |
| Chart.js | 4.4.0 | Graphiques financiers interactifs |
| jsPDF | 2.5.1 | Génération PDF côté client |
| EmailJS | 4.x | Envoi emails vérification + notifications |

### Backend (Firebase)
| Service | Usage |
|---------|-------|
| Firebase Authentication | Authentification email/mdp + Google OAuth |
| Cloud Firestore | Base de données NoSQL temps réel |
| Firebase Hosting | Hébergement statique avec CDN mondial |

### Outils de développement
| Outil | Usage |
|-------|-------|
| Git & GitHub | Versionnement et collaboration |
| Firebase CLI | Déploiement automatisé |
| Visual Studio Code | Éditeur de code principal |
| Chrome DevTools | Débogage et tests |

---

## 🚀 Fonctionnalités

### 🏛️ Syndic (Administrateur)

#### Gestion des Résidents
- ✅ Création de comptes (Copropriétaire, Conseil Syndical, Locataire)
- ✅ Modification et suppression des profils
- ✅ Approbation des demandes d'adhésion avec création automatique de compte
- ✅ Règle d'unicité : un seul Syndic autorisé dans le système
- ✅ Transfert des droits Syndic vers un autre résident avec ré-authentification

#### Gestion Financière
- ✅ Appel de charges individuel et **global automatique** par tantièmes
- ✅ Suivi des paiements (payé, partiel, impayé)
- ✅ Tableau des dettes trié par ancienneté avec indicateur de retard coloré
- ✅ **Génération de lettres de relance PDF** officielles (1ère et 2ème relance)
- ✅ Bouton "Relancer tous" pour traiter tous les impayés en une fois
- ✅ Graphiques interactifs : donut encaissements, barres catégories, courbe mensuelle

#### Assemblées Générales & Votes
- ✅ Création de votes avec 4 types de quorum légal
- ✅ Majorité simple (>50%), double (>66.7%), absolue, unanimité
- ✅ Résultats en temps réel avec barres de progression
- ✅ Décision officielle ADOPTÉE/NON ADOPTÉE après clôture
- ✅ **Export PV PDF** complet avec signatures

#### Gestion Immobilière
- ✅ Création et gestion des lots (appartement, parking, cave)
- ✅ **Transfert de lot lors d'une vente** avec historique
- ✅ Support **multi-lots** par copropriétaire avec calcul automatique tantièmes
- ✅ Gestion des baux de location avec alertes d'expiration

#### Carnet d'Entretien
- ✅ Historique complet des interventions (entretien, réparation, urgence, rénovation, inspection)
- ✅ Gestion des garanties avec calcul automatique de la date de fin
- ✅ Alertes prochaine intervention (< 30 jours)
- ✅ Export PDF du carnet complet

---

### 🏠 Copropriétaire

- ✅ Dashboard avec **tous ses lots** et tantièmes totaux + % de la copropriété
- ✅ Calcul automatique du **pouvoir de vote**
- ✅ Participation aux votes (Pour / Contre / Abstention)
- ✅ Consultation de ses charges et paiements en DJF
- ✅ Signalement d'incidents
- ✅ Messagerie avec le Syndic et le Conseil Syndical

---

### ⚖️ Conseil Syndical

- ✅ Dashboard de supervision (finances, budget, incidents)
- ✅ Assignation des incidents aux prestataires
- ✅ Participation aux votes et ajout d'entrées au carnet d'entretien
- ✅ Messagerie avec tous les résidents

---

### 🔑 Locataire

- ✅ Dashboard simplifié (logement, loyer, incidents personnels)
- ✅ Signalement d'incidents avec alerte urgence et numéro du Syndic
- ✅ Messagerie directe avec le Syndic
- ✅ Accès aux documents publics et annonces

---

### 🌐 Fonctionnalités Transversales

- ✅ Vérification email par code OTP (6 chiffres, 10 min) via EmailJS
- ✅ Notification par email lors de l'approbation ou refus d'adhésion
- ✅ Recherche globale dans la sidebar (résidents, lots, incidents, documents, annonces)
- ✅ Badges de notification en temps réel (messages, votes, incidents urgents, demandes)
- ✅ Messagerie interne temps réel (Firestore onSnapshot)
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Thème bleu profond + menthe avec polices modernes

---

## 🗂️ Structure du Projet

```
coprogest/
│
├── index.html              # Page d'accueil + demande d'adhésion avec OTP
├── setup.html              # Configuration initiale Syndic (usage unique)
├── login.html              # Connexion (email/mdp + Google)
├── register.html           # Inscription locataire (3 étapes)
│
├── dashboard.html          # Tableau de bord adaptatif (4 vues)
├── admin.html              # Gestion des résidents (Syndic)
├── demandes.html           # Demandes d'adhésion
├── profil.html             # Mon profil + sécurité + transfert Syndic
│
├── finances.html           # Charges, dépenses, budget, dettes, graphiques
├── vote.html               # Votes AG + quorum légal + export PV PDF
├── incidents.html          # Signalement et suivi des incidents
├── messages.html           # Messagerie interne temps réel
│
├── lots.html               # Gestion immeubles et lots
├── baux.html               # Contrats de location
├── carnet.html             # Carnet d'entretien + garanties
├── documents.html          # Bibliothèque documentaire
├── annonces.html           # Annonces et communications
│
├── sidebar.js              # Navigation dynamique + recherche + badges
├── firebase-config.js      # Configuration Firebase
├── theme.css               # Variables CSS globales du thème
└── README.md               # Documentation du projet
```

### Collections Firestore (15 collections)

| Collection | Description |
|------------|-------------|
| `users` | Profils utilisateurs |
| `lots` | Immeubles et appartements |
| `baux` | Contrats de location |
| `charges` | Appels de charges et paiements |
| `depenses` | Dépenses de la copropriété |
| `votes` | Résolutions et votes AG |
| `incidents` | Signalements et suivi |
| `conversations` | Messagerie (+ sous-collection `messages`) |
| `documents` | Bibliothèque documentaire |
| `annonces` | Publications et communications |
| `carnet_entretien` | Historique des travaux |
| `config` | Configuration système |
| `demandes` | Demandes d'adhésion |
| `verifications` | Codes OTP temporaires |
| `historique_transferts` | Historique des transferts |

---

## 🧪 Tests Réalisés

### Tests Fonctionnels

| Scénario | Résultat |
|----------|----------|
| Connexion email/mot de passe | ✅ OK |
| Connexion Google + vérification unicité Syndic | ✅ OK |
| Inscription locataire 3 étapes | ✅ OK |
| Demande adhésion + vérification OTP email | ✅ OK |
| Approbation demande → création compte + email notification | ✅ OK |
| Dashboard adaptatif par profil (4 vues) | ✅ OK |
| Appel charges global + répartition automatique tantièmes | ✅ OK |
| Vote temps réel + calcul quorum légal | ✅ OK |
| Export PV PDF après clôture vote | ✅ OK |
| Génération lettre de relance PDF | ✅ OK |
| Transfert lot lors d'une vente | ✅ OK |
| Multi-lots copropriétaire + cumul tantièmes | ✅ OK |
| Messagerie temps réel onSnapshot | ✅ OK |
| Badges notifications mis à jour temps réel | ✅ OK |
| Recherche globale + navigation directe | ✅ OK |
| Export carnet d'entretien PDF | ✅ OK |

### Tests de Sécurité

| Test | Résultat |
|------|----------|
| Accès sans authentification | ✅ Bloqué |
| Création 2ème Syndic | ✅ Bloqué |
| Locataire accédant à admin.html | ✅ Refusé |
| Double vote sur même résolution | ✅ Bloqué |
| Suppression par non-Syndic (Firestore) | ✅ Refusé |
| Manipulation profil via URL | ✅ Ignoré |

### Tests de Compatibilité

| Navigateur | Affichage | Fonctionnalité |
|------------|-----------|----------------|
| Google Chrome Desktop | ✅ | ✅ |
| Microsoft Edge Desktop | ✅ | ✅ |
| Chrome Mobile Android | ✅ Responsive | ✅ |
| Safari Mobile iOS | ✅ Responsive | ✅ |

---

## 🔐 Sécurité

3 niveaux de sécurité implémentés :

1. **Firebase Authentication** — Tokens JWT signés par Google
2. **Règles Firestore** — Contrôle d'accès côté serveur par profil
3. **Vérifications client** — Chaque page vérifie le profil avant affichage

Toutes les communications sont chiffrées via **HTTPS** (Firebase Hosting).

---

## 🚀 Installation et Déploiement

```bash
# Cloner le dépôt
git clone https://github.com/Mohame107/coprogest.git
cd coprogest

# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter et déployer
firebase login
firebase deploy
```

---

## 📄 Licence

MIT License — Copyright (c) 2026 Mohamed Abdi Ali, Mouktar Ahmed Omar, Kadidja Ibrahim Moumin, Mahado Moussa Rayaleh

Permission est accordée, gratuitement, à toute personne obtenant une copie de ce logiciel, de l'utiliser, le copier, le modifier, le fusionner, le publier et le distribuer sans restriction, sous réserve que la notice de copyright ci-dessus soit incluse dans toutes les copies.

---

## 🙏 Remerciements

- **Dr. Moubarek** — Encadrant pédagogique, pour ses conseils et son accompagnement
- **Université de Djibouti** — Pour le cadre académique et les ressources
- **Google Firebase** — Infrastructure cloud complète et gratuite (plan Spark)
- **EmailJS** — Service d'envoi d'emails côté client
- **Chart.js & jsPDF** — Bibliothèques open-source de visualisation et PDF
- **Google Fonts** — Polices Space Grotesk et Plus Jakarta Sans
- Nos familles et proches pour leur soutien tout au long du projet

---

<div align="center">

**CoproGest** — Développé avec ❤️ à Djibouti

*Université de Djibouti — L3 Informatique — Génie Logiciel — 2025/2026*

[🌐 Application](https://coprogest-effcb.web.app) · [📦 GitHub](https://github.com/Mohame107/coprogest)

</div>