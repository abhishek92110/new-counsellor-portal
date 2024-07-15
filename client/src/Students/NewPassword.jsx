
import './loginStyle.css'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import { Link } from "react-router-dom";


export default function Newpassword() {

  document.title="StudentDashboard - Create New Password"



    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    var urlObject = new URL(document.location.href);
    var params = urlObject.searchParams;
    let token = params.get("token")
    let username = params.get("user")
    console.log('token =',token)
    console.log('user =',username)
    console.log('link =',username)

  const [user, setUser] = useState("none")

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  let ContextValue = useContext(StudentContext);

  const history = useNavigate();
 

  const setNewPassword = async (e) => {
    console.log('new password running')
    e.preventDefault()

    if (password.newPassword === password.confirmPassword) {
        let data = await fetch('http://localhost:8000/newpassword', {
            method: 'POST',
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "newpassword": password.newPassword, "user":username })
        })

        let response = await data.json()
        console.log("data =", response)
    }
    else {
        alert('password must be same')
    }

}
  return (
    <>
      <div className='main'>
        <div className='main-container'>
          <div className='img-side col-sm-6 px-0 d-none d-sm-block'>
            <div className='left-img'></div>
          </div>
          <div className='button-side'>
            <h2>Welcome to UnCodemy</h2>
            
            <div className="inputfield">
              <h2>Create New Password</h2>
              <form className='form' onSubmit={e => setNewPassword(e)}>
                <div className='username' >
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter New Password"
                    name="newPassword"
                    onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                    
                  />
                </div>
                <div className='password'><input type="Password"
                  className="form-control mt-1"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                 onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                  
                />
                </div>
                {/* <input type='button' class="btn btn-primary"/> */}
                <button class="btn btn-primary" type="button" onClick={e => setNewPassword(e)}>Submit</button>
                {/* <div class="d-grid gap-2 submitbutton">

                </div> */}
              </form>
            </div>
          </div>



        </div>
      </div>
    </>
  )
}
