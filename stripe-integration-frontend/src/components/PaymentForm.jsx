import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../utils/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("card"); // Default to card
  const [qrCode, setQrCode] = useState(""); // For UPI QR code
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle card payments
  const handleCardPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.post("/stripe/payment-intent", {
        amount: parseInt(amount, 10) * 100,
        currency: "inr",
      });
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setPaymentStatus({ status: "error", message: error.message });
      } else if (paymentIntent?.status === "succeeded") {
        setPaymentStatus({ status: "success", message: "Card payment successful!" });
      } else {
        setPaymentStatus({ status: "error", message: "Payment could not be completed. Please try again." });
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setPaymentStatus({ status: "error", message: "Failed to process card payment. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle UPI payments
  const handleUPIPayment = async () => {
    setIsLoading(true);

    try {
      const { data } = await api.post("/payments/upi", { amount: parseInt(amount, 10) });
      setQrCode(data.qrCode); // Display QR Code
      setPaymentStatus({ status: "info", message: "Scan the QR code to complete payment." });
    } catch (err) {
      setPaymentStatus({ status: "error", message: "Failed to generate QR code." });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 dark:bg-gray-900">
      <div
        className={`flex w-full max-w-6xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md ${
          paymentMode === "upi" ? "lg:flex-row" : "flex-col"
        }`}
      >
        {/* Left Section: Form */}
        <div
          className={`flex flex-col justify-between ${
            paymentMode === "upi" ? "w-full lg:w-1/2" : "w-full"
          }`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Complete Your Payment</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount (in INR)</label>
            <input
              type="number"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none text-lg"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Mode</label>
            <select
              className="w-full p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none text-lg"
              value={paymentMode}
              onChange={(e) => {
                setPaymentMode(e.target.value);
                setQrCode(""); // Clear QR code if switching from UPI
                setPaymentStatus(null); // Clear any previous messages
              }}
            >
              <option value="card">Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>
          {paymentMode === "card" && (
            <form onSubmit={handleCardPayment}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Details</label>
                <CardElement className="p-4 border border-gray-300 rounded-md text-lg" />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition text-lg"
                disabled={!stripe || !elements || !amount || isLoading}
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          )}
          {paymentMode === "upi" && (
            <button
              onClick={handleUPIPayment}
              className="w-full py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition text-lg"
              disabled={!amount || isLoading}
            >
              {isLoading ? "Generating QR Code..." : "Generate QR Code"}
            </button>
          )}
          {paymentStatus && (
            <div
              className={`mt-6 p-4 rounded-md text-lg ${
                paymentStatus.status === "success"
                  ? "bg-green-50 text-green-600"
                  : paymentStatus.status === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {paymentStatus.message}
            </div>
          )}
        </div>

        {/* Right Section: UPI Only */}
        {paymentMode === "upi" && (
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0">
            {qrCode ? (
              <div className="text-center">
                <img src={qrCode} alt="UPI QR Code" className="mx-auto w-72 h-72" />
                <p className="text-gray-700 dark:text-gray-300 mt-6">Scan this QR code to complete payment.</p>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center">
                <p>No QR code generated yet. Enter details and click "Generate QR Code".</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentFormWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentFormWrapper;
