import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers($name: String) {
    getAllUsers(name: $name) {
      username
      _id
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

export const GET_FOLLOWER_POSTS = gql`
  query GetFollowerPosts {
    getFollowerPosts {
      _id
      author {
        _id
        username
      }
      comments {
        username
        body
        createdAt
      }
      commentsCount
      likesCount
      imageUrl
      content
      tags {
        username
      }
      likes {
        userId
        username
        createdAt
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query getUserPosts {
    getUserPosts {
      _id
      author {
        _id
        username
      }
      comments {
        userId
        username
        body
        createdAt
      }
      commentsCount
      likesCount
      imageUrl
      content
      tags {
        username
      }
      likes {
        userId
        username
        createdAt
      }
    }
  }
`;
