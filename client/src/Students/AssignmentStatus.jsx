import React, { useEffect, useContext, useState } from 'react'
import { useLocation  } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { StudentContext } from "../context/StudentState";

const AssignmentStatus = (props) => {
    // const { student, batch } = props;

    const location = useLocation()
    const { student } = location.state;

    const batch = props.batch
  
  console.log('student assignment status =',student,batch)

  let ContextValue = useContext(StudentContext);

  const [submittedAssignment, setSubmittedAssignment] = useState()


    useEffect(()=>{

        let batchDetail = ContextValue.currentBatch ? ContextValue.currentBatch.Batch : batch
        getSubmittedAssigment(student._id,batchDetail)

    },[ContextValue.currentBatch])

    const getSubmittedAssigment = async(id,batch)=>{
        let submittedAssignment = await ContextValue.getSubmittedStudentAssignment(id,batch)
        setSubmittedAssignment(submittedAssignment)
    }

  const toggleDocument = (url) => {
    window.open(url,'_blank')
};

    return (
        <div><>

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
                                            <th>Assignment File</th>
                                            <th>Date</th>
                                            <th>View Assignment</th>
                                            <th>View Uploaded</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submittedAssignment && submittedAssignment.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{data.file}</td>
                                                <td>{data.assignmentFile}</td>
                                                <td>{new Date(data.date).toLocaleString()}</td>
                                                <td>
                                                    <button className="btn btn-success text-light" onClick={e=>toggleDocument(data.assignmentUrl)}>
                                                        <RemoveRedEyeIcon />

                                                        </button>

                                                </td>
                                                <td className='d-flex align-center'>
                                                <button className="btn btn-success text-light" onClick={e=>toggleDocument(data.url)}>
                                                        <RemoveRedEyeIcon />
                                                        </button>
                                                </td>
                                              
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                           
                        </div>

                    </div>



                </div>
            </div>


        </></div>
    )
}

export default AssignmentStatus