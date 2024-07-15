import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Cslidebar from "./Cslidebar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

const CounsellorLeadAdd = () => {
  let navigate = useNavigate();

  const [allcourse, setAllCourse] = useState();
  const [trainer, setTrainer] = useState();
  const [course, setCourse] = useState();
  const [methodStatus, setMethodStatus] = useState();
  const [allFieldStatus, setAllFieldStatus] = useState(false);
  const [counselor, setCounselor] = useState();
  const [leadStatus, setLeadStatus] = useState("Lead")
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
    Count:"",
    Day: "",
    date: "",
    Course: "",
    subCourse: "",
    Counselor: "",
    counselorNo: "",
    month: "",
    year: "",
    totalCount:0,
    Leadby:[],
    leadfrom:"",
  });

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

  const deleteCourseLead =(courseName, lead)=>{

    console.log("course name =",courseName)

    let tempcourseLead = inpval.Leadby.filter(data=>{
      return (!(data.course==courseName && data.lead==lead))
    })

    console.log("temp course lead =",tempcourseLead)

    let totalcount = 0;

    tempcourseLead.map(data=>{

      totalcount = totalcount + parseInt(data.count)

    })

    setINP({ ...inpval, ["course"]: tempcourseLead, ["totalCount"]:totalcount});

  }

  const addinpdata = async (e) => {
    e.preventDefault();
    console.log('inpval data =',inpval, leadStatus)
    let tempCourseLead = inpval.Leadby;

    let prevCourseLead = false;

    tempCourseLead.map(data=>{
      if(data.course==inpval.subCourse && data.lead==inpval.leadfrom){
        data.count = parseInt(data.count) + parseInt(inpval.Count)
        prevCourseLead = true;
      }
    })

    if(!prevCourseLead){

    let tempObj = {
      course:inpval.subCourse,
      count:inpval.Count,
      lead:inpval.leadfrom
    }

    tempCourseLead.push(tempObj);
  }

  let totalcount = 0;

  tempCourseLead.map(data=>{

      totalcount = totalcount + parseInt(data.count)

    })

    setINP({ ...inpval, ["course"]: tempCourseLead, ["totalCount"]:totalcount});
    

  };

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

      let url = `http://localhost:8000/counselorLead`
      ContextValue.updateProgress(60);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(tempInpVal),
      });

      // ContextValue.updateProgress(60);

      // const data = await res.json();

      console.log("progress bar 100")

      ContextValue.updateProgress(100);
      ContextValue.updateBarStatus(false);
      SuccessMsg(leadStatus);


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
      title: `Lead has beed added`,
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

  return (
    <>
      <Header />
      <div className="sidebar-main-container">
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
                  <h4>Add Lead</h4>
                  <h4>Total Lead: {inpval.totalCount}</h4>
                </div>
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
                            <label className="form-label">Count</label>
                            <input
                              type="text"
                              max="10"
                              value={inpval.Count}
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                
                              }}
                              name="Count"
                              class="form-control"
                              id="exampleInputPassword1"
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
                        </div>
                       
                       
                        
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">
                              Lead Date
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
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">
                              Lead By
                            </label>
                        <select
                        id="exampleInputPassword1"
                        type="select"
                        name="leadfrom"
                        class="custom-select mr-sm-2"
                        onChange={(e)=>{setINP({...inpval, ["leadfrom"]:e.target.value})}}
                      
                    >
                        <option disabled selected>--select Lead By--</option>
                    
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Social Media" >Social Media</option>
                                <option value="Inbound" >Inbound</option>                       
                                <option value="Website" >Website</option>                       
                                <option value="Others" >Others</option>                       
                        
                    </select>
                        </div>

                       

                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                          <button
                            type="submit"
                            onClick={addinpdata}
                            className="btn btn-primary"
                            disabled={ContextValue.barStatus}
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Add Lead
                          </button>
                          <button
                            type="submit"
                            onClick={addinpdataMail}
                            className="btn btn-primary"            
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Submit Lead
                          </button>
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

       {(inpval.Leadby).length>0 && <div className="content-body">
        <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <tr>
          <th>Course</th>
          <th>Count</th>
          <th>Lead By</th>
          <th>Delete</th>
          </tr>
      {inpval.Leadby.map((element,index)=>{
        return(
          <tr>
         <td> {element.course} </td>
         <td> {element.count} </td>
         <td> {element.lead} </td>
         <td class="cursor-pointer" onClick={e=>{deleteCourseLead(element.course, element.lead)}}> X </td>
         </tr>
        )
      })}
      </table>
        </div>}
      </div>
    </>
  );
};

export default CounsellorLeadAdd;
