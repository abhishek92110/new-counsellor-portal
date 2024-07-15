import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { NavLink, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { StudentContext } from '../context/StudentState';
import FeesData from "../Students/FeesData";
import Swal from 'sweetalert2'

    function ViewFee() {
    
    let ContextValue = useContext(StudentContext);
    const [chartData, setChartData] = useState({ labels: [], series: [] });
    const [feesData, setFeesData] = useState()
    const [currentFeesData, setCurrentFeesData] = useState()
    const [allFeesData, setAllFeesData] = useState()
    const [Student, setStudent] = useState()
    const [runningBatch, setRunningBatch] = useState()
    const [counselor, setCounselor]  = useState()
    const [month, setMonth] = useState()
    const [totalFees, setTotalFees] = useState()
    const [timeValue,setTimeValue] = useState()    
    const [counselorStatus,setCounselorStatus] = useState()    
    const [batchStatus,setBatchStatus] = useState()    
    const [rangeDate, setRangeDate]=  useState({
        startDate:"",
        endDate:""
      })
    


    const navigate = useNavigate();

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const [detail, setDetail] = useState({

        month: null,
        batch: null,
        counselor: null,
        counselorName:null
      })
    useEffect(() => {
        getBatch();
        getCounselor();
    }, []);

    // const moveToEditTrainer = (trainer)=>{
    //     navigate('/EditTrainer', { state: { trainer } });
    
    //   }

    const getMonthFees = (currentmonth) => {
        console.log('filter fees month =', currentmonth,feesData)
        setMonth(currentmonth)

        let data = feesData.filter(feesData => {
            let collectionMonth = feesData.CollectionDate.split('-')[1]
            console.log("filter month =",collectionMonth,currentmonth)
            return collectionMonth == currentmonth
        })

        console.log("fee month =",data)

        setCurrentFeesData(data)

      setStudent(data)
        let monthData = {}
        monthData[month] = 0;
        console.log('month data= ', monthData)

        data.forEach((record) => {
            monthData[month] += parseInt(record.amount, 10);
        });

        const labels = Object.keys(monthData);
        const fees = labels.map((monthYear) => monthData[monthYear]);
        console.log("fees and labels =", labels, fees)

        setChartData({
            labels: labels,
            series: [{ data: fees }],
        });
    }

    let options = {
        chart: {
            type: "bar",
            height: 350,
        },
        xaxis: {
              tegories: chartData.labels,
            title: {
                text: "Month",
            },
        },
        yaxis: {
            title: {
                text: "Total Fees",
            },
        },
    };

    const showStudent = ()=>{
        navigate('Student-Data', { state: { student:Student } });
    }

    const getBatch = async () => {
        const batchData = await ContextValue.getRunningBatch();
        setRunningBatch(batchData.runningBatches)
        console.log('batch all =',batchData.runningBatches)

    
      }

      const SearchDemo = async()=>{

        console.log('start and date from state =',rangeDate)   
        ContextValue.updateProgress(30)
        ContextValue.updateBarStatus(true)   
      
        try{
        let selectFees = await fetch("http://localhost:8000/getRangeFees",{
          method:"GET",
          headers:{
            "startDate":rangeDate.startDate,
            "endDate":rangeDate.endDate
          }
        })
        ContextValue.updateProgress(60)
      
        selectFees = await selectFees.json()
        console.log('selected fees =',selectFees)
        setAllFeesData(selectFees.studentFees)
        // setCurrentFeesData(selectFees.studentFees)
        // setTotalFees(selectFees.formattedFees)
        filterStudent(selectFees.studentFees)
        ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
        // setFilterRegisterStudent(selectRegister)
      }
      catch(error){
        Swal.fire({   
          icon:  'error',
          title: 'Oops...',
          text:  'Something went Wrong Try Again',
        }) 
        ContextValue.updateProgress(100)
          ContextValue.updateBarStatus(false)
      }
       }

      const getCounselor = async()=>{
        const counsellor = await ContextValue.getAllCounselor()
        setCounselor(counsellor.counselorData)
        console.log('counselor all =',counsellor.counselorData)
      }

      const filterStudent = (allFeesData) => {
        console.log('all student =', feesData,detail)
        let filterStudent = allFeesData.filter((data, index) => {
    
          return (detail.batch!= null ? data.Batch === detail.batch : data.Batch) && (detail.counselor != null ? data.CounselorId === detail.counselor : data.CounselorId)
    
        })
        console.log('filter student =',filterStudent)
        let totalAmount = 0;
        filterStudent.map(data=>{
            totalAmount = totalAmount + parseInt(data.amount)
        })
        console.log('total fees =',totalAmount)
        const formattedFees = formatRupees(totalAmount);

        setTotalFees(formattedFees)
        setCurrentFeesData(filterStudent)
        setBatchStatus(detail.batch)
        setCounselorStatus(detail.counselorName)
      }
      let counselorData ={}

      const setCounselorData = (e)=>{
        console.log('select index =',e.target.selectedIndex,counselorData[e.target.selectedIndex])
        setDetail({...detail,["counselor"]:counselorData[e.target.selectedIndex],["counselorName"]:e.target.value})
      }

      const filterfees = (data)=>{

        let monthData = {}
        monthData[month] = 0;

        data.forEach((record) => {
            monthData[month] += parseInt(record.amount, 10);
        });

        const labels = Object.keys(monthData);
        const fees = labels.map((monthYear) => monthData[monthYear]);
        console.log("fees and labels =", labels, fees)

        setChartData({
            labels: labels,
            series: [{ data: fees }],
        });
    }

     options = {
        chart: {
            type: "bar",
            height: 350,
        },
        xaxis: {
            categories: chartData.labels,
            title: {
                text: "Month",
            },
        },
        yaxis: {
            title: {
                text: "Total Fees",
            },
        },
      }

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      
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
      
   const setFromTime =(fromTime)=>{
    const startDateStr =  formatDate(new Date(fromTime))
    setRangeDate({...rangeDate, ["startDate"]:startDateStr})
    console.log("from time ",startDateStr)
    
   }
   const setToTime =(toTime)=>{
    const endDateStr = formatDate(new Date(toTime))
    setRangeDate({...rangeDate, ["endDate"]:endDateStr})
    console.log("to time ",endDateStr)
   }

   function formatRupees(amount) {
    // Function to convert a number to the Indian numbering system (with commas)
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

      
      

    return (
        <>
            <Header />
            <div className='sidebar-main-container'>
                {/* <Sidebar /> */}
                <div className="container-fluid right-side-container">
                    <h2 className="text-left">Fees</h2>

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


                    <div className='d-none d-lg-flex'>
            <div className='message-form'>
          
              <div className="batch-thumb thumb">
                <label className="form-label"> Batch :</label>
                {runningBatch && <select className="custom-select mr-sm-2" required name='batch' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })} >
                  <option selected>Choose Batch...</option>
                  {runningBatch.map(data => {
                    return (
                      <option value={data.Batch}>{data.Batch}</option>
                    )
                  })}
                </select>
                }
              </div>
              <div className="preference-thumb thumb">
                <label className="form-label">Counselor :</label>
                {counselor && <select className="custom-select mr-sm-2" required name='course' onChange={(e) => setCounselorData(e)}>
                  <option selected>Choose Counselor...</option>
                  {counselor.map((data,index) => {
                    counselorData[index+1] = data._id
                    return (
                      <option value={data.Name}>{data.Name}</option>
                    )
                  })}
                </select>
                }
              </div>
              <button className='filter-btn' onClick={e=>filterStudent(allFeesData)}>Filter</button>
            </div>
          </div>

         { <div className="fees-detail-section container">
            <div className="d-flex"><h3>Total Fees:</h3> <h4>{totalFees}&#8377; </h4></div>
            <div className="d-flex">{batchStatus && <><h3>Batch:</h3> <h4>{batchStatus} </h4></>}</div>
            <div className="d-flex">{counselorStatus && <><h3>Counselor:</h3> <h4>{counselorStatus} </h4></>}</div>
          </div>}

                    {currentFeesData && <FeesData student={currentFeesData}/>}
                </div>
            </div>
        </>
    );
}

export default ViewFee;
