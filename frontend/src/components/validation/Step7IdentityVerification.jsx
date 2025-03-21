// src/components/Step7IdentityVerification.js
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Step7IdentityVerification = ({ onNext }) => {
  const [panNumber, setPanNumber] = useState("");
  const [dob, setDob] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [Gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/auth/identity-verify/",
        {
          panNumber: panNumber,
          email: localStorage.getItem("email"),
          dob: dob,
          aadharNumber: aadharNumber,
          Gender: Gender,
          address: address,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data.message);
        onNext({ panNumber, dob, aadharNumber, Gender, address });
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(`error in verifying otp :- ${error}`);
      toast.error("Failed to verify Identity");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Identity Verification
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            PAN Number
          </label>
          <input
            type="text"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your PAN number"
            required
          />
        </div>
        <div className="flex flex-col space-y-2 mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          {["Male", "Female", "Other"].map((gender) => (
            <label key={gender} className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value={gender.toLowerCase()}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4 border-gray-300 focus:ring-blue-500 text-blue-600"
              />
              <span className="text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth (as per PAN)
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Aadhar Number
          </label>
          <input
            type="text"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your Aadhar number"
            required
          />
        </div>
        <div className="flex flex-col space-y-2 mb-2">
          <label htmlFor="address" className="text-gray-700 font-medium">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
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

export default Step7IdentityVerification;
