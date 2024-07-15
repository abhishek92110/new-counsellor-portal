import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, NavLink, useParams,useNavigate, useLocation } from 'react-router-dom';

const DemoTable = (props) => {
    const demoList = props.demoList
    const demoStudentData = props.demoStudentData

    const demoStatus = {
        Done: "success",
        Cancel: "dark",
        Process:"warning"
      }

  return (
    <div>
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
                                {demoList && demoList.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.Date}</td>
                                            <td>{data.Time}</td>
                                            <td>{demoStudentData[index].length}</td>
                                            <td>{data.CounselorName}</td>
                                            <td>{data.Trainer}</td>
                                            <td><Link to={data.link}><button className='btn btn-primary'>Class Link</button></Link ></td>
                                            <td> <NavLink to={`demoStudent`}> <button className="btn btn-success" onClick={e=>{localStorage.setItem('demoData',JSON.stringify(demoStudentData[index]))}}  ><RemoveRedEyeIcon /></button></NavLink></td>
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
  )
}

export default DemoTable