import React, { useState, useEffect } from "react";

export default function Login(props) {
  let passwordToDisplay = props.password;
  //   if (props.encryptPassword) {
  //     let outputPassword = "";

  //     for (let char of props.password) {
  //       outputPassword += "*";
  //     }
  //     passwordToDisplay = outputPassword;
  //   }
  return (
    <div className="authpage loginAnimation">
      <div className="auth-left">
        <h1 className="auth-item"> Welcome to Find+SQL </h1>
        <h4 className="auth-item">
          Find+SQL is a PostgresSQL dynamically generating query developer tool,
          that hastens the time required for generating queries.
        </h4>
      </div>
      <div className="auth-right">
        <div className="auth-inner-content">
          <img src="../assets/findsqlV4.png" className="auth-item" />
          <p className="auth-item">Please log into your Find+SQL Account</p>
          <input
            className="input-field"
            type="email"
            placeholder="Enter Username"
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
          <button className="primary-btn" onClick={props.logUserIn}>
            Login
          </button>
          <a className="auth-link" onClick={props.getSignUpPage}>
            <p>Don't have an account?</p>
          </a>
        </div>
      </div>
    </div>
  );
}
