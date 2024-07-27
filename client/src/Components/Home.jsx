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
  const [rangeDate, setRangeDate]=  useState({
    startDate:"",
    endDate:""
  })

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

  const setStartEndate = (timeValue) => {
    console.log("start and end date =",timeValue)
    let today = new Date();
    let startDate, endDate;
  
    if (timeValue === "Today") {
      startDate = today;
      endDate = today;
    } else if (timeValue === "Yesterday") {
      today.setDate(today.getDate() - 1); // Subtract 1 day to get yesterday
      startDate = today;
      endDate = today;
    } else if (timeValue === "Last Week") {
      endDate = new Date(); // Current date
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7); 

      console.log("start date and end date =",startDate, endDate)
      
    // Subtract 7 days to get a week ago
    } else {
      // Handle the case when time is not recognized
      console.error("Invalid time option");
      return;
    }
  
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    setRangeDate({...rangeDate, ["startDate"]:startDateStr, ["endDate"]:endDateStr})
  
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

    console.log("auth token of counselor =",localStorage.getItem("counsellor"))

    let date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(parseInt(date.getMonth()) + 1).padStart(2,'0')
    const year = date.getFullYear();

     setRangeDate({...rangeDate, ["startDate"]:`${year}-${month}-${day}`, ["endDate"]:`${year}-${month}-${day}`})


    fetchUser()


   
  }, []);

  const fetchUser = ()=>{
    if(localStorage.getItem("counsellor")){
      setCurrentMonthFunc()
    // getRegisteredStudent();
    
    getAllCourses();
    setStartEndate("today")
    getLead() 
    getDemo()
    getFollowUp()
    getVisit()
    }

    else{
      navigate('/')
    }
  }

  const getLead = async()=>{

    ContextValue.updateProgress(20);
    ContextValue.updateBarStatus(true);

    console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorLeadCount',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":rangeDate.startDate,
          "endDate":rangeDate.endDate
        }
      })
  
      totalLead = await totalLead.json();
      setTotalLead(totalLead.totalLead)
      setLeadCount(totalLead.totalCount)
      console.log("lead count =",totalLead);
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

  // get counselor demo

  const getDemo = async()=>{
    ContextValue.updateProgress(40);
    console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorDemoCount',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":rangeDate.startDate,
          "endDate":rangeDate.endDate
        }
      })
  
      totalLead = await totalLead.json();
      setTotalDemo(totalLead.totalLead)
      setDemoCount(totalLead.totalCount)

      let totalReschedule = await fetch('http://localhost:8000/getcounselorDemoReschedule',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":rangeDate.startDate,
          "endDate":rangeDate.endDate
        }
      })

      totalReschedule = await totalReschedule.json();

      console.log("demo count  =",totalLead, totalReschedule);
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

  // get counselor visit 

  const getVisit = async()=>{
    ContextValue.updateProgress(80);
    console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorVisitCount',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":rangeDate.startDate,
          "endDate":rangeDate.endDate
        }
      })
  
      totalLead = await totalLead.json();
      setTotalVisit(totalLead.totalLead)
      setVisitCount(totalLead.totalLead.length)
      console.log("visit count =",totalLead);

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

  // get counselor  follow up 


  const getFollowUp = async()=>{

    ContextValue.updateProgress(60);
    console.log("counsellor no from getLead =",localStorage.getItem("counsellorNo"),rangeDate.startDate,rangeDate.endDate)

    try{
      let totalLead = await fetch('http://localhost:8000/getcounselorFollowUpCount',{
        method:'GET',
        headers:{
          "counselorNo":localStorage.getItem("counsellorNo"),
          "startDate":rangeDate.startDate,
          "endDate":rangeDate.endDate
        }
      })
  
      totalLead = await totalLead.json();
      setTotalFollowUp(totalLead.totalLead)
      setFollowUpCount(totalLead.totalCount)
      console.log("follow up count =",totalLead);
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

  const setCurrentMonthFunc = ()=>{
    
    const now = new Date();
    // Get the current month and year
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    // Set the value to the current month and year
    setCurrentMonth(`${year}-${month}`);
    getRegisteredStudentMonth(month)
  }

  const getRegisteredStudent = async()=>{
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    let registeredStudent = await ContextValue.getRegisterStudent()
    setRegister(registeredStudent)
    setCurrentRegister(registeredStudent)

    ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
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

  const moveToEditTrainer = (trainer) => {
    navigate("/EditTrainer", { state: { trainer } });
  };
  const moveToEditCounselor = (counselor) => {
    navigate("/EditCounselor", { state: { counselor } });
  };
  const moveToCounselor = (counselor) => {
    navigate("/AboutCounselor", { state: { counselor } });
  };

  const moveToViewFee = () => {
    navigate("ViewFee", { state: { fee: totalAmount } });
  };

  const moveToAddRegisteredStudent = (data) => {
    navigate("Add-Counsellor-Lead", { state: { data } });
  };

  const moveToLead = (data, status) => {
    navigate("AllLead", { state: { totalLead: data, status:status } });
  };
  const moveToDemo = (data, status) => {
    navigate("AllDemo", { state: { totalLead: data, status:status } });
  };
  const moveToVisit = (data, status) => {
    navigate("AllVisit", { state: { totalLead: data, status:status } });
  };
  const moveToRegisterStudent = (data, status) => {
    navigate("AllFollowUp", { state: { totalLead: data, status:status } });
  };
  const moveToAddStudent = () => {
    navigate("Add-Counsellor-Lead");
  };

 

 
  const moveToAllDemo = () => {
    navigate("All-Demo", {
      state: { demoList: allDemoList, demoStudentData, status: "demo" },
    });
  };
  const moveToNewDemo = () => {
    navigate("New-Demo", {
      state: { demoList: newDemoList, demoStudentData: newDemoStudentData },
    });
  };

  const moveToUpcomingDemo = () => {
    navigate("upcomingDemo", {
      state: { demo: upcomingDemoList, demoStudent: upcomingDemoStudent },
    });
  };

  const moveToAllCourses = () => {
    navigate("AllCourse", { state: { course: course, allCourse: allCourse } });
  };

  const moveToAddCourses = () => {
    navigate("AddCounselor");
  };

  const moveToAllBatchTiming = () => {
    navigate("AllBatchTiming", {
      state: { weekDays: weekDaysBatch, weekEnd: weekEndBatch },
    });
  };

  const moveToStudentAttendance = (batch, id) => {
    navigate("fullattendance", { state: { id: id, batch: batch } });
  };

  const setMonthFunc =(value)=>{

    console.log("date =",value)

    setCurrentMonth(value)
    const month = value.split('-')[1]
    // console.log("selected month value =",value,month)
    getRegisteredStudentMonth(month)

  }

  function processMonth(monthString) {
    // Remove leading zero and convert to number
    let monthNumber = parseInt(monthString, 10);
  
    // Decrement the value by one
    monthNumber -= 1;
  
    // Return the result as a string

    console.log("month string =",monthNumber.toString())
    return monthNumber.toString();

  }

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


  const getLeadData = ()=>{

   
    getLead();
    getDemo();
    getFollowUp();
    getVisit()
  }

  return (
    <>
      <Header />
      <div className="sidebar-main-container">
        {/* <Sidebar /> */}
        <div className="content-body">

        <div className="d-flex flex-col align-items-center">

          <div>
            
           {/* <input type="month"/> */}

           <div className="d-flex j-c-initial c-gap-40">
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
          </div>

          </div>
    
     {dataStatus==="all" && <h4 className="my-2">All Student</h4>}
      </div>
          {/* row */}
          <div className="container-fluid">
            <div className="row total-detail-container">
              <div className="detail-card"> 

                <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-secondary">
                    <div className="card-body" onClick={()=>{navigate("Today-Lead");}}>
                      <div className="media">
                        <span className="mr-3">
                        <i class="fa-solid fa-plus"/>
                        </span>
                        <div
                          className="media-body text-white"
                          
                        >
                          <p className="mb-1">Today Lead</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
                <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-secondary">
                    <div className="card-body" onClick={()=>{navigate("Add-Counsellor-Lead");}}>
                      <div className="media">
                        <span className="mr-3">
                        <i class="fa-solid fa-plus"/>
                        </span>
                        <div
                          className="media-body text-white"
                          
                        >
                          <p className="mb-1">Add Today Lead</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-secondary">
                    <div className="card-body" onClick={()=>{navigate("Add-Counsellor-Demo");}}>
                      <div className="media">
                        <span className="mr-3">
                        <i class="fa-solid fa-plus"/>
                        </span>
                        <div
                          className="media-body text-white"
                          
                        >
                          <p className="mb-1">Add Today Demo</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
                <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-secondary">
                    <div className="card-body" onClick={()=>{navigate("Add-Counsellor-Visit");}}>
                      <div className="media">
                        <span className="mr-3">
                        <i class="fa-solid fa-plus"/>
                        </span>
                        <div
                          className="media-body text-white"
                          
                        >
                          <p className="mb-1">Add Today Visit</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  

                <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-secondary">
                    <div className="card-body" onClick={()=>{navigate("Add-Counsellor-FollowUp");}}>
                      <div className="media">
                        <span className="mr-3">
                        <i class="fa-solid fa-plus"/>
                        </span>
                        <div
                          className="media-body text-white"
                          
                        >
                          <p className="mb-1">Add Today Follow Up</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 

                <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-secondary">
                <div className="card-body" onClick={()=>{moveToLead(totalLead,"Lead")}}>
                  <div className="media">
                    <span className="mr-3">
                    <i class="fa-regular fa-address-card"/>
                    </span>
                    <div className="media-body text-white" >
                      <p className="mb-1">Total Lead</p>
                      <h3 className="text-white">{leadCount}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                      {/* <small>76% Increase in 20 Days</small> */}
                      {/* onClick={()=>{navigate('')}} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>  

            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-secondary">
                <div className="card-body" onClick={()=>{moveToDemo(totaldemo, "Demo")}}>
                  <div className="media">
                    <span className="mr-3">
                    <i class="fa-regular fa-address-card"/>
                    </span>
                    <div className="media-body text-white" >
                      <p className="mb-1">Total Demo</p>
                      <h3 className="text-white">{demoCount}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                      {/* <small>76% Increase in 20 Days</small> */}
                      {/* onClick={()=>{navigate('')}} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>  

            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-secondary">
                <div className="card-body" onClick={()=>{moveToVisit(totalVisit, "Visit")}}>
                  <div className="media">
                    <span className="mr-3">
                    <i class="fa-regular fa-address-card"/>
                    </span>
                    <div className="media-body text-white" >
                      <p className="mb-1">Total Visit</p>
                      <h3 className="text-white">{visitCount}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                      {/* <small>76% Increase in 20 Days</small> */}
                      {/* onClick={()=>{navigate('')}} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>   

                <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-secondary">
                <div className="card-body" onClick={()=>{moveToRegisterStudent(totalfollowUp,"Follow Up")}}>
                  <div className="media">
                    <span className="mr-3">
                    <i class="fa-regular fa-address-card"/>
                    </span>
                    <div className="media-body text-white" >
                      <p className="mb-1">Total Follow Up</p>
                      <h3 className="text-white">{followUpCount}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                      {/* <small>76% Increase in 20 Days</small> */}
                      {/* onClick={()=>{navigate('')}} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>  
              
              
              </div>
            

              {/* <div className='right-left-arrow'>
            <i class="fa-solid fa-left-long" onClick={backItem}></i>
            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
            </div> */}
            </div>
          </div>
        </div>
      </div>

      {/***********************************
      Content body end
*/}
    </>
  );
}
