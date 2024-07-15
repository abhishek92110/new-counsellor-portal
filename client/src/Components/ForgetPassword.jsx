import React, {useState, useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { StudentContext } from "../context/StudentState";


const ForgetPassword = () => {
    document.title="StudentDashboard - Forget Password"
    const location = useLocation()
    const navigate = useNavigate()
    let ContextValue = useContext(StudentContext);

    const {user} = location.state 
    console.log("forget password user =",user)

    const [checkPasswordStatus, setCheckPasswordStatus] = useState(false)
    const [login, setLogin] = useState({
        email: "",
        password: "",
        confirmPassword:""
      })

      const fetchUserData = async(e) => {

        e.preventDefault()
        console.log('login', login)
        ContextValue.updateProgress(30)
        ContextValue.updateBarStatus(true)

        let data = await fetch(`http://localhost:8000/updatePassword/${user}`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: login.email, password: login.password })
  
      })

   
    ContextValue.updateProgress(60)
    data = await data.json()
    ContextValue.updateProgress(100)
    ContextValue.updateBarStatus(false)
    if(data.status==="active"){
        passwordUpdate()
    }
    else if(data.status==="false" || data.status==="deactive"){
        Swal.fire({   
            icon:  'error',
            title: 'Email is Incorrect',
            text:  'Something went wrong!',
          })
    }
            
      }

      const passwordUpdate=()=>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Password Changed',
          showConfirmButton: false,
          timer: 1500
        })

        navigate(`/${user}`);
        
      }

      const checkPassword  = (password)=>{

           if(login.password!==password){
            setCheckPasswordStatus(true)
           }
           else{
            setCheckPasswordStatus(false)
           }

      }

  return (
    <div className='main'>
    <div className='main-container'>
    <div className='img-side col-sm-6 px-0 d-none d-sm-block'>
      <div className='left-img'></div>
    </div>
    <div className='button-side'>
    <h2>Change Password</h2>

    <div className="inputfield">
      {/* <h2>{user != "none" && user} Sign In</h2> */}
      <form className='form'>
        <div className='username' >
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
            
          />
        </div>
        <div className='password'><input type="Password"
          className="form-control mt-1"
          placeholder="Enter New Password"
          name="password"
          onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
          
        />
        </div>
        <div className='password'><input type="Password"
          className="form-control mt-1"
          placeholder="Confirm New Password"
          name="confirmPassword"
          onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }); checkPassword(e.target.value)} }    
        />
        </div>
        {/* <div className="forgetpassword"><Link to='/forget'> <label className='lab'>Forgot Password?</label></Link></div> */}
       
      {checkPasswordStatus && <strong>Confirm Password must be same</strong>}
       
        <div class="d-grid gap-2 submitbutton">
          <button class="btn btn-primary" type="button" onClick={fetchUserData}>Change Password</button>

        </div>
      </form>
    </div>
  </div>

  </div>
      </div>
  )
}

export default ForgetPassword