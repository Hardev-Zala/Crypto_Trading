// src/components/Step3Email.js
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Step3Email = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3500/api/v1/auth/gmail-otp",
      { email: email, phone: localStorage.getItem("phone") }
    );
    if (response.data.success) {
      toast.success("OTP sent to your gmail successfully");
      localStorage.removeItem("phone");
      localStorage.setItem("email", email);
      onNext(email);
    } else {
      toast.error("Failed to send OTP to your gmail");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Enter Email Address
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email address"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default Step3Email;
