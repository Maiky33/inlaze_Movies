import {BrowserRouter,Routes,Route} from 'react-router-dom'
import PrincipalPage from "./pages/PrincipalPage";
import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoritesContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import MoviePage from "./pages/MoviePage"

function App() {
  return (
    <AuthProvider>  
      <FavoriteProvider> 

        <BrowserRouter> 
          <Routes>  
            <Route path="/" element={<PrincipalPage/>}/>

            <Route element={<ProtectedRoute/>}> 
              <Route path="/MoviePage/:MovieID" element={<MoviePage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>

      </FavoriteProvider>
    </AuthProvider>
  );
}

export default App;
