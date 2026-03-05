## Présentation du projet

La Place Zen est un site e-commerce qui vend des objets révolutionnaires et prouvés comme étant anti-stress. Les blog qui le prouvent sont présentés sur la page d'accueil en dessous des produits et les avis clients pour vous prouver notre bonne fois y sont présentés aussi.

Lien de l'API pour Clone : https://github.com/jjulienolry-droid/React-E-commerce-API
Lien du front pour Clone : https://github.com/jjulienolry-droid/React-E-commerce

## Installation

### Prérequis

- Node.js 16+
- npm
- Clone les deux repository dans deux dossier ayant le même dossier parent


### Lancer l'API

```bash
cd api
npm install
npm run init-db
npm start
```

### Lancer le front

```bash
cd src
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`


## Architecture

src/
├── assets/         # images utilisés pour le site
├── components/     # Composants réutilisables (Navbar, Layout)
├── context/        # Contextes React (Auth, Cart)
├── hooks/          # Fiches des Hooks pour pense-bête
├── pages/          # Pages de l'application
└── router/         # Configuration des routes
├── services/       # Appels API typés
├── types/          # Interfaces TypeScript

## Pages

- [**Home**](src/pages/Home.tsx) → Liste des produits avec filtre par catégorie et bannière
- [**ProductDetail**](src/pages/ProductDetailPage.tsx) → Détail d'un produit avec ajout au panier
- [**Login / Signup**](src/pages/AuthPage.tsx) → Authentification JWT
- [**Profile**](src/pages/Profile.tsx) → Affichage et modification du profil utilisateur
- [**Cart**](src/pages/CartPage.tsx) → Gestion du panier avec total et confirmation de commande

## Compte de test

- **Email** : julolry@gmail.com
- **Mot de passe** : admin123