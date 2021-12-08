import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

export default function CourseComponent(props) {
  const navigate = useNavigate();
  let { currentUser } = props;
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((err) => console.log(err));
      } else if (currentUser.user.role === "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []); // eslint-disable-line
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login before seeing your courses.</p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary btn-lg"
          >
            Take me to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>Welcome to instructors's course page.</h1>
          <br />
          <p>Here's the data we got back from server.</p>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>Welcome to students's course page.</h1>
        </div>
      )}
      {currentUser && courseData && (
        <div>
          {courseData.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Student Count: {course.student.length}</p>
                <button className="btn btn-primary">${course.price}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
