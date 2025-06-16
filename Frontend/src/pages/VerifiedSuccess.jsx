import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./VerifiedSuccess.css";

const VerifiedSuccess = () => {
  return (
    <div className="verified-container">
      <div className="verified-card">
        <CheckCircle className="verified-icon" />
        <h1 className="verified-title">Email Verified!</h1>
        <p className="verified-message">
          Your email address has been successfully verified. You can now log in and start learning.
        </p>
        <Link to="/login">
          <button className="verified-button">Go to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default VerifiedSuccess;
