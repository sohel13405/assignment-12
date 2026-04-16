import React, { useState } from "react";
import Select from "react-select";

const AddPostForm = ({ handleFormSubmit, isUploading, user }) => {

  const [tag, setTag] = useState(null);

  const tagOptions = [
    { value: "technology", label: "Technology" },
    { value: "programming", label: "Programming" },
    { value: "web-development", label: "Web Development" },
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
  ];

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-semibold mb-5 text-center">
        Add New Post
      </h2>

      <form
        onSubmit={(e) => handleFormSubmit(e, tag)}
        className="space-y-4"
      >

        {/* Author Image */}
        <div>
          <label className="block mb-1 font-medium">Author Image</label>
          <input
            type="text"
            value={user?.photoURL || ""}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block mb-1 font-medium">Author Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Author Email */}
        <div>
          <label className="block mb-1 font-medium">Author Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block mb-1 font-medium">Post Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">
            Post Description
          </label>

          <textarea
            name="description"
            rows="4"
            className="textarea textarea-bordered w-full"
            placeholder="Write your post..."
          ></textarea>
        </div>

        {/* Tag */}
        <div>
          <label className="block mb-1 font-medium">Tag</label>

          <Select
            options={tagOptions}
            value={tag}
            onChange={setTag}
            placeholder="Select Tag"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Post Image</label>
          <input
            type="file"
            name="image"
            className="file-input file-input-bordered w-full"
            
          />
        </div>

        <button className="btn btn-primary w-full">
          {isUploading ? "Saving..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;