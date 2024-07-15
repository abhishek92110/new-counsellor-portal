import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from "../context/StudentState";

export default function StudentSlidebar() {

  document.title = "Uncodemy - Student Dashboard"

  let ContextValue = useContext(StudentContext);
  const [StudentID, setStudentID] = useState();
  const [student, setStudent] = useState(0)
  const { id } = useParams();
  const navigation = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentStatus();
  }, []);

  const moveToAssignment = ()=>{
    console.log('move to message')
    navigate('/student/StudentAssigment', { state: { student } });
  }

  const moveToChangePasssword = ()=>{
    navigate('/Forget-Password', { state: { user:"student" } });
  }

  async function fetchStudentStatus() {
    try {
      const status = await ContextValue.checkStudent();
      console.log("student id =", status.data._id);
      localStorage.setItem("studentData", JSON.stringify(status.data));
      if (status.status === "active") {
        setStudentID(status.data._id);
        setStudent(status.data)
      } else {
        navigation("/");
        alert("you are not authorized");
      }
    } catch (error) {
      console.error("Error fetching admin status:", error);
    }
  }

  return (
    <>
      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li> /
            <li>
              <Link className="has-arrow" to={`/student`}>
                Student Dashboard
              </Link>
            </li>
            <li>
              <Link className="has-arrow" to={`/student/SendMessage`}>
                Message
              </Link>
            </li>
            <li className="sidebar-list">
              
              <div className="arrow cursor-pointer" onClick={moveToAssignment}>
                Assignment
              </div>
             
            </li>
            <li>
              <Link
                className="has-arrow"
                to={`/student/fullattendance/${StudentID}`}
              >
                Full Attendance
              </Link>
            </li>
            <li onClick={moveToChangePasssword} className="text-light sidebar-list cursor-pointer">
             
                Change Password
           
            </li>
            {/* <li>
              <Link className="has-arrow" to="/SendMessage">
                Log Out
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
