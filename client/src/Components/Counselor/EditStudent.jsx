import React, { useState, useEffect, useContext } from 'react'
import Assignment from './Assignment'
import AssignmnetStatus from './AssignmnetStatus'
import Header from '../Components/Header'
import {useParams, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import AllMessage from './AllMessage'
import VideoAssignment from './VideoAssignment'
import Sidebar from '../Components/Sidebar'


export default function AboutStudent() {

  const { id } = useParams()
  console.log('id =', id)

  let ContextValue = useContext(StudentContext);
  const navigation = useNavigate()

  document.title = "StudentDashboard - About Student"

  const [message, setMessage] = useState()
  const [student, setStudent] = useState()
  const [status, setStatus] = useState("Assignment")
  const [aboutStatus, setAboutStatus] = useState(true)

  useEffect(() => {

    fetchStudent(id)

  }, [])

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
        console.log('student =',status.userIndividual)
        
      }
      else {
        console.log('else fecth')

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

  const [assignment, setAssignment] = useState("pending")
  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <Sidebar />
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>About Student</h4>
                </div>
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">
                    <a href="javascript:void(0);">Students</a>
                  </li>
                  <li className="breadcrumb-item active">
                    <a href="javascript:void(0);">About Student</a>
                  </li>
                </ol>
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
                        <h3 className="mt-3 mb-1 text-white">{student && student.Batch}</h3>
                      </div>


                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">About me</h2>
                      </div>
                      <div className="card-body pb-0">

                        <ul className="list-group list-group-flush">

                          <li className="list-group-item d-flex px-0 justify-content-between">
                            <strong>Course</strong>
                            <span className="mb-0">{student && student.Course}</span>
                          </li>
                          <li className="list-group-item d-flex px-0 justify-content-between">
                            <strong>Email</strong>
                            <span className="mb-0">{student && student.email}</span>
                          </li>
                          <li className="list-group-item d-flex px-0 justify-content-between">
                            <strong>Phone</strong>
                            <span className="mb-0">{student && student.Number}</span>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header d-block">
                        <h4 className="card-title"> Student Remarks </h4>
                      </div>
                      <div className="card-body">
                        <div className='message-section mb-2'>
                          <strong className='justify-content-center'>remarks</strong>
                          <strong className='justify-content-center'>date</strong>
                        </div>
                        {student && student.Remark.map((data, index) => {
                          return (
                            <li className="mb-0 ">
                              <div className='message-section'>
                                <span className='justify-content-center'>{data.message}</span>
                                <span className='justify-content-center'>{data.date}</span>
                              </div>

                            </li>
                          )
                        })}

                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header d-block">
                        <h4 className="card-title">Address </h4>
                      </div>
                      <div className="card-body">
                        <p className="mb-0">
                          Demo Address #8901 Marmora Road Chi Minh City, Vietnam
                        </p>
                      </div>
                    </div>
                  </div> */}
            

                </div>
              </div>
              <div className="col-xl-9 col-xxl-8 col-lg-8">
                <div className="card">
                  <div className="card-body">
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
                                  <span>{student && student.TrainerName}</span>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Batch <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.BatchTiming}</span>
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
                          {status === "VideoAssignment" && <VideoAssignment />}

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
