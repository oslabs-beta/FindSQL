import React, { useState, useEffect } from "react";
// import myLogo from "../assets/findsqlV3.png";

export default function SignUp(props) {
  let passwordToDisplay = props.password;
  //   if (props.encryptPassword) {
  //     let outputPassword = "";

  //     for (let char of props.password) {
  //       outputPassword += "*";
  //     }
  //     passwordToDisplay = outputPassword;
  //   }

  // <img src={myLogo} alt="Logo" />

  return (
    <div className="authpage signupAnimation">
      <div className="auth-right">
        <div className="auth-inner-content">
          <img src="../assets/findsqlV4.png" className="auth-item" />
          <p className="auth-item">Please Sign Up For A Find+SQL Account</p>
          <input
            className="input-field"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => props.onEmailChange(e)}
            value={props.email}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => props.onPasswordChange(e)}
            value={passwordToDisplay}
          />
          <button className="primary-btn" onClick={props.signUserUp}>
            Sign Up
          </button>
          <a className="auth-link" onClick={props.getLoginPage}>
            <p>Already have an account?</p>
          </a>
        </div>
      </div>
      <div className="auth-left">
        <h1 className="auth-item"> Welcome to Find+SQL </h1>
        <h4 className="auth-item">
          Find+SQL is a PostgresSQL dynamically generating query developer tool,
          that hastens the time required for generating queries.
        </h4>
      </div>
    </div>
  );
}

