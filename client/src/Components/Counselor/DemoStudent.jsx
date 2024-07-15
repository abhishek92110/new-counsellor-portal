import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useLocation, useNavigate } from 'react-router-dom';
import Cslidebar from "./Cslidebar";
import CreateIcon from "@mui/icons-material/Create";
import { NavLink} from "react-router-dom";

function DemoStudent() {

  const navigation = useNavigate()
  const location = useLocation();
  const { demoStudentData } = location.state;
  const [demo, setDemo] = useState();
  let monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const badgeStatus = {
    Register: "success",
    Process: "warning",
    NotIntersted: "danger",
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="sidebar-main-container right-side-container">
      
        <div className="teacher-demo-container">
          <div className="">
            <div className="table-responsive recentOrderTable">
              <table className="table verticle-middle table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Background</th>
                    <th scope="col">Course</th>
                    <th scope="col">Trainer</th>
                    <th scope="col">Time</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {demoStudentData.map(
                    (data, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.Name}</td>
                          <td>{data.Number}</td>
                          <td>{data.Background}</td>
                          <td>{data.Course}</td>
                          <td>{data.Trainer}</td>
                          <td>{data.Time}</td>
                          <td>{data.Date}</td>
                         
                          <button className="btn btn-primary text-light">
                    
                            
                              <button onClick={e=>{navigation(`editDemoStudent`,{state:{data:data}})}}>
                              <CreateIcon />
                              </button>
                           
                          </button>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DemoStudent;
