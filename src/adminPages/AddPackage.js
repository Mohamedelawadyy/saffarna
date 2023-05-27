import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export default function AddPackage() {
  const [formData, setFormData] = useState({
    country: "",
    description: "",
    days: "",
    nights: "",
    price: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({
    country: "",
    description: "",
    days: "",
    nights: "",
    price: "",
    image: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.country) {
      errors.country = "Please enter your country";
    }

    if (!formData.description) {
      errors.description = "Please enter your description";
    }

    if (!formData.days) {
      errors.days = "Please enter a days";
    }

    if (!formData.nights) {
      errors.nights = "Please enter an nights";
    }
    if (!formData.price) {
      errors.price = "Please enter an price";
    }
    if (!formData.image) {
      errors.image = "Please enter an URL Image";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData);
      axios
        .post("http://localhost:9000/package", {
          ...formData,
        })
        .then((response) => {
          console.log(response.data);
          if (Object.keys(response.data) === 0) {
            toast.error("added Failed");
          } else {
            toast.success("added  success");
            setFormData({
              country: "",
              description: "",
              days: "",
              nights: "",
              price: "",
              image: "",
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
    <main className="add-package-admin">
      <form className="add-user p-2" onSubmit={handleSubmit}>
        <h1 className="text-center text-uppercase">Add Package</h1>
        <Container>
          <Row>
            <Col lg={6}>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                value={formData.Country}
                onChange={handleInputChange}
              />
              {formErrors.country && (
                <span className="error">{formErrors.country}</span>
              )}
            </Col>
            <Col lg={6}>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Enter your description"
                value={formData.description}
                onChange={handleInputChange}
              />
              {formErrors.description && (
                <span className="error">{formErrors.description}</span>
              )}
            </Col>
            <Col lg={12}>
              <label htmlFor="days">days:</label>
              <input
                type="text"
                id="days"
                name="days"
                placeholder="Enter your days"
                value={formData.id}
                onChange={handleInputChange}
              />
              {formErrors.days && (
                <span className="error">{formErrors.days}</span>
              )}
            </Col>
            <Col lg={12}>
              <label htmlFor="nights">Nights:</label>
              <input
                type="text"
                id="nights"
                name="nights"
                placeholder="Enter your nights"
                value={formData.nights}
                onChange={handleInputChange}
              />
              {formErrors.nights && (
                <span className="error">{formErrors.nights}</span>
              )}
            </Col>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                className="w-100"
                id="price"
                name="price"
                placeholder="Enter your price"
                value={formData.price}
                onChange={handleInputChange}
              />
              {formErrors.price && (
                <span className="error">{formErrors.price}</span>
              )}
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Enter your image"
                value={formData.image}
                onChange={handleInputChange}
              />
              {formErrors.image && (
                <span className="error">{formErrors.image}</span>
              )}
            </div>

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
    </main>
  );
}
