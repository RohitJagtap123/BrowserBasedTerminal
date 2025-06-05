import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-400 font-mono relative overflow-hidden">
      {/* Terminal grid background */}
      <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.1)_1px,transparent_1px)] opacity-20 pointer-events-none"></div>
      
      {/* CRT scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,16,16,0)_50%,rgba(0,255,128,0.05)_51%)] bg-[length:100%_4px] animate-[scanline_8s_linear_infinite] opacity-5 pointer-events-none"></div>
      
      {/* Floating Matrix characters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-green-500 opacity-20 text-xs font-mono"
            initial={{ 
              y: Math.random() * -100,
              x: Math.random() * window.innerWidth,
              opacity: 0
            }}
            animate={{ 
              y: window.innerHeight + 100,
              opacity: [0, 0.3, 0.2, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 10,
              delay: Math.random() * 5,
              repeat: Infinity
            }}
            style={{ 
              fontSize: `${Math.random() * 10 + 8}px`,
              left: `${Math.random() * 100}%`
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </motion.span>
        ))}
      </div>

      {/* Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.img
            src="src\assets\shellify-logo.webp" 
            alt="Shellify Logo"
            className="h-12 w-12 object-contain cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            className="text-3xl font-bold text-green-400 cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Shellify
          </motion.h1>
        </div>

        {/* Navigation buttons */}
        <nav>
          <motion.button
            className="px-6 py-2 text-lg font-semibold bg-black text-green-400 rounded-md hover:bg-green-900 transition-all border border-green-500 border-opacity-30"
            whileHover={{ scale: 1.05, backgroundColor: "#064e3b" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            > login
          </motion.button>
          <motion.button
            className="ml-4 px-6 py-2 text-lg font-semibold bg-green-600 text-black rounded-md hover:bg-green-500 transition-all"
            whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
          >
            $ signup
          </motion.button>
        </nav>
      </header>

      {/* Main content */}
      <motion.div
        className="text-center px-6 z-10 max-w-4xl mt-19"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-6xl font-extrabold leading-tight tracking-wide mb-6">
          <span className="text-green-400">$ </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
            Your Language.
          </span>
          <br /> 
          <span className="text-green-300">$ Your Shell.</span>
          <br />
          <span className="text-green-300">$ Zero Setup.</span>
        </h2>
        
        {/* Terminal window */}
        <div className="bg-black bg-opacity-50 border border-green-800 rounded-lg p-6 text-left mt-8 backdrop-blur-sm">
          <div className="flex mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-green-300 mb-2 overflow-hidden">
            <span className="text-green-600">user@shellify:~$ </span>
            <span className="border-r-4 border-green-500 pr-1 inline-block whitespace-nowrap">
              Instant cloud-based terminals
            </span>
          </p>
          <p className="text-green-300 mb-2 overflow-hidden">
            <span className="text-green-600">user@shellify:~$ </span>
            <span className="border-r-4 border-green-500 pr-1 inline-block whitespace-nowrap">
              Isolated environments per language
            </span>
          </p>
          <p className="text-green-300 overflow-hidden">
            <span className="text-green-600">user@shellify:~$ </span>
            <span className="border-r-4 border-green-500 pr-1 inline-block whitespace-nowrap">
              Accessible from any browser
            </span>

          </p>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 space-x-4">
          <motion.button
            className="px-8 py-3 bg-green-600 text-black text-lg font-semibold rounded-md hover:bg-green-500 transition-all"
            whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/home")}
          >
            $ get_started
          </motion.button>
          <motion.button
            className="px-8 py-3 bg-black text-green-400 text-lg font-semibold rounded-md hover:bg-green-900 transition-all border border-green-500 border-opacity-30"
            whileHover={{ scale: 1.05, backgroundColor: "#064e3b" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            > login
          </motion.button>
        </div>
      </motion.div>
      
      {/* Add keyframes to your Tailwind config */}
      <style jsx global>{`
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes typing {
          0% { width: 0 }
          50% { width: 100% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  );
};

export default Landing;