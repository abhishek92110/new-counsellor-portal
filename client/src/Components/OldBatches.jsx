import React, { useEffect, useState, useContext } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { NavLink, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2'

const OldBatches = () => {

  let ContextValue = useContext(StudentContext);
  const [oldbatch, setOldBatches] = useState()
  const navigation = useNavigate()

  useEffect(() => {
    getOldBatch()

  }, [])

  

  const deleteuser = async (id) => {
    console.log("batch id= ",id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/deleteBatch/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }

        }).then(response => {

          const deletedata = response.json();

          if (deletedata.status === 422 || !deletedata) {
            console.log("error");
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          else {
            console.log("user deleted", deletedata);
            // setDLTdata(deletedata)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          });

        })
      }
    })

  }



  const getOldBatch = async () => {

    let oldBatches = await fetch('http://localhost:8000/getOldBatch');

    oldBatches = await oldBatches.json()

    setOldBatches(oldBatches.oldBatches)
  }
  return (
    <>
      <Header />

      <div className='sidebar-container'>
        <Sidebar />

        <div className="fee-detail right-side-container">
          <div className="table-responsive recentOrderTable">
            <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Trainer</th>
                  <th scope="col">Batch Time</th>
                  <th scope="col">Days</th>
                  <th scope="col">View</th>

                </tr>
              </thead>
              <tbody>
                {oldbatch &&

                  oldbatch.map((data, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.Batch}</td>
                        <td>{data.Trainer}</td>
                        <td>{data.BatchTime}</td>
                        <td>{data.Days}</td>
                        <td>
                          <button className="btn btn-success" onClick={e => { localStorage.setItem('selectedRunningBatch', data.Batch) }}> <NavLink to={`Student`}> <RemoveRedEyeIcon /></NavLink></button>
                          {/* <button className="btn btn-danger text-light" onClick={() => deleteuser(data._id)}><DeleteOutlineIcon /></button> */}

                        </td>

                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </>
  )
}

export default OldBatches