import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './forget.css'
import './loginStyle.css'

export default function Forget() {

    const [email, setEmail] = useState('');
    const [user, setUser] = useState()
    const [sendReset, setSendReset] = useState()
    const [resetlink, setResetLink] = useState()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const resetPassword = async (e) => {
        document.title = "StudentDashboard - Forget Password"

        e.preventDefault()

        try {
            let data = await fetch('http://localhost:8000/resetpassword', {
                method: 'POST',
                body: JSON.stringify({ "email": email, "user": user }),
                headers: { "Content-Type": "application/json" }
            })
            let resposne = await data.json();
            setResetLink(resposne.resetlink)


            if (resposne.send === "true") {
                setSendReset(`Check your Email We have sent you the reset password link`);
            }
            else {
                setSendReset("Sorry this email is not associated with any account");
            }
        }
        catch (error) {
            alert('server issue');
        }
    }

    const isEmailValid = email.includes('@');
    return (
        <>
            <div className="main-container-forget">
                <div className="sub-container-forget">
                    <div className="side-img">
                        <div className="left-img-forget"></div>
                    </div>
                    <div className="side-text">
                        <h2>Reset Password</h2>
                        <p className='letus'>Let Us Help You</p>
                        <div className='all-button'>
                            <button type="button" className="btn btn bg-color1" onClick={(e) => setUser("admin")}>Admin</button>
                            <button type="button" className="btn btn bg-color2" onClick={(e) => setUser("trainer")}>Trainer</button>
                            <button type="button" className="btn btn bg-color3" onClick={(e) => setUser("counsellor")}>Counsellor</button>
                            <button type="button" className="btn btn bg-color4" onClick={(e) => setUser("student")}>Student</button>
                        </div>
                        <div className="input-form">
                            <p className='textcenter'>Enter your registered email address.</p>
                            <div className="input">
                                <input
                                    type="email"
                                    placeholder='E-mail*'
                                    value={email}
                                    onChange={handleEmailChange}


                                />

                            </div>
                            <div className='submitbutton'>
                                <button class="btn btn-primary" type="button" disabled={!isEmailValid} onClick={resetPassword}>Reset My Password</button>
                            </div>
                            {resetlink && <Link to={resetlink}>{sendReset}</Link>}
                            <div className='login'><Link to="/">Login?</Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
