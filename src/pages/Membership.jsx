import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/form/CheckoutForm";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Membership = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔥 get DB user
  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const isMember = dbUser?.isMember === true;

  // ===============================
  // ✅ GOLD MEMBER UI
  // ===============================
  if (isMember || success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 p-4">

        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">

          {/* ICON */}
          <div className="text-6xl mb-4">🥇</div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-gray-800">
            You're a Gold Member!
          </h1>

          {/* SUBTEXT */}
          <p className="text-gray-600 mt-3">
            Enjoy all premium features and exclusive access.
          </p>

          {/* FEATURES */}
          <div className="mt-6 space-y-2 text-left text-sm text-gray-700">
            <p>✅ Unlimited Posts</p>
            <p>✅ Priority Features</p>
            <p>✅ Gold Badge on Profile</p>
            <p>✅ Premium Content Access</p>
          </div>

          {/* BADGE CARD */}
          <div className="mt-6 bg-yellow-100 border border-yellow-300 rounded-xl p-4">
            <p className="font-semibold text-yellow-700">
              Membership Status: ACTIVE 🟡
            </p>
          </div>

        </div>
      </div>
    );
  }

  // ===============================
  // 🔥 NON-MEMBER UI (UPGRADE)
  // ===============================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="text-white space-y-6">

          <h1 className="text-4xl font-bold">
            Upgrade to Gold 🚀
          </h1>

          <p className="opacity-90">
            Unlock premium features, stand out in the community,
            and enjoy a better experience.
          </p>

          <ul className="space-y-2">
            <li>✨ Gold badge</li>
            <li>🚀 Unlimited posts</li>
            <li>⚡ Faster features</li>
            <li>🔒 Premium access</li>
          </ul>

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Gold 🟡
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl text-white shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Gold Plan
          </h2>

          <div className="text-center mb-6">
            <span className="text-5xl font-bold">৳500</span>
            <p className="opacity-70">One-time</p>
          </div>

          <p className="text-center text-sm opacity-80">
            Pay once. Enjoy forever.
          </p>
        </div>

      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Payment 💳
            </h2>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                onSuccess={() => {
                  setSuccess(true);
                  setOpen(false);
                  refetch(); // 🔥 refresh user
                }}
              />
            </Elements>

          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;