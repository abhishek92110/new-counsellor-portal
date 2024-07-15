import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigation } from 'react-router-dom'
import { updatedata } from '../context/ContextProvider';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { StudentContext } from '../context/StudentState';

export default function EditStudents() {

  let ContextValue = useContext(StudentContext);



  const [inpval, setINP] = useState({
    Name: '',
    Batch: '',
    email: '',
    Number: '',
    Pname: '',
    Pnumber: '',
    RegistrationDate: '',
    Course: '',
    Counselor: '',
    Fees: '',
    RegistrationFees: '',
    TrainerName: '',
    BatchStartDate: '',
    BatchTiming: '',
    BatchMode: '',
    Payment: '',
    Remark: "",
    status: 'active',
    Days: '',
    file: null,
    TrainerID:'',
    CounselorID:'',
    url: '' // Add a file state
  });

  const [counselor, setCouselor] = useState()
  const [selectedRunningBatch, setSelectedRunningBatch] = useState()
  const [runningBatch, setRunningBatch] = useState()
  const [allBatch, setAllBatch] = useState([])
  const [trainer, setTrainer] = useState('')
  let counselorData = {}

  const setdata = (e) => {
    console.log(e.target.value);
    const { Name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [Name]: value
      }
    })
  }


  const { id } = useParams();
  console.log("id",id);

  const getdata = async () => {

    const res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      console.log("get data ",data.userIndividual);
      data.userIndividual.Remark = ""
      setINP(data.userIndividual)
    }
  }

  useEffect(() => {
    getdata();
    fetchAllBatchCourse();
    fetchRunningBatch();
    fetchAllCounselor();
  }, []);

  async function fetchAllBatchCourse() {
    try {
      const status = await ContextValue.getAllBatchCourse();
      if (status.status === "active") {

        setAllBatch(status.batchCourse[0].Course)
      }
      else {

      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  async function fetchRunningBatch() {
    try {
      const status = await ContextValue.getRunningBatch();

      if (status.status === "active") {

        setRunningBatch(status.runningBatches)
        setSelectedRunningBatch(status.runningBatches)
      }
      else {

      }

    } catch (error) {
      // console.error('Error fetching admin status:', error);
    }
  }

  const fetchAllCounselor = async () => {
    const counselorData = await ContextValue.getAllCounselor();

    if (counselorData.status === "active") {
      setCouselor(counselorData.counselorData)

    }
  }

  const updateStudent = async (e) => {
    e.preventDefault();
console.log('update student  =',inpval)
    const formData = new FormData();

    let tempInpVal = {...inpval}

    console.log('temp inp val =',tempInpVal)

    // for (const field in inpval) {
    //   formData.append(field, inpval[field]);
    // }

    let remainingFees  =(inpval.Fees - inpval.RegistrationFees)
    // formData.append(remainingFees, remainingFees);
    tempInpVal.remainingFees = remainingFees

    try {
      const res = await fetch(`http://localhost:8000/updateuser/${id}`, {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(tempInpVal),
      });

      const data = await res.json();
      if (res.status === 422 || !data) {

        alert('error');
      } else {
        alert('student added')
        // let tempInpval = inpval
        // for (const field in inpval) {
        //   tempInpval[field]="";
        // }
        // setINP(tempInpval)
        // console.log('temp inpval =',tempInpval)
      }
    }
    catch (error) {
      console.log('error =', error.message)
    }
  };

  const handleFileChange = (e) => {
    console.log("file =", e.target.files[0])
    setINP({ ...inpval, file: e.target.files[0] });
  };

  const setCourse = (name, value) => {
    setINP({ ...inpval, [name]: value })

    let splitCourse = value.split(' ');
    let shortCourse = '';
    splitCourse.map(data => {
      shortCourse = `${shortCourse}${data[0]}`
    })

    let tempRunningBatch = runningBatch.filter(data => {

      return shortCourse === (data.Batch.split('/')[0])
    })


    setSelectedRunningBatch(tempRunningBatch)
  }

  const setBatch = async (name, value) => {

    setINP({ ...inpval, [name]: value })

    let tempTrainer = selectedRunningBatch.filter(data => {
      return data.Batch === value ? data : false
    })
    setTrainer(tempTrainer[0].Trainer)
    console.log("temp trainer =",tempTrainer)

    let tempInpval = { ...inpval }
    tempInpval.TrainerName = tempTrainer[0].Trainer
    tempInpval.BatchTiming = tempTrainer[0].BatchTime
    tempInpval.Batch = tempTrainer[0].Batch
    tempInpval.TrainerID = tempTrainer[0].TrainerID
    setINP(tempInpval)
  }

  const handleRemarkChange = (e) => {
    const newRemark = e.target.value;

    let tempInpVal = {...inpval}
    console.log("before tempinp val =",tempInpVal.Remark)
    tempInpVal.Remark = newRemark
    console.log("after temp val =",tempInpVal.Remark)

    setINP(tempInpVal)
  };

  const setCounselor = (name)=>{
    let tempInpval = { ...inpval }
    tempInpval.Counselor = name
    tempInpval.CounselorID = counselorData[name]
    console.log("counselor id =",counselorData[name])
    console.log('set counselor =',name,counselorData,counselorData[name],tempInpval)
    setINP(tempInpval)
  }
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
                  <h4>Edit Student</h4>
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
                          <input required type="text" value={inpval.Name} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Number</label>
                          <input required type="number" value={inpval.Number} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Number" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input required type="email" value={inpval.email} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="email" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Parent Name</label>
                          <input required type="text" value={inpval.Pname} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Pname" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Parent Number</label>
                          <input required type="number" value={inpval.Pnumber} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Pnumber" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Batch Starting Date</label>
                          <input required type="date" value={inpval.BatchStartDate} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="BatchStartDate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Registration Date</label>
                          <input required type="date" value={inpval.RegistrationDate} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="RegistrationDate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Course</label>
                          {allBatch.length !== 0 && <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Course"
                            class="form-control"
                           
                            value={inpval.Course}
                            onChange={e => setCourse(e.target.name, e.target.value)}>
                            <option disabled selected>--select Course--</option>
                           { allBatch.map((data, index) => {

                              return (
                                <>
                                  <option value={data} key={index}>{data}</option>
                                </>
                              )


                            })}

                          </select>
  }
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Batch</label>
                          {selectedRunningBatch &&   <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Batch"
                            class="form-control"
                          
                            value={inpval.Batch}
                            onChange={e => setBatch(e.target.name, e.target.value)}>
                            <option disabled selected>--select Batch--</option>
                            { selectedRunningBatch.map(data => {
                  
                              return (
                                <option value={data.Batch}>{data.Batch}</option>

                              )
                            })}

                          </select>
  }
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Days</label>
                          <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Days"
                            class="form-control"
                            value={inpval.Days}
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Days--</option>
                            <option value="WeekDays">WeekDays</option>
                            <option value="WeekEnd">WeekEnd</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Couselor</label>
                          {counselor &&   <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Counselor"
                            class="form-control"
                            value={inpval.Counselor}
                            onChange={e => setCounselor(e.target.value)}>
                            <option disabled selected>--select Counselor--</option>
                            
                            {counselor.map(data => {
                              counselorData[data.Name] = data._id
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
                          <label className="form-label">Fees</label>
                          <input required type="text" value={inpval.Fees} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Fees" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Trainer Name </label>
                          <input required type="text" value={inpval.TrainerName} name="TrainerName" onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} readonly={true} class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Registration Fees</label>
                          <input required type="text" value={inpval.RegistrationFees} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="RegistrationFees" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>



                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Batch mode</label>
                          <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="BatchMode"
                            class="form-control"
                            value={inpval.BatchMode}
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Batch Mode--</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Payment Mode</label>
                          <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Payment"
                            class="form-control"
                            value={inpval.Payment}
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Payment--</option>
                            <option value="online">EMI</option>
                            <option value="offline">Installment</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group fallback w-100">
                          <label className="form-label">Add Remark</label>
                          <input required type="text" onChange={handleRemarkChange} name="Remark" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group fallback w-100">
                            <label className="form-label">Status</label>
                            <br></br>
                            <label className="form-label">Active</label>
                            <input class="form-control" type='radio' value="active" name='status' checked={inpval.status === "active" ? true : false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                            <label className="form-label">Deactive</label>

                            <input class="form-control" type='radio' value="deactive" name='status' checked={inpval.status === "deactive" ? true : false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                            <label className="form-label">BackOut</label>

                            <input class="form-control" type='radio' value="backout" name='status' checked={inpval.status === "backout" ? true : false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                            <label className="form-label">Pending</label>

                            <input class="form-control" type='radio' value="pending" name='status' checked={inpval.status === "pending" ? true : false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <button type="submit" onClick={updateStudent} className="btn btn-primary">
                          Submit
                        </button>
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




  )
}
