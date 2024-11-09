import { useEffect } from "react";
import AppLayout from "./Layout/AppLayout";
import { GET_ALL_POSTS, GET_USER_INFO } from "./Queries";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: postsData, error: postsError, loading: postsLoading } = useQuery(GET_ALL_POSTS);

  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery(GET_USER_INFO, {
    onCompleted: (data) => {
      const followers = data?.getUser?.followings?.map((value: any) => 
        typeof value === "string" ? value : value?._id
      );
      const userWithFollowers = { ...data.getUser, followings: followers };
      dispatch(setUser(userWithFollowers));
    },
    onError: (error) => {
      console.error("User Info Error:", error.message);
    },
  });

  useEffect(() => {
    if (postsError) {
      navigate("/login");
    }
  }, [postsError, navigate]);

  return (
    <AppLayout isLoading={postsLoading || userLoading}>
      {postsData?.getAllPosts && Array.isArray(postsData.getAllPosts) ? (
        postsData.getAllPosts.map((post) => <div key={post._id}>{post.content}</div>)
      ) : (
        <p>No posts available.</p>
      )}
    </AppLayout>
  );
}

export default App;
