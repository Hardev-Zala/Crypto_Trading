// src/components/Step8BankDetails.js
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Step8BankDetails = ({ onNext }) => {
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankStatement, setBankStatement] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/auth/bank-details/",
        {
          ifscCode: ifscCode,
          accountNumber: accountNumber,
          email: localStorage.getItem("email"),
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data.message);
        onNext({ ifscCode, accountNumber, bankStatement });
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Bank Account Details
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            IFSC Code
          </label>
          <input
            type="text"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter IFSC code"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Bank Account Number
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter bank account number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Latest Bank Statement
          </label>
          <input
            type="file"
            onChange={(e) => setBankStatement(e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
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

export default Step8BankDetails;
