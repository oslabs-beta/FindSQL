import React, { useState, useEffect } from "react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";

export default function Authentication(props) {
  const [newUser, setUser] = useState(true);
  const [encryptPassword, setPasswordEncrpt] = useState(true);
  let formToDisplay;

  if (newUser) {
    formToDisplay = (
      <SignUp
        onPasswordChange={props.onPasswordChange}
        onEmailChange={props.onEmailChange}
        encryptPassword
        email={props.email}
        password={props.password}
        logUserIn={props.logUserIn}
        getLoginPage={getLoginPage}
      ></SignUp>
    );
  } else {
    formToDisplay = (
      <Login
        onPasswordChange={props.onPasswordChange}
        onEmailChange={props.onEmailChange}
        encryptPassword={encryptPassword}
        email={props.email}
        password={props.password}
        logUserIn={props.logUserIn}
        getSignUpPage={getSignUpPage}
      ></Login>
    );
  }

  function getLoginPage() {
    setUser(false);
  }

  function getSignUpPage() {
    setUser(true);
  }
  return <div>{formToDisplay}</div>;
}
