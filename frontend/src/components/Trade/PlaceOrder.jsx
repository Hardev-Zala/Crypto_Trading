import React, { useState } from "react";
import axios from "axios";

const PlaceOrder = ({ userId, symbol }) => {
  const [type, setType] = useState("CE"); // CE or PE
  const [amount, setAmount] = useState(0);
  const [entry, setEntry] = useState(0);
  const [message, setMessage] = useState("");

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/p2p/place-order",
        {
          user: userId,
          symbol,
          type,
          amount,
          entry,
        }
      );
      setMessage(`Order placed successfully: ${response.data.order._id}`);
    } catch (error) {
      setMessage("Error placing order");
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Place Order</h3>
      <div className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-lg w-full"
        >
          <option value="CE">Call Option (CE)</option>
          <option value="PE">Put Option (PE)</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Entry Price"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-lg w-full"
        />
        <button
          onClick={handlePlaceOrder}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Place Order
        </button>
        {message && <p className="text-sm text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default PlaceOrder;
