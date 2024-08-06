import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Cslidebar from "./Cslidebar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

const CounsellorVisitAdd = () => {
  let navigate = useNavigate();

  const [allcourse, setAllCourse] = useState();
  const [trainer, setTrainer] = useState();
  const [course, setCourse] = useState();
  const [methodStatus, setMethodStatus] = useState();
  const [allFieldStatus, setAllFieldStatus] = useState(false);
  const [counselor, setCounselor] = useState();
  const [visitTotalCount, setTotalVisitCount] = useState(0)
  const [btnStatus, setBtnStatus] = useState("Today-Visit")
  const [RevisitData, setRevisitData] = useState()
  const [revisitCount, setTotalRevisitCount] = useState(0)
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
    visitResponse:"",
    visitStatus:"Scheduled",
    Count:"",
    Day: "",
    date: "",
    Counselor: "",
    counselorNo: "",
    visitDate:"",
    visitTrainer:"",
    visitCounsellor:"",
    name:"",
    month: "",
    year: "",
    name:"",
    mobile:"",
    trainer:"",
    visitcounsellor:"",
    visittrainer:""
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

    let prevnameMobile = false;

    tempVisitData.map(data=>{

      if(data.name==inpval.name && data.mobile==inpval.mobile)
        {
        data.Course=inpval.Course
        data.visitResponse=inpval.visitResponse
        data.visitDate=""
        data.name = inpval.name
        data.mobile = inpval.mobile
        data.visittrainer = inpval.visittrainer
        data.visitcounsellor = inpval.visitcounsellor
        data.status = inpval.status
        data.reschedule = inpval.reSchedule
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


  const getDoneStatus = (index, from) => {
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

        if(from=="from today visit"){
        let tempVisitData = visitData;
        console.log("tempVisit data =",tempVisitData, visitData)
        tempVisitData[index].visitCounsellor =counselorSelect;
        tempVisitData[index].visitTrainer =trainerInput;
        tempVisitData[index].visitResponse =responseInput;


        setVisitData(tempVisitData)
      }

      else{
        let tempReVisitData = RevisitData;
        console.log("tempVisit data =",tempReVisitData, RevisitData)
        tempReVisitData[index].visitCounsellor =counselorSelect;
        tempReVisitData[index].visitTrainer =trainerInput;
        tempReVisitData[index].visitResponse =responseInput;


        setRevisitData(tempReVisitData)
      }

        
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

  const getReVisitDate = (index, from)=>{

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
          

          

          if(from=="from today visit"){
            let tempVisitData = visitData;
            tempVisitData[index].visitDate = reVisitDate 
  
            setVisitData(tempVisitData)
            }
            else{
              let tempRevisitData = RevisitData;
              tempRevisitData[index].visitDate  = reVisitDate;
              setRevisitData(tempRevisitData)
            }

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

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    // console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorVisitCount',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":inpval.date,
          "endDate":inpval.date
        }
      })

      ContextValue.updateProgress(60);
  
      totalLead = await totalLead.json();
      setVisitData(totalLead.totalLead)
      setTotalVisitCount(totalLead.totalCount)
      setRevisitData(totalLead.totalRevisit)
      setTotalRevisitCount(totalLead.totalRevisit.length)
      console.log("lead count =",totalLead);

      ContextValue.updateProgress(100);
      ContextValue.updateBarStatus(false);
      SuccessMsg();
    }
      catch(error){

        ContextValue.updateProgress(100);
        ContextValue.updateBarStatus(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
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

    console.log("revist data =",visitData)


    try {

      let url = `http://localhost:8000/counselorVisit`
      ContextValue.updateProgress(60);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(visitData),
      });

      ContextValue.updateProgress(60);

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

  // update visit


 const updateVisit = async (e) => {

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    e.preventDefault();
    // let tempInpVal = inpval;
    // console.log("lead date is  =",tempInpVal.date)
    // let dateArray = tempInpVal.date.split("-");
    // console.log("registration array =", dateArray);
    // tempInpVal.date = dateConvert(tempInpVal.date);
    // tempInpVal.month = dateArray[1];
    // tempInpVal.year = dateArray[0];
    // tempInpVal.Day = dateArray[2];

    // tempInpVal.date = `${tempInpVal.year}-${tempInpVal.month}-${tempInpVal.Day}`

    // console.log("register value =", tempInpVal);


    try {

      let url = `http://localhost:8000/counselorVisit`
      ContextValue.updateProgress(60);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(RevisitData),
      });

      ContextValue.updateProgress(60);

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
      title: ``,
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

  const setVisitStatus =(name, value, index,from)=>{
    console.log("inside visit status", value)
    if(from=="from today visit"){
    let tempvisitData = visitData;
    tempvisitData[index].visitStatus  = value;
    tempvisitData[index].visitDate  = "";
    setVisitData(tempvisitData)
    }
    else{
      let tempRevisitData = RevisitData;
      tempRevisitData[index].visitStatus  = value;
      tempRevisitData[index].visitDate  = "";
      setRevisitData(tempRevisitData)
    }

    
    

    if(value=="Re Visit")
    {
      console.log("inside if condition",value)
      getReVisitDate(index, from)
      
    }
      else if(value=="Done"){
      console.log("inside else if condition",value)

        getDoneStatus(index, from)
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
                  <h4>Add Visit</h4>
                  <h4>Total Visit: {(btnStatus=="Today-Visit" || btnStatus=="add-visit") ? visitTotalCount:revisitCount}</h4>
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

            <div className="btn-group d-flex">

<button className="btn btn-primary"  onClick={()=>setBtnStatus("Today-Visit")}>Added Visit</button>
<button className="btn btn-primary" onClick={()=>setBtnStatus("revisit")}>Revisit</button>

</div>

        
          </div>

          

        </div>

       {(btnStatus=="Today-Visit" || btnStatus=="add-visit") && <div className="content-body">
        <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <tr>
          <th>Course</th>
          <th>Name</th>
          <th>Visit Date</th>
          <th>Status</th>
          <th>Delete</th>
          </tr>
      {visitData.map((element,index)=>{
        return(
          <tr>
         <td> {element.Course} </td>
         <td> {element.name} </td>
         <td> {element.date} </td>
         <select
                        id="exampleInputPassword1"
                        type="select"
                        name="leadfrom"
                        class="custom-select mr-sm-2"
                        defaultValue={element.visitStatus}
                        onChange={(e)=>setVisitStatus(e.target.name, e.target.value, index, "from today visit")}
                      
                    >
                        <option disabled>--Select Visit Status--</option>
                    
                                <option value="Done" >Done</option>
                                <option value="Not Joined" >Not Joined</option>                       
                                <option value="Re Visit" >Re Visit</option>                      
                                <option value="Scheduled" >Scheduled</option>                      
                        
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
                            Submit Visit
                          </button>
      </div>
        </div>}


        {(btnStatus=="revisit") && <div className="content-body">
        <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <tr>
          <th>Course</th>
          <th>Name</th>
          <th>Visit Date</th>
          <th>Status</th>
          </tr>
      {RevisitData.map((element,index)=>{
        return(
          <tr>
         <td> {element.Course} </td>
         <td> {element.name} </td>
         <td> {element.visitDate} </td>
         <select
                        id="exampleInputPassword1"
                        type="select"
                        name="leadfrom"
                        class="custom-select mr-sm-2"
                        defaultValue={element.visitStatus}
                        onChange={(e)=>setVisitStatus(e.target.name, e.target.value, index, "from revisit")}
                      
                    >
                        <option disabled>--Select Visit Status--</option>
                    
                                <option value="Done" >Done</option>
                                <option value="Not Joined" >Not Joined</option>                       
                                <option value="Re Visit" >Re Visit</option>                      
                                <option value="Scheduled" >Scheduled</option>                      
                        
                    </select>

         </tr>
        )
      })}
      </table>

      <div className="d-flex">
      <button
                            type="submit"
                            onClick={updateVisit}
                            className="btn btn-primary"            
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Update Visit
                          </button>
      </div>
        </div>}
      </div>
    </>
  );
};

export default CounsellorVisitAdd;
