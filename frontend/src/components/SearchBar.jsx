import React, { useState, useEffect } from "react";
import { SearchIcon, X } from "lucide-react";

const defaultSymbols = [
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

const SearchBarModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [livePrices, setLivePrices] = useState({});

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3500"); // Replace with your WebSocket URL

    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Live Data:", message);

      setLivePrices((prev) => ({ ...prev, ...message })); // Merge new prices
    };

    ws.onclose = () => console.log("WebSocket Disconnected");

    return () => ws.close();
  }, []);

  // Filter symbols based on user input
  useEffect(() => {
    if (searchTerm) {
      const filteredSymbols = defaultSymbols.filter((symbol) =>
        symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSymbols);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Search Modal */}
      <div className="relative bg-gray-800 rounded-lg w-full max-w-2xl mx-4 p-6 shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Search Input */}
        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
          <SearchIcon className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search symbols..."
            className="bg-transparent outline-none ml-2 text-white w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            {suggestions.map((symbol, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer"
              >
                <span className="text-white">{symbol}</span>
                <span className="text-green-400">
                  {livePrices[symbol] ? `$${livePrices[symbol]}` : "Loading..."}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarModal;
