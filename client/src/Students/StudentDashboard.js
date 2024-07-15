import React, { useState, useEffect, useContext } from 'react'
import Assignment from './Assignment'
import AssignmnetStatus from './AssignmentStatus'
import Header from '../Components/Header'
import {useParams, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import AllMessage from './AllMessage'
import VideoAssignment from './VideoAssignment'
import Sidebar from '../Components/Sidebar'
import Swal from 'sweetalert2'
import StudentSlidebar from './StudentSlidebar';

export default function AboutStudent() {

  const { id } = useParams()
  console.log('id =', id)

  let ContextValue = useContext(StudentContext);
  const navigation = useNavigate()

  document.title = "StudentDashboard - About Student"

  const [message, setMessage] = useState()
  const [student, setStudent] = useState()
  const [batchDetail, setBatchDetail] = useState({
    batch:"",
    batchTime:"",
    batchTrainer:""
  })
  const [status, setStatus] = useState("Assignment")
  const [aboutStatus, setAboutStatus] = useState(true)

  useEffect(() => {

    fetchStudentStatus()

  }, [])

  async function fetchStudentStatus() {
    console.log('fetch student running')
    try {
      const status = await ContextValue.checkStudent();

      console.log('status of student =', status);
      if (status.status === "active") {
        console.log("student =",status.data)
        localStorage.setItem('studentBatch',status.data.Batch)
        setStudent(status.data)
        console.log('batch =',status.data.studentRunningBatch[0],status.data.studentRunningBatch)
        setBatchDetail({...batchDetail,["batch"]:status.data.studentRunningBatch[0], ["batchTime"]:status.data.BatchTiming,["batchTrainer"]:status.data.TrainerName})

        if(status.data.paymentStatus==='Notification'){
          Swal.fire({
            title: 'This is to inform you that your payment due date is near',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }

        if(status.data.paymentStatus==='pending'){
          Swal.fire({
            title: 'This is to inform you that you have not paid your fees Please immediately submit your fees',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        console.log('student id =',status.data._id)
        receivemessage(status.data._id)
        localStorage.setItem('studentData', JSON.stringify(status.data))
      }
      else {
        console.log('else fecth')
        navigation('/')
        alert('you are not authorized')
      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  async function fetchStudent(id) {
    console.log('fetch student running')
    try {
      const status = await ContextValue.getSingleStudent(id);

      console.log('status of student =', status);

      if (status.status === "active") {

        console.log('activedata =', status.userIndividual)
        receivemessage(status.userIndividual._id)
        localStorage.setItem('studentData', JSON.stringify(status.userIndividual))
        setStudent(status.userIndividual)        
        
      }
      else {
        console.log('else fetch')

      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const receivemessage = async (id) => {
    console.log('receive message')
    const messageRes = await fetch(`http://localhost:8000/receivemessage/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const messageData = await messageRes.json();
    console.log("messageData", messageData.message)
    setMessage(messageData.message)
    console.log("messageData",messageData.message)
  }

  const setStudentBatch = async(batch) =>{
    let batchData = await ContextValue.getBatchDetail(batch)
    setBatchDetail({batchDetail,["batch"]:batchData.Batch,["batchTime"]:batchData.BatchTime,["batchTrainer"]:batchData.Trainer})
    console.log("batch data =",batchData)
  }

  const [assignment, setAssignment] = useState("pending")
  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <StudentSlidebar />
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>About Student</h4>
                </div>
               {student && <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"
                        onChange={e=>setStudentBatch(e.target.value)}
                      >
                        <option disabled selected>--select Batch--</option>
                    
                    {student.studentRunningBatch.map(data=>{

                      return(
                          <option value={data}>{data}</option>
                      )

                    })}
                       
                        
                    </select>}
              </div>
         
            </div>
            <div className="row">
              <div className="col-xl-3 col-xxl-4 col-lg-4">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div
                        className="text-center p-3 overlay-box"
                        style={{ backgroundImage: "url(images/big/img1.jpg)" }}
                      >
                        <div className="profile-photo">
                          <img
                            src="images/profile/profile.png"
                            width={100}
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                        <h3 className="mt-3 mb-1 text-white">{student && student.Name}</h3>
                        <h3 className="mt-3 mb-1 text-white batch-text">{batchDetail && batchDetail.batch}</h3>
                      </div>


                    </div>
                  </div>
                
{/*           
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header d-block">
                        <h4 className="card-title">Message </h4>
                      </div>
                      <div className="card-body">
                        <textarea
                          placeholder="Enter a Message ..."
                        />
                      </div>
                      <button className="btn btn-primary">
                        Send

                      </button>
                    </div>
                  </div> */}

                </div>
              </div>
              <div className="col-xl-9 col-xxl-8 col-lg-8 w-65">
                <div className="card">
                  <div>
                    <div className="profile-tab">
                      <div className="custom-tab-1">
                        {status === "Assignment" && <div>
                          <ul className="nav nav-tabs" >
                            <li className="nav-item" >
                              <a
                                onClick={e => setAboutStatus(true)}
                                data-toggle="tab"
                                className="nav-link active show"
                              >
                                About
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                onClick={e => setAboutStatus(false)}
                                data-toggle="tab"
                                className="nav-link"
                              >
                                Message
                              </a>
                            </li>
                          </ul>
                        </div>
                        }
                        <div className="tab-content">
                          {aboutStatus === true ? <div id="about-me" className="tab-pane fade active show">
                            <div className="profile-personal-info pt-4">
                              <h4 className="text-primary mb-4">
                                Personal Information
                              </h4>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Enrollment No. <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.EnrollmentNo}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Email <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.email}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Phone <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.Number}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Course <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.Course}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Joining Date <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.BatchStartDate}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Trainer <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{batchDetail && batchDetail.batchTrainer}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Batch Time <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{batchDetail && batchDetail.batchTime}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    BatchMode <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.BatchMode}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Payment <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.Payment}</span>
                                </div>
                              </div>
                            </div>



                          </div> : <AllMessage message={message}/>}
{/* 
                          <div className='dashboard-navigation-section'>
                            <h4 onClick={e => setStatus("Assignment")}>Assignment</h4>
                            <h4 onClick={e => setStatus("VideoAssignment")}>Video</h4>
                          </div>
                          {status === "Assignment" && <div>
                            <ul className="nav nav-tabs" >
                              <li className="nav-item" >
                                <a
                                  onClick={e => setAssignment("pending")}
                                  data-toggle="tab"
                                  className="nav-link active show"
                                >
                                  Pending Assignment
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  onClick={e => setAssignment("submitted")}
                                  data-toggle="tab"
                                  className="nav-link"
                                >
                                  Submitted Assignment
                                </a>
                              </li>
                            </ul>


                            {assignment === "pending" ? <Assignment />
                              : <AssignmnetStatus />}
                          </div>
                          }
                          {status === "VideoAssignment" && <VideoAssignment />} */}

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
