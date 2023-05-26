import React, { useState } from "react";
import "./login-form.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../rtk/slices/user-slice";
import { Form } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`http://localhost:9000/users/${username}`)
      .then((response) => {
        // console.log(response.data);
        if (Object.keys(response.data) === 0) {
        } else if (response.data.id !== username) {
          toast.error("please enter valid userName");
        } else if (response.data.password !== password) {
          toast.error("login faild check password again");
        } else {
          toast.success("login success");
          sessionStorage.setItem("username", JSON.stringify(username));
          sessionStorage.setItem("userData", JSON.stringify(response.data));
          dispatch(fetchUsers(username));
          username.includes("admin") ? navigate("/admin") : navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(`login Faild : ${error}`);
      });
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
    <Form className="login-form" onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          control-id="validationCustom01"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Please Enter your Username"
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <div className="w-100 position-relative">
          <input
            type={passwordType}
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please Enter your Password"
          />
          <div className="input-group-btn">
            <button type="button" className="btn" onClick={togglePassword}>
              {passwordType === "password" ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
        </div>
      </div>
      <div className="text-center w-100">
        <button type="submit">Login</button>
        <p className="mt-2">
          Don't have an account? <Link to={"/register"}> Sign up</Link>{" "}
        </p>
      </div>
      <ToastContainer />
    </Form>
  );
}

export default LoginForm;
