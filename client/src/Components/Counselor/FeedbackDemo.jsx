import React, { useEffect, useState, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, NavLink, useParams,useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { StudentContext } from '../../context/StudentState'
import Cslidebar from './Cslidebar';

function FeedbackDemo() {

    const location = useLocation();
    const {counselor} = location.state
    console.log("counselor = ",counselor)
    const [demoList, setDemoList] = useState()
    const [demoStudentData, setDemoStudentData] = useState()
    let ContextValue = useContext(StudentContext);
    const [filterDemoStudent, setFilterDemoStudent] = useState()
    const [filterDemoList, setFilterDemoList] = useState()
    const [trainer, setTrainer] = useState()

    const [timeValue,setTimeValue] = useState()
    const [rangeDate, setRangeDate]=  useState({
    startDate:"",
    endDate:""
  })

  useEffect(()=>{
    getAllTrainer()
  },[])

    const navigation = useNavigate()

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const date = new Date();

    const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
    console.log("day",day)
    const month = date.getMonth();
    const year = date.getFullYear() 

    const [detail, setDetail] = useState({

        month: null,
        trainer: null,
        trainerName:null,
        counselor: null,
        counselorName: null
      })

      const getAllTrainer = async () => {
        let allTrainer = await ContextValue.getAllTrainer() 
     
         setTrainer(allTrainer)
       }
 
    const SearchDemo = async()=>{


        console.log('start and date from state =',rangeDate)
      
        let selectDemo = await fetch(`http://localhost:8000/getCounselorRangeDemoes`,{
          method:"GET",
          headers:{
            "startDate":rangeDate.startDate,
            "endDate":rangeDate.endDate,
            "id":counselor.counselorNo
          }
        })
      
        selectDemo = await selectDemo.json()
        console.log('select demo =',selectDemo)
        setDemoStudentData(selectDemo.totalDemoStudent)
        setDemoList(selectDemo.Demo)
       setFilterDemoList(selectDemo.Demo)
       setFilterDemoStudent(selectDemo.totalDemoStudent)
      
       }

       let trainerData =[]
 
       const setTrainerData = (e)=>{
         setDetail({...detail,["trainer"]:trainer[(e.target.selectedIndex)-1].code,["trainerName"]:e.target.value})
       }

       const setStartEndate = (timeValue) => {
        let today = new Date();
        let startDate, endDate;
      
        if (timeValue === "Today") {
          startDate = today;
          endDate = today;
        } else if (timeValue === "Yesterday") {
          today.setDate(today.getDate() - 1); // Subtract 1 day to get yesterday
          startDate = today;
          endDate = today;
        } else if (timeValue === "Last Week") {
          endDate = new Date(); // Current date
          startDate = new Date();
          startDate.setDate(endDate.getDate() - 7); // Subtract 7 days to get a week ago
        } else {
          // Handle the case when time is not recognized
          console.error("Invalid time option");
          return;
        }
      
        const startDateStr = formatDate(startDate);
        const endDateStr = formatDate(endDate);
        setRangeDate({...rangeDate, ["startDate"]:startDateStr, ["endDate"]:endDateStr})
        console.log("start date and end date =",startDateStr, endDateStr)
      
        return { startDate: startDateStr, endDate: endDateStr };
      };

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const filterStudent = () => {
        

        let tempStudentData =[]
    
        console.log('demo student data =',filterDemoList)
    
        let filterDemo = filterDemoList.filter((data, index) => {
          if((detail.trainer!= null ? data.TrainerId == detail.trainer : true) && (detail.counselor != null ? data.CounselorId == detail.counselor : true)){
            tempStudentData.push(filterDemoStudent[index])
            console.log('index',index)
          }
      console.log('counselor id= ',data.CounselorId,detail.counselor, detail.trainer)
          return (detail.trainer!= null ? data.TrainerId == detail.trainer : true) && (detail.counselor != null ? data.CounselorId == detail.counselor : true)
      
        })
        console.log('filter demo student =',filterDemo,tempStudentData)
        setDemoList(filterDemo)
        setDemoStudentData(tempStudentData)
        
      }
    
      
  const setDemoFeedback = async(demoId,status)=>{

    console.log("status =",demoId,status)

    let feedback = await fetch("http://localhost:8000/addDemoStatus",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({demoId,status})
    })

         feedback = await feedback.json()
         console.log("feedback =",feedback)

  }


    return (
        <>
    
    <Header/>
            <div className='sidebar-main-container'>
        <Cslidebar/>        
         
            <div className='right-side-container'>
            <div className="d-flex j-c-initial c-gap-40">
                  <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"
                        onChange={e =>{ setTimeValue(e.target.value);setStartEndate(e.target.value)}}
                    >
                        <option disabled selected>--select Time--</option>
                    
                                <option value="Today">Today</option>
                                <option value="Yesterday">Yesterday</option>
                                <option value="Last Week">Last Week</option>
                        
                        
                    </select>



        

          <button className='filter-btn' onClick={SearchDemo}>Search</button>

          <div className="preference-thumb thumb">
            <label className="form-label">Trainer :</label>
            {trainer && <select className="custom-select mr-sm-2" required name='trainer' onChange={(e) => setTrainerData(e)}>
              <option selected>Choose Trainer...</option>
              {trainer.map((data,index) => {
              
                return (
                  <option value={data.Name}>{data.Name}</option>
                )
              })}
            </select>
            }
          </div>
          <button className='filter-btn' onClick={filterStudent}>Filter</button>
          </div>
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
                                    <th scope="col">Add Status</th>
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
                                            <td> <NavLink to={`Add-Feedback`}> <button className="btn btn-success" onClick={e=>{localStorage.setItem('demoData',JSON.stringify(demoStudentData[index]))}}  ><RemoveRedEyeIcon /></button></NavLink></td>
                                            <td>  
                              <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"                        
                        onChange={e=>setDemoFeedback(data._id,e.target.value)}                        
                    >
                        <option disabled selected >--Add Feedback--</option>
                    
                                <option  value="Done" selected={data.status==="process"?true:false}>Done</option>
                                <option  value="Cancel" selected={data.status==="Interested"?true:false}>Cancel</option>
                                                     
                        
                    </select></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}



function AllTrainerDemo() {

    const location = useLocation();
    const { demo, demoStudent } = location.state;
    const [demoList, setDemoList] = useState(demo)
    const [demoStudentData, setDemoStudentData] = useState(demoStudent)
    let ContextValue = useContext(StudentContext);
    const [filterDemoStudent, setFilterDemoStudent] = useState(demoStudent)
  const [filterDemoList, setFilterDemoList] = useState(demo)

    const [timeValue,setTimeValue] = useState()
  const [rangeDate, setRangeDate]=  useState({
    startDate:"",
    endDate:""
  })

    const navigation = useNavigate()

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const date = new Date();

    const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
    console.log("day",day)
    const month = date.getMonth();
    const year = date.getFullYear();
 
    const SearchDemo = async()=>{


        console.log('start and date from state =',rangeDate)
        ContextValue.updateProgress(30)
        ContextValue.updateBarStatus(true)

        let selectDemo = await fetch("http://localhost:8000/getRangeDemoes",{
          method:"GET",
          headers:{
            "startDate":rangeDate.startDate,
            "endDate":rangeDate.endDate
          }
        })
        
        ContextValue.updateProgress(60)        
        selectDemo = await selectDemo.json()
        ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
        console.log('select demo =',selectDemo)
        setDemoStudentData(selectDemo.totalDemoStudent)
        setDemoList(selectDemo.Demo)
       setFilterDemoList(selectDemo.Demo)
       setFilterDemoStudent(selectDemo.totalDemoStudent)
      
       }

       const setStartEndate = (timeValue) => {
        let today = new Date();
        let startDate, endDate;
      
        if (timeValue === "Today") {
          startDate = today;
          endDate = today;
        } else if (timeValue === "Yesterday") {
          today.setDate(today.getDate() - 1); // Subtract 1 day to get yesterday
          startDate = today;
          endDate = today;
        } else if (timeValue === "Last Week") {
          endDate = new Date(); // Current date
          startDate = new Date();
          startDate.setDate(endDate.getDate() - 7); // Subtract 7 days to get a week ago
        } else {
          // Handle the case when time is not recognized
          console.error("Invalid time option");
          return;
        }
      
        const startDateStr = formatDate(startDate);
        const endDateStr = formatDate(endDate);
        setRangeDate({...rangeDate, ["startDate"]:startDateStr, ["endDate"]:endDateStr})
        console.log("start date and end date =",startDateStr, endDateStr)
      
        return { startDate: startDateStr, endDate: endDateStr };
      };

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };


    return (
        <>
       
            <div className='sidebar-main-container'>

          
         
            <div className='main-container one-col'>
            <div className="d-flex j-c-initial c-gap-40">
                  <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="custom-select mr-sm-2"
                        onChange={e =>{ setTimeValue(e.target.value);setStartEndate(e.target.value)}}
                    >
                        <option disabled selected>--select Time--</option>
                    
                                <option value="Today">Today</option>
                                <option value="Yesterday">Yesterday</option>
                                <option value="Last Week">Last Week</option>
                        
                        
                    </select>

        

          <button className='filter-btn' onClick={SearchDemo}>Search</button>
          </div>
                <div className="card-body w-80">
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
                                            <td> <NavLink to={`teacherdemo`}> <button className="btn btn-success" onClick={e=>{localStorage.setItem('demoData',JSON.stringify(demoStudentData[index]))}}  ><RemoveRedEyeIcon /></button></NavLink></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default FeedbackDemo