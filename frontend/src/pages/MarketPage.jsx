import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ApexCharts from "react-apexcharts";

const symbols = [
  "BINANCE:BNBUSDT",
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:DOGEUSDT",
  "BINANCE:SHIBUSDT",
  "BINANCE:LTCUSDT",
  "BINANCE:DOTUSDT",
  "BINANCE:MATICUSDT",
  "BINANCE:SOLUSDT",
  "BINANCE:ADAUSDT",
  "BINANCE:XRPUSDT",
];

const symbolMapping = {
  "BINANCE:BNBUSDT": "Binance Coin",
  "BINANCE:BTCUSDT": "Bitcoin",
  "BINANCE:ETHUSDT": "Ethereum",
  "BINANCE:DOGEUSDT": "Dogecoin",
  "BINANCE:SHIBUSDT": "Shiba Inu",
  "BINANCE:LTCUSDT": "Litecoin",
  "BINANCE:DOTUSDT": "Polkadot",
  "BINANCE:MATICUSDT": "Polygon",
  "BINANCE:SOLUSDT": "Solana",
  "BINANCE:ADAUSDT": "Cardano",
  "BINANCE:XRPUSDT": "XRP",
};

const imageMapping = {
  "BINANCE:BNBUSDT": "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  "BINANCE:BTCUSDT": "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  "BINANCE:ETHUSDT": "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  "BINANCE:DOGEUSDT": "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  "BINANCE:SHIBUSDT": "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
  "BINANCE:LTCUSDT": "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  "BINANCE:DOTUSDT": "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  "BINANCE:MATICUSDT": "https://cryptologos.cc/logos/polygon-matic-logo.png",
  "BINANCE:SOLUSDT": "https://cryptologos.cc/logos/solana-sol-logo.png",
  "BINANCE:ADAUSDT": "https://cryptologos.cc/logos/cardano-ada-logo.png",
  "BINANCE:XRPUSDT": "https://cryptologos.cc/logos/xrp-xrp-logo.png",
};

const MarketPage = () => {
  const [data, setData] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const wsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket("ws://localhost:3500");

      wsRef.current.onopen = () => console.log("Connected to WebSocket");

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
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

  return (
    <div className="bg-black min-h-screen text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="overflow-x-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center mb-4 px-4 py-2 text-xl font-bold hover:text-gray-600"
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
            &nbsp;&nbsp;Crypto Market
          </button>
          <table className="w-full border-collapse border border-gray-600 text-center text-sm rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-800 text-gray-200 uppercase text-sm">
              <tr>
                <th className="border border-gray-600 px-4 py-3">Symbol</th>
                <th className="border border-gray-600 px-4 py-3">
                  Price (USDT)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {symbols.map((symbol, index) => {
                const name = symbolMapping[symbol] || symbol;
                const price = data[name]?.current ?? "Loading...";
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-700 transition duration-200 cursor-pointer"
                    onClick={() => setSelectedSymbol(symbol)}
                  >
                    <td className="border border-gray-600 px-4 py-3 flex items-center space-x-3">
                      <img
                        src={imageMapping[symbol]}
                        alt={name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{name}</span>
                    </td>
                    <td className="border border-gray-600 px-4 py-3 font-medium text-green-400">
                      {typeof price === "number"
                        ? `$${price.toFixed(5)}`
                        : price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedSymbol && (
        <ChartModal
          symbol={selectedSymbol}
          onClose={() => setSelectedSymbol(null)}
        />
      )}
    </div>
  );
};

const ChartModal = ({ symbol, onClose }) => {
  const [chartData, setChartData] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = (Math.random() * (50000 - 30000) + 30000).toFixed(2);
      setChartData((prev) => [...prev.slice(-9), parseFloat(newPrice)]);
      setTimeStamps((prev) => [
        ...prev.slice(-9),
        new Date().toLocaleTimeString(),
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-lg relative w-full max-w-3xl">
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">
          {symbolMapping[symbol]}
        </h2>
        <ApexCharts
          options={{
            chart: { type: "line" },
            xaxis: {
              categories: timeStamps,
              labels: { style: { colors: "#ffffff" } },
            },
            yaxis: { labels: { style: { colors: "#ffffff" } } },
            colors: ["#ff4500"],
            tooltip: { theme: "dark" },
          }}
          series={[{ name: "Price", data: chartData }]}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default MarketPage;
