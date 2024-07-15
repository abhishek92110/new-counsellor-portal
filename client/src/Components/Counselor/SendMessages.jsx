// import React from 'react'

// export default function SendMessages() {
  
//   return (
//     <>
 

//     <div className="content-body">
//        <div className="container-fluid">
//          <div className="row page-titles mx-0">
//            <div className="col-sm-6 p-md-0">
//              <div className="welcome-text">
//                <h4>Hi, welcome back To!</h4>
//                <span className="ml-1">Message</span>
//              </div>
//            </div>
          
//            <form className="input-group w-auto my-auto d-none d-sm-flex">
//              <input
//                autoComplete="off"
//                type="search"
//                className="form-control rounded"
//                placeholder="Search"
//                style={{ minWidth: 125 }}
//              />
//              <button className='butt'>
//              <span className="input-group-text  d-none d-lg-flex">
//              <i class="fa fa-search" aria-hidden="true"></i>
//              </span>
//              </button>
//            </form>
   
          
//          </div>
   
   
   
         
//          {/* row */}
//          <div className="row">
//            <div className="col-lg-12">
//              <div className="card">
//                <div className="card-body">
               
//                  <div className="email-right  ml-sm-4 ml-sm-0">
                  
//                    <div className="compose-content">
//                      <form action="#">
                       
                     
//                        <div className="form-group">
//                          <textarea
//                            id="email-compose-editor"
//                            className="textarea_editor form-control bg-transparent"
//                            rows={15}
//                            placeholder="Enter a Message ..."
//                            defaultValue={""}
//                          />
//                        </div>
//                      </form>
   
   
   
   
   
   
   
   
   
   
                     
//          <div className="row">
//            <div className="col-md-12">
//              <h4 className='stu'>Please Select Students</h4>
//              <div className="table-responsive">
//                <table id="mytable" className="table table-bordred table-striped">
//                  <thead>
//                    <tr>
//                      <th>
//                        <input type="checkbox" id="checkall" />
//                      </th>
//                      <th>First Name</th>
//                      <th>Last Name</th>
//                      <th>Address</th>
//                      <th>Email</th>
//                      <th>Contact</th>
//                      <th>Edit</th>
                     
//                    </tr>
//                  </thead>
//                  <tbody>
//                    <tr>
//                      <td>
//                        <input type="checkbox" className="checkthis" />
//                      </td>
//                      <td>Mohsin</td>
//                      <td>Irshad</td>
//                      <td>Noida</td>
//                      <td>isometric.mohsin@gmail.com</td>
//                      <td>+923335586757</td>
//                      <td>
//                        <p data-placement="top" data-toggle="tooltip" title="Edit">
//                          <button
//                            className="btn btn-primary btn-xs"
//                            data-title="Edit"
//                            data-toggle="modal"
//                            data-target="#edit"
//                          >
//                            <i className="la la-pencil" />
//                          </button>
//                        </p>
//                      </td>
//                      <td>
                      
//                      </td>
//                    </tr>
//                    <tr>
//                      <td>
//                        <input type="checkbox" className="checkthis" />
//                      </td>
//                      <td>Mohsin</td>
//                      <td>Irshad</td>
//                      <td>Noida</td>
//                      <td>isometric.mohsin@gmail.com</td>
//                      <td>+923335586757</td>
//                      <td>
//                        <p data-placement="top" data-toggle="tooltip" title="Edit">
//                          <button
//                            className="btn btn-primary btn-xs"
//                            data-title="Edit"
//                            data-toggle="modal"
//                            data-target="#edit"
//                          >
//                            <i className="la la-pencil" />
//                          </button>
//                        </p>
//                      </td>
//                      <td>
                      
//                      </td>
//                    </tr>
//                    <tr>
//                      <td>
//                        <input type="checkbox" className="checkthis" />
//                      </td>
//                      <td>Mohsin</td>
//                      <td>Irshad</td>
//                      <td>Noida</td>
//                      <td>isometric.mohsin@gmail.com</td>
//                      <td>+923335586757</td>
//                      <td>
//                        <p data-placement="top" data-toggle="tooltip" title="Edit">
//                          <button
//                            className="btn btn-primary btn-xs"
//                            data-title="Edit"
//                            data-toggle="modal"
//                            data-target="#edit"
//                          >
//                            <i className="la la-pencil" />
//                          </button>
//                        </p>
//                      </td>
//                      <td>
                      
//                      </td>
//                    </tr>
//                    <tr>
//                      <td>
//                        <input type="checkbox" className="checkthis" />
//                      </td>
//                      <td>Mohsin</td>
//                      <td>Irshad</td>
//                      <td>Noida</td>
//                      <td>isometric.mohsin@gmail.com</td>
//                      <td>+923335586757</td>
//                      <td>
//                        <p data-placement="top" data-toggle="tooltip" title="Edit">
//                          <button
//                            className="btn btn-primary btn-xs"
//                            data-title="Edit"
//                            data-toggle="modal"
//                            data-target="#edit"
//                          >
//                            <i className="la la-pencil" />
//                          </button>
//                        </p>
//                      </td>
//                      <td>
                      
//                      </td>
//                    </tr>
//                    <tr>
//                      <td>
//                        <input type="checkbox" className="checkthis" />
//                      </td>
//                      <td>Mohsin</td>
//                      <td>Irshad</td>
//                      <td>Noida</td>
//                      <td>isometric.mohsin@gmail.com</td>
//                      <td>+923335586757</td>
//                      <td>
//                        <p data-placement="top" data-toggle="tooltip" title="Edit">
//                          <button
//                            className="btn btn-primary btn-xs"
//                            data-title="Edit"
//                            data-toggle="modal"
//                            data-target="#edit"
//                          >
//                            <i className="la la-pencil" />
//                          </button>
//                        </p>
//                      </td>
//                      <td>
                      
//                      </td>
//                    </tr>
//                  </tbody>
//                </table>
//                <div className="clearfix" />
//                <ul className="pagination pull-right">
//                  <li className="disabled">
//                    <a href="#">
//                      <span className="glyphicon glyphicon-chevron-left" />
//                    </a>
//                  </li>
//                  <li className="active">
//                    <a href="#">1</a>
//                  </li>
//                  <li>
//                    <a href="#">2</a>
//                  </li>
//                  <li>
//                    <a href="#">3</a>
//                  </li>
//                  <li>
//                    <a href="#">4</a>
//                  </li>
//                  <li>
//                    <a href="#">5</a>
//                  </li>
//                  <li>
//                    <a href="#">
//                      <span className="glyphicon glyphicon-chevron-right" />
//                    </a>
//                  </li>
//                </ul>
//              </div>
//            </div>
//          </div>
       
   
   
//        <div
//          className="modal fade"
//          id="edit"
//          tabIndex={-1}
//          role="dialog"
//          aria-labelledby="edit"
//          aria-hidden="true"
//        >
//          <div className="modal-dialog">
//            <div className="modal-content">
//              <div className="modal-header">
//                <button
//                  type="button"
//                  className="close"
//                  data-dismiss="modal"
//                  aria-hidden="true"
//                >
//                  <span className="glyphicon glyphicon-remove" aria-hidden="true" />
//                </button>
//                <h4 className="modal-title custom_align" id="Heading">
//                  Edit Your Detail
//                </h4>
//              </div>
//              <div className="modal-body">
//                <div className="form-group">
//                  <input className="form-control " type="text" placeholder="Mohsin" />
//                </div>
//                <div className="form-group">
//                  <input className="form-control " type="text" placeholder="Irshad" />
//                </div>
//                <div className="form-group">
//                  <textarea
//                    rows={2}
//                    className="form-control"
//                    placeholder="Noida"
//                    defaultValue={""}
//                  />
//                </div>
//              </div>
//              <div className="modal-footer ">
//                <button
//                  type="button"
//                  className="btn btn-warning btn-lg"
//                  style={{ width: "100%" }}
//                >
//                  <span className="glyphicon glyphicon-ok-sign" />
//                  &nbsp;Update
//                </button>
//              </div>
//            </div>
//            {/* /.modal-content */}
//          </div>
//          {/* /.modal-dialog */}
//        </div>
//        <div
//          className="modal fade"
//          id="delete"
//          tabIndex={-1}
//          role="dialog"
//          aria-labelledby="edit"
//          aria-hidden="true"
//        >
//          <div className="modal-dialog">
//            <div className="modal-content">
//              <div className="modal-header">
//                <button
//                  type="button"
//                  className="close"
//                  data-dismiss="modal"
//                  aria-hidden="true"
//                >
//                  <span className="glyphicon glyphicon-remove" aria-hidden="true" />
//                </button>
//                <h4 className="modal-title custom_align" id="Heading">
//                  Delete this entry
//                </h4>
//              </div>
//              <div className="modal-body">
//                <div className="alert alert-danger">
//                  <span className="glyphicon glyphicon-warning-sign" /> Are you sure
//                  you want to delete this Record?
//                </div>
//              </div>
//              <div className="modal-footer ">
//                <button type="button" className="btn btn-success">
//                  <span className="glyphicon glyphicon-ok-sign" />
//                  &nbsp;Yes
//                </button>
//                <button
//                  type="button"
//                  className="btn btn-default"
//                  data-dismiss="modal"
//                >
//                  <span className="glyphicon glyphicon-remove" />
//                  &nbsp;No
//                </button>
//              </div>
//            </div>
//            {/* /.modal-content */}
//          </div>
//          {/* /.modal-dialog */}
//        </div>
   
   
   
//                      <h5 className="mb-4">
//                        <i className="fa fa-paperclip" /> Attatchment
//                      </h5>
//                      <form
//                        action="#"
//                        className="d-flex flex-column align-items-center justify-content-center"
//                      >
//                        <div className="fallback w-100">
//                          <input
//                            type="file"
//                            className="dropify"
//                            data-default-file=""
//                          />
//                        </div>
//                      </form>
//                    </div>
//                    <div className="text-left mt-4 mb-5">
//                      <button
//                        className="btn btn-primary btn-sl-sm mr-3"
//                        type="button"
//                      >
//                        <span className="mr-2">
//                          <i className="fa fa-paper-plane" />
//                        </span>{" "}
//                        Send
//                      </button>
//                      <button className="btn btn-dark btn-sl-sm" type="button">
//                        <span className="mr-2">
//                          <i className="fa fa-times" aria-hidden="true" />
//                        </span>{" "}
//                        Discard
//                      </button>
//                    </div>
   
//                  </div>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
   
   
   
   
   
   
   
   
   
   
//        {/*---- Include the above in your HEAD tag --------*/}
     
//      </>
//   )
// }
