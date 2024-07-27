import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Cslidebar from "./Cslidebar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

const CounsellorTotalLead = () => {
  let navigate = useNavigate();

  const [allcourse, setAllCourse] = useState();
  const [trainer, setTrainer] = useState();
  const [course, setCourse] = useState();
  const [methodStatus, setMethodStatus] = useState();
  const [allFieldStatus, setAllFieldStatus] = useState(false);
  const [counselor, setCounselor] = useState();
  const [leadStatus, setLeadStatus] = useState("Lead")
  const [currentCourseCount, setCurrentCourseCount] = useState([])
  const [demoData, setDemoData] = useState({
    date:"",
    demoStudent:[],
    month:"",
    day:"",
    year:"",
  })
  const [visitData, setVisitData] = useState([])
  const [followUpData, setFollowUpData] = useState([])
  const [currentDate, setCurrentDate]  = useState([])

  // const location = useLocation();
  // const { counselor } = location.state;

  let ContextValue = useContext(StudentContext);

  useEffect(() => {

    fetchUser()
    console.log("use Effect is running");
    
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
    sttaus:"",
  });

  const [leadData, setLeadData] = useState({
    date:"",
    counselorNo:"",
    student:[]
  })

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

    setINP({ ...inpval, ["Leadby"]: tempcourseLead, ["totalCount"]:totalcount});

    setCurrentCourseCount((prevData)=>{
      let tempcurrentCount = [...prevData];

      tempcurrentCount.map((data,index)=>{

        if(data.course==courseName && data.lead==lead){
          tempcurrentCount[index] = {
            course:data.course,
            count:"",
            lead:data.lead,
            checked:false
          }
        }
      })

      return tempcurrentCount;
    })


  }

  const addinpdata = async (e) => {
    e.preventDefault();
    if(inpval.leadfrom==""){
      alert("please select lead category")
    }
    else{
      console.log('inpval data =',inpval, leadStatus)
      let tempCourseLead = inpval.Leadby;

    allcourse.map((data,index)=>{
    console.log("inside map =",(document.getElementsByClassName('checkboxClass')[index].checked)==true)

      if((document.getElementsByClassName('checkboxClass')[index].checked)==true){
        // tempCourseLead.push({
        //   course:data.course,
        //   count:document.getElementsByClassName("count-input")[index].value,
        //   lead:inpval.leadfrom
        // })

         let prevCourseLead = false;

    tempCourseLead.map(element=>{
      if(element.course==data.course && element.lead==inpval.leadfrom){
        element.count = document.getElementsByClassName("count-input")[index].value
        prevCourseLead = true;
      }
    })

    if(!prevCourseLead)
      {

    let tempObj = {
      course:data.course,
      count:document.getElementsByClassName("count-input")[index].value,
      lead:inpval.leadfrom
    }

    tempCourseLead.push(tempObj);
  }

      }

    })


  let totalcount = 0;

  tempCourseLead.map(data=>{

      totalcount = totalcount + parseInt(data.count)

    })

    console.log("course lead temp =",tempCourseLead)

    setINP({ ...inpval, ["course"]: tempCourseLead, ["totalCount"]:totalcount});}
    

  };

  // get selected date data

  const getLeadData = async()=>{

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    // console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{
      let totalLead = await fetch('http://localhost:8000/readSheetData',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":inpval.date,
          "endDate":inpval.date
        }
      })

      ContextValue.updateProgress(60);
  
      totalLead = await totalLead.json();
      console.log("lead count =",totalLead);
      if(totalLead.filteredRows.length>0)
      {

        setINP(totalLead.filteredRows)
        setLeadData({...leadData,["date"]:currentDate, ["student"]:totalLead.filteredRows})
        

      }
      // setINP({...inpval,["totalCount"]:totalLead.totalCount})

      ContextValue.updateProgress(100);
      ContextValue.updateBarStatus(false);
      SuccessMsg(leadStatus);
    }
      catch(error){

        console.log("error =",error.message)
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

    let tempLeadData = leadData;
    tempLeadData.student  = inpval


    try {

      let url = `http://localhost:8000/counselorLead`
      ContextValue.updateProgress(60);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(tempLeadData),
      });

      // ContextValue.updateProgress(60);

      const data = await res.json();

      if(data.status){

        try {

          let url = `http://localhost:8000/counselorDemo`
          ContextValue.updateProgress(60);
    
          const res = await fetch(`${url}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("counsellor")
            },
            body: JSON.stringify(demoData),
          });
    
          ContextValue.updateProgress(60);
    
          const data = await res.json();
    
          if(data.status && (visitData.length>0 || followUpData>0)){
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
        
              const data = await res.json();
        
              console.log("progress bar 100")
    
              if(data.status && followUpData.length>0){
                try {
    
                  let url = `http://localhost:8000/counselorFollowUp`
                  ContextValue.updateProgress(60);
            
                  const res = await fetch(`${url}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": localStorage.getItem("counsellor")
                    },
                    body: JSON.stringify(followUpData),
                  });
            
                  // ContextValue.updateProgress(60);
            
                  const data = await res.json();
            
                  console.log("progress bar 100")
    
                  if(data.status){
                    ContextValue.updateProgress(100);
                    ContextValue.updateBarStatus(false);
                    SuccessMsg("Visit");
                  }
    
                  else{
                    ContextValue.updateProgress(100);
                    ContextValue.updateBarStatus(false);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                    });
              
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
              }
    
              else if(data.status && followUpData.length<=0){
                ContextValue.updateProgress(100);
                ContextValue.updateBarStatus(false);
                SuccessMsg("Visit");
              }
    
              else if(data.status == false){
                ContextValue.updateProgress(100);
              ContextValue.updateBarStatus(false);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
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
          }
    
          else if(data.status){
            ContextValue.updateProgress(100);
            ContextValue.updateBarStatus(true);
          }
    
          else if(data.status==false){
            ContextValue.updateProgress(100);
            ContextValue.updateBarStatus(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          } 
    
          console.log("progress bar 100", data)
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

      }

      else{
        ContextValue.updateProgress(100);
          ContextValue.updateBarStatus(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
      }

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

  // update current array 

  const updateCurrentArr = (lead)=>{

    let courseCount =[];

    // console.log("inpval =",inpval,inpval.Leadby.length)
    
    if(inpval.Leadby.length>0){

      console.log("if condition lead length")

      allcourse.map((data,index)=>{

        let match = false;
        for(const element of inpval.Leadby){
          if(element.course==data.course && element.lead==lead){
           
            match = true;
            courseCount.push({
              course:data.course,
              lead:lead,
              count:element.count,
              checked:true
            })

          }
        }

        if(!match){
          courseCount.push({
            course:data.course,
            lead:lead,
            count:"",
            checked:false
          })
        }
      
      })

    }
    else{

      console.log("else condition lead length")

      courseCount = allcourse.map(data=>{
        return ({
            lead:lead,
            count:"",
            checked:false,
            course:data.course
        })
      })
    }

    setCurrentCourseCount(courseCount)

    console.log("course count  =",courseCount)



  }

  const setCourseLead  =(index, value)=>{

    // console.log("course lead index =",index,value,document.getElementsByClassName('checkboxClass')[index].checked)
  }

  // update current course count and checbox

  // const setCurrentCourseCountFunc =(index, value, from)=>{

  //   console.log("set current course count func=",index, value , from)

  //   let tempCourseCount  = currentCourseCount;
  //   if(from=="checkbox"){
  //     tempCourseCount[index].checked = document.getElementsByClassName("checkboxClass")[index].checked
  //   }
  //   else{
  //     tempCourseCount[index].count = value;
  //   }

  //   setCurrentCourseCount(tempCourseCount)
  // }


  const setCurrentCourseCountFunc = (index, value, from) => {
    console.log("set current course count func =", index, value, from);

    setCurrentCourseCount((prevState) => {
      const tempCourseCount = [...prevState];
      if (from === "checkbox") {
        tempCourseCount[index].checked = document.getElementsByClassName("checkboxClass")[index].checked;
        if((document.getElementsByClassName("checkboxClass")[index].checked)==false){
          let tempInpValLeadBy = inpval.Leadby.filter(data=>{
            return(!(data.course==currentCourseCount[index].course && data.lead==currentCourseCount[index].lead))
          })

          setINP({...inpval, ["Leadby"]:tempInpValLeadBy})
        }
      } else {
        tempCourseCount[index].count = value;
      }
      return tempCourseCount;
    });
  };


  function formatDateString(dateString) {
    // Create a Date object from the ISO 8601 string
    const date = new Date(dateString);

    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Format the date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
}

// add status function

const addStatus  =(value,element,index)=>{

  if(inpval[index].status=="")
  {

  if(value=="Demo"){
    addDemo(element,index, value)
  }
  else if(value=="Visit"){
    addVisit(element, index, value)
  }
  else if(value=="Follow Up"){
    addFollowUp(element, index, value)
  }
}

else if(inpval[index].status!=value){
  if(inpval[index].status=="Demo"){
    let tempDemoData = demoData;
    let tempDemoStudent = tempDemoData.demoStudent.filter(data=>{
        return (!(data.name==element.name && data.mobile==element.mobile))
    })

    tempDemoData.demoStudent  = tempDemoStudent;
    setDemoData(tempDemoData)
  }
  else if(inpval[index].status=="Visit"){
    let tempVisitData = visitData.filter(data=>{
        return (!(data.name==element.name && data.mobile==element.mobile))
    })

    setVisitData(tempVisitData)
  }
  else if(inpval[index].status=="Follow Up"){
    let tempFollowUpData = followUpData.filter(data=>{
        return (!(data.name==element.name && data.mobile==element.mobile))
    })

    setFollowUpData(tempFollowUpData)
  }

  if(value=="Demo"){
    addDemo(element,index, value)
  }
  else if(value=="Visit"){
    addVisit(element, index, value)
  }
  else if(value=="Follow Up"){
    addFollowUp(element, index, value)
  }
}

}

// add demo function

const addDemo = (element, index, value)=>{

  console.log(' index of student =',index)
  Swal.fire({
      title: 'Add Reschedule Date',
      html:
          `<input id="demoDate" type="date" class="swal2-input" placeholder="Add Date">
          <input id="trainer" type="text" class="swal2-input" placeholder="Add Trainer">`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        const demoDate = document.getElementById('demoDate').value;
        const trainer = document.getElementById('trainer').value;
        

        let tempDemoData = demoData;

        tempDemoData.date = currentDate;

        let obj = {
          name:element.name,
          course:element.course,
          mobile:element.mobile,
          trainer:trainer,
          status:"Schedule",
          reschedule:demoDate,
          scheduleDate:currentDate
        }

        tempDemoData.demoStudent.push(obj)
        setDemoData(tempDemoData)

        let tempInpVal = inpval;
        tempInpVal[index].status=value
        setINP(tempInpVal)

        console.log("temp demo student =",tempDemoData)

        Swal.fire({
          title: `${result.value}`,
          
          imageUrl: result.value.avatar_url
        })
      }
    })
}

// add visit function

const addVisit = (element, index, value)=>{

  console.log(' index of student =',index)
  Swal.fire({
      title: 'Add Visit Date',
      html:
          `<input id="visitDate" type="date" class="swal2-input" placeholder="Add Date">`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        const visitDate = document.getElementById('visitDate').value;

        console.log("date =",currentDate, inpval)
        
        let tempVisitData = visitData;

        let obj = {
          date:currentDate,
          name:element.name,
          course:element.course,
          mobile:element.mobile,
          visitTrainer:"",
          visitCounsellor:"",
          visitDate:visitDate,
          visitStatus:"Schedule",
        }

        tempVisitData.push(obj)
        setVisitData(tempVisitData)

        let tempInpVal = inpval;
        tempInpVal[index].status=value
        setINP(tempInpVal)


        console.log("tempVisitData =",tempVisitData)

        Swal.fire({
          title: `${result.value}`,
          
          imageUrl: result.value.avatar_url
        })
      }
    })

}

// add follow up function

const addFollowUp = (element, index, value)=>{

  console.log(' index of student =',index)
  Swal.fire({
      title: 'Add Reschedule Date',
      html:
          `<input id="followUpDate" type="date" class="swal2-input" placeholder="Add Follow Up Date">
          <input id="remark" type="text" class="swal2-input" placeholder="Add Remark">`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        const followUpDate = document.getElementById('followUpDate').value;
        const remark = document.getElementById('remark').value;
        

        let tempFollowUpData = followUpData;
      
        let obj = {
          name:element.name,
          course:element.course,
          mobile:element.mobile,
          status:"Schedule",
          FollowUp:[{
            date:followUpDate,
            remark:remark
          }],
          lastFollowUpDate:followUpDate,
          status:"Schedule"
        }

        tempFollowUpData.push(obj)
        setFollowUpData(tempFollowUpData)

        let tempInpVal = inpval;
        tempInpVal[index].status=value
        setINP(tempInpVal)


        console.log("temp demo student =",tempFollowUpData)

        Swal.fire({
          title: `${result.value}`,
          
          imageUrl: result.value.avatar_url
        })
      }
    })
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
                  <h4>Total Lead: {inpval.length}</h4>
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
                                setCurrentDate(e.target.value)
                              }}
                              name="date"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                          <button onClick={getLeadData} className="btn btn-primary">Search</button>
                        </div>
              
            </div>
          
          </div>

          

        </div>

       {inpval.length>0 && <div className="content-body">
        <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <tr>
          <th>Course</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Date</th>
          <th>Status</th>
          </tr>
      {inpval.map((element,index)=>{
        return(
          <tr>
         <td> {element.course} </td>
         <td> {element.name} </td>
         <td> {element.mobile} </td>
         <td> {formatDateString(element.date)} </td>
         <select
                        id="exampleInputPassword1"
                        type="select"
                        name="leadfrom"
                        class="custom-select mr-sm-2"
                        onChange={(e)=>{
                          addStatus(e.target.value,element,index)
                        }}
                      
                    >
                        <option disabled selected >--select Status--</option>
                    
                                <option value="Demo">Demo</option>
                                <option value="Visit" >Visit</option>
                                <option value="Follow Up" >Follow Up</option>                     
                        
                    </select>
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
                            Submit Lead
                          </button>
                          </div>
        </div>}
      </div>
    </>
  );
};

export default CounsellorTotalLead;
