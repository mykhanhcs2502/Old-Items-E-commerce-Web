import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const signup = async () => {
        setError1(false)
        setError2(false)
        if (username === "" || password === "" || email === "") {
            setError1(true)
            return
        }
        const user = {
            "username": username,
            "password": password,
            "email": email
        }
        const response = await fetch('http://localhost:5000/quangkhoi/signup/', {
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
            navigate('/loginpage')
        }
    }
    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            signup();
        }
    }


    return (
        <MDBContainer fluid>

            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)', width: '50%' }}>
                    <MDBCardBody className='p-5 text-center'>

                        <h2 className="fw-bold mb-5">Sign up now</h2>
                        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='email' onChange={handleUsername} onKeyUp={handleKeyUp} />
                        <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={handleEmail} onKeyUp={handleKeyUp} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={handlePassword} onKeyUp={handleKeyUp} />
                        <div className={styles.warning2}>{error1 && <div>Please type a valid input!</div>}</div>
                        <div className={styles.warning2}>{error2 && <div>Your username has been registered!</div>}</div>
                        <div className='d-flex justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                        </div>

                        <MDBBtn className='w-100 mb-4' size='md' onClick={signup}>sign up</MDBBtn>
                        <p className='ms-5'>Already have an account? <a href="http://localhost:3000/loginpage" class="link-info">Sign in here</a></p>
                        <div className="text-center">

                            <p>or sign up with:</p>

                            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm" />
                            </MDBBtn>

                        </div>

                    </MDBCardBody>
                </MDBCard>
            </div>

        </MDBContainer>
    );
}

export default Signup;