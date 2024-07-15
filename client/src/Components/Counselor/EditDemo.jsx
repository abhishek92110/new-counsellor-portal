import React, { useState, useEffect,useContext } from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';
import { StudentContext } from '../../context/StudentState';
import { useParams,useLocation } from 'react-router-dom';
import Cslidebar from './Cslidebar';
import Swal from 'sweetalert2'

function EditDemo() {
    let ContextValue = useContext(StudentContext);
    const [trainer, setTrainer] = useState()
    const [allCourse, setAllCourse] = useState()
    const [updateStatus, setUpdateStatus]  = useState(false)
    const location = useLocation();
    const { data } = location.state;
    console.log("counselor from edit=",data)
    
    const [inpval, setINP] = useState({
        Trainer: data.Trainer,
        TrainerId: data.TrainerId,
        CounselorId: data.CounselorId,
        CounselorName: data.CounselorName,
        Course: data.Course,
        Date: data.Date,
        Time: data.Time,
        classLink:data.classLink
    })

    useEffect(async()=>{
       let Trainer = await ContextValue.getAllTrainer();
       setTrainer(Trainer)
       getAllCourse()
    },[])

    const getAllCourse = async()=>{

        let Course = await ContextValue.getAllBatchCourse();
        console.log('all course =',Course.batchCourse[0].Course)
        setAllCourse(Course.batchCourse[0].Course)

    }

    const TrainerData = {}
    const setTrainerDetail =(e)=>{

       setINP({...inpval,['Trainer']:e.target.value,['TrainerId']:TrainerData[e.target.value]})
    }

    const setdata = (e) => {
        console.log(e.target.value);
        const { Name, value } = e.target;
        setINP((preval) => {
          return {
            ...preval,
            [Name]: value,
          };
        });
      };
      let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
      const addinpdata = async (e) => {

        ContextValue.updateProgress(30)
        ContextValue.updateBarStatus(true)

        console.log("demo =",inpval);
        e.preventDefault();
   let { Trainer, Date, Time, Course, classLink,TrainerId,CounselorId, CounselorName } = { ...inpval };

   let dateSplit = Date.split('-')
   let day = dateSplit[2]
   let month = monthName[dateSplit[1]-1]
   let year = dateSplit[0]
   Date = day+'/'+month+'/'+year
  

       
            var timeSplit = Time.split(':'),
              hours,
              minutes,
              meridian;
            hours = timeSplit[0];
            minutes = timeSplit[1];
            if (hours > 12) {
              meridian = 'PM';
              hours -= 12;
            } else if (hours < 12) {
              meridian = 'AM';
              if (hours == 0) {
                hours = 12;
              }
            } else {
              meridian = 'PM';
            }
            Time = hours + ':' + minutes + meridian;     
            
            

            try{
        const res = await fetch(`http://localhost:8000/updatedemo/${data._id}`, {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({Trainer,TrainerId,CounselorId,CounselorName,Date,Time,Course,month,year,day, classLink})
        });

        const updateData = await res.json();
        console.log(updateData);
     

        if (res.status === 422 || !updateData) {
            Swal.fire({   
                icon:  'error',
                title: 'Oops...',
                text:  'Something Went Wrong',
              }) 
              ContextValue.updateProgress(100)
                ContextValue.updateBarStatus(false)
            alert('error');
        } else {   
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Demo Updated',
                showConfirmButton: false,
                timer: 1500
              })  
              ContextValue.updateProgress(100)
              ContextValue.updateBarStatus(false)  
            console.log('data added');
        }
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

    const setUpdate = (e)=>{
      setUpdateStatus(true)
      e.preventDefault()

      document.getElementsByClassName("date")[0].type="date"
      document.getElementsByClassName("time")[0].type="time"

      console.log("date - time  ", document.getElementsByClassName("date")[0], document.getElementsByClassName("time")[0])

    }

        return (
            <>
            <Header/>
            <div className='sidebar-main-container'>
                <Cslidebar/>
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row page-titles mx-0">
                            <div className="col-sm-6 p-md-0">
                                <div className="welcome-text">
                                    <h4>Schedule Demo</h4>
                                </div>
                            </div>
                            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <a href="javascript:void(0);">Students</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <a href="javascript:void(0);">Add Student</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12 col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">Basic Info</h5>
                                    </div>
                                    <div className="">
                                        <form action="#" method="post">
                                            <div className="row">
                                              
                                              
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Trainer</label>
                                                        {trainer && <select className="form-control"
                                                            id="exampleInputPassword1"
                                                            type="select"
                                                            name="Trainer"
                                                            class="form-control"
                                                            value={inpval.Trainer}
                                                            onChange={e=>setTrainerDetail(e)}>
                                                            <option>Choose Trainer..</option>
                                                        {trainer.map(data=>{
                                                            TrainerData[data.Name] = data._id
                                                            return(
                                                                <option value={data.Name}>{data.Name}</option>
                                                            )
                                                        })
                                                            
                                                           
                                                        }

                                                        </select>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label ">Demo Date</label>
                                                        <input type="text"
                                                            className="form-control date"
                                                            value={inpval.Date}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Date"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label ">Demo Time</label>
                                                        <input type="text"
                                                            className="form-control time"
                                                            value={inpval.Time}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Time"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Course</label>
                                                    { allCourse &&   <select className="form-control"
                                                            id="exampleInputPassword1"
                                                            type="select"
                                                            name="Course"
                                                            class="form-control"
                                                            value={inpval.Course}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                                                            <option selected disabled>Choose Course</option>
                                                          { 
                                                          allCourse.map(data=>{
                                                    
                                                            return (
                                                                <option value={data}>{data}</option>
                                                            )
                                                          })
                                                         
                                                          }
                                                        </select>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Class Link</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.classLink}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="classLink"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                { updateStatus===false?<button type="submit" onClick={e=>{setUpdate(e)}} className="btn btn-primary">
                                                        Edit
                                                    </button>: <button type="submit" onClick={addinpdata} className="btn btn-primary">
                                                        Update
                                                    </button>}
                                                    <button type="submit" className="btn btn-light">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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

export default EditDemo