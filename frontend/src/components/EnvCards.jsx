import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const EnvCard = ({ name, description }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="h-[16em] w-[18em] border border-green-400/20 rounded-lg bg-black/70 text-green-400 font-mono p-6 flex flex-col justify-between backdrop-blur-sm hover:backdrop-blur transition-all duration-300 relative overflow-hidden group"
      whileHover={{ y: -5, borderColor: "#10b981" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Terminal corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-green-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-green-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-green-400 rounded-br-lg"></div>
      
      {/* Pulsing dot */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-green-500">$</span>
          <h1 className="text-xl font-bold text-green-300">{name}</h1>
        </div>
        <p className="text-sm text-green-300/80 mt-1 pl-6">{description}</p>
      </div>

      <motion.button
        onClick={() => navigate(`/terminal/${name}`)}
        className="mt-4 w-fit px-4 py-2 border border-green-400/30 rounded-md flex items-center gap-2 bg-green-900/30 hover:bg-green-800/50 transition-all duration-200 group"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="text-green-300 font-medium"> launch</span>
        <svg
          className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform duration-200"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </motion.button>

      {/* Binary code animation in background */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <span 
            key={i}
            className="absolute text-xs text-green-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default EnvCard;