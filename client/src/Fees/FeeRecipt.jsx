import React, { useEffect, useState } from "react";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';


function FeeRecipt(props) {
  const student = props.student

  const [studentPayment, setStudentPayment] = useState()

  useEffect(()=>{

    getStudentPayment()
  },[])

  const getStudentPayment = async()=>{
    let paymentData = await fetch(`http://localhost:8000/getStudentPayment/${student._id}`,
    {
      method:'GET',
    })

    paymentData = await paymentData.json()
    setStudentPayment(paymentData)
    console.log('payment data =',paymentData)
  }

  const showInvoice = (url)=>{
    window.open(url,"_blank")
  }

  return (
    <>
        <div>
          <div className="card-header ">
            <h4 className="text-primary mb-4">Fee Receipt</h4>
          </div>
          <div className="tab-content">
            <div id="about-me" className="tab-pane fade active show">
              <div className=" fee-recipt mt-4 w-79">
                <h4 className="text-primary mt-4">
                  Installment Details
                </h4>
                <div className="table-responsive recentOrderTable">
                  <table
                    id="datatable"
                    className="table table-striped table-bordered "
                    cellspacing="0"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th scope="col">InstallMent No.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">File</th>
                        <th scope="col">Invoice No.</th>
                        <th scope="col">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                    {studentPayment && studentPayment.map((data,index)=>{

                        return(
                          <tr>
                        <td>{index+1}</td>
                        <td>{data.CollectionDate}</td>
                        <td>{data.amount}</td>
                        <td><button className="btn btn-primary" onClick={e=>{showInvoice(data.url)}}>show</button></td>
                        <td>{data.InvoiceNumber}</td>
                        <td>{data.Detail}</td>
                      </tr>
                        )
                    })  }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    </>
  )
}

export default FeeRecipt;
