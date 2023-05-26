import "./index.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import logo from "./../../images/logo/OrangeGrayLogo.png";
import { NavDropdown } from "react-bootstrap";
import { Avatar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";

function NavbarApp() {
  const username = JSON.parse(sessionStorage.getItem("username"));
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();

  let getUserDataInSession = JSON.parse(sessionStorage.getItem("userData"));
  console.log(getUserDataInSession);

  const logoutHandler = () => {
    sessionStorage.clear();
    getUserDataInSession = [];
    navigate("/");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <img src={logo} alt="Logo" loading="lazy" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/booking">
              Booking
            </Nav.Link>
            <Nav.Link as={Link} to={"/packages"}>
              Packages
            </Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            {username ? (
              <>
                <NavDropdown
                  title={getUserDataInSession.id}
                  id="basic-nav-dropdown"
                >
                  <Avatar
                    className="m-auto"
                    alt="user image"
                    src={getUserDataInSession.profileImg}
                  />
                  <NavDropdown.Item onClick={logoutHandler}>
                    LogOut
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/userBooking"}>
                    My Booking
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="d-flex justify-content-between align-items-center"
                    as={Link}
                    to={"/profile"}
                  >
                    Profile
                    <SettingsIcon />
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to={"/login"}>
                LogIn <PersonIcon />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
