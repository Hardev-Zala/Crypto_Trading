import axios from 'axios';
import WebSocket from 'ws';
import { ENV_VARS } from '../config/envVars.js';

const { FINNHUB_API } = ENV_VARS;
const API_KEY = FINNHUB_API;
const BASE_URL = 'https://finnhub.io/api/v1';
const WS_URL = `wss://ws.finnhub.io?token=${API_KEY}`;

let ws;

export const getStockData = async (symbols) => {
  const stockData = {};

  for (const symbol of symbols) {
    try {
      const response = await axios.get(`${BASE_URL}/quote`, {
        params: {
          symbol,
          token: API_KEY,
        },
      });

      stockData[symbol] = {
        current: response.data.c,
        change_percent: (((response.data.c - response.data.pc) / response.data.pc) * 100).toFixed(2),
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error.message);
    }
  }

  return stockData;
};

export const connectWebSocket = (symbols, broadcastData) => {
  ws = new WebSocket(WS_URL);

  ws.on('open', () => {
    console.log('Connected to Finnhub WebSocket');
    symbols.forEach((symbol) => {
      ws.send(JSON.stringify({ type: 'subscribe', symbol }));
    });
  });

  ws.on('message', (data) => {
    const message = JSON.parse(data);

    if (message.type === 'trade') {
      const updates = {};
      message.data.forEach((trade) => {
        updates[trade.s] = {
          current: trade.p,
          change_percent: 'Live', // Real-time, no percentage calculation
        };
      });
      broadcastData(updates);
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket Error:', error);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed. Reconnecting...');
    setTimeout(() => connectWebSocket(symbols, broadcastData), 5000);
  });
};

export const closeWebSocket = () => {
  if (ws) ws.close();
};