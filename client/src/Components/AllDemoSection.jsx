import React, { useEffect, useState, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, NavLink, useParams,useNavigate, useLocation } from 'react-router-dom';
import { StudentContext } from '../context/StudentState'
import DemoTable from './DemoTable';
import Swal from 'sweetalert2'

function AllDemoSection() {

    let {id} = useParams()

    const location = useLocation();
    const { demo, demoStudent,user } = location.state;
    console.log('user id =',user, id)
    const [demoList, setDemoList] = useState(demo)
    const [demoStudentData, setDemoStudentData] = useState(demoStudent)
    const [filterdemoList, setFilterDemoList] = useState(demo)
    let ContextValue = useContext(StudentContext);
    const [filterDemoStudent, setFilterDemoStudent] = useState(demoStudent)


    const [timeValue,setTimeValue] = useState()
  const [rangeDate, setRangeDate]=  useState({
    startDate:"",
    endDate:""
  })

    const navigation = useNavigate()

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const date = new Date();

    const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
   
    const month = date.getMonth();
    const year = date.getFullYear() 
 
    const SearchDemo = async()=>{

      ContextValue.updateProgress(30)
      ContextValue.updateBarStatus(true)

        let selectDemo;
        if(user==="counselor")  
        {  
          try{  
        selectDemo = await fetch(`http://localhost:8000/getRangeCounselorDemoes/${id}`,{
          method:"GET",
          headers:{
            "startDate":rangeDate.startDate,
            "endDate":rangeDate.endDate
          }
        })
        ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
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
    else{
      try{
        selectDemo = await fetch(`http://localhost:8000/getRangeTrainerDemoes/${id}`,{
            method:"GET",
            headers:{
              "startDate":rangeDate.startDate,
              "endDate":rangeDate.endDate
            }
          })
          ContextValue.updateProgress(100)
          ContextValue.updateBarStatus(false)
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
      
        selectDemo = await selectDemo.json()
     
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
      
          return;
        }
      
        const startDateStr = formatDate(startDate);
        const endDateStr = formatDate(endDate);
        setRangeDate({...rangeDate, ["startDate"]:startDateStr, ["endDate"]:endDateStr})
        
      
        return { startDate: startDateStr, endDate: endDateStr };
      };

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const setFromTime =(fromTime)=>{
        const startDateStr =  formatDate(new Date(fromTime))
        setRangeDate({...rangeDate, ["startDate"]:startDateStr})
        
        
       }
       const setToTime =(toTime)=>{
        const endDateStr = formatDate(new Date(toTime))
        setRangeDate({...rangeDate, ["endDate"]:endDateStr})
       
       }


    return (
        <>
       
            <div className='sidebar-main-container'>          
         
            <div className='main-container right-side-container one-col'>
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
                                <option value="Select Range">Select Range</option>
                        
                        
                    </select>

                    {timeValue==="Select Range" && 
                     <>
                     <label>From</label>
                      <input type="date" class="custom-select mr-sm-2" onChange={e=>setFromTime(e.target.value)}></input>
                      <label>To</label>
                      <input type="date" class="custom-select mr-sm-2" onChange={e=>setToTime(e.target.value)}></input>
                      </>}

        

          <button className='filter-btn' onClick={SearchDemo}>Search</button>
          </div>
                <div className="w-80">
                   {filterdemoList && <DemoTable demoList={filterdemoList} demoStudentData={filterDemoStudent}/>}
                </div>
            </div>
            </div>
        </>
    )
}

export default AllDemoSection