import React, { useEffect, useState, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, NavLink, useParams,useNavigate,useLocation } from 'react-router-dom';
import Header from '../Header';
import Swal from 'sweetalert2'
import Sidebar from '../Sidebar';
import { StudentContext } from '../../context/StudentState'
import Cslidebar from './Cslidebar';
import CreateIcon from '@mui/icons-material/Create';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function AllDemo() 
{
 
    let sameDateTime = [];
    let studentData = [];
    // const [demoList, setDemoList] = useState()
    // const [totalCandidate, setTotalCandidate] = useState()
    // const [totalDemoStudent, setTotalDemoStudent] = useState()
    const [demoStudentData, setDemoStudentData] = useState()
    let ContextValue = useContext(StudentContext);

    const location = useLocation();
  const { demoList,  totalDemoStudent} = location.state;
   

    const navigation = useNavigate()

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const date = new Date();

    const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
    console.log("day",day)
    const month = date.getMonth();
    const year = date.getFullYear();

    useEffect(() => {
        // getCounselordemo(counselor._id);
    }, [])

    const deleteuser = async (id) => {
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
           
                deleteDemo(id)
            
          }
        })
    
      }
   
      const deleteDemo = async(id)=>{
        fetch(`http://localhost:8000/deleteDemo/${id}`, {
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


    return (
        <>
         
            <div className='sidebar-main-container'>
            
         
            <div className='main-container right-side-container'>
                <div className="w-80">
                    <div className="table-responsive recentOrderTable">
                    <table id="datatable"  className="table table-striped table-bordered"cellspacing="0" width="100%" >
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">No Of Candidate</th>
                                    <th scope="col">Trainer Name</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Add Student</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {demoList && demoList.map((data, index) => {
                                    console.log('demo id =',data)
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.Date}</td>
                                            <td>{data.Time}</td>
                                            <td>{totalDemoStudent[index].length}</td>
                                            <td>{data.Trainer}</td>
                                            <td><Link to={data.classLink}><button className='btn btn-primary'>Class Link</button></Link ></td>
                                            <td>  <button className="btn btn-success" onClick={e=>{navigation(`DemoStudent`,{state:{demoStudentData:totalDemoStudent[index]}})}}  ><RemoveRedEyeIcon /></button>
                                     
                                            </td>
                                            <td> <button className="btn btn-warning" onClick={e=>{navigation(`EditDemo`,{state:{data}})}}><CreateIcon /></button></td>
                                            <td> <button className="btn btn-primary" onClick={e=>{navigation(`AddDemoStudent`,{state:{data}})}}><PersonAddIcon /></button></td>
                                            <td> <button className="btn btn-danger" onClick={e=>{deleteuser(data._id)}}><DeleteOutlineIcon /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default AllDemo