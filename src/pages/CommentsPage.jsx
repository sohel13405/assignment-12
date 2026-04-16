import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/UseAxiosSecure";

const feedbackOptions = ["Spam", "Abusive", "Irrelevant"];

const CommentsPage = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [modalText, setModalText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Fetch comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/comments/${postId}`);
      return data;
    },
  });

  // ✅ Handle report
  const handleReport = async (commentId) => {
    try {
      await axiosSecure.patch(`/comments/report/${commentId}`, {
        feedback: selectedFeedback[commentId],
      });

      // 🔥 Refresh comments
      queryClient.invalidateQueries(["comments", postId]);

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Short text (20 char)
  const truncateText = (text) => {
    if (!text) return "";
    if (text.length <= 20) return text;
    return text.slice(0, 20) + "...";
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading comments...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen py-10">

      <h2 className="text-3xl font-bold mb-6 text-center">
        💬 Comments
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((c) => (
              <tr key={c._id}>

                {/* Email */}
                <td>{c.user?.email}</td>

                {/* Comment */}
                <td>
                  {truncateText(c.text)}
                  {c.text?.length > 20 && (
                    <button
                      onClick={() => {
                        setModalText(c.text);
                        setIsOpen(true);
                      }}
                      className="text-blue-500 ml-2"
                    >
                      Read More
                    </button>
                  )}
                </td>

                {/* Feedback */}
                <td>
                  <select
                    className="select select-sm"
                    disabled={c.reported} // ✅ disable if already reported
                    value={selectedFeedback[c._id] || ""}
                    onChange={(e) =>
                      setSelectedFeedback((prev) => ({
                        ...prev,
                        [c._id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {feedbackOptions.map((f, i) => (
                      <option key={i} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Report Button */}
                <td>
                  <button
                    disabled={c.reported || !selectedFeedback[c._id]}
                    onClick={() => handleReport(c._id)}
                    className="btn btn-sm btn-error"
                  >
                    {c.reported ? "Reported" : "Report"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Full Comment</h3>
            <p>{modalText}</p>

            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;