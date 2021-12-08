import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.services";

const LoginComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlelogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setCurrentUser(AuthService.getCurrentUser());
        }
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {currentUser && (
        <Fragment>
          <p>Your are already logged in.</p>{" "}
          <button
            onClick={() => {
              navigate("/course");
            }}
            className="btn btn-primary btn-block"
          >
            Back to course page
          </button>
        </Fragment>
      )}
      {!currentUser && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              onChange={handleChangeEmail}
              type="text"
              className="form-control"
              name="email"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              name="password"
              autoComplete="off"
            />
          </div>
          <br />
          <div className="form-group">
            <button
              type="submit"
              onClick={handlelogin}
              className="btn btn-primary btn-block"
            >
              <span>Login</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginComponent;
