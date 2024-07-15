import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { NavLink, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { StudentContext } from '../context/StudentState';

function ViewFee2() {

    
    let ContextValue = useContext(StudentContext);
    const [chartData, setChartData] = useState({ labels: [], series: [] });
    const [feesData, setFeesData] = useState()
    const [currentFeesData, setCurrentFeesData] = useState()
    const [Student, setStudent] = useState()
    const [runningBatch, setRunningBatch] = useState()
    const [counselor, setCounselor]  = useState()
    const [month, setMonth] = useState()


    const navigate = useNavigate();

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const [detail, setDetail] = useState({

        month: null,
        batch: null,
        counselor: null
      })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/getTotalFeeschart");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setFeesData(data)
                setCurrentFeesData(data)
                console.log("response", data);

                if (Array.isArray(data)) {
                    const monthData = {};

                    data.forEach((record) => {
                        const batchStartDate = new Date(record.CollectionDate);
                        const monthYear = `${batchStartDate.getFullYear()}-${(
                            batchStartDate.getMonth() + 1
                        )
                            .toString()
                            .padStart(2, "0")}`;

                        if (!monthData[monthYear]) {
                            monthData[monthYear] = 0;
                        }

                        monthData[monthYear] += parseInt(record.amount, 10);
                    });

                    const labels = Object.keys(monthData);
                    const fees = labels.map((monthYear) => monthData[monthYear]);
                    console.log("fees and labels =", labels, fees)

                    setChartData({
                        labels: labels,
                        series: [{ data: fees }],
                    });
                } else {
                    console.error("Data is not in the expected format.");
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
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
    };

    const showStudent = ()=>{
        navigate('Student-Data', { state: { student:Student } });
    }

    const getBatch = async () => {
        const batchData = await ContextValue.getRunningBatch();
        setRunningBatch(batchData.runningBatches)
        console.log('batch all =',batchData.runningBatches)

    
      }

      const getCounselor = async()=>{
        const counsellor = await ContextValue.getAllCounselor()
        setCounselor(counsellor.counselorData)
        console.log('counselor all =',counsellor.counselorData)
      }

      const filterStudent = () => {
        console.log('all student =', feesData,detail)
        let filterStudent = currentFeesData.filter((data, index) => {
    
          return (detail.batch!= null ? data.Batch === detail.batch : data.Batch) && (detail.counselor != null ? data.CounselorId === detail.counselor : data.CounselorId)
    
        })
        console.log('filter student =',filterStudent)
        
        setStudent(filterStudent)

        filterfees(filterStudent)
      }
      let counselorData ={}

      const setCounselorData = (e)=>{
        console.log('select index =',e.target.selectedIndex,counselorData[e.target.selectedIndex])
        setDetail({...detail,["counselor"]:counselorData[e.target.selectedIndex]})
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

      
      

    return (
        <>
            <Header />
            <div className='sidebar-main-container'>
                <Sidebar />
                <div className="container-fluid mt-3 mb-3">
                    <h2 className="text-left">Fee Chart</h2>



                    <select
                        id="exampleInputPassword1"
                        type="select"
                        name="Course"
                        class="form-control"
                        onChange={e => getMonthFees(e.target.value)}
                    >
                        <option disabled selected>--select Month--</option>
                        {monthName.map((data, index) => {
                            let monthNumber = index + 1 < 10 ? `0${index + 1}` : index + 1
                            return (
                                <option value={monthNumber}>{data}</option>
                            )
                        })
                        }
                    </select>

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
              <button className='filter-btn' onClick={filterStudent}>Filter</button>
            </div>
          </div>

                    {chartData.labels.length > 0 ? (
                        <Chart options={options} series={chartData.series} type="bar" height={350} onClick={showStudent}/>
                    ) : (
                        <p>No data to display.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ViewFee2;
