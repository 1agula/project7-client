import React, { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.services";
import logo from "./logo.svg";

export default function NavbarComponent(props) {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = async () => {
    await AuthService.logout();
    window.alert("Logout Successfully, now you are redirect to the homepage.");
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <div className="App">
      <Navbar
        bg="dark"
        variant="dark"
        fixed="top"
        expand="sm"
        collapseOnSelect
        style={{ paddingLeft: "1rem" }}
      >
        <Navbar.Brand>
          <img src={logo} alt="logo" width="40px" height="40px" />
        </Navbar.Brand>
        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {!currentUser && (
              <Fragment>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </Fragment>
            )}
            {currentUser && currentUser.user.role === "instructor" && (
              <Nav.Link as={Link} to="/postcourse">
                Post Course
              </Nav.Link>
            )}
            {currentUser && currentUser.user.role === "student" && (
              <Nav.Link as={Link} to="/enroll">
                Enroll
              </Nav.Link>
            )}
            {currentUser && (
              <Fragment>
                <Nav.Link as={Link} to="/course">
                  Course
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} onClick={handleLogout} to="#">
                  Logout
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
