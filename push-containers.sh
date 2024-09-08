
# Charger les variables d'environnement depuis le fichier .env
export $(cat .env)

# Se déplacer dans le répertoire de l'application React
cd react-app

# Construire une image Docker pour l'application React avec le tag 'react-app:1.0'
docker build -t react-app:1.0 .

# Ajouter un tag supplémentaire à l'image Docker pour le dépôt distant (Docker Hub ou autre)
docker tag react-app:1.0 $DOCKER_REGISTRY/react-app:1.0

# Revenir au répertoire parent
cd ..

# Construire une image Docker pour l'application Node avec le tag 'node-app:1.0'
docker build -t node-app:1.0 .

# Ajouter un tag supplémentaire à l'image Docker pour le dépôt distant
docker tag node-app:1.0 $DOCKER_REGISTRY/node-app:1.0

# Pousser l'image Docker taguée vers le dépôt distant
docker push $DOCKER_REGISTRY/node-app:1.0

# Pousser l'image Docker taguée vers le dépôt distant
docker push $DOCKER_REGISTRY/react-app:1.0
