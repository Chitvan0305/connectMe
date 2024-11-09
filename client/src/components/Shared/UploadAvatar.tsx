import React, { useState } from "react";

interface UploadAvatarProps {
    onFileUpload: (url: string) => void
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({onFileUpload}) => {
  const [previewUrl, setPreviewUrl] = useState("");


  const handleUpload = async (files: any) => {
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", "connectMe");
    fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({data})
        setPreviewUrl(data?.secure_url);
        onFileUpload(data?.secure_url)
      });
  };

  return (
    <>
      <label></label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files)}
        className="mb-4 rounded-md p-2 cursor-pointer"
        placeholder="Add Post Image"
      />
      {previewUrl && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Image Preview:</h3>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full border border-gray-200"
          />
        </div>
      )}
    </>
  );
};

export default UploadAvatar;
