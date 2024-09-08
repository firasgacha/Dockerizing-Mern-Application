// Définition de l'interface pour un utilisateur
export interface User {
  _id?: string; // Identifiant unique de l'utilisateur (optionnel)
  userid: number; // Identifiant de l'utilisateur
  email: string; // Adresse email de l'utilisateur
  fullName: string; // Nom de l'utilisateur
  interests: string; // Intérêts de l'utilisateur
}

class Api {
  // Fonction pour supprimer un utilisateur
  async deleteUser(userid: number): Promise<boolean> {
    try {
      // Requête pour sauvegarder l'utilisateur dans l'API
      const response = await fetch("http://localhost:3000/delete", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: userid }), // Envoi des données sous forme de JSON
      });

      // Vérification si la réponse est correcte
      if (response.ok) return true;
      // setUsers(users.filter(user => user.userid != userid));
      else throw new Error(`HTTP error! Status: ${response.status}`);
    } catch (error) {
      // Affichage de l'erreur dans la console en cas d'échec
      console.error("Failed to save user:", error);
    }

    return false;
  }

  // Fonction pour initialiser la liste des utilisateurs
  async getUsers(): Promise<User[] | undefined> {
    try {
      // Requête pour récupérer la liste des utilisateurs depuis l'API
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Conversion de la réponse en JSON
      const users = await response.json();

      if (response.ok) return users;
    } catch (error) {
      // Affichage de l'erreur dans la console en cas d'échec
      console.log(error);
    }
  }
}

// Création d'une instance de la classe Api pour être utilisée dans le projet.
const API = new Api();
export default API;
