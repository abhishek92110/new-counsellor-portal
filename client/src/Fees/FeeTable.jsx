import React, { useEffect, useState, useContext } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { NavLink, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MessageIcon from '@mui/icons-material/Message';
import Swal from 'sweetalert2'
import { StudentContext } from '../context/StudentState'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';


// import EditFee from '../Fees/EditFee';


function FeeTable() {
  const [allStudent, setAllStudent] = useState()
  const navigate = useNavigate();
  const [runningBatch, setRunningBatch] = useState()
  const [timeValue,setTimeValue] = useState()
  const [counselor, setCounselor]  = useState()
  const [currentStudent, setCurrentStudent] = useState()
  const [currentDate, setCurrentDate] = useState()
  const [rangeDate, setRangeDate]=  useState({
    startDate:"",
    endDate:""
  })
  const [Fees, setFees] = useState({
    totalFees:"",
    notifyFees:"",
    collectFees:"",
    pendingFees:""
  })
  const [statusStudent, setStatusStudent] = useState({
    totalStudent:"",
    notifyStudent:"",
    paidStudent:"",
    pendingStudent:"",
    newAdmisionStudent:""
  })
  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let currentMonth = monthName[((new Date().getMonth()))]
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [filteredMonth, setFilteredMonth] = useState()
  
  let ContextValue = useContext(StudentContext);

  const [Feedata, setFeedata] = useState("")

  const getTrainerdata = async () => {
    const res = await fetch("http://localhost:8000/FeeTable", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setFeedata(data)
    }
  }


  const setStartEndate = (timeValue) => {
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
      startDate.setDate(endDate.getDate() - 7); // Subtract 7 days to get a week ago
    } else {
      // Handle the case when time is not recognized
      console.error("Invalid time option");
      return;
    }
  

  

    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    setRangeDate({...rangeDate, ["startDate"]:startDateStr, ["endDate"]:endDateStr})
    console.log("start date and end date =",startDateStr, endDateStr)
  
    return { startDate: startDateStr, endDate: endDateStr };
  };

  const setFromTime =(fromTime)=>{
    const startDateStr =  formatDate(new Date(fromTime))
    setRangeDate({...rangeDate, ["startDate"]:startDateStr})
    console.log("from time ",startDateStr)
    
   }
   const setToTime =(toTime)=>{
    const endDateStr = formatDate(new Date(toTime))
    setRangeDate({...rangeDate, ["endDate"]:endDateStr})
    console.log("to time ",endDateStr)
   }

   const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
        fetch(`http://localhost:8000/deleteFee/${id}`, {
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
            getTrainerdata();
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

  const getBatch = async () => {
    const batchData = await ContextValue.getRunningBatch();
    setRunningBatch(batchData.runningBatches)
    console.log('batch all =',batchData.runningBatches)
  }

  const setMonth =(month)=>{

    console.log('month =',month,month.toString(), monthName[month-1],currentMonth)
    setFilteredMonth(month.toString())
  
  }

  const getCounselor = async()=>{
    const counsellor = await ContextValue.getAllCounselor()
    setCounselor(counsellor.counselorData)
    console.log('counselor all =',counsellor.counselorData)
  }

  const filterStudent = () => {
    console.log('filter student =',detail)
    console.log('all student =', allStudent,detail)
    let filterStudent = allStudent.filter((data, index) => {

      return (detail.batch!= null ? data.Batch === detail.batch : data.Batch) && (detail.counselor != null ? data.CounselorID === detail.counselor : data.CounselorID ) && (detail.status!= null ? data.paymentStatus === detail.status : data.paymentStatus) 

    })
    console.log('filter student =',filterStudent)
    
    setCurrentStudent(filterStudent)
    calFees(filterStudent)
    studentPaymentStatus(filterStudent)
  }

  let counselorData ={}

  const setCounselorData = (e)=>{
    // console.log('select index =',e.target.selectedIndex,counselorData[(e.target.selectedIndex)-1].counselorNo)
    console.log('select index =',e.target.selectedIndex,counselor,counselor[(e.target.selectedIndex)-1].counselorNo)
    setDetail({...detail,["counselor"]:counselor[(e.target.selectedIndex)-1].counselorNo})
  }
  useEffect(() => {

    getAllStudentPaymentStatus()
    getAllStudent();
    getTrainerdata();
    getBatch();
    getCounselor();

    let current = new Date().toISOString().split('T')[0];    
    setRangeDate({...rangeDate,["endDate"]:current,["startDate"]:current})
    setCurrentDate(current)

  }, [])

  const getAllStudentPaymentStatus =async()=>{

    let studentPaymentStatus = await fetch("http://localhost:8000/getStudentFeesStatus")
    
    studentPaymentStatus = await studentPaymentStatus.json()
    if(studentPaymentStatus.status==="done"){
      console.log("student payment status =",studentPaymentStatus.status)
      getAllStudent()
    }
  
  }

  const getAllStudent = async () => {
    let student = await ContextValue.getAllStudent()

    // ContextValue.getPaymentStatus(student)
    console.log("student =",student)
    setAllStudent(student)
    setCurrentStudent(student)
    calFees(student)
    studentPaymentStatus(student)
    
  }

  // calculate fees of student 

  const calFees = (student)=>{
    let tempTotalFees  = 0;
    let tempCollectFees = 0;
    let tempNotifyFees  = 0;
    let tempPendingFees  = 0;

    student.map(data=>{
      tempTotalFees = tempTotalFees + data.minimumFees
      if(data.paymentStatus==="notification"){
        tempNotifyFees = tempNotifyFees + data.minimumFees
      }
      if(data.paymentStatus==="pending"){
        tempPendingFees = tempPendingFees + data.minimumFees
      }
      if(data.paymentStatus==="paid"){
        tempCollectFees = tempCollectFees + data.minimumFees
      }
    })

    console.log("total fees = ",tempTotalFees)
    setFees({...Fees,["totalFees"]:tempTotalFees,["notifyFees"]:tempNotifyFees, ["collectFees"]:tempCollectFees,["pendingFees"]:tempPendingFees})
  }

  // student status calculation

  const studentPaymentStatus = (student)=>{
    let tempTotalStudent  = student.length;
    let tempPendingStudent = 0;
    let tempNotificationStudent  = 0;
    let tempPaidStudent  = 0;
    let tempNewAdmissionStudent  = 0;

    student.map(data=>{
      
      if(data.paymentStatus==="notification"){
        tempNotificationStudent = tempNotificationStudent + 1
      }
      if(data.paymentStatus==="pending"){
        tempPendingStudent = tempPendingStudent + 1
      }
      if(data.paymentStatus==="paid"){
        tempPaidStudent = tempPaidStudent + 1
      }
      if(data.paymentStatus==="newAdmission"){
        tempNewAdmissionStudent = tempNewAdmissionStudent + 1
      }
    })

    setStatusStudent({...Fees,["totalStudent"]:tempTotalStudent,["notifyStudent"]:tempNotificationStudent, ["paidStudent"]:tempPaidStudent,["pendingStudent"]:tempPendingStudent,["newAdmisionStudent"]:tempNewAdmissionStudent})
  }


  const paymentStatus = {
    notification: "warning",
    backout: "dark",
    pending: "danger",
    paid: "success",
    newAdmission: "light"
  }

  const moveToFeeDetail = (student) =>{
    navigate('FeeDetail', { state: { student } });
  }

  const [detail, setDetail] = useState({
    status: null,
    batch: null,
    counselor: null
  })

  const SearchStudentFees = async()=>{

    console.log("filter month range data=",rangeDate) 
    
    let getRangeFees = await fetch("http://localhost:8000/getRangeFees",{
      method:"GET",
      headers:{
        "startDate":rangeDate.startDate,
        "endDate":rangeDate.endDate
      }
    })

    getRangeFees = await getRangeFees.json()

    console.log("range fees =",getRangeFees)

  }

  const SearchMonthFees = ()=>{

  }

  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <Sidebar />

      <div className="fee-detail right-side-container">

      <div className='d-none d-lg-flex flex-col'>
            {/* <div className='message-form'>

            <select className="custom-select mr-sm-2" onChange={e=>setMonth(e.target.value)}>
            <option disabled selected>--Choose Month--</option>
            {
              monthName.map((data,index)=>{
                return(
                  <option value={index+1}>{data}</option>
                )
              })
            }
          </select>

          <button className='filter-btn' onClick={SearchStudentFees}>Search</button>

          </div> */}

{/* <div className="d-flex j-c-initial c-gap-40">
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
                      <input type="date" class="custom-select mr-sm-2" max={rangeDate.endDate} onChange={e=>setFromTime(e.target.value)}></input>
                      <label>To</label>
                      <input type="date" class="custom-select mr-sm-2" max={currentDate} min={rangeDate.startDate} onChange={e=>setToTime(e.target.value)}></input>
                      </>}

          <button className='filter-btn' onClick={SearchStudentFees}>Search</button>

          </div> */}

          <div className='flex-row j-c-space-between'>
            <div className='flex-row'>
              <div className="batch-thumb thumb">
                <label className="form-label"> Batch :</label>
                {runningBatch && <select className="custom-select mr-sm-2" required name='batch' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })} >
                  <option selected>Choose Batch...</option>
                  {runningBatch.map(data => {
                    return (
                      <option value={data.Batch}>{data.Batch}</option>
                    )
                  })}
                </select>
                }
              </div>
              <div className="preference-thumb thumb">
                <label className="form-label">Counselor :</label>
                {counselor && <select className="custom-select mr-sm-2" required name='course' onChange={(e) => setCounselorData(e)}>
                  <option selected>Choose Counsellor...</option>
                  {counselor.map((data,index) => {
              
                    return (
                      <option value={data.Name}>{data.Name}</option>
                    )
                  })}
                </select>
                }
              </div>
              <div className="preference-thumb thumb">
                <label className="form-label">Status :</label>
                <select className="custom-select mr-sm-2" required name='status' onChange={(e) => setDetail({...detail,["status"]:e.target.value})}>
                  <option selected>Choose Payment Status...</option>           
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="notification">Notification</option>
                      <option value="newAdmission">New Admission</option>
                                    
                </select>
                
              </div>
              <button className='filter-btn' onClick={filterStudent}>Filter</button>
              </div>

         
              
              <div className='d-grid col-3'>
                <strong className='text-dark'>Total Expected Fees</strong>
                <span>:</span>
                <span>{Fees.totalFees}</span>
                <strong className='text-success'>Total Collected Fees</strong>
                <span>:</span>
                <span>{Fees.collectFees}</span>
                <strong className='text-danger'>Total Pending Fees</strong>
                <span>:</span>
                <span>{Fees.pendingFees}</span>
                <strong className='text-warning'>Total Coming Fees</strong>
                <span>:</span>
                <span>{Fees.notifyFees}</span>
              </div>
            

              </div>



              <div className='d-grid col-3'>
                <strong className='text-dark'>Total Student</strong>
                <span>:</span>
                <span>{statusStudent.totalStudent}</span>
                <strong className='text-success'>Paid Student</strong>
                <span>:</span>
                <span>{statusStudent.paidStudent}</span>
                <strong className='text-danger'>Pending Student</strong>
                <span>:</span>
                <span>{statusStudent.pendingStudent}</span>
                <strong className='text-warning'>In Notification</strong>
                <span>:</span>
                <span>{statusStudent.notifyStudent}</span>
                <strong className='text-dark'>New Admission</strong>
                <span>:</span>
                <span>{statusStudent.newAdmisionStudent}</span>
              </div>        
           
          </div>


        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Fees Table</h4>
              </div>
            </div>
            <div className="table-responsive recentOrderTable">
              <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                <thead>
                  <tr>
                    <th scope="col">Enrollment No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Call</th>
                    <th scope="col">Email</th>
                    {/* <th scope="col">Edit</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentStudent && currentStudent.map((data, index) => {

                    index = index;

                    return (
                      <tr>
                        <td>{data.EnrollmentNo}</td>
                        <td>{data.Name}</td>
                        <td>{data.Number}</td>
                        <td>{data.email}</td>
                        <td>{data.DueDate}</td>
                      
                        <td>

                        <td className='d-flex w-f'>
                                      <button className={`btn mx-2 btn-${paymentStatus[data.paymentStatus]}`} >{data.paymentStatus==="newAdmission"?"New Admission":data.paymentStatus}</button>
                    <button className="btn btn-success " onClick={e=>moveToFeeDetail(data)}><NavLink to={`FeeDetail/${data._id}`}><CurrencyRupeeIcon /></NavLink></button>
                                   
                                  </td>

                                  </td>


                                  <td><a href={`tel:${data.Number}`}><AddIcCallIcon/></a></td>
                        <td><a href={`mailto:${data.Email}`}><EmailIcon/></a></td>
                        {/* <td>
                                <span className={`badge badge-rounded badge-${badgeStatus[data.status]}`}>
                                  {data.status}
                                </span>
                </td> */}
                        {/* <td className='nav-link'>
                          <button className="btn btn-primary"> <NavLink to={`/EditFee/${data._id}`}> <CreateIcon /></NavLink></button>
                          <button className="btn btn-danger" onClick={() => deleteuser(data._id)} ><DeleteOutlineIcon /></button>
                          <button className="btn btn-warning text-light" ><MessageIcon /></button>
                        </td> */}
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
      </div>
    </>
  )
}

export default FeeTable