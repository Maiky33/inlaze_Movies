import NavBar from "../components/NavBar";
import {useAuth} from "../context/AuthContext";


function CollectionsPage() {
  const {isAuthenticated}:any = useAuth()  

  return (
    <div className="ContainerCollectionsPage">   
      <NavBar isAuthenticated={isAuthenticated}/> 
      collections
    </div>
  );
}

export default CollectionsPage;
