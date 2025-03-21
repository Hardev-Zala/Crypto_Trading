import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Step11PINMaking from "./Step11PINMaking";

const Step11PINConfirm = () => {
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();

  const handleOTPComplete = async (otp) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/auth/create-pin-pattern",
        {
          email: localStorage.getItem("email"),
          passcode: otp,
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}. Redirecting...`, {
          duration: 3000,
        });
        setCountdown(3); // Start countdown from 3
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(`error in verifying otp :- ${error}`);
      toast.error("Failed to verify OTP");
    }
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transition-transform transform hover:scale-105">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Create 6 Digit Strong Password
        </h1>
        <Step11PINMaking length={6} onComplete={handleOTPComplete} />

        {countdown !== null && (
          <div className="mt-6">
            <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-1000"
                style={{ width: `${(3 - countdown) * 33.33}%` }}
              ></div>
            </div>
            <div
              className={`text-center text-gray-600 font-medium text-lg mt-2 transition-opacity duration-1000 ${
                countdown === 0 ? "opacity-0" : "opacity-100"
              }`}
            >
              Redirecting in... {countdown}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step11PINConfirm;
