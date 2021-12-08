import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

export default function EnrollComponent(props) {
  let { currentUser } = props;
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((err) => console.log(err));
  };
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id, currentUser.user._id)
      .then((data) => {
        window.alert("Done Enrollment");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <p>Data we got back from API.</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price: {course.price}</p>
                <p>Student: {course.student.length}</p>
                <button
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                  id={course._id}
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
