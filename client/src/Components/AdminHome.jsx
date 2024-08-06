import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MessageIcon from "@mui/icons-material/Message";
import { NavLink, useNavigate } from "react-router-dom";
import { adddata, deldata, updatedata } from "../context/ContextProvider";
import Swal from "sweetalert2";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { StudentContext } from "../context/StudentState";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  let ContextValue = useContext(StudentContext);

  document.title = "Counsellor Dashboard - Admin panel";

  const navigation = useNavigate();
  const navigate = useNavigate();

  let sameDateTime = [];
  let studentData  = [];

  const [allStudent, setAllStudent] = useState();
  const { dltdata, setDLTdata } = useContext(deldata);
  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const [totalStudent, setTotalStudent] = useState();
  const [newStudent, setNewStudent] = useState();
  const [pastSevenStudent, setPastSevenStudent] = useState();
  const [processBar, setProcessBar] = useState();
  // const [searchQuery, setSearchQuery] = useState();
  const [allStudentData, setAllStudentData] = useState();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const [totalItem, setTotalItem] = useState();
  const [currentTrainer, setCurrentTrainer] = useState();
  const [user, setUser] = useState("student");
  const [currentStudent, setCurrentStudent] = useState();
  const [counselor, setCounselor] = useState();
  const [total, setTotal] = useState();
  const [newTotal, setNewTotal] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalrunningBatch, setTotalRunningBatch] = useState();
  const [register, setRegister] = useState();
  const [currentRegister, setCurrentRegister] = useState();
  const [allDemo, setAllDemo] = useState();
  const [newDemo, setNewDemo] = useState();
  const [demoList, setDemoList] = useState();
  const [demoStudentData, setDemoStudentData] = useState();
  const [allDemoList, setAllDemoList] = useState();
  const [newDemoStudentData, setNewDemoStudentData] = useState();
  const [newDemoList, setNewDemoList] = useState();
  const [upcomingDemoList, setUpcomingDemoList] = useState();
  const [upcomingDemoStudent, setUpcomingDemoStudent] = useState();
  const [allCourse, setAllCourse] = useState();
  const [allCourseLength, setAllCourseLength] = useState();
  const [course, setCourse] = useState();
  const [weekDaysBatch, setWeekDaysbatch] = useState();
  const [weekEndBatch, setWeekEndBatch] = useState();
  const [currentMonth, setCurrentMonth] = useState('');
  const [dataStatus, setDataStatus] = useState("month")
  const [leadCount, setLeadCount] = useState(0)
  const [totalLead,setTotalLead] = useState()
  const [visitCount, setVisitCount] = useState(0)
  const [totalVisit,setTotalVisit] = useState()
  const [demoCount, setDemoCount] = useState(0)
  const [totaldemo,setTotalDemo] = useState()
  const [followUpCount, setFollowUpCount] = useState(0)
  const [totalfollowUp,setTotalFollowUp] = useState()
  const [timeValue,setTimeValue] = useState() 
  const [id, setId] = useState()
  const [pageStatus, setPageStatus] = useState("lead data")
  const [leadData, setLeadData] = useState([])
  const [allCounsellor, setAllCounsellor] = useState([])
  const [counsellorAd, setCounsellorAd] = useState()
  const [rangeDate, setRangeDate]=  useState({
    startDate:"",
    endDate:""
  })


  const[allAd, setAllAd] = useState([])

  const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]


  //All Trainer
  let tempCurrentStudent;
  const [getuserdata, setUserdata] = useState("");
  console.log("trainer");
  const getTrainerdata = async () => {
    const res = await fetch("http://localhost:8000/trainer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("trainer data =", data);
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      setCurrentTrainer(data);
      localStorage.setItem("allTrainer", JSON.stringify(data));
    }
  };

  // start end date function

  const setStartEndate = (timeValue) => {
    console.log("start and end date =", timeValue);
    let today = new Date();
    let startDate, endDate;
  
    if (timeValue === "Today") {
        startDate = today;
        endDate = new Date(today);
    } else if (timeValue === "Yesterday") {
        today.setDate(today.getDate() - 1); // Subtract 1 day to get yesterday
        startDate = today;
        endDate = new Date(today);
    } else if (timeValue === "Last Week") {
        endDate = new Date(); // Current date
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7); // Subtract 7 days to get a week ago
    } else {
        // Handle the case when time is not recognized
        console.error("Invalid time option");
        return;
    }
  
    // Add one day to endDate
    endDate.setDate(endDate.getDate() + 1);
  
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    console.log("start date and end date =", startDateStr, endDateStr);
    setRangeDate({...rangeDate, ["startDate"]: startDateStr, ["endDate"]: endDateStr});
  
    return { startDate: startDateStr, endDate: endDateStr };
};

  const getAllCourses = async () => {
    console.log("all course function");
    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    let allCourse = await ContextValue.getAllMainSubCourse();

    console.log("all course =", allCourse);
    setAllCourse(allCourse.allCourse);
    setAllCourseLength(allCourse.courses.length);
    setCourse(allCourse.courses);
    ContextValue.updateProgress(100);
    ContextValue.updateBarStatus(false);
  };

  useEffect(() => {
    // fetchAdminStatus();

    console.log("auth token of counselor =",localStorage.getItem("admin"))

    let date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(parseInt(date.getMonth()) + 1).padStart(2,'0')
    const year = date.getFullYear();

    setRangeDate({...rangeDate, ["startDate"]:`${year}-${month}-${day}`, ["endDate"]:`${year}-${month}-${day}`})

    fetchUser()
  
    getAllCounselor()
  }, []);

  const fetchUser = ()=>{
    if(localStorage.getItem("admin")){
      setCurrentMonthFunc()
    // getRegisteredStudent();
    
    getAllCourses();
    setStartEndate("today")
    getAllAd()
  
    }

    else{
      navigate('/')
    }
  }

  // get all counsellor data

  const getAllCounselor = async()=>{
    let counsellor = await ContextValue.getAllCounselor()

    console.log('counsellor all =',counsellor.counselorData)

    setAllCounsellor(counsellor.counselorData)
  }

  // get All ad

  const getAllAd =async()=>{

    try{
        let totalAd = await fetch('http://localhost:8000/getFacebookAdsData',{
          method:'GET',
    
        })
    
        totalAd = await totalAd.json();
        

        if(totalAd.dbADLength==0){
        let tempAllAd =  totalAd.data.map(data=>{
          return{
            id:data.id,
            name:data.name,
            creative:data.creative,
            status:data.status,
            created_time:data.created_time,
            assigned_counsellor:"",
            assigned_counsellor_name:""
          }
          
        })

        setAllAd(tempAllAd)
        setCounsellorAd(tempAllAd.obj)
        console.log("all ad page from if=",tempAllAd);
      }
      else{
        setAllAd(totalAd.data)
        setCounsellorAd(totalAd.obj)
        console.log("all ad page from else=",totalAd,totalAd.data);
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

  }

  // success Msg

  const SuccessMsg=()=>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: ``,
      showConfirmButton: false,
      timer: 1500
    })
    
  }


  const setCurrentMonthFunc = ()=>{
    
    const now = new Date();
    // Get the current month and year
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    // Set the value to the current month and year
    setCurrentMonth(`${year}-${month}`);
    getRegisteredStudentMonth(month)
  }

  // get month wise data


  const getRegisteredStudentMonth = async(month)=>{
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    let registeredStudent = await ContextValue.getRegisterStudentMonth(month)
    console.log("month wise student data =",registeredStudent)
    setRegister(registeredStudent)
    setCurrentRegister(registeredStudent)

    ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
  }
 

  const showMessagedialog = async (id) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (text) {
      Swal.fire(text);
    }

    let checkId = [{ id }];

    let sendData = await fetch("http://localhost:8000/sendmessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, checkid: checkId, from: "admin" }),
    });

    let fetchData = await sendData.json();
  };

  //sweetalert

  //Delete student

  //search
  const fetchQueryData = (Query) => {
    if (user === "student") {
      let filterQueryData = allStudentData.filter((data) => {
        return (
          data.Name.toLowerCase().includes(Query.toLowerCase()) ||
          data.EnrollmentNo.toLowerCase().includes(Query.toLowerCase())
        );
      });
      setCurrentStudent(filterQueryData);
    }
    if (user === "register") {
      let filterRegisterData = register.filter((data) => {
        return (
          data.Name.toLowerCase().includes(Query.toLowerCase()) ||
          data.RegistrationNo.toLowerCase().includes(Query.toLowerCase())
        );
      });

      setCurrentRegister(filterRegisterData);
    }

    if (user === "trainer") {
      let filterTrainerData = getuserdata.filter((data) => {
        return (
          data.Name.toLowerCase().includes(Query.toLowerCase()) ||
          data.code.toLowerCase().includes(Query.toLowerCase())
        );
      });
      setCurrentTrainer(filterTrainerData);
    }
    if (user === "counselor") {
      let filterCounselorData = counselor.filter((data) => {
        return (
          data.Name.toLowerCase().includes(Query.toLowerCase()) ||
          data.counselorNo.toLowerCase().includes(Query.toLowerCase())
        );
      });
      setCounselor(filterCounselorData);
    }
  };

  const badgeStatus = {
    pending: "warning",
    backout: "dark",
    deactive: "danger",
    active: "success",
  };
  const registerStatus = {
    Process: "warning",
    Added: "success",
    BackOut: "dark",
  };

  const setFromTime =(fromTime)=>{
    // const startDateStr =  formatDate(new Date(fromTime))
    setRangeDate({...rangeDate, ["startDate"]:fromTime})
    // console.log("from time ",startDateStr)
    
   }
   const setToTime =(toTime)=>{
    // const endDateStr = formatDate(new Date(toTime))
    setRangeDate({...rangeDate, ["endDate"]:toTime})
    // console.log("to time ",endDateStr)
   }

   const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
const month = String(parseInt(date.getMonth()) + 1).padStart(2,'0')
const year = date.getFullYear();

return (`${year}-${month}-${day}`)
  };


  const getLeadData = async()=>{

    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true) 

    console.log("index and id =",id)

    try{
        let totalAdData = await fetch('http://localhost:8000/getRangefacebookLeadData',{
          method:'GET',
          headers:{
            id:id,
            startDate:rangeDate.startDate,
            endDate:rangeDate.endDate
          }
        })

        ContextValue.updateProgress(60)
    
        totalAdData = await totalAdData.json();

        ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)

        // setAllAd(totalAdData.data)
        console.log("all lead data =",totalAdData.data);
        setLeadData(totalAdData.data)
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

  const setAssignedCounsellor  =(index)=>{

    var selectElement = document.getElementsByClassName("assigned-counsellor-class");

    console.log("selected index =",selectElement[index].selectedIndex,index, allAd[index].id)

    let tempObj = counsellorAd;

  //  for(let a in tempObj){
  //   tempObj[a].map(data=>{
  //         if(data.id==allAd[index].id){
  //           console.log("matching happen =",data.id)
  //           delete data.id
  //         }
  //     })
  //  }

  for (let a in tempObj) {
    tempObj[a] = tempObj[a].filter(data => {
        if (data.id === allAd[index].id) {
            console.log("Matching happened =", data.id);
            return false; // This will exclude the item from the new array
        }
        return true;
    });
}

    let tempArr = tempObj[allCounsellor[selectElement[index].selectedIndex].counselorNo]

    let obj = {
      id:allAd[index].id,
      name:allAd[index].name
    }

    tempArr.push(obj)
    
    tempObj[allCounsellor[selectElement[index].selectedIndex].counselorNo] = tempArr
    setCounsellorAd(tempObj)

    console.log("temp obj ad  =",tempObj)

// Check if the element exists

    let tempAllAd = allAd

    tempAllAd[index].assigned_counsellor = allCounsellor[selectElement[index].selectedIndex].counselorNo
    tempAllAd[index].assigned_counsellor_name = allCounsellor[selectElement[index].selectedIndex].Name

    setAllAd(tempAllAd)
    console.log("assigned counselor all ad =",tempAllAd)
  }

  const assignedCounsellor =async()=>{

    ContextValue.updateProgress(60);
    try {

      let url = `http://localhost:8000/adData`

      ContextValue.updateProgress(60);
      ContextValue.updateBarStatus(true);

      const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("counsellor")
        },
        body: JSON.stringify({allAd, counsellorAd}),
      });

      ContextValue.updateProgress(60);

      const data = await res.json();

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
  }

  return (
    <>
      <Header />

     

      <div className="sidebar-main-container">
        {/* <Sidebar /> */}
        <div className="content-body">

        <div className="btn-conatiner d-flex justify-content-initial">
          <button className="btn btn-primary" onClick={e=>{setPageStatus("lead data")}}>Lead Data</button>
          <button className="btn btn-primary" onClick={e=>{setPageStatus("assigned counsellor")}}>Assigned Counsellor</button>
        </div>

        <div className="d-flex flex-col align-items-center">

                           
              
       {pageStatus=="lead data" && <div className="d-flex j-c-initial c-gap-40">
    {allAd.length>0 && 
    <>
    <select
    id="exampleInputPassword1"
    type="select"
    name="Course"
    class="custom-select mr-sm-2"
    onChange={e =>{setId(e.target.value)}}
>  
   { allAd.map((data,index)=>{
                    
                    return(
                    <option value={data.id}>{data.name}</option>
                    )
                
    })}
    
    </select>
    
    {/* <button className='filter-btn' onClick={()=>getLeadData()}>Search</button> */}
    </>
    }
    </div>}

          <div>
            
           {/* <input type="month"/> */}

        { pageStatus=="lead data" &&  <div className="d-flex j-c-initial c-gap-40">
                  <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"
                        onChange={e =>{ setTimeValue(e.target.value);setStartEndate(e.target.value)}}
                    >
                        <option disabled selected>--select Time--</option>
                    
                                <option value="Today">Today</option>
                                <option value="Yesterday">Yesterday</option>
                                <option value="Last Week">Last Week</option>
                                <option value="Select Range">Select Range</option>
                        
                        
                    </select>

                     {timeValue==="Select Range" && 
                     <>
                     <label>From</label>
                      <input type="date" class="custom-select mr-sm-2" onChange={e=>setFromTime(e.target.value)}></input>
                      <label>To</label>
                      <input type="date" class="custom-select mr-sm-2" onChange={e=>setToTime(e.target.value)}></input>
                      </>}

          <button className='filter-btn' onClick={()=>getLeadData()}>Search</button>
          </div>}

          </div>
    
      </div>
          {/* row */}
          <div className="container-fluid">
            <div className="row total-detail-container">
             {pageStatus=="lead data" && <div className="detail-card">   

            {leadData.length>0 && 
             <table id="datatable" class="table table-striped table-bordered lead-table" cellspacing="0" width="100%">
            <tr>
         {
          leadData[0].field_data.map((data,index)=>{
                       return(
                        <th>{data.name}</th>
                       )
          })}
         
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
        
           
         </tr>
        )
      })}
      </table>}
              
              
              </div>}

      {pageStatus=="assigned counsellor" && <div className="detail-card">   

{allAd.length>0 && 
 <table id="datatable" class="table table-striped table-bordered lead-table" cellspacing="0" width="100%">
<tr>
         
<th>s.no</th>
<th>Ad name</th>
<th>Created Time</th>
<th>Counsellor Assigned</th>

</tr>
{allAd.map((data,index)=>{
return(
<tr>
  
      <td>{index+1}</td>
      <td>{data.name}</td>
      <td>{formatDate(new Date(data.created_time))}</td>
      <td>
      <select
      type="select"
    name="Course"
    className="custom-select mr-sm-2 assigned-counsellor-class"
    onChange={e =>{setAssignedCounsellor(index)}}
    defaultValue={data.assigned_counsellor_name}
>  
   { allCounsellor.map((data,index)=>{
                    
                    return(
                    <option value={data.Name}>{data.Name}</option>
                    )
                
    })}
    
    </select>
      </td>
      </tr>
)
 } )
}

</table>}
  
  
<div className="d-flex mt-2 assigned-btn-container">
    <button className="btn btn-primary assigned-btn" onClick={(e)=>{assignedCounsellor()}}>Assigned Counsellor</button>

    </div>

  </div>
  
  
  }




            </div>
          </div>
        </div>
      </div>

    </>
  );
}
