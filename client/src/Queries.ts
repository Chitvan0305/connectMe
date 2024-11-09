import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers($name: String) {
    getAllUsers(name: $name) {
      username
      _id
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      author {
        username
      }
      comments {
        username
        createdAt
        body
      }
      content
      imageUrl
      likes {
        username
        createdAt
      }
      tags {
        username
        _id
      }
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUser {
    getUser {
      _id
      email
      followings {
        _id
      }
      username
    }
  }
`;

export const GET_USER_FOLLOWERS = gql`
  query GetUserFollowers {
    getUserFollowers {
      username
      _id
    }
  }
`;
