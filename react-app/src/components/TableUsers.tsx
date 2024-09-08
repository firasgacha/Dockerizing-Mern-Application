import { User } from "../Api/Api";

// Définition de l'interface pour les propriétés de la table
interface TableUsersProps {
    users: User[]; // Liste des utilisateurs
    showAddUserSection: boolean; // Indicateur pour afficher ou non la section d'ajout d'utilisateur
    setShowAddUserSection: (value: boolean) => void; // Fonction pour définir la valeur de l'indicateur showAddUserSection
    deleteUser: (userid: number) => void; // Fonction pour supprimer un utilisateur à partir de son identifiant
}

// Fonction composant pour afficher la table des utilisateurs
export function TableUsers(props: TableUsersProps) {
    return (
        <div>
            <div className="sm:px-6">
                {/* Conteneur pour les options et le bouton d'ajout d'utilisateur */}
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="sm:flex items-center justify-between">
                        <p>Number of users : {props.users.length}</p>
                        {/* Bouton pour afficher/masquer la section d'ajout d'utilisateur */}
                        <button
                            onClick={() => props.setShowAddUserSection(!props.showAddUserSection)}
                            className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                            <p className="text-sm font-medium leading-none text-white">Add user</p>
                        </button>
                    </div>
                </div>
                {/* Liste des utilisateurs */}
                {props.users.length > 0 ?
                    <ul role="list" className="divide-y divide-gray-100">
                        {props.users.map((user, index) => (
                            <li key={index} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        {/* Affichage du nom complet de l'utilisateur */}
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{user.fullName}</p>
                                        {/* Affichage de l'email de l'utilisateur */}
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                                        {/* Affichage des intérêts de l'utilisateur */}
                                        <p className="mt-1 text-xs leading-5 text-gray-500">{user.interests}</p>
                                    </div>
                                </div>
                                {/* Bouton pour supprimer l'utilisateur */}
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <button onClick={() => props.deleteUser(user.userid)}
                                        className="text-xs w-full hover:bg-red-700 py-4 px-4 cursor-pointer hover:text-white">
                                        <p>Delete</p>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                    <p className="flex justify-center content-center items-center">No user found ...</p>
                }
            </div>
        </div>
    );
}
