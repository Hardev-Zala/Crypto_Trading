// src/components/Step9IncomeProof.js
import React, { useState } from "react";

const Step9IncomeProof = ({ onNext }) => {
  const [form16, setForm16] = useState(null);
  const [salarySlips, setSalarySlips] = useState(null);
  const [itr, setItr] = useState(null);
  const [bankStatements, setBankStatements] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ form16, salarySlips, itr, bankStatements });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Income Proof</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Form 16
          </label>
          <input
            type="file"
            onChange={(e) => setForm16(e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Salary Slips
          </label>
          <input
            type="file"
            onChange={(e) => setSalarySlips(e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Income Tax Returns (ITR)
          </label>
          <input
            type="file"
            onChange={(e) => setItr(e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Bank Statements
          </label>
          <input
            type="file"
            onChange={(e) => setBankStatements(e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

export default Step9IncomeProof;
