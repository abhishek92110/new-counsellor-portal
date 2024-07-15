import React, { useState, useEffect,useContext } from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';
import { StudentContext } from '../../context/StudentState';
import { useParams,useLocation } from 'react-router-dom';
import Cslidebar from './Cslidebar';
import Swal from 'sweetalert2'

function AddDemoStudent() {
    let ContextValue = useContext(StudentContext);
    const [trainer, setTrainer] = useState()
    const [allCourse, setAllCourse] = useState()
    const location = useLocation();
    const { data } = location.state;
    console.log("data demo =",data)
    
    const [inpval, setINP] = useState({
        Name: '',
        Email: '',
        Background: '',
        Number:'',
        Trainer: data.Trainer,
        TrainerId: data.TrainerId,
        CounselorId: data.CounselorId,
        CounselorName: data.CounselorName,
        Course: data.Course,
        Date: data.Date,
        Time: data.Time,
        classLink:data.classLink,
        day:data.day,
        year:data.year,
        month:data.month,
        status:"process"
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
   let { Name, Email, Background, Trainer, Date, Time, Course, classLink,TrainerId,CounselorId,month,year,day, CounselorName, status } = { ...inpval };
  
   try{
        const res = await fetch(`http://localhost:8000/adddemoStudent/${data._id}`, {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(inpval)
        });

        ContextValue.updateProgress(60)
        const demoStudent = await res.json();
        console.log(demoStudent);

        if (res.status === 422 || !demoStudent) {
            Swal.fire({   
                icon:  'error',
                title: 'Oops...',
                text:  'Something Went Wrong',
              }) 
              ContextValue.updateProgress(100)
                ContextValue.updateBarStatus(false)
        } else {       
            console.log('data added');
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Demo Student Added',
                showConfirmButton: false,
                timer: 1500
              })
              
  ContextValue.updateProgress(100)
  ContextValue.updateBarStatus(false)
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
                                                        <label className="form-label">Name</label>
                                                        <input type="text"
                                                            className="form-control"
    
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Number</label>
                                                        <input type="text"
                                                            className="form-control"
    
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Background</label>
                                                        <input type="text"
                                                            className="form-control"
                                                        
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Background"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <input type="Email"
                                                            className="form-control"
                                                          
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Email"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Trainer</label>
                                                        <input type="Email"
                                                            className="form-control"
                                                          value={inpval.Trainer}
                                                          disabled
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Email"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Demo Date</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.Date}
                                                            disabled
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Date"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Demo Time</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.Time}
                                                            disabled
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Time"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Course</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.Course}
                                                            disabled
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Course"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Class Link</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.classLink}
                                                            disabled
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="classLink"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <button type="submit" onClick={addinpdata} className="btn btn-primary">
                                                        Add
                                                    </button>
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

export default AddDemoStudent