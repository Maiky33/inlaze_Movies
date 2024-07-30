import { createContext, useState, useContext, useEffect} from "react";
import {registerRequest,loginRequest,logOutRequest,reloginverifyTokenRequest} from "../api/auth.js";


interface MyContextProps {
    value: string;
    setValue: (value: string) => void;
}

export const AuthContext = createContext<any>(undefined)


//
export const useAuth = ()=>{    
    const context = useContext(AuthContext)
    if(!context){   
        throw new Error("useAuth mus be within an AuthProvider");
    }
    return context;
}


//creamos un contexto para poder usar esto valores desde cualquier componente en cual se engloba
export const AuthProvider = ({children}:any)=>{    

    const [user, setUser] = useState<any>(null)
    const [isAuthenticated, setisAuthenticated] = useState<any>(false)
    const [Errors, setErrors] = useState<any>([])

    const SingUp = async(values:any)=>{  
        try{    
            const res = await registerRequest(values)
            setUser(res.data)
            setisAuthenticated(true)
        }catch(error:any){   
            
            setErrors(error.response.data)
        }
    }

    const SingIn = async(values:any)=>{
        try{    
            const res = await loginRequest(values)
            setUser(res.data)
            setisAuthenticated(true)
        }catch(error:any){   
            if(Array.isArray(error?.response?.data)){ 
                return setErrors(error?.response?.data)
            }
            setErrors([error?.response?.data?.message])
        }
    }

    const LogOut = async()=>{
        try{    
            const res = await logOutRequest()
            setUser(res.data)
            setisAuthenticated(false)
        }catch(error:any){   
            if(Array.isArray(error?.response?.data)){ 
                return setErrors(error?.response?.data)
            }
            setErrors([error?.response?.data?.message])
        }
    }

    const reloginverifyToken = async()=>{   
        try{    
            const res = await reloginverifyTokenRequest()
            if(res.status === 200){    
                setUser(res.data)
                setisAuthenticated(true)
            }
            return res
        }catch(error:any){   
            if(Array.isArray(error?.response?.data)){ 
                return setErrors(error?.response?.data)
            }
            setErrors([error?.response?.data?.message])
        }
    }

    return( 
        <AuthContext.Provider   
            value={{
                SingUp,
                SingIn,
                user,
                LogOut,
                isAuthenticated,
                reloginverifyToken,
                Errors
            }}>  
            {children}
        </AuthContext.Provider>
    )
}