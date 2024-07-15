import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const RegistartionHome = () => {

    const navigate = useNavigate();


    const moveToAddStudent = () => {
        navigate("Add-Registered-Student");
      };

  return (
    <div>
          <Header />
          <div className="sidebar-main-container">
         <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-secondary">
                    <div className="card-body">
                      <div className="media">
                        <span className="mr-3">
                        <i class="fa-solid fa-plus"/>
                        </span>
                        <div
                          className="media-body text-white"
                          onClick={moveToAddStudent}
                        >
                          <p className="mb-1">Add Registration</p>
                          {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                          {/* <small>76% Increase in 20 Days</small> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
    </div>
  )
}

export default RegistartionHome