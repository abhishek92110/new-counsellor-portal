import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function AllCounselor() {
  let ContextValue = useContext(StudentContext);

  document.title = "StudentDashboard - All Trainer";

  const [counselor, setCounselor] = useState("");

  const getCounselorData = async () => {
    let counselor = await ContextValue.getAllCounselor();
    
    setCounselor(counselor.counselorData);
    console.log("counselor =", counselor.counselorData);
  };

  useEffect(() => {
    getCounselorData();
  }, []);

  return (
    <>
     <Header />
     <div className='sidebar-main-container'>
      <Sidebar />
      <div className="card-body">
      <div className="container-fluid">
          <div className="row page-titles mx-0">
        <div className="col-sm-6 p-md-0">
          <div className="welcome-text">
            <h4>All Counselor</h4>
          </div>
        </div>
        <div className="table-responsive recentOrderTable">
          <table
            id="datatable"
            className="table table-striped table-bordered"
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Number</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {counselor &&
                counselor.map((CounselorData, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{CounselorData.Name}</td>
                      <td>{CounselorData.Number}</td>
                      <td>{CounselorData.Email}</td>
                      <td>{CounselorData.Address}</td>
                      {/* <td>
                                  <NavLink to={`/AboutCounselor/${CounselorData._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                  <NavLink to={`/EditStudents/${CounselorData._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                  <button className="btn btn-danger" onClick={() => deleteuser(CounselorData._id)}><DeleteOutlineIcon /></button>
                                  <button className="btn btn-warning text-light" onClick={() => showMessagedialog(CounselorData._id)}><MessageIcon /></button>
                                </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}
