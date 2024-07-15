import React from 'react'
import logo from "./img/logo.jpg"
import { NavLink, useNavigate } from 'react-router-dom';
// import man from "../Components/img/testimonial-2.jpg"
import { Link } from 'react-router-dom'
export default function Cheader() {
  const navigation = useNavigate()

  const logOutHandle =()=>{
    console.log('log out')
    localStorage.clear()
    navigation('/')
  }
  return (

    <>
      {/* Navbar*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between">
          {/* Left elements */}
          <div className="d-flex ">
            {/* Brand */}

            <a
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
              href="#"
            >
              <img className='uncodemy'
                src={logo}
                height={20}
                alt=" Logo"
                loading="lazy"

              />
            </a>
            {/* Search form */}

          </div>




          {/* Search form */}
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3 me-lg-1">

              <div className="dropdown">
               <button
                  className="btn user btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* <img className='log' src={man} alt="" /> */}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                 <i class="fa fa-sign-out" aria-hidden="true" onClick={logOutHandle}></i> - Log Out<br></br>



                </div>









              </div>








            </li>













          </ul>
          {/* Right elements */}
        </div>
      </nav>
      {/* Navbar */}
    </>





  )
}
