import "./scss/formRegister.scss"


function FormRegister(props:any) {

  const { 
    onSubmitSingUporSingIn,
    formState,
    OnsubmitRegister,
    Errors,
    errors,
    register
  } = props

  return (
    <div className="ContainerForm"> 
      <div className="containeButtonsRegiter"> 
        <button onClick={onSubmitSingUporSingIn} className={"singUporSingIn"} type="submit">
          {!formState? "Sing Up" : "Sing In"}
        </button>
      </div>

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
            <p className="userNameText">UserName</p>
            <input placeholder="Enter your Name" className="usernameInput" type="text" {...register('userName', {required:true})}/>
            {
              errors.userName && <p className="errorData">UserName is Required</p>
            }
          </div>:null
        }


        <div className="containinputText"> 
          <p className="userNameText">E-mail</p>
          <input placeholder="Enter your Email" className="emailInput" type="email" {...register('email', {required:true})}/>
          {
            errors.email && <p className="errorData">Email is Required</p>
          }
        </div>

        <div className="containinputText"> 
          <p className="userNameText">Password</p>
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
  );
}

export default FormRegister;
