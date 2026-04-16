import React, { useState } from "react";
import Tags from "./Tags";
import AllPosts from "./AllPosts";
import TrendingPosts from "./TrendingPosts";

const Posts = () => {
  // ✅ STATE (kept here - parent controls everything)
  const [sort, setSort] = useState("latest");
  const [selectedTag, setSelectedTag] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="max-w-full mx-auto px-12  py-10">

      {/* ✅ GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* LEFT - TAGS */}
        <div className="lg:col-span-2">
          <Tags setSelectedTag={setSelectedTag} />
        </div>

        {/* MIDDLE - POSTS */}
        <div className="lg:col-span-7">

          {/* SORT BUTTONS */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => {
                setSort("latest");
                setPage(1);
              }}
              className={`btn btn-sm ${sort === "latest" ? "btn-primary" : ""}`}
            >
              🕒 Latest
            </button>

            <button
              onClick={() => {
                setSort("popular");
                setPage(1);
              }}
              className={`btn btn-sm ${sort === "popular" ? "btn-primary" : ""}`}
            >
              🔥 Popular
            </button>
          </div>

          {/* ALL POSTS */}
          <AllPosts
            sort={sort}
            page={page}
            setPage={setPage}
            selectedTag={selectedTag}
          />
        </div>

        {/* RIGHT - TRENDING */}
        <div className="lg:col-span-3 ">
          <TrendingPosts />
        </div>

      </div>
    </div>
  );
};

export default Posts;