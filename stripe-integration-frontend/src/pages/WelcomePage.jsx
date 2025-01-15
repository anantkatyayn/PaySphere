import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-5xl w-full p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Welcome to PaySphere
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Revolutionizing payments with seamless integrations for developers. Easily manage payments with
              <span className="font-bold text-white"> Stripe</span> and generate
              <span className="font-bold text-white"> UPI QR codes</span> for effortless transactions.
            </p>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Easy Configuration",
                description: "Set up Stripe API keys and manage your payment settings effortlessly.",
                color: "bg-blue-500",
                icon: "fas fa-cogs",
              },
              {
                title: "Card Payments",
                description: "Accept secure card payments powered by Stripe.",
                color: "bg-green-500",
                icon: "fas fa-credit-card",
              },
              {
                title: "UPI Payments",
                description: "Generate QR codes for instant UPI transactions.",
                color: "bg-purple-500",
                icon: "fas fa-qrcode",
              },
              {
                title: "Secure Transactions",
                description: "Leverage advanced security for peace of mind.",
                color: "bg-yellow-500",
                icon: "fas fa-shield-alt",
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${feature.color} text-white`}>
                  <i className={`${feature.icon} text-lg`}></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
                  <p className="text-gray-400 mt-2">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              className="px-8 py-4 text-lg font-semibold text-gray-900 bg-gradient-to-r from-blue-400 to-teal-400 rounded-lg shadow-md hover:scale-105 transition transform"
              onClick={() => navigate("/payment")}
            >
              Start Payment
            </button>
            <button
              className="px-8 py-4 text-lg font-semibold text-white border border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-700 transition"
              onClick={() => navigate("/config")}
            >
              Configure Settings
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-6 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <img
              src="/anant.png" 
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="text-white font-bold text-lg">Anant Katyayn</h4>
              <p className="text-sm">PaySphere - v1.0.0</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="https://github.com/anantkatyayn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com/in/anantkatyayn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="mailto:anantkatyayn112@gmail.com"
              className="text-gray-400 hover:text-white transition"
            >
              <i className="fas fa-envelope text-2xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
