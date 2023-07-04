import axios from "axios";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LazyImage from "./LazyImage";

export default function PackageCard({ data }) {
  const user = JSON.parse(sessionStorage.getItem("username"));
  const navigate = useNavigate();

  let container = JSON.parse(sessionStorage.getItem("packageInSession")) || [];
  const selectHandler = async (item) => {
    if (user) {
      let selectItem = { ...item, quantaty: 1 };
      const findItem = container.find((product) => product.id === item.id);
      if (findItem) {
        findItem.quantaty += 1;
        const data = { booking_package: container };
        const packageInSession = sessionStorage.setItem(
          "packageInSession",
          JSON.stringify(container)
        );
        axios
          .patch(
            `https://json-server-dbsaffarna.onrender.com/users/${user}`,
            data
          )
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem(
              "bookingUser",
              JSON.stringify(response.data)
            );
            toast.success("Update Quantaty successful", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(container);
      } else {
        toast.success("Bookin successful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        container = [...container, selectItem];

        const data = { booking_package: container };
        const packageInSession = sessionStorage.setItem(
          "packageInSession",
          JSON.stringify(container)
        );
        axios
          .patch(
            `https://json-server-dbsaffarna.onrender.com/users/${user}`,
            data
          )
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
            height: "28rem",
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* <Card.Img
            variant="top"
            loading="lazy"
            src={item.image}
            width="100%"
            height="100%"
          /> */}
          <LazyImage
            placeholderSrc={"https://via.placeholder.com/600/"}
            src={item.image}
            placeholderStyle={{ width: "100%", height: "100" }}
            className="card-image"
          />
          <Card.Body>
            <Card.Title>{item.country}</Card.Title>
            <Card.Subtitle className={`mb-2 text-muted description`}>
              <b>Description:</b>{" "}
              {item.description.length > 100
                ? item.description.substring(0, 100) + "..."
                : item.description}
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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Col>
    </>
  ));
}
