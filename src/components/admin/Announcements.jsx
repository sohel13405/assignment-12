import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/announcements");
      return data;
    },
  });

  // 🔄 Loading (modern skeleton)
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // ❌ Empty state (modern UX)
  if (announcements.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">📭 No announcements yet</p>
        <p className="text-sm">You’ll see updates here</p>
      </div>
    );
  }

  return (
    <div className="w-5xl mx-auto py-12">

      {/* 🔥 Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent ">
          📢 Announcements
        </h2>

        <span className="text-sm text-gray-400">
          {announcements.length} updates
        </span>
      </div>

      {/* 🚀 Grid layout (modern SaaS style) */}
      <div className="grid md:grid-cols-1 gap-10">

        {announcements.map((a) => (
          <div
            key={a._id}
            className="group relative rounded-2xl p-px bg-linear-to-r from-indigo-500/30 to-purple-500/30 hover:from-indigo-500 hover:to-purple-500 transition"
          >
            {/* Card */}
            <div className="bg-white/80  backdrop-blur-md rounded-2xl p-5 h-full transition group-hover:scale-[1.02]">

              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={a.authorImage}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    {a.authorName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Badge */}
                {!a.isRead && (
                  <span className="ml-auto text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                {a.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {a.description}
              </p>

              {/* Footer */}
              <div className="mt-4 text-xs text-gray-400 flex justify-between items-center">
                <span>Announcement</span>
                <span className="group-hover:text-indigo-500 transition">
                  Read →
                </span>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Announcements;