
import axios from "axios";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./scss/principalPage.scss";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import FormRegister from "../components/FormRegister"



function PrincipalPage() {

  const {register,handleSubmit,formState:{errors}} = useForm()
  const {SingUp,SingIn,isAuthenticated,Errors,reloginverifyToken}:any = useAuth()
  const [formState, setformState] = useState(true)
  const navigate = useNavigate()


  
  const OnsubmitRegister = handleSubmit(async(values) =>{  
    if(formState){
      SingIn(values)
    }else{
      SingUp(values)
    }
  })

  const onSubmitSingUporSingIn =()=>{ 
    setformState(!formState)
  }

  

  useEffect(()=>{ 
    reloginverifyToken()
  },[])

  useEffect(()=>{ 
    if(isAuthenticated){  
      navigate("/HomeApp")
    }
  },[isAuthenticated])
 

  return (
    <div className="PrincipalPage">   
      <NavBar isAuthenticated={isAuthenticated}/> 


      
    </div>
  );
}

{/* <FormRegister 
            onSubmitSingUporSingIn={onSubmitSingUporSingIn}
            formState={formState}
            OnsubmitRegister={OnsubmitRegister}
            Errors={Errors}
            errors={errors}
            register={register}
          /> */}

export default PrincipalPage;
