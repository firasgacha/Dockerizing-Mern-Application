import { useState } from "react";
import { User } from "../Api/Api";

interface AddUserModalProps {
    setShowAddUserSection: (value: boolean) => void;
    setUsers: (newUser: User) => void;
}

export function AddUserModal(props: AddUserModalProps) {

    const [user, setUser] = useState<User>({
        fullName: "",
        email: "",
        interests: "",
        userid: -1
    });

    // Fonction pour générer un nombre entier aléatoire jusqu'à un maximum donné
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    // Fonction pour sauvegarder un nouvel utilisateur
    async function saveUser() {
        if (user.fullName === "") {
            alert("Full name is required !");
            return;
        }

        try {
            // Création du payload pour la requête POST
            const payload: User = {
                ...user,
                userid: getRandomInt(9999999)
            };

            // Requête pour sauvegarder l'utilisateur dans l'API
            const response = await fetch("http://localhost:3000/save", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)  // Envoi des données sous forme de JSON
            });

            // Vérification si la réponse est correcte
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Conversion de la réponse en JSON
            const newUser = await response.json();

            // Mise à jour de l'état avec le nouvel utilisateur ajouté
            props.setUsers(newUser);  // Ajout du nouvel utilisateur à la liste des utilisateurs
            props.setShowAddUserSection(false);

        } catch (error) {
            // Affichage de l'erreur dans la console en cas d'échec
            console.error("", error);
        }
    }
    return (
        <div>
            <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div>
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">New user</h2>
                            </div>
                            <div className="mx-auto max-w-xl sm:mt-20">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Full name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                placeholder="Write your full name ..."
                                                value={user.fullName}
                                                onChange={(e) => setUser({
                                                    ...user,
                                                    fullName: e.target.value
                                                })}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="Write your email ..."
                                                value={user.email}
                                                onChange={(e) => setUser({
                                                    ...user,
                                                    email: e.target.value
                                                })}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Interests
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="interests"
                                                name="interests"
                                                type="text"
                                                autoComplete="organization"
                                                placeholder="List your ineterts ..."
                                                value={user.interests}
                                                onChange={(e) => setUser({
                                                    ...user,
                                                    interests: e.target.value
                                                })}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button
                                        onClick={() => saveUser()}
                                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <button
                                        onClick={() => props.setShowAddUserSection(false)}
                                        className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
