import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 🔥 GET REPORTS
    const { data: reports = [], isLoading } = useQuery({
        queryKey: ["reports"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/reports");
            return data;
        },
    });

    // ❌ DELETE COMMENT (FIXED)
    const deleteMutation = useMutation({
        mutationFn: async ({ commentId }) => {
            return await axiosSecure.delete(`/admin/comment/${commentId}`);
        },

        onSuccess: (data, variables) => {
            toast.success("Deleted");

            // 🔥 MANUAL REMOVE (IMPORTANT)
            queryClient.setQueryData(["reports"], (old = []) =>
                old.filter((item) => item.commentId !== variables.commentId)
            );
        },
    });

    // ✅ UPDATE STATUS
    const statusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return await axiosSecure.patch(`/reports/${id}`, { status });
        },
        onSuccess: () => {
            toast.success("Updated");
            queryClient.invalidateQueries(["reports"]);
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">

            <h2 className="text-2xl font-bold mb-6">
                🚨 Reported Comments
            </h2>

            <div className="space-y-5">

                {reports.map((report) => (
                    <div
                        key={report._id}
                        className="p-5 border rounded-xl shadow bg-white"
                    >
                        {/* COMMENT */}
                        <p className="font-semibold text-gray-800">
                            💬 {report.commentText}
                        </p>

                        {/* INFO */}
                        <div className="text-sm text-gray-500 mt-2">
                            <p>👤 Comment By: {report.commenterEmail}</p>
                            <p>🚩 Reported By: {report.reportedBy}</p>
                            <p>📌 Reason: {report.feedback}</p>
                            <p>
                                📊 Status:{" "}
                                <span className="font-semibold text-blue-600">
                                    {report.status}
                                </span>
                            </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-3 mt-4">

                            <button
                                onClick={() =>
                                    deleteMutation.mutate({
                                        commentId: report.commentId,
                                    })
                                }
                                className="btn btn-sm btn-error"
                            >
                                Delete Comment
                            </button>

                            <button
                                onClick={() =>
                                    statusMutation.mutate({
                                        id: report._id,
                                        status: "resolved",
                                    })
                                }
                                className="btn btn-sm btn-success"
                            >
                                Mark Resolved
                            </button>

                            <button
                                onClick={() =>
                                    statusMutation.mutate({
                                        id: report._id,
                                        status: "rejected",
                                    })
                                }
                                className="btn btn-sm btn-warning"
                            >
                                Ignore
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportedComments;