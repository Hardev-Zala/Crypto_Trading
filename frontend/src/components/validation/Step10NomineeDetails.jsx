import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Step10NomineeDetails = ({ onNext }) => {
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeDob, setNomineeDob] = useState("");
  const [relationship, setRelationship] = useState("");
  const [nomineeAddress, setNomineeAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/auth/nominee-details",
        {
          nomineeName: nomineeName,
          nomineeDob: nomineeDob,
          relationship: relationship,
          nomineeAddress: nomineeAddress,
          email: localStorage.getItem("email"),
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        onNext({ nomineeName, nomineeDob, relationship, nomineeAddress });
        console.log(response.data.message);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleAddItLater = () => {
    // handle add it later
    onNext({ nomineeName, nomineeDob, relationship, nomineeAddress });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Nominee Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nominee's Full Name
          </label>
          <input
            type="text"
            value={nomineeName}
            onChange={(e) => setNomineeName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter nominee's full name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nominee's Date of Birth
          </label>
          <input
            type="date"
            value={nomineeDob}
            onChange={(e) => setNomineeDob(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Relationship with Nominee
          </label>
          <input
            type="text"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter relationship"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nominee's Address
          </label>
          <textarea
            value={nomineeAddress}
            onChange={(e) => setNomineeAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter nominee's address"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={handleAddItLater}
          className="w-full bg-gray-500 mt-2 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
        >
          I will add nominee later
        </button>
      </form>
    </div>
  );
};

export default Step10NomineeDetails;
