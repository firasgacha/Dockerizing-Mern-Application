
/**
 * Composant pour afficher un message d'erreur.
 */
export function Error() {
    return (
        <div className="flex items-center flex-col justify-center lg:flex-row py-20  px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
                    Le contenu que vous recherchez n'est pas disponible
                </h1>
                <p className="py-2 text-base text-gray-800">
                    Nous n'avons pas pu récupérer les informations demandées
                    pour le moment. Veuillez réessayer plus tard. Nous vous
                    remercions de votre compréhension.
                </p>
            </div>
        </div>
    );
}