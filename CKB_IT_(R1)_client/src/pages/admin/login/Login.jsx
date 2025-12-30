import { getAdmins } from "../../../utils/requester"
import { useState } from "react"

const Login = ({ setLogged, setPageMode }) => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  function formError(){
      const elements = document.querySelectorAll('.login-input');
      const errClass = 'login-err'

      elements.forEach(element=>{
        element.classList.add(errClass);
        setTimeout(function() {
          element.classList.remove(errClass);
        }, 1000);
      })
      
    
  }

  function formSuccess(){
      setLogged(true)
      setPageMode(1)
  }


  async function formSubmission(){
    try{
        const loginPassed = await getAdmins({
          "name": name, "password": password
        })
        if(loginPassed)
          formSuccess()
    }
    catch(err){
      formError()
    }
  }



  return (
    <div id='loginContainer'>
      <div className="ml-60 w-1/2 py-15">
            <div className="text-4xl py-3 text-blue-500 bg-white px-4 border-b-black"> Admin Registration </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input className="p-3 w-full login-input text-black" type="text" placeholder="Enter Admin Username" onChange={changeName}/>

              <br/> <br/>  <br/> <br/> 

              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                Password
              </label>
              <input className="p-3 w-full login-input text-black" type="text" placeholder="Enter Admin Passowrd" onChange={changePassword}/>
              
              <button className="bg-blue-400 p-3 text-lg mt-10 w-20" id="login-btn" onClick={formSubmission}> Login </button>
            </div>
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 IT-UTSAV 2024 (USCS)
          </p>
      </div>
    </div>
  )
}

export default Login