import { FaSearch } from "react-icons/fa";
import banner from '../../assets/banner.png';
import Lottie from "lottie-react";
import icon from '../../assets/social.json';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Banner = ({ setSearchQuery }) => {

    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 500); // 🔥 key part
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // 🔍 LIVE SEARCH API
    const { data: results = [] } = useQuery({
        queryKey: ["search", debouncedSearch],
        enabled: !!debouncedSearch,
        queryFn: async () => {
            const res = await axiosSecure.get(`/search?query=${debouncedSearch}`);
            return res.data;
        },
    });

    const handleSearch = () => {
        if (!searchText.trim()) return;

        setSearchQuery(searchText); // 🔥 key line
    };

    return (
        <section
            className="w-full h-180 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div className="max-w-7xl mx-auto px-6 py-10 lg:flex items-center justify-between space-y-6">

                <div className="text-white space-y-7">

                    <p className="text-xl">Converso is a dynamic discussion platform designed to help people connect, collaborate, and learn from each other. Discover topics you love, engage in conversations, and grow your knowledge every day.</p>

                    <h1 className="text-5xl font-bold">
                        Converso Community
                    </h1>

                    {/* 🔍 SEARCH */}
                    <div className="relative w-64">

                        <div className="flex items-center bg-white rounded-full overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search discussions..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="flex-1 px-4 py-2 text-gray-700 outline-none"
                            />

                            <button
                                onClick={handleSearch}
                                className="bg-[#186b95] px-4 py-2 text-white"
                            >
                                <FaSearch />
                            </button>
                        </div>

                        {/* 🔥 LIVE RESULTS DROPDOWN */}

                        {debouncedSearch && (
                            <div className="absolute top-12 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-50">

                                {results.length > 0 ? (
                                    results.slice(0, 5).map(item => (
                                        <div
                                            key={item._id}
                                            onClick={() => {
                                                setSearchText(item.tag);
                                                setSearchQuery(item.tag); // 🔥 THIS LINE DOES THE MAGIC
                                            }}
                                            className="p-3 border-b hover:bg-blue-50 cursor-pointer transition"
                                        >
                                            <p className="text-sm font-semibold text-gray-800">
                                                {item.title}
                                            </p>

                                            <p className="text-xs text-blue-500">
                                                #{item.tag}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-3 text-sm text-gray-500">
                                        No results found
                                    </p>
                                )}

                            </div>
                        )}

                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex justify-center">
                    <Lottie animationData={icon} loop className="w-80 md:w-96 lg:w-130" />
                </div>

            </div>
        </section>
    );
};

export default Banner;