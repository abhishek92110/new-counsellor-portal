import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate, useLocation  } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { StudentContext } from '../context/StudentState';
import Swal from 'sweetalert2'

// import Home from '../Components/Home'
// import Header from '../Components/Header'

export default function AllBatchTiming() {

  const location = useLocation();
  const { weekDays, weekEnd } = location.state;
  const [currentBatchTime, setCurrentBatchTime] = useState(weekDays)
  const [days, setDays] = useState("WeekDays")
  console.log('batch time =',weekDays,weekEnd)
  let toTime=''
  let fromTime=''

  let ContextValue = useContext(StudentContext);
  document.title = "StudentDashboard - All Student"
  const navigation = useNavigate()

  const addBatchTime = ()=>{
    Swal.fire({
        title: 'Enter New Batch Timing',
        html: `
        <div class="from-to-swal"><label>From</label><input type="time" id="fromTimeInput" class="swal2-input fromTime" placeholder="From Time"></div>
        <div class="from-to-swal"><label>To</label><input type="time" id="toTimeInput" class="swal2-input toTime" placeholder="To Time"></div>
    `,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => 
        {
          const fromTimeInput = document.getElementById('fromTimeInput');
          const toTimeInput = document.getElementById('toTimeInput');
          fromTime = fromTimeInput.value;
          toTime =   toTimeInput.value;
        console.log('from and to value=',fromTime,toTime)
           
          fromTime = formatTime(fromTime)
          toTime =   formatTime(toTime)

          },
        
        allowOutsideClick: () => !Swal.isLoading()

      }).then((result) => {
        let time = `${fromTime} - ${toTime}`
        console.log('from and to =',fromTime,toTime,time)
        if (result.isConfirmed) {
          addBatch(time)
          Swal.fire({
            title: `${result.value}`,
            
            imageUrl: result.value.avatar_url
          })
        }
      })
  }


  const addBatch = async(time)=>{
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    let tempBatchTime = days==="WeekDays"?weekDays:weekEnd
    tempBatchTime.push(time)
    console.log('all batch =',days,tempBatchTime)

    try{
    let newBatch = await fetch("http://localhost:8000/addNewBatchTime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"days":days,"batchTime":tempBatchTime})
      });
      ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Batch Timing Added',
        showConfirmButton: false,
        timer: 1500
      })
    }
    catch(error){
      Swal.fire({   
        icon:  'error',
        title: 'Oops...',
        text:  'Something Went Wrong',
      }) 
      ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
    }

  }

  const formatTime = (time)=>{
    

// Split the time string into hours and minutes
const [hours, minutes] = time.split(':');

// Create a Date object and set the hours and minutes
const date = new Date();
date.setHours(parseInt(hours, 10));
date.setMinutes(parseInt(minutes, 10));

// Format the time with AM/PM
const formattedTime = date.toLocaleString('en-US', {
  hour: '2-digit',
  minute: 'numeric',
  hour12: true,
});

console.log(formattedTime);
return formattedTime
  }

  const setDaysTime = (days)=>{

    setDays(days)
    let tempBatchTime = days==="WeekDays"?weekDays:weekEnd
    setCurrentBatchTime(tempBatchTime)
  }

  return (

    <>

      <Header />
      <div className='sidebar-main-container'>
        <Sidebar />

        <div className="content-body" style={{ minWidth: "876px" }}>
          {/* row */}
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Batch Time</h4>
                </div>
                <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"
                        onChange={e=>setDaysTime(e.target.value)}
                    >
                        <option disabled selected>--select Days--</option>
                    
                                <option value="WeekDays">WeekDays</option>
                                <option value="WeekEndDays">WeekEnd Days</option>
                                            
                        
                    </select>
              </div>
             
            </div>
            <div className="row">
              <div className="col-lg-12">

              </div>
              <div className="col-lg-12">
                <div className="row tab-content">
                  <div id="list-view" className="tab-pane fade active show col-lg-12">
                    <div className="card w-80">
                      <div className="card-header">
                        <h4 className="card-title">All Batch List</h4>
                        <button className='btn btn-primary' onClick={addBatchTime}>Add New {days} Timing</button>

                      </div>




                      <div class="container">

                        <div class="row">

                          <div class="col-md-12">


                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>Time</th>
                             
                                 
                                </tr>
                              </thead>



                              <tbody>
                                {currentBatchTime && currentBatchTime.map((data, index) => {

                                  return (
                                    <tr>

                                      <td>{index + 1}</td>
                                      <td>{data}</td>
                                      

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
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>






  )
}
