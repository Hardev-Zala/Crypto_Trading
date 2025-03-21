import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/fetch/news/"
        );
        console.log(response.data.message);

        setNews(response.data.message.feed.slice(0, 30) || []); // Assuming the API returns a `feed` array
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Function to parse the custom date format
  const parseCustomDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hours = dateString.slice(9, 11);
    const minutes = dateString.slice(11, 13);
    const seconds = dateString.slice(13, 15);

    // Create a Date object (months are 0-indexed in JavaScript, so subtract 1 from the month)
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-300">Loading news...</p>
      </div>
    );
  }

  if (error) {
    setTimeout(() => navigate(-1), 2000);

    return (
      <>
        <div className="flex justify-center items-center h-screen bg-black">
          <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="mx-auto px-4 py-8">
        <h1 className="flex items-center text-3xl font-bold text-left mb-8 text-gray-100">
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
          &nbsp;&nbsp;Latest News Sentiment
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:bg-gray-700"
            >
              {article.banner_image && (
                <img
                  src={article.banner_image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-300 mb-4">{article.summary}</p>
                <div className="text-sm text-gray-400">
                  <p>
                    <strong>Source:</strong> {article.source}
                  </p>
                  <p>
                    <strong>Published:</strong>{" "}
                    {parseCustomDate(
                      article.time_published
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
