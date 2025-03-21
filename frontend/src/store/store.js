import {create} from "zustand";

export const useStore = create((set) => ({
  stockData: {},
  options: [], // Initialize options as an empty array
  totalPnL: 0, // Initialize totalPnL as a number

  setStockData: (data) => set({ stockData: data }),
  setOptions: (options) => set({ options }),
  setTotalPnL: (totalPnL) => {
    console.log("Updating totalPnL:", totalPnL);
    set({ totalPnL });
  },
}));
