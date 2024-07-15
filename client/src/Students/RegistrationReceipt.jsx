import React from "react";
import html2pdf from "html2pdf.js";
import saveAs from "file-saver";
import logo from "../Components/img/logo.png";
import logo1 from "../Components/img/1stlogo.jpeg";
import { useLocation } from "react-router-dom";
import authSign from "../Components/img/auth-sign.jpg";
// import {authSign} from '../Components/img/auth-sign.jpg'

function RegistrationReceipt() {
  const location = useLocation();

  const { data } = location.state;

  console.log("data =", data);

  const generatePdf = () => {
    const content = document.getElementById("element");
    html2pdf(content);
  };

  // function downloadPDFWithCustomName() {
  //   // Replace 'pdfData' with your actual PDF data or a URL to the PDF file
  //   const pdfData = 'path_to_your_pdf_file.pdf';
  //   const customFileName = 'custom_name.pdf'; // Replace with your custom file name

  //   fetch(pdfData)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const link = document.createElement('a');
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = customFileName;
  //       link.click();
  //     })
  //     .catch((error) => console.error('Error:', error));
  // }

  // const generatePdf = () => {
  //   const content = document.getElementById('element'); // Replace 'element' with the ID of the element you want to convert to PDF

  //   // Generate PDF using html2pdf
  //   html2pdf(content);

  //   // Download the generated PDF with a custom file name
  //   const pdfPath = 'path_to_your_pdf_file.pdf'; // Replace with the actual path to your PDF file
  //   const customFileName = 'custom_name.pdf'; // Replace with your custom file name

  //   const link = document.createElement('a');
  //   link.href = pdfPath;
  //   link.download = customFileName;
  //   link.click();
  // };

  return (
    <>
      <div id="element">
        <div id="invoice-POS">
          <div id="top">
            <img src={logo} />
            <img className="logo1" src={logo1} />
          </div>

          <div id="mid">
            <h1 className="heading mb-3">
              Registration Acknowledgement Receipt
            </h1>
            {/* <hr className="hr-rep" /> */}
          </div>

          <div id="bot">
            <div id="table">
              <table>
                <tbody>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Registration No.</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.RegistrationNo}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Student's Name</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.Name}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Student's Mobile No.</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">+91 {data.Number}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Father's/Guardian Name</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.Pname}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Course Name</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.subCourse}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Course Fees</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.CourseFees}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Payment Method</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.PaymentMethod}</h6>
                    </td>
                  </tr>

                  {data.PaymentMethod==="Installment" &&
                     <tr className="service">
                     <td className="tableitem">
                       <h6 className="itemtext">Total Installment</h6>
                     </td>
 
                     <td className="tableitem">
                       <h6 className="itemtext">{data.totalInstallment}</h6>
                     </td>
                   </tr>
                  }
                  

                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Registration Fees</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.RegistrationFees}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Registration Date</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.RegistrationDate}</h6>
                    </td>
                  </tr>
                  
                  
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Payment Mode</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.PaymentMode}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Remaining Fees</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.RemainingFees}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Preferred Batch Join Date & Time</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">
                        {data.joinDate} {data.joinTime}
                      </h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Counsellor Name</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.Counselor}</h6>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <h6 className="itemtext">Counsellor Mobile No.</h6>
                    </td>

                    <td className="tableitem">
                      <h6 className="itemtext">{data.counselorNumber}</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="Signaturee">
              <div className="authorised-sign">
                <div className="imaging">
                  {/* <img src="https://d3tl80hy6t5toy.cloudfront.net/wp-content/uploads/2020/04/14131506/Scan-Mar-31-2020-at-2.05-PM-page-3-2-e1586870328676.jpg" alt=""/> */}
                  <img src={authSign} alt="" />
                </div>
                <div className="signature2-section">
                  <h2>Authorised Signature</h2>
                </div>
              </div>
              <div className="signature-section">
                <h2>Student Signature</h2>
              </div>
            </div>

            <div id="legalcopy">
              <h6 className="legal">
                <strong>Note : </strong>
                <ul className="registration-point">
                  <span>1.</span>
                  <li>
                    This is an Registation Acknowledgement receipt only. Your admission in the
                    mentioned course is subject to full fee payment, EMI
                    document submission, and installation payment within 7 days
                    of batch allocation.
                  </li>
                  <span>2.</span>
                  <li>
                    Students who choose the installments/EMI option may ensure
                    to pay the instalments and submit the EMI document within 7
                    days of starting the batch, failing which a ₹500/- per day
                    late fee will be charged.
                  </li>
                  <span>3.</span>
                  <li>
                    After the allocation of the batch, if you are facing any
                    issues regarding class timing, trainers, or being unable to
                    continue class due to some reason, inform your counsellor
                    immediately & HR Dept., Uncodemy, at  <span style={{ color: "#ff5421" }}>
                    hrdept@uncodemy.com
                      </span>{" "} 
                    within 7 days of starting the batch.
                  </li>
                  <span>4.</span>
                  <li>
                    Lifetime Membership/Access in Class and Training until
                    Placement and Access in Multiple Batches/Trainers is subject
                    to full fee payment by the students.
                  </li>
                  <span>5.</span>
                  <li>
                    Apart from class and training in the above-mentioned course
                    and course completion certificate, revision sessions, doubt
                    sessions, confidence-building sessions, grooming sessions,
                    communication sessions, CV-building sessions, technical
                    sessions, and interview sessions are also provided in the
                    same course fee. No additional charges need to be given by
                    students.
                  </li>
                  <span>6.</span>{" "}
                  <li>
                    For any support or complaint assistance regarding classes
                    and training,{" "}
                    <b>
                      write us at{" "}
                      <span style={{ color: "#ff5421" }}>
                        support@uncodemy.com
                      </span>{" "}
                      or contact or WhatsApp our support team at{" "}
                      <span style={{ color: "#ff5421" }}>+91 8800023723</span>.
                    </b>
                  </li>
                </ul>
              </h6>
            </div>

            <div className="info address-info">
              <h2>
                <strong>Contact Info</strong>
              </h2>
              <h6>
                <strong>Address :</strong> B 14-15, Udhyog Marg, Block B, Sector
                1, Noida, Uttar Pradesh 201301, Near Sector-15 Metro Station.
                <br />
                <strong>Phone :</strong>+91 7701928515, +91 8800023848
                <br />
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={generatePdf}>
          Download Receipt
        </button>
      </div>
    </>
  );
}

export default RegistrationReceipt;
