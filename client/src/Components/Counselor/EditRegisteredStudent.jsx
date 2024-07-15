import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Cslidebar from "./Cslidebar";
import { useParams,useLocation } from 'react-router-dom';
import Header from "../Header";
import Swal from 'sweetalert2'

const EditRegisteredStudent = () => {
  const [allcourse, setAllCourse] = useState();
  const [trainer, setTrainer] = useState()
  const [btnStatus, setBtnStatus] = useState("noEdit")
  const location = useLocation();
  const { data } = location.state;

  console.log('data registration =',data)

  let ContextValue = useContext(StudentContext);
  useEffect(() => {
    getAllCourse();
    getTrainer()
  }, []);

  const getAllCourse = async () => {
    let allCourse = await ContextValue.getAllBatchCourse();
    console.log("course =", allCourse.batchCourse[0].Course);
    setAllCourse(allCourse.batchCourse[0].Course);
  };

  const [inpval, setINP] = useState({
    Name: data.Name,
    Email: data.Email,
    Number: data.Number,
    Pname: data.Pname,
    Pnumber: data.Pnumber,
    RegistrationDate: data.RegistrationDate,
    Course: data.Course,
    Counselor: data.Counselor,
    CounselorId: data.CounselorId,
    RegistraionFees: data.RegistrationFees,
    TrainerName: data.TrainerName,
    TrainerId: data.TrainerId,
    BatchMode: data.BatchMode,
    Remark: data.Remark,
  });

  const addinpdata = async (e) => {
    e.preventDefault();
    let tempInpVal = inpval
    tempInpVal.RegistrationNo = data.RegistrationNo
    console.log('register value =', inpval,tempInpVal,data._id)
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)
    try {
      const res = await fetch(`http://localhost:8000/updateRegisterStudent/${data._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tempInpVal),
      });
     
      ContextValue.updateProgress(60)
      const registerData = await res.json();
      ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
      RegistrationEdit()
     
      console.log("Data", registerData)
    }
    catch (error) {
      console.log('error =', error.message)
    }
  };

  const RegistrationEdit=()=>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registration Edited',
      showConfirmButton: false,
      timer: 1500
    })
    
  }

  let trainerData = {}

  const getTrainer = async () => {
    const trainerData = await ContextValue.getAllTrainer();
    console.log("trainer data =", trainerData)
    setTrainer(trainerData)
  }

  const setTrainerData = (e) => {
    console.log('trainer data =',e.target.selectedIndex,trainerData[e.target.selectedIndex],trainerData)
    setINP({
      ...inpval,
      [e.target.name]: e.target.value,
      ["TrainerId"]: trainerData[e.target.selectedIndex]
    })
  }

  const EditClick =(e)=>{

    e.preventDefault()
    console.log('edit click')
    setBtnStatus('edit')
    let dateInput = document.querySelector('.date-input')
    let emailInput = document.querySelector('.email-input')
    dateInput.type="date"
    emailInput.type="email"

}

  return (
    <>

      <Header />
      <div className='sidebar-main-container'>
        <Cslidebar />
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Resigster Student</h4>
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
                  <div>
                    <form action="#" method="post">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              value={inpval.Name}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="Name"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Number</label>
                            <input
                              type="number"
                              value={inpval.Number}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="Number"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              value={inpval.Email}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="Email"
                              class="form-control email-input"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Parent Name</label>
                            <input
                              type="text"
                              value={inpval.Pname}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                  
                                })
                              }
                              name="Pname"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Parent Number</label>
                            <input
                              type="number"
                              value={inpval.Pnumber}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="Pnumber"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Registration Date</label>
                            <input
                              type="text"
                              value={inpval.RegistrationDate}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="RegistrationDate"
                              class="form-control date-input"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Counselor</label>
                            <input
                              type="text"
                              value={inpval.Counselor}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="Counselor"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Trainer Name </label>
                            {trainer && <select className="custom-select mr-sm-2" value={inpval.TrainerName} required name='TrainerName' onChange={(e) => setTrainerData(e)
                            }>
                              <option selected>Choose...</option>
                              {trainer.map((data,index) => {
                                trainerData[index+1] = data._id
                                return (
                                  <option value={data.Name}>{data.Name}</option>
                                )
                              })}

                            </select>
                            }
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Registration Fees</label>
                            <input
                              type="number"
                              value={inpval.RegistraionFees}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="RegistraionFees"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Batch mode</label>
                            <select
                              id="exampleInputPassword1"
                              type="select"
                              name="BatchMode"
                              class="form-control"
                              value={inpval.BatchMode}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            >
                              <option disabled selected>
                                --select Batch Mode--
                              </option>
                              <option value="online">Online</option>
                              <option value="offline">Offline</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Batch Course</label>
                            {allcourse && <select
                              id="exampleInputPassword1"
                              type="select"
                              name="Course"
                              class="form-control"
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            >
                              <option disabled selected>
                                --select Batch Mode--
                              </option>
                              {
                                allcourse.map((data) => {
                                  return <option value={data}>{data}</option>;
                                })}
                            </select>}
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Remark</label>
                            <input
                              type="text"
                            value={inpval.Remark}
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              name="Remark"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                        </div>

                        
                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                   { btnStatus==="noEdit" ? <button onClick={EditClick} className="btn btn-primary">
                                                        Edit
                                                    </button>:<button  onClick={addinpdata} className="btn btn-primary">
                                                        Submit
                                                    </button> }
                                                    <button type="submit" className="btn btn-light">
                                                        Cancel
                                                    </button>
                                                </div>

                  
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
};

export default EditRegisteredStudent;
