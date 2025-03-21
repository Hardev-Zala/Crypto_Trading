import React from "react";
import { useStore } from "../store/store";

const OrderBook = () => {
  const { options } = useStore();
  const optionsArray = Array.isArray(options) ? options : [];

  if (optionsArray.length === 0) {
    return (
      <div className="text-white">
        <p className="text-gray-400">Not Traded Yet.</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <ul className="divide-y divide-gray-700">
        {optionsArray.map((option) => (
          <li key={option._id} className="py-3">
            <span
              className={`text-lg font-semibold ${
                option.type === "CE" ? "text-green-500" : "text-red-500"
              }`}
            >
              {option.type.toUpperCase()}
            </span>{" "}
            - {option.symbol} - {option.amount} @ {option.strikePrice} (Premium:{" "}
            {option.premium})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderBook;
