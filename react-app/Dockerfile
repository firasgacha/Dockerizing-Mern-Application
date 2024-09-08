# Utiliser l'image de base officielle de Node.js avec Alpine Linux pour minimiser la taille de l'image
FROM node:alpine as build

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail du conteneur
COPY package*.json ./

# Installer les dépendances du projet définies dans package.json
RUN npm install

# Copier tout le code de l'application depuis le répertoire local vers le répertoire de travail du conteneur
COPY . .

# Construire l'application React en mode production pour optimiser les performances
RUN npm run build

# Utiliser l'image de base officielle de Nginx avec Alpine Linux pour le serveur de production
FROM nginx:alpine

# Copier les fichiers construits de l'application React depuis le conteneur de build vers le répertoire web de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80 pour que le serveur Nginx soit accessible
EXPOSE 80

# Démarrer Nginx avec le mode "daemon off" pour garder le processus en cours d'exécution en avant-plan
CMD ["nginx", "-g", "daemon off;"]
