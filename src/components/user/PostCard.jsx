import { motion } from "framer-motion";

const PostCard = ({ post }) => {

    const { title, description, image, author } = post;


    return (

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
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
            <div className="p-5 space-y-3 ">

                {/* AUTHOR */}
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

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm line-clamp-3">
                    {description}
                </p>

            </div>

            {/* GLOW EFFECT */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

        </motion.div>
    );
};

export default PostCard;