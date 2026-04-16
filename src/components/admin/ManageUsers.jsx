import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  // ✅ GET USERS
  const { data: users = [] } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?search=${search}`);
      return data;
    },
  });

  // ✅ MAKE ADMIN
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/users/make-admin/${id}`);
    },
    onSuccess: () => {
      toast.success("User is now Admin");
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-4">👥 Manage Users</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by username..."
        className="input input-bordered mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Membership</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>

                <td>{user.name}</td>
                <td>{user.email}</td>

                {/* MAKE ADMIN */}
                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        makeAdminMutation.mutate(user._id)
                      }
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>

                {/* MEMBERSHIP */}
                <td>
                  {user.membership ? (
                    <span className="text-blue-600 font-semibold">
                      Premium
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      Free
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ManageUsers;