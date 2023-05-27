import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./popular-tour-package.css";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

export default function PopularTourPackage() {
  const [data, setData] = useState([]);
  const tourPackages = data.slice(0, 4);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:9000/package`).then((response) => {
      setData(response.data);
    });
  }, []);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section
      className="popular-tour-package mt-5 mb-3"
      data-aos="zoom-out"
      data-aos-duration="4500"
    >
      <Container>
        <Row>
          <Col sm={12}>
            <div className="section-title mb-4">
              <h2 className="text-center fw-bolder"> Popular Tour Package</h2>
              <span></span>
              <p className="w-75 text-center m-auto">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat.
              </p>
            </div>
          </Col>
          {tourPackages.map((item) => (
            <Col className="mb-2" sm={12} md={4} lg={3} key={item.id}>
              <Card className="position-relative tour-package-card">
                <div className="position-relative">
                  <Card.Img variant="top" src={item.image} loading="lazy" />
                  <Button
                    className="discover-btn"
                    onClick={() => navigate("/packages")}
                  >
                    Discover
                  </Button>
                </div>
                <p className="card-price">$ {item.price}</p>
                <Card.Body>
                  <Card.Title className="fw-bold d-flex align-items-center">
                    {item.country}
                    <Rating name="half-rating" defaultValue={5} precision={5} />
                  </Card.Title>
                  <Card.Text className="fw-bold">
                    Days: {item.days} Nights: {item.nights}{" "}
                  </Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
