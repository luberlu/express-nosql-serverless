# Express TypeScript API avec Serverless Framework et DynamoDB

Ce projet démontre comment développer et déployer un service API Node.js utilisant Express et TypeScript, avec une base de données DynamoDB, le tout fonctionnant sur AWS Lambda via le Serverless Framework. Il inclut également la possibilité de développer localement avec `serverless-offline`.

## Fonctionnalités

- **Express.js** pour la gestion des routes et des requêtes HTTP.
- **TypeScript** pour un typage statique et une meilleure maintenabilité du code.
- **DynamoDB** pour le stockage des données utilisateurs.
- **Serverless Framework** pour déployer facilement sur AWS Lambda.
- **Serverless Offline** pour le développement et le test local.

## Prérequis

- Node.js et npm installés sur votre machine.
- Un compte AWS et des identifiants configurés pour le déploiement.

## Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone <url-du-repo>
cd <nom-du-repo>
npm install
```

## Développement local offline

Pour développer localement, utilisez `serverless-offline` et `serverless-dynamodb` :

1. Installez Serverless DynamoDB :

   ```bash
   serverless dynamodb install
   ```

2. Démarrez le serveur local :

   ```bash
   npm run offline
   ```

Cela lancera :
- Un serveur API local sur `http://localhost:3000`
- Un émulateur DynamoDB local sur le port 8001

Vous pouvez maintenant tester vos endpoints localement :

```bash
# Créer un utilisateur
curl --request POST 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "John", "userId": "someUserId"}'

# Récupérer un utilisateur
curl http://localhost:3000/users/someUserId
```

## Déploiement

Pour déployer votre service sur AWS, exécutez :

```bash
serverless deploy
```

Après le déploiement, vous verrez une sortie similaire à :

```
Service deployed to stack express-nosql-serverless-dev
endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: express-nosql-serverless-dev-api
```

## Utilisation

### Créer un utilisateur

Pour créer un nouvel utilisateur, envoyez une requête POST à l'endpoint `/users` :

```bash
curl --request POST 'https://xxxxxx.execute-api.us-east-1.amazonaws.com/users' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "John", "userId": "someUserId"}'
```

### Récupérer un utilisateur

Pour récupérer un utilisateur par `userId`, envoyez une requête GET à l'endpoint `/users/:userId` :

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/users/someUserId
```

## Remarques

- Assurez-vous que votre table DynamoDB est correctement configurée et que les permissions IAM sont en place pour permettre l'accès à DynamoDB.
- Pour les déploiements en production, envisagez d'ajouter un authorizer pour sécuriser votre API.

## Contribution

Les contributions sont les bienvenues. Veuillez soumettre une pull request pour toute amélioration ou correction.

## Licence

Ce projet est sous licence MIT.