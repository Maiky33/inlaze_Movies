import { createContext, useContext} from "react";
import {toogleFavoriteMovie,getallFavorites} from "../api/Favorites";

export const FavoriteContext = createContext<any>(undefined)

export const useFavoriteCTX = ()=>{    
    const context = useContext(FavoriteContext)
    if(!context){   
        throw new Error("useFavoriteCTX mus be within an AuthProvider");
    }
    return context;
}


export const FavoriteProvider = ({children}:any) =>{      

    const toogleFavorite = async (user:any, movie:any) => {
        try {
            const response = await toogleFavoriteMovie(movie);
            return response.data
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
        }
    };
        
    const allFavorites = async()=>{ 
        try {
            const response = await getallFavorites();
            return response.data
        } catch (error) {
            console.error('Error al traer favoritos:', error);
        }
    }

    return( 
            <FavoriteContext.Provider   
                value={{
                    toogleFavorite,
                    allFavorites
                }}>  
                {children}
            </FavoriteContext.Provider>
        )
}