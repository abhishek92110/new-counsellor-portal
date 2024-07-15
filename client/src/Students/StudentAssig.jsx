import React, { useState, useContext, useEffect } from 'react'
import Header from '../Components/Header'
import AssignmentStatus from './AssignmentStatus'
import Assignment from './Assignment'
import VideoAssignment from './VideoAssignment'
import StudentSlidebar from './StudentSlidebar'
import StudentNotes from './StudentNotes'
import { StudentContext } from '../context/StudentState';
import { useLocation } from 'react-router-dom'


function StudentAssig() {
    const location = useLocation();
    let ContextValue = useContext(StudentContext);
    const { student } = location.state;
    const [status, setStatus] = useState("Assignment")
    const [assignment, setAssignment] = useState("pending")


    useEffect(()=>{
        setStudentBatch(student.studentRunningBatch[0])
        ContextValue.updateBatch(student.studentRunningBatch[0])
    },[])
    
          const [batchDetail, setBatchDetail] = useState({
            batch:student.studentRunningBatch[0],
            batchTime:"",
            batchTrainer:"",
            trainerId:"",
            batchData:""
          })
         

        const setStudentBatch = async(batch) =>{
        let batchData = await ContextValue.getBatchDetail(batch)
        console.log('batch Data =',batchData,batch)
        setBatchDetail({batchDetail,["batchData"]:batchData,["batch"]:batchData.Batch,["batchTime"]:batchData.BatchTime,["batchTrainer"]:batchData.Trainer,["trainerId"]:batchData.TrainerID})
        console.log("batch data =",batchData)
        ContextValue.updateBatch(batchData)
      }

     

    return (
        <>
            <Header />
            <div className='sidebar-main-container'>
        <StudentSlidebar />
            <div className="Assignment-section right-side-container">
          
          <div className='d-flex-j-c-space-between-align-items-center'>

                <div className="card-header j-c-initial">
                <button class="btn btn-outline-dark" onClick={e => setStatus("Assignment")}>Assignment</button>
                <button class="btn btn-outline-dark" onClick={e => setStatus("Notes")}>Notes</button>
                <button class="btn btn-outline-dark" onClick={e => setStatus("Video")}>Video</button>
               
              </div>
              <div>
              {student && <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"
                        onChange={e=>setStudentBatch(e.target.value)}
                      >
                        <option disabled selected>--select Batch--</option>
                    
                    {student.studentRunningBatch.map(data=>{

                      return(
                          <option value={data}>{data}</option>
                      )

                    })}
                       
                        
                    </select>}
              </div>
              </div>
                {status === "Assignment" && <div>
                    <ul className="nav nav-tabs" >
                        <li className="nav-item" >
                            <a
                                onClick={e => setAssignment("pending")}
                                data-toggle="tab"
                                className="nav-link active show"
                            >
                                Pending Assignment
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                onClick={e => setAssignment("submitted")}
                                data-toggle="tab"
                                className="nav-link"
                            >
                                Submitted Assignment
                            </a>
                        </li>
                    </ul>


                    {assignment === "pending" ? <Assignment student={student} batch={batchDetail.batchData}/>
                        : <AssignmentStatus student={student} batch={batchDetail.batchData}/>}
                </div>
                }
                  {status === "Notes" && <StudentNotes student={student} batch={batchDetail.batchData}/>}
                {status === "Video" && <VideoAssignment student={student} batch={batchDetail.batchData}/>}
            </div>
            </div>
        </>
    )
}

export default StudentAssig