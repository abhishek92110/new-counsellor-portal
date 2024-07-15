import React, { useEffect, useContext, useState } from 'react'
import { useLocation  } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { StudentContext } from "../context/StudentState";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const StudentNotes = (props) => {

    const [notes, setNotes] = useState("pdf")
    const [notesPdf, setNotesPdf] = useState()
    const [notesLink, setNotesLink] = useState()
    const { student, batch } = props;
    console.log('student assignment status =',student)

  let ContextValue = useContext(StudentContext);

  const [submittedAssignment, setSubmittedAssignment] = useState()


    useEffect(()=>{
        
        let batchDetail = ContextValue.currentBatch ? ContextValue.currentBatch.Batch : batch


        getSubmittedAssigment(student._id,batchDetail)
        getTrainerNotesLink(batchDetail,batchDetail)
        getTrainerNotesPdf(batchDetail,batchDetail)
    },[ContextValue.currentBatch])

    const getSubmittedAssigment = async(id,batch)=>{
        let submittedAssignment = await ContextValue.getSubmittedStudentAssignment(id,batch)
        setSubmittedAssignment(submittedAssignment)
    }

  const toggleDocument = (url) => {
    window.open(url,'_blank')
};

const getTrainerNotesPdf =async(batch)=>{
    console.log('batch =',batch)
    let trainerNotesPdf = await ContextValue.getTrainerNotesPdf(batch)
  
    console.log('trainer notes pdf =',trainerNotesPdf)
    setNotesPdf(trainerNotesPdf)
    
  }
  const getTrainerNotesLink =async(batch)=>{
    console.log('batch =',batch)
    let trainerNotesLink = await ContextValue.getTrainerNotesLink(batch)
  
    console.log('trainer notes link =',trainerNotesLink)
    setNotesLink(trainerNotesLink)
  }

    return (
       <>

<select
              className="custom-select mr-sm-2"
              name="notes"
              onChange={(e) => {
                setNotes(e.target.value);
                              
              }}
            >
              <option disabled selected>
                Select Notes
              </option>
              <option value="pdf">
                PDF
              </option>
              <option value="link">
                Link
              </option>

              
            </select>
            {notes=="pdf" && 
            <>

<div className='main-link-div w-60'>
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
                                                <th>Date</th>
                                                <th>View</th>
                                                
                                             
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {notesPdf && notesPdf.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.file}</td>
                                                    <td>{new Date(data.date).toLocaleString()}</td>
                                                    <td>
                                                        <button className="btn btn-success text-light" onClick={e=>toggleDocument(data.url)}>
                                                            <RemoveRedEyeIcon />

                                                        </button>

                                                    </td>
                                                    
                            
                                                
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
            }
         
                          {notes=="link" &&
                          <> 

<div className='main-link-div w-60'>
                    <div className='link-container'>
                        <div className="assignment-link">
                            {/* <h1 className='first-heading'>Assignment</h1> */}
                            <div className='assignment-link-container'>
                                <div className='assignment-place'>
                                    <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                    <th>Date</th>
                                                    <th>View</th>
                                           
                                             
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {notesLink && notesLink.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    
                                                    <td>{new Date(data.date).toLocaleString()}</td>
                                                    <td>
                                                        <button className="btn btn-success text-light" onClick={e=>toggleDocument(data.url)}>
                                                            <RemoveRedEyeIcon />

                                                        </button>

                                                    </td>
                                                                            
                                                
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
                          }
       
       </>
    )
}

export default StudentNotes