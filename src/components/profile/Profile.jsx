import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import PostCard from "../user/PostCard";
import { useState } from "react";
import EditProfileModal from "../modal/EditProfileModal";
import { auth } from "../../firebase/firebase.config";
import { updateProfile } from "firebase/auth";

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    // 🔥 Fetch DB user
    const {
        data: dbUser = {},
        refetch: refetchUser,
    } = useQuery({
        queryKey: ["dbUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data;
        },
    });

    // 🔥 Merge users
    const finalUser = {
        ...user,
        ...dbUser,
    };

    // 🔥 Profile update
    const handleUpdateProfile = async ({ name, photo }) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            });

            await auth.currentUser.reload();
            setIsModalOpen(false);

        } catch (error) {
            console.log(error);
        }
    };

    // 🔥 Save cover
    const saveCoverPhoto = async (url) => {
        await axiosSecure.patch("/user/cover", {
            email: user.email,
            coverPhoto: url,
        });

        refetchUser();
    };

    // 🔥 Upload cover with preview
    const handleCoverUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        // preview
        setPreview(URL.createObjectURL(image));

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "sohel_cloudinary");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dchvlphro/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            const imageUrl = data.secure_url;

            await saveCoverPhoto(imageUrl);
            setPreview(null);

        } catch (error) {
            console.log(error);
        } finally {
            setIsUploading(false);
        }
    };

    // 🔥 Posts
    const { data: posts = [] } = useQuery({
        queryKey: ["myPosts"],
        queryFn: async () => {
            const res = await axiosSecure.get("/my-posts");
            return res.data;
        },
    });

    // 🔥 Post count
    const { data: postCount = 0 } = useQuery({
        queryKey: ["postCount"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/count?email=${user?.email}`);
            return res.data.count;
        },
    });

    const isMember = finalUser?.isMember === true;

    return (
        <div className="max-w-5xl mx-auto">

            {/* 🔷 COVER */}
            <div className="h-60 bg-gray-200 relative group overflow-hidden rounded-2xl">

                {/* 🔥 COVER IMAGE */}
                <img
                    src={
                        preview ||
                        finalUser?.coverPhoto ||
                        "https://picsum.photos/1200/300"
                    }
                    className="w-full h-full object-cover"
                />

                {/* 🔥 LOADING OVERLAY */}
                {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">

                        {/* Spinner */}
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent mb-3"></div>

                        <p className="text-lg font-semibold">Uploading...</p>
                    </div>
                )}

                {/* EDIT BUTTON */}
                <label className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition">
                    📷 Edit Cover
                    <input
                        type="file"
                        disabled={isUploading}
                        onChange={handleCoverUpload}
                        className="hidden"
                    />
                </label>
            </div>

            {/* 🔷 PROFILE */}
            <div className="mt-8  px-6 flex flex-col md:flex-row md:items-center md:justify-between">

                <div className="flex items-center justify-center gap-4">

                    {/* PROFILE IMAGE */}
                    <img
                        src={finalUser?.photoURL}
                        className="w-24 h-24 rounded-full border-4 border-white "
                    />

                    <div>
                        <h2 className="text-2xl font-bold">
                            {finalUser?.displayName}
                        </h2>
                        <p className="text-gray-500">{finalUser?.email}</p>

                        {/* BADGE */}
                        <div className="mt-2">
                            {isMember ? (
                                <span className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-full">
                                    🥇 Gold Member
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-sm bg-gray-400 text-white rounded-full">
                                    🥉 Bronze User
                                </span>
                            )}
                        </div>

                        {/* POST COUNT */}
                        <p className="mt-2 text-gray-600">
                            📌 Total Posts:{" "}
                            <span className="font-semibold">{postCount}</span>
                        </p>
                    </div>
                </div>

                {/* EDIT BUTTON */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    ✏️ Edit Profile
                </button>
            </div>

            {/* POSTS */}
            <div className="mt-20 px-6">
                <h3 className="text-xl font-semibold mb-4">
                    My Recent Posts
                </h3>

                {posts.length === 0 ? (
                    <p className="text-gray-500">No posts yet</p>
                ) : (
                    <div className="space-y-5">
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL */}
            <EditProfileModal
                user={finalUser}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleUpdateProfile}
            />
        </div>
    );
};

export default Profile;