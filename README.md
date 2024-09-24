
# BodyFit App

BodyFit est une application mobile de suivi de condition physique développée avec **React Native** et **Expo**. Elle permet aux utilisateurs de suivre leur progression, d'accéder à des informations sur leurs activités, et d'utiliser des fonctionnalités interactives pour améliorer leur bien-être physique.

L'application met également un fort accent sur l'entraide entre les utilisateurs grâce au partage d'exercices et de programmes personnalisés. Les utilisateurs peuvent créer, partager et s'inspirer des programmes d'entraînement d'autres membres de la communauté, favorisant ainsi une approche collaborative du fitness.


## Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- Expo CLI (`npm install -g expo-cli`)
- Un émulateur Android/iOS ou un appareil physique connecté

### Étapes d'installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/BodyFit-App/frontend-bodyfit-app.git
   cd bodyfit-app
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez l'application :

   - Pour Android : 
     ```bash
     npm run android
     ```
   - Pour iOS : 
     ```bash
     npm run ios
     ```
   - Pour le Web :
     ```bash
     npm run web
     ```

## Scripts

- `npm start`: Démarre l'application avec Expo.
- `npm run android`: Lance l'application sur un émulateur Android.
- `npm run ios`: Lance l'application sur un émulateur iOS.
- `npm run web`: Lance l'application dans le navigateur Web.
- `npm test`: Exécute les tests avec Jest.
- `npm run test:coverage`: Génère un rapport de couverture des tests.

## Fonctionnalités principales

- **Suivi de progression** : Suivez vos performances et vos objectifs sportifs.
- **Formulaire interactif** : Collectez et gérez des données utilisateurs avec `react-hook-form`.
- **Graphiques interactifs** : Visualisez vos statistiques via des graphiques (via `react-native-pie-chart`).
- **Stockage local sécurisé** : Stockez les données utilisateur avec `@react-native-async-storage`.
- **Intégration avec Supabase** : Connectez-vous et synchronisez vos données à l'aide de `@supabase/supabase-js`.
- **Navigation fluide** : Utilisation de `@react-navigation` pour une navigation intuitive dans l'application.
- **Système de date et calendrier** : Gérer les dates avec `react-native-paper-dates`.

## Technologies utilisées

- **React Native** : Framework de développement mobile.
- **Expo** : Plateforme pour le développement d'applications React Native.
- **Supabase** : Backend as a Service pour la gestion des utilisateurs et des données.
- **React Query** : Gestion des données et des requêtes.
- **Jest** : Tests unitaires et couverture de code.

## Dépendances principales

- `react-native`: Version 0.74.3
- `expo`: Version ~51.0.22
- `react-navigation`: Gestion de la navigation.
- `react-native-paper`: UI kit pour React Native.
- `@supabase/supabase-js`: Client Supabase pour interagir avec la base de données.
- `react-hook-form`: Gestion des formulaires.

## Tests

L'application utilise **Jest** pour les tests unitaires. Pour exécuter les tests, utilisez la commande suivante :

```bash
npm test
```

Pour générer un rapport de couverture des tests :

```bash
npm run test:coverage
```

**BodyFit App** - Développez un style de vie plus sain et suivez vos progrès facilement !
