import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ GET MY POSTS
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["my-posts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/posts/user?email=${user.email}`
      );
      return data;
    },
  });

  // ✅ DELETE POST
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries(["my-posts"]);
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <h2 className="text-3xl font-bold mb-6 text-center">
        📌 My Posts
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">

          {/* HEAD */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Votes</th>
              <th>Comments</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => {

              const voteCount =
                (post.upVote || 0) - (post.downVote || 0);

              return (
                <tr key={post._id}>

                  {/* TITLE */}
                  <td className="font-medium">
                    {post.title}
                  </td>

                  {/* VOTES */}
                  <td>
                    👍 {voteCount}
                  </td>

                  {/* COMMENT BUTTON */}
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/comments/${post._id}`)
                      }
                      className="btn btn-sm"
                    >
                      💬 Comments
                    </button>
                  </td>

                  {/* DELETE BUTTON */}
                  <td>
                    <button
                      onClick={() => {
                        const confirmDelete = confirm(
                          "Are you sure you want to delete?"
                        );

                        if (confirmDelete) {
                          deleteMutation.mutate(post._id);
                        }
                      }}
                      className="btn btn-sm btn-error"
                    >
                      🗑️ Delete
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default MyPosts;