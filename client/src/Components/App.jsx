import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AllStudents from '../Students/AllStudents'
import AddStudents from '../Students/AddStudents'
import EditStudents from '../Students/EditStudents'
import AboutStudent from '../Students/AboutStudent'
import StudentLogout from '../Students/StudentLogout'
import AssignmentStatus from '../Students/AssignmentStatus'
import StudentAttandanceDetails from '../Students/StudentAttandanceDetails'

import SendMessage from './SendMessage'
import CounselorDashboard from './Counselor/CounselorDashboard'
import CAllStudents from './Counselor/CAllStudents'
import CAddCounselor from './Counselor/CAddStudents'
import Demo from './Counselor/AddDemoStudent'
import CsendMessage from './Counselor/CsendMessage'
import SendMessages from './Counselor/SendMessages'
import Cslidebar from './Counselor/Cslidebar'
import { useContext } from 'react';
import { StudentContext } from '../context/StudentState';
import StudentState from '../context/StudentState'
import Assignment from '../Students/Assignment'
import './style.css'
import './responsive.css'
import LogIn from '../Students/LogIn'
import Forget from '../Students/Forget'
import Newpassword from '../Students/NewPassword'
import StudentSlidebar from '../Students/StudentSlidebar'
import StudentMessage from '../Students/StudentMessage'
import NewBatch from './Counselor/NewBatch'
import RunningBatches from './RunningBatches'
import RegisteredStudent from './RegisteredStudent'
import RegisterStudentAdd from './Counselor/CounsellorLeadAdd'
import EditRegisteredStudent from './Counselor/EditRegisteredStudent'
import StudentDashboard from '../Students/StudentDashboard'
import FeeTable from '../Fees/FeeTable'
import EditFee from '../Fees/EditFee'
import Addfee from '../Fees/Addfee'
import AllMessage from '../Students/AllMessage'
import ReadMessage from '../Students/ReadMessage'
import AllCounselor from './Counselor/AllCounselor'
import AboutCounselor from './Counselor/AboutCounselor'

import StudentAssig from '../Students/StudentAssig'
import FeeRecipt from '../Fees/FeeRecipt'
import FeeDetails from '../Fees/FeeDetails'
import EmbedGoogleMeet from '../Components/EmbedGoogleMeet'
import NewStudent from '../Students/NewStudent'

import OldStudent from './OldStudent'
import OldBatches from './OldBatches'
import AllDemo from './Counselor/AllDemo'
import Swal from 'sweetalert2'
import DemoStudent from './Counselor/DemoStudent'
import EditDemoStudent from './Counselor/EditDemoStudent'
import CounselorRegisteredStudent from './Counselor/CounselorRegisteredStudent'

import EditCounselor from './Counselor/EditCounselor'
import TotalRegistrationStudent from '../Students/TotalRegistrationStudent'
import AddRegisteredStudent from '../Students/AddRegisteredStudent'
import ViewFee from '../Fees/ViewFee'
import FeesData from '../Students/FeesData'
import RegisterChart from '../Students/RegisterChart'
import ShowDemo from './ShowDemo'
import UpcomingDemo from './Counselor/UpcomingDemo'
import AdminSendMessage from './AdminSendMessage'
import RegisterStudent from './RegisterStudent'
import DemoRegistration from './DemoRegistraton'
import AddNewDemo from './Counselor/AddNewDemo'
import EditDemo from './Counselor/EditDemo'
import AddDemoStudent from './Counselor/AddDemoStudent'
import AllCourse from './AllLead'
import EditRunningBatch from './EditRunningBatch'
import AllBatchTiming from './AllBatchTiming'

import CounselorAddStudent from './Counselor/CounselorAddStudent'

import FeedbackDemo from './Counselor/FeedbackDemo'

import StudentAssignment from '../Students/StudentAssignment'
import Loader from './Loader'
import AllDemoSection from './AllDemoSection'
import NewDemoSection from './NewDemoSection'
import { Filter } from '@mui/icons-material'
import FilterSection from './FilterSection'
import TotalRegistration from '../Students/TotalRegistration'
import LoadingBar from '../Students/BarLoading'
import BarLoading from '../Students/BarLoading'
import ForgetPassword from './ForgetPassword'
import AddCommerceData from './Counselor/AddCommerceData'
import RegistrationReceipt from '../Students/RegistrationReceipt'
import RegistartionHome from './RegistartionHome'
import CounsellorDemoAdd from './Counselor/CounsellorDemoAdd'
import CounsellorLeadAdd from './Counselor/CounsellorLeadAdd'
import AllLead from './AllLead'
import CounsellorDemo from './CounsellorDemo'
import CounsellorVisitAdd from './Counselor/CounsellorVisitAdd'
import CounselorVisit from './CounselorVisit'
import CounsellorFollowUpAdd from './Counselor/CounsellorFollowUpAdd'
import CounsellorFollowUp from './CounsellorFollowUp'

// import Navbaar from './components/Navbaar';
export default function App() {
  let ContextValue = useContext(StudentContext);
  return (
      <BrowserRouter>
        <StudentState>
          <Routes>

            <Route exact path='/loading' element={<BarLoading />} />
            <Route exact path='/filter' element={<FilterSection />} />
            <Route exact path='/googlemeet' element={<EmbedGoogleMeet />} />
            <Route exact path='/' element={<LogIn />} />
            {/* <Route exact path='/' element={<Home />} /> */}
            {/* <Route exact path='/' element={<RegistartionHome />} /> */}
            <Route exact path='/addCommerceData' element={<AddCommerceData />} />
            <Route exact path='/Forget-Password' element={<ForgetPassword />} />
            <Route exact path='admin/' element={<Home />} />
            <Route exact path='/counsellor/Add-Counsellor-Lead' element={<CounsellorLeadAdd/>} />
            <Route exact path='/counsellor/Add-Counsellor-Demo' element={<CounsellorDemoAdd/>} />
            <Route exact path='/counsellor/Add-Counsellor-Visit' element={<CounsellorVisitAdd/>} />
            <Route exact path='/counsellor/Add-Counsellor-FollowUp' element={<CounsellorFollowUpAdd/>} />
            <Route exact path='Registered-Student/Add-Registered-Student' element={<AddRegisteredStudent/>} />
            {/* <Route exact path='admin/AllCourse' element={<AllCourse />} /> */}
            <Route exact path='/counsellor/AllLead' element={<AllLead />} />
            <Route exact path='/counsellor/AllDemo' element={<CounsellorDemo />} />
            <Route exact path='/counsellor/AllVisit' element={<CounselorVisit />} />
            <Route exact path='/counsellor/AllFollowUp' element={<CounsellorFollowUp />} />
            <Route exact path='admin/AllBatchTiming' element={<AllBatchTiming />} />
            <Route exact path='/counsellor/Registered-Student' element={<RegisterStudent />} />
            {/* <Route exact path='admin/Registered-Student/Add-Registered-Student' element={<RegisterStudent />} /> */}
            <Route exact path='admin/Demo-Registration' element={<DemoRegistration />} />
            {/* <Route exact path='admin/Demo-Registration/teacherdemo' element={ <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>} /> */}
            <Route exact path='admin/upcomingDemo' element={<>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <UpcomingDemo />
      </div>
    </>} />
            <Route exact path='admin/upcomingDemo/DemoStudent'   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <DemoStudent />
      </div>
    </>
  }
 />
            <Route exact path='admin/upcomingDemo/DemoStudent/editDemoStudent'   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <EditDemoStudent />
      </div>
    </>
  }
 />
            <Route exact path='admin/ViewFee' element={<ViewFee />} />
            <Route exact path='admin/ViewFee/Student-Data' element={<FeesData />} />
            <Route exact path='admin/About/:id' element={<AboutStudent />} />
            <Route exact path='admin/Sendmessage' element={[ <AdminSendMessage />]} />
            {/* <Route exact path='admin/attendenceSheet' element={<AttandanceSheet />} /> */}
            <Route exact path='admin/Add-Registered-Student' element={<AddRegisteredStudent />} />
            <Route exact path="admin/AllStudents" element={<AllStudents />} />
            <Route exact path="admin/AddStudents" element={<AddStudents />} />
            <Route exact path="admin/All-Demo" element={<RegisterChart />} />
            {/* <Route exact path="admin/All-Demo/teacherdemo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  }
 /> */}
            <Route exact path="admin/New-Demo"  element={     
        <RegisterChart />
  }
 />
            {/* <Route exact path="admin/New-Demo/teacherdemo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  }
 /> */}
            <Route exact path="admin/Demo-Register/ShowDemo" element={<ShowDemo />} />
            <Route exact path="admin/Demo-Register/ShowRegister" element={<TotalRegistration/>} />
            <Route exact path="admin/RegisteredStudent" element={<RegisteredStudent />} />
            <Route exact path="EditStudents/:id" element={[ <EditStudents />]} />
            {/* <Route exact path="/EditTrainer" element={[ <EditTrainer />]} /> */}
            <Route exact path="/EditCounselor" element={[ <EditCounselor />]} />
            <Route exact path="student/" element={ <StudentDashboard />} />
            <Route exact path="student/Sendmessage" element={[ <StudentMessage />]} />
            <Route exact path="/student/StudentAssigment" element={[ <StudentAssig />]} />
            <Route exact path="admin/fullattendance" element={[ <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <StudentAttandanceDetails />
      </div>
    </>]} />
            <Route exact path="Aboutstudent/:id" element={[ <AboutStudent />]} />
            {/* <Route exact path="AboutTrainer/:id" element={[ <AboutTrainer />]} /> */}
            <Route exact path="AboutTrainer/:id/upcomingDemo" element={<>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <UpcomingDemo />
      </div>
    </>} />
            <Route exact path="AboutTrainer/:id/upcomingDemo/DemoStudent"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <DemoStudent />
      </div>
    </>
  }
 />
            <Route exact path='AboutTrainer/:id/allStudent' element={<AllStudents />} />
            <Route exact path='AboutTrainer/:id/newStudent' element={<NewStudent />} />
            {/* <Route exact path='AboutTrainer/:id/Trainer-Running-batch' element={<TrainerRunningBatch />} /> */}
            {/* <Route exact path='AboutTrainer/:id/Trainer-Course' element={<TrainerCourse />} /> */}
            <Route exact path='AboutTrainer/:id/All-Demo' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <AllDemoSection />
      </div>
    </>
  } />
            {/* <Route exact path='AboutTrainer/:id/All-Demo/demoStudent' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } /> */}
            <Route exact path='AboutTrainer/:id/New-Demo' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <NewDemoSection />
      </div>
    </>
  } />
            {/* <Route exact path='AboutTrainer/:id/New-Demo/demoStudent' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } /> */}
            <Route exact path="AboutCounselor" element={[ <AboutCounselor />]} />
            <Route exact path="AboutCounselor/upcomingDemo" element={[ <UpcomingDemo />]} />
            {/* <Route exact path="AboutCounselor/:id/upcomingDemo/DemoStudent" element={[<Header/>,[<Sidebar/>, <DemoStudent />]]} /> */}
            <Route exact path="AboutCounselor/upcomingDemo/DemoStudent"  element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <DemoStudent />
      </div>
    </>
  } />
            <Route exact path="AboutCounselor/All-Demo" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <AllDemoSection />
      </div>
    </>
  } />
            {/* <Route exact path="AboutCounselor/All-Demo/demoStudent" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } /> */}
            <Route exact path="AboutCounselor/New-Demo" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <NewDemoSection />
      </div>
    </>
  } />
            {/* <Route exact path="AboutCounselor/New-Demo/demoStudent" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } /> */}
            <Route exact path="AboutCounselor/allStudent" element={[ <AllStudents />]} />
            <Route exact path="AboutCounselor/newStudent" element={[ <NewStudent />]} />
            <Route exact path="/counsellor/Demo-Feedback" element={[ <FeedbackDemo />]} />
            {/* <Route exact path="/counsellor/Demo-Feedback/Add-Feedback" element={[ <AddFeedback />]} /> */}
            <Route exact path="/counsellor/allStudent" element={[ <AllStudents />]} />
            <Route exact path="/counsellor/AddStudents" element={[ <CounselorAddStudent />]} />
            <Route exact path="/counselor/newStudent" element={[ <NewStudent />]} />
            <Route exact path="/counsellor/registerStudent" element={ <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <TotalRegistrationStudent />
      </div>
    </>} />
            <Route exact path="/counsellor/newregisterStudent" element={   <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <TotalRegistrationStudent />
      </div>
    </>} />
            <Route exact path="/counsellor/All-Counselor-Demo/:id"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <AllDemoSection />
      </div>
    </>
  }
 />
            {/* <Route exact path="/counsellor/All-Counselor-Demo/:id/demoStudent"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <TeacherDemo />
      </div>
    </>
  }
 /> */}
            <Route exact path="/counsellor/new-Counselor-Demo/:id"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <NewDemoSection />
      </div>
    </>
  }
 />
            <Route exact path="/counsellor/Today-Demo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <AllDemo />
      </div>
    </>
  }
 />
            <Route exact path="/counsellor/Today-Demo/EditDemo"   element={
    <>
   
        <EditDemo/>
  
    </>
  }
 />
            <Route exact path="/counsellor/Today-Demo/AddDemoStudent"   element={
    <>
     
        <AddDemoStudent />
      
    </>
  }
 />
            <Route exact path="/counsellor/Today-Demo/DemoStudent"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <DemoStudent />
      </div>
    </>
  }
 />
            <Route exact path="/counsellor/Today-Demo/DemoStudent/editDemoStudent"   element={
   <>
   <Header />
   <div style={{ display: 'flex' }}>
     <Cslidebar />
     <EditDemoStudent />
   </div>
 </>
  }
 />
            {/* <Route exact path="/counsellor/new-Counselor-Demo/:id/demoStudent"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <TeacherDemo />
      </div>
    </>
  }
 /> */}

            <Route exact path="AboutCounselor/registerStudent" element={ <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TotalRegistrationStudent />
      </div>
    </>} />
            {/* <Route exact path="FeesCollection" element={<FeesCollection />} /> */}
            <Route exact path="admin/New-Batch" element={<NewBatch />} />
            <Route exact path="admin/Running-batches" element={<RunningBatches />} />
            <Route exact path="admin/Running-batches/EditRunningBatch" element={<EditRunningBatch />} />
            <Route exact path="admin/old-batches" element={<OldBatches />} />
            <Route exact path="admin/old-students" element={<OldStudent/>} />
            <Route exact path="admin/AddFees/:id" element={<Addfee />} />
            <Route exact path="/FeesTable" element={<FeeTable />} />
            <Route exact path="/FeesTable/FeeDetail" element={<FeeDetails />} />
            <Route exact path="/FeeRecipt" element={<FeeRecipt />} />
            <Route exact path="/EditFee/:id" element={<EditFee />} />
            <Route exact path="StudentLogout" element={<StudentLogout />} />
            {/* <Route exact path="AllTrainer" element={<AllTrainer />} /> */}
            {/* <Route exact path="TeacherDemo" element={<TeacherDemo />} /> */}
            {/* <Route exact path="DemoOverview" element={<DemoOverview />} /> */}
            {/* <Route exact path="AddTrainer" element={<AddTrainer />} /> */}
            {/* <Route exact path="EditTrainer" element={<EditTrainer />} /> */}
            <Route exact path="/counsellor" element={[ <Home />]} />
            {/* <Route exact path="trainer/" element={ <TrainerDashboard />} /> */}
            {/* <Route exact path="trainer/upcomingDemo" element={ <>
      <Header />
      <div style={{ display: 'flex' }}>
        <TrainerSlidebar />
        <UpcomingDemo />
      </div>
    </>} /> */}
            {/* <Route exact path="trainer/upcomingDemo/DemoStudent" element={ <>
      <Header />
      <div style={{ display: 'flex' }}>
        <TrainerSlidebar />
        <TeacherDemo />
      </div>
    </>} /> */}
            {/* <Route exact path="/trainer/attendence" element={<StudentAttandance />} /> */}
            {/* <Route exact path="/trainer/student" element={<TrainerStudent />} />      */}
     
            {/* <Route exact path="/trainer/student/attendencedetail" element = { 
            <>      
               <Header />
            <div style={{ display: 'flex' }}>
        <TrainerSlidebar />
        <StudentAttandanceDetails />
      </div>
      </>
   } /> */}
            {/* <Route exact path="/trainer/add-attendance" element={<AddAttendance />} /> */}
            <Route exact path="/trainer/student/:id/StudentAssignment" element={<AssignmentStatus />} />
            {/* <Route exact path="/trainer/student/:id/attendence" element={<StudentAttandance />} /> */}
            <Route exact path="/student/fullattendance/:id" element={<><Header /> <div style={{ display: 'flex' }}>
        <StudentSlidebar />
        <StudentAttandanceDetails />
      
      </div> 
      </>}/>
            <Route exact path='/trainer/allStudent' element={<AllStudents />} />
            <Route exact path='/trainer/newStudent' element={<NewStudent />} />
            {/* <Route exact path='/trainer/Trainer-Course' element={<TrainerCourse />} /> */}
            {/* <Route exact path='/trainer/Trainer-Running-batch' element={<TrainerRunningBatch />} /> */}
            {/* <Route exact path="/trainer/assignment" element={ <TrainerAssignment />} /> */}
            {/* <Route exact path="/trainer/assignment/StudentAssigment" element={  <>
      <Header />
      <div style={{ display: 'flex' }}>
        <TrainerSlidebar />
        <StudentAssignment />
      </div>
    </>} /> */}
            {/* <Route exact path="/trainer/demooverview" element={ <DemoOverview />} /> */}
            {/* <Route exact path="/trainer/teacherdemo"   element={<><Header />
      <div style={{ display: 'flex' }}>
        <TrainerSlidebar />
        <TeacherDemo />
      </div>
    </>
  }
 /> */}
            <Route exact path="/counselor/demoStudent"  element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <DemoStudent />
      </div>
    </>
  } />
            {/* <Route exact path="/trainer/TrainerMessage" element={ <TrainerMessage />} /> */}
            <Route exact path='/counselor' element={<CounselorDashboard />} />
            <Route exact path="/counselor/AllStudent" element={<CAllStudents />} />
            <Route exact path="/counselor/AllDemo/DemoStudent/editDemoStudent" element={<EditDemoStudent />} />
            <Route exact path="RegisterStudentAdd" element={[ <RegisterStudentAdd />]} />
            <Route exact path="counselor/RegisteredStudent" element={[ <CounselorRegisteredStudent/>]} />
            <Route exact path="counselor/EditRegisteredStudent" element={[ <EditRegisteredStudent/>]} />
            <Route exact path="RegisteredStudent" element={[<RegisteredStudent/>]} />
            <Route exact path="admin/AddCounselor" element={ <CAddCounselor />} />
            <Route exact path="counselor/RegisterStudentAdd" element={[ <RegisterStudentAdd />]} />
            <Route exact path="/counselor/Demo" element={[ <Demo />]} />
            <Route exact path="/counselor/AddDemo" element={[ <AddNewDemo />]} />
            <Route exact path="/counselor/AllDemo" element={[ <AllDemo/>]} />
            <Route exact path="/counselor/AllDemo/EditDemo" element={[ <EditDemo/>]} />
            <Route exact path="/counselor/AllDemo/AddDemoStudent" element={[ <AddDemoStudent/>]} />
            <Route exact path="/counselor/AllDemo/DemoStudent"  element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <DemoStudent />
      </div>
    </>
  } />
            <Route exact path="/counselor/SendMessage" element={[ < CsendMessage />]} />
            {/* <Route exact path="/counselor/demooverview" element={[<DemoOverview />]} /> */}
            <Route exact path="SendMessages" element={<SendMessages />} />
            <Route exact path="Assignment" element={<Assignment />} />
            <Route exact path="feeReceipt" element={<FeeRecipt />} />
            <Route exact path="resetpassword" element={<Newpassword />} />
            {/* <Route exact path="/trainer/attendencedetail" element={<AttendanceDetail />} /> */}
             {/* <Route exact path="EditFee" element={[<Header />, <Sidebar />, <EditFee />]} />  */}
            <Route exact path="Aboutstudent/64d9f16d31f0e4f016407880/AllMessage/:id" element={<AllMessage />} />
            <Route exact path="/ReadMessage" element={<ReadMessage />} />
            {/* <Route exact path="admin/Running-batches/Student" element={<RunningBatchStudent/>} /> */}
            {/* <Route exact path="admin/old-batches/Student" element={<RunningBatchStudent/>} /> */}
            {/* <Route exact path="admin/registrationReceipt" element={<RegistrationReceipt/>} /> */}
            <Route exact path="Add-Registered-Student/registrationReceipt" element={<RegistrationReceipt/>} />
          </Routes>
          <Footer />
        </StudentState >
      </BrowserRouter >
     

  )
}
