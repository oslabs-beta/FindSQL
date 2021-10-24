import gql from "graphql-tag";
//queries for methods

const PROFILE_QUERY_LINK = gql`
  query ($id: String!, $email: String!) {
    getProfile(_id: $id, email: $email) {
      _id
      email
      projects {
        databaseURI
        databaseQueries
      }
    }
  }
`;

const GET_PROJECTS_QUERY_LINK = gql`
  query ($email: String!) {
    getProjects(email: $email) {
      user_id
      databaseURI
      databaseQueries
    }
  }
`;

const SIGN_UP_LINK_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        _id
        email
        projects {
          databaseURI
          databaseQueries
        }
      }
      token
    }
  }
`;

const LOGIN_MUTATION_LINK = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        email
        projects {
          databaseURI
          databaseQueries
        }
      }
      token
    }
  }
`;

const DELETE_MUTATION_LINK = gql`
  mutation ($user_id: String!, $databaseUri: String!) {
    deleteProject(user_id: $user_id, databaseURI: $databaseUri) {
      _id
      email
      projects {
        databaseQueries
        databaseURI
      }
    }
  }
`;

const ADD_PROJECT_MUTATION_LINK = ``;

const queries = {
  PROFILE_QUERY_LINK,
  GET_PROJECTS_QUERY_LINK,
  SIGN_UP_LINK_MUTATION,
  LOGIN_MUTATION_LINK,
  DELETE_MUTATION_LINK,
  ADD_PROJECT_MUTATION_LINK,
};

export default queries;
