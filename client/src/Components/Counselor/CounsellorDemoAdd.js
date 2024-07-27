import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Cslidebar from "./Cslidebar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

const CounsellorDemoAdd = () => {
  let navigate = useNavigate();

  const [allcourse, setAllCourse] = useState();
  const [trainer, setTrainer] = useState();
  const [course, setCourse] = useState();
  const [methodStatus, setMethodStatus] = useState();
  const [allFieldStatus, setAllFieldStatus] = useState(false);
  const [counselor, setCounselor] = useState();
  const [btnStatus, setBtnStatus] = useState("today-added-demo")
  const [reScheduleStudentData, setReScheduleStudent] = useState([])
  // const location = useLocation();
  // const { counselor } = location.state;

  let ContextValue = useContext(StudentContext);

  useEffect(() => {

    fetchUser()
    
  }, [reScheduleStudentData]);

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

  const getDemo = async()=>{

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);
    console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"))

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorDemoCount',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":inpval.date,
          "endDate":inpval.date
        }
      })
  
      ContextValue.updateProgress(60);
      totalLead = await totalLead.json();

      // setINP({...inpval, ["demoStudent"]:totalLead.totalLead})
      // setINP({...inpval, ["totalCount"]:totalLead.totalCount})

      if((totalLead.totalLead).length>0){

      setINP({ ...inpval, ["demoStudent"]: totalLead.totalLead[0].demoStudent, ["totalCount"]:totalLead.totalCount});
      console.log("lead count =",totalLead.totalLead);
      setBtnStatus("today-added-demo")
      }
      else{
        setINP(
          {
            Course: "",
    Count:"",
    Day: "",
    date: inpval.date,
    Course: "",
    subCourse: "",
    Counselor: "",
    counselorNo: "",
    month: "",
    year: "",
    totalCount:0,
    demoStudent:[],
    name:"",
    mobile:"",
    trainer:"",
    status:"",
    reSchedule:""
          }
        )

        console.log("inside else")
      }

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

        console.log("error message =",error.message)

      }
  }


  const getReSchedule  =async()=>{

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorDemoReschedule',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":inpval.date,
          "endDate":inpval.date
        }
      })
  
      ContextValue.updateProgress(60);
      totalLead = await totalLead.json();

      // setINP({...inpval, ["demoStudent"]:totalLead.totalLead})
      // setINP({...inpval, ["totalCount"]:totalLead.totalCount})

      setReScheduleStudent(totalLead.totalLead)

      // setINP({ ...inpval, ["demoStudent"]: totalLead.totalLead[0].demoStudent, ["totalCount"]:totalLead.totalCount});
      console.log("reschedule data =",totalLead.totalLead);
      setBtnStatus("today-added-demo")
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
    demoStudent:[],
    name:"",
    mobile:"",
    trainer:"",
    status:"",
    reSchedule:""
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

  const deleteCourseLead =(name, mobile)=>{

    console.log("course name =",name, mobile)

    let tempcourseLead = inpval.demoStudent.filter(data=>{
      return (!(data.name==name && data.mobile==mobile))
    })

    console.log("temp course lead =",tempcourseLead)

    let totalcount = 0;

    tempcourseLead.map(data=>{

      totalcount = totalcount + parseInt(data.count)

    })

    setINP({ ...inpval, ["demoStudent"]: tempcourseLead, ["totalCount"]:totalcount});

  }

  const addinpdata = async (e) => {
    e.preventDefault();
    let tempCourseLead = inpval.demoStudent;

    let prevnameMobile = false;

    tempCourseLead.map(data=>{
      if(data.name==inpval.name && data.mobile==inpval.mobile){
        data.course=inpval.subCourse
        data.name = inpval.name
        data.mobile = inpval.mobile
        data.trainer = inpval.trainer
        data.status = "Schedule"
        data.reschedule = inpval.date
        data.scheduleDate = inpval.date
        prevnameMobile = true;
        data.Day = inpval.Day
        data.month = inpval.month
        data.year = inpval.year
      }
    })

    if(!prevnameMobile){

    let tempObj = {
      course:inpval.subCourse,
      name:inpval.name,
      mobile:inpval.mobile,
      trainer:inpval.trainer,
      status:"Schedule",
      reschedule:inpval.date,
      scheduleDate:inpval.date,
      Day : inpval.Day,
      month : inpval.month,
      year : inpval.year
      

    }

    tempCourseLead.push(tempObj);
  }

  let totalcount = tempCourseLead.length;

  
    setINP({ ...inpval, ["demoStudent"]: tempCourseLead, ["totalCount"]:totalcount});
    console.log("inpval data =",inpval)
    

  };

  // update reschedule function

  const updateReschedule = async()=>{

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    try{

      const res = await fetch(`http://localhost:8000/counselorUpdateDemoReschedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(reScheduleStudentData),
      });
    
      ContextValue.updateProgress(100);
      ContextValue.updateBarStatus(false);
      SuccessMsg("Demo");
  
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

    let reScheduleStudent = tempInpVal.demoStudent.filter(data=>{
      return data.status == "ReScheduled"
    })


    try {

      let url = `http://localhost:8000/counselorDemo`
      ContextValue.updateProgress(60);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(tempInpVal),
      });

      ContextValue.updateProgress(60);

      // const data = await res.json();

      console.log("progress bar 100", res.status)

      


      if(res.status){
      if(reScheduleStudent.length>0){

        let tempDemoStudent;
        

        console.log("reschedule student =",tempDemoStudent,reScheduleStudent)

          try{
        const res = await fetch(`http://localhost:8000/counselorDemoReschedule`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("counsellor")
          },
          body: JSON.stringify(reScheduleStudent),
        });
      
        ContextValue.updateProgress(100);
        ContextValue.updateBarStatus(false);
        SuccessMsg("Demo");

    
  }catch(error){

    ContextValue.updateProgress(100);
      ContextValue.updateBarStatus(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });

  }
}

else{
  ContextValue.updateProgress(100);
  ContextValue.updateBarStatus(false);
  SuccessMsg("Demo");
}
    }
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

  // swal add done status 


  const addRescheduleDate = (index,from)=>{

    console.log(' index of student =',index)
    Swal.fire({
        title: 'Add Reschedule Date',
        html:
            '<input id="rescheduleDate" type="date" class="swal2-input" placeholder="Add Date">',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {

          const rescheduleDate = document.getElementById('rescheduleDate').value;

          if(from=="fromAddedDemo"){

            console.log("from  if=",from)
            let tempInpVal = inpval;
          tempInpVal.demoStudent[index].reschedule = rescheduleDate;
          setINP(tempInpVal);

          }

          else{

            console.log("from  else=",from)

            let tempReschedule = reScheduleStudentData;
            tempReschedule[index].reschedule = rescheduleDate

            console.log("reschedule date =",tempReschedule)

            setReScheduleStudent(tempReschedule)
          }
          

            // addNewSubCourse(courseName,courseCode,mainCourse)
          Swal.fire({
            title: `${result.value}`,
            
            imageUrl: result.value.avatar_url
          })
        }
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

  const setDemoStatus = (value, index)=>{

    
    
    let tempInpVal  = inpval;
    console.log("indexing value =",tempInpVal.demoStudent[index])
    tempInpVal.demoStudent[index].status = value;
    console.log("status value =",index,value, tempInpVal)

    setINP(tempInpVal)

    if(value=="ReScheduled"){
      addRescheduleDate(index, "fromAddedDemo")
    }

    

  }

  // update status of reschedule status function

  const setRescheduleStatus =(value,index)=>{

    let tempInpVal  = reScheduleStudentData;
    console.log("indexing value =",reScheduleStudentData[index])
    tempInpVal[index].status = value;
    console.log("status value =",index,value, tempInpVal)

    setReScheduleStudent(tempInpVal)

    if(value=="ReScheduled"){
      addRescheduleDate(index,"updateReschedule")
    }

  }

  const updateTodayDemo = (course, mobile)=>{

    console.log("clicking button working =",course,mobile, inpval)
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
                  <h4>Add Demo</h4>
                  <h4>Total Demo: {inpval.totalCount}</h4>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">
                             Demo Date
                            </label>
                            <input
                              type="date"
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                  
                                });
                                console.log("date value =",e.target.value)
                                
                              }}
                              name="date"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>

                          <button className="btn btn-primary" onClick={()=>{getDemo();getReSchedule()}}>Search</button>
                        </div>

              
              
            </div>

<div className="btn-group d-flex">
<button className="btn btn-primary"  onClick={()=>setBtnStatus("today-added-demo")}>Today Added Demo</button>
<button className="btn btn-primary" onClick={()=>setBtnStatus("reschedule-demo")}>Reschedule Demo</button>
</div>

          </div>

          

        </div>

       {(btnStatus=="today-added-demo") && <div className="content-body">
        <h3 className="p-30">Today Added Demo</h3>
        <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Date</th>
          <th>Status</th>
          <th>Delete</th>
          </tr>
      {inpval.demoStudent.map((element,index)=>{
        return(
          <tr>
         <td> {element.name} </td>
         <td> {element.course} </td>
         <td> {inpval.date} </td>
         <td>
         <select
                        id="exampleInputPassword1"
                        type="select"
                        name="leadfrom"
                        class="custom-select mr-sm-2"
                        defaultValue={element.status}
                        onChange={(e)=>{setDemoStatus(e.target.value,index)}}
                      
                    >
                        <option disabled>--select Demo Status--</option>
                    
                                <option value="Done">Done</option>
                                <option value="Not Joined">Not Joined</option>                       
                                <option value="ReScheduled">ReScheduled</option>                      
                                <option value="Schedule">Schedule</option>                      
                        
                    </select>
         </td>
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
                            Submit Demo
                          </button>
                          </div>

        </div>}

        {(btnStatus=="reschedule-demo") && <div className="content-body">
        <h3>Reschedule Demo</h3>
        <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Date</th>
          <th>Reschedule Date</th>
          <th>Status</th>
          </tr>
      {reScheduleStudentData && reScheduleStudentData.map((element,index)=>{
        return(
          <tr>
         <td> {element.name} </td>
         <td> {element.course} </td>
         <td> {element.scheduleDate} </td>
         <td> {element.reschedule} </td>
         <td>
         <select
                        id="exampleInputPassword1"
                        type="select"
                        name="leadfrom"
                        class="custom-select mr-sm-2"
                        defaultValue={element.status}
                        onChange={(e)=>{setRescheduleStatus(e.target.value,index)}}
                      
                    >
                        <option disabled>--select Demo Status--</option>
                    
                                <option value="Done" >Done</option>
                                <option value="Not Joined" >Not Joined</option>                       
                                <option value="ReScheduled" >ReScheduled</option>                      
                                <option value="Schedule" >Schedule</option>                      
                        
                    </select>
         </td>
         {/* <td class="cursor-pointer" onClick={e=>{deleteCourseLead(element.course, element.lead)}}> X </td> */}
         </tr>
        )
      })}
      </table>
      
      <div className="d-flex">
      <button
                            type="submit"
                            onClick={updateReschedule}
                            className="btn btn-primary"            
                            // disabled={allFieldStatus===false?true:false}
                          >
                           Update Rescheduled Demo
                          </button>
                          </div>

        </div>}
      </div>
    </>
  );
};

export default CounsellorDemoAdd;
