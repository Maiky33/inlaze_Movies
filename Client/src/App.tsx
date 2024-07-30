
// import io from "socket.io-client";
// import axios from "axios";
import { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import PrincipalPage from "./pages/PrincipalPage";
import HomeApp from "./pages/HomeApp";
import CollectionsPage from "./pages/CollectionPage"
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>  
      <BrowserRouter> 
        <Routes>  
          <Route path="/" element={<PrincipalPage/>}/>

          <Route element={<ProtectedRoute/>}> 
            <Route path="/HomeApp" element={<HomeApp/>}/>
            <Route path="/Collections" element={<CollectionsPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
