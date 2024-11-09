import Post from "./models/Posts.js";
import User from "./models/Users.js";
import bcrypt from "bcrypt";
import { generateToken } from "./utils/authToken.js";
import checkAuth from "./utils/chekckAuth.js";

const resolvers = {
  Query: {
    getUser: async (_, __, { req }) => {
      const user = checkAuth(req);

      if (!user) {
        throw new Error("User not authenticated");
      }
      return await User.findOne({ email: user?.email }).populate("followings");
    },
    getAllUsers: async (_, { name }, { req }) => {
      const user = checkAuth(req);

      if (!user) {
        throw new Error("User not authenticated");
      }
      const query = {
        email: { $ne: user.email },
      };

      if (name) {
        query.username = { $regex: name, $options: "i" };
      }

      try {
        const users = await User.find(query);
        return users;
      } catch (err) {
        throw new Error("Users not found", err.message);
      }
    },
    getPost: async (_, { id }) => {
      return await Post.findById(id).populate("author").populate("tags");
    },
    getAllPosts: async (_, __, { req }) => {
      try {
        const user = checkAuth(req);
        if (!user) {
          throw new Error("Aunthentication failed");
        }
        const email = user?.email;

        const userData = await User.findOne({ email: user?.email });

        if (!userData) {
          throw new Error("User not Found");
        }

        const userPosts = await Post.find({ author: userData?._id }).populate(
          "author"
        );

        let posts;

        if (userPosts) {
          posts = [...userPosts];
        }

        const followerIds = userData.followings.map((follower) => follower._id);

        const followerPosts = await Post.find({ author: { $in: followerIds } })
          .populate("author")
          .sort({ createdAt: -1 });

        if (followerPosts) {
          posts = [...posts, ...followerPosts];
        }

        return posts;
      } catch (error) {
        console.error(error);
        return new Error("Something went wrong", error.message);
      }
    },
    getUserFollowers: async (_, __, { req }) => {
      const user = checkAuth(req);

      if (!user) {
        throw new Error("User not authenticated");
      }
      const data =  await User.findOne(
        { email: user?.email },
        { followings: 1 }
      ).populate("followings");

      console.log({data})

      return data?.followings
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = await generateToken({ email, username });
      let user = new User({ username, email, password: hashedPassword });
      user = await user.save();
      return {
        user,
        token,
      };
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (user) {
        const isVerified = await bcrypt.compare(password, user.password);

        if (isVerified) {
          const token = await generateToken({ userId: user._id, email });

          return { user, token };
        }
        throw new Error("Invalid Password");
      } else {
        throw new Error("User not found.");
      }
    },
    createPost: async (_, { content, imageUrl, authorId, tags }, { req }) => {
      try {
        const user = checkAuth(req);
        if (!user) {
          throw new Error("Authentication required.");
        }
        const post = new Post({ content, imageUrl, author: authorId, tags });
        return await post.save();
      } catch (err) {
        console.log(err);
        return new Error("Unable to create Post");
      }
    },
    updatePost: async (_, { id, content, imageUrl, tags }) => {
      return await Post.findByIdAndUpdate(
        id,
        { content, imageUrl, tags },
        { new: true }
      );
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findById(id);
      if (post) {
        await post.remove();
        return true;
      }
      return false;
    },
    addComment: async (_, { postId, body, username }) => {
      const post = await Post.findById(postId);
      const newComment = {
        body,
        username,
        createdAt: new Date().toISOString(),
      };
      post.comments.push(newComment);
      await post.save();
      return post;
    },
    addLike: async (_, { postId, username }) => {
      const post = await Post.findById(postId);
      const newLike = { username, createdAt: new Date().toISOString() };
      post.likes.push(newLike);
      await post.save();
      return post;
    },
    addFollower: async (_, { targetUserId }, { req }) => {
      const user = checkAuth(req);
      if (!user) {
        throw new Error("Authentication required.");
      }

      console.log({ user });

      const currentUser = await User.findOne(
        { email: user?.email },
        { _id: 1, followings: 1 }
      );

      console.log({ currentUser });

      if (!currentUser) {
        throw new Error("Current user not found.");
      }

      const targetUser = await User.findById(targetUserId);
      if (!targetUser) {
        throw new Error("Target user not found.");
      }

      if (currentUser.id.toString() === targetUser.id.toString()) {
        throw new Error("You cannot follow yourself.");
      }

      if (currentUser.followings.includes(targetUserId)) {
        throw new Error("You are already following this user.");
      }
      currentUser.followings.push(targetUserId);

      await currentUser.save();

      return currentUser;
    },
  },
};

export default resolvers;
