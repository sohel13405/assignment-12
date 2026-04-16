import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { useEffect, useRef, useState } from "react";

const PostDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [openShare, setOpenShare] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const navigate = useNavigate()

    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenShare(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // GET POST
    const { data: post, isLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/posts/${id}`);
            return data;
        },
    });

    const shareUrl = `${window.location.origin}/post/${id}`;
    const title = post?.title || 'check this post';

    // GET COMMENTS
    const { data: comments = [] } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/comments/${id}`);
            return data;
        },
    });

    // COMMENT MUTATION
    const commentMutation = useMutation({
        mutationFn: async (text) => {
            return await axiosSecure.post("/comments", {
                postId: id,
                text,
                user: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                },
            });
        },
        onSuccess: () => {
            toast.success("Comment added");
            queryClient.invalidateQueries(["comments", id]);
        },
    });

    // VOTE MUTATION
    const voteMutation = useMutation({
        mutationFn: async (type) => {
            return await axiosSecure.patch(`/posts/vote/${id}`, {
                type,
                email: user?.email,
            });
        },

        onSuccess: () => {
            toast.success("Vote counted");
            queryClient.invalidateQueries(["post", id]);
        },

        onError: (err) => {
            toast.error(err.response?.data?.message);
        },
    });



    // NEW: DELETE COMMENT
    const deleteMutation = useMutation({
        mutationFn: async (commentId) => {
            return await axiosSecure.delete(
                `/comments/${commentId}?email=${user?.email}`
            );
        },
        onSuccess: () => {
            toast.success("Comment deleted");
            queryClient.invalidateQueries(["comments", id]);
        },
    });

    //  NEW: UPDATE COMMENT
    const updateMutation = useMutation({
        mutationFn: async ({ commentId, text }) => {
            return await axiosSecure.patch(`/comments/${commentId}`, {
                text,
                email: user?.email,
            });
        },
        onSuccess: () => {
            toast.success("Comment updated");
            setEditingId(null);
            queryClient.invalidateQueries(["comments", id]);
        },
    });

    if (isLoading) return <p className="text-center mt-20">Loading...</p>;



    return (
        <div className="max-w-4xl mx-auto px-4 py-10">

            {/* POST CARD */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 space-y-5"
            >

                {/* AUTHOR */}
                <div className="flex items-center gap-3">
                    <img
                        src={post?.author?.image}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{post?.author?.name}</p>
                        <p className="text-sm text-gray-500">
                            {post?.createdAt ? (
                                new Date(post.createdAt).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                            ) : (
                                "No date"
                            )}
                        </p>
                    </div>
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold">{post?.title}</h2>

                {/* TAG */}
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    #{post?.tag}
                </span>

                {/* IMAGE */}
                <img
                    src={post?.image}
                    className="w-full rounded-xl"
                />

                {/* DESCRIPTION */}
                <p className="text-gray-700">{post?.description}</p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-6 items-center pt-4">

                    {/* UPVOTE */}
                    <button
                        onClick={() => {
                            if (!user) return toast.error("Login required");
                            voteMutation.mutate("up");
                        }}
                        className="btn btn-sm"
                    >
                        👍 {post?.upVote}
                    </button>

                    {/* DOWNVOTE */}
                    <button
                        onClick={() => {
                            if (!user) return toast.error("Login required");
                            voteMutation.mutate("down");
                        }}
                        className="btn btn-sm"
                    >
                        👎 {post?.downVote}
                    </button>

                    {/* SHARE */}
                    <div className="relative" ref={dropdownRef}>

                        {/* SHARE BUTTON */}
                        <button
                            onClick={() => {
                                if (!user) return toast.error("Login required");
                                setOpenShare(!openShare);
                            }}
                            className="btn btn-sm"
                        >
                            🔗 Share
                        </button>

                        {/* DROPDOWN */}
                        {openShare && (
                            <div className="absolute top-12 right-0 bg-white shadow-xl rounded-xl p-3 flex flex-col gap-3 z-50 animate-fadeIn">

                                <FacebookShareButton url={shareUrl} quote={title}>
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                                        <FacebookIcon size={30} round />
                                        <span>Facebook</span>
                                    </div>
                                </FacebookShareButton>

                                <WhatsappShareButton url={shareUrl} title={title}>
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                                        <WhatsappIcon size={30} round />
                                        <span>WhatsApp</span>
                                    </div>
                                </WhatsappShareButton>

                            </div>
                        )}

                    </div>

                </div>
            </motion.div>

            {/* COMMENT SECTION */}
            <div className="mt-10">

                        
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Comments</h3>

                    {/* 🔥 NEW BUTTON */}
                    <button
                    
                        onClick={() => {
                            if (!user) return toast.error("Login required");
                            navigate(`/comments/${post._id}`)
                        } }
                        className="btn btn-sm btn-outline btn-primary"
                    >
                        🚨 Report Comments
                    </button>
                </div>

                {/* ADD COMMENT */}
                {user ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const text = e.target.comment.value;
                            commentMutation.mutate(text);
                            e.target.reset();
                        }}
                        className="mb-6"
                    >
                        <textarea
                            name="comment"
                            className="textarea textarea-bordered w-full"
                            placeholder="Write a comment..."
                            required
                        />
                        <button className="btn btn-primary mt-2">
                            Comment
                        </button>
                    </form>
                ) : (
                    <p className="text-red-500 mb-4">
                        Login to comment
                    </p>
                )}


                {/* COMMENTS LIST */}
                <div className="space-y-4">
                    {comments.map((c) => (
                        <div
                            key={c._id}
                            className="bg-white p-4 rounded-lg shadow "
                        >
                            {/* USER INFO */}
                            <div className="flex items-center justify-between mb-2">

                                {/* LEFT SIDE (USER) */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={c.user?.image}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <p className="font-medium">{c.user?.name}</p>
                                </div>

                                {/* RIGHT SIDE (BUTTONS) */}
                                {user?.email === c.user?.email && (
                                    <div className="flex gap-2">

                                        {/* EDIT */}
                                        <button
                                            onClick={() => {
                                                setEditingId(c._id);
                                                setEditText(c.text);
                                            }}
                                            className="btn btn-xs"
                                        >
                                            ✏️
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={() => deleteMutation.mutate(c._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            🗑️
                                        </button>

                                    </div>
                                )}
                            </div>

                            {/* ✏️ EDIT MODE */}
                            {editingId === c._id ? (
                                <div>
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="textarea textarea-bordered w-full"
                                    />

                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() =>
                                                updateMutation.mutate({
                                                    commentId: c._id,
                                                    text: editText,
                                                })
                                            }
                                            className="btn btn-sm btn-success"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="btn btn-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>{c.text}</p>
                            )}


                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PostDetails;