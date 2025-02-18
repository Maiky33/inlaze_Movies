import {BrowserRouter,Routes,Route} from 'react-router-dom'
import PrincipalPage from "./pages/PrincipalPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import MoviePage from "./pages/MoviePage"

function App() {
  return (
    <AuthProvider>  
      <BrowserRouter> 
        <Routes>  
          <Route path="/" element={<PrincipalPage/>}/>

          <Route element={<ProtectedRoute/>}> 
            <Route path="/MoviePage/:MovieID" element={<MoviePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
