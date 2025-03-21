import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // FAQ Data
  const faqCategories = [
    {
      title: "🚀 Getting Started",
      questions: [
        "How to create an account?",
        "Verifying your identity",
        "Making your first trade",
      ],
    },
    {
      title: "🔒 Account Management",
      questions: [
        "Updating your profile",
        "Changing your password",
        "Two-factor authentication",
      ],
    },
    {
      title: "📈 Trading",
      questions: [
        "Understanding market orders",
        "How to place a limit order?",
        "Trading fees explained",
      ],
    },
    {
      title: "🛡️ Security",
      questions: [
        "Keeping your account secure",
        "Recognizing phishing attempts",
        "Reporting suspicious activity",
      ],
    },
    {
      title: "💳 Deposits & Withdrawals",
      questions: [
        "How to deposit funds?",
        "Withdrawal limits",
        "Processing times",
      ],
    },
    {
      title: "🔧 Troubleshooting",
      questions: [
        "Login issues",
        "Trade execution problems",
        "Contact support",
      ],
    },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter((question) =>
        question.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      {/* Header */}
      <header className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="flex items-center justify-center text-4xl font-bold animate-fade-in-down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => navigate(-1)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            &nbsp;&nbsp;Help Center
          </h1>
          <p className="text-gray-200 mt-3 animate-fade-in-down delay-100">
            Your one-stop destination for all trading-related queries.
          </p>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-6 animate-fade-in-down delay-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 hover:text-purple-500 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ Categories */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFAQs.map((category, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg hover:shadow-lg hover:scale-105 transform transition-all duration-300 animate-fade-in-up"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                {category.title}
              </h2>
              <ul className="space-y-2">
                {category.questions.map((question, qIndex) => (
                  <li key={qIndex}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      {question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* No Results Found */}
        {filteredFAQs.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No results found for "{searchQuery}". Try a different search term.
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Need more help?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenterPage;
