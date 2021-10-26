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
    <div>
      <h1>Here is a login form</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => props.onEmailChange(e)}
        value={props.email}
      />
      <input
        type="password"
        plateholder="Password"
        onChange={(e) => props.onPasswordChange(e)}
        value={passwordToDisplay}
      />
      <button onClick={props.logUserIn}>Login</button>
      <button onClick={props.getSignUpPage}>Don't have an account?</button>
    </div>
  );
}
