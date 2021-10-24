import { useMutation, gql } from "@apollo/client";
import queries from "./Queries.js";

// const [userAuth] = useMutation(queries.LOGIN_MUTATION_LINK, {
//   variables: {
//     email: email,
//     password: password,
//   },
//   onCompleted: (data) => {
//     setUserId(data.login.user._id);
//     setUserProjects(data.login.projects);
//     SetUserLogin(true);
//   },
// });

const hooks = {};

export default hooks;
