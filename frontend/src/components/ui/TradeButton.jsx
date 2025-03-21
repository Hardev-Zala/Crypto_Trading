import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TradeButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex items-center justify-center mt-10 ms-[100px]"
    >
      <Link
        to="/Trade"
        className="relative px-6 py-3 text-lg font-semibold tracking-wide text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text 
        transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.8)]"
      >
        <span className="absolute inset-0 transition-all duration-500 transform scale-50 bg-indigo-600 rounded-full blur-xl opacity-30 hover:opacity-50"></span>
        All right. Let's Trade 🚀
      </Link>
    </motion.div>
  );
};

export default TradeButton;
