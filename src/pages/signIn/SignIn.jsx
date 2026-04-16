import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import Navbar from "../../components/shared/navbar/Navbar";
import Footer from "../../components/shared/footer/Footer";
import icon from '../../assets/login.json'
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SignIn = () => {

    const {signIn,user,signInWithGoogle} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

     useEffect(() => {
      if (user) {
        navigate(from, { replace: true });
      }
    }, [user, from, navigate]);

    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        try{

            const result = await signIn(email, password)
            toast.success('SignIn successfully')
            console.log(result);
        }
        catch (err){
            console.log(err);
            toast.error(err?.message)
        }
    }

    // googleSignIn
    const handleGoogleSignIn = async () =>{

        try{
            const result = await signInWithGoogle() 
            toast.success('SignIn with google successfully')
            console.log(result);
        }
        catch (err){
            console.log(err?.message);
        }

    }

    return (
        <div>
            <Navbar></Navbar>

            <div className="min-h-screen lg:flex items-center  justify-center gap-16 bg-linear-to-br from-[#37353E] to-[#1f1f23] px-4">

                <div className="flex items-center justify-center py-14">
                    <Lottie
                        animationData={icon}
                        loop={true}
                        className="w-52 md:w-72 lg:w-96"
                    />
                </div>

                <div >

                    <div className="w-96 max-w-md bg-[#37353E] rounded-2xl shadow-xl p-8">

                        {/* Title */}
                        <h2 className="text-3xl font-bold text-center text-white mb-2">
                            Welcome Back
                        </h2>

                        <p className="text-center text-gray-100 mb-6">
                            SignIn to your Converso account
                        </p>

                        {/* Login Form */}
                        <form onSubmit={handleSignIn} className="space-y-4">

                            {/* Email */}
                            <div>
                                <label className="text-sm text-white font-medium">Email</label>
                                <input
                                name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#69b7dd] text-gray-100"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium text-white">Password</label>

                                <div className="relative mt-1">
                                    <input
                                    name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#69b7dd] text-gray-100"
                                    />

                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 cursor-pointer text-gray-100"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                <div className="text-right mt-1">
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-[#4494bc] hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#4494bc] text-white py-2 rounded-lg hover:bg-[#69b7dd] transition font-medium"
                            >
                                Login
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="px-3 text-gray-400 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* google Login */}
                        <div className="space-y-3">

                            <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3  py-2 rounded-lg hover:bg-gray-100 transition bg-[#4494bc] text-white hover:text-black">
                                <FaGoogle className="text-red-500" />
                                Continue with Google
                            </button>

                            {/* <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition">
                                <FaGithub />
                                Continue with GitHub
                            </button> */}

                        </div>

                        {/* Register */}
                        <p className="text-center text-white text-sm mt-6">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-[#4494bc] font-medium hover:underline"
                            >
                                SignUp
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

            <Footer></Footer>

        </div>
    );
};

export default SignIn;