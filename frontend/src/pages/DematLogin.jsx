import React, { useState } from "react";
// import Step11PINMaking from "../components/validation/Step11PINMaking";
// import axios from "axios";
import toast from "react-hot-toast";
import { useUserAuthStore } from "../store/UserAuth";
import { useNavigate } from "react-router-dom";

const DematLogin = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [pin, setPin] = useState("");
  const { login } = useUserAuthStore();
  const navigate = useNavigate();

  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setStep(2);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (pin.length === 6) {
      // alert("Login Successful!");
      login(mobileNumber, pin);
      navigate("/");
    } else {
      alert("Please enter a valid 6-digit PIN.");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-transform duration-500">
        {/* Step Indicator */}
        <div className="flex justify-center mb-4 space-x-4">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
              step === 1 ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            1
          </div>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
              step === 2 ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            2
          </div>
        </div>

        {/* Step Title */}
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
          {step === 1 ? "Mobile Verification" : "Your PIN"}
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className={`bg-indigo-600 h-2 rounded-full transition-all duration-500 ${
              step === 1 ? "w-1/2" : "w-full"
            }`}
          ></div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Demat Account Login
        </h1>

        {/* Step 1: Mobile Verification */}
        {step === 1 && (
          <form onSubmit={handleMobileNumberSubmit}>
            <div className="relative mb-6">
              <label className="block text-gray-600 text-sm mb-2">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-indigo-500 transition-colors">
                <div className="border-r pr-2 flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png"
                    alt="India Flag"
                    className="w-5 h-4 mr-1"
                  />
                  <select className="text-sm outline-none rounded-lg h-full">
                    <option>IN</option>
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="(555) 000-000"
                  className="w-full pl-3 py-2 appearance-none bg-transparent outline-none"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md text-base font-semibold hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          </form>
        )}

        {/* Step 2: PIN Verification */}
        {step === 2 && (
          <form onSubmit={handlePinSubmit}>
            <div className="relative mb-6">
              <label className="block text-gray-600 text-sm mb-2">
                6-Digit PIN
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-indigo-500 transition-colors">
                <input
                  type="password"
                  placeholder="Enter your PIN"
                  className="w-full pl-3 py-2 appearance-none bg-transparent outline-none"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  maxLength={6}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-base font-semibold hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md text-base font-semibold hover:bg-indigo-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DematLogin;
