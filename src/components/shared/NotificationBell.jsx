import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";

const NotificationBell = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    // ✅ Persist "seen"
    const [lastSeenTime, setLastSeenTime] = useState(() => {
        return localStorage.getItem("lastSeenTime") || null;
    });

    // 📡 Fetch announcements (only if user)
    const { data: announcements = [] } = useQuery({
        queryKey: ["announcements"],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get("/announcements");
            return data;
        },
    });

    // 🔴 Unread count (respect hasSeen)
    const unreadCount = announcements.filter(
        (a) => user?.email && !a.readBy?.includes(user.email)
    ).length;


    // 🔔 Bell click
    const handleBellClick = () => {
        setOpen(!open);

        const now = new Date().toISOString();
        setLastSeenTime(now);
        localStorage.setItem("lastSeenTime", now);
    };

    // 🎯 Navigate
    const handleClick = async (id) => {
        await axiosSecure.patch(`/announcements/${id}/read`, {
            email: user.email,
        });

        // ✅ IMPORTANT
        queryClient.invalidateQueries(["announcements"]);

        navigate("/announcements");
    };

    // 🔁 Reset when new announcements come
    useEffect(() => {
        if (!lastSeenTime) return;

        const hasNew = announcements.some(
            (a) => new Date(a.createdAt) > new Date(lastSeenTime)
        );

        if (hasNew) {
            setLastSeenTime(null);
            localStorage.removeItem("lastSeenTime");
        }
    }, [announcements]);

    // ❌ Outside click
    const profileRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!profileRef.current) return;

            if (!profileRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={profileRef} className="relative">

            {/* 🔔 Bell */}
            <button
                onClick={handleBellClick}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
                🔔

                {user && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* 📦 Dropdown */}
            {user && open && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-2xl border border-gray-100 z-50">

                    <div className="p-4 border-b font-semibold text-gray-800">
                        Notifications
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {announcements.slice(0, 10).map((a) => (
                            <div
                                key={a._id}
                                className={`p-3 flex gap-3 cursor-pointer transition
                        ${!a.readBy?.includes(user?.email) ? "bg-blue-50" : "hover:bg-gray-50"}`}

                                // 🔥 THIS IS WHERE YOU USE IT
                                onClick={() => handleClick(a._id)}

                            >
                                <img
                                    src={a.authorImage}
                                    className="w-10 h-10 rounded-full"
                                    alt=""
                                />

                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                        {a.title}
                                    </p>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                        {a.description}
                                    </p>
                                </div>

                                {!a.readBy?.includes(user?.email) && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div
                        onClick={() => navigate("/announcements")}
                        className="p-3 text-center text-sm text-indigo-600 hover:bg-gray-50 cursor-pointer"
                    >
                        View all announcements →
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;