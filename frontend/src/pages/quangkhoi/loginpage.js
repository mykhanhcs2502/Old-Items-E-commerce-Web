import React from 'react';
import styles from './index.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
export default function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const Login = async () => {
        setError1(false)
        setError2(false)
        if (userName === "" || password === "") {
            setError1(true)
            return
        }
        const user = {
            "username": userName,
            "password": password,
        }
        const response = await fetch('http://localhost:5000/quangkhoi/login/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        const data = await response.json();
        if (data.error) {
            setError2(true)
        } else {
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("userId", data.userId)
            // navigate('/homepage')
        }


    }
    const handleUserName = (e) => {
        setUserName(e.target.value);
    }
    const hanglePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            Login();
        }
    }
    return (
        <MDBContainer fluid>
            <MDBRow>

                <MDBCol sm='6' style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                    <div style={{ width: "80%", marginTop: "25%" }}>
                        <div className='d-flex flex-row ps-5 pt-5'>
                            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                            <span className="h1 fw-bold mb-0">2nd - hand store</span>
                        </div>

                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='formControlLg' type='username' size="lg" onChange={handleUserName} onKeyUp={handleKeyUp} />
                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={hanglePassword} onKeyUp={handleKeyUp} />
                            <div className={styles.warning}>{error1 && <div>Please input your password and username!</div>}</div>
                            <div className={styles.warning}>{error2 && <div>Your password or username is wrong!</div>}</div>
                            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={Login}>Login</MDBBtn>
                            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
                            <p className='ms-5'>Don't have an account? <a href="http://localhost:3000/signuppage" class="link-info">Register here</a></p>

                        </div>
                    </div>

                </MDBCol>

                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img src="https://marketplace.canva.com/EAFchrzM5qw/1/0/900w/canva-blue-modern-phone-wallpaper-JxukPff059Y.jpg"
                        alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}
