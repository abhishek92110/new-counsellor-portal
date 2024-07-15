import React, { useState, useEffect,useContext } from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';
import { StudentContext } from '../../context/StudentState';
import { useParams,useLocation, useNavigate } from 'react-router-dom';
import Cslidebar from './Cslidebar';
import Swal from 'sweetalert2'


    function AddNewDemo() {
    let ContextValue = useContext(StudentContext);
    const navigate = useNavigate()
    const [trainer, setTrainer] = useState()
    const [allCourse, setAllCourse] = useState()
    const location = useLocation();
    const { counselor } = location.state;
    console.log("counselor =",counselor,counselor._id,counselor.Name)
    
    const [inpval, setINP] = useState({
        Name: '',
        Email: '',
        Background: '',
        Trainer: '',
        TrainerId: '',
        CounselorId: counselor.counselorNo,
        CounselorName: counselor.Name,
        Course: '',
        Date: '',
        Time: '',
        classLink:'',
        status:'Process'
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

        console.log("index =",(e.target.selectedIndex)-1,trainer[(e.target.selectedIndex)-1].code)

       setINP({...inpval,['Trainer']:e.target.value,['TrainerId']:trainer[(e.target.selectedIndex)-1].code})
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
        console.log("demo =",inpval);
        e.preventDefault();
   let { Name, Email, Background, Trainer, Date, Time, Course, classLink,TrainerId,CounselorId, CounselorName } = { ...inpval };

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
            
            ContextValue.updateProgress(30)
            ContextValue.updateBarStatus(true)

            try{
        const res = await fetch('http://localhost:8000/demo', {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({Email,Name,Background,Trainer,TrainerId,CounselorId,CounselorName,Date,Time,Course,month,year,day, classLink})
        });
        ContextValue.updateProgress(60)

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            ContextValue.updateProgress(100)
            ContextValue.updateBarStatus(false)
            Swal.fire({   
              icon:  'error',
              title: 'Oops...',
              text:  'Something went wrong!',
            }) 
            
        } else { 
            ContextValue.updateProgress(100)
            ContextValue.updateBarStatus(false)
            DemoAdded()  
             
            console.log('data added');
        }
    }
    catch(error){
        ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
        Swal.fire({   
          icon:  'error',
          title: 'Oops...',
          text:  'Something went wrong!',
        }) 
    }

    }


    const DemoAdded=()=>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Demo Added',
          showConfirmButton: false,
          timer: 1500
        })

        
        navigate('/counsellor')
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
                                    <div>
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
                                                            onChange={e=>setTrainerDetail(e)}>
                                                            <option value="Trainer">Choose Trainer..</option>
                                                        {trainer.map(data=>{
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
                                                        <label className="form-label">Demo Date</label>
                                                        <input type="Date"
                                                            className="form-control"
                                                            value={inpval.Date}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Date"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Demo Time</label>
                                                        <input type="Time"
                                                            className="form-control"
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
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                                                            <option selected disabled>Choose Course</option>
                                                          { 
                                                          allCourse.map(data=>{
                                                            console.log('data course =',data)
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
                                                    <button type="submit" onClick={addinpdata} className="btn btn-primary">
                                                        Submit
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

export default AddNewDemo