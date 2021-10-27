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
    // <div className="mainLogin">
    //   <div className="form-box">
    //     <div className="input-group">
    //       <div className="img-box">
    //         <h1> login page </h1>
    //       </div>
    //       <input
    //         className="input-field"
    //         type="text"
    //         placeholder="Enter Username"
    //         onChange={(e) => props.onEmailChange(e)}
    //         value={props.email}
    //       />
    //       <input
    //         className="input-field"
    //         type="password"
    //         placeholder="Enter Password"
    //         onChange={(e) => props.onPasswordChange(e)}
    //         value={passwordToDisplay}
    //       />
    //       <button className="primary-btn" onClick={props.logUserIn}>
    //         Login
    //       </button>
    //       <a onClick={props.getSignUpPage}>
    //         <p>Don't have an account?</p>
    //       </a>
    //     </div>
    //   </div>
    // </div>
    <div className="authpage">
      <div class="auth-left">
        <h1 className="auth-item"> login page </h1>
      </div>
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
          <a className="auth-link" onClick={props.getSignUpPage}>
            <p>Don't have an account?</p>
          </a>
        </div>
      </div>
    </div>
  );
}
