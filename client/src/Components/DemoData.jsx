import React, { useEffect, useState, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, NavLink, useParams,useNavigate, useLocation } from 'react-router-dom';

function DemoData(props) {

    const { demolist, demoStudent } = props;
    console.log('demolist =',demolist,demoStudent)

    const navigation = useNavigate()

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const demoStatus = {
        Done: "success",
        Cancel: "dark",
        Process:"warning"
      }

    const date = new Date();

    const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
    console.log("day",day)
    const month = date.getMonth();
    const year = date.getFullYear();


    // const getTrainerdemo = async () => {

    //     const res = await fetch("http://localhost:8000/getDemoes", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ TrainerId: localStorage.getItem('TrainerId'), month: monthName[month], day: day.toString(), year: year.toString() })
    //     });

    //     const data = await res.json();
    //     console.log('data of demo =', data)
    //     if (res.status === 422 || !data) {
    //         console.log("error ");

    //     }
    //     filterDemo(data)
    // }
    useEffect(() => {
        // fetchTrainerStatus()
   
     
    }, [])

    // async function fetchTrainerStatus() {
    //     try {
    //       const status = await ContextValue.checkTrainer();
          
    //   console.log('status of trainer =', status);
    //   if(status.status==="active"){
    //     // getTrainerdemo();
    //   }
    //   else{
    //     navigation('/')
    //     alert('you are not authorized')
    //   }
    
    //     } catch (error) {
    //       console.error('Error fetching admin status:', error);
    //     }
    //   }
    return (
        <>
                 
            <div className='main-container'>
                <div className="w-80">


                    <div className="table-responsive recentOrderTable">
                    <table id="datatable"  className="table table-striped table-bordered"cellspacing="0" width="100%" >
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">No Of Candidate</th>
                                    <th scope="col">Counsellor</th>
                                    <th scope="col">Trainer</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {demolist && demolist.map((data, index) => {
                                    
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.Date}</td>
                                            <td>{data.Time}</td>
                                            <td>{demoStudent[index].length}</td>
                                            <td>{data.CounselorName}</td>
                                            <td>{data.Trainer}</td>
                                            <td><Link to={data.classLink}><button className='btn btn-primary'>Class Link</button></Link ></td>
                                            <td> <NavLink to={`teacherdemo`}> <button className="btn btn-success" onClick={e=>{localStorage.setItem('demoData',JSON.stringify(demoStudent[index]))}}  ><RemoveRedEyeIcon /></button></NavLink></td>
                                            <td>
                                      <span className={`badge badge-rounded badge-${demoStatus[data.status]}`}>
                                    {data.status}
                                  </span>
                                      </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          
        </>
    )
}

export default DemoData