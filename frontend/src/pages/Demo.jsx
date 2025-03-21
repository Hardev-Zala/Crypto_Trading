import React, { useEffect, useState } from "react";

// const symbols = ["AAPL", "GOOGL", "MSFT", "BTC-USD", "ETH-USD"];
// const symbols = ["AAPL", "GOOGL", "MSFT", "BTC-USD", "ETH-USD"];
const symbols = ["AAPL", "GOOGL", "MSFT", "BINANCE:BTCUSDT", "BINANCE:ETHUSDT"];

export default function StockCryptoTracker() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3500");
    ws.onopen = () => console.log("Connected to WebSocket");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Parsed Message:", message);

      // Loop through each key-value pair in the message
      Object.entries(message).forEach(([symbol, details]) => {
        const price = details.current;
        setData((prev) => ({ ...prev, [symbol]: price }));
      });
      console.log(data);
    };

    ws.onclose = () => console.log("WebSocket Disconnected");
    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Stock & Crypto Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {symbols.map((symbol) => (
          <div key={symbol} className="bg-gray-800 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">
              {symbol.replace("BINANCE:", "")}
            </h2>
            <p className="text-2xl mt-2">
              ${data[symbol] ? data[symbol].toFixed(2) : "Loading..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
