import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.services";
import logo from "./logo.svg";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = async () => {
    await AuthService.logout();
    window.alert("Logout Successfully, now you are redirect to the homepage.");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  &nbsp;
                  <img src={logo} alt="logo" width="40px" height="40px" />
                  &nbsp;
                </Link>
              </li>
              {!currentUser && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </Fragment>
              )}
              {currentUser && currentUser.user.role === "instructor" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/postcourse">
                    Post Course
                  </Link>
                </li>
              )}
              {currentUser && currentUser.user.role === "student" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/enroll">
                    Enroll
                  </Link>
                </li>
              )}
              {currentUser && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/course">
                      Course
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="#">
                      Logout
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default NavComponent;
