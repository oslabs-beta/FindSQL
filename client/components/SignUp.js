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
    <div className="mainLogin">
      <div className="form-box">
        <form className="input-group">
          <div className="img-box">
            <h1> loho here </h1>
          </div>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
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
          <button className="submit-btn" onClick={props.getLoginPage}>Log in</button>
          <button className="submit-btn" onClick={props.signUserUp}>Register</button>
        </form>
      </div>
    </div>
  );
}
