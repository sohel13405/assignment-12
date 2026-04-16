import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";


const AddAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    await axiosSecure.post("/announcements", {
      title,
      description,
      authorName: user?.displayName,
      authorImage: user?.photoURL,
    });

    toast.success("🎉 Announcement added!");
    e.target.reset();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg">
            📢
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Create Announcement
          </h2>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl">
          <img
            src={user?.photoURL}
            alt="author"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <p className="text-sm text-gray-500">Author</p>
            <p className="font-medium text-gray-800">
              {user?.displayName}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter announcement title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write your announcement..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-200 shadow-md"
          >
            🚀 Publish Announcement
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddAnnouncement;