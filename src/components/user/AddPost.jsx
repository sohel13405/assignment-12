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
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch user + post count
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 👉 get post count
        const countRes = await axiosSecure.get(
          `/posts/count?email=${user?.email}`
        );
        setPostCount(countRes.data.count);

        // 👉 get user info (IMPORTANT)
        const userRes = await axiosSecure.get(`/user/${user?.email}`);
        setIsMember(userRes.data?.isMember || false);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user, axiosSecure]);

  // 🔥 Add post mutation
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const { data } = await axiosSecure.post(`/post`, postData);
      return data;
    },

    onSuccess: () => {
      toast.success("Post Added Successfully 🚀");
      navigate("/");
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed to add post");
    },
  });

  // 🔥 Submit handler
  const handleFormSubmit = async (e, selectedTag) => {
    e.preventDefault();

    setIsUploading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const imageFile = form.image.files[0];

    let imageUrl = "";

    try {
      // upload image (optional)
      if (imageFile) {
        imageUrl = await imageUploadToImgbb(imageFile);
      }

      const postData = {
        title,
        description,
        tag: selectedTag?.value || "",
        image: imageUrl || null,

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

  // 🚫 LIMIT ONLY FOR NON-MEMBERS
  if (!isMember && postCount >= 5) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">
          🚫 Post Limit Reached
        </h2>

        <p className="mb-5 text-gray-600">
          You have reached your limit of 5 posts.
        </p>

        <p className="mb-6 font-medium text-yellow-600">
          Upgrade to Gold 🚀 to post unlimited content
        </p>

        <button
          onClick={() => navigate("/membership")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-xl shadow hover:scale-105 transition"
        >
          Upgrade to Gold 🟡
        </button>
      </div>
    );
  }

  // ✅ GOLD USER UI
  if (isMember) {
    return (
      <div>
        <div className="text-center mb-6">
          <span className="px-4 py-1 bg-yellow-400 text-black rounded-full text-sm font-semibold">
            🟡 Gold Member — Unlimited Posts
          </span>
        </div>

        <AddPostForm
          handleFormSubmit={handleFormSubmit}
          isUploading={isUploading}
          user={user}
        />
      </div>
    );
  }

  // ✅ NORMAL USER UI (below 5 posts)
  return (
    <AddPostForm
      handleFormSubmit={handleFormSubmit}
      isUploading={isUploading}
      user={user}
    />
  );
};

export default AddPost;