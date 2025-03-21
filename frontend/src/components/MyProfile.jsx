import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularWithValueLabel from "./AuthLoader/CircularProgressWithLabel";

const MyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/auth/fetch-profile",
          { withCredentials: true }
        );
        setProfile(response.data.Profile); // Assuming the backend returns the profile data in `response.data.Profile`
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        <CircularWithValueLabel />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      {/* Main Card */}
      <div className="w-full max-w-3xl bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700 border-opacity-30 my-10">
        {/* Header Section */}
        <div className="relative p-8 bg-gradient-to-r from-purple-600 to-blue-600">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 top-6 text-white hover:text-gray-200 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h2 className="text-3xl font-bold text-white text-center">
            Profile Details
          </h2>
          <p className="text-sm text-gray-200 text-center mt-2">
            Your personal and financial information at a glance.
          </p>
        </div>

        {/* Profile Details Section */}
        <div className="p-8 space-y-6">
          <DetailItem
            icon="📧"
            label="Email"
            value={profile.email}
            color="text-purple-400"
          />
          <DetailItem
            icon="📱"
            label="Phone Number"
            value={profile.phone}
            color="text-blue-400"
          />
          <DetailItem
            icon="💍"
            label="Marital Status"
            value={profile.marriedStatus}
            color="text-pink-400"
          />
          <DetailItem
            icon="💰"
            label="Annual Income"
            value={profile.annualIncome}
            color="text-green-400"
          />
          <DetailItem
            icon="📈"
            label="Trading/Investing Since"
            value={profile.TradingOrInvesting}
            color="text-yellow-400"
          />
          <DetailItem
            icon="👨‍👩‍👧‍👦"
            label="Nominee Name"
            value={profile.NomineeName}
            color="text-indigo-400"
          />
          <DetailItem
            icon="🎂"
            label="Nominee Date of Birth"
            value={profile.NomineeDOB}
            color="text-red-400"
          />
          <DetailItem
            icon="👫"
            label="Relationship with Nominee"
            value={profile.RelationshipWithNominee}
            color="text-teal-400"
          />
          <DetailItem
            icon="🏠"
            label="Nominee Address"
            value={profile.NomineeAddress}
            color="text-orange-400"
          />
          <DetailItem
            icon="💳"
            label="Account Balance"
            value={`$${profile.balance.toLocaleString()}`}
            color="text-green-500"
          />
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-gray-800 bg-opacity-50 flex justify-end"></div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center space-x-6 p-4 bg-gray-700 bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-all duration-300">
      <span className={`text-3xl ${color}`}>{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-xl font-semibold ${color}`}>{value}</p>
      </div>
    </div>
  );
};

export default MyProfile;
