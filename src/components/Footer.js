import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../images/logo/OrangeGrayLogo.png";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col sx="12" md="4">
            <div className="footer-logo">
              <img src={logo} alt="logo" loading="lazy" />
              <p>Your mind should be stronger than your feelings , fly</p>
              <div className="social-icon d-flex align-items-center gap-4">
                <Link to={"https://www.facebook.com"} className="facebook-icon">
                  <FacebookRoundedIcon />
                </Link>
                <Link
                  to={"https://www.instagram.com"}
                  className="instagram-icon"
                >
                  <InstagramIcon />
                </Link>
                <Link to={"https://www.youtube.com"} className="youtube-icon">
                  <YouTubeIcon />
                </Link>
              </div>
            </div>
          </Col>
          <Col sx="12" md="4">
            <div className="information-footer d-flex flex-column ">
              <Link to={"/"}>Home</Link>
              <Link to={"/booking"}>Booking</Link>
              <Link to={"/packages"}>Packages</Link>
              <Link to={"#contact"}>Contact</Link>
              <Link to={"/userBooking"}>Your Booking</Link>
              <Link to={"/profile"}>Profile</Link>
              <Link to={"/login"}>Login</Link>
            </div>
          </Col>
          <Col sx="12" md="4">
            <h5 className="mt-2 text-center">
              Subscribe ,Newsletters & get Latest News
            </h5>

            <div className="subscribe-input">
              <input
                type="text"
                className="w-100"
                placeholder="your Email please"
              />
              <Button>Subscribe</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
