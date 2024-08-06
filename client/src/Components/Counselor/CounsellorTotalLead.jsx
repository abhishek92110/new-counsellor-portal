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
  const [addedLead, setAddedLead] = useState([])
  const [assignedAd, setAssignedAd] = useState([])
  const [id, setId] = useState({})

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
      getCounsellorAd();
    }

    else{
      navigate('/')
    }
  }

  // get all counsellor ad

  const getCounsellorAd = async()=>{

    try
    {
      let counsellorAd = await fetch('http://localhost:8000/getCounsellorAd',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo")
        }
      })

      ContextValue.updateProgress(60);
  
      counsellorAd = await counsellorAd.json();
      console.log("counsellorAd =",counsellorAd,counsellorAd.cousnellorDataAd);
      setAssignedAd(counsellorAd.cousnellorDataAd)
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
    endDate:"",
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

  const [allLeadData, setAllLeadData] = useState({
    id:"",
    date:"",
    students:[]
  })

  const [leadData, setLeadData] = useState([])

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


  // setStartEnd Date function

  const setStartEndate = (timeValue) => {
    console.log("start and end date =", timeValue);
    let today = new Date(timeValue);
    let startDate, endDate;
  
   
        startDate = today;
        endDate = new Date(today);
  
    // Add one day to endDate
    endDate.setDate(endDate.getDate() + 1);
  
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    console.log("start date and end date =", startDateStr, endDateStr);
    setINP({...inpval, ["date"]: startDateStr, ["endDate"]: endDateStr});
  
    return { startDate: startDateStr, endDate: endDateStr };
};

// format date function

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
const month = String(parseInt(date.getMonth()) + 1).padStart(2,'0')
const year = date.getFullYear();

return (`${year}-${month}-${day}`)
};


  // get selected date data

  const getLeadData = async()=>{

    console.log("asssigned ad from getLead route=",assignedAd,id)

    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    // console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{

      // let totalLeadAdded = await fetch('http://localhost:8000/getcounselorLeadCount',{
      //   method:'GET',
      //   headers:{
      //     "counselorNo":localStorage.getItem("counsellorNo"),
      //     "startDate":inpval.date,
      //     "endDate":inpval.date
      //   }
      // })

      // totalLeadAdded = await totalLeadAdded.json()
      // if(totalLeadAdded.totalLead.length>0){
      //   console.log("if condition")
      // console.log("added lead =",totalLeadAdded)

      // setAddedLead(totalLeadAdded.totalLead[0].student)
      // setVisitData(totalLeadAdded.totalVisit)
      // setDemoData(totalLeadAdded.totalDemo)
      // setFollowUpData(totalLeadAdded.totalFollowUp)
      
      // }


      let totalLead = await fetch('http://localhost:8000/getRangefacebookLeadData',{
        method:'GET',
        headers:{
          "id":id,
          "startDate":inpval.date,
          "endDate":inpval.endDate
        }
      })

      ContextValue.updateProgress(60);
  
      totalLead = await totalLead.json();
      // setCurrentAdId(totalLead.adId)
      console.log("lead count facebok data=",totalLead,totalLead.adId);
      setLeadData(totalLead.data)
      setAllLeadData({...allLeadData, ["students"]:totalLead.data, ["date"]:inpval.date, ["id"]:totalLead.adId})
    //   if(totalLead.filteredRows.length>0)
    //   {

    //     if(totalLeadAdded.totalLead.length>0)
    //     {
    //     if(totalLead.filteredRows.length==totalLeadAdded.totalLead[0].student.length)
    //       {
    //     setINP(totalLeadAdded.totalLead[0].student)
    //     setLeadData({...leadData,["date"]:currentDate, ["student"]:totalLeadAdded.totalLead[0].student}) 
    //     }  
    //   }
    //   else{
    //     setINP(totalLead.filteredRows)
    //     setLeadData({...leadData,["date"]:currentDate, ["student"]:totalLead.filteredRows}) 
    //   }


    //     if(totalLeadAdded.totalLead.length>0)
    //     {
    //     if(totalLead.filteredRows.length>totalLeadAdded.totalLead[0].student.length)
    //       {
    //     let tempInpval = totalLeadAdded.totalLead[0].student;

    //     for(let i=((totalLeadAdded.totalLead[0].student.length)-1); i<((totalLead.filteredRows.length-1)); i++){
    //       tempInpval.push(totalLead.filteredRows[i])
    //     }


    //     setINP(tempInpval)
    //     setLeadData({...leadData,["date"]:currentDate, ["student"]:tempInpval }) 

    //     }   

    //   }
    // }
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

    let tempAllLeadData = allLeadData;
    tempAllLeadData.students = leadData

    try 
    {
      let url = `http://localhost:8000/counselorLead`
      ContextValue.updateProgress(60);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify(tempAllLeadData),
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

  console.log('value and index status =',value,element)

  if(leadData[index].status=="")
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

else if(leadData[index].status!=value)
  {
  if(leadData[index].status=="Demo"){
    let tempDemoData = demoData;
    let tempDemoStudent = tempDemoData.demoStudent.filter(data=>{
        return (!(data.id==element.id))
    })

    tempDemoData.demoStudent  = tempDemoStudent;
    setDemoData(tempDemoData)
  }
  else if(leadData[index].status=="Visit"){
    let tempVisitData = visitData.filter(data=>{
        return (!(data.id==element.id))
    })

    console.log("temp visit data =",tempVisitData)

    setVisitData(tempVisitData)
  }
  else if(leadData[index].status=="Follow Up"){
    let tempFollowUpData = followUpData.filter(data=>{
        return (!(data.id==element.id))
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

        tempDemoData.date = inpval.date;

        let obj = {}

        element.field_data.map(data=>{
          
          obj[data.name] = data.values

        })

        obj.trainer=trainer
        obj.status="Schedule"
        obj.demoStatus=""
        obj.reschedule=demoDate
        obj.scheduleDate=currentDate  
        obj.id = element.id      

        tempDemoData.demoStudent.push(obj)
        console.log("temp demo data =",tempDemoData,element.field_data)
        setDemoData(tempDemoData)

        let tempLeadData = leadData;
        tempLeadData[index].status = value
        setLeadData(tempLeadData)

        console.log("temp demo student =",tempDemoData,tempLeadData)

        Swal.fire({
          title: `${result.value}`,
          
          imageUrl: result.value.avatar_url
        })
      }
    })
}

// add visit function

const addVisit = (element, index, value)=>{

  console.log(' index of student =',index, visitData)
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

        let objNew = {}
        let obj ={}

        element.field_data.map(data=>{
          
          objNew[data.name] = data.values

        })
      
          obj.students = objNew
          obj.date = currentDate
          obj.visitTrainer = ""
          obj.visitCounsellor = ""
          obj.visitDate = visitDate
          obj.visitStatus = "Schedule"
          obj.id = element.id
       

        tempVisitData.push(obj)
        setVisitData(tempVisitData)

        let tempLeadData = leadData;
        tempLeadData[index].status=value
        setLeadData(tempLeadData)

        console.log("tempVisitData =",tempVisitData, tempLeadData)

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

        let obj = {}
        let objNew = {}

        element.field_data.map(data=>{
          
          objNew[data.name] = data.values

        })

          obj.students = objNew
          obj.status="Schedule"
          obj.FollowUp=[{
            date:followUpDate,
            remark:remark
          }]
          obj.lastFollowUpDate=followUpDate
          obj.status="Schedule"
          obj.date=currentDate
          obj.id=element.id
       

        tempFollowUpData.push(obj)
        setFollowUpData(tempFollowUpData)

        let tempLeadData = leadData;
        tempLeadData[index].status=value
        setLeadData(tempLeadData)


        console.log("temp demo student =",tempFollowUpData, tempLeadData)

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
                  <h4>Total Lead:</h4>

 {
                assignedAd.length>0 && 

                <select
                id="exampleInputPassword1"
                type="select"
                name="leadfrom"
                class="custom-select mr-sm-2"
                onChange={(e)=>{setId(e.target.value)}}
              
            >
              <option selected disabled>--Select Ad--</option>

             {   assignedAd.map(data=>{
                   return(
                    <option value={data.id}>{data.name}</option>
                   )
                })}
                
            </select>
              }

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
                                setStartEndate(e.target.value);
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

        {leadData.length>0 && 
        <>
             <table id="datatable" class="table table-striped table-bordered lead-table" cellspacing="0" width="100%">
            <tr>
         {
          leadData[0].field_data.map((data,index)=>{
                       return(
                        <th>{data.name}</th>
                       )
          })}
         
        <th>Status</th>

          </tr>
      {leadData.map((element,index)=>{
        return(
          <tr>
            {

              element.field_data.map(data=>{
                return(

                <td> {data.values} </td>
                )

                

              })
            }
         <select
                        id="exampleInputPassword1"
                        type="select"
                        name="leadfrom"
                        class="custom-select mr-sm-2"
                        onChange={(e)=>{
                          addStatus(e.target.value,element,index)
                        }}
                        defaultValue={element.status}                      
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
      

      <div className="d-flex mt-2">
      <button
                            type="submit"
                            onClick={addinpdataMail}
                            className="btn btn-primary"            
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Submit Lead
                          </button>
                          </div>
     
      </>
      }


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
                        defaultValue={element.status}                      
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
