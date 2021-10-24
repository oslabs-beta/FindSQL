import React, { useState, useEffect } from "react";
import Authentication from "./components/Authentication.js";
import Container from "./components/Container";
// import { ThemeProvider } from './components/ThemeContext';
import Login from "./components/Login.js";
import queries from "./GraphQL/Queries.js";

export default function App() {
  //conditionally render container vs login page
  const [isLoggedIn, SetUserLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //verify auth details currently held
  let itemToRender;
  if (isLoggedIn) {
    itemToRender = <Container email={email}></Container>;
  } else {
    itemToRender = (
      <Authentication
        checkAuthCookieDetails={checkAuthCookieDetails}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        logUserIn={logUserIn}
        email={email}
        password={password}
      ></Authentication>
    );
  }

  function checkAuthCookieDetails() {}
  function logUserIn() {
    //make graphql login mutation
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
