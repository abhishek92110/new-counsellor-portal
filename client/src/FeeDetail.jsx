import React from 'react'

function FeeDetail() {
    return (
        <>

            <div className="card-body">
                <div className="table-responsive recentOrderTable">
                    <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Assigned Professor</th>
                                <th scope="col">Date Of Admit</th>
                                <th scope="col">Status</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Fees</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudent && currentStudent.map((data, index) => {

                                index = start + index;

                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.Name}</td>
                                        <td>{data.TrainerName}</td>
                                        <td>{data.JoiningDate}</td>
                                        <td>
                                            <span className={`badge badge-rounded badge-${badgeStatus[data.status]}`}>
                                                {data.status}
                                            </span>
                                        </td>
                                        <td>{data.Course}</td>
                                        <td>{data.Fees}</td>
                                        <td className='nav-link'>
                                            <button className="btn btn-success"> <NavLink to={`/Aboutstudent/${data._id}`}> <RemoveRedEyeIcon /></NavLink></button>
                                            <button className="btn btn-primary"> <NavLink to={`/EditStudents/${data._id}`}> <CreateIcon /></NavLink></button>
                                            <button className="btn btn-danger" onClick={() => deleteuser(data._id)}><DeleteOutlineIcon /></button>
                                            <button className="btn btn-warning text-light" onClick={() => showMessagedialog(data._id)}><MessageIcon /></button>
                                            <button className="btn btn-danger"><NavLink to={`/student/${data._id}/fullattendance`}><i class="fa-solid fa-clipboard-user text-light"></i></NavLink></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default FeeDetail