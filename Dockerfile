# Utilise une image Node basée sur Alpine Linux pour une empreinte plus légère
FROM node:alpine as build

# Définir les variables d'environnement
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

# Définir le répertoire de travail sur /app
WORKDIR /app

# Copier le reste du code de l'application
COPY . .

# Copier le fichier package.json à la racine et installer les dépendances
# COPY package.json ./
RUN npm install

# Définir la commande par défaut pour démarrer l'application
CMD ["npm", "run", "dev"]
