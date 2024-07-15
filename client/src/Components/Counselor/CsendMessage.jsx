import React, { useEffect, useState, useContext } from 'react'
import img from "../../Components/img/7.jpg"
import Header from '../Header'
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../../context/StudentState';
import Cslidebar from './Cslidebar';
import AllMessage from '../../Students/AllMessage';
import CounselorAllMessage from './CounselorAllMessage';
// import StudentMessageData from '../Trainers/StudentMessageData';
import Swal from 'sweetalert2'

export default function SendMessage() {
  const [trainer, setTrainer] = useState()
  const [runningBatch, setRunningBatch] = useState()
  const [course, setCourse] = useState()
  const [adminId, setAdminId] = useState()
  const [user, setUser] = useState("student")
  const [allBatch, setAllBatch] = useState()
  const [counselor, setCounselor] = useState()
  document.title = "StudentDashboard - Send Messages"
  let ContextValue = useContext(StudentContext);

  const [StudentMessage, setStudentMessageData] = useState()
  const [messageStatus, setMessageStatus] = useState("Admin-message")
  
  const navigation = useNavigate()

  useEffect(() => {
    getCounsellorStatus()
    fetchAdminId()
  }, [])
  
  async function fetchAdminId(){
    let adminId = await ContextValue.getAdminId()
    console.log('admin id =',adminId.id[0]._id)
    
    setAdminId(adminId.id[0]._id)
    
      }
  const getCounsellorStatus = async () => {
    try {
      const status = await ContextValue.checkCounsellor();

      setCounselor(status.data)
      console.log('status of cousnelor message=', status.data,status.data.counselorNo);
      if (status.status === "active") {
       
        let message = await ContextValue.getReceiveMessage(status.data.counselorNo)
        console.log('cousnelor message=',message);
        setMessageData(message)

        console.log('counselorNo =',status.data,status.data.counselorNo)
        getStudentMessage(status.data.counselorNo)
        getdata()
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


  // const getAdminId = async()=>{
  //   const id = 
  // }

  function getdata() {
    console.log("get data running")
    setAllStudentData(JSON.parse(localStorage.getItem('couselorStudent')))
  }

  const [adminStatus, setAdminStatus] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [fileName, setFileName] = useState()
  const [selectedImage, setSelectedImage] = useState();
  const [status, setStatus] = useState('send-message')

  const [end, setEnd] = useState(10)
  const [start, setStart] = useState(0)
  const [allStudentData, setAllStudentData] = useState()

  const [currentStudent, setCurrentStudent] = useState()
  // const totalItem = JSON.parse(localStorage.getItem('allStudent')).length
  const [file, setFile] = useState()
  let tempCurrentStudent;
  const individual = JSON.parse(localStorage.getItem('couselorStudent')).map(data => {
    console.log('current student')
    return (
      {
        status: "off",
        check: false
      })
  })
  console.log('individual check =', individual)
  const [individualCheck, setIndividualCheck] = useState(individual)

  const [detail, setDetail] = useState({

    trainer: null,
    batch: null,
    course: null
  })
  const [message, setMessage] = useState()
  const [messageData, setMessageData] = useState()
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setFileName(event.target.files[0].name)
  };






  const IndividualChecked = (event, index) => {
    console.log('check =', event.target.checked, index)

    let tempInd = [...individualCheck]

    tempInd[index] = { ...tempInd[index], status: 'on', check: event.target.checked };
    setIndividualCheck(tempInd)
  }

  const allcheck = (event) => {
    setIsChecked(event.target.checked)

    let tempInd = individualCheck.map(data => {
      return ({
        status: "off",
        check: event.target.checked
      }
      )
    })

    setIndividualCheck(tempInd)
  }

  const sendMessage = async () => {
    let checkedId
    if(user==="student"){
      checkedId = allStudentData.filter((data, index) => {


      if (individualCheck[index].check === true) {

        return true;
      }
      return false;
    })
      .map((data, index) => {
        return {
          id: data.EnrollmentNo,
        };
      });
    }
else{
  checkedId = [{
    id: user,
  }]
}

    console.log('check id =', checkedId)

    let sender = counselor.Name
    let fromId = counselor.counselorNo

    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    let data = await fetch('http://localhost:8000/sendmessage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message, from: sender, fromId:fromId,checkid: checkedId, fileName: fileName })
    })

   
    ContextValue.updateProgress(60)
   
    ContextValue.updateProgress(100)
    ContextValue.updateBarStatus(false)
    MessageSent()

  }

  const MessageSent=()=>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Message Sent',
      showConfirmButton: false,
      timer: 1500
    })
    
  }

  
  const getStudentMessage  = async(id)=>{
    console.log('receive message func=',id)
    let message = await ContextValue.getStudentreceivemessage(id)
    console.log('student message=',message);
    setStudentMessageData(message)
  }


  return (
    <>

      <Header />
      <div className='sidebar-main-container c-gap-40'>
        <Cslidebar />
        <div className="content-body w-80">

        <div className="card-header">
                <button class={`btn btn-hover btn-outline-${status==="send-message"?"dark":""}`} onClick={e => setStatus("send-message")}>Send Message</button>
                <button class={`btn btn-hover btn-outline-${status==="receive-message"?"dark":""}`} onClick={e => setStatus("receive-message")}>Receive Message</button>
               
              </div>
              {status==="send-message" &&  <div className="container-fluid">
        
        <div className="batch-thumb thumb">
                 <label className="form-label">Select</label>
               {adminId &&  <select className="custom-select mr-sm-2" required name='batch' onChange={e=>setUser(e.target.value)} >
                   <option disabled selected>Choose...</option>
 
                   <option value={adminId}>Admin</option>
                   <option value="student">Student</option>                                  
                 </select>}
               </div>
        {user==="student" ?  
        <>
        <div className='d-none d-lg-flex'>
             <div className='message-form'>
   
            
             </div>
           </div>
           <div className="row">
             <div className="col-lg-12">
               <div className="card">
                 <div>
                   <div className="email-right  ml-sm-4 ml-sm-0">
                     <div className="compose-content">
                       <div className="form-group">
                         <textarea
                           id="email-compose-editor"
                           className="textarea_editor form-control bg-transparent"
                           rows={15}
                           placeholder="Enter a Message ..."
                           value={message}
                           onChange={e => setMessage(e.target.value)}
                         />
                       </div>
                     </div>
 
                     <div className="row">
                       <div className="col-md-12">
                         <h4 className='stu'>Please Select Students</h4>
                         <div className="table-responsive">
                         <table id="datatable"  className="table table-striped table-bordered"cellspacing="0" width="100%" >
                             <thead>
                               <tr>
                                 <th scope="col"><input type='checkbox' onClick={event => allcheck(event)}></input></th>
                                 <th scope="col">Name</th>
                                 <th scope="col">Enrollment No.</th>
                                 <th scope="col">Counselor</th>
                                 <th scope="col">Batch</th>
                                 
                               </tr>
                             </thead>
                             <tbody>
                               {allStudentData && allStudentData.map((data, index) => {
                                 index = start + index;
                                 return (
                                   <tr key={index}>
                                     <td>
                                       <input type='checkbox'
                                         checked={individualCheck[index].status === 'off' ? isChecked : individualCheck[index].check}
                                         onClick={(event) => IndividualChecked(event, index)}
                                       />
                                     </td>
                                     <td>{data.Name}</td>
                                     <td>{data.EnrollmentNo}</td>
                                     <td>{data.Counselor}</td>
                                     <td>{data.Batch}</td>
                                  
                                   </tr>
                                 )
                               })
                               }
 
                             </tbody>
                           </table>                  
                           
                         </div>
                       </div>
                     </div>
                  
                     <div className="text-left mt-4 mb-5">
                       <button
                         className="btn btn-primary btn-sl-sm mr-3"
                         type="button"
                         onClick={sendMessage}
                       >
                         <span className="mr-2">
                           <i className="fa fa-paper-plane" />
                         </span>{" "}
                         Send
                       </button>
                       <button className="btn btn-dark btn-sl-sm" type="button" onClick={e => setMessage("")}>
                         <span className="mr-2">
                           <i className="fa fa-times" aria-hidden="true" />
                         </span>{" "}
                         Discard
                       </button>
 
                     </div>
                   </div>
 
                 </div>
 
               </div>
 
             </div>
           </div> 
           </>:
           <>
           <div className="compose-content">
                       <div className="form-group">
                         <textarea
                           id="email-compose-editor"
                           className="textarea_editor form-control bg-transparent"
                           rows={15}
                           placeholder="Enter a Message ..."
                           value={message}
                           onChange={e => setMessage(e.target.value)}
                         />
                       </div>
                     </div>
 
 <button
 className="btn btn-primary btn-sl-sm mr-3"
 type="button"
 onClick={sendMessage}
 >
 <span className="mr-2">
   <i className="fa fa-paper-plane" />
 </span>{" "}
 Send
 </button>
 <button className="btn btn-dark btn-sl-sm" type="button" onClick={e => setMessage("")}>
 <span className="mr-2">
   <i className="fa fa-times" aria-hidden="true" />
 </span>{" "}
 Discard
 </button>
 </>
           }
         </div>}
         {status==="receive-message" && 
         
         <>
         <div className="card-header j-c-initial">
         <button class={`btn btn-hover btn-outline-${messageStatus==="Admin-message"?"dark":""}`} onClick={e => setMessageStatus("Admin-message")}>Admin Message</button>
         <button class={`btn btn-hover btn-outline-${messageStatus==="Student-message"?"dark":""}`} onClick={e => setMessageStatus("Student-message")}>Student Message</button>
        
       </div>
         {/* {
             messageStatus==="Admin-message"?

         <CounselorAllMessage message={messageData}/>:<StudentMessageData message={StudentMessage}/>} */}
         </>}
        </div>
      </div>
    </>
  )
}
