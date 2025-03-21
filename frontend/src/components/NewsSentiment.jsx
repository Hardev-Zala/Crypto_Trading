import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsSentiment = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/fetch/news/"
        );
        console.log(response.data.message);

        setNews(response.data.message.feed.slice(0, 15) || []); // Assuming the API returns a `feed` array
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Latest News Sentiment
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {article.banner_image && (
              <img
                src={article.banner_image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <div className="text-sm text-gray-500">
                <p>
                  <strong>Source:</strong> {article.source}
                </p>
                <p>
                  <strong>Published:</strong>{" "}
                  {parseCustomDate(article.time_published).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSentiment;
