// import React, { useEffect, useState } from "react";
// // import niftyImage from "/nifty-50.svg"; // Replace with your image path
// // import bitcoinImage from "/BITCOIN.svg"; // Replace with your image path
// // import bankniftyImage from "/banknifty.svg"; // Replace with your image path
// import Navbar from "./Navbar";
// import VideoCard from "./VideoCard";
// import { Link, useNavigate } from "react-router-dom";
// import Skeleton from "@mui/material/Skeleton";
// // import { Loader } from "lucide-react";
// // import styled, { keyframes } from "styled-components";

// // Define the keyframes for the rotation animation
// // const rotate = keyframes`
// //   from {
// //     transform: rotate(0deg);
// //   }
// //   to {
// //     transform: rotate(360deg);
// //   }
// // `;

// // Create a styled component for the Loader icon
// // const RotatingLoader = styled(Loader)`
// //   animation: ${rotate} 1s linear infinite;
// // `;

// // // Loading component
// // const LoaderAnimation = () => {
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         height: "100vh",
// //       }}
// //     >
// //       <RotatingLoader size={48} />
// //     </div>
// //   );
// // };

// // Symbol Mapping for Display Names
// const symbolMapping = {
//   "BINANCE:BTCUSDT": "Bitcoin",
//   "BINANCE:ETHUSDT": "Ethereum",
//   "BINANCE:DOGEUSDT": "Dogecoin",
// };

// const cardData = [
//   {
//     symbol: "BINANCE:BTCUSDT",
//     name: "Bitcoin",
//     image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
//   },
//   {
//     symbol: "BINANCE:ETHUSDT",
//     name: "Ethereum",
//     image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
//   },
//   {
//     symbol: "BINANCE:DOGEUSDT",
//     name: "Dogecoin",
//     image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
//   },
// ];

// const TradingCard = () => {
//   // const [imgLoading, setImgLoading] = useState(true);
//   const [data, setData] = useState({});
//   // const [previousData, setPreviousData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:3500");

//     ws.onopen = () => console.log("Connected to WebSocket for Home Page");

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log("Parsed Message:", message);

//       // Loop through each key-value pair in the message
//       Object.entries(message).forEach(([symbol, details]) => {
//         const current = parseFloat(details.current) || 0;

//         // setPreviousData((prev) => ({
//         //   ...prev,
//         //   [symbolMapping[symbol] || symbol]:
//         //     (data[symbolMapping[symbol] || symbol] || {}).current || 0,
//         // }));

//         // Store data using display-friendly names
//         setData((prev) => ({
//           ...prev,
//           [symbolMapping[symbol] || symbol]: { current },
//         }));
//       });
//     };

//     ws.onclose = () => {
//       console.log("WebSocket Disconnected");
//       setTimeout(() => {
//         // Attempt to reconnect after 5 seconds
//         new WebSocket("ws://localhost:3500");
//       }, 5000);
//     };

//     return () => ws.close();
//   }, []);

//   return (
//     <>
//       <div className="bg-black py-8 px-4 min-h-screen">
//         <Navbar />
//         {/* Hero Section */}
//         <div className="mt-10 text-white text-center md:text-left md:ml-[100px] animate-fade-in mt-[100px]">
//           <div className="text-[40px] md:text-[70px] font-bold leading-tight">
//             Look first/<div>Then leap</div>
//           </div>
//           <div className="text-[20px] md:text-[30px] mt-6 md:mt-10">
//             The best trades require research, then commitment.
//           </div>
//         </div>

//         {/* Cards Section */}
//         <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[50px] animate-fade-in">
//           {cardData.map((item, idx) => {
//             const info = data[item.name];
//             const price = info ? info.current : null;

//             return (
//               <div
//                 key={idx}
//                 className="flex flex-col sm:flex-row justify-center items-center bg-transparent backdrop-blur-md backdrop-filter border border-gray-500 px-6 sm:px-10 py-5 rounded-3xl transition-transform duration-500 ease-in-out transform hover:scale-105"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 rounded-3xl mb-4 sm:mb-0"
//                 />
//                 <div className="ml-5 flex flex-col sm:flex-1 text-center sm:text-left">
//                   <div className="text-white font-bold text-lg sm:text-xl">
//                     {item.name}
//                   </div>
//                   <div className={`font-bold text-2xl text-gray-200`}>
//                     {price ? (
//                       "$" + price.toFixed(5)
//                     ) : (
//                       <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="text-lg flex items-center ms-[100px] mt-10 text-indigo-600 hover:underline animate-fade-in cursor-pointer">
//           <Link to={"/validation"}>Want to make demat account?</Link>
//         </div>
//         <div>
//           <hr className="text-gray-100 mt-[150px] " />
//         </div>
//         <VideoCard />
//       </div>
//     </>
//   );
// };

// export default TradingCard;

// // 9924523136
// // p gandhi

// // -------------------

// // +1 514 983 1506

// // je goriya

import React, { useEffect, useState, useRef, useMemo } from "react";
import Navbar from "./Navbar";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useUserAuthStore } from "../store/UserAuth";
import TradeButton from "./ui/TradeButton";

const symbolMapping = {
  "BINANCE:BTCUSDT": "Bitcoin",
  "BINANCE:ETHUSDT": "Ethereum",
  "BINANCE:DOGEUSDT": "Dogecoin",
};

const cardData = [
  {
    symbol: "BINANCE:BTCUSDT",
    name: "Bitcoin",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    symbol: "BINANCE:ETHUSDT",
    name: "Ethereum",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    symbol: "BINANCE:DOGEUSDT",
    name: "Dogecoin",
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  },
];

const TradingCard = React.memo(() => {
  const [data, setData] = useState({});
  const wsRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const progressRef = useRef(() => {});
  const { user } = useUserAuthStore();
  // console.log("User is ");

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket("ws://localhost:3500");

      wsRef.current.onopen = () => console.log("Connected to WebSocket");

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // console.log("WebSocket Data:", message);

        setData((prev) => {
          const updatedData = { ...prev };
          Object.entries(message).forEach(([symbol, details]) => {
            const current = parseFloat(details.current) || 0;
            updatedData[symbolMapping[symbol] || symbol] = { current };
          });
          return updatedData;
        });
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket Disconnected. Reconnecting...");
        setTimeout(() => {
          wsRef.current = new WebSocket("ws://localhost:3500");
        }, 5000);
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="bg-black py-8 px-4 min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="mt-[100px] text-white text-center md:text-left md:ml-[100px] animate-fade-in">
          <h1 className="text-[40px] md:text-[70px] font-bold leading-tight">
            Look first/<div>Then leap</div>
          </h1>
          <p className="text-[20px] md:text-[30px] mt-6 md:mt-10">
            The best trades require research, then commitment.
          </p>
        </div>

        {/* Cards Section */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[50px] animate-fade-in">
          {cardData.map((item, idx) => {
            const price = data[item.name]?.current ?? null;

            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-center items-center bg-transparent backdrop-blur-md backdrop-filter border border-gray-500 px-6 sm:px-10 py-5 rounded-3xl transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-3xl mb-4 sm:mb-0"
                  loading="lazy"
                />
                <div className="ml-5 flex flex-col sm:flex-1 text-center sm:text-left">
                  <div className="text-white font-bold text-lg sm:text-xl">
                    {item.name}
                  </div>
                  <div className="font-bold text-2xl text-gray-200">
                    {price ? (
                      `$${price.toFixed(5)}`
                    ) : (
                      // <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      <Box sx={{ width: "100%" }}>
                        <LinearProgress
                          variant="buffer"
                          value={progress}
                          valueBuffer={buffer}
                        />
                      </Box>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Link */}
        {user == undefined || user == null ? (
          <div className="text-lg flex items-center ms-[100px] mt-10 text-indigo-600 hover:underline animate-fade-in cursor-pointer">
            <Link to={"/validation"}>Want to make a demat account?</Link>
          </div>
        ) : (
          <TradeButton />
        )}

        <hr className="text-gray-100 mt-[150px]" />
        <VideoCard />
      </div>
    </>
  );
});

export default TradingCard;
