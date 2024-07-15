import React, { useEffect, useState, useContext } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';

export default function SendMessage() {
  const [trainer, setTrainer] = useState()
  const [runningBatch, setRunningBatch] = useState()
  const [course, setCourse] = useState()
  document.title = "StudentDashboard - Send Messages"
  let ContextValue = useContext(StudentContext);

  const navigation = useNavigate()

  useEffect(() => {
    fetchAdminStatus()
    getTrainer()
    getBatch()
    getCourse()
  }, [])

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
    setCurrentStudent(JSON.parse(localStorage.getItem('allStudent')).slice(start, end).map(data => {
      return data
    }))
  }

  const [adminStatus, setAdminStatus] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [fileName, setFileName] = useState()
  const [selectedImage, setSelectedImage] = useState();

  const [end, setEnd] = useState(10)
  const [start, setStart] = useState(0)
  const [allStudentData, setAllStudentData] = useState()

  const [currentStudent, setCurrentStudent] = useState()
  const totalItem = JSON.parse(localStorage.getItem('allStudent')).length
  const [file, setFile] = useState()
  let tempCurrentStudent;
  const individual = JSON.parse(localStorage.getItem('allStudent')).map(data => {
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
    const formData = new FormData();
    formData.append('file', selectedImage);

    // await fetch('http://localhost:8000/upload', {
    //   method: 'POST',
    //   body: formData,
    // })

    let checkedId = currentStudent.filter((data, index) => {


      if (individualCheck[index].check === true) {

        return true;
      }
      return false;
    })
      .map((data, index) => {
        return {
          id: data._id,
        };
      });

    console.log('check id =', checkedId)

    let data = await fetch('http://localhost:8000/sendmessage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message, from: "admin", checkid: checkedId, fileName: fileName })
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
    setCurrentStudent(filterStudent)
  }

  return (
    <>

      <Header />
      <div className='sidebar-main-container'>
      <Sidebar/>
      <div className="content-body">
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
          <div className="row">
            <div className="col-lg-12">
              <div className="card w-80">
                <div className="card-body">
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
                              {currentStudent && currentStudent.map((data, index) => {
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
                          <div className='right-left-arrow right-left-arrow-sendmessage'>
                            <i class="fa-solid fa-left-long" onClick={backItem}></i>
                            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
                          </div>
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
      </div>
      </div>
    </>
  )
}
