// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import LandingPage from "./pages/LandingPage";
// import DematOpening from "./components/DematOpening";
// import { Toaster } from "react-hot-toast";
// import Demo from "./pages/Demo";
// import { useEffect, useState } from "react";
// import LoadingAnimation from "./components/LoadingAnimation";

// function App() {
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Check if the user has already seen the animation
//     const hasSeenAnimation = localStorage.getItem("hasSeenAnimation");

//     if (!hasSeenAnimation) {
//       // If not, show the animation and set the flag in localStorage
//       setIsLoading(true);
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//         localStorage.setItem("hasSeenAnimation", "true"); // Mark as seen
//       }, 10000); // 3 seconds

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   return (
//     <>
//       {/* Show LoadingAnimation only if isLoading is true */}
//       {isLoading && <LoadingAnimation />}
//       <Routes>
//         <Route path="/" element={<LandingPage />}></Route>
//         <Route path="/validation" element={<DematOpening />}></Route>
//         <Route path="/demo" element={<Demo />}></Route>
//       </Routes>
//       <Toaster />
//     </>
//   );
// }

// export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import DematOpening from "./components/DematOpening";
import toast, { Toaster } from "react-hot-toast";
import Demo from "./pages/Demo";
import { useEffect, useState } from "react";
import LoadingAnimation from "./components/LoadingAnimation";
import DematLogin from "./pages/DematLogin";
import { useUserAuthStore } from "./store/UserAuth";
import StartingLoader from "./components/Loader/StartingLoader";
import MyProfile from "./components/MyProfile";
import TradingPage from "./pages/TradingPage";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./Admin/AdminDashboard";
// import Transaction from "./components/TransactionModal";
import NotFoundPage from "./pages/NotFoundPage";
import SocialPage from "./pages/SocialPage";
import MarketPage from "./pages/MarketPage";
import NewsPage from "./pages/NewsPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import TradeHistory from "./pages/TradeHistory";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, fetchUser, isLogged } = useUserAuthStore();
  // const isLogged
  // console.log("User is :- ", Object.keys(user));
  // console.log(user);

  useEffect(() => {
    fetchUser();
    console.log("useEffect running..."); // Debugging
    const hasSeenAnimation = sessionStorage.getItem("hasSeenAnimation");
    console.log("hasSeenAnimation:", hasSeenAnimation); // Debugging

    if (!hasSeenAnimation) {
      console.log("First visit in this tab - showing loading animation"); // Debugging
      setIsLoading(true);
      const timer = setTimeout(() => {
        console.log("Loading animation complete"); // Debugging
        setIsLoading(false);
        sessionStorage.setItem("hasSeenAnimation", "true"); // Mark as seen for this tab
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    } else {
      console.log("Subsequent visit in this tab - skipping loading animation"); // Debugging
    }
  }, [fetchUser]);

  console.log("isLoading:", isLoading); // Debugging

  return (
    <>
      {/* Show LoadingAnimation only if isLoading is true */}
      {isLoading && <StartingLoader />}
      {!isLoading && (
        <>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* {isLogged && ( */}
            <Route path="/validation" element={<DematOpening />} />
            {/* )} */}
            <Route path="/demo" element={<Demo />} />
            <Route path="/login" element={<DematLogin />} />
            {isLogged && <Route path="/Profile" element={<MyProfile />} />}
            {/* {localStorage.getItem("userId") && ( */}
            {isLogged && <Route path="/Trade" element={<TradingPage />} />}
            {/* )} */}

            <Route path="/About" element={<AboutUs />} />
            {localStorage.getItem("userId") === "67b6e13f72ed5a4f35afcf04" && (
              <Route path="/Admin" element={<AdminDashboard />} />
            )}
            {/* )} */}
            {isLogged && (
              <Route path="/History-Trades" element={<TradeHistory />} />
            )}
            {isLogged && (
              <Route
                path="/History-Transactions"
                element={<TransactionHistory />}
              />
            )}
            <Route path="/Help-Center" element={<HelpCenterPage />} />
            <Route path="/Social" element={<SocialPage />} />
            <Route path="/Market" element={<MarketPage />} />
            <Route path="/News" element={<NewsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Toaster />
        </>
      )}
    </>
  );
}

export default App;
