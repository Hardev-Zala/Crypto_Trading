import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
