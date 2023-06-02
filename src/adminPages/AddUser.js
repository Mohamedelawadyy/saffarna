import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./add-user.css";

export default function AddUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    password: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "Please enter your first name";
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
            toast.error("added Failed");
          } else {
            toast.success("added  success");
            setFormData({
              firstName: "",
              lastName: "",
              id: "",
              password: "",
              email: "",
              profileImg:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGNHt7nKU2wGb6lb9dFam2nqcbRIHHgD-kwU1rMU&s",
              flight_Booking: [],
              booking_package: [],
              req: "",
            });
          }
        })
        .catch((error) => {
          toast.error(error);
          console.log(error);
        });
    }
  };
  return (
    <form className="add-user p-2" onSubmit={handleSubmit}>
      <h1 className="text-center text-uppercase">Add User</h1>
      <Container>
        <Row>
          <Col lg={6}>
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
          </Col>
          <Col lg={6}>
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
          </Col>
          <Col lg={12}>
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
          </Col>
          <Col lg={12}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </Col>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
          </div>

          <Form.Group
            controlId="form-plaintext-url"
            as={Row}
            className="mt-3 mb-3"
          >
            <Form.Label column sm="2">
              URL image :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="profileImg"
                value={formData.profileImg}
                onChange={handleInputChange}
                type="text"
                placeholder="It's optional"
              />
            </Col>
          </Form.Group>

          <Col sm={"12"}>
            {" "}
            <Button className="w-50 mt-3 d-block m-auto" type="submit">
              Add
            </Button>
          </Col>
          <ToastContainer />
        </Row>
      </Container>
    </form>
  );
}
