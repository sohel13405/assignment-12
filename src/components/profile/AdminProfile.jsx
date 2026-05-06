import { useQuery,  useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useState } from "react";
import toast from "react-hot-toast";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const [tag, setTag] = useState("");

    const queryClient = useQueryClient();

    // 🔥 GET STATS
    const { data: stats = {} } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/stats");
            return res.data;
        },
    });

    

    // 🔥 ADD TAG

    const [tagName, setTagName] = useState("");

    const handleAddTag = async (e) => {
        e.preventDefault();

        if (!tagName.trim()) return;

        try {
            const res = await axiosSecure.post("/tags", {
                name: tagName,
            });

            if (res.data.insertedId) {
                toast.success("Tag Added ✅");
                setTagName("");
                queryClient.invalidateQueries(["tags"]);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add tag");
        }
    };

    // 🔥 CHART DATA
    const data = [
        { name: "Users", value: stats.users || 0 },
        { name: "Posts", value: stats.posts || 0 },
        { name: "Comments", value: stats.comments || 0 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* 🔷 PROFILE */}
            <div className="bg-white p-6 rounded-2xl shadow mb-10 flex items-center gap-6">

                <img
                    src={user?.photoURL}
                    className="w-24 h-24 rounded-full border"
                />

                <div>
                    <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                    <p className="text-gray-500">{user?.email}</p>

                    <p className="mt-2 text-sm text-purple-600 font-semibold">
                        👑 Admin Panel
                    </p>
                </div>
            </div>

            {/* 🔷 STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">

                <div className="p-6 bg-blue-100 rounded-xl text-center">
                    <h3 className="text-xl font-bold">{stats.users}</h3>
                    <p>Total Users</p>
                </div>

                <div className="p-6 bg-green-100 rounded-xl text-center">
                    <h3 className="text-xl font-bold">{stats.posts}</h3>
                    <p>Total Posts</p>
                </div>

                <div className="p-6 bg-yellow-100 rounded-xl text-center">
                    <h3 className="text-xl font-bold">{stats.comments}</h3>
                    <p>Total Comments</p>
                </div>

            </div>

            {/* 🔷 PIE CHART */}
            <div className="bg-white p-6 rounded-2xl shadow mb-10 flex justify-center">

                <PieChart width={400} height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>

            </div>

            {/* 🔷 ADD TAG */}
            {/* <div className="bg-white p-6 rounded-2xl shadow">

                <h3 className="text-xl font-semibold mb-4">
                    ➕ Add New Tag
                </h3>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Enter tag name"
                        className="input input-bordered w-full"
                    />

                    <button
                        onClick={() => addTagMutation.mutate(tag)}
                        className="btn btn-primary"
                    >
                        Add
                    </button>
                </div>

            </div> */}

            <form onSubmit={handleAddTag} className="mt-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Add new tag..."
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="input input-bordered w-full"
                />

                <button className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AdminProfile;