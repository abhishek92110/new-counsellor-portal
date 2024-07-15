import React, { useState } from 'react'
// import StudentContext from './StudentContext'
import { createContext } from "react";
import Swal from 'sweetalert2'

export const StudentContext = createContext();



const StudentState = (props) => {

  const [loggedInPerson, setLoggedInperson] = useState();
  const [demoStudent, setDemoStudent] = useState()
  const [allCounselor ,setAllCounselor] = useState()
  const [runningBatch,setRunningBatch] = useState()
  const [progress, setProgress]  = useState(0)
  const [barStatus, setBarStatus]  = useState(false)
  const [currentBatch, setCurrentBatch] = useState()
  const [studentId, setStudentId] = useState([])

  const [student, setStudent] = useState({
    Name: "",
    Number: "",
  })

  const [teacher, setTeacher] = useState({
    TrainerName: "",
    trainernumber: "",
  })
  const [Admin, setAdmin] = useState({
    TrainerName: "",
    trainernumber: "",
  })


  const updateLoggedInPerson = (personData) => {
    setLoggedInperson(personData)
  }

  const updateStudent = (name, number) => {
    setStudent({ ...student, Name: name, Number: number });
  }

  const updateBatch = (batch)=>{
    setCurrentBatch(batch)
  }

  const updateTeacher = (name, number) => {
    setTeacher({ ...teacher, TrainerName: name, trainernumber: number });
  }

  const updateAdmin = (name, number) => {
    setAdmin({ ...teacher, TrainerName: name, trainernumber: number });
  }

  const checkAdmin = async () => {
    let userStatus = await fetch("http://localhost:8000/fetchadmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('admin')
      }
    });

    userStatus = await userStatus.json()
    return userStatus
  }

  const checkTrainer = async () => {
    
        let userStatus = await fetch("http://localhost:8000/fetchtrainer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('trainer')
      }
    });

    userStatus = await userStatus.json()
    return userStatus
  }

  const checkStudent = async () => {
    let userStatus = await fetch("http://localhost:8000/fetchstudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('student')
      }
    });

    userStatus = await userStatus.json()
    return userStatus
  }

  const checkCounsellor = async () => {
    let userStatus = await fetch("http://localhost:8000/fetchcounselor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('counsellor')
      }
    });

    userStatus = await userStatus.json()
    return userStatus
  }
  const checkCounsellorById = async (id) => {
    let userStatus = await fetch(`http://localhost:8000/fetchcounselor/${id}`, {
      method: "GET",
    });

    userStatus = await userStatus.json()
    return userStatus
  }
  const getAllMainSubCourse = async (id) => {
    let AllCourse = await fetch(`http://localhost:8000/allSubMainCourse`, {
      method: "GET",
    });

    AllCourse = await AllCourse.json()
    return AllCourse
  }

  const getAllBatchCourse = async () => {
  
    try{
    let allbatchCourse = await fetch("http://localhost:8000/getAllBatches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    allbatchCourse = await allbatchCourse.json()
    return allbatchCourse
   
  }
  catch(error){

  }
  }
 
  const getAllMainCourse = async () => {
    let allMainCourse = await fetch("http://localhost:8000/getAllMainCourse",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    allMainCourse = await allMainCourse.json()
    return allMainCourse
  }

  const getAllDemoListCounselor  = async(id)=>{
    let counselorDemo = await fetch(`http://localhost:8000/getCounselorDemo/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "id":id,
      }
    });

    counselorDemo = await counselorDemo.json()
    return counselorDemo

  }

  const getTrainerRunningBatch = async (id) => {
    let runningBatch = await fetch(`http://localhost:8000/getrunningBatchByTrainer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "id":id
      }
    });

    runningBatch = await runningBatch.json()
    return runningBatch.trainerRunningBatches
  }
  const getRunningBatchStudent = async (batch) => {
    console.log("getRunningBatchStudent",batch)
    let runningBatch = await fetch(`http://localhost:8000/getRunningBatchStudent/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "batch":batch,
      }
    });

    runningBatch = await runningBatch.json()
    return runningBatch.studentRunningBatches
  }

  const updateStudentId = (attendanceId) =>{
    setStudentId(attendanceId)
  }

  const getRunningBatch = async () => {
    let runningBatch = await fetch(`http://localhost:8000/getrunningBatch/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    runningBatch = await runningBatch.json()
    setRunningBatch(runningBatch)
    return runningBatch
  }
  const getRunningBatchByBatchName = async (batch) => {
    let runningBatch = await fetch(`http://localhost:8000/getrunningBatch/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "batch":batch
      }
    });

    runningBatch = await runningBatch.json()
    setRunningBatch(runningBatch)
    return runningBatch
  }

  const getBatchDetail = async(batch)=>{
    let batchData = await fetch(`http://localhost:8000/getBatchData/`, {
      method: "GET",
      headers: {"batch":batch}
    });

    batchData = await batchData.json()

    return batchData.batchData
  }

  const getAllCounselor = async () => {
    let allCounselor = await fetch("http://localhost:8000/getAllCounselor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    allCounselor = await allCounselor.json()
    console.log('state counselor =',allCounselor)
    setAllCounselor(allCounselor)
    return allCounselor
  }
  const getAllTrainer = async () => {
    let allTrainer = await fetch("http://localhost:8000/trainer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    allTrainer = await allTrainer.json()
    return allTrainer
  }

  const getAllCounselorStudent = async(id)=>{
    let counselorStudent = await fetch(`http://localhost:8000/getStudentByCounselor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    counselorStudent = await counselorStudent.json()

  }

  const getSingleStudent = async (id) => {
    let Student = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    Student = await Student.json()
    console.log("single student =", Student)
    return Student
  }

  const getReceiveMessage = async (id) => {

    console.log('receive message from state=',id)
    const messageRes = await fetch(`http://localhost:8000/receivemessage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "id":id,

      },
    });

    const messageData = await messageRes.json();
    console.log("messageData", messageData.message)
     return messageData.message
     
  }
  const getStudentreceivemessage = async (id) => {
    console.log('student receive message')
    const messageRes = await fetch(`http://localhost:8000/Studentreceivemessage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "id":id,

      },
    });

    const messageData = await messageRes.json();
    console.log("messageData", messageData.message)
     return messageData.message
  }

  const getSingleTrainer = async (id) => {
    let Trainer = await fetch(`http://localhost:8000/trainer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    Trainer = await Trainer.json()
    return Trainer
  }

  const getAdminId = async()=>{
    let adminId = await fetch(`http://localhost:8000/getAdminId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    adminId = await adminId.json()
    return(adminId)
  }

  const getSingleCounselor = async (id) => {
    let Counselor = await fetch(`http://localhost:8000/counselor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    Counselor = await Counselor.json()
    return Counselor
  }

  const getAllStudent = async () => {
    let allStudent = await fetch('http://localhost:8000/studentpro')

    allStudent = await allStudent.json()
    return allStudent
  }

  const getAttendance = async (date, id, batch) => {

    let attendanceData = await fetch('http://localhost:8000/getStudentAttendance', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fullDate: date, trainerId:id, Batch:batch})
    })

    attendanceData = await attendanceData.json()
    return(attendanceData)

  }

  const getRegisterStudent = async()=>{
   
    try{
    let registerStudent = await fetch('http://localhost:8000/getregisterStudent',{
      method:'GET'
    })

    registerStudent = await registerStudent.json() 
    return registerStudent 

  }
  catch(error){
    Swal.fire({   
      icon:  'error',
      title: 'Oops...',
      text:  'Something went Wrong Try Again',
    }) 
  
  }   
  }


  // get month wise student


   const getRegisterStudentMonth = async(month)=>{
   
    try{
    let registerStudent = await fetch('http://localhost:8000/getregisterStudentMonth',{
      method:'GET',
      headers:{"month":month}
    })

    registerStudent = await registerStudent.json() 
    return registerStudent 

  }
  catch(error){
    Swal.fire({   
      icon:  'error',
      title: 'Oops...',
      text:  'Something went Wrong Try Again',
    }) 
  
  }   
  }

  

  const getPaymentStatus = async (allStudent) => {
    console.log('get status');
    let current = new Date();

    for (let index = 0; index < allStudent.length; index++) {
      
      let due = new Date(allStudent[index].DueDate);
      const lastCollectionDate = new Date(allStudent[index].lastCollectionDate);

      const currentDateDiff = Math.floor((due - current) / (1000 * 60 * 60 * 24));
      const currentDateMonth = current.getMonth();
      const currentDateYear = current.getFullYear();
      const currentDate = current.getDate();
      const dueDateMonth = due.getMonth();
      const dueDateYear = due.getFullYear();
      const dueDate = due.getDate()
      const lastCollectionDateMonth = lastCollectionDate.getMonth();

      console.log('current difference =',  currentDateDiff, index)

      if (currentDateDiff >= 0 && currentDateDiff <= 3) {

        console.log('Payment status check for dueDate:', allStudent[index].DueDate);

        if (lastCollectionDateMonth === dueDateMonth) {
          console.log("paid");
          let paymentStatus = await updatePaymentStatus("paid", allStudent[index]._id);
          console.log("Payment status =", paymentStatus);

        } else {
          console.log("Payment notification");
          let paymentStatus = await updatePaymentStatus("notification", allStudent[index]._id);
          console.log("Payment status =", paymentStatus);

        }
      } else if (currentDate > dueDate && currentDateMonth === dueDateMonth) {
        console.log("current date is greater")

        if (lastCollectionDateMonth === dueDateMonth) {
          
          console.log("paid");
          let paymentStatus = await updatePaymentStatus("paid", allStudent[index]._id);
          console.log("Payment status =", paymentStatus);

        } 

        else{

          console.log("pending");
          let paymentStatus = await updatePaymentStatus("pending", allStudent[index]._id);
          console.log("Payment status =", paymentStatus);

        }
      }
      
      else if(currentDateMonth > dueDateMonth){
        console.log("pending");
        let paymentStatus = await updatePaymentStatus("pending", allStudent[index]._id);
        console.log("Payment status =", paymentStatus);
      }
        else {
       
        console.log("paid");
        let paymentStatus = await updatePaymentStatus("paid", allStudent[index]._id);
        console.log("Payment status =", paymentStatus);
        
      }
    };
  };

  const updatelastCollectionDate = async (nextDueDate, id, status) => {
    console.log('update last date')
    let updatelastDate = await fetch(`http://localhost:8000/updatelastCollectionDate/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lastCollectionDate: nextDueDate, paymentStatus: status })
    });
  }

  const getStudentMonthFeeStatus = async(month, year)=>{
    let getstudentFeesStatus = await fetch("http://localhost:8000/getStudentMonthFeesStatus",{
      method:'GET',
      headers:{"month":month,"year":year}
    })

    getstudentFeesStatus = await getstudentFeesStatus.json()
    return getstudentFeesStatus
  }

  const updatePaymentStatus = async (status, id) => {
    console.log('update payment')
    let updatePayment = await fetch(`http://localhost:8000/updatePaymentStatus/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ paymentStatus: status })
    });

    updatePayment = await updatePayment.json()
    return updatePayment
  }

  const getBatchByTrainer = async (TrainerId) => {

    console.log('trainer id =', TrainerId)
    let trainerBatch = await fetch(`http://localhost:8000/getTrainerBatch/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "id":TrainerId
      },
    });

    trainerBatch = await trainerBatch.json()
    console.log("trainerBatch", trainerBatch)
    return trainerBatch;
  }

  const getFiles = async (batch, trainerID) => {
    let getFilesData = await fetch('http://localhost:8000/getfile', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "batch": batch,
        "TrainerID": trainerID
      },
    });
    getFilesData = await getFilesData.json()
    console.log("get files", getFilesData)
  }

  const totalStudent =async()=>{
    let total = await fetch('http://localhost:8000/getAllStudent',{
                method:'GET'
  })

  total = await total.json()
  return total.totalStudent
  }

  const newStudent = async(currentMonth)=>{
    let newTotal = await fetch(`http://localhost:8000/getNewStudent/${currentMonth}`,{
                method:'GET'
        })

        newTotal = await newTotal.json()
        return newTotal.newStudent
  }

  const totalNewTrainerStudent = async(trainerId)=>{
    let month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    let trainerStudent = await fetch(`http://localhost:8000/getNewTrainerStudent/`,{
      method:'GET',
      headers:{"month":month,"id":trainerId}
})

trainerStudent = await trainerStudent.json()
return trainerStudent.newStudent
  }

  const totalNewCounselorStudent = async(counselorId)=>{
    let month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    let trainerStudent = await fetch(`http://localhost:8000/getNewCounselorStudent/`,{
      method:'GET',
      headers:{"month":month,"id":counselorId}
})

trainerStudent = await trainerStudent.json()
return trainerStudent.newStudent
  }

  const getTotalFees = async()=>{
    let totalFees = await fetch(`http://localhost:8000/getTotalFees`,{
      method:'GET',
})

    totalFees = await totalFees.json()
    return totalFees
  }
  const getCounselorTotalFees = async(id)=>{
    let totalFees = await fetch(`http://localhost:8000/getCounselorTotalFees`,{
      method:'GET',
      headers:{"id":id}
})

    totalFees = await totalFees.json()
    return totalFees
  }
  const getCounselorNewTotalFees = async(id)=>
  {
    let month = new Date().getMonth()
    month = month + 1
    let totalFees = await fetch(`http://localhost:8000/getCounselorNewTotalFees`,{
    method:'GET',
    headers:{"month":month,"id":id}
})

    totalFees = await totalFees.json()
    return totalFees
  }

  const getOldStudent = async () => {
    let oldStudent = await fetch('http://localhost:8000/getoldStudent')

    oldStudent = await oldStudent.json()
    return oldStudent
  }

  const setDemoData = (data)=>{
    setDemoStudent(data)
  }

const getTrainerDemo = async(id)=>{
    let trainerDemo = await fetch(`http://localhost:8000/getDemoesByTrainer/${id}`)

    trainerDemo = await trainerDemo.json()
    return trainerDemo
}
const getCounselorDemo = async(id)=>{
    let counselorDemo = await fetch(`http://localhost:8000/getDemoesByCounselor/${id}`)

    counselorDemo = await counselorDemo.json()
    return counselorDemo
}
const getTrainerNewDemo = async(id,month)=>{
  console.log('state new demo =',month)
    let trainerDemo = await fetch(`http://localhost:8000/getNewDemoesByTrainer/${id}`,{
      method:'GET',
      headers:{"month":month}
    })

    trainerDemo = await trainerDemo.json()
    return trainerDemo
}
const getCounselorNewDemo = async(id,month)=>{
  console.log('state new demo =',month,id)
    let counselorDemo = await fetch(`http://localhost:8000/getNewDemoesByCounselor`,{
      method:'GET',
      headers:{"month":month,"id":id}
    })
    counselorDemo = await counselorDemo.json()
    return counselorDemo
}

const getAllDemo = async()=>{

    try{
  let AllDemo = await fetch(`http://localhost:8000/Getdemo`,{
    method:'GET',
  })

  AllDemo = await AllDemo.json()
  return AllDemo
  

}
catch(error){
  Swal.fire({   
    icon:  'error',
    title: 'Oops...',
    text:  'Something went Wrong Try Again',
  }) 

}
}
const getDemo = async()=>{
  let AllDemo = await fetch(`http://localhost:8000/GetAlldemo`,{
    method:'GET',
  })

  AllDemo = await AllDemo.json()
  return AllDemo
}
const getNewDemo = async(month)=>{
  console.log('state month =',month)
  let newDemo = await fetch(`http://localhost:8000/getNewDemo/${month}`,{
    method:'GET',
  })

  newDemo = await newDemo.json()
  console.log("new demo =",newDemo)
  return newDemo
}

const getCounselorRegisterStudent = async(id)=>{
  console.log('counselor register =',id)
  let registerCounselorStudent = await fetch(`http://localhost:8000/getCounselorRegisterStudent`,{
    method:'GET',
    headers:{"id":id}
  })

  registerCounselorStudent = await registerCounselorStudent.json()
  return registerCounselorStudent
}

const getCounselorNewRegisterStudent = async(id)=>{
  let month = new Date().getMonth()
  month = month+1<10?`0${month+1}`:month+1
  console.log('counselor register =',id)
  let registerCounselorStudent = await fetch(`http://localhost:8000/getCounselorNewRegisterStudent`,{
    method:'GET',
    headers:{"month":month,"id":id}
  })

  registerCounselorStudent = await registerCounselorStudent.json()
  return registerCounselorStudent
}

const getPendingStudentAssignment = async(id,batch)=>{
  console.log("state id=",id)
  let pendingAssignment = await fetch(`http://localhost:8000/getStudentPendingAssignment/${id}`,{
    method:'GET',
    headers:{"batch":batch}
  })
 
  pendingAssignment = await pendingAssignment.json()
 return(pendingAssignment)
}
const getSubmittedStudentAssignment = async(id,batch)=>{
  console.log("state id=",id,batch)
  let submittedAssignment = await fetch(`http://localhost:8000/getStudentSubmittedAssignment/${id}`,{
    method:'GET',
    headers:{"batch":batch}
  })

  submittedAssignment = await submittedAssignment.json()
  return (submittedAssignment)
}


const getTrainerAssignment = async(batch)=>{
  let trainerAssignment = await fetch("http://localhost:8000/getTrainerAssignment",{
    method:'GET',
    headers:{"batch":batch}
  })
 
  trainerAssignment = await trainerAssignment.json()
 return(trainerAssignment)
}

const getStudentNotesPdf = async(id,batch)=>{
  let TrainerNotesPdf = await fetch(`http://localhost:8000/getStudentNotesPdf/${id}`,{
    method:'GET',
    headers:{"batch":batch}
  })
 
  TrainerNotesPdf = await TrainerNotesPdf.json()
 return(TrainerNotesPdf)
}
const getStudentNotesLink = async(id,batch)=>{
  let TrainerNotesLink = await fetch(`http://localhost:8000/getStudentNotesLink/${id}`,{
    method:'GET',
    headers:{"batch":batch}
  })
 
  TrainerNotesLink = await TrainerNotesLink.json()
 return(TrainerNotesLink)
}
const getTrainerNotesPdf = async(batch)=>{
  let TrainerNotesPdf = await fetch("http://localhost:8000/getTrainerNotesPdf",{
    method:'GET',
    headers:{"batch":batch}
  })
 
  TrainerNotesPdf = await TrainerNotesPdf.json()
 return(TrainerNotesPdf)
}
const getTrainerNotesLink = async(batch)=>{
  let TrainerNotesLink = await fetch("http://localhost:8000/getTrainerNotesLink",{
    method:'GET',
    headers:{"batch":batch}
  })
 
  TrainerNotesLink = await TrainerNotesLink.json()
 return(TrainerNotesLink)
}

// const counselorUpcomimgDemo = async(id)=>{

  
//   let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


//   const date = new Date();

//   const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
//   console.log("day of demo overview",day)
//   const month = date.getMonth();
//   const year = date.getFullYear();


//   let res = await fetch(`http://localhost:8000/getUpcomingDemoesByCounselor`, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ CounselorId:id, month: monthName[month], day: day.toString(), year: year.toString() })
// });

//    res = await res.json()
//    return res

// }

const counselorUpcomimgDemo = async (id) => {
  const monthName = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentDay = (currentDate.getDate())<10?`0${currentDate.getDate()}`:currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const hours = currentHour % 12 || 12; // Get hours in 12-hour format
  const period = currentHour >= 12 ? "PM" : "AM"; // Determine AM/PM
  const minutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;

  const formattedTime = `${hours}:${minutes}${period}`;

  const res = await fetch("http://localhost:8000/getUpcomingDemoesByCounselor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      CounselorId: id,
      month: monthName[currentMonth],
      day: currentDay.toString(),
      year: currentYear.toString(),
      time: formattedTime // Add the current time to the request
    })
  });

  const demoData = await res.json();
  return demoData;
};


const trainerUpcomimgDemo = async(id)=>{

  
  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const date = new Date();

  const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
  console.log("day of demo overview",day)
  const month = date.getMonth();
  const year = date.getFullYear();


  let res = await fetch("http://localhost:8000/getTrainerUpcomingDemoes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ TrainerId:id, month: monthName[month], day: day.toString(), year: year.toString() })
});

   res = await res.json()
   return res

}
const UpcomimgDemo = async()=>{


  
  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const date = new Date();

  const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
  console.log("day of demo overview",day)
  const month = date.getMonth();
  const year = date.getFullYear();


  let res = await fetch("http://localhost:8000/getupcomingDemoes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ month: monthName[month], day: day.toString(), year: year.toString() })
});

   res = await res.json()
   return res
   

}
const UpcomimgTrainerDemo = async(id)=>{

  console.log("state upcoming =",id)
  
  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const date = new Date();

  const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
  console.log("day of demo overview",day)
  const month = date.getMonth();
  const year = date.getFullYear();


  let res = await fetch(`http://localhost:8000/getupcomingtrainerDemoes/${id}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ month: monthName[month], day: day.toString(), year: year.toString() })
});

   res = await res.json()
   return res

}

const updateProgress = (length)=>{

  setProgress(length)
  console.log('progress length =',length)
  
}
const updateBarStatus = (value)=>{
  setBarStatus(value)
}

const SuccessMsg=()=>{

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Candidate Has Been Registered',
    showConfirmButton: false,
    timer: 1500
  })
  
}

  return (
    <div>
      <StudentContext.Provider value={{ student: student, Admin: Admin, teacher: teacher, updateTeacher: updateTeacher, updateAdmin: updateAdmin, updateStudent: updateStudent, loggedInPerson: loggedInPerson, updateLoggedInPerson: updateLoggedInPerson, checkAdmin: checkAdmin, checkTrainer: checkTrainer, checkStudent: checkStudent, getAllBatchCourse: getAllBatchCourse, getRunningBatch: getRunningBatch, getAllCounselor: getAllCounselor, getAllTrainer: getAllTrainer, getSingleStudent: getSingleStudent, getSingleTrainer: getSingleTrainer, getAllStudent: getAllStudent, checkCounsellor: checkCounsellor, getPaymentStatus: getPaymentStatus, getSingleCounselor: getSingleCounselor, getBatchByTrainer: getBatchByTrainer, getFiles: getFiles, totalStudent:totalStudent,newStudent:newStudent,totalNewTrainerStudent:totalNewTrainerStudent,getTotalFees:getTotalFees,getOldStudent:getOldStudent,totalNewCounselorStudent:totalNewCounselorStudent,demoStudent:demoStudent,setDemoData:setDemoData, getTrainerDemo:getTrainerDemo,getTrainerNewDemo:getTrainerNewDemo,getTrainerRunningBatch:getTrainerRunningBatch,getCounselorRegisterStudent:getCounselorRegisterStudent,getCounselorDemo:getCounselorDemo,getCounselorNewDemo:getCounselorNewDemo,getRegisterStudent:getRegisterStudent,allCounselor:allCounselor,runningBatch:runningBatch,getAllDemo:getAllDemo,getNewDemo:getNewDemo,getReceiveMessage:getReceiveMessage,getAllCounselorStudent:getAllCounselorStudent,getPendingStudentAssignment:getPendingStudentAssignment,getSubmittedStudentAssignment:getSubmittedStudentAssignment,getTrainerAssignment:getTrainerAssignment,getTrainerNotesLink:getTrainerNotesLink,getTrainerNotesPdf:getTrainerNotesPdf,getStudentNotesLink:getStudentNotesLink,getStudentNotesPdf:getStudentNotesPdf,counselorUpcomimgDemo:counselorUpcomimgDemo,trainerUpcomimgDemo:trainerUpcomimgDemo,UpcomimgDemo:UpcomimgDemo,getAdminId:getAdminId,getStudentreceivemessage:getStudentreceivemessage,checkCounsellorById:checkCounsellorById,getDemo:getDemo,UpcomimgTrainerDemo:UpcomimgTrainerDemo,getAllDemoListCounselor:getAllDemoListCounselor,getRunningBatchStudent:getRunningBatchStudent,getAttendance:getAttendance,getAllMainCourse:getAllMainCourse,getCounselorNewRegisterStudent:getCounselorNewRegisterStudent,getCounselorTotalFees:getCounselorTotalFees,getCounselorNewTotalFees:getCounselorNewTotalFees,getAllMainSubCourse:getAllMainSubCourse, getBatchDetail:getBatchDetail,progress:progress,updateProgress:updateProgress,SuccessMsg:SuccessMsg,updateBarStatus:updateBarStatus,barStatus:barStatus,updateBatch:updateBatch,currentBatch:currentBatch,updateStudentId:updateStudentId,studentId:studentId,getRunningBatchByBatchName:getRunningBatchByBatchName,getRegisterStudentMonth:getRegisterStudentMonth}}>
        {props.children}
      </StudentContext.Provider>
    </div>
  )
}

export default StudentState;