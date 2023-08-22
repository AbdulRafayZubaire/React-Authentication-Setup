import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import axios from "axios";

const UserInfoPage = () => {
  const navigate = useNavigate();
  const user = useUser();

  
  const { id, email, isVerified, startingInfo } = user[0] || '';

  const [token, setToken] = useToken();

  const [verified, setIsVerified] = useState(isVerified);
  
  
  const [favouriteFood, setFavoriteFood] = useState(
    startingInfo ? startingInfo.favouriteFood : ""
    );
    
    const [hairColor, setHairColor] = useState(startingInfo ? startingInfo.hairColor : "");
  const [bio, setBio] = useState(startingInfo ? startingInfo.Bio : "");
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage, token]);
  
  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
    }
  }, [navigate, user, token]);
  
  const saveChanges = async () => {
    try {
      if (verified) {
        const { data } = await axios.put(
          `/api/user/update/${id}`,
          { favouriteFood, hairColor, bio },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { newToken } = data;
        setToken(newToken);
        setShowSuccessMessage(true);
      }
      else {
        setShowErrorMessage("To update data PLease verify your Email First")
      }
    } catch (error) {
      console.log(error.message);
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const resetValues = () => {
    setFavoriteFood(startingInfo.favouriteFood);
    setHairColor(startingInfo.hairColor);
    setBio(startingInfo.Bio);
  };

  return (
    <div className="content-container">
      {!verified && (
        <div className="fail">
          Please verify your email to acces full functionality
        </div>
      )}
      <h1>Info for {email}</h1>
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Favorite Food:
        <input
          onChange={(e) => setFavoriteFood(e.target.value)}
          value={favouriteFood}
        />
      </label>
      <label>
        Hair Color:
        <input
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
        />
      </label>
      <label>
        Bio:
        <input onChange={(e) => setBio(e.target.value)} value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default UserInfoPage;
