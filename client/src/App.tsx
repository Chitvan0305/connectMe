import { useEffect } from "react";
import AppLayout from "./Layout/AppLayout";
import { GET_FOLLOWER_POSTS, GET_USER_INFO } from "./Queries";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import PostCard from "./components/Shared/PostCard";
import { PostData } from "./interfaces/Post";
import { Spin } from "antd";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error: postsError, loading: postsLoading } = useQuery(GET_FOLLOWER_POSTS)

  const {
    data: userData,
    error,
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

  if(userLoading || postsLoading){
      return <Spin />
  }

  if (error) {
    console.error("Error fetching posts:", error);
    return <div>Error loading posts.</div>;
  }

  return (
    <AppLayout isLoading={userLoading || postsLoading} isHome={true}>
      <section className="flex flex-col md:flex-row md:justify-start w-full md:w-auto gap-3 mt-4 mb-[70px]">
        {data?.getFollowerPosts?.length > 0 ? (
          data.getFollowerPosts.map((post: PostData) => (
            <PostCard
              key={post._id}
              id={post._id}
              postImage={post.imageUrl}
              author={post.author}
              likesCount={post.likesCount}
              content={post.content}
              tags={post.tags}
              likes={post.likes}
              comments={post?.comments}
            />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </section>
    </AppLayout>
  );
}

export default App;
