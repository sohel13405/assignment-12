import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from '../../assets/signup.json'
import Navbar from "../../components/shared/navbar/Navbar";
import Footer from "../../components/shared/footer/Footer";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { imageUploadToImgbb, saveUserInDb } from "../../api/utils";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
    const { createUser, user, setUser, updateUserProfile, signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate]);

    const handleRegister = async e => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const image = form?.image?.files[0];
        // imageUrl response from imgbb
        const imageUrl = await imageUploadToImgbb(image)

        try {
            // user registration
            const result = await createUser(email, password)
            // save user name and profile photo
            await updateUserProfile(name, imageUrl)
            setUser(result.user)

            console.log(result);

            const userData = {
                name,
                email,
                image: imageUrl,
            }
            // save user data in db
            await saveUserInDb(userData)
            toast.success('your account created successfully')
        }
        catch (error) {
            console.log(error);
            toast.error(error?.message)
        }


    }
    // handle Google signIn
     const handleGoogleSignIn = async () =>{
          try{
          const result =  await signInWithGoogle()
            const userData = {
              name: result?.user?.displayName,
              email: result?.user?.email,
              image: result?.user?.photoURL,
            };
            await saveUserInDb(userData);
            
          toast.success('Logged in successfully')
          }
          catch(err){
            console.log(err);
            toast.error('Login faild')
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

                <div className="pb-10">

                    <div className="w-96 max-w-md bg-[#37353E] shadow-lg rounded-xl p-8 ">

                        {/* Title */}
                        <h2 className="text-3xl font-bold text-center mb-6 text-white">
                            Create Account
                        </h2>

                        {/* Form */}
                        <form onSubmit={handleRegister} className="space-y-4">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-white">
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#69b7dd] text-gray-100"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-white">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#69b7dd] text-gray-100"
                                />
                            </div>

                            {/* Profile Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-white">
                                    photo Url
                                </label>
                                <input
                                    name="image"
                                    type="file"
                                    className="w-full border rounded-lg px-4 py-2 text-gray-100"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-white">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#69b7dd] text-gray-100"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-white">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#69b7dd] text-gray-100"
                                />
                            </div>

                            {/* Button */}
                            <button

                                type="submit"
                                className="w-full bg-[#4494bc] text-white py-2 rounded-lg hover:bg-[#69b7dd] transition"
                            >
                                Register
                            </button>

                        </form>

                        {/* Login Link */}
                        <p className="text-center text-sm mt-4 text-gray-100">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-[#4494bc] font-medium hover:underline">
                                SignIn
                            </Link>
                        </p>
                    {/* google Login */}
                    <div className="space-y-3 mt-4">

                        <button onClick={handleGoogleSignIn}  className="w-full flex items-center justify-center gap-3  py-2 rounded-lg hover:bg-gray-100 transition bg-[#4494bc] text-white hover:text-black">
                            <FaGoogle className="text-red-500" />
                            Continue with Google
                        </button>

                        {/* <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition">
                                                <FaGithub />
                                                Continue with GitHub
                                            </button> */}

                    </div>

                    </div>
                    

                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default SignUp;