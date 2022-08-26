import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();

    const submitHandler = async() =>{
        try {
            console.log('here');
            const {data} = await axios.put(`/api/forgot-password/${email}`);
            console.log('here', data);
            setSuccess(true);
            setTimeout(()=>{
                navigate('/login')
            }, 3000)
        } catch (error) {
            setErrorMessage(error.message);   
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your Email for a reset Link</p>
        </div>
    ) : (
        <div className="content-container">

            <h1>Forgot Password</h1>
            <p>Enter your Email and we will send you a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}

            <input
                name="email"
                value={email}
                type="text"
                placeholder="someone@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
            />

            <button disabled={!email} onClick={submitHandler}>
                Send Reset Link
            </button>
        </div>
  )
}

export default ForgotPasswordPage