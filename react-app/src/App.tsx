import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./Home";

function App() {
  // Création d'une instance de QueryClient, qui gérera toutes les requêtes de l'application.
  const queryClient = new QueryClient();

  // Rendu du composant
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
