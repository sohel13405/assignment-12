// ✅ NEW FILE: AllPosts.jsx

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { Link } from "react-router";
import PostCard from "./PostCard";

const AllPosts = ({ sort, page, setPage, selectedTag }) => {
  const axiosSecure = useAxiosSecure();
  const limit = 6;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", sort, page, selectedTag],
    queryFn: async () => {
      let url = "";

      if (selectedTag) {
       url = `/posts/by-tag?tag=${selectedTag}&page=${page}&limit=${limit}`;
      } else if (sort === "popular") {
        url = `/posts/popular?page=${page}&limit=${limit}`;
      } else {
        url = `/posts?page=${page}&limit=${limit}`;
      }

      const { data } = await axiosSecure.get(url);
      return data;
    },
  });

console.log(selectedTag);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Posts</h2>

      {/* POSTS */}
      <div className="grid md:grid-cols-1 gap-6">
        {posts.map((post) => (
          <Link key={post._id} to={`/postdetails/${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-sm"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPosts;