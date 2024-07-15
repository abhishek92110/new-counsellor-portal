import React, { useEffect, useState, useContext } from 'react'
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import StudentSlidebar from './StudentSlidebar';
import Swal from 'sweetalert2'


export default function StudentMessage() {
  document.title="StudentDashboard - Send Messages"
  let ContextValue = useContext(StudentContext);
  const navigation = useNavigate()

  const [adminId, setAdminId] = useState()
  const [student, setStudent] = useState()
  const [senderId, setSenderId] = useState()
  const [receiver, setReceiver]  = useState()

  useEffect(()=>{
    fetchStudentStatus()
    fetchAdminId()
  },[])

  async function fetchStudentStatus() {
    console.log('fetch student running')
    try {
      const status = await ContextValue.checkStudent();
      
  console.log('status of student =', status);
  if(status.status==="active"){
       setStudent(status.data)
  }
  else{
    console.log('else fecth')
    navigation('/')
    alert('you are not authorized')
  }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  async function fetchAdminId(){
let adminId = await ContextValue.getAdminId()
console.log('admin id =',adminId.id[0]._id)

setAdminId(adminId.id[0].code)

  }

  const [isChecked, setIsChecked] = useState(false);
  const [fileName, setFileName] = useState()
  const [selectedImage, setSelectedImage] = useState();

  const [end, setEnd] = useState(10)
  const [start, setStart] = useState(0)
  const [allStudentData, setAllStudentData] = useState(JSON.parse(localStorage.getItem('allStudent')))

  const [currentStudent, setCurrentStudent] = useState(JSON.parse(localStorage.getItem('allStudent')).slice(start, end).map(data => {
    return data
  })
  )
  const totalItem = JSON.parse(localStorage.getItem('allStudent')).length
  const [file, setFile] = useState()
  let tempCurrentStudent;
  const individual = allStudentData.map(data => {
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
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setFileName(event.target.files[0].name)
  };




  const moveItem = () => {
    console.log('move item', totalItem - end, JSON.parse(localStorage.getItem('allStudent')), totalItem);
    // console.log('move item',totalItem);



    if ((totalItem - end) <= 10) {
      console.log('if end')
      setStart(end)
      setEnd(end + (totalItem - end))
      tempCurrentStudent = [...currentStudent]

      tempCurrentStudent = allStudentData.slice(end, (end + (totalItem - end))).map(data => {
        return data
      })


      setCurrentStudent(tempCurrentStudent)

    }
    else if ((totalItem - end) > 10) {
      console.log('else end')

      setStart(end)
      setEnd(end + 10)
      tempCurrentStudent = [...currentStudent]

      tempCurrentStudent = allStudentData.slice(end, end + 10).map(data => {
        return data
      })


      setCurrentStudent(tempCurrentStudent)
    }

  }

  const backItem = () => {

    if (start == 0) {
      setStart(start)
      setEnd(end)
      setCurrentStudent(currentStudent)
    }

    else {
      setEnd(start)
      setStart(start - 10)

      tempCurrentStudent = [...currentStudent]

      tempCurrentStudent = allStudentData.slice((start - 10), start).map(data => {
        return data
      })


      setCurrentStudent(tempCurrentStudent)
    }


  }

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

    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    let checkedId = [{
      id: senderId,
    }]

    console.log('check id =', checkedId)
    let sender = student.Name

    try{
    let data = await fetch('http://localhost:8000/Studentsendmessage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message, from: sender, batch:student.Batch, EnrollmentNo:student.EnrollmentNo, checkid: checkedId, fileName: fileName })
    })
        ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
        setMessage("")
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Message Sent',
          showConfirmButton: false,
          timer: 1500
        })

  }
  catch(error){
    Swal.fire({   
      icon:  'error',
      title: 'Oops...',
      text:  'Something Went Wrong',
    }) 
    ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
  }
  }

  const filterStudent = () => {
    console.log('all student =', allStudentData)
    let filterStudent = allStudentData.filter((data, index) => {

      return (detail.trainer != null ? data.TrainerName === detail.trainer : data.TrainerName) && (detail.batch != null ? data.BatchTiming === detail.batch : data.BatchTiming) && (detail.course != null ? data.Course === detail.course : data.Course)

    })   
    const individual = filterStudent.map(data => {
      console.log('current student')
      return (
        {
          status: "off",
          check: false
        })
    })
    console.log('individual check =', individual)
    setIndividualCheck(individual)
    setCurrentStudent(filterStudent)
  }

  const setSenderIdName = (value)=>{

    setReceiver(value)

    if(value==="admin"){
      setSenderId(adminId)
     
    }
   
    else if(value==="counsellor"){

      setSenderId(student.CounselorID)

    }

  }

  return (
    <>
   
   <Header />
            <div className='sidebar-main-container'>
        <StudentSlidebar />
    
      <div className="content-body w-80">
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
          <div className='message-form'>
              
              <div className="batch-thumb thumb">
                <label className="form-label">Select</label>
              {student &&  
              <select className="custom-select mr-sm-2" required name='batch' onChange={e=>setSenderIdName(e.target.value)} >
                  <option disabled selected>Choose...</option>

                  <option value={"admin"}>Admin</option>
                  <option value={"trainer"}>Trainer</option>                  
                  <option value={"counsellor"}>{student.Counselor}</option>                  
                </select>}

                {
                  receiver==="trainer" && 
                  <select className="custom-select mr-sm-2" required name='batch' onChange={e=>setSenderId(e.target.value)} >
                  <option disabled selected>Choose Trainer</option>
                 { student.AllTrainerId.map((data,index)=>{
                  return(
                    <option value={data}>{student.AllTrainer[index]}</option>
                  )
                  })}
                  </select>
                    
                  
                }
              </div>             
            
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

                      <div
                        className="modal fade"
                        id="edit"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="edit"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                              >
                                <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                              </button>
                              <h4 className="modal-title custom_align" id="Heading">
                                Edit Your Detail
                              </h4>
                            </div>
                            <div className="modal-body">
                              <div className="form-group">
                                <input className="form-control " type="text" placeholder="Mohsin" />
                              </div>
                              <div className="form-group">
                                <input className="form-control " type="text" placeholder="Irshad" />
                              </div>
                              <div className="form-group">
                                <textarea
                                  rows={2}
                                  className="form-control"
                                  placeholder="Noida"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="modal-footer ">
                              <button
                                type="button"
                                className="btn btn-warning btn-lg"
                                style={{ width: "100%" }}
                              >
                                <span className="glyphicon glyphicon-ok-sign" />
                                &nbsp;Update
                              </button>
                            </div>
                          </div>
                          {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                      </div>
                      <div
                        className="modal fade"
                        id="delete"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="edit"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                              >
                                <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                              </button>
                              <h4 className="modal-title custom_align" id="Heading">
                                Delete this entry
                              </h4>
                            </div>
                            <div className="modal-body">
                              <div className="alert alert-danger">
                                <span className="glyphicon glyphicon-warning-sign" /> Are you sure
                                you want to delete this Record?
                              </div>
                            </div>
                            <div className="modal-footer ">
                              <button type="button" className="btn btn-success">
                                <span className="glyphicon glyphicon-ok-sign" />
                                &nbsp;Yes
                              </button>
                              <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                              >
                                <span className="glyphicon glyphicon-remove" />
                                &nbsp;No
                              </button>
                            </div>
                          </div>
                          {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      </div>

      {/*---- Include the above in your HEAD tag --------*/}

    </>
  )
}
