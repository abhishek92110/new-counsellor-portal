import React, { useState, useContext } from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';
import { StudentContext } from '../../context/StudentState'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom';



export default function CAddCounselor() {

  let ContextValue = useContext(StudentContext);
  const navigate = useNavigate()

  var length = 8,
    charset = "abcdefghijklmnop.,qrstuvwx$%yzABCDEF.,'908*&+GHIJKLMN@#$%!,OPQ!@RSTUVWXY0123456789",
    randomGeneratedPassowrd = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    randomGeneratedPassowrd += charset.charAt(Math.floor(Math.random() * n));
  }

  console.log('password =', randomGeneratedPassowrd)
  const [inpval, setINP] = useState({
    Name: '',
    lastName: '',
    email: '',
    Number: '',
    Address: '',
    password: randomGeneratedPassowrd,
    file: null, // Add a file state
  });
  const handleFileChange = (e) => {
    setINP({ ...inpval, file: e.target.files[0] });
  };

  const addinpdata = async (e) => {
    console.log('add inp func',inpval)
    e.preventDefault();

    const { Name, email, Number, Address, file, password, lastName } = { ...inpval };

    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data
    formData.append('Name', Name);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('Number', Number);
    formData.append('Address', Address);
    formData.append('password', password);

    console.log('form data =', formData)

    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    try{
    const res = await fetch('http://localhost:8000/addCounselor', {
      method: 'POST',
      body: formData,
    });

    ContextValue.updateProgress(60)
    const data = await res.json();
    let tempInpVal = { ...inpval }

    for (let i in inpval) {
      tempInpVal[i] = ""
    }
    setINP(tempInpVal)
    
  ContextValue.updateProgress(100)
  ContextValue.updateBarStatus(false)
  counselorAdded()
    }
    catch(error){
      Swal.fire({   
        icon:  'error',
        title: 'Oops...',
        text:  'Something Went Wrong Try Again',
      }) 
      ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
    }
  };

  const counselorAdded  =()=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Counselor Added',
      showConfirmButton: false,
      timer: 1500
    })

    // navigate('/admin')
  }


  return (
    <>

      <Header />
      <div className='sidebar-main-container'>
      {/* <Sidebar/> */}
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Add Counselor</h4>
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
                <div className="">
                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input type="text" value={inpval.Name} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input type="text" value={inpval.lastName} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="lastName" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Number</label>
                          <input type="number" value={inpval.Number} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Number" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input type="email" value={inpval.email} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="email" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <textArea type="text" value={inpval.Address} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Address" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group fallback w-100">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            name="file"
                            class="form-control"
                            id="exampleInputPassword1"
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
