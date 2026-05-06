import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({onSuccess}) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            // 🔥 STEP 1: Create Payment Intent
            const res = await axiosSecure.post("/create-payment-intent", {
                price: 500,
            });

            const clientSecret = res.data.clientSecret;

            // 🔥 STEP 2: Confirm Payment
            const { error, paymentIntent } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            email: user?.email || "anonymous",
                        },
                    },
                });

            // ❌ Handle Stripe error
            if (error) {
                console.log("Stripe Error:", error);
                Swal.fire("Payment Failed", error.message, "error");
                return;
            }

            // ✅ Payment Success
            if (paymentIntent?.status === "succeeded") {
                console.log("Payment success");

                const email = user?.email;

                if (!email) {
                    console.log("No email found");
                    return;
                }

                const res = await axiosSecure.patch(
                    `/users/membership/${email}`
                );

                console.log("Membership update response:", res.data);

                if (res.data.modifiedCount > 0) {
                    alert("You are now Gold 🟡");
                    onSuccess()

                    // refresh user UI
                    window.location.reload();
                } else {
                    alert("Payment success but DB not updated");
                }
            }
        } catch (err) {
            console.log("Checkout Error:", err);
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* 💳 CARD INPUT */}
            <div className="p-3 border rounded bg-white">
                <CardElement />
            </div>

            {/* 🔘 BUTTON */}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-yellow-300 to-yellow-500 hover:scale-105 transition-all duration-300 shadow-lg"
            >
                {loading ? "Processing..." : "Pay ৳500"}
            </button>
        </form>
    );
};

export default CheckoutForm;