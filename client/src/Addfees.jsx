import React, { useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

function Addfee() {

    const [inpval, setINP] = useState({
        Name: '',
        email: '',
        Number: '',
        course: '',
        RegistraionFees: '',
        CollectionDate: '',
        InvoiceNumber: '',
        Paymentmode: '',
        amount: '',
        Detail: '',
        file: null
    });

    const handleFileChange = (e) => {
        setINP({ ...inpval, file: e.target.files[0] });
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { Name, email, Number, course, RegistraionFees, CollectionDate, InvoiceNumber, Paymentmode, amount, Detail, file, } = { ...inpval };

        const formData = new FormData();
        formData.append('file', file); // Append the file to the form data
        formData.append('Name', Name);
        formData.append('Number', Number);
        formData.append('course', course);
        formData.append('RegistraionFees', RegistraionFees);
        formData.append('CollectionDate', CollectionDate);
        formData.append('InvoiceNumber', InvoiceNumber);
        formData.append('Paymentmode', Paymentmode);
        formData.append('amount', amount);
        formData.append('Detail', Detail);
        formData.append('email', email);

        console.log('form data =', formData)

        const res = await fetch('http://localhost:8000/FeeDetail', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setINP(data)
    };

    return (
        <>
            <Header />
            <Sidebar />
            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Add Fees</h5>
                        </div>
                        <div>
                            <form action="#" method="post">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label className="form-label">Name</label>
                                            <input required type="text" value={inpval.Name} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label className="form-label">Number</label>
                                            <input required type="number" value={inpval.Number} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Number" class="form-control" id="exampleInputPassword1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input required type="email" value={inpval.email} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="email" class="form-control" id="exampleInputPassword1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label className="form-label">Course</label>
                                            <input required type="text" value={inpval.course} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="course" class="form-control" id="exampleInputPassword1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label className="form-label">Registraion Fees</label>
                                            <input required type="number" value={inpval.RegistraionFees} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="RegistraionFees" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
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
                                        <input required type="number" value={inpval.amount} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="amount" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="form-label">Collection Date</label>
                                        <input required type="date" value={inpval.CollectionDate} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="CollectionDate" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="form-label">Invoice Number</label>
                                        <input required type="text" value={inpval.InvoiceNumber} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="InvoiceNumber" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="form-label">Payment Mode</label>
                                        <select required
                                            id="exampleInputPassword1"
                                            type="select"
                                            name="Paymentmode"
                                            class="form-control"
                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                                            <option disabled selected>--select Batch Mode--</option>
                                            <option value="online">Cash</option>
                                            <option value="offline">Cheque</option>
                                            <option value="offline">UPI</option>
                                            <option value="offline">Draft</option>
                                            <option value="offline">Other</option>
                                        </select>
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
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="form-label">Details</label>
                                        <input required type="text" value={inpval.Detail} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Detail" class="form-control" id="exampleInputPassword1" />
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
                                        <input required type="number" value={inpval.amount} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="amount" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                </div>                              
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className="form-label">Date</label>
                                        <input required type="date" value={inpval.amount} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="amount" class="form-control" id="exampleInputPassword1" />
                                    </div>
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

                    </div>
                </div>
            </div>


        </>

    );
}

export default Addfee;



