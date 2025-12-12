# Todos-client-server
Projet CI/CD – Mastère Lead Developer Full Stack

Ce projet implémente une architecture **client / serveur** complète avec pipeline CI/CD, observabilité via **Sentry**,notifications automatisées **Discord**, test unitaire, scan de sécurity etc...  

Le repository contient deux applications distinctes dans le dossier `packages/` :

- `packages/client` → Frontend (Vite + React)  
- `packages/server` → Backend (Node.js + Express, Dockerfile inclu)

---

## Fonctionnalité 

#### Notifications Discord  : [Lien du serveur discord](https://discord.gg/u9fnSswM)
Le backend envoie automatiquement des alertes Discord en cas d’erreur ou d’événements critiques.

![Discord notification](./packages/client/public/discord_notify.png)

### Observabilité Sentry 
###
#### Dashboard UI
Le backend est relié à **Sentry** pour remonter les erreurs, logs et événements importants coté serveur et client.

![Observabilité avec Sentry](./packages/server/public/sentry.png)
#### Webhook 
```shell
https://todos-server-node.onrender.com/failed
```
##### Exemple de réponse 
![Observabilité avec Sentry](./packages/server/public/locahost_sentry_failed.png)
## Website

#### Frontend : 

1. URL : [lien ici](https://todos-client-server-two.vercel.app/)
2. Stack: Vite, React 
3. Déploiement : Vercel
4. Docker : Dockerfile multi-stage disponible dans `packages/client`
5. Test unitaire
6. Scan de sécurité

#### Backend :
1. URL : [lien ici ](https://todos-server-node.onrender.com/api/todos)

2. Stack : Node.js, Express
3. Déploiement : Render
4. Docker : Dockerfile multi-stage disponible dans `packages/server`
5. Test unitaire
6. Scan de sécurité

## Stratégie de rollback

Notre stratégie de rollback repose sur un mécanisme simple et fiable.
À chaque création de tag, le build de l’image Docker du backend est automatiquement déclenché. Cette image est ensuite versionnée et stockée dans notre repository Docker Hub.

En cas de problème en production, le rollback consiste simplement à sélectionner une version précédente de l’image Docker depuis la configuration du service sur Render, puis à redéployer cette version.

Cette approche garantit un retour rapide à un état stable sans nécessiter de nouvelle compilation ni de modification du code source.

## Structure du repository
```
.
├──.github/
│    ├── workflows/
|    | client.yml
|    | server.yml
|
├── packages/
│   ├── client/      
│   │   ├── public/
│   │   └── src/
│   │
│   └── server/      
│       ├── public/
│       ├── src/
│       └── Dockerfile
│
├──.gitignore
|
└── README.md
```
## Stratégie pipeline

Chaque application, frontend et backend, dispose de sa propre pipeline CI/CD `client.yml ` et ` server.yml` indépendante.

Les pipelines sont automatiquement déclenchées lors d’une pull request, afin d’exécuter les étapes de validation (linting, tests, build).

Le déploiement, quant à lui, est uniquement déclenché lors de la création d’un nouveau **tag**, garantissant ainsi que seules des versions explicitement validées et versionnées sont mises en production.

## Installation & Lancement 

### 1. Cloner le projet

```bash
git clone https://github.com/kylyon/todos-client-server.git
cd todos-client-server
```

### 2. Installer les dépendances 
A la racine : 
```bash
npm install
```

### 3. Lancer le frontend
```bash
cd packages/client
npm run dev
```

### 4. Lancer le frontend
```bash
cd packages/server
npm run dev
```

## Lancement du backend avec Docker
```bash
docker build -t todos-server .
docker run -p 3001:3001 todos-server
```
## Auteur
- Kyllian Marie-Magdelaine
- Dan David Elenga

## Licence 

Projet pédagogique – Mastère Lead Developer Full Stack.