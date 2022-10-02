import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import useQueryParams from "../utils/useQueryParams";

const LoginPage = () => {
  const navigate = useNavigate();

  const [, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState('');
  const {token: oAuthToken} = useQueryParams();

  useEffect(() => {
    if(oAuthToken){
      setToken(oAuthToken);
      navigate('/');
    }
  }, [oAuthToken, navigate, setToken]);

  useEffect(() => {

    const loadOauthUrl = async () => {
      try {

        const { data } = await axios.get('/auth/google/url');
        const {url} = data;
        console.log(googleOauthUrl);;
        setGoogleOauthUrl(url);
        console.log(googleOauthUrl);;
      } catch (error) {
        console.log(error);
      }
    }

    loadOauthUrl();
  }, []);

  const googleLoginHandler = () =>{

    // navigate(googleOauthUrl);
    window.location.href = googleOauthUrl;
  }

  const submitLoginHandler = async () => {
    try {
      const { data } = await axios.post("api/user/signin", { email, password });

      const { token } = data;
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

      <button disabled={!googleOauthUrl} onClick={googleLoginHandler}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
