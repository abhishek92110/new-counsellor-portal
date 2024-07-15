import React, { useEffect, useState } from 'react'
import Header from '../Header';
import { useLocation } from 'react-router-dom';
import TrainerSlidebar from './TrainerSlidebar';

function TeacherDemo() {

    const location  = useLocation()
    const { demoStudentData } = location.state;
    console.log("demo student =",demoStudentData)
    useEffect(() => {
       
    }, [])

    return (
        <>
        <Header/>
        <div className='sidebar-main-container'>
            <Sidebar/>
        <div className='teacher-demo-container'>
            <div className="card-body">
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
                            </tr>
                        </thead>
                        <tbody>
                            {demoStudentData.map((Trainerdemo, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{Trainerdemo.Name}</td>
                                        <td>{Trainerdemo.Number}</td>
                                        <td>{Trainerdemo.Background}</td>
                                        <td>{Trainerdemo.Course}</td>
                                        <td>{Trainerdemo.Trainer}</td>
                                        <td>{Trainerdemo.Time}</td>
                                        <td>{Trainerdemo.Date}</td>
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
        </>
    )
}

export default TeacherDemo