# Résumé pédagogique


## 1. CSR vs SSR


### CSR (Client-Side Rendering)

Le Client-Side Rendering est une méthode où la page web est générée directement dans le navigateur grâce à JavaScript.
Le serveur envoie une page HTML presque vide accompagnée de fichiers JavaScript. Ensuite, le navigateur exécute ce code pour construire le contenu affiché à l’écran.
Un exemple courant d’outil utilisant ce principe est React.

#### Avantages :
Le CSR permet une navigation très fluide une fois l’application chargée, car seules les données nécessaires sont mises à jour sans recharger toute la page. Cela améliore l’expérience utilisateur, notamment pour les applications interactives (SPA). De plus, la charge serveur est généralement plus faible puisque le rendu est effectué côté navigateur.

#### Inconvénients :
Le temps de chargement initial peut être plus long, car le navigateur doit télécharger et exécuter les fichiers JavaScript avant d’afficher le contenu. Le référencement naturel (SEO) peut également être moins performant, car certaines pages dépendent fortement de l’exécution du JavaScript pour afficher leur contenu.

### SSR (Server-Side Rendering)

Le Server-Side Rendering consiste à générer la page web directement sur le serveur.
Lorsque l’utilisateur fait une requête, le serveur construit le HTML complet et l’envoie prêt à être affiché par le navigateur.

Un exemple de framework utilisant cette approche est Next.js.

#### Avantages :
Le SSR permet d’afficher rapidement une page complète dès la première requête, ce qui améliore la performance perçue par l’utilisateur. Il favorise aussi un meilleur référencement (SEO), car les moteurs de recherche reçoivent directement du contenu HTML déjà généré.

#### Inconvénients :
Le serveur doit générer le HTML à chaque requête, ce qui augmente la charge serveur. L’architecture peut être plus complexe à mettre en place, notamment pour gérer l’hydratation côté client et assurer de bonnes performances globales.


## 2. Les verbes HTTP


Ils servent à dire ce qu’on veut faire sur une ressource.

### Liste des verbes HTTP : 

GET → Lire

POST → Créer

PUT → Remplacer

PATCH → Modifier partiellement

DELETE → Supprimer

Exemple :
GET /users → récupérer les utilisateurs
POST /users → créer un utilisateur


## 3. DNS et nom de domaine

Le DNS transforme un nom de site en adresse IP.

Le navigateur vérifie d’abord son cache pour voir s’il connaît déjà l’adresse IP du nom de domaine.

S’il ne la trouve pas, la requête est envoyée au résolveur DNS 

Le résolveur interroge  :

les serveurs du domaine de premier niveau, puis le serveur DNS autoritaire du domaine demandé.

Le serveur autoritaire renvoie l’adresse IP correspondant au nom de domaine.

Le navigateur peut alors établir une connexion TCP avec le serveur pour récupérer le site web.

En résumé, le DNS agit comme un annuaire mondial qui transforme un nom de domaine lisible par l’humain en adresse IP compréhensible par les machines.

Exemple :
google.com → 8.8.X.X


## 4. Architecture microservices vs monolithique


### Architecture monolithique

Dans une architecture monolithique, toute l’application est regroupée dans un seul bloc : interface utilisateur, logique métier et accès aux données sont réunis dans un même projet et déployés ensemble.

Cette approche est souvent plus simple à mettre en place au début d’un projet. Le développement, le déploiement et le debugging sont généralement plus faciles car tout est centralisé.

Cependant, avec le temps, l’application peut devenir volumineuse et difficile à maintenir. La moindre modification nécessite souvent de redéployer l’ensemble du système, et la montée en charge est plus compliquée car on doit scaler toute l’application, même si une seule partie en a besoin.

### Architecture microservices

Dans une architecture microservices, l’application est divisée en plusieurs petits services indépendants, chacun responsable d’une fonctionnalité précise (authentification, paiement, catalogue, etc.).

Chaque service peut être développé, déployé et mis à l’échelle séparément. Cette approche offre plus de flexibilité et facilite l’évolution du système, surtout pour les grandes applications ou les équipes nombreuses.

En revanche, elle est plus complexe à concevoir et à gérer : il faut gérer la communication entre services, la supervision, la sécurité et le déploiement distribué.

Des outils comme Docker (conteneurisation) et Kubernetes (orchestration de conteneurs) sont souvent utilisés pour déployer et gérer ce type d’architecture.

En résumé, le monolithe est plus simple au départ, tandis que les microservices sont plus adaptés aux systèmes complexes et évolutifs.


## 5. Semver et Git


### Semver

Format :
MAJOR.MINOR.PATCH
Exemple : 2.3.1

MAJOR → gros changement incompatible

MINOR → nouvelle fonctionnalité

PATCH → correction de bug

### Git

Git permet de :

Sauvegarder le code

Travailler en équipe

Revenir en arrière

Plateformes connues :

GitHub

GitLab