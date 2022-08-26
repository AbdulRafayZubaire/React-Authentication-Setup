import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import axios from "axios";

const UserInfoPage = () => {
  const navigate = useNavigate();

  const [token, setToken] = useToken();
  const [user, setUser] = useUser();
  const [verified, setIsVerified] = useState(user.isVerified);

  const { id, email, isVerified, startingInfo } = user;

  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).
  const [favouriteFood, setFavoriteFood] = useState(
    startingInfo.favouriteFood || ""
  );
  const [hairColor, setHairColor] = useState(startingInfo.hairColor || "");
  const [bio, setBio] = useState(startingInfo.Bio || "");

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    try {if(user.isVerified){
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
    else{
      setShowErrorMessage("To update data PLease verify your Email First")
    }
    } catch (error) {
      console.log(error);
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

  // And here we have the JSX for our component. It's pretty straightforward
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
