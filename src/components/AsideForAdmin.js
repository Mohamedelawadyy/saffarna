import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo/OrangeGrayLogo.png";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import AirlinesIcon from "@mui/icons-material/Airlines";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RequestPageIcon from "@mui/icons-material/RequestPage";

export default function AsideForAdmin() {
  return (
    <>
      <Col sm={"12"} md={"2"}>
        <Container fluid={"true"}>
          <Row>
            <aside>
              <Col sm={"12"} md={"2"}>
                <div className="logo-aside text-center w-100">
                  <Link to={"/ "}>
                    <img className="w-100 h-100" alt="logo" src={logo} />
                  </Link>
                </div>
                <div className="aside-content">
                  <h5 className="text-secondary text-center mt-5 fw-bold">
                    Dashboard
                  </h5>

                  <ul>
                    <li>
                      <Link to={"get-users"}>
                        <PersonIcon />
                        <span>Users</span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link to={"users-bookings"}>
                        <RequestPageIcon />
                        <span>Requests</span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link to={"packages-admin"}>
                        <StorefrontIcon />
                        <span>Packages</span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link to={"get-Flights"}>
                        <AirlinesIcon />
                        <span>Flights</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"get-messages"}>
                        <MessageIcon />
                        <span>Messages</span>
                      </Link>{" "}
                    </li>
                  </ul>
                </div>
              </Col>
            </aside>
          </Row>
        </Container>
      </Col>
    </>
  );
}
