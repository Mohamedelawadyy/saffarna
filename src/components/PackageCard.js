import axios from "axios";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PackageCard({ data }) {
  const user = JSON.parse(sessionStorage.getItem("username"));
  const navigate = useNavigate();

  let container = [];
  const selectHandler = async (item) => {
    if (user) {
      let selectItem = { ...item, quantaty: 1 };
      const findItem = container.find((product) => product.id === item.id);
      if (findItem) {
        findItem.quantaty += 1;
        toast.success("update quantaty successful");
        const data = { booking_package: container };
        axios
          .patch(`http://localhost:9000/users/${user}`, data)
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem(
              "bookingUser",
              JSON.stringify(response.data)
            );
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(container);
      } else {
        toast.success("Booking successful");
        container = [...container, selectItem];

        const data = { booking_package: container };
        axios
          .patch(`http://localhost:9000/users/${user}`, data)
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem(
              "packageUser",
              JSON.stringify(response.data)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate("/login");
    }
  };
  return data.map((item) => (
    <>
      <Col lg={"3"} md={"4"} sm={"12"} key={Math.random()}>
        <Card
          data-aos="fade-left"
          data-aos-duration="4500"
          style={{
            width: "98%",
            height: "35rem",
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Img
            variant="top"
            loading="lazy"
            src={item.image}
            width="100%"
            height="100%"
          />
          <Card.Body>
            <Card.Title>{item.country}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Description : {item.description}
            </Card.Subtitle>
            <Card.Text className="fw-bold">
              Days: {item.days} , Nights : {item.nights}
            </Card.Text>
            <Card.Text className="fw-bold ">{item.price} $</Card.Text>
            <Button
              className="d-block mt-5 m-auto"
              onClick={() => selectHandler(item)}
            >
              Book Now
            </Button>
          </Card.Body>
        </Card>
        <ToastContainer />
      </Col>
    </>
  ));
}
