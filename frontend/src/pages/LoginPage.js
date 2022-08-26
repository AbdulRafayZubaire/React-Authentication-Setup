import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";

const LoginPage = () => {
  const navigate = useNavigate();

  let [user, setUser] = useUser();
  const [token, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginHandler = async () => {
    try {
      const { data } = await axios.post("api/user/signin", { email, password });

      const {token} = data;
      setToken(token);
      navigate("/");
    } catch (err) {
      setErrorMessage('Invalid email or Password');
    }
  };

  return (
    <div className="content-container">
      <h1>Log In</h1>
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
      <button disabled={!email || !password} onClick={submitLoginHandler}>
        Log In
      </button>
      <button onClick={() => navigate("/forgot-password")}>
        Forgot your password?
      </button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};

export default LoginPage;
