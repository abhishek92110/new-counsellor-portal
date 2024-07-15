import React, { useContext, useState, useHistory } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
// import StudentSignUp from './StudentSignUp'

export default function StudentLogout() {


  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  let ContextValue = useContext(StudentContext);

  const navigate = useNavigate();
  const fetchUserData = (e) => {
    e.preventDefault()
    console.log('login', login)

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: login.email, password: login.password })

    }).then(res => {
      return res.json()
    }).then(data => {

      if (data.status === "active") {
        console.log('data is true', data, data.username.status)

        ContextValue.updateStudent(login.email, login.password)
        localStorage.setItem('token', data.authtoken)
        localStorage.setItem('loggedInperson', JSON.stringify(data.username))
        ContextValue.updateLoggedInPerson(data.username)
        console.log('data username =', data.username)

        // navigate.push('/Home');
      }

      else {
        alert('you are not authorized')
        // console.log('data is false =', data.username.status)
        console.log('context ', ContextValue.student)
      }
    })
  }
  return (
    <div className="authincation h-100">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h4 className="text-center mb-4">Login in your account</h4>
                    <form action="index.html">
                      <div className="form-group">
                        <label>
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
                          value={login.email || ""}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
                          value={login.password || ""}
                        />
                      </div>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div className="form-group">
                          <div className="custom-control custom-checkbox ml-1">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="basic_checkbox_1"
                            >
                              Remember my preference
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <a href="page-forgot-password.html">Forgot Password?</a>
                        </div>
                      </div>
                      <div className="text-center">
                        <button onClick={fetchUserData} type="submit" className="btn btn-primary btn-block">
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p>
                        Don't have an account?{" "}


                        <Link className="text-primary" to="/StudentSignUp">Sign Up</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
