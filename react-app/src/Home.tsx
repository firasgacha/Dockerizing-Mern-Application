import { useState } from "react";
import { Container } from "./components/Container";
import { AddUserModal } from "./components/AddUserModal";
import { TableUsers } from "./components/TableUsers";
import Api, { User } from "./Api/Api";
import { useQuery } from "react-query";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";


export function Home() {

    // Déclaration des états locaux pour les champs du formulaire et pour la liste des utilisateurs
    const [users, setUsers] = useState<User[]>([]);  // État pour la liste des utilisateurs
    const [showAddUserSection, setShowAddUserSection] = useState(false); // Afficher la section d'ajout d'un utilisateur.

    // Récupérer les données des utilisateurs.
    const { isLoading, isError } = useQuery({
        // "users" est utilisé comme clé unique pour cette requête.
        queryKey: ["users"],
        // La fonction qui sera appelée pour récupérer les utilisateurs.
        queryFn: getUsers,
    });

    // Fonction pour initialiser la liste des utilisateurs
    async function getUsers() {
        Api.getUsers().then((users) => {
            if (users)
                // Mise à jour de l'état avec la liste des utilisateurs
                setUsers(users);
        });
    }

    // Fonction pour supprimer un utilisateur
    async function deleteUser(userid: number) {
        Api.deleteUser(userid).then((res) => {
            if (res)
                setUsers(users.filter(user => user.userid != userid));
        });
    }

    // Si les données sont en cours de chargement, le composant "Loading" est retourné.
    if (isLoading) {
        return <Loading />;
    }

    // Si une erreur survient ou si les données ne sont pas disponibles, le composant "Error" est retourné.
    if (isError) {
        return <Error />;
    }

    // Rendu du composant
    return (
        <Container title="Users">
            {showAddUserSection &&
                <AddUserModal
                    setUsers={(newUser) => setUsers([...users, newUser])}
                    setShowAddUserSection={(value) => setShowAddUserSection(value)}
                />
            }

            {/* Affichage de la liste des utilisateurs */}
            <TableUsers
                users={users}
                showAddUserSection={showAddUserSection}
                setShowAddUserSection={setShowAddUserSection}
                deleteUser={deleteUser}
            />

        </Container>
    );
}
