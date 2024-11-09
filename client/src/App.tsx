import { useEffect, useState } from "react";
import AppLayout from "./Layout/AppLayout";
import { GET_ALL_POSTS, GET_ALL_USERS } from "./Queries";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  useEffect(() => {

    if(error){
      navigate("/login");
      return;
    }

    dispatch(setUser(data?.getAllPosts?.user))
  })

  return (
    <AppLayout isLoading={loading}>
      {data && Array.isArray(data) && data.map((user) => user)}
    </AppLayout>
  );
}

export default App;
