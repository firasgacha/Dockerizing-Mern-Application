// Importation des modules nécessaires
var express = require("express"); // Framework web pour Node.js
var MongoClient = require("mongodb").MongoClient; // Client MongoDB pour se connecter à la base de données MongoDB
var bodyParser = require("body-parser"); // Middleware pour analyser les corps des requêtes HTTP
var cors = require("cors"); // Middleware pour permettre les requêtes cross-origin

require('dotenv').config(); // Import and configure dotenv

// Initialisation de l'application Express
var app = express();
app.use(cors()); // Utilisation du middleware CORS pour permettre les requêtes cross-origin

// Récupère les arguments de ligne de commande en ignorant les deux premiers éléments (chemin de l'exécutable et chemin du script)
const args = process.argv.slice(2);

// Initialise un objet pour stocker les paramètres sous forme de clé-valeur
const params = {};

// Parcourt chaque argument
args.forEach(arg => {
  // Sépare l'argument en clé et valeur en utilisant le signe égal (=) comme séparateur
  const [key, value] = arg.split("=");

  // Ajoute la paire clé-valeur à l'objet params
  params[key] = value;
});

// Définition du mode de connexion (local ou distant)
const local = params["--local"];

const dbUser = process.env.MONGO_DB_USERNAME;
const dbPass = process.env.MONGO_DB_PWD;

// URL de connexion à MongoDB selon le mode choisi
const mongoUrlLocal = local === "true" ? `mongodb://${dbUser}:${dbPass}@localhost:27017` : `mongodb://${dbUser}:${dbPass}@mongodb`;

// Nom de la base de données utilisée
const dbName = "user-account";

// Middleware pour analyser les données des requêtes HTTP (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({
  extended: true
}));

// Middleware pour analyser les données des requêtes HTTP (application/json)
app.use(bodyParser.json());
app.use(express.json()); // Middleware pour analyser les données des requêtes au format JSON

// Route GET pour récupérer tous les utilisateurs
app.get("/users", async function(req, res){

  // Création d'un client MongoDB et connexion à la base de données
  const client = new MongoClient(mongoUrlLocal);
  const dataBase = client.db(dbName);
  const users = dataBase.collection("users");

  // Options de requête pour trier par titre et sélectionner certains champs
  const options = {
    sort: { fullName: 1 },
    projection: {_id: -1, fullName: 1, email: 1 , interests: 1, userid: 1},
  };

  // Requête pour récupérer tous les utilisateurs selon les options définies
  const cursor = users.find({}, options);
  const allValues = await cursor.toArray(); // Conversion du curseur en tableau

  // Fermeture de la connexion à la base de données
  client.close();

  // Envoi de la réponse contenant tous les utilisateurs
  res.send(allValues);
});

// Route POST pour enregistrer un nouvel utilisateur
app.post("/save", async function(req, res){

  // Création d'un client MongoDB et connexion à la base de données
  const client = new MongoClient(mongoUrlLocal);
  const dataBase = client.db(dbName);
  const users = dataBase.collection("users");

  // Récupération des données de l'utilisateur à partir du corps de la requête
  const newUser = req.body;

  // Insertion d'un nouvel utilisateur dans la collection
  const result = await users.insertOne(newUser);

  // Fermeture de la connexion à la base de données
  await client.close();

  // Vérification si l'insertion a réussi et envoi de la réponse
  if(result.insertedId.id)
    res.send(newUser);

});

// Route DELETE pour supprimer un utilisateur
app.delete("/delete", async function(req, res) {
  // Création d'un client MongoDB et connexion à la base de données
  const client = new MongoClient(mongoUrlLocal);
  const dataBase = client.db(dbName);
  const users = dataBase.collection("users");  // Sélection de la collection "users" dans la base de données

  // Création de la requête pour supprimer un utilisateur avec un 'userid' spécifique
  const query = { userid: req.body.userid };

  // Suppression d'un document (utilisateur) correspondant à la requête
  const result = await users.deleteOne(query);

  // Fermeture de la connexion à la base de données
  await client.close();

  // Vérification du résultat de la suppression et envoi de la réponse appropriée
  if (result.deletedCount === 1)  // Si un utilisateur a été supprimé
      res.status(200).send({ success: true, message: "User deleted successfully." });  // Réponse avec succès
  else  // Si aucun utilisateur n'a été trouvé pour la suppression
      res.status(404).send({ success: false, message: "User not found." });  // Réponse indiquant que l'utilisateur n'existe pas
});


// Démarrage du serveur sur le port 3000
app.listen(3000, function () {
    console.log("app listening on port 3000!");
});
