import React, { useEffect, useState, useContext } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MessageIcon from '@mui/icons-material/Message';
import Swal from 'sweetalert2'
import { StudentContext } from '../context/StudentState'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


// import EditFee from '../Fees/EditFee';


function FeesData(props) {
  const [allStudent, setAllStudent] = useState()
  const navigate = useNavigate();

  const student  = props.student;

  console.log("props student =",student)
  
  let ContextValue = useContext(StudentContext);

  const [Feedata, setFeedata] = useState("")

 

  useEffect(() => {

  }, [])



  const paymentStatus = {
    notification: "warning",
    backout: "dark",
    pending: "danger",
    paid: "success"
  }

  const moveToFeeDetail = (student) =>{
    navigate('FeeDetail', { state: { student } });
  }

  const showFile=(url)=>{
      window.open(url,'_blank')
  }

  return (
    <>
      <div className="fee-detail">
        <div className="container-fluid">
          <div className="page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Student Fees</h4>
              </div>
            </div>
            <div className="table-responsive recentOrderTable">
              <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                <thead>
                  <tr>
                    <th scope="col">Enrollment No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Batch</th>
                    <th scope="col">Counselor</th>
                    <th scope="col">Payment Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">File</th>
                    {/* <th scope="col">Edit</th> */}
                  </tr>
                </thead>
                <tbody>
                  {student && student.map((data, index) => {

                    index = index;

                    return (
                      <tr>
                        <td>{data.EnrollmentNo}</td>
                        <td>{data.Name}</td>
                        <td>{data.Phone}</td>
                        <td>{data.Batch}</td>
                        <td>{data.Counselor}</td>
                        <td>{data.CollectionDate}</td>
                        <td>{data.amount}</td>
                        <td>

                        <td className='d-flex w-f'>
                        <button className="btn btn-success" onClick={e=>showFile(data.url)}><RemoveRedEyeIcon /></button>

                                   
                                  </td>

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
      </div>
      
    </>
  )
}

export default FeesData