import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";

const EmailVerificationPage = () => {
  const params = useParams();
  const [token, setToken] = useToken();
  const [isSuccess, setIsSuccess] = useState(false);
  const verificationString = params.verificationString;

  let data;

  useEffect(() => {
      console.log('here');
    try {
      const verifyEmail = async () => {
         data  = await axios.put(
          `/api/user/verify-email/${verificationString}`,{}
        );
      };

      verifyEmail();
      console.log('here');

      if(data) setToken({data});

        console.log("data", data);
      console.log("success state", isSuccess);
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
    }
  }, []);

  return (
    <div className="content-container">
      <h1>Email Verification</h1>
      {isSuccess && <h2>Email verification successfull</h2>}
      {!isSuccess && <h2>Email verification unsuccessfull</h2>}

      <h2>
        Turn back to your login Screen{" "}
        <a href="http://localhost:3000/login">here</a>
      </h2>
    </div>
  );
};

export default EmailVerificationPage;
