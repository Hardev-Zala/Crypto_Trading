import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { generateInvoice } from "../../utils/generateInvoice";

const OrdersList = ({ userId, currentPrice, orders, fetchOrders }) => {
  // Calculate live PnL for open orders
  const calculateLivePnL = (order) => {
    if (order.status === "closed") return order.PnL; // Use stored PnL for closed orders
    return order.type === "CE"
      ? (currentPrice - order.entry) * order.amount // PnL for Call Option (CE)
      : (order.entry - currentPrice) * order.amount; // PnL for Put Option (PE)
  };

  // Handle closing an order
  const handleCloseOrder = async (orderId) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/p2p/close-order",
        {
          orderId,
          exitPrice: currentPrice, // Use the current price as the exit price
        }
      );
      toast.success(
        `Order closed successfully: PnL = ${response.data.order.PnL.toFixed(4)}`
      );
      fetchOrders(); // Re-fetch orders to update the list
    } catch (error) {
      console.error("Error closing order:", error);
      alert("Failed to close order");
    }
  };

  // Handle generating Invoice
  const handleGenerateInvoice = (order) => {
    generateInvoice(order);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-600 text-center text-sm rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-800 text-gray-200 uppercase text-sm">
            <tr>
              <th className="border border-gray-600 px-4 py-3">Symbol</th>
              <th className="border border-gray-600 px-4 py-3">Type</th>
              <th className="border border-gray-600 px-4 py-3">Amount</th>
              <th className="border border-gray-600 px-4 py-3">Entry</th>
              <th className="border border-gray-600 px-4 py-3">Exit</th>
              <th className="border border-gray-600 px-4 py-3">PnL</th>
              <th className="border border-gray-600 px-4 py-3">Status</th>
              <th className="border border-gray-600 px-4 py-3">Action</th>
              <th className="border border-gray-600 px-4 py-3">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((order) => {
              const pnl = calculateLivePnL(order);
              const pnlColor =
                pnl > 0
                  ? "text-green-500"
                  : pnl < 0
                  ? "text-red-500"
                  : "text-white";

              return (
                <tr
                  key={order._id}
                  className="hover:bg-gray-700 transition duration-200"
                >
                  <td className="border border-gray-600 px-4 py-3">
                    {order.symbol}
                  </td>
                  <td className="border border-gray-600 px-4 py-3">
                    {order.type}
                  </td>
                  <td className="border border-gray-600 px-4 py-3">
                    {order.amount}
                  </td>
                  <td className="border border-gray-600 px-4 py-3">
                    {order.entry}
                  </td>
                  <td className="border border-gray-600 px-4 py-3">
                    {order.exit || "-"}
                  </td>
                  <td
                    className={`border border-gray-600 px-4 py-3 ${pnlColor}`}
                  >
                    {pnl.toFixed(4)}
                  </td>
                  <td className="border border-gray-600 px-4 py-3">
                    {order.status}
                  </td>
                  <td className="border border-gray-600 px-4 py-3">
                    {order.status === "open" && (
                      <button
                        onClick={() => handleCloseOrder(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Close
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-600 px-4 py-3">
                    {order.status === "closed" && (
                      <button
                        onClick={() => handleGenerateInvoice(order)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        Invoice
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
