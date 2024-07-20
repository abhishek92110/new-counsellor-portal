import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Cslidebar from "./Cslidebar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

const CounsellorFollowUpAdd = () => {
  let navigate = useNavigate();

  const [allcourse, setAllCourse] = useState();
  const [trainer, setTrainer] = useState();
  const [course, setCourse] = useState();
  const [methodStatus, setMethodStatus] = useState();
  const [allFieldStatus, setAllFieldStatus] = useState(false);
  const [counselor, setCounselor] = useState();
  const [visitTotalCount, setTotalVisitCount] = useState(0)
  // const location = useLocation();
  // const { counselor } = location.state;

  let ContextValue = useContext(StudentContext);

  useEffect(() => {

    fetchUser()
    
  }, []);

  const fetchUser = ()=>{
    if(localStorage.getItem("counsellor")){
      getAllCourse();
      getTrainer();
      getCounselor();
    }

    else{
      navigate('/')
    }
  }

  const getCounselor = async () => {
    const counsellor = await ContextValue.getAllCounselor();
    setCounselor(counsellor.counselorData);
    console.log("counselor all =", counsellor.counselorData);
  };

  // const getAllCourse = async () => {
  //   let allCourse = await ContextValue.getAllBatchCourse();
  //   console.log("course =", allCourse.batchCourse[0].Course);
  //   setAllCourse(allCourse.batchCourse[0].Course);
  // };

  const getAllCourse = async () => {
    let allCourse = await ContextValue.getAllMainSubCourse();
    console.log("course =", allCourse, allCourse.courses);
    setCourse(allCourse.allCourse);
    setAllCourse(allCourse.courses);
  };

  const [inpval, setINP] = useState({
    Course: "",
    Day: "",
    date: "",
    counselorNo: "",
    name:"",
    month: "",
    year: "",
    name:"",
    mobile:"",
    status:"Added",
    remark:"",
    FollowUp:[],
    lastFollowUpDate:"",
  });

  const [visitData, setVisitData] = useState([])

  function isAllFieldsFilled() {
    for (const key in inpval) {
      if (inpval.hasOwnProperty(key)) {
        if (!inpval[key]) {
          console.log("false field");
          return false; // Return false if any field is empty
        }
      }
    }
    console.log("true field");

    return true; // Return true if all fields are filled
  }

  // delete course lead function

  const deleteCourseLead =(name, mobile)=>{

    let tempcourseLead = visitData.filter(data=>{
      return (!(data.name==name && data.mobile==mobile))
    })

    console.log("temp course lead =",tempcourseLead)

    let totalcount = tempcourseLead.length;

    setVisitData(tempcourseLead)
    setTotalVisitCount(totalcount)

  }

  const addinpdata = async (e) => {
    e.preventDefault();

    console.log("inpval data =",inpval)

    let tempVisitData = visitData;

    let obj = {
      date:inpval.date,
      remark: inpval.remark
    }

    tempVisitData.FollowUp.push(obj)

    let prevnameMobile = false;

    tempVisitData.map(data=>{

      if(data.name==inpval.name && data.mobile==inpval.mobile)
        {
        data.Course=inpval.Course
        data.date  = inpval.date
        data.name = inpval.name
        data.mobile = inpval.mobile
        data.status = inpval.status
        data.remark = inpval.remark
        data.FollowUp = {
          date:inpval.date,
          remark:inpval.remark
        };
        prevnameMobile = true;
      }
    })

    if(!prevnameMobile){

    tempVisitData.push(inpval);
  }

  let totalcount = tempVisitData.length;
  console.log("total visit data =",tempVisitData)

  setVisitData(tempVisitData)

  
    setTotalVisitCount(totalcount)
    // setINP({ ...inpval, ["course"]: tempCourseLead, ["totalCount"]:totalcount});
    console.log("inpval data =",inpval)
    

  };

  // function to get detail on done status


  const getDoneStatus = (index) => {
    console.log('index of student =', index);
    
    Swal.fire({
      title: 'Post Visit Details',
      html: `
        <input id="trainerInput" type="text" class="swal2-input" placeholder="Visit Trainer">
        <input id="counselorSelect" type="text" class="swal2-input" placeholder="Visit Counsellor">
        <select id="responseInput" class="swal2-input">
          <option value="" disabled selected>Select Visit Response</option>
          <option value="Registered">Registered</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Not Interested">Not Interested</option>
        </select>
        
      `,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const trainerInput = document.getElementById('trainerInput').value;
        const counselorSelect = document.getElementById('counselorSelect').value;
        const responseInput = document.getElementById('responseInput').value;
        
        if (!trainerInput || !counselorSelect || !responseInput) {
          Swal.showValidationMessage('Please enter all details');
          return false;
        }

        
        return {
          trainerInput,
          counselorSelect,
          responseInput
        };
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const { trainerInput, counselorSelect, responseInput } = result.value;

        let tempVisitData = visitData;
        console.log("tempVisit data =",tempVisitData, visitData)
        tempVisitData[index].visitCounsellor =counselorSelect;
        tempVisitData[index].visitTrainer =trainerInput;
        tempVisitData[index].visitResponse =responseInput;


        setVisitData(tempVisitData)

        
        // Add logic to handle the rescheduled details
        console.log('Trainer:', trainerInput);
        console.log('Counselor:', counselorSelect);
        console.log('Response:', responseInput);
        
        Swal.fire({
          title: 'Details Added',
          text: `Trainer: ${trainerInput}, Counselor: ${counselorSelect}, Response: ${responseInput}`
        });
      }
    });
  };
  

  // function to get revisit date

  const getReVisitDate = (index)=>{

    console.log(' index of student =',index)
    Swal.fire({
        title: 'Add Revisit Date',
        html:
            '<input id="reVisitDate" type="date" class="swal2-input" placeholder="Add Date">',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {

          const reVisitDate = document.getElementById('reVisitDate').value;          
          

          let tempVisitData = visitData;
          tempVisitData[index].visitDate = reVisitDate 

          setVisitData(tempVisitData)

            // addNewSubCourse(courseName,courseCode,mainCourse)
          Swal.fire({
            title: `Re Visit Date has been added`,
            
            imageUrl: result.value.avatar_url
          })
        }
      })
  }

  // function to get visit data

  const getVisitData = async()=>{

    // console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorFollowUpCount',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":inpval.date,
          "endDate":inpval.date
        }
      })
  
      totalLead = await totalLead.json();
      setVisitData(totalLead.totalLead)
      setTotalVisitCount(totalLead.totalCount)
      console.log("lead count =",totalLead);
    }
      catch(error){

      }

  }

// sending data to db and sending mail also

  const addinpdataMail = async (e) => {

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    e.preventDefault();
    let tempInpVal = inpval;
    console.log("lead date is  =",tempInpVal.date)
    let dateArray = tempInpVal.date.split("-");
    console.log("registration array =", dateArray);
    tempInpVal.date = dateConvert(tempInpVal.date);
    tempInpVal.month = dateArray[1];
    tempInpVal.year = dateArray[0];
    tempInpVal.Day = dateArray[2];

    tempInpVal.date = `${tempInpVal.year}-${tempInpVal.month}-${tempInpVal.Day}`

    console.log("register value =", tempInpVal);


    try {

      let url = `http://localhost:8000/counselorFollowUp`
      ContextValue.updateProgress(60);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(visitData),
      });

      // ContextValue.updateProgress(60);

      // const data = await res.json();

      console.log("progress bar 100")

      ContextValue.updateProgress(100);
      ContextValue.updateBarStatus(false);
      SuccessMsg("Visit");


    } 
    catch(error) {
      ContextValue.updateProgress(100);
      ContextValue.updateBarStatus(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });

      console.log("error =", error.message);
    }
    

  };

  // success message function

  const SuccessMsg=()=>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Visit has beed added`,
      showConfirmButton: false,
      timer: 1500
    })
    
  }

  // function to convert date

  const dateConvert = (selectedDate) => {
    const originalDate = new Date(selectedDate);
    const formattedDate = originalDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  };

  const EmptyFilled = () => {
    let tempInpVal = inpval;

    for (let key in inpval) {
      tempInpVal[key] = "";
    }

    setINP(tempInpVal);
  };

  let trainerData = {};

  const getTrainer = async () => {
    const trainerData = await ContextValue.getAllTrainer();
    console.log("trainer data =", trainerData);
    setTrainer(trainerData);
  };

  const setTrainerData = (e) => {
    console.log(
      "trainer data =",
      e.target.selectedIndex,
      trainerData[e.target.selectedIndex],
      trainerData
    );
    setINP({
      ...inpval,
      [e.target.name]: e.target.value,
      ["TrainerId"]: trainer[e.target.selectedIndex - 1].code,
    });

    const status = isAllFieldsFilled();
    setAllFieldStatus(status);
  };

  const setMainCourse = (subCourse) => {
    let mainCourse;
    let courseCode;
    course.map((data) => {
      data.subCourse.map((element) => {
        if (element.course === subCourse) {
          mainCourse = data.mainCourse;
          courseCode = element.courseCode;
          console.log("element =",element)
        }
      });
    });

    console.log("sub and main Course =", subCourse, mainCourse,courseCode,course);
    setINP({ ...inpval, ["Course"]: mainCourse, ["subCourse"]: subCourse, ["courseCode"]:courseCode });

    const status = isAllFieldsFilled();
    setAllFieldStatus(status);
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
    const status = isAllFieldsFilled();
    setAllFieldStatus(status);
  };

  const setMethod = (value) => {
    setMethodStatus(value);
    if (value === "EMI") {
      setINP({ ...inpval, ["PaymentMode"]: value, ["PaymentMethod"]: value });
      const status = isAllFieldsFilled();
      setAllFieldStatus(status);
    }
  };

  const setVisitStatus =(name, value, index)=>{
    console.log("inside visit status", value)
    let tempvisitData = visitData;
    tempvisitData[index].visitStatus  = value;

    setVisitData(tempvisitData)

    if(value=="Re Visit")
    {
      console.log("inside if condition",value)
      getReVisitDate(index)
      
    }
      else if(value=="Done"){
      console.log("inside else if condition",value)

        getDoneStatus(index)
      }
  }

  return (
    <>
      <Header />
      <div className="sidebar-main-container flex-col">
        <HashLoader color="#3c84b1" />
        {/* <Cslidebar /> */}
        {/* <div className='pos-center'>
      <HashLoader color="#3c84b1" />
    </div> */}
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">


              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Add Follow Up</h4>
                  <h4>Total Follow Up: {visitTotalCount}</h4>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">
                             Date
                            </label>
                            <input
                              type="date"
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="date"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                          <button onClick={getVisitData} className="btn btn-primary">Search</button>
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
                              max="10"
                              value={inpval.name}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="name"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Mobile</label>
                            <input
                              type="text"
                              max="10"
                              value={inpval.mobile}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="mobile"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">
                             Remark
                            </label>
                            <input
                              type="text"
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="remark"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Course Name</label>
                            {allcourse && (
                              <select
                                id="exampleInputPassword1"
                                type="select"
                                name="Course"
                                class="form-control"
                                onChange={(e) => {setINP({...inpval, [e.target.name]:e.target.value})}}
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
                        </div>
                       
                        {inpval.status=="Done" && 
                        <>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">
                              Visit By Counsellor
                            </label>
                            <input
                              type="text"
                              max="10"
                              value={inpval.visitcounsellor}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="visitcounsellor"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">
                              Visit By Trainer
                            </label>
                            <input
                              type="text"
                              max="10"
                              value={inpval.visittrainer}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="visittrainer"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">
                              Visit Response
                            </label>
                        <select
                        id="exampleInputPassword1"
                        type="select"
                        name="visitResponse"
                        class="custom-select mr-sm-2"
                        onChange={(e)=>{setINP({...inpval, ["visitResponse"]:e.target.value})}}
                      
                    >
                        <option disabled selected>--Select Visit Response--</option>
                    
                                <option value="Registered" >Registered</option>
                                <option value="Follow Up" >Follow Up</option>                       
                                <option value="Not Interested" >Not Interested</option>                      
                        
                    </select>
                        </div>
                        </>
                        
                        }

                        {inpval.status=="ReScheduled" && 
                         <div className="col-lg-6 col-md-6 col-sm-12">
                         <div className="form-group">
                           <label className="form-label">
                             Reschedule Date
                           </label>
                           <input
                             type="date"
                             onChange={(e) => {
                               setINP({
                                 ...inpval,
                                 [e.target.name]: e.target.value,
                               });
                               
                             }}
                             name="reSchedule"
                             class="form-control"
                             id="exampleInputEmail1"
                             aria-describedby="emailHelp"
                           />
                         </div>
                       </div>}

                       

                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                          <button
                            type="submit"
                            onClick={addinpdata}
                            className="btn btn-primary"
                            disabled={ContextValue.barStatus}
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Add Follow Up
                          </button>
                        
                        </div>
                    </form>
                  </div>
                </div>
              </div>



            </div>
          </div>

          

        </div>

       {visitData.length>0 && <div className="content-body">
        <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <tr>
          <th>Course</th>
          <th>Name</th>
          <th>Date</th>
          <th>Remark</th>
          <th>Status</th>
          <th>Delete</th>
          </tr>
      {visitData.map((element,index)=>{
        return(
          <tr>
         <td> {element.Course} </td>
         <td> {element.name} </td>
         <td> {element.date} </td>
         <td> {element.remark} </td>
         <select
                        id="exampleInputPassword1"
                        type="select"
                        name="status"
                        class="custom-select mr-sm-2"
                        defaultValue={element.status}
                        onChange={(e)=>setINP({...inpval, [e.target.name]:e.target.value})}
                      
                    >
                        <option disabled>--Select Follow Up Status--</option>
                    
                                <option value="Registered" >Registered</option>
                                <option value="Added" >Added</option>
                                <option value="Not Interested" >Not Interested</option>                                            
                                <option value="Re Follow Up" >Re Follow Up</option>                                            
                        
                    </select>
         <td class="cursor-pointer" onClick={e=>{deleteCourseLead(element.name, element.mobile)}}> X </td>
         </tr>
        )
      })}
      </table>

      <div className="d-flex">
      <button
                            type="submit"
                            onClick={addinpdataMail}
                            className="btn btn-primary"            
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Submit Follow Up
                          </button>
      </div>
        </div>}
      </div>
    </>
  );
};

export default CounsellorFollowUpAdd;
