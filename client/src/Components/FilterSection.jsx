import React, {useState} from 'react'


const FilterSection = () => {

    const [timeValue,setTimeValue] = useState()
    const [rangeDate, setRangeDate]=  useState({
        startDate:"",
        endDate:""
      })

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

  return (
    <div>
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

          <button className='filter-btn'>Search</button>
          </div> 
    </div>
  )
}

export default FilterSection