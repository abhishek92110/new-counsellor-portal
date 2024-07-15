import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {  useLocation  } from 'react-router-dom'
import { StudentContext } from '../context/StudentState';

const RegisteredStudent = () => {

  const location = useLocation();
  const { totalLead } = location.state;

  console.log('total lead =',totalLead)

  let ContextValue = useContext(StudentContext);
  const [Registerdata, setRegisterdata] = useState();
  const [currentRegisterdata, setCurrentRegisterdata] = useState();
  const [trainer, setTrainer] = useState()
  const [counselor, setCounselor] = useState()
  const [detail, setDetail] = useState({
    trainerId:null,
    counselorId:null
  })

  const getRegisteredStudent = async () => {
    const res = await fetch("http://localhost:8000/getregisterStudent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
   

    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      getTrainerData()
      getCounselorData()
      setRegisterdata(data);
      setCurrentRegisterdata(data);
    }
  };

  const getTrainerData = async()=>{
    let trainerData = await ContextValue.getAllTrainer()
    setTrainer(trainerData)

  }

  const getCounselorData = async()=>{
    let counselorData = await ContextValue.getAllCounselor()
    setCounselor(counselorData.counselorData)
  }

  const filterRegisterStudent =()=>{

    console.log("detail = ",detail)
  let filterStudent = Registerdata.filter((data, index) => {

    console.log('condition =',(detail.trainerId != null ? data.TrainerID === detail.trainerId : true) && (detail.counselorId != null ? data.CounselorID === detail.counselorId : true))

    return (detail.trainerId != null ? data.TrainerID === detail.trainerId : true) && (detail.counselorId != null ? data.CounselorID === detail.counselorId : true)
  
  })

  console.log("filter student =",filterStudent)

  setCurrentRegisterdata(filterStudent)
} 

  useEffect(() => {
    getRegisteredStudent();
  },[]);

  let trainerData = {}
  let counselorData = {}
  
  const setTrainerDetail =(e)=>{
    console.log("trainerid= ",trainerData[e.target.value],detail["trainerId"])
    setDetail({...detail, ["trainerId"]: trainerData[e.target.value]});

  }

  const setCounselorDetail = (e)=>{
    setDetail({...detail, ["counselorId"]: counselorData[e.target.value]});
    console.log("counselorId= ",counselorData[e.target.value],e.target.value)
  }

  return (
    <>
     
      <Header />
      <div className='sidebar-main-container'>
      <Sidebar/>
      <div className="content-body w-80">
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
            <div className='message-form'>
              <div className="batch-thumb thumb">
                <label className="form-label">Trainer Name :</label>
               {trainer && <select className="custom-select mr-sm-2" required name='trainer' onChange={e=>setTrainerDetail(e)}>
                  <option selected disabled>Choose Trainer...</option>
                { trainer.map(data=>{
                  trainerData[data.Name] = data._id
                  return(
                    <option value={data.Name}>{data.Name}</option>
                  )
                })
                 }
                  
                </select>}
              </div>
              <div className="batch-thumb thumb">
                <label className="form-label"> Counselor :</label>
              {counselor &&  <select className="custom-select mr-sm-2" required name='counselor' onChange={e=>setCounselorDetail(e)}>
                  <option selected disabled>Choose Counselor...</option>
                  { counselor.map(data=>{
                  counselorData[data.Name] = data._id
                  return(
                    <option value={data.Name}>{data.Name}</option>
                  )
                })
                 }
                </select>}
              </div>             
              <button className='filter-btn'onClick={filterRegisterStudent} >Filter</button>
            </div>
          </div>
        </div>
        <div className="card-body Registrated-detail">
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
                  <th scope="col">Registration Date</th>
                  <th scope="col">Course </th>
                  <th scope="col">Counselor</th>
                  <th scope="col">Batch Mode</th>
                </tr>
              </thead>
              <tbody>
                {Registerdata &&
                  Registerdata.map((data, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.Name}</td>
                        <td>{data.Number}</td>
                        <td>{data.RegistrationDate}</td>
                        <td>{data.Course}</td>
                        <td>{data.Counselor}</td>
                        <td>{data.BatchMode}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default RegisteredStudent;
