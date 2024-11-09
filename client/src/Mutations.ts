import gql from "graphql-tag";
export const CREATE_NEW_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        _id
        email
        username
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        _id
        email
        username
      }
      token
    }
  }
`;

export const ADD_FOLLOWERS = gql`
  mutation AddFollower($targetUserId: ID!) {
    addFollower(targetUserId: $targetUserId) {
      followings {
        _id
      }
    }
  }
`;
