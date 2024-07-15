import React, { useEffect, useState, useContext } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { StudentContext } from '../../context/StudentState';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function NewBatch() {
    let ContextValue = useContext(StudentContext);
    const [trainer, setTrainer] = useState()
    const [batchCourse, setBatchCourse] = useState()
    const [allbatchTime, setAllBatchTime] = useState()
    const [Days, setDays] = useState("weekDaysBatch")
    const [totalMonth, setTotalMonth] = useState()
    const [currentTrainer, setCurrentTrainer] = useState();
    const [runningbatchTrainerData, setRunningbatchTrainerData] = useState();
    const [addBatch, setAddBatch] = useState(false)

    const [batchDetail, setBatchDetail] = useState({
        "trainer": '',
        "course": '',
        "month": '',
        "daysName": '',
        "batchTime": '',
        "TrainerID": '',
        "courseName":''
    })

    let trainerData = {}
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const navigation = useNavigate()
    useEffect(() => {

        fetchAdminStatus()
        console.log('use effect running')
    }, [])

    async function fetchAdminStatus() {
        try {
            const status = await ContextValue.checkAdmin();

            console.log('status of admin =', status);
            if (status.status === "active") {
                getTrainer()
            }
            else {
                navigation('/')
                alert('you are not authorized')
            }

        } catch (error) {
            console.error('Error fetching admin status:', error);
        }
    }

    const updateTrainer = async (index) => {
        console.log('trainer update ',index, trainer[index].code,trainer[index].Name)
        // let trainerCode = trainer.filter(data => {
        //     return data._id === trainerData[trainerName]
        // })[0].code
        setCurrentTrainer(trainer[index])
        setBatchDetail({ ...batchDetail, ["trainer"]: trainer[index].code, ["TrainerID"]: trainer[index].code })
        getCourses(trainer[index])
        getRunningBatchTrainer(trainer[index])
    }


    const getRunningBatchTrainer = async (trainer) => {

        try {
            let runningTrainer = await fetch('http://localhost:8000/getRunningBatchTrainer', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ TrainerID: trainer._id })
            })
            runningTrainer = await runningTrainer.json()
            runningTrainer = runningTrainer.runningbatchTrainer
            
            setRunningbatchTrainerData(runningTrainer)
            setAvailableBatchTime(runningTrainer,trainer)


        }   
        catch (error) {
            console.log('error =',error.message)
            alert('sorry some error occured try again later')
        }
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

    const getCourses = async (trainerData) => {
        // let tempcurrentTrainer = trainer.filter(data => {
        //     return data.Name === trainerName
        // })

        setCurrentTrainer(trainerData)

        setBatchCourse(trainerData.Course)
    
        // setTrainer(trainerData)

    }

    const updateBatch = (batchName) => {
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

        setTotalMonth(month)
        setBatchDetail({ ...batchDetail, ["course"]: course, ["courseName"]:batchName})
    }

    const updateDays = (e) => {
        setDays(e)
        let day = e === "weekDaysBatch" ? "WeekDays" : "WeekEnd"
        setBatchDetail({ ...batchDetail, ["daysName"]: day })
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

    const updatebatchTime = (batchTime) => {
        setAddBatch(true)
        setBatchDetail({ ...batchDetail, ["batchTime"]: batchTime })

    }

    const addNewBatch = async () => {

        
 ContextValue.updateProgress(30)
 ContextValue.updateBarStatus(true)

        console.log('add new batch =', runningbatchTrainerData, batchDetail)

        let count = 1;

        runningbatchTrainerData.map(data => {
            let dataSplit = data.Batch.split('/')
            if (dataSplit[0] === batchDetail.course) {
                if (dataSplit[2] === batchDetail.month) {
                    count = count + 1;
                    console.log('count= ', count)
                }
            }
        })
        let batch = `${batchDetail.course}/${new Date().getFullYear()}/${batchDetail.month}/${batchDetail.trainer}/${count}`
        console.log('new batch =', batch, batchDetail, currentTrainer)

        try{
        let addedNewBatch = await fetch('http://localhost:8000/addNewBatch', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Batch: batch, Trainer: currentTrainer.Name, BatchTime: batchDetail.batchTime, Days: batchDetail.daysName, TrainerID: batchDetail.TrainerID, courseName:batchDetail.courseName})
        })

        addedNewBatch = await addedNewBatch.json()
        console.log('added batch =', addedNewBatch)
        ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
        
 Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Batch Added',
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

    const updateMonth = (month) => {
        setDays('true')
        setBatchDetail({ ...batchDetail, ["month"]: month })
    }
    return (
        <>
            <Header />
            <div className='sidebar-main-container c-gap-100'>
                <Sidebar />
                <div className="row new-batch right-side-container">
                    <div className="col-xl-12 col-xxl-12 col-sm-12">
                        <div className="card w-80">
                            <div className="card-header batch">
                                <h1 >Add New Batch</h1>
                            </div>
                            <div>
                                <form action="#" method="post">
                                    <div className="row new-batch-row">

                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Trainer</label>
                                                {trainer && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    class="form-control"
                                                    onChange={e => updateTrainer(e.target.value)}
                                                >
                                                    <option disabled selected>--select Trainer--</option>
                                                    {trainer.map((data, index) => {
                                                            trainerData[data.Name] = data._id
                                                        return (
                                                            <option value={index}>{data.Name}</option>
                                                        )
                                                    })
                                                    }
                                                </select>
                                                }
                                            </div>
                                        </div>

                                        {batchCourse && <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">

                                                <>
                                                    <label className="form-label">Course</label>
                                                    {batchCourse && <select
                                                        id="exampleInputPassword1"
                                                        type="select"
                                                        name="Course"
                                                        class="form-control"
                                                        onChange={e => updateBatch(e.target.value)}
                                                    >
                                                        <option selected disabled>----Select Course ------</option>
                                                        {batchCourse && batchCourse.map(data => {

                                                            return (
                                                                <>
                                                                    <option value={data}>{data}</option>
                                                                </>
                                                            )
                                                        })

                                                        }

                                                    </select>}
                                                </>

                                            </div>
                                        </div>
                                        }
                                        {<div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Starting Month</label>
                                                {month && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    name="Course"
                                                    class="form-control"
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
                                        </div>}
                                        <div className="col-lg-6 col-md-6 col-sm-12">

                                            {Days && <div className="form-group">
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
                                            </div>}
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
                                        </div>

                                    </div>
                                </form>

                                {addBatch && <button className='add-batch-btn' onClick={addNewBatch}>Add Batch</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBatch