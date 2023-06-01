import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SecurityIcon from "@mui/icons-material/Security";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import Aos from "aos";
import "../App.css";
import "aos/dist/aos.css";
import LazyImage from "./LazyImage";
export default function About() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="about-section" id="about">
      <Container>
        <Row>
          <Col className="mx-auto" sx="12" lg="5">
            <div
              data-aos="zoom-in"
              data-aos-duration="4500"
              className="widget-container mx-auto  position-relative"
            >
              <figure className="big-img">
                {/* <img
                  src="https://themesvila.com/themes-wp/voyagex/wp-content/uploads/2020/07/why-choose-us.jpg"
                  alt="widget"
                  loading="lazy"
                /> */}
                <LazyImage
                  placeholderSrc={"https://via.placeholder.com/600/"}
                  src={
                    "https://themesvila.com/themes-wp/voyagex/wp-content/uploads/2020/07/why-choose-us.jpg"
                  }
                  placeholderStyle={{ width: "100%" }}
                />
              </figure>
              <figure className="thump">
                {/* <img
                  src="https://themesvila.com/themes-wp/voyagex/wp-content/uploads/2020/07/thumb.jpg"
                  alt="widget"
                  loading="lazy"
                /> */}
                <LazyImage
                  placeholderSrc={"https://via.placeholder.com/600/"}
                  src={
                    "https://themesvila.com/themes-wp/voyagex/wp-content/uploads/2020/07/thumb.jpg"
                  }
                  placeholderStyle={{ width: "100%" }}
                />
              </figure>
              <figure className="thump2">
                {/* <img
                  src="https://themesvila.com/themes-wp/voyagex/wp-content/uploads/2020/07/thumb-2.jpg"
                  alt="widget"
                  loading="lazy"
                /> */}
                <LazyImage
                  placeholderSrc={"https://via.placeholder.com/600/"}
                  src={
                    "https://themesvila.com/themes-wp/voyagex/wp-content/uploads/2020/07/thumb-2.jpg"
                  }
                  placeholderStyle={{ width: "100%" }}
                />
              </figure>
            </div>
          </Col>
          <Col sx="12" lg="7" className="mt-5">
            <div
              data-aos="zoom-out"
              data-aos-duration="5500"
              className="about-us w-100"
            >
              <div className="section-title">
                <h1 className="mb-3 fw-bold text-center">who are we ??</h1>
                <span></span>
              </div>
              <h5 className="">
                Saffarna , Travel Agency license A The Largest Online Travel
                Agency in Egypt & The Middle East
              </h5>
              <h1 className="mb-3 mt-5">What We Offer For You ??</h1>
              <Row>
                <div className="col-ls-3  col-md-6 col-12 text-center">
                  <span className="about-icon">
                    <FlightIcon />
                  </span>
                  <p className="fw-bold">Flight Booking</p>
                </div>
                <div className="col-ls-3  col-md-6 col-12 text-center">
                  <span className="about-icon">
                    <SecurityIcon />
                  </span>
                  <p className="fw-bold">Safety travel</p>
                </div>
                <div className="col-ls-3  col-md-6 col-12 text-center">
                  <span className="about-icon">
                    <HotelIcon />
                  </span>
                  <p className="fw-bold">Hotel Booking</p>
                </div>
                <div className="col-ls-3  col-md-6 col-12 text-center">
                  <span className="about-icon">
                    <BookOnlineIcon />
                  </span>
                  <p className="fw-bold">Ticket Booking</p>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
