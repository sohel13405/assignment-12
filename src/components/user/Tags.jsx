import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const Tags = ({ setSelectedTag }) => {
  const axiosSecure = useAxiosSecure();
  const [activeTag, setActiveTag] = useState(null);

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tags");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-10 sticky top-20 ">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          # Tags
        </span>
      </h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => {
          const isActive = activeTag === tag.name;

          return (
            <button
              key={index}
              onClick={() => {
                setSelectedTag(tag.name);
                setActiveTag(tag.name);
              }}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
              
              ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105"
                  : "bg-white/60 backdrop-blur-md text-gray-700 border border-gray-200"
              }

              hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white
              hover:shadow-md hover:scale-105 active:scale-95
              `}
            >
              {/* Tag Name */}
              <span className="mr-1">#{tag.name}</span>

              {/* Count */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/20"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tag.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;