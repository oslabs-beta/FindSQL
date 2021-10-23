import React, { useState, useEffect } from "react";

export default function SignUp(props) {
  let passwordToDisplay = props.password;
  if (props.encryptPassword) {
    let outputPassword = "";

    for (let char of props.password) {
      outputPassword += "*";
    }
    passwordToDisplay = outputPassword;
  }
  return (
    <div>
      <h1>Here is a SignUp page</h1>
      <form>
        <input
          type="text"
          onChange={(e) => props.onEmailChange(e)}
          value={props.email}
        />
        <input
          type="text"
          onChange={(e) => props.onPasswordChange(e)}
          value={passwordToDisplay}
        />
        <button onClick={props.logUserIn}>Login</button>
      </form>
      <button onClick={props.getLoginPage}>Already have an Account?</button>
    </div>
  );
}
