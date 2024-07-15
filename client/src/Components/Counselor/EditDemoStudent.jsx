import React, { useState, useEffect, useContext } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { StudentContext } from "../../context/StudentState";
import { useParams, useLocation } from "react-router-dom";
import Cslidebar from "./Cslidebar";

function Demo() {
  const ContextValue = useContext(StudentContext);
  const location = useLocation()

  const {data} = location.state
  const [trainer, setTrainer] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [studentId, setStudentId] = useState("");
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [inpval, setINP] = useState({
    Name: data.Name,
    Email: data.Email,
    Background: data.Background,
    Trainer: data.Trainer,
    TrainerId: data.TrainerId,
    CounselorId: data.CounselorId,
    CounselorName: data.CounselorName,
    Course: data.Course,
    Date: data.Date,
    Time: data.Time,
    classLink: data.classLink,
    DemoId:data.DemoId,
    status: "process",
  });



  const setTrainerDetail = (e) => {
    setINP({
      ...inpval,
      ["Trainer"]: e.target.value,
      ["TrainerId"]: TrainerData[e.target.value],
    });
  };

  const setdata = (e) => {
  
    const { name, value } = e.target;
    console.log("e.target.value =",name,value)
    setINP((preval) => ({
      ...preval,
      [name]: value,
    }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    console.log("edit detail =",inpval)
    const {
      Name,
      Email,
      Background,
      Trainer,
      Date,
      Time,
      Course,
      classLink,
      TrainerId,
      CounselorId,
      CounselorName,
      DemoId,
      status,
    } = inpval;

    


    try {
      const res = await fetch(`http://localhost:8000/updateDemoStudent/${data._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email,
          Name,
          Background,
          Trainer,
          TrainerId,
          CounselorId,
          CounselorName,
          Date,
          Course,
          classLink,
          status,
          DemoId
        }),
      });

      const updateDemoStudent = await res.json();
      console.log(updateDemoStudent);

      if (res.status === 422 || !updateDemoStudent) {
        alert("error");
      } else {
        console.log("data added");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const EditClick = (e) => {
    e.preventDefault();
    setSubmitStatus(true);
  };

  useEffect(() => {
    const fetchTrainer = async () => {
      const Trainer = await ContextValue.getAllTrainer();
      setTrainer(Trainer);
    };

    fetchTrainer();

  }, []);

  const TrainerData = {};
  return (
    <>
      
      <div className="sidebar-main-container">
      
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Schedule Demo</h4>
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
                    <a href="javascript:void(0);">Add Student</a>
                  </li>
                </ol>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-xxl-12 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Basic Info</h5>
                  </div>
                  <div className="card-body">
                    <form action="#" method="post">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={inpval.Name}
                              onChange={setdata}
                              name="Name"
                              disabled={!submitStatus}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Background</label>
                            <input
                              type="text"
                              className="form-control"
                              value={inpval.Background}
                              onChange={setdata}
                              name="Background"
                              disabled={!submitStatus}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={inpval.Email}
                              onChange={setdata}
                              name="Email"
                              disabled={!submitStatus}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Trainer</label>
                            <input
                              type="email"
                              className="form-control"
                              value={inpval.Trainer}
                              onChange={setdata}
                              name="Trainer"
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Demo Date</label>
                            <input
                              type="text"
                              className="form-control date-input"
                              value={inpval.Date}
                              onChange={setdata}
                              name="Date"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Demo Time</label>
                            <input
                              type="text"
                              className="form-control time-input"
                              value={inpval.Time}
                              onChange={setdata}
                              name="Time"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Course</label>
                            <input
                              type="email"
                              className="form-control"
                              value={inpval.Course}
                              onChange={setdata}
                              name="Course"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Class Link</label>
                            <input
                              type="text"
                              className="form-control"
                              value={inpval.classLink}
                              onChange={setdata}
                              name="classLink"
                              disabled
                            />
                          </div>
                        </div>
                        {/* <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group fallback w-100">
                              <label className="form-label">Feedback</label>
                              <br></br>
                              <label className="form-label">Register</label>
                              <input
                                class="form-control"
                                type="radio"
                                value="Register"
                                name="status"
                                checked={
                                  inpval.status === "Register" ? true : false
                                }
                                onChange={(e) =>
                                  setINP({
                                    ...inpval,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              ></input>
                              <label className="form-label">Process</label>

                              <input
                                class="form-control"
                                type="radio"
                                value="Process"
                                name="status"
                                checked={
                                  inpval.status === "Process" ? true : false
                                }
                                onChange={(e) =>
                                  setINP({
                                    ...inpval,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              ></input>
                              <label className="form-label">NotIntersted</label>

                              <input
                                class="form-control"
                                type="radio"
                                value="NotIntersted"
                                name="status"
                                checked={
                                  inpval.status === "NotIntersted"
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  setINP({
                                    ...inpval,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              ></input>
                            </div>
                          </div>
                        </div> */}
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        {submitStatus === false ? (
                          <button
                            onClick={(e) => EditClick(e)}
                            className="btn btn-primary"
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            type="submit"
                            onClick={addinpdata}
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        )}
                        <button type="submit" className="btn btn-light">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
