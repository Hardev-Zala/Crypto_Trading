// src/components/Step1MobileNumber.js
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Step1MobileNumber = ({ onNext }) => {
  const [mobileNumber, setMobileNumber] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (/^\d+$/.test(mobileNumber) === false) {
      toast.error("Mobile number should contain only numbers");
    } else {
      if (mobileNumber.length !== 10) {
        toast.error("Please enter a valid mobile number");
      } else if (mobileNumber.length === 10) {
        const response = await axios.post(
          "http://localhost:3500/api/v1/auth/send-otp/",
          {
            phoneNumber: mobileNumber,
          }
        );
        if (response.status === 200) {
          console.log("OTP sent successfully");
          toast.success("OTP sent successfully");
          localStorage.setItem("phone", mobileNumber);
        } else {
          console.log(response.data.message);
          toast.error("OTP not sent");
        }
        onNext(mobileNumber);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Enter Mobile Number
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your mobile number"
            required
          />
          <div className="text-gray-800/50 text-sm m-2">
            Please don't refersh the page
          </div>
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

export default Step1MobileNumber;
