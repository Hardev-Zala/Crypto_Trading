import React from "react";
import TradingCard from "../components/TradingCard";
import MarketSummary from "../components/MarketSummary";
import NewsSentiment from "../components/NewsSentiment";

const LandingPage = () => {
  return (
    <>
      {/* <img src={bg} /> */}
      <TradingCard />
      <MarketSummary />
      <NewsSentiment />
      {/* <TradingViewWidget /> */}
      {/* <TradingChartAndIndicators /> */}
    </>
  );
};

export default LandingPage;
