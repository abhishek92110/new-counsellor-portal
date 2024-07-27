import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate, useLocation  } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { StudentContext } from '../context/StudentState';
import Swal from 'sweetalert2'

// import Home from '../Components/Home'
// import Header from '../Components/Header'

export default function CounsellorFollowUp() {

  const location = useLocation();
  let { totalLead, status } = location.state;
  console.log("all student =",totalLead, );

  totalLead = groupStudentsByDate(totalLead)
  const { course,allCourse } = location.state;

  let ContextValue = useContext(StudentContext);
  document.title = "StudentDashboard - All Student"
  const navigation = useNavigate()

  const addCourse = ()=>{
    Swal.fire({
        title: 'Enter New Course Name',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
            addNewCourse(result.value)
          Swal.fire({
            title: `${result.value}`,
            
            imageUrl: result.value.avatar_url
          })
        }
      })
  }


  // add Sub Course 

   const addSubCourse = (mainCourse)=>{

    console.log('sub course =',mainCourse)
    Swal.fire({
        title: 'Enter New Course Name and Code',
        html:
            '<input id="courseName" class="swal2-input" placeholder="Course Name">' +
            '<input id="avatarUrl" class="swal2-input" placeholder="Avatar URL">',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {

          const courseName = document.getElementById('courseName').value;
            const courseCode = document.getElementById('avatarUrl').value;

            addNewSubCourse(courseName,courseCode,mainCourse)
          Swal.fire({
            title: `${result.value}`,
            
            imageUrl: result.value.avatar_url
          })
        }
      })
  }

  const addNewCourse = async(mainCourse)=>{
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    course.push(mainCourse)
    console.log("course route =",course)

    try{
    let newCourse = await fetch("http://localhost:8000/addNewCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"course":course,"mainCourse":mainCourse})
      });
      
      ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Course Added',
          showConfirmButton: false,
          timer: 1500
        })
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


  // group student with same date

  function groupStudentsByDate(students) {
    const groupedStudents = students.reduce((acc, student) => {
      const { date } = student;
  
      if (!acc[date]) {
        acc[date] = [];
      }
  
      acc[date].push(student);
      return acc;
    }, {});
  
    const result = Object.keys(groupedStudents).map(date => ({
      date,
      visitstudent: groupedStudents[date],
    }));
  
    return result;
  }


  const addNewSubCourse = async(courseData,courseCode,mainCourse)=>{
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    course.push(courseData)
    console.log("course route =",course)

    try{
    let newCourse = await fetch("http://localhost:8000/addNewSubCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"subCourse":courseData,"mainCourse":mainCourse,"courseCode":courseCode})
      });
      
      ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Course Added',
          showConfirmButton: false,
          timer: 1500
        })
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

  // counsellor follow up data

  const showRefollowupDate = (data) => {  
    
    const followUpData =data.FollowUp;
  
    let tableHTML = '<table border="1" style="width: 100%; text-align: left;">';
    tableHTML += '<tr><th>Date</th><th>Remark</th></tr>';
  
    followUpData.forEach(data => {
        tableHTML += `<tr><td>${data.date}</td><td>${data.remark}</td></tr>`;
    });
  
    tableHTML += '</table>';
  
    Swal.fire({
        title: 'Follow Up Date',
        html: tableHTML,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
          
  
            Swal.fire({
                title: ``,
                imageUrl: result.value.avatar_url
            });
        }
    });
  };

  return (

    <>

      <Header />
      <div className='sidebar-main-container'>
       

        <div className="content-body" style={{ minWidth: "876px" }}>
          {/* row */}
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>All {status}</h4>
                </div>
              </div>
             
            </div>
            <div className="row">
              <div className="col-lg-12">

              </div>
              <div className="col-lg-12">
                <div className="row tab-content">
                  <div id="list-view" className="tab-pane fade active show col-lg-12">
                    <div className="card w-80">
                      <div className="card-header">
                        <h4 className="card-title">All Course {status}</h4>
                      </div>




                      <div class="container">

                        <div class="row">

                          <div class="col-md-12">


                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                              <thead>
                                <tr>
                                  
                                  <th>Course {status}</th>                             
                                 
                                </tr>
                              </thead>

                              <tbody>
                                {totalLead && totalLead.map((data, index) => {

                                  return (
                                    <tr>

                                     
                                      <td><div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#c-${index}`}
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        {data.date}
      </button>
    </h2>
    <div
      id={`c-${index}`}
      className="accordion-collapse collapse"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample"
    >
         <div className="accordion-body">
          <table>
            <tr>
          <th>Course</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Date</th>
          <th>Remark</th>
          <th>Status</th>
          <th>Show</th>
          </tr>
      {data.visitstudent.map((element,index)=>{
        return(
          <tr>
         <td> {element.Course} </td>
         <td> {element.name} </td>
         <td> {element.mobile} </td>
         <td> {element.date} </td>
         <td> {element.remark} </td>
         <td> {element.status} </td>
         <td onClick={()=>{
          showRefollowupDate(element)
         }}> See </td>
         </tr>
        )
      })}
      </table>
        
      </div>
    </div>
  </div>
</div>
</td>
                                      
                                    </tr>
                                  )
                                })
                                }

                              </tbody>
                            </table>


                          </div>
                        </div>
                      </div>
                    </div>
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
