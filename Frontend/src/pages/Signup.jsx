import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(formData.email)) {
      toast.error("Please enter a valid Gmail address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200 || response.status === 201) {
        // ✅ Show SweetAlert2 verification notice
        Swal.fire({
          icon: 'info',
          title: 'Verify Your Email',
          text: 'Kindly check your inbox and verify your email before logging in.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/login");
        });
      }

    } catch (error) {
      console.error("Signup failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;
