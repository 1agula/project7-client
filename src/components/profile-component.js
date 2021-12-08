import React from "react";

export default function ProfileComponent(props) {
  let { currentUser } = props;
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>You must login first before getting your profile.</div>
      )}
      {currentUser && (
        <div>
          <h1>In profile page.</h1>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
            <p>
              <strong>ID: {currentUser.user._id}</strong>
            </p>
            <p>
              <strong>Email: {currentUser.user.email}</strong>
            </p>
          </header>
        </div>
      )}
    </div>
  );
}
