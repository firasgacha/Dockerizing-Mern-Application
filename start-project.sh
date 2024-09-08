# Construire une image Docker pour l'application React avec le tag "react-app:1.0"
docker build -t react-app:1.0 ./react-app

# Construire une image Docker pour l'application Node avec le tag "node-app:1.0"
docker build -t node-app:1.0 .

# Lancer les services définis dans les fichiers de configuration Docker Compose (project-compose.yaml et db-compose.yaml)
docker-compose -f project-compose.yaml -f db-compose.yaml up
