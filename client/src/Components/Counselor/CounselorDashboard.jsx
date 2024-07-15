import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MessageIcon from '@mui/icons-material/Message';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Header from '../Header';
import { StudentContext } from '../../context/StudentState';
import Cslidebar from './Cslidebar';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email'

export default function Home() {
  let ContextValue = useContext(StudentContext);

  document.title = "Counsellor Dashboard - Admin panel"

  useEffect(() => {

    getCounsellorStatus()

  }, [])

  const navigation = useNavigate()

  const [allStudent, setAllStudent] = useState()
  const [counselor, setCounselor] = useState()
  const [totalStudent, setTotalStudent] = useState()
  const [newStudent, setNewStudent] = useState()
  const [pastSevenStudent, setPastSevenStudent] = useState()
  const [processBar, setProcessBar] = useState()
  // const [searchQuery, setSearchQuery] = useState();
  const [allStudentData, setAllStudentData] = useState()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(20)
  const [totalItem, setTotalItem] = useState()
  const [currentTrainer, setCurrentTrainer] = useState()
  const [user, setUser] = useState("added student")
  const [currentStudent, setCurrentStudent] = useState()
  const [total, setTotal] = useState()
  const [newTotal, setNewTotal] = useState()
  const [registerStudent, setRegisterStudent] = useState()
  const [CurrentRegisterStudent, setCurrentRegisterStudent] = useState()
  const [newRegisterStudent, setNewRegisterStudent] = useState()
  const [allDemo, setAllDemo] = useState()
  const [todayDemo, setTodayDemo] = useState()
  const [todayDemoStudent, setTodayDemoStudent] = useState()
  const [allDemoStudent, setAllDemoStudent] = useState()
  const [newDemo, setNewDemo] = useState()
  const [newDemoStudent, setNewDemoStudentData] = useState(0)
  const [totalFees, setTotalFees] = useState()
  const [newFees, setCounselorNewFees] = useState()




  //All Trainer
  let tempCurrentStudent;
  const [getuserdata, setUserdata] = useState("");
  const navigate = useNavigate();
  const [counselorId, setCounselorId] = useState()

  const getCounsellorStatus = async () => {
    try {
      const status = await ContextValue.checkCounsellor();
    

      console.log('status of student =',status);
      if (status.status === "active") {
        getdata(status.data.counselorNo)
        localStorage.setItem('counselorId',status.data._id)
        setCounselor(status.data)
        getNewCounselorStudent(status.data.counselorNo)
        getRegisterStudent(status.data.counselorNo)
    
        console.log('counselor id from func before= ',status.data.counselorNo,status.data)
        
        getDemoCounselorStudent(status.data.counselorNo)
        getNewCounselorDemo(status.data.counselorNo)
        getCounselorUpcoming(status.data.counselorNo)
        getNewRegisterStudent(status.data.counselorNo)
        getCounselorTotalFees(status.data.counselorNo)
        getCounselorNewTotalFees(status.data.counselorNo)
        // receivemessage(status.data._id)
        // localStorage.setItem('studentData', JSON.stringify(status.data))
      }
      else {
        navigation('/')
        alert('you are not authorized')
      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const getCounselorUpcoming = async(id)=>{
    let counselorUpcoming = await ContextValue.counselorUpcomimgDemo(id)

setTodayDemo(counselorUpcoming.Demo)
setTodayDemoStudent(counselorUpcoming.totalDemoStudent)

console.log("counselor upcoming =",counselorUpcoming)
  }

  const getCounselorNewTotalFees = async(id)=>{
    let counselorNewFees = await ContextValue.getCounselorNewTotalFees(id)
    setCounselorNewFees(counselorNewFees.formattedFees)
    console.log("counselor new fees =",counselorNewFees)
  }

  const getRegisterStudent = async(id)=>{

    let registerCounselorStudent = await ContextValue.getCounselorRegisterStudent(id)
    setRegisterStudent(registerCounselorStudent)
    setCurrentRegisterStudent(registerCounselorStudent)
    // console.log('register student =',registerCounselorStudent)
  }

  const getNewRegisterStudent = async(id)=>{

    let registerCounselorStudent = await ContextValue.getCounselorNewRegisterStudent(id)
    setNewRegisterStudent(registerCounselorStudent)
    console.log('new register student =',registerCounselorStudent)
  }

  const showMessagedialog = async (id) => {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })

    if (text) {
      Swal.fire(text)
    }

    let checkId = [{ id }]

    console.log('value of swal =', text, checkId)
    let sendData = await fetch('http://localhost:8000/sendmessage', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, checkid: checkId, from: "Counselor" })
    })

    let fetchData = await sendData.json();
    console.log("data = ", fetchData)
  }
  const getdata = async (counselorId) => {

    let studentData = await fetch('http://localhost:8000/getStudentByCounselor', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CounselorID: counselorId })
    })

    studentData = await studentData.json()
    console.log("studentData", studentData)
    setAllStudent(studentData)
    setTotal(studentData.length)
    console.log('student data =', studentData)
    localStorage.setItem('couselorStudent', JSON.stringify(studentData))

    // total student new student
    // let total = 66;
    // let newjoin = 7;
    // let currentMonthStudent = 0;
    // let pastMonthStudent = 0;
    // let pastSevenDaysStudent = 0;


    // setTotalStudent(total)
    // setPastSevenStudent(pastSevenDaysStudent)
    // console.log('current student =', currentMonthStudent)
    // console.log('past seven days =', pastSevenDaysStudent)
    // console.log('past month =', pastMonthStudent)

    // setProcessBar(parseInt(((currentMonthStudent - pastMonthStudent) / pastMonthStudent) * 100))
    // setPastSevenStudent(parseInt(((pastSevenDaysStudent - currentMonthStudent) / pastSevenDaysStudent) * 100))
    // let processBar = ((currentMonthStudent - pastMonthStudent) / pastMonthStudent) * 100;
    // console.log('process bar =', processBar)


    setAllStudent(studentData)
    setAllStudentData(studentData)
    setCurrentStudent(studentData)
  }

  //sweetalert


  //Delete student 
  const deleteuser = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/deleteuser/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }

        }).then(response => {

          const deletedata = response.json();

          if (deletedata.status === 422 || !deletedata) {
            console.log("error");
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          else {
            console.log("user deleted", deletedata);
            // setDLTdata(deletedata)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            getdata("Anam");
          }
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          });

        })
      }
    })

  }

  //search
  const fetchQueryData = (Query) => {
    console.log('fetch query =', Query)

    let filterQueryData = allStudentData.filter(data => {
      console.log('data name =', data, data.Name, Query)
      return (data.EnrollmentNo.toLowerCase().includes(Query.toLowerCase()) || data.Name.toLowerCase().includes(Query.toLowerCase()))
    })
    let filterQueryRegisterData = registerStudent.filter(data => {
      console.log('data name =', data, data.Name, Query)
      return (data.RegistrationNo.toLowerCase().includes(Query.toLowerCase()) || data.Name.toLowerCase().includes(Query.toLowerCase()))
    })
    console.log('filter query - ', filterQueryData)
    setCurrentStudent(filterQueryData)
    setCurrentRegisterStudent(filterQueryRegisterData)
  }

  const badgeStatus = {
    pending: "warning",
    backout: "dark",
    deactive: "danger",
    active: "success"
  }

  const handleClick = () => {
    // Navigate to the new route and pass studentData as a parameter
    navigate('allStudent', { state: { allStudent } });
  };

  const moveToNewStudent = ()=>{
    navigate('newStudent', { state: { newStudent } });
  }

  const getNewCounselorStudent = async(id)=>{
    const trainerStudent = await ContextValue.totalNewCounselorStudent(id)
    setNewStudent(trainerStudent)
    setNewTotal(trainerStudent.length)
    console.log('set new total =',trainerStudent.length,trainerStudent)
  }
  const getCounselorTotalFees = async(id)=>{
    const counselorFees = await ContextValue.getCounselorTotalFees(id)
   
    setTotalFees(counselorFees.formattedFees)
    console.log('counselor total fees =',counselorFees)
  }

  const moveToRegisterStudent = ()=>{

    navigate('registerStudent', { state: { registerStudent } });
  }
  const moveToNewRegisterStudent = ()=>{

    navigate('newregisterStudent', { state: { registerStudent:newRegisterStudent } });
  }

  const moveToAllDemo=(id)=>{

    navigate(`All-Counselor-Demo/${id}`, { state: { demo:allDemo, demoStudent:allDemoStudent, user:"counselor" } });
  
  }
  const moveToNewDemo=(id)=>
  {
    navigate(`New-Counselor-Demo/${id}`, { state: { demo:newDemo, demoStudent:newDemoStudent, user:"counselor" } });
  
  }
  const moveToTodayDemo=()=>
  {
    navigate('Today-Demo', { state: { demoList: todayDemo,totalDemoStudent:todayDemoStudent } });
  
  }

  const getDemoCounselorStudent  = async(id)=>{
    console.log('counselor id from func= ',id)
    let counselorDemo = await ContextValue.getAllDemoListCounselor(id)
    console.log('all counselor demo =',counselorDemo)
    setAllDemo(counselorDemo.Demo)
    setAllDemoStudent(counselorDemo.totalDemoStudent)
  }

  const getNewCounselorDemo = async(id)=>{
    let month = (new Date().getMonth())
    let MonthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    console.log('counselor id =',id, MonthName[month])

    let newCouselorDemo  = await ContextValue.getCounselorNewDemo(id, MonthName[month])
    console.log('newCounselorDemo =',newCouselorDemo)

    setNewDemo(newCouselorDemo.Demo)
    setNewDemoStudentData(newCouselorDemo.totalDemoStudent)

  }

  const moveToEdit = (data)=>{

    navigate('EditRegisterStudents',{state:{data}})
  }

  return (

    <>

      <Header />
      <div className='sidebar-main-container c-gap-40'>

        <Cslidebar />
        <div className="content-body w-80">

      

        <div className='detail-card mt-20'>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-primary">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-users" />
                    </span>
                    <div className="media-body text-white" onClick={handleClick}>
                      <p className="mb-1">Total Students</p>
                      <h3 className="text-white">{allStudent ? allStudent.length : ""}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className={`progress-bar progress-animated ${processBar >= 0 ? "bg-light" : "bg-danger"}`}
                          style={{ width: `${processBar >= 0 ? processBar : 100 + processBar}%` }}
                        />
                      </div> */}
                      {/* <small>{processBar >= 0 ? `${processBar}% Increase` : `${(-processBar)}% Decrease`} in 20 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-warning">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-user" />
                    </span>
                    <div className="media-body text-white" onClick={moveToNewStudent}>
                      <p className="mb-1">New Students</p>
                      <h3 className="text-white">{newStudent ? newStudent.length : ""}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className={`progress-bar progress-animated ${pastSevenStudent >= 0 ? "bg-light" : "bg-danger"}`}
                          style={{ width: `${pastSevenStudent >= 0 ? pastSevenStudent : 100 + pastSevenStudent}%` }}


                        />
                      </div> */}
                      {/* <small>{pastSevenStudent >= 0 ? `${pastSevenStudent}% Increase` : `${(-pastSevenStudent)}% Decrease`} in past 7 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-secondary">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-graduation-cap" />
                    </span>
                    <div className="media-body text-white" onClick={moveToRegisterStudent}>
                      <p className="mb-1">total Registration</p>
                      <h3 className="text-white">{registerStudent && registerStudent.length}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                      {/* <small>76% Increase in 20 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-secondary">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-graduation-cap" />
                    </span>
                    <div className="media-body text-white" onClick={moveToNewRegisterStudent}>
                      <p className="mb-1">New Registration</p>
                      <h3 className="text-white">{newRegisterStudent && newRegisterStudent.length}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                      {/* <small>76% Increase in 20 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-dollar" />
                    </span>
                    <div className="media-body text-white" onClick={e=>moveToAllDemo(counselor.counselorNo)}>
                      <p className="mb-1">Total Demo</p>
                      <h3 className="text-white">{allDemo && allDemo.length}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "30%" }}
                        />
                      </div> */}
                      {/* <small>30% Increase in 30 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-dollar" />
                    </span>
                    <div className="media-body text-white" onClick={e=>moveToNewDemo(counselor.counselorNo)}>
                      <p className="mb-1">New Demo</p>
                      <h3 className="text-white">{newDemo && newDemo.length}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "30%" }}
                        />
                      </div> */}
                      {/* <small>30% Increase in 30 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-dollar" />
                    </span>
                    <div className="media-body text-white" onClick={moveToTodayDemo}>
                      <p className="mb-1">Today Demo</p>
                      <h3 className="text-white">{todayDemo && todayDemo.length}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "30%" }}
                        />
                      </div> */}
                      {/* <small>30% Increase in 30 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-dollar" />
                    </span>
                    <div className="media-body text-white" >
                      <p className="mb-1">Total Fees</p>
                      <h3 className="text-white">{totalFees && totalFees}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "30%" }}
                        />
                      </div> */}
                      {/* <small>30% Increase in 30 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-dollar" />
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">New Fees</p>
                      <h3 className="text-white">{newFees && newFees}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "30%" }}
                        />
                      </div> */}
                      {/* <small>30% Increase in 30 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            </div>

<div className='d-flex'>
            <div className="card w-25 m-90">
                      <div className="card-header">
                        <h2 className="card-title">about me</h2>
                      </div>
                      <div className="card-body pb-0">
                  
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex px-0 justify-content-between">
                            <strong>Name</strong>
                            <span className="mb-0">{counselor && counselor.Name}</span>
                          </li>
                          <li className="list-group-item d-flex px-0 justify-content-between">
                            <strong>Phone Number</strong>
                            <span className="mb-0">{counselor && counselor.Number}</span>
                          </li>
                          <li className="list-group-item d-flex px-0 justify-content-between">
                            <strong>Email</strong>
                            <span className="mb-0">{counselor && counselor.Email}</span>
                          </li>
                          <li className="list-group-item d-flex px-0 justify-content-between">
                            <strong>Address</strong>
                            <span className="mb-0">{counselor && counselor.Address}</span>
                          </li>


                        </ul>
                      </div>

                    </div>


          {/* row */}
          <div className="container-fluid">
            <div className="row">

              <div className="card-header flex-in">
                <button class={`btn btn-hover btn-outline-${user==="added student"?"dark":"light"}`} onClick={e => setUser("added student")}>Added Student</button>
                <button class={`btn btn-hover btn-outline-${user==="registered student"?"dark":"light"}`} onClick={e => setUser("registered student")}>Registered Student</button>
              </div>
              {user === "added student" && <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
              

                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Student List</h4>
                  </div>
                  <div class="d-flex" role="search">
                    <input class="form-control me-2"
                      type="search"
                      placeholder="Search By Enrollment No. or By Name"
                      aria-label="Search"
                      name='search'
                      onChange={(e) => fetchQueryData(e.target.value)}
                    />
                    {/* <button class="btn btn-outline-dark" type="submit" onClick={fetchQueryData}>Search</button> */}

                  </div>
                  <div>
                    <div className="table-responsive recentOrderTable">
                      <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                        <thead>
                          <tr>
                            <th scope="col">Enrollment No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Trainer</th>
                            <th scope="col">Joining Date</th>
                            <th scope="col">Course</th>
                            <th scope="col">Fees</th>
                            <th scope="col">Action</th>
                            <th scope="col">Call</th>
                            <th scope="col">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentStudent && currentStudent.map((data, index) => {

                            index = start + index;

                            return (
                              <tr>
                                <td>{data.EnrollmentNo}</td>
                                <td>{data.Name}</td>
                                <td>
                                    {data.AllTrainer.length <= 1 ? (
                                      <td className="border-0">
                                        {data.AllTrainer[0]}
                                      </td>
                                    ) : (
                                      <select className="d-flex flex-col b-none">
                                        {data.AllTrainer &&
                                          data.AllTrainer.map((trainer,index) => (
                                            <option key={trainer} disabled selected={index===0?true:false}>
                                              {trainer}
                                            </option>
                                          ))}
                                      </select>
                                   
                                    )}
                                       </td>
                                <td>{data.BatchStartDate}</td>
                                <td>{data.Course}</td>
                                <td>{data.Fees}</td>
                                <td className='nav-link'>
                                  {/* <button className="btn btn-success"> <NavLink to={`/Aboutstudent/${data._id}`}> <RemoveRedEyeIcon /></NavLink></button>
                                <button className="btn btn-primary"> <NavLink to={`/EditStudents/${data._id}`}> <CreateIcon /></NavLink></button> */}
                                  <button className="btn btn-warning text-light" onClick={() => showMessagedialog(data._id)}><MessageIcon /></button>
                                  {/* <button className="btn btn-primary text-light"> <NavLink to={`/EditStudents/${data._id}`}> <CreateIcon /></NavLink></button> */}

                                  {/* <button className="btn btn-danger"><NavLink to={`/student/${data._id}/fullattendance`}><i class="fa-solid fa-clipboard-user text-light"></i></NavLink></button> */}
                                </td>

                                <td><a href={`tel:${data.Number}`}><AddIcCallIcon/></a></td>
                                      <td><a href={`mailto:${data.Email}`}><EmailIcon/></a></td>
                              </tr>
                            )
                          })
                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>}

              {user === "registered student" &&
                <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Register Student List</h4>
                    </div>
                    <div class="d-flex" role="search">
                      <input class="form-control me-2"
                        type="search"
                        placeholder="Search By Registration No. or By Name"
                        aria-label="Search"
                        name='search'
                        onChange={(e) => fetchQueryData(e.target.value)}
                      />
                      {/* <button class="btn btn-outline-dark" type="submit" onClick={fetchQueryData}>Search</button> */}
                    </div>
                    <div>
                      <div className="table-responsive recentOrderTable">
                        <table className="table verticle-middle table-responsive-md">

                          <thead>
                            <tr>
                              <th scope="col">Registration No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">Number</th>
                              <th scope="col">Email</th>
                              <th scope="col">Action</th>


                            </tr>
                          </thead>
                          <tbody>
                            {CurrentRegisterStudent && CurrentRegisterStudent.map((data, index) => {

                              return (
                                <tr>
                                  <td>{data.RegistrationNo}</td>
                                  <td>{data.Name}</td>
                                  <td>{data.Number}</td>
                                  <td>{data.Email}</td>
                                
                                  <td>
                                    <button className="btn btn-primary" onClick={e=>moveToEdit(data)}><CreateIcon /></button>
                                    <button className="btn btn-danger" onClick={() => deleteuser(data._id)}><DeleteOutlineIcon /></button>
                                  </td>
                                </tr>
                              )
                            })
                            }

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              }

              {/* <div className='right-left-arrow'>
            <i class="fa-solid fa-left-long" onClick={backItem}></i>
            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
            </div> */}

            </div>
          </div>
          </div>
        </div>
      </div>





    </>

  )
}
