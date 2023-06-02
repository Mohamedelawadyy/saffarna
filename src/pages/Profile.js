import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ToastContainer,
} from "react-bootstrap";
import { toast } from "react-toastify";

export default function Profile() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);
  const [email, setEmail] = useState(userData.email);
  const [id, setId] = useState(userData.id);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [profileImg, setProfileImg] = useState(userData.profileImg);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://json-server-dbsaffarna.onrender.com/users/${userData.id}`,
        {
          firstName,
          lastName,
          id,
          email,
          profileImg,
        }
      )
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        toast.success("updated  successfuly");
      })
      .catch((error) => {
        toast.error("error", error);
        console.log(error);
      });
  };

  return (
    <section className="profile">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Profile</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Username :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  First Name :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  First Name :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="form-plaintext-email"
              >
                <Form.Label column sm="2">
                  Your Email :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                controlId="form-plaintext-email"
                as={Row}
                className=" mb-3"
              >
                <Form.Label column sm="2">
                  URL image :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={profileImg}
                    onChange={(e) => {
                      setProfileImg(e.target.value);
                    }}
                    type="text"
                  />
                </Col>
              </Form.Group>
              <Button className="d-block m-auto mb-4" type="submit">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </section>
  );
}
