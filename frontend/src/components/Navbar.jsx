import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  LogInIcon,
  LucideLogOut,
  SearchIcon,
  UserIcon,
  WatchIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import brand_logo from "/brand_icon.png"; // Replace with your logo path
import { Link } from "react-router-dom";
import { useUserAuthStore } from "../store/UserAuth"; // Replace with your auth store
import axios from "axios";
import TransactionModal from "./TransactionModal";
import toast from "react-hot-toast";

// Key-value pair for user-friendly search
const defaultSymbols = {
  Bitcoin: "BINANCE:BTCUSDT",
  Ethereum: "BINANCE:ETHUSDT",
  Dogecoin: "BINANCE:DOGEUSDT",
  BinanceCoin: "BINANCE:BNBUSDT",
  ShibaInu: "BINANCE:SHIBUSDT",
  Litecoin: "BINANCE:LTCUSDT",
  Polkadot: "BINANCE:DOTUSDT",
  Polygon: "BINANCE:MATICUSDT",
  Solana: "BINANCE:SOLUSDT",
  Cardano: "BINANCE:ADAUSDT",
  Ripple: "BINANCE:XRPUSDT",
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [isWatchlistVisible, setIsWatchlistVisible] = useState(false); // State to control sidebar visibility
  const { user, logout } = useUserAuthStore();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false); // State for Transaction Modal
  const wsRef = useRef(null);

  const getWatchList = async () => {
    const response = await axios.get(
      "http://localhost:3500/api/v1/fetch/watchlist",
      { withCredentials: true }
    );
    if (response.data.success) {
      setWatchlist(response.data.message.map((item) => item.symbol));
    } else {
      console.log(response.data.message);
    }
  };
  // Open Transaction Modal
  const openTransactionModal = () => {
    if (user == null)
      return toast.error("Not available for you.Please login first");
    setIsTransactionModalOpen(true);
  };

  // Close Transaction Modal
  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
  };

  // WebSocket connection for live prices
  useEffect(() => {
    getWatchList();
    const ws = new WebSocket("ws://localhost:3500"); // Replace with your WebSocket URL

    ws.onopen = () => console.log("Connected to WebSocket");
    // console.log("WatchList symbols", watchlist);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log("Live Data:", message);

      // Update livePrices with the current price for each symbol
      const updatedPrices = {};
      Object.entries(message).forEach(([symbol, details]) => {
        updatedPrices[symbol] = details.current || 0; // Store only the price
      });

      setLivePrices((prev) => ({ ...prev, ...updatedPrices }));
    };

    ws.onclose = () => console.log("WebSocket Disconnected");
    return () => ws.close();
  }, []);

  // Filter symbols based on user input
  useEffect(() => {
    if (searchTerm) {
      const filteredSymbols = Object.keys(defaultSymbols).filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSymbols);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Set the initial theme based on localStorage (if previously set)
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme");
  //   getWatchList();

  //   if (storedTheme === "dark") {
  //     setDarkMode(true);
  //     document.body.classList.add("dark");
  //   } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     setDarkMode(true);
  //     document.documentElement.classList.add("dark");
  //   } else if (storedTheme == "light") {
  //     setDarkMode("false");
  //     document.body.classList.remove("dark");
  //   }
  // }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  };

  // Add symbol to watchlist
  const addToWatchlist = async (symbol) => {
    // Add symbol to watchlist
    const response = await axios.post(
      "http://localhost:3500/api/v1/fetch/add-watchlist",
      { symbol: symbol },
      { withCredentials: true }
    );
    if (response.data.success) {
      setWatchlist([...watchlist, symbol]);
    } else {
      toast.error(response.data.message);
    }

    // setWatchlist([...watchlist, symbol]);
  };

  // Remove symbol from watchlist
  const removeFromWatchlist = async (symbol) => {
    // Remove symbol from watchlist
    const response = await axios.post(
      "http://localhost:3500/api/v1/fetch/remove-watchlist",
      { symbol: symbol },
      { withCredentials: true }
    );
    if (response.data.success) {
      setWatchlist(watchlist.filter((item) => item !== symbol));
    } else {
      console.log(response.data.message);
    }

    setWatchlist(watchlist.filter((item) => item !== symbol));
  };

  // Toggle watchlist sidebar visibility
  const toggleWatchlist = () => {
    setIsWatchlistVisible(!isWatchlistVisible);
  };

  // console.log("After Fetching :- ", watchlist);

  return (
    <>
      <nav className="bg-transparent backdrop-blur-md backdrop-filter text-indigo-600 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <div className="text-lg font-bold">
            <img src={brand_logo} alt="" className="size-10 rounded-xl" />
          </div>

          {/* Hamburger Menu (Mobile/Tablet) */}
          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>

          {/* Navbar Menu */}
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 bg-opacity-80 md:bg-transparent md:flex space-y-4 md:space-y-0 md:space-x-10 text-sm font-medium md:items-center ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            {[
              {
                name: "Products",
                submenus: [
                  {
                    name: "About",
                    submenus: [],
                  },
                  { name: "Transaction", submenus: [] },
                  { name: "Profile", submenus: [] },
                ],
              },
              {
                name: "Market",
                submenus: [],
              },
              { name: "Social", submenus: [] },
              { name: "News", submenus: [] },
              {
                name: "More",
                submenus: [
                  {
                    name: "History-Trades",
                    submenus: [],
                  },
                  {
                    name: "History-Transactions",
                    submenus: [],
                  },
                ],
              },
            ].map((menu, index) => (
              <li key={index} className="group relative">
                {/* Main Menu */}
                <button className="hover:text-gray-300 transition-colors duration-200">
                  {menu.name == "Market" ||
                  menu.name == "Social" ||
                  menu.name == "News" ? (
                    <Link to={`/${menu.name}`}>{menu.name}</Link>
                  ) : (
                    menu.name
                  )}
                </button>

                {/* First Level Submenu */}
                {menu.submenus.length > 0 && (
                  <ul className="absolute top-5 left-0 w-40 bg-white text-black rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                    {menu.submenus.map((submenu, idx) => (
                      <li key={idx} className="group relative">
                        {/* Submenu Item */}
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                          {submenu.name === "Transaction" ? (
                            <button onClick={openTransactionModal}>
                              {submenu.name}
                            </button>
                          ) : (
                            <Link to={`${submenu.name}`}>{submenu.name}</Link>
                          )}

                          {/* Arrow Indicator */}
                          {submenu.submenus.length > 0 && (
                            <span className="ml-2 text-sm">
                              <ChevronRight />
                            </span>
                          )}
                        </div>

                        {/* Second Level Submenu with Vertical Line */}
                        {submenu.submenus.length > 0 && (
                          <div className="flex absolute left-full top-0">
                            {/* Vertical Line */}
                            <div className="border-l-2 border-gray-600 h-full"></div>
                            {/* Submenu */}
                            <ul className="bg-white text-black rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                              {submenu.submenus.map((subsubmenu, subIdx) => (
                                <li
                                  key={subIdx}
                                  className="px-5 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                                >
                                  <a href="#">{subsubmenu}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Right Side: Search Bar and User Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                <SearchIcon className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  className="bg-transparent outline-none ml-2 text-white w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-gray-800 rounded-lg shadow-lg z-50">
                  {suggestions.map((name, index) => {
                    const symbol = defaultSymbols[name];
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                      >
                        <span className="text-white">{name}</span>
                        <span className="text-green-400">
                          {livePrices[symbol]
                            ? `$${livePrices[symbol].toFixed(2)}`
                            : "Loading..."}
                        </span>
                        <button
                          onClick={() => addToWatchlist(symbol)}
                          className="text-white hover:text-green-400"
                        >
                          <PlusIcon size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <button
              className="flex items-center space-x-2 bg-transparent hover:bg-gray-300/40 text-indigo-600 py-2 px-4 rounded-3xl transition-colors duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <UserIcon />
            </button>
            {user && (
              <button
                className="text-indigo-600 py-2 px-4 hover:bg-gray-300/40 rounded-3xl transition-colors duration-200"
                onClick={toggleWatchlist} // Toggle watchlist sidebar
              >
                <WatchIcon size={25} />
              </button>
            )}

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <ul className="absolute top-full right-10 w-48 bg-white text-black rounded-lg shadow-lg">
                <li className="px-4 py-2 hover:text-white transition-colors duration-200">
                  {user ? (
                    <>
                      <div
                        className="text-red-500 hover:text-red-700 hover:bg-gray-200 px-4 py-2 flex items-center space-x-2 cursor-pointer"
                        onClick={logout}
                      >
                        <LucideLogOut />
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to={"/login"}
                        className="hover:text-red-500 px-4 py-2"
                      >
                        <LogInIcon />
                        Sign In
                      </Link>
                    </>
                  )}
                </li>
                {/* Horizontal Divider */}
                {user && (
                  <>
                    <li>
                      <hr className="border-gray-300 my-1" />
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      <Link to={"/profile"}>Profile</Link>
                    </li>
                  </>
                )}
                <li>
                  <hr className="border-gray-300 my-1" />
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                  <Link to="/Help-Center">Help Center</Link>
                </li>

                {/* <li className="flex justify-center items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    Dark Theme&nbsp;&nbsp;&nbsp;
                    {/* Dark Mode Toggle Button */}
                {/* <button */}
                {/* onClick={toggleDarkMode} */}
                {/* className="text-white py-2 px-4 rounded-full bg-gray-800 hover:bg-gray-600 transition-colors duration-200" */}
                {/* > */}
                {/* {darkMode ? ( */}
                {/* <span className="text-yellow-400">🌙</span> */}
                {/* ) : ( */}
                {/* <span className="text-yellow-400">🌞</span> */}
                {/* )} */}
                {/* </button> */}
                {/* </div> */}
                {/* </li> */}
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
      />

      {/* Watchlist Sidebar */}
      {isWatchlistVisible && (
        <div className="fixed top-16 right-0 w-80 h-full bg-transparent backdrop-blur-md backdrop-filter text-white p-4 overflow-y-auto z-10">
          <h2 className="text-lg font-bold mb-4 text-indigo-600">Watchlist</h2>
          {watchlist?.length > 0 ? (
            watchlist.map((symbol, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2 p-2 bg-gray-700 rounded-lg"
              >
                <span>{symbol}</span>
                <span className="text-green-400">
                  {livePrices[symbol]
                    ? `$${livePrices[symbol].toFixed(2)}`
                    : "Loading..."}
                </span>
                <button
                  onClick={() => removeFromWatchlist(symbol)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XIcon size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No symbols in watchlist.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
