import React from "react";
import { useNavigate } from "react-router";

const EnvCard = ({ name, description }) => {
  const navigate = useNavigate();

  return (
    <div className="h-[16em] w-[18em] border border-indigo-500/40 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-700/30 to-transparent text-white font-nunito p-6 flex flex-col justify-between backdrop-blur-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-white">{name}</h1>
        <p className="text-sm text-gray-200 mt-1">{description}</p>
      </div>

      <button
        onClick={() => navigate(`/terminal/${name}`)}
        className="mt-4 w-fit px-4 py-2 border border-white/20 rounded-full flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-200"
      >
        <p className="text-white font-medium">Launch</p>
        <svg
          className="w-5 h-5 group-hover:translate-x-[10%] transition-transform duration-300"
          stroke="currentColor"
          strokeWidth="1.5"
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
      </button>
    </div>
  );
};

export default EnvCard;
