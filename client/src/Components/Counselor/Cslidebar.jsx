import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { StudentContext } from '../../context/StudentState';



export default function Cslidebar() {

  document.title = "Uncodemy - Counsellor Dashboard"

    let ContextValue = useContext(StudentContext);
    const navigate = useNavigate();
    const navigation = useNavigate();

    const [counselor, setCounselor] = useState()
    const [message, setMessage] = useState()

    useEffect(()=>{

        getCounsellorStatus()    

    },[])



    const getCounsellorStatus = async () => {
        console.log("counselor status")
        try {
          const status = await ContextValue.checkCounsellor();
    
          console.log('status of counselor =',status);
          if (status.status === "active") {
            setCounselor(status.data)
            localStorage.setItem('counselorId',status.data._id)
            receivemessage(status.data._id)
            // receivemessage(status.data._id)
            // localStorage.setItem('studentData', JSON.stringify(status.data))
          }
          else {
            navigation('/')
            alert('you are not authorized')
          }
    
        } catch (error) {
          console.error('Error fetching admin status:', error);
        }
      }

      const receivemessage = async (id) => {
        console.log('counselor receive message')
        const messageRes = await fetch(`http://localhost:8000/receivemessage/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
    
          },
        });
    
        const messageData = await messageRes.json();
        console.log("counselor messageData", messageData.message)
        setMessage(messageData.message)
        console.log("messageData",messageData.message)
      }
    

      const moveToDemo =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/AddDemo', { state: { counselor } });
      }
      const moveToRegister =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/RegisterStudentAdd', { state: { counselor } });
      }
      const moveToRegisterStudent =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/RegisteredStudent', { state: { counselor } });
      }
      const moveToFeedBack =()=>{
        
        navigate('/counsellor/Demo-Feedback', { state: { counselor } });

      }
      const moveToAllDemo =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/AllDemo', { state: { counselor } });
      }

      const moveToChangePasssword = ()=>{
        navigate('/Forget-Password', { state: { user:"counselor" } });
      }

    return (

        <>

            <div className="dlabnav">
                <div className="dlabnav-scroll">
                    <ul className="metismenu" id="menu">
                        <li className="nav-label first">Main Menu</li>
                        <li>
                            <Link className="has-arrow" to={`/counsellor`}> Dashboard</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to={`/counselor/SendMessage`}>Message</Link>
                        </li>
                        {/* <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                <i className="la la-users" />
                                <span className="nav-text">Students</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <Link to="/counselor/AllStudents">All Students</Link>
                                   
                                </li>
                                <li>
                                    <Link to="/counsellor/AddStudents">Add Students</Link>
                                </li>
                            </ul>
                        </li> */}
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                              
                                <span className="nav-text">Register Student</span>
                            </a>
                            <ul aria-expanded="false">
                            
                                <li onClick={moveToRegister} className='light-text mt-2'>Add Register Student
                                    {/* <a href="AllStudents.jsx">All Students</a> */}
                                </li>
                               
                                <li onClick={moveToRegisterStudent} className='light-text mt-2'>Register Student
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div onClick={moveToDemo} className='light-text sidebar-list'> <span className="nav-text">Demo</span></div>
                        </li>
                        <button className='btn-sidebar' onClick={moveToFeedBack}><li>
                         <div className='light-text'> <span className="nav-text sidebar-list">Add Demo Feedback</span></div>
                       </li> </button>

                       <li onClick={moveToChangePasssword} className="text-light sidebar-list cursor-pointer">
             
             Change Password
        
         </li>

                    </ul>
                </div>
            </div>

        </>

    )
}
