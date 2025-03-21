// src/components/Step6Declarations.js
import React, { useState } from "react";
import toast from "react-hot-toast";

const Step6Declarations = ({ onNext }) => {
  const [declarations, setDeclarations] = useState({
    paysTaxesInIndia: false,
    notPoliticallyExposed: false,
    acceptsIBTTerms: false,
    settleUnusedFunds: false,
    noSEBIActions: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setDeclarations((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      declarations.paysTaxesInIndia &&
      declarations.notPoliticallyExposed &&
      declarations.acceptsIBTTerms &&
      declarations.settleUnusedFunds &&
      declarations.noSEBIActions
    ) {
      onNext(declarations);
    } else {
      toast.error(
        "Sorry but we can't continue please fill up all terms checkboxes."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Declarations</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="paysTaxesInIndia"
              checked={declarations.paysTaxesInIndia}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">I pay my taxes in India</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="notPoliticallyExposed"
              checked={declarations.notPoliticallyExposed}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">
              I am not politically exposed or related
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="acceptsIBTTerms"
              checked={declarations.acceptsIBTTerms}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">I accept IBT terms & conditions</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="settleUnusedFunds"
              checked={declarations.settleUnusedFunds}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">
              I want my unused funds to be settled after every 90 days
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="noSEBIActions"
              checked={declarations.noSEBIActions}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">
              I don't have any actions initiated or pending by SEBI, exchanges,
              or any other authority dealing in securities or commodities in the
              last 3 years
            </span>
          </label>
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

export default Step6Declarations;
