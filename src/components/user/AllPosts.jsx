import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { Link } from "react-router";
import PostCard from "./PostCard";

const AllPosts = ({ sort, page, setPage, selectedTag }) => {
  const axiosSecure = useAxiosSecure();
  const limit = 5;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", sort, page, selectedTag],
    queryFn: async () => {
      let url = `/posts?page=${page}&limit=${limit}&sort=${sort}`;

      if (selectedTag) {
        url += `&tag=${selectedTag}`;
      }

      const { data } = await axiosSecure.get(url);
      return data;
    },
  });

  return (
    <div className="max-w-2xl mx-auto">

      {/* 🔷 HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b mb-4 px-4 py-3 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          📰 News Feed
        </h2>
        <p className="text-xs text-gray-500">
          Discover latest & trending posts
        </p>
      </div>

      {/* 🔷 LOADING SKELETON */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-5 rounded-xl shadow">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* 🔷 POSTS */}
          <div className="space-y-5">
            {posts.map((post) => (
              <Link key={post._id} to={`/postdetails/${post._id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>

          {/* 🔷 PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm disabled:opacity-50"
            >
              ⬅ Prev
            </button>

            <span className="text-sm font-medium text-gray-600">
              Page {page}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 text-sm"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllPosts;