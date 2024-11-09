import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, Like, Comment } from "../../interfaces/Post";

const initialState: Post[] = []

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state: any, action: PayloadAction<Post>) => {
            return [...state, action.payload]
        },
        addLikes: (state:any, action: PayloadAction<Like>) => {
            return {...state, likes: [...state.likes, action.payload]}
        },
        addComment: (state:any, action: PayloadAction<Comment>) => {
            return {...state, comments: [...state.comments, action.payload]}
        },
        addTags: (state:any, action: PayloadAction<String>) => {
            return {...state, tags: [...state.tags, action.payload]}
        }
    }
})

export const {setPosts, addLikes, addComment, addTags} = postSlice.actions

export default postSlice.reducer