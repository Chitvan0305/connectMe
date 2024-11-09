import gql from "graphql-tag";
const querySchema = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    followings: [User]
  }

  type Post {
    _id: ID!
    content: String!
    imageUrl: String
    author: User!
    tags: [User]
    comments: [Comment]
    likes: [Like]
  }

  type Comment {
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    username: String!
    createdAt: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }
  
  type Query {
    getUser: User
    getAllUsers(name: String): [User]
    getPost(id: ID!): Post
    getAllPosts: [Post]
    getUserFollowers: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    createPost(content: String!, imageUrl: String, authorId: ID!, tags: [ID]): Post
    updatePost(id: ID!, content: String, imageUrl: String, tags: [ID]): Post
    deletePost(id: ID!): Boolean
    addComment(postId: ID!, body: String!, username: String!): Post
    addLike(postId: ID!, username: String!): Post
    addFollower(targetUserId: ID!): User
}
`;

export default querySchema;
