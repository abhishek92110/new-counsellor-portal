import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom"
import { StudentContext } from '../../context/StudentState';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom';
import { Php } from "@mui/icons-material";


function CounselorAllMessage(props) {

  // const { id } = useParams()
  // console.log('id =', id)
  let ContextValue = useContext(StudentContext);

  const [message, setMessage] = useState(props.message)
  console.log('mesage =',props.message)
  const [student, setStudent] = useState()
  const [status, setStatus] = useState("Assignment")

  const showMessagedialog = async (msg) => {
  
    if (ContextValue) {
  
      Swal.fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        html: `<div id="customDiv"> ${msg} </div>`
      });
  
    } 
  };

  useEffect(() => {
    // receivemessage(id)
  }, [])
  return (
    <>
      <div className="all-message w-80">

        {/* <hr /> */}
        <div className="table_area1">
          <div className="container_area">
          <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Message</th>
                  <th scope="col">From</th>
                  <th scope="col">Date</th>
                  <th scope="col">view</th>
                </tr>
              </thead>
              <tbody>
              {message && message.map((data, index) => {
  // Split the message into words
  const words = data.message.split(' ');

  // Take the first 5 words and join them back together
  const truncatedMessage = words.slice(0, 5).join(' ');

  // Add '...' if there are more than 5 words
  const displayedMessage = words.length > 5 ? `${truncatedMessage} ...` : truncatedMessage;

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{displayedMessage}</td>
      <td>{data.from}</td>
      <td>{data.date}</td>
      <td><button className="btn btn-success" onClick={() => showMessagedialog(data.message)}><RemoveRedEyeIcon/></button></td>
    </tr>
  );
})}


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CounselorAllMessage;
