import React from "react";
import { useNavigate } from "react-router-dom";
import EnvCard from "../components/EnvCards";

const languages = [{
    name: "Python",
    description: "An easy-to-read language widely used for web, data science, automation, and scripting.",
    color: "bg-blue-500",
    textColor: "text-blue-400",
    icon: "🐍"
  },
  {
    name: "Java",
    description: "A robust, platform-independent language widely used in enterprise and Android development.",
    color: "bg-red-500",
    textColor: "text-red-400",
    icon: "☕"
  },
  {
    name: "CPP",
    description: "A high-performance language commonly used for system programming and game development.",
    color: "bg-purple-500",
    textColor: "text-purple-400",
    icon: "🖥️"
  },
  {
    name: "Node",
    description: "The core language of the web, used for interactive websites and modern web apps.",
    color: "bg-green-500",
    textColor: "text-green-400",
    icon: "⬢"
  },
  {
    name: "Go",
    description: "A statically typed language by Google, known for simplicity and great concurrency support.",
    color: "bg-cyan-500",
    textColor: "text-cyan-400",
    icon: "🚀"
  },
  {
    name: "Rust",
    description: "A systems programming language focused on safety, speed, and concurrency without garbage collection.",
    color: "bg-orange-500",
    textColor: "text-orange-400",
    icon: "🦀"
  },
  {
    name: "Ruby",
    description: "A flexible language known for developer happiness and powering the Ruby on Rails framework.",
    color: "bg-pink-500",
    textColor: "text-pink-400",
    icon: "💎"
  },
  {
    name: "PHP",
    description: "A widely-used, open-source scripting language primarily used for server-side web development",
    color: "bg-indigo-500",
    textColor: "text-indigo-400",
    icon: "🐘"
  },
  {
    name: "Bash",
    description: "A command-line scripting language used in Linux environments for automation and system tasks.",
    color: "bg-gray-500",
    textColor: "text-gray-400",
    icon: "💻"
  },];

const Landing = () => {
  const navigate = useNavigate();

  // Read user info (assume saved in localStorage)
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    // Clear token and user info
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-full px-4 sm:px-10 min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      
      {/* User profile & logout at top right */}
      <div className="absolute top-5 right-5 flex items-center space-x-4 z-20">
        <button
          onClick={handleLogout}
          className="bg-green-600 hover:bg-red-700 text-white px-3 py-1 rounded font-mono text-sm mt-3"
        >
          Logout
        </button>
      </div>

      {/* Terminal grid background */}
      <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.1)_1px,transparent_1px)] opacity-20 pointer-events-none"></div>
      
      {/* CRT scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,16,16,0)_50%,rgba(0,255,128,0.05)_51%)] bg-[length:100%_4px] animate-[scanline_8s_linear_infinite] opacity-5 pointer-events-none"></div>
      
      {/* Header with blinking cursor */}
      <div className="relative pt-5 pb-5">
        <h1 className="text-4xl font-bold text-green-400 mb-1">
          Shellify<span className="animate-pulse">_</span>
        </h1>
        <p className="text-green-300">
          $ Select your environment<span className="animate-pulse">_</span>
        </p>
      </div>

      {/* Environment cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20 relative z-10">
        {languages.map((lang, index) => (
          <EnvCard
            key={index}
            name={lang.name}
            description={lang.description}
            color={lang.color}
            textColor={lang.textColor}
            icon={lang.icon}
          />
        ))}
      </div>

      {/* Add keyframes to your Tailwind config */}
      <style jsx global>{`
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
};

export default Landing;
