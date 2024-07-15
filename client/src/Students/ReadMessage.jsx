import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'


function ReadMessage() {
    return (
        <>
            <Header />
            <div className='sidebar-main-container'>
                <Sidebar />
                <div class="containers">
                    <div class="content-wrapper">
                        <div class="email-app card-margin">

                            <div class="email-desc-wrapper">
                                <div class="email-header">
                                    <div class="email-date">Dec 1, 2019 12:02 PM</div>
                                    <div class="email-subject">Prepare Mockup as per the spec document and Submit by Monday!!!</div>
                                    <p class="recipient"><span>From:</span> Paul Smith &lt;paul.smith@domain.com&gt;</p>
                                </div>
                                <div class="email-body">
                                    <p>Hi Jacob,</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan orci ac urna tristique luctus. Duis sollicitudin quam eu ante faucibus, in fringilla sem placerat. Praesent eget nisi quis mauris luctus dignissim.
                                        Nullam vel commodo augue, vitae auctor odio. Sed vel placerat nisi. Aliquam erat volutpat. Etiam mattis nisl magna, vel laoreet dolor hendrerit ut.
                                    </p>
                                    <p>
                                        Etiam condimentum accumsan ligula eu ornare. Ut bibendum, lacus et tempus molestie, eros velit tincidunt felis, in dictum dolor nulla non dolor. Nulla ut dui gravida, interdum massa non, egestas lacus. Praesent hendrerit
                                        nisl pellentesque massa aliquam, nec ultrices risus condimentum.
                                    </p>
                                    <p>
                                        Thanks &amp; Regards <br />
                                        Julian Cruise
                                    </p>
                                </div>
                                <div class="email-attachment">
                                    <div class="file-info">
                                        <div class="file-size">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
                                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                            </svg>
                                            <span>Attachment (90 MB)</span>
                                        </div>
                                        <button class="btn btn-sm btn-soft-base">View All</button>
                                        <button class="btn btn-sm btn-soft-success">Download All</button>
                                    </div>
                                    <ul class="attachment-list">
                                        <li class="attachment-list-item"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Showcase" title="Showcase" /></li>
                                        <li class="attachment-list-item"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Showcase" title="Showcase" /></li>
                                        <li class="attachment-list-item"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Showcase" title="Showcase" /></li>
                                        <li class="attachment-list-item"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="Showcase" title="Showcase" /></li>
                                        <li class="attachment-list-item"><span class="text-base">30+</span></li>
                                    </ul>
                                </div>
                                <div class="email-action">
                                    <button class="btn btn-base">Reply <i class="fa fa-reply"></i></button>
                                    <button class="btn btn-info"><i class="fa fa-share"></i> Forward</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReadMessage