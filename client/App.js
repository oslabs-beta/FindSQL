import React, { useState, useEffect, useCallback } from "react";
import Authentication from "./components/Authentication.js";
import Container from "./components/Container";
// import { ThemeProvider } from './components/ThemeContext';
import Login from "./components/Login.js";
import { useMutation, gql } from "@apollo/client";
import queries from "./GraphQL/Queries.js";
import hooks from "./GraphQL/ApolloClientHooks.js";

export default function App() {
  //conditionally render container vs login page
  const [isLoggedIn, SetUserLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [userProjects, setUserProjects] = useState([]);
  const [cookie, setCookie] = useState("");
  //payload to be invoked with login mutation query
  const [userLogin] = useMutation(queries.LOGIN_MUTATION_LINK, {
    variables: {
      email: email,
      password: password,
    },
    onCompleted: (data) => {
      setUserId(data.login.user._id);
      setUserProjects(data.login.projects);
      SetUserLogin(true);
    },
  });

  const [userSignUp] = useMutation(queries.SIGN_UP_LINK_MUTATION, {
    variables: {
      email: email,
      password: password,
    },
    onCompleted: (data) => {
      setUserId(data.login.user._id);
      setUserProjects(data.login.projects);
      SetUserLogin(true);
    },
  });

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
        signUserUp={signUserUp}
        email={email}
        password={password}
      ></Authentication>
    );
  }

  function checkAuthCookieDetails() {}

  function logUserIn() {
    //make graphql login mutation
    userLogin();
    //if response has correct data change login to true
  }

  function signUserUp() {
    userSignUp();
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
