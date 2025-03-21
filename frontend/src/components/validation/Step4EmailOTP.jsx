// src/components/Step4EmailOTP.js
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Step4EmailOTP = ({ email, onNext }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/auth/verify-gmail-otp/",
        {
          otp: otp,
          email: localStorage.getItem("email"),
        }
      );
      if (response.data.success) {
        console.log("OTP verified successfully");
        toast.success("OTP verified successfully");
        onNext(otp);
      } else {
        console.log("Failed to verify OTP");
        toast.error("Failed to verify OTP");
      }
    } catch (error) {
      console.log(`error in verifying otp :- ${error}`);
      toast.error("Failed to verify OTP");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Email OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            OTP Sent to {email}
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter OTP"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Step4EmailOTP;
