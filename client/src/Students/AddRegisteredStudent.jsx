import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import Swal from 'sweetalert2'
import CreateIcon from '@mui/icons-material/Create';
import { StudentContext } from '../context/StudentState';


export default function AddRegisteredStudent
  () {

    const location = useLocation();
    const { data } = location.state;

    let reference = data.RegistrationNo.split('/')[1].split('-')
    reference = reference[(reference.length-1)]

    console.log("register data =",data)

  document.title = "StudentDashboard - Add Student"
  let ContextValue = useContext(StudentContext);
  const navigation = useNavigate()
  // let navigate = useNavigate();


  const [allBatch, setAllBatch] = useState([])
  const [runningBatch, setRunningBatch] = useState()
  const [methodStatus, setMethodStatus] = useState();
  const [course, setCourse] = useState();
  const [allcourse, setAllCourse] = useState();
  const [registrationDateStatus, setRegistrationDateStatus] = useState(false)
  const [batchJoinStatus, setBatchJoinStatus] = useState(false)
  const [selectedRunningBatch, setSelectedRunningBatch] = useState()
  const [trainer, setTrainer] = useState('')
  const [counselor, setCouselor] = useState()
  const [editStatus, setEditStatus] = useState([true, true, true, true, true, true, true, true, true, true, true, true, true, true, true])
  let counselorData = {}
  let trainerData   = {}

  useEffect(() => {
    fetchAllBatchCourse();
    fetchRunningBatch();
    fetchAllCounselor();
    getAllCourse();
    
    // setUpdateEditStatusFunc();

  }, [])

  const getAllCourse = async () => {
    let allCourse = await ContextValue.getAllMainSubCourse();
    console.log("course =", allCourse, allCourse.courses);
    setCourse(allCourse.allCourse);
    setAllCourse(allCourse.courses);
  };

  const fetchAllCounselor = async () => {
    const counselorData = await ContextValue.getAllCounselor();

    if (counselorData.status === "active") {
      setCouselor(counselorData.counselorData)

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

  var length = 8,
    charset = "abcdefghijklmnop.,qrstuvwx$%yzABCDEF.,'908*&+GHIJKLMN@#$%!,OPQ!@RSTUVWXY0123456789",
    randomGeneratedPassowrd = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    randomGeneratedPassowrd += charset.charAt(Math.floor(Math.random() * n));
  }

  // const { udata, setUdata } = useContext(adddata);
  const navigate = useNavigate();

  let installmentStatus = data.totalInstallment==="null"?true:false

  const [inpval, setINP] = useState({
    Name: data.Name,
    Batch: '',
    Email: data.Email,
    Number: data.Number,
    Pname: data.Pname,
    Pnumber: data.Pnumber,
    RegistrationDate: data.RegistrationDate,
    Course: data.Course,
    subCourse:data.subCourse,
    Counselor: data.Counselor,
    Fees: '',
    totalInstallment:data.totalInstallment,
    RegistrationFees: data.RegistrationFees,
    TrainerName: data.TrainerName,
    BatchStartDate: '',
    BatchTiming: '',
    BatchMode: data.BatchMode,
    PaymentMode: data.PaymentMode,
    PaymentMethod:data.PaymentMethod,
    Payment: '',
    Remark: data.Remark,
    CourseFees:data.CourseFees,
    RegistrationNo:data.RegistrationNo,
    CounselorID:data.CounselorId,
    counselorNumber:data.counselorNumber,
    counselorReference:reference,
    joinTime: data.joinTime,
    joinDate: data.joinDate,
    month: data.month,
    year: data.year,
    index:data.index,
    courseCode:data.courseCode,
    url: '' // Add a file state
  });



  const handleFileChange = (e) => {
    // console.log("file =", e.target.files[0])
    setINP({ ...inpval, file: e.target.files[0] });
  };


  const dateConvert = (selectedDate) => {
    const originalDate = new Date(selectedDate);
    const formattedDate = originalDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  };


  const addinpdata = async (e) => {
    e.preventDefault();

    console.log('inpval add student =',inpval)


    let tempInpVal = inpval;

    if(registrationDateStatus===true)
    {
    let dateArray = tempInpVal.RegistrationDate.split("-");
    console.log("regsitration array =", dateArray);
    tempInpVal.RegistrationDate = dateConvert(tempInpVal.RegistrationDate);
    tempInpVal.joinDate = dateConvert(tempInpVal.joinDate);
    tempInpVal.month = dateArray[1];
    tempInpVal.year = dateArray[0];
    }

    if(batchJoinStatus===true){
      tempInpVal.joinDate = dateConvert(tempInpVal.joinDate);
    }

    if(tempInpVal.PaymentMethod==="OTP"){

      tempInpVal.totalInstallment="null"

    }

    

    if(tempInpVal.totalInstallment.includes("Installment")===false)
    {

       tempInpVal.totalInstallment = `${tempInpVal.totalInstallment} Installment`

    }
    
     

    const formData = new FormData();


    // let remainingFees  =(inpval.Fees - inpval.RegistrationFees)
    // formData.append("remainingFees", remainingFees);
    // console.log('inpval ', inpval,remainingFees)
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)
    try {
      const res = await fetch('http://localhost:8000/updateRegisterStudent', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempInpVal),
      });
      
      ContextValue.updateProgress(60)
      const data = await res.json();

      const googleSheetResponse = await fetch(
        "http://localhost:8000/edit-google-sheet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("data registration added =",data)
      ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
   
      
      if (res.status === 422 || !data) {
        Swal.fire({   
          icon:  'error',
          title: 'Oops...',
          text:  'Something went wrong!',
        })

        alert('error');
      }
       else {
        RegisteredSuccess()
        navigate("/Add-Registered-Student/registrationReceipt", {
          state: { data: data },
        });
       
      }
    }
    catch (error) {
      Swal.fire({   
        icon:  'error',
        title: 'Oops...',
        text:  'Something went wrong!',
      })
      console.log('error =', error.message)
    }
  };

  // update student with mail

  const addinpdataMail = async (e) => {
    e.preventDefault();

    console.log('inpval add student =',inpval)


    let tempInpVal = inpval;

    if(registrationDateStatus===true)
    {
    let dateArray = tempInpVal.RegistrationDate.split("-");
    console.log("regsitration array =", dateArray);
    tempInpVal.RegistrationDate = dateConvert(tempInpVal.RegistrationDate);
    tempInpVal.joinDate = dateConvert(tempInpVal.joinDate);
    tempInpVal.month = dateArray[1];
    tempInpVal.year = dateArray[0];
    }

    if(batchJoinStatus===true){
      tempInpVal.joinDate = dateConvert(tempInpVal.joinDate);
    }

    if(tempInpVal.PaymentMethod==="OTP"){

      tempInpVal.totalInstallment="null"

    }

    

    if(tempInpVal.totalInstallment.includes("Installment")===false)
    {

       tempInpVal.totalInstallment = `${tempInpVal.totalInstallment} Installment`

    }
    
     

    const formData = new FormData();


    // let remainingFees  =(inpval.Fees - inpval.RegistrationFees)
    // formData.append("remainingFees", remainingFees);
    // console.log('inpval ', inpval,remainingFees)
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)
    try {
      const res = await fetch('http://localhost:8000/updateRegisterStudentMail', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempInpVal),
      });
      
      ContextValue.updateProgress(60)
      const data = await res.json();

      const googleSheetResponse = await fetch(
        "http://localhost:8000/edit-google-sheet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("data registration added =",data)
      ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
   
      
      if (res.status === 422 || !data) {
        Swal.fire({   
          icon:  'error',
          title: 'Oops...',
          text:  'Something went wrong!',
        })

        alert('error');
      }
       else {
        RegisteredSuccess()
        navigate("/Add-Registered-Student/registrationReceipt", {
          state: { data: data },
        });
       
      }
    }
    catch (error) {
      Swal.fire({   
        icon:  'error',
        title: 'Oops...',
        text:  'Something went wrong!',
      })
      console.log('error =', error.message)
    }
  };

  const RegisteredSuccess= ()=>{

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Student Has Been Added',
    showConfirmButton: false,
    timer: 1500
  })
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

  const setCounselor = (name)=>{
    let tempInpval = { ...inpval }
    tempInpval.Counselor = name
    tempInpval.CounselorID = counselorData[name]
    console.log("counselor id =",counselorData[name])
    console.log('set counselor =',name,counselorData,counselorData[name],tempInpval)
    setINP(tempInpval)
  }

  const handleRemarkChange = (e) => {
    const newRemark = e.target.value;

    let tempInpVal = {...inpval}
    tempInpVal.Remark = newRemark
    console.log("temp val =",tempInpVal)

    setINP(tempInpVal)
  };

  // const setMainCourse = (subCourse) => {
  //   let mainCourse;
  //   course.map((data) => {
  //     data.subCourse.map((element) => {
  //       if (element === subCourse) {
  //         mainCourse = data.mainCourse;
  //       }
  //     });
  //   });

  //   console.log("sub and main Course =", subCourse, mainCourse);
  //   setINP({ ...inpval, ["Course"]: mainCourse, ["subCourse"]: subCourse });

   
  // };


  const setMainCourse = (subCourse) => {
    let mainCourse;
    let courseCode;
    course.map((data) => {
      data.subCourse.map((element) => {
        if (element.course === subCourse) {
          mainCourse = data.mainCourse;
          courseCode = element.courseCode;
        }
      });
    });

    console.log("sub and main Course =", subCourse, mainCourse);
    setINP({ ...inpval, ["Course"]: mainCourse, ["subCourse"]: subCourse, ["courseCode"]:courseCode });

  };

  const setCounselorData = (e) => {
    console.log(
      "select index =",
      e.target.selectedIndex,
      counselor[e.target.selectedIndex - 1].counselorNo
    );
    setINP({
      ...inpval,
      ["CounselorId"]: counselor[e.target.selectedIndex - 1].counselorNo,
      ["counselorNumber"]: counselor[e.target.selectedIndex - 1].Number,
      ["Counselor"]: e.target.value,
      ["counselorReference"]:
        counselor[e.target.selectedIndex - 1].counselorReference,
    });
   
  };

  const setMethod = (value) => {
    setMethodStatus(value);
    if (value === "EMI") {
      setINP({ ...inpval, ["PaymentMode"]: value, ["PaymentMethod"]: value });
   
    }
  };


  const setUpdateEditStatusFunc =(index)=>{

    console.log('edit array =',editStatus)
    let editArray = [...editStatus]
    editArray[index] = false
    setEditStatus(editArray)
    console.log('index =',index,editArray)
   

  }
  // const setUpdateEditStatusFunc =()=>{

  //   const editIcon = document.getElementsByClassName('editIcon')

  //   let editArray = editStatus
  //   editIcon.forEach((data,index)=>{
  //     data.addEventListener('click',()=>{
  //       console.log('click function running',index)
  //           const editFormGroup = document.getElementsByClassName('edit-edit-form-group form-group')
  //           editArray[index] = true
          
  //           console.log('editFormGroup =',editFormGroup[index],editArray)
  //           // editFormGroup.input.disabled = false;
  //         })
  //       })
  //       setEditStatus(editArray)
  // }

//   const setAddEditStatusFunc = (e)=>{
// //     const editFormGroup = document.getElementsByClassName('edit-edit-form-group form-group')[e.target.selectedIndex -1]
// //     editFormGroup.input.disabled = false;
// // let editStatusArray = editStatus
// // editStatusArray[(e.target.selectedIndex)-1] = true
// // console.log('editStatus set =',editStatusArray)
// // setEditStatus(editStatusArray)

// console.log('index =',(e.target.selectedIndex))
//   }

  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
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
                  <a href="javascript:void(0);">Edit Student</a>
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
{/*                         
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Enrollment No.</label>
                            <input
                              type="text"
                              value={inpval.RegistrationNo}
                              disabled
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="RegistrationNo"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                         
                        </div> */}
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              value={inpval.Name}
                              disabled={editStatus[0]}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="Name"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(0)}} />
                        </div>
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Number</label>
                            <input
                              type="text"
                              max="10"
                              value={inpval.Number}
                              disabled={editStatus[1]}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="Number"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(1)}} />
                        </div>
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              value={inpval.Email}
                              disabled={editStatus[2]}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="Email"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(2)}} />
                        </div>
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Parent Name</label>
                            <input
                              type="text"
                              value={inpval.Pname}
                              disabled={editStatus[3]}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="Pname"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(3)}} />
                        </div>
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Parent Number</label>
                            <input
                              type="text"
                              max="10"
                              value={inpval.Pnumber}
                              disabled={editStatus[4]}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="Pnumber"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(4)}} />
                        </div>
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">
                              Registration Date
                            </label>
                            <input
                              type={editStatus[5]===true?"text":"date"}
                              disabled={editStatus[5]}
                              value={inpval.RegistrationDate}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="RegistrationDate"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(5);setRegistrationDateStatus(true)}} />
                        </div>

                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Counsellor</label>
                            {counselor && (
                              <div>
                                <select
                                  className="counselor-section custom-select mr-sm-2"
                                  required
                                  name="counselor"
                                  disabled={editStatus[6]}
                                  onChange={(e) => setCounselorData(e)}
                                  value={inpval.Counselor}
                                >
                                  <option selected>Choose Counselor...</option>
                                  {counselor.map((data, index) => {
                                    return (
                                      <option value={data.Name}>
                                        {data.Name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            )}
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(6)}} />
                        </div>

                        
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">
                              Registration Amount
                            </label>
                            <input
                              type="text"
                              max="10"
                              disabled={editStatus[7]}
                              value={inpval.RegistrationFees}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="RegistrationFees"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(7)}} />
                        </div>

                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Course Fees</label>
                            <input
                              type="text"
                              max="10"
                              disabled={editStatus[8]}
                              value={inpval.CourseFees}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="CourseFees"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(8)}} />
                        </div>

                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Batch mode</label>
                           { allcourse && <select
                              id="exampleInputPassword1"
                              type="select"
                              name="BatchMode"
                              class="form-control"
                              disabled={editStatus[9]}
                              value={inpval.BatchMode}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                            >
                              <option disabled selected>
                                --select Batch Mode--
                              </option>
                              {allcourse && 
                              <>
                              <option value="online">Online</option>
                              <option value="offline">Offline</option>
                              </>}
                            </select>}
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(9)}} />
                        </div>
                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Payment Method</label>
                            {allcourse && <select
                              id="exampleInputPassword1"
                              type="select"
                              name="PaymentMethod"
                              class="form-control"
                              disabled={editStatus[10]}
                              value={inpval.PaymentMethod}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                setMethod(e.target.value);
                                
                              }}
                            >
                              <option disabled selected>
                                --Payment Method--
                              </option>
                              <option value="EMI">EMI</option>
                              <option value="Installment">Installment</option>
                              {/* <option value="Installment">Installment</option> */}
                              {/* <option value="2 Installment">
                                2 Installment{" "}
                              </option>
                              <option value="3 Installment">
                                3 Installment{" "}
                              </option>
                              <option value="4 Installment">
                                4 Installment{" "}
                              </option>
                              <option value="5 Installment">
                                5 Installment{" "}
                              </option>
                              <option value="6 Installment">
                                6 Installment{" "}
                              </option> */}
                              <option value="OTP">One Time Payment</option>
                            </select>}
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(10)}} />
                        </div>

                        {/* Total installment and EMI getter */}

                        {methodStatus === "EMI" && (
                          <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                            <div className="edit-form-group form-group">
                              <label className="form-label">
                                Total EMI Month
                              </label>
                              <input
                                type="text"
                                onChange={(e) => {
                                  setINP({
                                    ...inpval,
                                    [e.target.name]: e.target.value,
                                  });
                                  
                                }}
                                name="totalInstallment"
                                class="form-control"
                                id="exampleInputPassword1"
                              />
                            </div>
                          </div>
                        )}
                        {methodStatus === "Installment" && (
                          <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                            <div className="edit-form-group form-group">
                              <label className="form-label">
                                Total Installment
                              </label>
                              <select
                                id="exampleInputPassword1"
                                type="select"
                                name="totalInstallment"
                                class="form-control"
                                onChange={(e) => {
                                  setINP({
                                    ...inpval,
                                    [e.target.name]: e.target.value,
                                  });
                                  
                                }}
                              >
                                <option disabled selected>
                                  --Total Installment--
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {methodStatus === "OTP" && (
                          <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                            <div className="edit-form-group form-group">
                              <label className="form-label">Full Payment</label>
                              <input
                                type="text"
                                onChange={(e) => {
                                  setINP({
                                    ...inpval,
                                    [e.target.name]: e.target.value,
                                  });
                                  
                                }}
                                name="paidFees"
                                class="form-control"
                                id="exampleInputPassword1"
                              />
                            </div>
                          </div>
                        )}

                        {/* {
                     methodStatus==="EMI" ?   
                     <>                 
                       <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                       <div className="edit-form-group form-group">
                         <label className="form-label">Payment mode</label>
                         <input
                           id="exampleInputPassword1"
                           type="text"
                           name="PaymentMode"
                           class="form-control"
                           value = "By Bank"
                         />
                          
                       </div>
                        </div>
                     </>
                      : 
                      <>                                           
                       <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Payment mode</label>
                            <select
                              id="exampleInputPassword1"
                              type="select"
                              name="PaymentMode"
                              class="form-control"
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name] : e.target.value,
                                })
                              }
                            >
                              <option disabled selected>
                                --select Payment Mode--
                              </option>
                              <option value="Cash">Cash</option>
                              <option value="UPI">UPI</option>
                            </select>
                          </div>
                        </div>
                        </>

                        } */}

                        {methodStatus === "EMI" ? (
                          <>
                            <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                              <div className="edit-form-group form-group">
                                <label className="form-label">
                                  Payment mode
                                </label>
                                <select
                                  id="exampleInputPassword1"
                                  type="select"
                                  name="PaymentMode"
                                  
                                  class="form-control"
                                  onChange={(e) => {
                                    setINP({
                                      ...inpval,
                                      [e.target.name]: e.target.value,
                                    });
                                  }}
                                >
                                  <option disabled selected>
                                    --select Payment Mode--
                                  </option>
                                  <option value="By Bank">By Bank</option>
                                  <option value="Credit Card">
                                    Credit Card
                                  </option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                              <div className="col-sm-12">
                                <div className="edit-form-group form-group">
                                  <label className="form-label">
                                    Payment mode
                                  </label>
                                { allcourse && <select
                                    id="exampleInputPassword1"
                                    type="select"
                                    disabled={editStatus[11]}
                                    value={inpval.PaymentMode}
                                    name="PaymentMode"
                                    class="form-control"
                                    onChange={(e) => {
                                      setINP({
                                        ...inpval,
                                        [e.target.name]: e.target.value,
                                      });
                                     
                                    }}
                                  >
                                    <option disabled selected>
                                      --select Payment Mode--
                                    </option>
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Portal">Portal</option>
                                  </select>}
                                </div>
                              </div>
                              <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(11)}} />
                            </div>
                          </>
                        )}

                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Course Name</label>
                            {allcourse && (
                              <select
                                id="exampleInputPassword1"
                                type="select"
                                name="Course"
                                class="form-control"
                                disabled={editStatus[12]}
                                value={inpval.subCourse}
                                onChange={(e) => setMainCourse(e.target.value)}
                              >
                                <option disabled selected>
                                  --select Course Name--
                                </option>
                                {allcourse.map((data) => {
                                  return <option value={data.course}>{data.course}</option>;
                                })}
                              </select>
                            )}
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(12)}} />
                        </div>

                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            
                            <div className="date-time-section">
                              <div className="edit-col">
                              <div className="date-sec">
                              <label className="form-label">Batch Join</label>
                                <input
                                  type={editStatus[13]===true?"text":"date"}
                                  
                                  disabled={editStatus[13]}
                                  onChange={(e) => {
                                    setINP({
                                      ...inpval,
                                      [e.target.name]: e.target.value,
                                    });
                                    
                                  }}

                                  value={inpval.joinDate}
                                  name="joinDate"
                                  className="form-control"
                                />
                              </div>
                              <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(13);setBatchJoinStatus(true)}} />
                              </div>
                              <div className="edit-col">
                              <div className="time-sec">
                                <label className="form-label">Batch Time</label>
                                <input
                                 type={editStatus[14]===true?"text":"time"}
                                  disabled={editStatus[14]}
                                  onChange={(e) => {
                                    setINP({
                                      ...inpval,
                                      [e.target.name]: e.target.value,
                                    });
                                    
                                  }}

                                  value={inpval.joinTime}
                                  name="joinTime"
                                  className="form-control"
                                ></input>
                              </div>
                              <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(14)}} />
                              </div>
                            </div>
                          </div>
                          
                        </div>

                        <div className="edit-col col-lg-6 col-md-6 col-sm-12">
                          <div className="edit-form-group form-group">
                            <label className="form-label">Remark</label>
                            <input
                              type="text"
                              disabled={editStatus[15]}
                              value={inpval.Remark}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="Remark"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                          <CreateIcon className="editIcon" onClick={e=>{setUpdateEditStatusFunc(15)}} />
                        </div>

                       
                      </div>
                    </form>
                    
                    <div className="edit-col edit-col col-lg-6 col-lg-12 col-md-6 col-sm-12">
                       
                        <button type="submit" onClick={addinpdata} className="btn btn-primary">
                          Submit
                        </button>

                        <button
                            type="submit"
                            onClick={addinpdataMail}
                            className="btn btn-primary"
                            disabled={ContextValue.barStatus===true?true:(inpval.Email.length>0?false:true)}
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Submit and Send Email
                          </button>
                        <button type="submit" className="btn btn-light">
                          Cancel
                        </button>
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
