import React, { useEffect, useState, useContext } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import { StudentContext } from '../context/StudentState';

export default function OldStudent() {
  const [trainer, setTrainer] = useState()
  const [runningBatch, setRunningBatch] = useState()
  const [course, setCourse] = useState()
  document.title = "Admin - Old Batch"
  let ContextValue = useContext(StudentContext);

  

  useEffect(() => {
    getTrainer()
    getBatch()
    getCourse()
    getOldStudent()
  }, [])

  const getOldStudent = async()=>{
    const OldStudent = await ContextValue.getOldStudent();

    console.log('old student =',OldStudent.oldStudent)
    setAllStudentData(OldStudent.oldStudent)
    setCurrentStudent(OldStudent.oldStudent)

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


  const [adminStatus, setAdminStatus] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [fileName, setFileName] = useState()
  const [selectedImage, setSelectedImage] = useState();

  const [end, setEnd] = useState(10)
  const [start, setStart] = useState(0)
  const [allStudentData, setAllStudentData] = useState()

  const [currentStudent, setCurrentStudent] = useState()
 


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




  // const moveItem = () => {
  //   console.log('move item', totalItem - end, JSON.parse(localStorage.getItem('allStudent')), totalItem);
  //   // console.log('move item',totalItem);



  //   if ((totalItem - end) <= 10) {
  //     console.log('if end')
  //     setStart(end)
  //     setEnd(end + (totalItem - end))
  //     tempCurrentStudent = [...currentStudent]

  //     tempCurrentStudent = allStudentData.slice(end, (end + (totalItem - end))).map(data => {
  //       return data
  //     })


  //     setCurrentStudent(tempCurrentStudent)

  //   }
  //   else if ((totalItem - end) > 10) {
  //     console.log('else end')

  //     setStart(end)
  //     setEnd(end + 10)
  //     tempCurrentStudent = [...currentStudent]

  //     tempCurrentStudent = allStudentData.slice(end, end + 10).map(data => {
  //       return data
  //     })


  //     setCurrentStudent(tempCurrentStudent)
  //   }

  // }

  // const backItem = () => {

  //   if (start == 0) {
  //     setStart(start)
  //     setEnd(end)
  //     setCurrentStudent(currentStudent)
  //   }

  //   else {
  //     setEnd(start)
  //     setStart(start - 10)

  //     tempCurrentStudent = [...currentStudent]

  //     tempCurrentStudent = allStudentData.slice((start - 10), start).map(data => {
  //       return data
  //     })


  //     setCurrentStudent(tempCurrentStudent)
  //   }


  // }







  const filterStudent = () => {
    console.log('all student =', allStudentData)
    let filterStudent = allStudentData.filter((data, index) => {

      return (detail.trainer != null ? data.TrainerName === detail.trainer : data.TrainerName) && (detail.batch != null ? data.Batch === detail.batch : data.Batch) && (detail.course != null ? data.Course === detail.course : data.Course)

    })
    setCurrentStudent(filterStudent)
  }

  return (
    <>

      <Header />
      <div className='sidebar-main-container'>
      <Sidebar/>
      <div className="right-side-container">
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
                <div className="">
                  <div className="email-right  ml-sm-4 ml-sm-0">
                    <div className="row">
                      <div className="col-md-12">
                        <h4 className='stu'>Old Students</h4>
                        <div className="table-responsive">
                          <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                            <thead>
                              <tr>
                                <th scope="col">Enrollment No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Assigned Professor</th>
                                <th scope="col">Enrollment No.</th>
                                <th scope="col">Subject</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentStudent && currentStudent.map((data, index) => {
                                index = start + index;
                                return (
                                  <tr key={index}>
                                    <td>
                                      {data.EnrollmentNo}
                                    </td>
                                    <td>{data.Name}</td>
                                    <td>{data.TrainerName}</td>
                                    <td>{data.EnrollmentNo}</td>
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
