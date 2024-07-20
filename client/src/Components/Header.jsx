import React, { useState, useContext } from 'react'
import logo from "./img/Uncodemy-logo-09.webp"
import { NavLink, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { StudentContext } from '../context/StudentState';
import { HashLoader } from "react-spinners";


// import man from "../Components/img/testimonial-2.jpg"
import { Link } from 'react-router-dom'
export default function Header() {
  let ContextValue = useContext(StudentContext);
  const navigation = useNavigate()
  const [progress, setProgress] = useState(50)
  console.log('bar Status=',ContextValue.barStatus)
  ContextValue.barStatus && console.log('bar Status context=',ContextValue.barStatus)

  const logOutHandle =()=>{

    console.log('log out')
    localStorage.clear()
    navigation('/')

  }

  return (

    <>
      {/* Navbar*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between ">
          {/* Left elements */}
          <div className="d-flex ">
            {/* Brand */}

            <a
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
              onClick={()=>{
                navigation('/counsellor')
              }}
            >
              <img className='uncodemy'
                src={logo}
                height={20}
                alt="Logo"
                loading="lazy"

              />
            </a>
            {/* Search form */}

          </div>




          {/* Search form */}
          <ul className="navbar-nav flex-row fixed_log">
            <li className="nav-item me-3 me-lg-1">

              {/* <div className="dropdown">
               <button
                  className="btn user btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                 <i class="fa fa-sign-out" aria-hidden="true" onClick={logOutHandle}></i> - Log Out<br></br>



                </div>

              </div> */}

            </li>

          </ul>
          {/* Right elements */}
        </div>
      </nav>

      <div>
      <LoadingBar
        color='#f11946'
        progress={ContextValue.progress}
        onLoaderFinished={() => setProgress(0)}
      />
      
     {  ContextValue.barStatus 
     
     && (
      <>
      <div className='pos-center'>
        <HashLoader color="#3c84b1" />
      </div>
      <div className='blur-background'></div>
      </>
    )}

{/* <div className='pos-center'>
        <HashLoader color="#3c84b1" />
      </div> */}

      {/* <button onClick={() => setProgress(progress + 10)}>Add 10%</button>
      <button onClick={() => setProgress(progress + 20)}>Add 20%</button>
      <button onClick={() => setProgress(100)}>Complete</button>  */}
      {/* <br /> */}
    </div>

      {/* Navbar */}
    </>





  )
}
