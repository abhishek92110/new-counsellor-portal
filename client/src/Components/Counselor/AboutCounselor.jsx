import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MessageIcon from '@mui/icons-material/Message';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Header from '../Header';
import { StudentContext } from '../../context/StudentState';
import Cslidebar from './Cslidebar';
import Sidebar from '../Sidebar';
// import NewDemo from '../Trainers/NewDemo';

export default function AboutCounselor() {
  let ContextValue = useContext(StudentContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [allCounselorDemo, setAllCounselorDemo] = useState()

  document.title = "Counsellor Dashboard - Admin panel"

  const {counselor} = location.state
  // const {id} = useParams()

  // console.log("params id =",id)

useEffect(()=>{
    getCounsellor(counselor._id)
},[])

  const navigation = useNavigate()

  let sameDateTime = [];
  let studentData = [];
  const [demoList, setDemoList] = useState()
  const [demoStudentData, setDemoStudentData] = useState()
  const [allStudent, setAllStudent] = useState()
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
  const [user, setUser] = useState("student")
  const [currentStudent, setCurrentStudent] = useState()
  const [registerStudent, setRegisterStudent] = useState()
  // const [counselor, setCounselor] = useState()
  const [allDemo, setAllDemo] = useState()
  const [allDemoStudent, setAllDemoStudent] = useState()
  const [newDemo, setNewDemo] = useState()
  const [newDemoStudent, setNewDemoStudent] = useState()

  //All Trainer
  let tempCurrentStudent;
  const [getuserdata, setUserdata] = useState("");

  const getCounsellor =async(id)=>{
    console.log('get counseolor')
    try {
      const status = await ContextValue.checkCounsellorById(id);
      // console.log('counselor id =',id)
      
            console.log('status of counselor =', status);
          //  setCounselor(status.data)
           getCounselorStudent(status.data.counselorNo)
           getNewCounselorStudent(status.data.counselorNo)
           getRegisterStudent(status.data.counselorNo)
           getDemoCounselorStudent(status.data.counselorNo)
           getNewCounselorDemo(status.data.counselorNo)
           getCounselorUpcoming(status.data.counselorNo)

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const getCounselorStudent = async(id)=>{

    console.log('id =',id)

    let CounselorStudent = await fetch('http://localhost:8000/getStudentByCounselor', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CounselorID: id })
    })
      CounselorStudent = await CounselorStudent.json()
      setCurrentStudent(CounselorStudent)
      setAllStudent(CounselorStudent)
      console.log("student counselor =",CounselorStudent)
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
  // const getdata = async (counselorName) => {

  //   let studentData = await fetch('http://localhost:8000/getStudentByCounselor', {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ CounselorID: counselorName })
  //   })

  //   studentData = await studentData.json()
  //   setAllStudent(studentData)
  //   console.log('student data =', studentData)
  //   localStorage.setItem('couselorStudent',JSON.stringify(studentData))

  //   // total student new student
  //     setAllStudent(studentData)
  //     setAllStudentData(studentData)
  //     setCurrentStudent(studentData)



  // }

  const getCounselorUpcoming = async(id)=>{

    let counselorUpcoming = await ContextValue.counselorUpcomimgDemo(id)

    setDemoList(counselorUpcoming.Demo)
    setDemoStudentData(counselorUpcoming.totalDemoStudent)
    
  }



  const getDemoCounselorStudent  = async(id)=>{
    let counselorDemo = await ContextValue.getAllDemoListCounselor(id)
    console.log('all counselor demo =',counselorDemo)
    setAllDemo(counselorDemo.Demo)
    setAllDemoStudent(counselorDemo.totalDemoStudent)
  }

  const getNewCounselorDemo = async(id)=>{
    let month = (new Date().getMonth())
    let MonthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let newCouselorDemo  = await ContextValue.getCounselorNewDemo(id, MonthName[month])
    console.log('newTrainerDemo =',newCouselorDemo)

    setNewDemo(newCouselorDemo.Demo)
    setNewDemoStudent(newCouselorDemo.totalDemoStudent)


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
            // getdata("Anam");
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
      return data.Name.toLowerCase().includes(Query.toLowerCase())
    })
    console.log('filter query - ', filterQueryData)
    setCurrentStudent(filterQueryData)
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

  const moveToAllDemo=()=>{

    navigate('All-Demo', { state: { demo:allDemo,demoStudent:allDemoStudent, user:"counselor" } });
  
  }
  const moveToNewDemo=()=>{

    navigate('New-Demo', { state: { demo:newDemo,demoStudent:newDemoStudent, user:"counselor" } });
  
  }

  
  const getNewCounselorStudent = async(id)=>{
    const trainerStudent = await ContextValue.totalNewCounselorStudent(id)
    setNewStudent(trainerStudent)
    // setNewTotal(trainerStudent.length)
    console.log('set new total =',trainerStudent.length,trainerStudent)
  }

  const getRegisterStudent =async(id)=>{
    let registerStudent = await ContextValue.getCounselorRegisterStudent(id)
    setRegisterStudent(registerStudent)
  }

  const moveToNewStudent = ()=>{
    navigate('newStudent', { state: { newStudent } });
  }
  const moveToRegisterStudent = ()=>{
    navigate('registerStudent', { state: { registerStudent } });
  }

  const moveToUpcomingDemo = ()=>{
    navigate('upcomingDemo', { state: { demo: demoList, demoStudent:demoStudentData } });
  }

  return (

    <>

      <Header/>
      <div className='sidebar-main-container'>
      <Sidebar/>
      <div className="content-body">
      <div className='d-flex'>
      <div className="card w-25 m-30 mx-2">
                      <div className="card-header">
                        <h2 className="card-title">About</h2>
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

        <div className="container-fluid">
          <div className="row">
            <div className='detail-card'>
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
                    <i class="fa-regular fa-address-card"/>
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
              <div className="widget-stat card p-0 bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                    <i class="fa-solid fa-id-card-clip"/>
                    </span>
                    <div className="media-body text-white" onClick={moveToAllDemo}>
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
                    <i class="fa-solid fa-id-card-clip"/>
                    </span>
                    <div className="media-body text-white" onClick={moveToNewDemo}>
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
                    <i class="fa-solid fa-id-card-clip"/>
                    </span>
                    <div className="media-body text-white" onClick={moveToUpcomingDemo}>
                      <p className="mb-1">Upcoming Demo</p>
                      <h3 className="text-white">{demoList && demoList.length}</h3>
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

            {user === "student" && <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Student List</h4>
                </div>
                <div class="d-flex" role="search">
                  <input class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name='search'
                    onChange={(e) => fetchQueryData(e.target.value)}
                  />
                  {/* <button class="btn btn-outline-dark" type="submit" onClick={fetchQueryData}>Search</button> */}

                </div>
                <div className="card-body">
                  <div className="table-responsive recentOrderTable">
                    <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                      <thead>
                        <tr>
                          <th scope="col">Enrollment No.</th>
                          <th scope="col">Name</th>
                          <th scope="col">Assigned Professor</th>
                          <th scope="col">Date Of Admit</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Fees</th>
                          <th scope="col">Message</th>
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
                                <button className="btn btn-danger" onClick={() => deleteuser(data._id)}><DeleteOutlineIcon /></button>
                                <button className="btn btn-warning text-light" onClick={() => showMessagedialog(data._id)}><MessageIcon /></button>
                                {/* <button className="btn btn-danger"><NavLink to={`/student/${data._id}/fullattendance`}><i class="fa-solid fa-clipboard-user text-light"></i></NavLink></button> */}
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
            </div>}

           

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
