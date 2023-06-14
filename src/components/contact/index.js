import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./index.css";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const value = { name, email, subject, message };
    axios
      .post("https://json-server-dbsaffarna.onrender.com/messages", value)
      .then((response) => {
        toast.success("Success Send");
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("failed request");
        console.log(error);
      });
  };

  return (
    <section data-aos="zoom-in-down" data-aos-duration="6500" id="contact">
      <div className="section-title">
        <h2 className="text-center fw-bold mb-4">Contact Us</h2>
        <span></span>
      </div>
      <Container>
        <Row>
          <Col xs={12}>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col xs="12" md="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="your Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      placeholder="Your Message"
                      as="textarea"
                      rows={8}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button type="submit">Send Message</Button>
                </Col>
              </Row>
            </Form>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
