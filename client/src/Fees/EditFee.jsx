import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

function EditFee() {
  useEffect(() => {
    getdata();
  }, []);


  const [tempdate, setTempDate] = useState();
  const [tempinstallment, setTempInstallment] = useState()

  const [inpval, setINP] = useState({
    Name: "",
    email: "",
    Number: "",
    course: "",
    RegistraionFees: "",
    CollectionDate: "",
    InvoiceNumber: "",
    Paymentmode: "",
    amount: "",
    Detail: "",
    file: null,
    installment: "",
    date: ""

  });

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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:8000/getfee/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data of fess =", data, data.date, data.installment)
    setTempDate(data.date)
    setTempInstallment(data.installment)
    console.log("get fees data", tempdate, tempinstallment);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("get data");
    }
  }
  document.title = "StudentDashboard - Edit Student";
  const updateUser = async (e) => {

    e.preventDefault();

    const {
      Name,
      email,
      Number,
      course,
      RegistraionFees,
      CollectionDate,
      InvoiceNumber,
      Paymentmode,
      amount,
      Detail,
      file,
      installment,
      date


    } = inpval;
    let tdate = tempdate
    let tempi = tempinstallment
    tdate.push(date)
    tempi.push(installment)
    console.log("date =", tdate, tempi)


    const res2 = await fetch(`http://localhost:8000/FeeDetail/${id}`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        Name,
        email,
        Number,
        course,
        RegistraionFees,
        CollectionDate,
        InvoiceNumber,
        Paymentmode,
        amount,
        Detail,
        file,
        date: tdate,
        installment: tempi,
      }),
    });

    const data2 = await res2.json();
    console.log("data2 ", data2);
  };


  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <Sidebar />
        <div className="row">
          <div className="col-xl-12 col-xxl-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Add Fees</h5>
              </div>
              <div className="card-body ">
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          required
                          type="text"
                          value={inpval.Name}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Name"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Number</label>
                        <input
                          required
                          type="number"
                          value={inpval.Number}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Number"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          required
                          type="email"
                          value={inpval.email}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="email"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Course</label>
                        <input
                          required
                          type="text"
                          value={inpval.course}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="course"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Registraion Fees</label>
                        <input
                          required
                          type="number"
                          value={inpval.RegistraionFees}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="RegistraionFees"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="card-header">
                  <h5 className="card-title">Add Fee Type</h5>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Amount</label>
                      <input
                        required
                        type="number"
                        value={inpval.amount}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="amount"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Collection Date</label>
                      <input
                        required
                        type="date"
                        value={inpval.CollectionDate}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="CollectionDate"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Invoice Number</label>
                      <input
                        required
                        type="text"
                        value={inpval.InvoiceNumber}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="InvoiceNumber"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Payment Mode</label>
                      <select
                        required
                        id="exampleInputPassword1"
                        type="select"
                        name="Paymentmode"
                        class="form-control"
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                      >
                        <option disabled selected>
                          --select Batch Mode--
                        </option>
                        <option value="online">Cash</option>
                        <option value="offline">Cheque</option>
                        <option value="offline">UPI</option>
                        <option value="offline">Draft</option>
                        <option value="offline">Other</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group fallback w-100">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="file"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
              </div> */}
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Details</label>
                      <input
                        required
                        type="text"
                        value={inpval.Detail}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="Detail"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-header">
                  <h5 className="card-title">Installment</h5>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Amount</label>
                      <input
                        required
                        type="number"
                        value={inpval.installment}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="installment"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input
                        required
                        type="date"
                        value={inpval.date}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="date"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <button
                    type="submit"
                    onClick={e => { updateUser(e) }}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <button type="submit" className="btn btn-light">
                    Cencel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditFee;
