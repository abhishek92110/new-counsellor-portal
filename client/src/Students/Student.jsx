import React, { useState, useEffect } from 'react'
import Assignment from './Assignment'
import AssignmnetStatus from './AssignmnetStatus'
import OtherLink from './OtherLink'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { useParams } from 'react-router-dom';
import StudentSlidebar from './StudentSlidebar'


export default function Student() {

  const [message, setMessage] = useState()
  const [student, setStudent] = useState()

  const { id } = useParams();
  useEffect(() => {

    receivemessage()

  }, [])

  const receivemessage = async () => {
    console.log('receive message')
    const messageRes = await fetch(`http://localhost:8000/receivemessage/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    });

    const messageData = await messageRes.json();

    setMessage(messageData.message)



    const res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setStudent(data)


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
                        <h3 className="mt-3 mb-1 text-white">Deangelo Sena</h3>
                      </div>


                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">about me</h2>
                      </div>
                      <div className="card-body pb-0">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
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
                        <h4 className="card-title">Recevied Msg </h4>
                      </div>
                      <div className="card-body">
                        {message && message.map((data, index) => {
                          return (
                            <li className="mb-0 ">
                              <span className='justify-content-center'>{data}</span>
                            </li>
                          )
                        })}

                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
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
                  </div>

                </div>
              </div>
              <div className="col-xl-9 col-xxl-8 col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-tab">
                      <div className="custom-tab-1">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href="#about-me"
                              data-toggle="tab"
                              className="nav-link active show"
                            >
                              About Me
                            </a>
                          </li>
                          <li className="nav-item">
                            <Link to="/AllMessage">Message</Link>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div id="about-me" className="tab-pane fade active show">
                            <div className="profile-personal-info pt-4">
                              <h4 className="text-primary mb-4">
                                Personal Information
                              </h4>
                              <div className="row mb-4">
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                  <h5 className="f-w-500">
                                    Name <span className="pull-right">:</span>
                                  </h5>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                  <span>{student && student.Name}</span>
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
                                  <span>{student && student.JoiningDate}</span>
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
                            </div>



                          </div>

                          <h2>Assignment</h2>
                          <ul className="nav nav-tabs">
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
                        <OtherLink />
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
