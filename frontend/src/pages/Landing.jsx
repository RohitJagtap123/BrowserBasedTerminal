import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Floating Gradient Blur Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 opacity-20 rounded-full filter blur-3xl top-20 left-10 animate-float"></div>
        <div className="absolute w-80 h-80 bg-purple-500 opacity-20 rounded-full filter blur-3xl bottom-10 right-20 animate-float-delay"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-10">
        <motion.h1
          className="text-3xl font-bold text-white cursor-pointer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Shellify
        </motion.h1>

        <nav>
          <motion.button
            className="px-6 py-2 text-lg font-semibold bg-white bg-opacity-90 text-black rounded-lg shadow-lg hover:bg-opacity-100 transition-all border border-white border-opacity-30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>
          <motion.button
            className="ml-4 px-6 py-2 text-lg font-semibold bg-blue-600 bg-opacity-90 backdrop-blur-md text-white rounded-lg shadow-lg hover:bg-blue-500 transition-all border border-blue-500 border-opacity-20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.div
        className="text-center px-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-6xl font-extrabold leading-tight tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Your Language. Your Shell. <br /> Zero Setup.
        </h2>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
          Shellify gives you a powerful cloud-based terminal that spins up
          isolated environment for each programming language — all
          accessible via a sleek browser interface.
        </p>

        <div className="mt-8 space-x-4">
          <motion.button
            className="px-8 py-3 bg-blue-500 bg-opacity-90 backdrop-blur-md text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-400 transition-all border border-blue-400 border-opacity-20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
          >
            Get Started 🚀
          </motion.button>
          <motion.button
            className="px-8 py-3 bg-white bg-opacity-90 text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-opacity-100 transition-all border border-white border-opacity-30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            Login 🔥
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 via-black to-transparent"></div>
    </div>
  );
};

export default Landing;
