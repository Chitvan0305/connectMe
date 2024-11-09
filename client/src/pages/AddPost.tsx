import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UploadAvatar from "../components/Shared/UploadAvatar";
import PostForm from "../components/Shared/PostForm";
import { PostFormProps } from "../interfaces/Post";
import AppLayout from "../Layout/AppLayout";
const AddPost = () => {
  const { user } = useSelector((state: RootState) => state);
  const [image, setImage] = useState(null);
  const [form, setFormData] = useState<PostFormProps>({
    author: "",
    content: "",
    imageUrl: null,
    tags: [],
  });
  return (
    <AppLayout isLoading={false} isHome={true}>
      <section className="flex flex-col gap-2 justify-center items-center p-3 bg-white rounded-2xl shadow-xl">
        <h2 className="font-bold text-3xl">Add Post</h2>
        <UploadAvatar onFileUpload={setImage} />
        <PostForm handleSubmit={() => console.log({form}, {image})} setFormValue={setFormData}/>
      </section>
    </AppLayout>
  );
};

export default AddPost;
