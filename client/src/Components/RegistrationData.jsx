import React, { useEffect, useContext, useState } from 'react'
import man from "../Components/img/testimonial-2.jpg"
import { Link, useNavigate, useLocation  } from 'react-router-dom'
import { StudentContext } from '../context/StudentState';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import Swal from 'sweetalert2'

// import Home from '../Components/Home'
// import Header from '../Components/Header'

export default function RegistrationData(props) {

  let  registerStudentData

  const location = useLocation();

  if(props.registerStudent)
  {
    console.log('if',props.registerStudent)
    const  registerStudent  = props.registerStudent;
    registerStudentData = registerStudent
  }
  else{
    console.log('else')
    const { registerStudent } = location.state;
    registerStudentData = registerStudent
  }
  console.log("all student =",registerStudentData)

  let ContextValue = useContext(StudentContext);
  document.title  = "StudentDashboard - All Student"
  const navigation = useNavigate()

  const registerStatus = {
    Process: "warning",
    Added: "success",
    BackOut: "dark"
  }


  return (

    <>

     
       

        <div style={{ minWidth: "876px" }}>
          {/* row */}
          <div className="container-fluid">
          
            <div className="row">
              <div className="col-lg-12">

              </div>
              <div className="col-lg-12">
                <div className="row tab-content">
                  <div id="list-view" className="tab-pane fade active show col-lg-12">
                    <div className="card w-80">
        
                      <div >


                        <div class="row p-20">

                          <div class="col-md-12">


                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                              <thead>
                                <tr>
                                  <th>Registration No.</th>
                                  <th>Name</th>
                                  <th>Contact</th>
                                  <th>Counselor</th>
                                  <th>Trainer</th>
                                  <th>Registration Date</th>
                                  <th>course</th>
                                  <th>Call</th>
                                  <th>Email</th>
                                  <th>Status</th>
                                 

                                </tr>
                              </thead>



                              <tbody>
                                {registerStudentData && registerStudentData.map((data, index) => {

                                  return (
                                    <tr>

                                      <td>{data.RegistrationNo}</td>
                                      <td>{data.Name}</td>
                                      <td>{data.Number}</td>
                                      <td>{data.Counselor}</td>
                                      <td>{data.TrainerName}</td>
                                      <td>{data.RegistrationDate}</td>
                                      <td>{data.Course}</td>
                                      <td><a href={`tel:${data.Number}`}><AddIcCallIcon/></a></td>
                                      <td><a href={`mailto:${data.Email}`}><EmailIcon/></a></td>
                                      <td>
                                      <span className={`badge badge-rounded badge-${registerStatus[data.status]}`}>
                                    {data.status}
                                  </span>
                                      </td>
                                    </tr>
                                  )
                                })
                                }

                              </tbody>
                            </table>


                          </div>
                        </div>
                      </div>










                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
  

    </>






  )
}
