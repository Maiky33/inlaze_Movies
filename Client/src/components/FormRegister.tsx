import "./scss/formRegister.scss"
import SignUpImg from "../images/Signup.png"
import LoginImg from "../images/Login.png"
import { IoIosArrowDropleft } from "react-icons/io";

function FormRegister(props:any) {

  const { 
    formState,
    OnsubmitRegister,
    Errors,
    errors,
    register,
    setformState,
    setformActive
  } = props


  return (
    <div className="ContainerForm"> 
      <div className="ContaineFormAndButtonExit"> 
        <div className="containerIconBack"> 
          <IoIosArrowDropleft onClick={()=>setformActive(false)} className="iconBack"/>
          <p>Back</p>
        </div>
        <div className="containerButtonsLogin"> 
          <div className="ButtonsLogin"> 
            <button onClick={()=>{setformState(false)}} className={formState? "LogIn" : "SignUp"}>Sign up</button>
            <button onClick={()=>{setformState(true)}} className={!formState? "LogIn" : "SignUp"}>Log in</button>
          </div>
        </div>
      
        <p className="Welovehaving">We love having you back</p>
        <form onSubmit={OnsubmitRegister} className="FormContain">
          { 
            Errors.map((error:any, i:number)=>(  
              <div className="ErrorPost" key={i}> 
                {error}
              </div>
            ))
          }
          {
            !formState?
            <div className="containinputText"> 
              <input placeholder="Enter your Name" className="usernameInput" type="text" {...register('name', {required:true})}/>
              {
                errors.userName && <p className="errorData">UserName is Required</p>
              }
            </div>:null
          }


          <div className="containinputText"> 
            <input placeholder="Enter your Email" className="emailInput" type="email" {...register('email', {required:true})}/>
            {
              errors.email && <p className="errorData">Email is Required</p>
            }
          </div>

          <div className="containinputText"> 
            <input placeholder=". . . . . ." className="passwordInput" type="password" {...register('password', {required:true})}/>
            {
              errors.password && <p className="errorData">Password is Required</p>
            }
          </div>

          
          <div className="containerButtonSingUpSend"> 
            <button className="ButtonSingUpSend" type="submit">  
              {!formState? 'Sing Up' : 'Sing In'}
            </button>
          </div>
        </form>
      </div>

      <div className="WelcomeAndImage"> 
        <div className="TitleContainer"> 
          <h2>Welcome to Inlaze Movies!</h2>
          <p>{!formState? "🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!" : "🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"}</p>
        </div>
        <img src={!formState? SignUpImg : LoginImg} alt="" />
      </div>
    </div>
  );
}

export default FormRegister;
