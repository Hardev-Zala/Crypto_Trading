// import express from "express"
// import { ENV_VARS } from "./config/envVars.js"
// import router from "./routes/auth.Route.js"
// import connect from "./config/db.js"
// import cookieParser from "cookie-parser"
// import fetch from "./routes/fetch.Route.js"
// import cors from "cors"
// import { startWebSocket } from './utils/websocket.js';
// // import http from "http";


// const app = express()
// const {PORT} = ENV_VARS 
// connect()

// app.use(cors({origin:"http://localhost:5173"}))
// app.use(express.json())
// app.use(cookieParser())

// app.use('/api/v1/auth',router)
// app.use('/api/v1/fetch',fetch)

// app.listen(PORT,()=>{
//   console.log(`server running at http://localhost:${PORT}`);
//   // setup periodic price updater
//   // FetchingPrices.setupPriceUpdater();


//   // updateData(); // Fetch data on server start

// })

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

// server.js
import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { getStockData, connectWebSocket, closeWebSocket } from './utils/twelveData.js';
import router from './routes/auth.Route.js';
import p2pTrade from './routes/p2pTrade.Route.js';
import adminRoutes from "./routes/admin.Route.js"
import connect from './config/db.js';
import cookieParser from 'cookie-parser';
import fetch from './routes/fetch.Route.js';
import cors from 'cors';
import { Option } from './model/user.model.js'; // Import the Option model

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

connect();

let clients = [];

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', router);
app.use('/api/v1/fetch', fetch);
app.use('/api/v1/p2p', p2pTrade);
app.use('/api/v1/admin',adminRoutes)

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter((client) => client !== ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    console.log('Parsed message:', data);

    if (data.type === 'placeOption') {
      console.log('Placing option...');
      await placeOption(data);
      calculateAndBroadcastPnL(data.userId); // Recalculate PnL after placing the option
    } else if (data.type === 'sellOption') {
      console.log('Selling option...');
      await sellOption(data);
      calculateAndBroadcastPnL(data.userId); // Recalculate PnL after selling the option
    }
  });
});

const broadcastData = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const placeOption = async (optionData) => {
  console.log('Received option data:', optionData);
  try {
    const newOption = new Option({
      user: optionData.userId,
      symbol: optionData.symbol,
      type: optionData.optionType, // CE or PE
      amount: optionData.amount,
      entry: optionData.entryPrice, // Entry price
      status: 'open',
    });
    await newOption.save();
    broadcastData({ type: 'optionPlaced', option: newOption });
  } catch (error) {
    console.error('Error placing option:', error);
  }
};

const sellOption = async (optionData) => {
  console.log('Received selling option:', optionData);

  try {
    const getEntryPrice = await Option.findOne({ user: optionData.userId, status: 'open' });

    if (!getEntryPrice) {
      console.error('No open option found for the user');
      return;
    }

    const getOption = await Option.findOneAndUpdate(
      { user: optionData.userId, status: 'open' },
      { exit: optionData.exitPrice, PnL: getEntryPrice.entry, status: 'closed' }, // Update status to "closed"
      { new: true }
    );

    await getOption.save();
    broadcastData({ type: 'optionSold', option: getOption });
    calculateAndBroadcastPnL(optionData.userId); // Recalculate PnL after selling the option
  } catch (error) {
    console.error('Error selling option:', error);
  }
};

const calculateAndBroadcastPnL = async (userId) => {
  try {
    const openOptions = await Option.find({ user: userId, status: 'open' });
    const stockData = await getStockData(symbols); // Fetch current prices

    let totalPnL = 0;

    openOptions.forEach((option) => {
      const currentPrice = stockData[option.symbol]?.current;

      if (currentPrice === undefined) {
        console.error(`Current price for symbol ${option.symbol} is not available.`);
        return; // Skip this option if the price is not available
      }

      console.log(`Processing option: Symbol=${option.symbol}, Type=${option.type}, Entry=${option.entry}, Amount=${option.amount}`);

      if (option.type === 'CE') {
        // PnL for Call Option: (Current Price - Entry Price) * Amount
        const pnl = (currentPrice - option.entry) * option.amount;
        console.log(`Call Option PnL: ${pnl}`);
        totalPnL += pnl;
      } else if (option.type === 'PE') {
        // PnL for Put Option: (Entry Price - Current Price) * Amount
        const pnl = (option.entry - currentPrice) * option.amount;
        console.log(`Put Option PnL: ${pnl}`);
        totalPnL += pnl;
      }
    });

    console.log('Total PnL:', totalPnL.toFixed(2));
    broadcastData({ type: 'pnlUpdated', totalPnL: totalPnL }); // Send totalPnL as a number
  } catch (error) {
    console.error('Error calculating PnL:', error);
  }
};

const broadcastOptions = async () => {
  try {
    const options = await Option.find({ status: 'open' }); // Fetch open options from the database
    broadcastData({ type: 'optionsUpdated', options }); // Send options to the frontend
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

const symbols = [
  'BINANCE:BNBUSDT',
  'BINANCE:BTCUSDT',
  'BINANCE:ETHUSDT',
  'BINANCE:DOGEUSDT',
  'BINANCE:SHIBUSDT',
  'BINANCE:LTCUSDT',
  'BINANCE:DOTUSDT',
  'BINANCE:MATICUSDT',
  'BINANCE:SOLUSDT',
  'BINANCE:ADAUSDT',
  'BINANCE:XRPUSDT',
];

// Fetch stock data and broadcast updates every minute
setInterval(async () => {
  try {
    const stockData = await getStockData(symbols);
    broadcastData({ type: 'stockDataUpdated', ...stockData });
    // Optionally, recalculate PnL on every stock data update
    // calculateAndBroadcastPnL();
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}, 60000);

// Broadcast open options every 5 seconds
setInterval(broadcastOptions, 5000);

// Connect to Finnhub WebSocket for real-time data
connectWebSocket(symbols, broadcastData);

// Graceful shutdown
process.on('SIGINT', () => {
  closeWebSocket();
  process.exit();
});

const PORT = process.env.PORT || 3500;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ✅ **NEW: Binance WebSocket Connection**
// const binanceSymbols = ["btcusdt", "ethusdt", "bnbusdt", "dogeusdt", "shibusdt", "ltcusdt", "dotusdt", "maticusdt", "solusdt", "adausdt", "xrpusdt"];
// const binanceWS = new WebSocket(`wss://stream.binance.com:9443/ws/${binanceSymbols.map(s => s + "@trade").join("/")}`);

// binanceWS.onmessage = (event) => {
//     try {
//         const data = JSON.parse(event.data);
//         broadcastData(data); // Send Binance data to frontend clients
//     } catch (error) {
//         console.error("Error parsing Binance WebSocket data:", error);
//     }
// };

// binanceWS.onopen = () => {
//     console.log("Connected to Binance WebSocket");
// };

// binanceWS.onerror = (error) => {
//     console.error("Binance WebSocket error:", error);
// };

// binanceWS.onclose = () => {
//     console.log("Binance WebSocket closed");
// };


// const symbols = ["AAPL", "GOOGL", "MSFT", "BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "^GSPC", "^IXIC"];
// const stockSymbols = ['AAPL','NASDAQ','GOOGL'];

// // Connect to Intrinio WebSocket for real-time updates
// connectIntrinioWebSocket(stockSymbols, broadcastData);

// // Close WebSocket on server shutdown
// process.on('SIGINT', () => {
//     closeIntrinioWebSocket();
//     process.exit();
// });