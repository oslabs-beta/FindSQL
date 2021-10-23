import React, { useState, useEffect } from "react";
import Authentication from "./components/Authentication.js";
import Container from "./components/Container";
// import { ThemeProvider } from './components/ThemeContext';
import Login from "./components/Login.js";

export default function App() {
  //conditionally render container vs login page
  const [isLoggedIn, SetUserLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let itemToRender;
  if (isLoggedIn) {
    itemToRender = <Container email={email}></Container>;
  } else {
    itemToRender = (
      <Authentication
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        logUserIn={logUserIn}
        email={email}
        password={password}
      ></Authentication>
    );
  }

  function logUserIn() {
    //make graphql query
    SetUserLogin(true);
    //if response has correct data change login to true
  }

  function logUserOut() {
    SetUserLogin(false);
  }

  function onPasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);
    console.log(password);
    return;
  }

  function onEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);
    console.log(email);
    return;
  }

  return <div>{itemToRender}</div>;
}
