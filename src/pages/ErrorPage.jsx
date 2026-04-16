
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">

      {/* Floating Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative z-10 max-w-xl w-full mx-4 p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 border border-white/20">
            <FaExclamationTriangle className="text-white text-3xl" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-6xl font-extrabold text-white tracking-wide mb-3">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            <FaArrowLeft />
            Back Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
          >
            Reload Page
          </button>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="absolute bottom-4 text-xs text-gray-500 tracking-wide">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  );
}
export default ErrorPage;