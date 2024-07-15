import React from 'react'
import { useLocation } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const StudentAssignment = () => {

    const location = useLocation()
    const {data} = location.state
    console.log("data completed section=",data)
    let submittedAssignment = data
    const toggleDocument = (url) => {
        window.open(url,'_blank')
    };
  return (

<div className='main-link-div w-80 ml-30 mt-30 right-side-container'>
                <div className='link-container'>
                    <div className="assignment-link">
                        {/* <h1 className='first-heading'>Assignment</h1> */}
                        <div className='assignment-link-container'>
                            <div className='assignment-place'>
                                <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Enrollment No.</th>
                                            <th>Name</th>
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
                                                <td>{data.enrollmentNo}</td>
                                                <td>{data.student}</td>
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
  )
}

export default StudentAssignment