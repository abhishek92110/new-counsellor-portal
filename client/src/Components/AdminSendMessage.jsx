import React, { useEffect, useState, useContext } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import CounselorAllMessage from './Counselor/CounselorAllMessage';
// import StudentMessageData from './Trainers/StudentMessageData';
import Swal from 'sweetalert2'

export default function AdminSendMessage() {
  const [trainer, setTrainer] = useState()
  const [runningBatch, setRunningBatch] = useState()
  const [course, setCourse] = useState()
  const [user, setUser]  = useState("student")
  const [status, setStatus] = useState('send-message')
  const [messageStatus, setMessageStatus] = useState("Admin-message")
  const [messageData, setMessageData] = useState()
  const [StudentMessage, setStudentMessageData] = useState()
  const [userStatus, setUserStatus] = useState()
  const [optionStatus, setOptionStatus] = useState()
  const [allTrainer, setAllTrainer] = useState()
  const [allCounselor, setAllCounselor] = useState()
  const [currentOption, setCurrentOption] = useState()
  const [selectedOption, setSelectedOption] = useState()
  const [checkStatus, setCheckStatus] = useState(false)
  document.title = "StudentDashboard - Send Messages"
  let ContextValue = useContext(StudentContext);

  const navigation = useNavigate()

  useEffect(() => {
    fetchAdminStatus()
    getTrainer()
    getBatch()
    getCourse()
    getAllTrainer()
    getAllCounselor()
    individualCheckFunc(JSON.parse(localStorage.getItem('allStudent')))    
  }, [])

  const getAllTrainer  =async()=>{
    
    let allTrainer = await ContextValue.getAllTrainer()
    setAllTrainer(allTrainer)

  }
  const getAllCounselor  = async()=>{

    let allCounselor = await ContextValue.getAllCounselor()
    setAllCounselor(allCounselor.counselorData)

  }

  const getTrainer = async () => {
    const trainerData = await ContextValue.getAllTrainer();
    setTrainer(trainerData)
  }

  const getBatch = async () => {
    const batchData = await ContextValue.getRunningBatch();
    setRunningBatch(batchData.runningBatches)

  }

  const getCourse = async () => {
    const courseData = await ContextValue.getAllBatchCourse();
    setCourse(courseData.batchCourse[0].Course)
  }

  async function fetchAdminStatus() {
    try {
      const status = await ContextValue.checkAdmin();

      console.log('status of admin =', status);
      if (status.status === "active") {
        getdata();
        let message = await ContextValue.getReceiveMessage(status.data.EnrollmentNo)
    console.log('cousnelor message=',message,checkStatus);
    setMessageData(message)
        getStudentMessage(status.data._id)
      }
      else {
        navigation('/')
        alert('you are not authorized')
      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }


  function getdata() {
    console.log("get data running")
    setAllStudentData(JSON.parse(localStorage.getItem('allStudent')))
    // setCurrentUser(JSON.parse(localStorage.getItem('allStudent')).slice(start, end).map(data => {
    //   return data
    // }))
    setCurrentUser(JSON.parse(localStorage.getItem('allStudent')).map(data => {
      return data
    }))
  }

  const getStudentMessage  = async(id)=>{
    console.log('receive message func=',id)
    let message = await ContextValue.getStudentreceivemessage(id)
    
    console.log('student message admin=',message);

    

    setStudentMessageData(message)
  }

  const [adminStatus, setAdminStatus] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [fileName, setFileName] = useState()
  const [selectedImage, setSelectedImage] = useState();

  const [end, setEnd] = useState(10)
  const [start, setStart] = useState(0)
  const [allStudentData, setAllStudentData] = useState()
  const [individualCheck, setIndividualCheck] = useState()

  const [currentuser, setCurrentUser] = useState()
  const totalItem = JSON.parse(localStorage.getItem('allStudent')).length
  const [file, setFile] = useState()
  let tempCurrentStudent;


//   const individualCheckFunc =(allUser)=>{
//   const individual = allUser.map(data => {
//     console.log('current student')
//     return (
//       {
//         status: "off",
//         check: false
//       })
//   })
//   console.log('individual check =', individual)
//   setIndividualCheck(allUser)
// }


const individualCheckFunc =(allUser)=>{
  const individual = allUser.map(data => {
    console.log('current student')
    return (
      {
        status: "off",
        check: false
      })
  })
  console.log('individual check =', individual)
  setIndividualCheck(individual)
}
  

  // const setCheck = (user)=>{
  //   setCurrentUser(JSON.parse(localStorage.getItem(`${user}`)))
  //   const individual = JSON.parse(localStorage.getItem(`${user}`)).map(data => {
  //       console.log('current student')
  //       return (
  //         {
  //           status: "off",
  //           check: false
  //         })
  //     })
  //     console.log('individual check =', individual)
  //     setIndividualCheck(individual)
  // }

  const [detail, setDetail] = useState({

    trainer: null,
    batch: null,
    course: null
  })
  const [message, setMessage] = useState("")
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setFileName(event.target.files[0].name)
  };




  // const moveItem = () => {
  //   console.log('move item', totalItem - end, JSON.parse(localStorage.getItem('allStudent')), totalItem);
  //   // console.log('move item',totalItem);



  //   if ((totalItem - end) <= 10) {
  //     console.log('if end')
  //     setStart(end)
  //     setEnd(end + (totalItem - end))
  //     tempCurrentStudent = [...currentuser]

  //     tempCurrentStudent = allStudentData.slice(end, (end + (totalItem - end))).map(data => {
  //       return data
  //     })


  //     setCurrentUser(tempCurrentStudent)
  //     individualCheckFunc(tempCurrentStudent)

  //   }
  //   else if ((totalItem - end) > 10) {
  //     console.log('else end')

  //     setStart(end)
  //     setEnd(end + 10)
  //     tempCurrentStudent = [...currentuser]

  //     tempCurrentStudent = allStudentData.slice(end, end + 10).map(data => {
  //       return data
  //     })


  //     setCurrentUser(tempCurrentStudent)
  //     individualCheckFunc(tempCurrentStudent)
  //   }

  // }

  // const backItem = () => {

  //   if (start == 0) {
  //     setStart(start)
  //     setEnd(end)
  //     setCurrentUser(currentuser)
  //   }

  //   else {
  //     setEnd(start)
  //     setStart(start - 10)

  //     tempCurrentStudent = [...currentuser]

  //     tempCurrentStudent = allStudentData.slice((start - 10), start).map(data => {
  //       return data
  //     })


  //     setCurrentUser(tempCurrentStudent)
  //     individualCheckFunc(tempCurrentStudent)
  //   }


  // }

  const IndividualChecked = (event, index) => {
    setCheckStatus(false)
    console.log('check =', event.target.checked, index)

    let tempInd = [...individualCheck]

    tempInd[index] = { ...tempInd[index], status: 'on', check: event.target.checked };
    console.log("check array =",tempInd)

    tempInd.map(data=>{
      if(data.status==='on'){
        setCheckStatus(true)
      }
    })
    setIndividualCheck(tempInd)
  }

  const allcheck = (event) => {
    setCheckStatus(event.target.checked)
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
  console.log("send message function")
    const formData = new FormData();
    formData.append('file', selectedImage);

   
    console.log("individual check in function=",individualCheck,currentuser.length)

    let checkedId = currentuser.filter((data, index) => {

      if (individualCheck[index].check === true)
       {
        return true;
      }

      return false;
    }).map((data, index) => {
      if(user==="student"){
       return {

            id: data.EnrollmentNo,
          }
        }
        
        else if(user==="trainer"){
          return {
   
               id: data.code,
             }
           }
        else if(user==="counselor"){
          return {
   
               id: data.counselorNo,
             }
           }
        ;
      });

    console.log('check id =', checkedId)

    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

      try{
      let data = await fetch('http://localhost:8000/sendmessage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message, from: "admin", checkid: checkedId, fileName: fileName })
    })
    ContextValue.updateProgress(100)
    ContextValue.updateBarStatus(false)
    messageSent()
  }
  catch(error){
    Swal.fire({   
      icon:  'error',
      title: 'Oops...',
      text:  'Something went Wrong Try Again',
    }) 
    ContextValue.updateProgress(100)
    ContextValue.updateBarStatus(false)
  }
  }
  
  const messageSent = ()=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Message Sent',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const filterStudent = () => {
    console.log('all student =', allStudentData)
    let filterStudent = allStudentData.filter((data, index) => {

      return (detail.trainer != null ? data.TrainerName === detail.trainer : data.TrainerName) && (detail.batch != null ? data.Batch === detail.batch : data.Batch) && (detail.course != null ? data.Course === detail.course : data.Course)

    })
    const individual = filterStudent.map(data => {
      console.log('current student')
      return (
        {
          status: "off",
          check: false
        })
    })
    setIndividualCheck(individual)
    setCurrentUser(filterStudent)
  }


  const fetchQueryData = (Query) => {
    console.log('fetch query =', Query,checkStatus)

    let filterQueryData = allStudentData.filter(data => {
      console.log('data name =', data, data.Name, Query)
      return (data.Name.toLowerCase().includes(Query.toLowerCase()))||(data.EnrollmentNo.toLowerCase().includes(Query.toLowerCase()) )
    })

    setCurrentUser(filterQueryData)  
    individualCheckFunc(filterQueryData)
      
  }

  const setUserStatusOption =(value)=>{

    console.log('set user status',value)

    setUserStatus(value)
    if(value==="trainer")
    {

    console.log('strainer =',allTrainer)

      setCurrentOption(allTrainer)
    }
    else{

    console.log('strainer =',allCounselor)

      setCurrentOption(allCounselor)
    }

  }

  const setOptionfunc = (e)=>{
    
    if(userStatus==="trainer")
    {

    console.log('trainer =',currentOption,e.target.selectedIndex===0?currentOption[e.target.selectedIndex]:currentOption[e.target.selectedIndex-1],e.target.selectedIndex)
    setSelectedOption(e.target.selectedIndex===0?currentOption[e.target.selectedIndex].code:currentOption[e.target.selectedIndex-1].code)
    
    // setCurrentOption(allTrainer)

    }

    else{

    console.log('counselor =',allCounselor,e.target.selectedIndex===0?currentOption[e.target.selectedIndex]:currentOption[e.target.selectedIndex-1],e.target.selectedIndex)
    setSelectedOption(e.target.selectedIndex===0?currentOption[e.target.selectedIndex].counselorNo:currentOption[e.target.selectedIndex-1].counselorNo)


    // setCurrentOption(allCounselor)

    }

  }

  const receivemessage = async (id) => {

    console.log("message data =",messageData)

    console.log('receive message',id)
    const messageRes = await fetch(`http://localhost:8000/receiveusermessage/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    });

    const message = await messageRes.json();
    console.log("messageData", message.message,checkStatus)
    setMessageData(message.message)
    
  }

  return (
    <>

      <Header />
      <div className='sidebar-main-container'>
      <Sidebar/>
<div>
    <div className='right-side-container'>
        
         <div className="card-header">
                <button class={`btn btn-hover btn-outline-${status==="send-message"?"dark":"light"}`} onClick={e => setStatus("send-message")}>Send Message</button>
                <button class={`btn btn-hover btn-outline-${status==="receive-message"?"dark":"light"}`} onClick={e => setStatus("receive-message")}>Receive Message</button>
               
              </div>

   {status==="send-message" &&  
   <>
    <div className="card-header j-c-initial">
                <button class={`btn btn-hover btn-outline-${user==="student"?"dark":"light"}`} onClick={e => {setUser("student");individualCheckFunc(allStudentData);setCurrentUser(allStudentData)}}>Student</button>
                <button class={`btn btn-hover btn-outline-${user==="trainer"?"dark":"light"}`} onClick={e => {setUser("trainer");individualCheckFunc(allTrainer);setCurrentUser(allTrainer)}}>Trainer</button>
                <button class={`btn btn-hover btn-outline-${user==="counselor"?"dark":"light"}`} onClick={e => {setUser("counselor");individualCheckFunc(allCounselor);setCurrentUser(allCounselor)}}>Counsellor</button>
              </div>

    {user=="student" && <div>
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
            <div className='message-form'>
              <div className="batch-thumb thumb">
                <label className="form-label">Trainer Name :</label>
                {trainer && <select className="custom-select mr-sm-2" required name='trainer' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })}>
                  <option selected>Choose...</option>
                  {trainer.map(data => {
                    return (
                      <option value={data.Name}>{data.Name}</option>
                    )
                  })}

                </select>
                }
              </div>
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
                <label className="form-label">Courses :</label>
                {course && <select className="custom-select mr-sm-2" required name='course' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })}>
                  <option selected>Choose Course...</option>
                  {course.map(data => {
                    return (
                      <option value={data}>{data}</option>
                    )
                  })}
                </select>
                }
              </div>
              <button className='filter-btn' onClick={filterStudent}>Filter</button>
            </div>
          </div>

          <div class="d-flex mb-20" role="search">
                    <input class="form-control me-2"
                      type="search"
                      placeholder="Search By Name or Enrollment No."
                      aria-label="Search"
                      name='search'
                      onChange={(e) => fetchQueryData(e.target.value)}
                    />
                    {/* <button class="btn btn-outline-dark" type="submit" onClick={fetchQueryData}>Search</button> */}

                  </div>
          
                    <div className="row">
            <div className="col-lg-12">
              <div className="card w-80">
                <div>
                  <div className="email-right  ml-sm-4 ml-sm-0">
                    <div className="compose-content">
                      <div className="form-group">
                        <textarea
                          id="email-compose-editor"
                          className="textarea_editor form-control bg-transparent"
                          rows={15}
                          placeholder="Type Message ..."
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <h4 className='stu'>Please Select Students</h4>
                        <div className="table-responsive">
                          <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                            <thead>
                              <tr>
                                <th scope="col"><input type='checkbox' onClick={event => allcheck(event)}></input></th>
                                <th scope="col">Name</th>
                                <th scope="col">Enrollment No.</th>
                                <th scope="col">Trainer</th>
                                <th scope="col">Subject</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentuser && currentuser.map((data, index) => {
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
                                    <td>{data.TrainerName}</td>
                                    <td>{data.Course}</td>
                                  </tr>
                                )
                              })
                              }

                            </tbody>
                          </table>

                          <div className="clearfix" />
                          {/* <div className='right-left-arrow right-left-arrow-sendmessage'>
                            <i class="fa-solid fa-left-long" onClick={backItem}></i>
                            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    {/* <h5 className="mb-4">
                      <i className="fa fa-paperclip" /> Attatchment
                    </h5> */}
                    <form
                      
                      action="#"
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      {/* <div className="fallback w-100">
                        <input
                          type="file"
                          className="dropify"
                          name="file"
                          onChange={handleFileChange}
                        />
                      </div> */}
                    </form>
                    <div className="text-left mt-4 mb-5">
                      <button
                        className="btn btn-primary btn-sl-sm mr-3"
                        type="button"
                        disabled={(message.length!==0 && checkStatus===true)?false:true }
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
        </div>
      </div>}
    {user=="trainer" && <div>
        <div className="container-fluid">
       
          <div className="row">
            <div className="col-lg-12">
              <div className="card w-80">
                <div className="">
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
                        <h4 className='stu'>Please Select Trainer</h4>
                        <div className="table-responsive">
                          <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                            <thead>
                              <tr>
                                <th scope="col"><input type='checkbox' onClick={event => allcheck(event)}></input></th>
                                <th scope="col">Name</th>
                                <th scope="col">Code</th>
                                <th scope="col">Email</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              {currentuser && currentuser.map((data, index) => {
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
                                    <td>{data.code}</td>
                                    <td>{data.Email}</td>
                                    
                                  </tr>
                                )
                              })
                              }

                            </tbody>
                          </table>

                          <div className="clearfix" />
                          {/* <div className='right-left-arrow right-left-arrow-sendmessage'>
                            <i class="fa-solid fa-left-long" onClick={backItem}></i>
                            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    {/* <h5 className="mb-4">
                      <i className="fa fa-paperclip" /> Attatchment
                    </h5> */}
                    <form
                      onSubmit={(e) => sendMessage(e)}
                      action="#"
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      {/* <div className="fallback w-100">
                        <input
                          type="file"
                          className="dropify"
                          name="file"
                          onChange={handleFileChange}
                        />
                      </div> */}
                    </form>
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
        </div>
      </div>}
    {user=="counselor" && <div>
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
           
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card w-80">
                <div className="">
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
                        <h4 className='stu'>Please Select Counselor</h4>
                        <div className="table-responsive">
                          <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                            <thead>
                              <tr>
                                <th scope="col"><input type='checkbox' onClick={event => allcheck(event)}></input></th>
                                <th scope="col">Name</th>
                                <th scope="col">Code</th>
                                <th scope="col">Email</th>
                         
                              </tr>
                            </thead>
                            <tbody>
                              {currentuser && currentuser.map((data, index) => {
                                console.log('current user and individual check =',currentuser,individualCheck)
                                // index = start + index;
                                return (
                                  <tr key={index}>
                                    <td>
                                      <input type='checkbox'
                                        checked={individualCheck[index].status === 'off' ? isChecked : individualCheck[index].check}
                                        onClick={(event) => IndividualChecked(event, index)}
                                      />
                                    </td>
                                    <td>{data.Name}</td>
                                    <td>{data.counselorNo}</td>
                                    <td>{data.Email}</td>
                                  
                                  </tr>
                                )
                              })
                              }

                            </tbody>
                          </table>

                          <div className="clearfix" />
                          {/* <div className='right-left-arrow right-left-arrow-sendmessage'>
                            <i class="fa-solid fa-left-long" onClick={backItem}></i>
                            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    {/* <h5 className="mb-4">
                      <i className="fa fa-paperclip" /> Attatchment
                    </h5> */}
                    <form
                      onSubmit={(e) => sendMessage(e)}
                      action="#"
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      {/* <div className="fallback w-100">
                        <input
                          type="file"
                          className="dropify"
                          name="file"
                          onChange={handleFileChange}
                        />
                      </div> */}
                    </form>
                    <div className="text-left mt-4 mb-5">
                      <button
                        className="btn btn-primary btn-sl-sm mr-3"
                        type="button"
                        onClick={sendMessage}
                        disabled={message===""?true:false}
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
        </div>
      </div>}
      </>
      }

{status==="receive-message" && 
         
         <>
         <div className="card-header j-c-initial">
         <button class={`btn btn-outline-${messageStatus==="Admin-message"?"dark":""}`} onClick={e => setMessageStatus("Admin-message")}>Trainer/Counselor Message</button>
        {messageStatus==="Admin-message" && 
        <select className="custom-select mr-sm-2" onClick={e=>{setUserStatusOption(e.target.value)}}>
         <option disabled selected>Choose...</option>
         <option value="trainer">Trainer</option>
         <option value="counsellor">Counsellor</option>
         </select>

    }
        { messageStatus==="Admin-message" && 
        
        <>  
        <select className="custom-select mr-sm-2" onClick={e=>{setOptionfunc(e)}}>
        <option selected disabled>-- select --</option>

       { currentOption && currentOption.map((data,index)=>{
 
         return(
          <option value={data.Name}>{data.Name}</option>
         )
          
         })}
         </select>
         <button className='btn btn-primary' onClick={e=>receivemessage(selectedOption)}> Filter </button>
         </>
}
         
        
         <button class={`btn btn-outline-${messageStatus==="Student-message"?"dark":""}`} onClick={e => setMessageStatus("Student-message")}>Student Message</button>
        
       </div>
         {/* {
              messageStatus==="Admin-message"?
             <CounselorAllMessage message={messageData}/>:<StudentMessageData message={StudentMessage}/>
         } */}
         </>}
      </div>
      </div>
      </div>
    </>
  )
}
