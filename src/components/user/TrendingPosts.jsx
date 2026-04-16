// ✅ NEW FILE: TrendingPosts.jsx

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { Link } from "react-router";
import PostCard from "./PostCard";

const TrendingPosts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trending = [] } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/posts/trending");
      return data;
    },
  });

  return (
    <div className="sticky top-20  ">
      <h2 className="text-xl font-bold mb-4 text-center">🔥 Trending</h2>

      <div className="space-y-4">
        {trending.map((post) => (
          <Link key={post._id} to={`/postdetails/${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;