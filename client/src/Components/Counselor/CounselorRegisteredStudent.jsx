import React, { useEffect, useState, useContext } from "react";
import Cslidebar from "./Cslidebar";
import Header from "../Header";
import CreateIcon from '@mui/icons-material/Create';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { StudentContext } from '../../context/StudentState';

const CounselorRegisteredStudent = () => {
    const navigate = useNavigate();
  let ContextValue = useContext(StudentContext);
  const location = useLocation();
  const { counselor } = location.state;
  console.log('counselor =',counselor)
  const [Registerdata, setRegisterdata] = useState();
  const [currentRegisterdata, setCurrentRegisterdata] = useState();
  const [trainer, setTrainer] = useState()
  const [detail, setDetail] = useState({
    trainerId:null,
    counselorId:null
  })

  const getRegisteredStudent = async () => {
    const res = await fetch(`http://localhost:8000/getCounselorRegisterStudent/${counselor._id}`, {
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
      setRegisterdata(data);
      setCurrentRegisterdata(data);
    }
  };

  const getTrainerData = async()=>{
    let trainerData = await ContextValue.getAllTrainer()
    setTrainer(trainerData)

  }



  const filterRegisterStudent =()=>{

    console.log("detail = ",detail)
   let filterStudent = Registerdata.filter((data, index) => {

    console.log('condition =',data,(data.TrainerId === detail.trainerId))

    return (data.TrainerId === detail.trainerId) 
  
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
    console.log("trainerid= ",trainerData[e.target.selectedIndex],detail)
    setDetail({...detail, ["trainerId"]: trainerData[e.target.selectedIndex]});

  }

  const setCounselorDetail = (e)=>{
    setDetail({...detail, ["counselorId"]: counselorData[e.target.value]});
    console.log("counselorId= ",counselorData[e.target.value],e.target.value)
  }

  const moveToEditRegister =(data)=>{
    console.log('demo route',counselor)
    navigate('/counselor/EditRegisteredStudent', { state: { data } });
  }

  return (
    <>
     
      <Header />
      <div className='sidebar-main-container'>
      <Cslidebar />
      <div className="content-body w-80">
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
            <div className='message-form'>
              <div className="batch-thumb thumb">
                <label className="form-label">Trainer Name :</label>
               {trainer && <select className="custom-select mr-sm-2" required name='trainer' onChange={e=>setTrainerDetail(e)}>
                  <option selected disabled>Choose Trainer...</option>
                { trainer.map((data,index)=>{
                  trainerData[index] = data._id
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
        <div className="Registrated-detail">
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRegisterdata &&
                  currentRegisterdata.map((data, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.Name}</td>
                        <td>{data.Number}</td>
                        <td>{data.RegistrationDate}</td>
                        <td>{data.Course}</td>
                        <td>{data.Counselor}</td>
                        <td>{data.BatchMode}</td>
                        <button className="btn btn-primary text-light"> <div onClick={e=>{moveToEditRegister(data)}}> <CreateIcon /></div></button>

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

export default CounselorRegisteredStudent;
