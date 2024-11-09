import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      username
    }
  }
`;

export const SIGN_UP_USER = gql`
  query GetAllUsers {
    createUser {
      _id
      username
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      posts {
        _id
        author {
          _id
          username
        }
        content
        comments {
          username
          createdAt
          body
        }
        imageUrl
        likes {
          username
          createdAt
        }
        tags {
          username
        }
      }
      user {
        username
        _id
        email
      }
    }
  }
`;
