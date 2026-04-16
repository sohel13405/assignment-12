import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../../../assets/logo-converso.png'

const Footer = () => {
  return (
    <footer className="bg-[#D3DAD9] text-gray-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* LOGO + DESCRIPTION */}
        <div className="space-y-4">
          <img className="w-52 " src={logo} alt="" />
          <p className="text-gray-700">
            Connect with amazing people and participate in meaningful discussions in our community.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-[#3281a8] text-gray-700 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-[#1DA1F2] text-gray-700 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-[#E4405F] text-gray-700 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-[#0A66C2] text-gray-700 hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition">Home</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">About</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Membership</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Forum</a></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-700 mb-4">
            Get the latest updates and join our newsletter.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-l-full outline-none text-gray-900"
            />
            <button className="bg-[#3281a8] px-6 py-2 rounded-r-full text-white hover:bg-[#0e4865] transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="mt-12 border-t border-gray-400 pt-6 text-center text-gray-700 text-sm">
        &copy; {new Date().getFullYear()} Converso. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;