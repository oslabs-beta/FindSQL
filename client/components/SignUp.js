import React, { useState, useEffect } from "react";

export default function SignUp(props) {
  let passwordToDisplay = props.password;
  //   if (props.encryptPassword) {
  //     let outputPassword = "";

  //     for (let char of props.password) {
  //       outputPassword += "*";
  //     }
  //     passwordToDisplay = outputPassword;
  //   }
  return (
    <div className="mainLogin">
      <div className="form-box">
        <div className="input-group">
          <div className="img-box">
            <h1> signup page </h1>
          </div>
          <input
            className="input-field"
            type="text"
            placeholder="Enter Username"
            required
            onChange={(e) => props.onEmailChange(e)}
            value={props.email}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e) => props.onPasswordChange(e)}
            value={passwordToDisplay}
          />
          <button className="primary-btn" onClick={props.signUserUp}>
            Sign Up
          </button>
          <a onClick={props.getLoginPage}>
            <p>Already have an account</p>
          </a>
        </div>
      </div>
    </div>
  );
}
