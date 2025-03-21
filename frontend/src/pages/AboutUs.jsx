import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const AboutUs = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch team member data (including images) from an online API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        // Add placeholder images to the team members
        const membersWithImages = data.slice(0, 3).map((member, index) => ({
          ...member,
          image: `https://i.pravatar.cc/150?img=${index + 1}`, // Dynamic image URLs
        }));
        setTeamMembers(membersWithImages);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-4">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="absolute top-6 text-white hover:text-gray-200 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We are a leading trading platform dedicated to providing cutting-edge
          tools and insights for traders worldwide. Our mission is to empower
          you with the knowledge and technology to succeed in the financial
          markets.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Section */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-400">
              Our mission is to democratize trading by providing accessible,
              reliable, and innovative tools for traders of all levels. We
              believe in transparency, education, and empowering our users to
              make informed decisions.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-400">
              We envision a world where anyone, regardless of their background,
              can participate in the financial markets with confidence and
              achieve their financial goals.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gray-900 p-6 rounded-lg text-center shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-400">{member.company.bs}</p>{" "}
              {/* Using a placeholder role */}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2023 TradingPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
