import React, {useEffect, useState, useContext} from 'react'
import Header from './Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { StudentContext } from "../context/StudentState";
import Sidebar from './Sidebar'
import Swal from 'sweetalert2'


const EditRunningBatch = () => {

    const [trainer, setTrainer] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    let ContextValue = useContext(StudentContext);
    const [Days, setDays] = useState("weekDaysBatch")
    const [allbatchTime, setAllBatchTime] = useState()
    const {runningBatch}  = location.state
    console.log("running batch =",runningBatch)
    
    const [editStatus, setEditStatus] = useState(false)
    const [currentTrainer, setCurrentTrainer] = useState();
    const [batchCourse, setBatchCourse] = useState()
    const [runningbatchTrainerData, setRunningbatchTrainerData] = useState();
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const [inpval, setINP] = useState({
        Trainer: runningBatch.Trainer,    
        TrainerID:runningBatch.TrainerID,
        Batch: runningBatch.Batch,
        BatchTime: runningBatch.BatchTime,
        Days: runningBatch.Days,
      });

      const [batchDetail, setBatchDetail] = useState({
        'Batch':runningBatch.Batch,
        'previousBatch':runningBatch.Batch,
        "Trainer": '',
        "trainerCode":'',
        "Days": '',
        "BatchTime": '',
        "TrainerID": '',
        "courseName":runningBatch.courseName,
        "course":'',
        "month":runningBatch.Batch.split('/')[2]
    })

      useEffect(()=>{
        getTrainer()
        extractCourseCode(runningBatch.courseName)
      },[])


      const getCourses = async (trainerData) => {
        // let tempcurrentTrainer = trainer.filter(data => {
        //     return data.Name === trainerName
        // })

        setCurrentTrainer(trainerData)

        setBatchCourse(trainerData.Course)
    
        // setTrainer(trainerData)

    }

    
    const updateMonth = (month) => {
      setDays('true')
      setBatchDetail({ ...batchDetail, ["month"]: month })
  }

    const setAvailableBatchTime = (runningbatchTrainerData,trainerData)=>{
      console.log('current trainer =',trainerData)
      let day = Days === "weekDaysBatch" ? "WeekDays" : "WeekEnd"

      let batch = Days === "weekDaysBatch" ? trainerData.weekDaysBatch : trainerData.WeekEndBatch
      let daysBatchTime = runningbatchTrainerData.filter(data => {
          return data.Days === day
      }).map(element => {
          return element.BatchTime
      })
      let tempBatchTime = [];
      if (daysBatchTime.length !== 0) {
          tempBatchTime = batch.map(data => {
              let runningBatchStatus = false;
              daysBatchTime.map(element => {
                  if (data === element) {
                      runningBatchStatus = true;
                  }
              })
              return runningBatchStatus === false ? { disabled: false, batchTime: data } : { disabled: true, batchTime: data }

          })
          console.log('batch time =',tempBatchTime)
          setAllBatchTime(tempBatchTime)
      }
      else {
          tempBatchTime = batch.map(data=>{
              return { disabled: false, batchTime: data }
           })
          console.log('batch time =',tempBatchTime)

           setAllBatchTime(tempBatchTime)
      }


  }
    
    const getRunningBatchTrainer = async (trainer) => {

        ContextValue.updateProgress(30)
        ContextValue.updateBarStatus(true)

      try {
          let runningTrainer = await fetch('http://localhost:8000/getRunningBatchTrainer', {
              method: 'POST',
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({ TrainerID : trainer._id })
          })
          ContextValue.updateProgress(60)
          runningTrainer = await runningTrainer.json()
          runningTrainer = runningTrainer.runningbatchTrainer
          console.log('trainer batch =',runningTrainer)
          
          setRunningbatchTrainerData(runningTrainer)
          setAvailableBatchTime(runningTrainer,trainer)

          ContextValue.updateProgress(100)
          ContextValue.updateBarStatus(false)

      }   
      catch (error) {
        
  Swal.fire({   
    icon:  'error',
    title: 'Oops...',
    text:  'Something Went Wrong Try Again',
  }) 
  ContextValue.updateProgress(100)
    ContextValue.updateBarStatus(false)
          console.log('error =',error.message)
          alert('sorry some error occured try again later')
      }
  }


      const getTrainer = async () => {

        const res = await fetch("http://localhost:8000/trainer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        setTrainer(data)
    }

    let trainerData = []

    const updateTrainer = async (e) => {
      console.log('trainer update ',e.target.selectedIndex-1, trainer[e.target.selectedIndex-1])
      // let trainerCode = trainer.filter(data => {
      //     return data._id === trainerData[trainerName]
      // })[0].code
      setCurrentTrainer(trainer[e.target.selectedIndex-1])
      setBatchDetail({ ...batchDetail, ["Trainer"]: trainer[e.target.selectedIndex-1].Name, ["TrainerID"]: trainer[e.target.selectedIndex-1].code,["trainerCode"]:trainer[e.target.selectedIndex-1].code})
      getCourses(trainer[e.target.selectedIndex-1])
      getRunningBatchTrainer(trainer[e.target.selectedIndex-1])
      setINP({...inpval,["Trainer"]:trainer[e.target.selectedIndex-1].Trainer})
  }

  
  const updatebatchTime = (batchTime) => 
  {

    setBatchDetail({ ...batchDetail, ["BatchTime"]: batchTime })

}


const updateDays = (e) => {
  setDays(e)
  let day = e === "weekDaysBatch" ? "WeekDays" : "WeekEnd"
  setBatchDetail({ ...batchDetail, ["Days"]: day })
  let batch = e === "weekDaysBatch" ? currentTrainer.weekDaysBatch : currentTrainer.WeekEndBatch
  let daysBatchTime = runningbatchTrainerData.filter(data => {
      return data.Days === day
  }).map(element => {
      return element.BatchTime
  })
  let tempBatchTime = [];
  if (daysBatchTime.length !== 0) {
      tempBatchTime = batch.map(data => {
          let runningBatchStatus = false;
          daysBatchTime.map(element => {
              if (data === element) {
                  runningBatchStatus = true;
              }
          })
          return runningBatchStatus === false ? { disabled: false, batchTime: data } : { disabled: true, batchTime: data }

      })
      
      console.log("temp batch days =",tempBatchTime)
      setAllBatchTime(tempBatchTime)
  }
  else {
      tempBatchTime = batch.map(data=>{
          return { disabled: false, batchTime: data }
       })
      console.log("temp batch days =",tempBatchTime)

       setAllBatchTime(tempBatchTime)
  }


}


const updateBatch = async () => {

  console.log('batch detail =',batchDetail)
  console.log('add new batch =', runningbatchTrainerData, batchDetail)

  let count = 1;
  let tempInpVal = batchDetail

  runningbatchTrainerData.map(data => {
      let dataSplit = data.Batch.split('/')
      if (dataSplit[0] === batchDetail.course) {
          if (dataSplit[2] === batchDetail.month) {
              count = count + 1;
              console.log('count= ', count)
          }
      }
  })
  let batch = `${batchDetail.course}/${new Date().getFullYear()}/${batchDetail.month}/${batchDetail.trainerCode}/${count}`
  tempInpVal.Batch = batch
  console.log('new batch =', batch, batchDetail, currentTrainer)

  ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)
  let addedNewBatch = await fetch(`http://localhost:8000/updateBatch/${runningBatch._id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({tempInpVal})
  })

  
    ContextValue.updateProgress(60)
    addedNewBatch = await addedNewBatch.json()
    ContextValue.updateProgress(100)
    ContextValue.updateBarStatus(false)
    batchEdit()

  
  console.log('added batch =', addedNewBatch)

}

const batchEdit=()=>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Batch Edited',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/admin/Running-batches')
    
  }

const extractCourseCode = (batchName) => {
  console.log("batch Name =",batchName)
  let course = '';
  let splitCourse = batchName.split(' ')
  if (splitCourse.length > 1) {
      splitCourse.map(data => {
          course = `${course}${data[0]}`
      })
  }

  else {
      course = splitCourse[0]
  }
  setBatchDetail({ ...batchDetail, ["course"]: course})
}



  return (
    <>

<Header />
      <div className='sidebar-main-container c-gap-40'>
        <Sidebar />
    <div className="row right-side-container">
    <div className="col-xl-12 col-xxl-12 col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Basic Info</h5>
        </div>
        <div className="w-80">
          <form action="#" method="post">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label className="form-label">Batch</label>
                  <input type="text" value={inpval.Batch} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Trainer</label>
                                                {trainer && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    class="form-control"
                                                    value={inpval.Trainer}
                                                    disabled = {editStatus===false?true:false}
                                                    onChange={e => updateTrainer(e)}
                                                >
                                                    <option disabled = {editStatus===false?true:false} selected>--select Trainer--</option>
                                                    {trainer.map((data, index) => {
                                                                                                              
                                                        return (
                                                            <option value={data.Name}>{data.Name}</option>
                                                        )
                                                    })
                                                    }
                                                </select>
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Starting Month</label>
                                                {<select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    name="Course"
                                                    class="form-control"
                                                    disabled = {editStatus===false?true:false}
                                                    value={batchDetail.month}
                                                    onChange={e => updateMonth(e.target.value)}
                                                >
                                                    <option disabled selected>--select Month--</option>
                                                    {month.map((data, index) => {
                                                        let monthNumber = index + 1 < 10 ? `0${index + 1}` : index + 1
                                                        return (
                                                            <option value={monthNumber}>{data}</option>
                                                        )
                                                    })
                                                    }
                                                </select>}
                                            </div>
                                        </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                {!allbatchTime ? <div className="form-group">
                  <label className="form-label">Batch Time</label>
                  <input type="text" value={inpval.BatchTime} disabled = {editStatus===false?true:false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Email" class="form-control" id="exampleInputPassword1" />
                </div>: 
                <>
                  {allbatchTime && Days === "weekDaysBatch" && <div className="form-group">
                  <label className="form-label">WeekDays Batch</label>
                  {allbatchTime && <select
                      id="exampleInputPassword1"
                      type="select"
                      name="Course"
                      class="form-control"
                      onChange={e => updatebatchTime(e.target.value)}
                  >
                      <option disabled selected>--select WeekDays Batch--</option>
                      {allbatchTime.map((data, index) => {

                          return (
                              <option value={data.batchTime} disabled={data.disabled}>{data.batchTime}</option>
                          )
                      })
                      }
                  </select>}
              </div>}
              {allbatchTime && Days === "WeekEndBatch" && <div className="form-group">
                  <label className="form-label">WeekEnd Batch</label>
                  {allbatchTime && <select
                      id="exampleInputPassword1"
                      type="select"
                      name="Course"
                      class="form-control"
                      onChange={e => updatebatchTime(e.target.value)}
                  >
                      <option disabled selected>--select WeekEnd Batch--</option>
                      {allbatchTime.map((data, index) => {

                          return (
                              <option value={data.batchTime} disabled={data.disabled}>{data.batchTime}</option>
                          )
                      })
                      }
                  </select>}
              </div>}
              </>
                }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              {!allbatchTime?<div className="form-group">
                  <label className="form-label">Days</label>
                  <input type="text" value={inpval.Days} disabled = {editStatus===false?true:false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="CompanyName" class="form-control" id="exampleInputPassword1" />
                </div>:
                 <div className="form-group">
                 <label className="form-label">Days</label>
                 <select
                     id="exampleInputPassword1"
                     type="select"
                     name="Course"
                     class="form-control"
                     onChange={e => { updateDays(e.target.value) }}
                 >
                     <option disabled selected>--select Days--</option>
                     <option value="weekDaysBatch">WeekDays</option>
                     <option value="WeekEndBatch">WeekEnd</option>

                 </select>
             </div> }
              
              </div>
              
              
              </div>
          </form>
      { editStatus!==true? <button className='btn btn-primary mx-2' onClick={e=>setEditStatus(true)}>Edit Batch</button>
        :<button className='btn btn-primary mx-2' onClick={updateBatch}>Submit</button>}
        
        </div>
      </div>
    </div>
  </div>
  </div>
  </>
  )
}

export default EditRunningBatch