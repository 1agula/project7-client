import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.services";

const RegisterComponent = (props) => {
  const { currentUser } = props;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration succeeds. You are now redirect to the login page."
        );
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
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
          {message && <div className="alert alert-danger">{message}</div>}
          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChangeUsername}
              type="text"
              className="form-control"
              name="username"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">email</label>
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
            <label htmlFor="role">role</label>
            <select
              name="role"
              className="form-select"
              aria-label="Default select example"
              onChange={handleChangeRole}
            >
              <option defaultValue="">Select User Type</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <br />
          <button onClick={handleRegister} className="btn btn-primary">
            <span>Register</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterComponent;
