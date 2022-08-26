import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import useToken from "../auth/useToken";

const SignupPage = () => {
  const navigate = useNavigate();

  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

//   if (password != confirmPassword) {
//     setErrorMessage("Password should match");
//   }

// useEffect(() => {
  

// }, [input]);

  const signupHandler = async() => {
    
    const { data } = await axios.post("api/user/signup", { email, password });

    console.log('signup response', data);
    setToken(data.token);
    navigate('/');
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        name="email"
        value={email}
        type="text"
        placeholder="someone@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
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
        placeholder="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        disabled={!email || !password || !confirmPassword || password != confirmPassword}
        onClick={signupHandler}
      >
        Sign Up
      </button>
      <button onClick={() => navigate("/login")}>
        Already have an account? Sign In
      </button>
    </div>
  );
};

export default SignupPage;
