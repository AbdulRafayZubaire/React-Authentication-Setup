import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserInfoPage from './pages/UserInfoPage';
import './App.css'
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordResetLandingPage from "./pages/PasswordResetLandingPage";

function App() {

  return (
    <div className="page-container">
      <Router>
            <Routes>
            <Route path="/" element={<UserInfoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-email/:verificationString" element={<EmailVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:passwordResetString" element={<PasswordResetLandingPage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
