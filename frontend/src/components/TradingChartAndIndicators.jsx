// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingChartAndIndicators() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "1",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "studies": [
            "STD;24h%Volume",
            "STD;Accumulation_Distribution",
            "STD;Advance%1Decline%1Line",
            "STD;Advance%1Decline%1Ratio",
            "STD;Advance_Decline_Ratio_Bars",
            "STD;Arnaud%1Legoux%1Moving%1Average",
            "STD;Aroon",
            "STD;Average%Day%Range",
            "STD;Average%1Directional%1Index",
            "STD;Average_True_Range",
            "STD;Awesome_Oscillator",
            "STD;Balance%1of%1Power",
            "STD;BBTrend",
            "STD;Bollinger_Bands",
            "STD;Bollinger_Bands_B",
            "STD;Bollinger_Bands_Width",
            "STD;Bull%Bear%Power",
            "STD;CCI",
            "STD;Connors_RSI",
            "STD;DEMA",
            "STD;EOM",
            "STD;Gaps",
            "STD;Momentum",
            "STD;MACD",
            "STD;EMA",
            "STD;MA%Ribbon",
            "STD;SMA",
            "STD;WMA",
            "STD;Multi-Time%Period%Charts",
            "STD;Net%1Volume",
            "STD;On_Balance_Volume",
            "STD;Open%Interest",
            "STD;Performance",
            "STD;Pivot%1Points%1High%1Low",
            "STD;Pivot%1Points%1Standard",
            "STD;Price%1Target",
            "PriceVolumeTrend@tv-basicstudies",
            "STD;Price_Volume_Trend",
            "STD;Rank_Correlation_Index",
            "STD;ROC",
            "STD;Relative%1Volume%1at%1Time",
            "BookerIntradayPivots@tv-basicstudies",
            "STD;Technical%1Ratings",
            "STD;Time%1Weighted%1Average%1Price",
            "STD;Trading%1Sessions",
            "STD;Trend%1Strength%1Index",
            "STD;TEMA",
            "STD;TRIX",
            "STD;True%1Strength%1Indicator",
            "STD;UP_DOWN_Volume",
            "STD;Visible%1Average%1Price",
            "Volume@tv-basicstudies",
            "STD;Volume%1Delta",
            "STD;VWAP",
            "STD;VWMA",
            "STD;Willams_R",
            "STD;Zig_Zag"
          ],
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          // href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingChartAndIndicators);
