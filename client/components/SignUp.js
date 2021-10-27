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
    <div className="authpage">
      <div class="auth-right">
        <div className="auth-inner-content">
          <input
            className="input-field"
            type="text"
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
          <a className="auth-link" onClick={props.getLoginPage}>
            <p>Already have an account?</p>
          </a>
        </div>
      </div>
      <div class="auth-left">
        <h1 className="auth-item"> Sign Up </h1>
      </div>
    </div>
  );
}
