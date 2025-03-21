import React, { useState } from "react";
// import ReactPlayer from "react-player";
import chart from "/crypto-chart.jpg";
import Analyze from "/analyze_img.webp";
import Learn from "/learn_img.webp";
import Screen from "/screen_img.webp";
import Trade from "/trade_img.webp";

const VideoCard = () => {
  const [img, setImg] = useState(chart);
  // const handleShow = () => {
  //   setImg()
  // };

  return (
    <>
      <div>
        <div className="text-center text-[50px] text-white font-bold mt-10">
          Where the world does markets
        </div>
        <div class="flex justify-center space-x-6 mt-8">
          <button
            class={` ${
              img == chart
                ? "px-4 py-2 bg-gray-800 text-white rounded-full font-medium"
                : "text-gray-400"
            }`}
            onClick={() => setImg(chart)}
          >
            Chart
          </button>
          <button
            className={`${
              img == Trade
                ? "px-4 py-2 bg-gray-800 text-white rounded-full font-medium"
                : "text-gray-400"
            }`}
            onClick={() => setImg(Trade)}
          >
            Trade
          </button>
          <button
            className={`${
              img == Screen
                ? "px-4 py-2 bg-gray-800 text-white rounded-full font-medium"
                : "text-gray-400"
            }`}
            onClick={() => setImg(Screen)}
          >
            Screen
          </button>
          <button
            className={`${
              img == Analyze
                ? "px-4 py-2 bg-gray-800 text-white rounded-full font-medium"
                : "text-gray-400"
            }`}
            onClick={() => setImg(Analyze)}
          >
            Analyze
          </button>
          <button
            className={`${
              img == Learn
                ? "px-4 py-2 bg-gray-800 text-white rounded-full font-medium"
                : "text-gray-400"
            }`}
            onClick={() => setImg(Learn)}
          >
            Learn
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <section class="flex justify-center">
            <div className="relative w-fit p-1 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              <img
                src={img}
                alt={img}
                width={900}
                height={1000}
                className="rounded-xl shadow-lg"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
