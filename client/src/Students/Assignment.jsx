import React, { useEffect, useState, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Iframe from 'react-iframe';
import StudentSlidebar from './StudentSlidebar';
import SendIcon from '@mui/icons-material/Send';
import { useLocation  } from 'react-router-dom'
import { StudentContext } from "../context/StudentState";
import Swal from 'sweetalert2'

const Assignment = (props) => {

    const location = useLocation();
    let ContextValue = useContext(StudentContext);
  const {student, batch} = props;
  console.log('assignment props =',student,batch)

  let contextValue = useContext(StudentContext);

    document.title = "StudentDashboard - Assignment"
    const [link, setLink] = useState()
    const [pendingAssignment, setPendingAssignment] = useState()
    const [inpval, setINP] = useState({
        file: null,
        assignmentId:"",
        assignmentUrl:"",
        assignmentFile:"",
        trainerId:batch.TrainerID,
        studentId:student._id,
        batch:batch.Batch,
        student:student.Name,
        enrollmentNo:student.EnrollmentNo,
        trainerName:batch.Trainer
    })

    // ------Upload Student Item----
    const handleFileChange = (e) => {
        console.log("file =", e.target.files[0])
        setINP({ ...inpval, file: e.target.files[0] });
    };

    const sendAssignment = async (e,id,url,file) => {
        e.preventDefault();

        ContextValue.updateProgress(30)
        ContextValue.updateBarStatus(true)

        let tempInp = {...inpval}
        tempInp.assignmentId = id
        tempInp.assignmentUrl = url
        tempInp.assignmentFile = file

        const formData = new FormData();
        for (const field in tempInp) {
            formData.append(field, tempInp[field]);
        }

        try {
            const res = await fetch('http://localhost:8000/submititem', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            console.log("Data", data)

            ContextValue.updateProgress(100)
            ContextValue.updateBarStatus(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'File Uploaded',
                showConfirmButton: false,
                timer: 1500
              })
        }
        catch (error) {
            Swal.fire({   
                icon:  'error',
                title: 'Oops...',
                text:  'Something Went Wrong',
              }) 
              ContextValue.updateProgress(100)
                ContextValue.updateBarStatus(false)
            console.log('error =', error.message)
        }
    }

    const getTrainerdata = async () => {
        const res = await fetch("http://localhost:8000/getuploadAssignmentUrl", {

            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log("Assignment Data ", data)
        setLink(data)

    }

    const toggleDocument = (url) => {
        window.open(url,'_blank')
    };

    const downloaduser = async (url) => {

        const res2 = await fetch(`http://localhost:8000/files/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.open(res2.url)
        // setImageUrl(res2.url)
    }

    useEffect(() => {
        getTrainerdata()
        let batchDetail = contextValue.currentBatch ? contextValue.currentBatch.Batch : batch
        console.log('use effect id batch assignment component',student, student._id,student.Batch,contextValue.currentBatch ,batchDetail)
        getPendingAssignment(student._id,batchDetail)
    }, [contextValue.currentBatch])

    const getPendingAssignment = async(id,batch)=>{
        console.log('get pending assignment',id,batch)
        let pendingAssignment = await contextValue.getPendingStudentAssignment(id,batch)

        console.log("pending assignment =",pendingAssignment)
        setPendingAssignment(pendingAssignment)
    }

    const [showDocument, setShowDocument] = useState(false);

   
    return (
        <>      
                <div className='main-link-div'>
                    <div className='link-container'>
                        <div className="assignment-link">
                            {/* <h1 className='first-heading'>Assignment</h1> */}
                            <div className='assignment-link-container'>
                                <div className='assignment-place'>
                                    <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>File</th>
                                                <th>Uploaded Date</th>
                                                <th>View</th>
                                                <th>Send</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingAssignment && pendingAssignment.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.file}</td>
                                                    <td>{new Date(data.date).toLocaleString()}</td>
                                                    <td>
                                                        <button className="btn btn-success text-light" onClick={e=>toggleDocument(data.url)}>
                                                            <RemoveRedEyeIcon />

                                                        </button>

                                                    </td>
                                                    <td className='d-flex align-center'>
                                                    <input className="dropify" type="file" onChange={handleFileChange} name="file" />
                                                        <SendIcon onClick={e=>sendAssignment(e,data._id,data.url,data.file)} className="cursor-pointer"></SendIcon></td>
                                                
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <label></label>
                            </div>

                        </div>



                    </div>
                </div>
        </>
    )
}

export default Assignment