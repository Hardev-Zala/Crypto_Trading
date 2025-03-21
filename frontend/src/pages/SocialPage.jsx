import React from "react";
import { useNavigate } from "react-router-dom";

const SocialPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="flex items-center text-4xl font-bold mb-4 text-left">
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
          &nbsp;&nbsp;Crypto Trading
        </h1>
        <p className="text-lg mb-8">
          Follow us on our social media platforms to stay updated with the
          latest trends, insights, and market analysis.
        </p>

        <div className="flex space-x-6 mb-8">
          <a
            href="https://github.com/Hardev-Zala/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/zala-amardeepsinh-r-zala-892855341/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M22.225 0h-20.45c-.975 0-1.775.8-1.775 1.775v20.45c0 .975.8 1.775 1.775 1.775h20.45c.975 0 1.775-.8 1.775-1.775v-20.45c0-.975-.8-1.775-1.775-1.775zm-15.725 20h-3v-10h3v10zm-1.5-11.6c-.967 0-1.75-.783-1.75-1.75s.783-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm15.225 11.6h-3v-5.6c0-1.337-.026-3.063-1.875-3.063s-2.163 1.462-2.163 2.975v5.688h-3v-10h2.863v1.375h.04c.4-.75 1.388-1.538 2.863-1.538 3.062 0 3.625 2.012 3.625 4.625v5.538z" />
            </svg>
          </a>
        </div>

        <p className="text-lg mb-4">
          Check out our portfolio for more details:
        </p>
        <a
          href="https://hardevs-portfolio.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-lg"
        >
          Visit Our Portfolio
        </a>

        <div className="mt-10 text-left max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Why Follow Us?</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Stay updated with the latest crypto trends</li>
            <li>Get expert insights and market analysis</li>
            <li>Exclusive crypto trading tips and strategies</li>
            <li>Early access to new crypto projects</li>
          </ul>
        </div>

        <div className="mt-10 text-left max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-300">
            Become a part of our growing crypto community! Connect with
            like-minded individuals, share insights, and stay ahead in the world
            of cryptocurrency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
