import React, { useState } from "react";
import axios from "axios";

const CloseOrder = ({ orderId }) => {
  const [exit, setExit] = useState(0);
  const [message, setMessage] = useState("");

  const handleCloseOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/p2p/close-order",
        {
          orderId,
          exit,
        }
      );
      setMessage(`Order closed successfully: PnL = ${response.data.order.PnL}`);
    } catch (error) {
      setMessage("Error closing order");
      console.error("Error closing order:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Close Order</h3>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Exit Price"
          value={exit}
          onChange={(e) => setExit(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-lg w-full"
        />
        <button
          onClick={handleCloseOrder}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Close Order
        </button>
        {message && <p className="text-sm text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default CloseOrder;
