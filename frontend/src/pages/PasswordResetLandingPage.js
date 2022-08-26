import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PasswordResetLandingPage = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFailure, setIsFailure] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const navigate = useNavigate();
    const params = useParams();
    const { passwordResetString } = params;

    const submitHandler = async () => {

        console.log(passwordResetString);
        try {
            await axios.put(`/api/${passwordResetString}/reset-password`, {
                newPassword: password
            });

            setIsSuccess(true);

        } catch (error) {
            setIsFailure(true);
        }
    }

    if (isSuccess) return (
        <div className="content-container">
            <h1>Success!</h1>
            <h3>
                Your Password has been Reset, now please login with your new password
            </h3>

            <button onClick={()=> navigate('/login')}>Go to Login page</button>
        </div>        
    )

    if (isFailure) return (
        <div className="content-container">
            <h1>Failure!</h1>
            <h3>
                Something Went Wrong while trying to reset password
            </h3>

            <button onClick={()=> navigate('/login')}>Go to Login page</button>
        </div>
    )

    return (
        <div className="content-container">

            <h1>Reset Password</h1>
            <p>Please Enter a New Password</p>

            <input
                name="password"
                value={password}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                name="confirmPassword"
                value={confirmPassword}
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button disabled={!password || !confirmPassword || password != confirmPassword} onClick={submitHandler}>
                Reset Password
            </button>
        </div>
    )
}

export default PasswordResetLandingPage