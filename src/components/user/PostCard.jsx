import { motion } from "framer-motion";

const PostCard = ({ post }) => {
  const {
    title,
    description,
    image,
    author,
    tag,
    createdAt,
    commentsCount = 0,
    upVote = 0,
    downVote = 0,
  } = post;

  const totalVote = upVote - downVote;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white/70 backdrop-blur-lg mt-6 rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl"
    >
      {/* IMAGE */}
      {image && (
        <div className="overflow-hidden h-40">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        {/* AUTHOR + TIME */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={author?.image}
              alt="author"
              className="w-9 h-9 rounded-full"
            />
            <p className="text-sm text-gray-600 font-medium">
              {author?.name}
            </p>
          </div>

          {/* TIME */}
          <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
          {title}
        </h3>

        {/* TAG */}
        {tag && (
          <p className="text-xs text-blue-500 font-medium">
            #{tag}
          </p>
        )}

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {description}
        </p>

        {/* STATS */}
        <div className="flex justify-between items-center text-sm pt-2 border-t">

          {/* COMMENTS */}
          <span className="text-gray-500">
            💬 {commentsCount}
          </span>

          {/* VOTES */}
          <div className="flex gap-3">
            <span className="text-green-600">👍 {upVote}</span>
            <span className="text-red-500">👎 {downVote}</span>
            <span className="font-semibold text-blue-600">
              ⭐ {totalVote}
            </span>
          </div>
        </div>
      </div>

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
    </motion.div>
  );
};

export default PostCard;