import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from "../utils/api";

// Load Stripe with the publishable key
const stripePromise = loadStripe(
  "pk_test_51QhOBnFYhrr8u2JT9HT7da0JuIC5lOuvpuEj7cL6IcY9jjB0SW0wesCa6LkDIzdz1UiNdROYr7Z3roEL6ByZChje00Lah8WnNx"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(""); // Dynamic amount input

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      // Create a payment intent with the dynamic amount
      const { data } = await api.post("/stripe/payment-intent", {
        amount: parseInt(amount, 10) * 100, // Convert dollars to cents
        currency: "usd",
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else if (paymentIntent.status === "succeeded") {
        setMessage({ type: "success", text: "Payment successful!" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Payment failed. Please try again." });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Complete Your Payment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (in USD)
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Details
            </label>
            <CardElement
              className="p-3 border border-gray-300 rounded-md"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            disabled={!stripe || !elements || !amount || isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-3 rounded-md text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;
