import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import StudentSlidebar from "./StudentSlidebar";
import { StudentContext } from '../context/StudentState';
import Header from "../Components/Header";

function StudentAttandanceDetails() {
  const location = useLocation();
  const { id, batch } = location.state;

  console.log("id and batch =",id,batch)

  // console.log('id =', id)

  let checkDate;
  const [startDate, setStartDate] = useState();
  const [firstDay, setFirstDay] = useState(1);
  const [dayRows, setDayRows] = useState([]);
  const [attendenceRows, setAttendanceStatus] = useState([]);
  const [batchDetail, setBatchDetail] = useState({
    batch:batch===null?"":batch,
    batchTime:"",
    batchTrainer:"",
    trainerId:""
  })

  let ContextValue = useContext(StudentContext);

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
  let dayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const [student, setStudent] = useState();
  const [lastDay, setLastDay] = useState(new Date().getDate());
  const [filteredMonth, setFilteredMonth] = useState(
    monthName[new Date().getMonth()]
  );
  let currentMonth = monthName[new Date().getMonth()];
  const [allAttendance, setAllAttendance] = useState();
  const [monthAttendance, setMonthAttendance] = useState();
  let tempMonthAttendance;
  let presentId;
  let absentId;
  let missingDays = [];
  let status = [];

  let currentDate = new Date();
  const [date, setDate] = useState();
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());
  // let currentDay = currentDate.getDate()
  // const [currentMonth, setCurrentMonth] = useState(month[((currentDate.getMonth()))])

  // let currentMonth = month[((currentDate.getMonth()))]
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // let currentYear = currentDate.getFullYear()
  // let tempFullDate = `${currentDay}/${currentMonth}/${currentYear}`
  // const [fullDate, setFullDate] = useState(tempFullDate)

  let tempdate = date;

  useEffect(async () => {
    // FullAttand();
    getstudent();
    console.log('batch outside =',batch)

    if(batch){
      console.log('batch =',batch)
      setStudentBatch(batch)
    }

    // fillAttendance()
  }, []);

  const setMonth = (month) => {
    console.log("month =", month, month-1,currentMonth);
    setFilteredMonth(month);

    if (monthName[month-1] == currentMonth) {
      console.log("current month =", month);
      setLastDay(new Date().getDate());
    } 
    else {
      const lastDayOfMonth = new Date(
        currentYear,
        month,
        0
      );
      let lastDate = lastDayOfMonth.getDate();
      setLastDay(lastDate);
      console.log("last date =", lastDate);
    }
  };

  const getAttendance = async(student) => {
    console.log("first last ", filteredMonth, student,batchDetail);
    let filterStatus = await fetch("http://localhost:8000/getMonthAttendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: currentYear,
        month: filteredMonth,
        batch: batchDetail.batch,
        TrainerID: batchDetail.trainerId,
      }),
    });
    let data = await filterStatus.json();
    console.log("data attendance =", data);

    setAllAttendance(data);
    extractAttendance(data, student);
  };

  const getstudent = async () => {
    let res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res = await res.json();
    console.log("student =", res.userIndividual);
    setStudent(res.userIndividual);
    // setBatchDetail({...batchDetail,["batch"]:res.userIndividual.studentRunningBatch[0], ["batchTime"]:res.userIndividual.BatchTiming,["batchTrainer"]:res.userIndividual.TrainerName,["trainerId"]:res.userIndividual.TrainerID})
    // fillAttendance(tempMonthAttendance, res)
    // getAttendance(res.userIndividual);
  };

  const extractAttendance = (data, currentStudent) => {
    let tempDayRows = [];
    // console.log('filter month =',filteredMonth,monthName.indexOf(filteredMonth))
    for (let i = firstDay; i <= lastDay; i++) {
      let daysName =
        dayName[
          new Date(currentYear, (filteredMonth-1), i).getDay()
        ];

      tempDayRows.push(
        <th className="days">
          <span>{i}</span>
          <span className="daysName">{daysName}</span>
        </th>
      );
    }
    console.log("data extract =", data);

    let tempAttendanceRow = [];
    let attendanceIndex = 0;
    // console.log("first day and last day =",firstDay,lastDay)
    for (let i = firstDay; i <= lastDay; i++) {
      // console.log("attendance index= ",attendanceIndex)
      let daysName =
        dayName[
          new Date(currentYear, monthName.indexOf(filteredMonth), i).getDay()
        ];
      let filterAttendance = filterDateByDate(data.filterAttendance, i);

      if (filterAttendance.length !== 0) {
        console.log("date by date", i, attendanceIndex);
        let presentStatus = false;

    
          // console.log("else ",currentStudent.EnrollmentNo)
        
          filterAttendance[0].studentId.map(data=>{
            if(currentStudent.EnrollmentNo===data.studentId){
              tempAttendanceRow.push(<td className={`text-${data.status==="present"?"success":"danger"}`}>{data.status}</td>)

            }

          })

       
        
        attendanceIndex = attendanceIndex + 1;
      } else{
           
        tempAttendanceRow.push(<td className='text-warning'>NM</td>)

    } 
    }

    // Update the state variables
    setDayRows(tempDayRows);
    setAttendanceStatus(tempAttendanceRow);
  };

  const filterDateByDate = (attendance, i) => {
    return attendance.filter((data) => {
      return data.day == i;
    });
  };

  // const fillAttendance = (attendanceData, student) => {

  //   console.log('attendance =',attendanceData,presentId)

  //     attendanceData.map((data, index) => {

  //         let daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //         if ((index + 1) === attendanceData.length) {

  //             if ((parseInt(tempdate) - parseInt(data.date) > 0)) {
  //                 daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === student.Batch) {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map((presentdata,presentIndex) => {

  //                             if (presentdata === student.EnrollmentNo && presentStatus === false) {
  //                                 console.log('for present',presentIndex)
  //                                 presentStatus = true;
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             console.log('for absent')
  //                             status.push("absent")
  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                 }

  //                 setAttendanceStatus(status)

  //                 checkDate = checkDate + 1
  //                 for (let i = 0; i < (parseInt(tempdate) - parseInt(data.date)); i++) {

  //                     if (daysName !== 'fri') {

  //                         missingDays.push(checkDate)
  //                         status.push("not marked")
  //                     }

  //                     else {

  //                         status.push("holiday")
  //                     }
  //                     daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 }

  //             }

  //             else {

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === student.Batch) {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                         console.log('not marked')
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map((presentdata,presentIndex) => {

  //                             if (presentdata === student.EnrollmentNo && presentStatus===false) {
  //                                 presentStatus = true;
  //                                 console.log('present =',presentdata,student.EnrollmentNo,presentIndex)
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             status.push("absent")
  //                             console.log('absent =',student.EnrollmentNo)

  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                     console.log('holiday =',student.EnrollmentNo)
  //                 }
  //             }

  //             setAttendanceStatus(status)
  //             checkDate = checkDate + 1;

  //         }

  //         else if ((index + 1) < attendanceData.length) {
  //             if ((parseInt(attendanceData[index + 1].date) - parseInt(data.date) > 1)) {
  //                 daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === student.Batch) {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map(presentdata => {

  //                             if (presentdata === student.EnrollmentNo && presentStatus === false) {
  //                                 presentStatus = true;
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             status.push("absent")
  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                 }

  //                 setAttendanceStatus(status)

  //                 checkDate = checkDate + 1
  //                 for (let i = 1; i < (parseInt(attendanceData[index + 1].date) - parseInt(data.date)); i++) {

  //                     if (daysName !== 'fri') {

  //                         missingDays.push(checkDate)
  //                         status.push("not marked")
  //                     }

  //                     else {

  //                         status.push("holiday")
  //                     }
  //                     daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 }

  //             }

  //             else {

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === "ST/2023/08/SH02/02") {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map(presentdata => {

  //                             if (presentdata === student.EnrollmentNo && presentStatus === false) {
  //                                 presentStatus = true;
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             status.push("absent")
  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                 }
  //             }

  //             setAttendanceStatus(status)
  //             checkDate = checkDate + 1;

  //         }

  //     })

  //     status.map(async (data, index) => {
  //         if (data === 'absent') {
  //             if (((status.length) - (index + 1)) > 1) {
  //                 if (status[index + 1] === 'absent' && status[index + 2] === 'absent') {

  //                     let checkId = [student.EnrollmentNo]

  //                 }
  //             }
  //         }
  //     })

  // }

  const setStudentBatch = async(batch) =>
  {
    let batchData = await ContextValue.getBatchDetail(batch)
    setBatchDetail({batchDetail,["batch"]:batchData.Batch,["batchTime"]:batchData.BatchTime,["batchTrainer"]:batchData.Trainer,["trainerId"]:batchData.TrainerID})
    console.log("batch data =",batchData)
  }

  return (
    <>
     
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Attandance Sheet</h4>
                </div>
              </div>
              <div className="row attendance-row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <div className="sheet">
                      <div className="full-data">
                        <h3 className="attendance-data">Name:</h3>
                        <h4 className="attendance-data-h4">{student && student.Name}</h4>
                      </div>
                      <div className="full-data">
                        <h3 className="attendance-data">Course:</h3>
                        <h4 className="attendance-data-h4">{student && student.Course}</h4>
                      </div>
                      <div className="full-data">
                        <h3 className="attendance-data">Trainer Name:</h3>
                        <h4 className="attendance-data-h4">{batchDetail.batchTrainer && batchDetail.batchTrainer}</h4>
                      </div>
                      <div className="full-data">
                        <h3 className="attendance-data">Batch Time:</h3>
                        <h4 className="attendance-data-h4">{batchDetail.batchTime && batchDetail.batchTime}</h4>
                      </div>
                    </div>

                    <div className="start-end-section">
                      <div className="start-section">
                        <select onChange={(e) => setMonth(e.target.value)}>
                          <option disabled selected>
                            --Choose Month--
                          </option>
                          {monthName.map((data,index) => {
                            return <option value={index+1}>{data}</option>;
                          })}
                        </select>
                      </div>

                      <div className="search">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => getAttendance(student)}
                        >
                          Search
                        </button>
                      </div>

                   { 
                   !batch &&                   
                   student && 
             
                   
                    <>
                    <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"
                        onChange={e=>setStudentBatch(e.target.value)}
                      >
                        <option disabled selected>--select Batch--</option>
                    
                    {student.studentRunningBatch.map(data=>{

                      return(
                          <option value={data}>{data}</option>
                      )

                    })}
                       
                        
                    </select>
                    
                    <div className="search">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => getAttendance(student)}
                        >
                          Filter
                        </button>
                      </div>
                    </>
                      }

                    </div>

                    <table
                      id="datatable"
                      className="table table-striped table-bordered"
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          {/* <th scope="col">Action </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {attendenceRows &&
                          attendenceRows.map((data, index) => {
                            return (
                              <tr>
                                <td>{dayRows[index]}</td>
                                <td>{data}</td>
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
        </div>
      
    </>
  );
}

export default StudentAttandanceDetails;
