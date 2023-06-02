import "./register.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGNHt7nKU2wGb6lb9dFam2nqcbRIHHgD-kwU1rMU&s",
    flight_Booking: [],
    booking_package: [],
    req: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "Please enter your first name";
      toast.error("Please enter your first name");
    }

    if (!formData.lastName) {
      errors.lastName = "Please enter your last name";
    }

    if (!formData.id) {
      errors.id = "Please enter a username";
    }

    if (!formData.email) {
      errors.email = "Please enter an email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Please enter a password";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "please enter re-Passwords";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData);
      axios
        .post("https://json-server-dbsaffarna.onrender.com/users", {
          ...formData,
        })
        .then((response) => {
          console.log(response.data);
          if (Object.keys(response.data) === 0) {
            // alert("register failed");
            toast.error("Register Failed");
          } else {
            toast.success("register  success");
            navigate("/login");
          }
        })
        .catch((error) => {
          toast.error(error);
          console.log(error);
        });
    }
  };
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h1>Registration Form</h1>
      <div className="w-100">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your First name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {formErrors.firstName && (
          <span className="error">{formErrors.firstName}</span>
        )}
      </div>
      <div className="w-100">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your Last name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {formErrors.firstName && (
          <span className="error">{formErrors.lastName}</span>
        )}
      </div>
      <div className="w-100">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder="Enter your username"
          value={formData.id}
          onChange={handleInputChange}
        />
        {formErrors.id && <span className="error">{formErrors.id}</span>}
      </div>
      <div className="w-100">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>
      <div className="w-100">
        <label htmlFor="password">Password:</label>
        <div className="w-100 position-relative">
          <input
            type={passwordType}
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="input-group-btn">
            <button className="btn" type="button" onClick={togglePassword}>
              {passwordType === "password" ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
        </div>
        {formErrors.password && (
          <span className="error">{formErrors.password}</span>
        )}
      </div>
      <div className="w-100">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Enter your Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {formErrors.confirmPassword && (
          <span className="error">{formErrors.confirmPassword}</span>
        )}
      </div>

      <div className="text-center w-100">
        <button type="submit">Register</button>
        <p>
          Have an account already?
          <Link to={"/login"}>Log in</Link>
        </p>
        <ToastContainer />
      </div>
    </form>
  );
}
