import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import AddPostForm from "../form/AddPostForm";
import { imageUploadToImgbb } from "../../api/utils";

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // get user post count
  useEffect(() => {
    const getPostCount = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/posts/count?email=${user?.email}`
        );
        setPostCount(data.count);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      getPostCount();
    }
  }, [user, axiosSecure]);

  const mutation = useMutation({
    mutationFn: async (postData) => {
      const { data } = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/post`,
        postData
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Post Added Successfully");
      navigate("/");
    },

    onError: (error) => {
      console.log(error);
    },
  });

const handleFormSubmit = async (e, selectedTag) => {
  e.preventDefault();

  setIsUploading(true);

  const form = e.target;
  const title = form.title.value;
  const description = form.description.value;
  const imageFile = form.image.files[0]; // ✅ renamed (clear)

  let imageUrl = "";

  try {
    // ✅ ONLY upload if image exists
    if (imageFile) {
      imageUrl = await imageUploadToImgbb(imageFile);
    }

    const postData = {
      title,
      description,
      tag: selectedTag?.value || "",
      image: imageUrl || null, // ✅ allow empty image

      author: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },

      upVote: 0,
      downVote: 0,
    };

    mutation.mutate(postData);

    form.reset();
  } catch (error) {
    console.log(error);
  } finally {
    setIsUploading(false);
  }
};

  if (loading) return <p className="text-center">Loading...</p>;

  // if user already has 5 posts
  if (postCount >= 5) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">
          You already created 5 posts
        </h2>

        <p className="mb-5">Become a member to add unlimited posts</p>

        <button
          onClick={() => navigate("/membership")}
          className="btn btn-primary"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <AddPostForm
      handleFormSubmit={handleFormSubmit}
      isUploading={isUploading}
      user={user}
    />
  );
};

export default AddPost;