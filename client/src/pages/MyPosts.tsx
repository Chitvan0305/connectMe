import AppLayout from "../Layout/AppLayout";
import { GET_USER_POSTS } from "../Queries";
import { useQuery } from "@apollo/client";
import PostCard from "../components/Shared/PostCard";
import { PostData } from "../interfaces/Post";

const MyPosts = () => {
  const { data, error, loading, refetch } = useQuery(GET_USER_POSTS);

  if (error) {
    console.error("Error fetching posts:", error);
    return <div>Error loading posts.</div>;
  }

  return (
    <AppLayout isLoading={loading} isHome={true}>
      <section className="flex flex-col md:flex-row md:justify-start w-full md:w-auto gap-3 mt-4 mb-[70px]">
        {data?.getUserPosts?.length > 0 ? (
          data.getUserPosts.map((post: PostData) => (
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
};

export default MyPosts;
