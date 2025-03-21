// src/components/Step2MobileOTP.js
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Step2MobileOTP = ({ mobileNumber, onNext }) => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState(localStorage.getItem("phone"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3500/api/v1/auth/verify-otp/",
      {
        phoneNumber: phone,
        phoneOTP: otp,
      }
    );
    if (response.status === 200) {
      console.log("OTP verified successfully");
      toast.success("OTP verified successfully");
      onNext(otp);
    } else {
      console.log(response.data.message);
      toast.error("OTP not verified");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Mobile OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            OTP Sent to {mobileNumber}
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

export default Step2MobileOTP;
