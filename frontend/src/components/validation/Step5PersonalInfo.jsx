// src/components/Step5PersonalInfo.js
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const Step5PersonalInfo = ({ onNext }) => {
  const [maritalStatus, setMaritalStatus] = useState("");
  const [tradingSince, setTradingSince] = useState("");
  const [occupation, setOccupation] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");

  const tradingSinceOptions = [
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "Not Trading/Investing Yet",
  ];
  const occupationOptions = [
    "Engineer",
    "Doctor",
    "Teacher",
    "Business Owner",
    "Student",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/auth/personal-info/",
        {
          maritalStatus: maritalStatus,
          tradingSince: tradingSince,
          occupation: occupation,
          annualIncome: annualIncome,
          email: localStorage.getItem("email"),
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        onNext({ maritalStatus, tradingSince, occupation, annualIncome });
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
      <h2 className="text-2xl font-bold mb-6 text-center">
        Personal Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Marital Status
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Single"
                checked={maritalStatus === "Single"}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Single</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                value="Married"
                checked={maritalStatus === "Married"}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Married</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Trading/Investing Since
          </label>
          <select
            value={tradingSince}
            onChange={(e) => setTradingSince(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Year</option>
            {tradingSinceOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Occupation
          </label>
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Occupation</option>
            {occupationOptions.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Annual Income
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="< 5L"
                checked={annualIncome === "< 5L"}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Less than 5L</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                value="5L-10L"
                checked={annualIncome === "5L-10L"}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">5L - 10L</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                value="> 10L"
                checked={annualIncome === "> 10L"}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">More than 10L</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Step5PersonalInfo;
