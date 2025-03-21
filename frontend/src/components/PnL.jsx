import React from "react";
import { useStore } from "../store/store";

const PnL = () => {
  const { totalPnL } = useStore();
  console.log("PnL Component - PnL is ", totalPnL);

  // Ensure totalPnL is a valid number
  // const pnlValue = typeof totalPnL === "number" ? totalPnL : 0;

  return (
    <div className="text-white">
      <p
        className={`text-3xl font-bold ${
          totalPnL > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        ${totalPnL}
      </p>
    </div>
  );
};

export default PnL;
