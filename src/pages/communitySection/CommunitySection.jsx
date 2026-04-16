import { FaUsers, FaComments, FaLayerGroup } from "react-icons/fa";

const CommunitySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-20 items-center">

      {/* LEFT SIDE */}
      <div className="space-y-5">
        <h4 className="text-[#3281a8] text-2xl font-semibold uppercase">
          What We Do
        </h4>

        <h2 className="text-4xl font-bold text-gray-800">
          Why Join Our Converso from Social Network?
        </h2>

        <p className="text-gray-600">
          Join thousands of members sharing knowledge and building meaningful
          conversations in the Converso community.
        </p>

        <button className="bg-[#3281a8] text-white px-6 py-3 rounded-full hover:bg-[#0e4865] transition">
          Join Our Community
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative h-[450px]">

        {/* CURVED SVG LINE */}
        <svg
          className="absolute left-12 top-0 w-[280px] h-full"
          viewBox="0 0 300 450"
          fill="none"
        >
          <path
            d="M50 40 C180 120, 180 260, 50 380"
            stroke="#d1d5db"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>

        {/* ITEM 1 */}
        <div className="absolute left-12 top-6 flex items-start gap-6 group">
          <div className="bg-gray-100 rounded-full p-10 text-gray-600 group-hover:text-white group-hover:bg-[#5f9bb9] transition">
            <FaUsers size={28} />
          </div>
          <div className="max-w-xs transition-colors group-hover:text-[#5f9bb9]">
            <h3 className="font-semibold text-lg">Meet Great People</h3>
            <p className="text-gray-600 text-sm">
              When an unknown printer took a galley of scrambled it to make a
              type specimen. It has survived not only.
            </p>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="absolute right-0 top-44 flex items-start gap-6 group">
          <div className="bg-gray-100 rounded-full p-10 text-gray-600 group-hover:text-white group-hover:bg-[#5f9bb9] transition">
            <FaComments size={28} />
          </div>
          <div className="max-w-xs transition-colors group-hover:text-[#5f9bb9]">
            <h3 className="font-semibold text-lg">Forum Discussion</h3>
            <p className="text-gray-600 text-sm">
              When an unknown printer took a galley of scrambled it to make a
              type specimen. It has survived not only.
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="absolute left-12 bottom-0 flex items-start gap-6 group">
          <div className="bg-gray-100 rounded-full p-10 text-gray-600 group-hover:text-white group-hover:bg-[#5f9bb9] transition">
            <FaLayerGroup size={28} />
          </div>
          <div className="max-w-xs transition-colors group-hover:text-[#5f9bb9]">
            <h3 className="font-semibold text-lg">Active Groups</h3>
            <p className="text-gray-600 text-sm">
              When an unknown printer took a galley of scrambled it to make a
              type specimen. It has survived not only.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default CommunitySection;