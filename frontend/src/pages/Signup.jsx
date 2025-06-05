import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const BACKEND = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${BACKEND}/api/auth/signup`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Account Created Successfully!");
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup failed!");
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Terminal grid background */}
      <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.1)_1px,transparent_1px)] opacity-20"></div>

      {/* CRT scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,16,16,0)_50%,rgba(0,255,128,0.05)_51%)] bg-[length:100%_4px] animate-[scanline_8s_linear_infinite] opacity-5"></div>

      {/* Floating Matrix-like characters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-green-500 opacity-20 text-xs font-mono"
            initial={{
              y: Math.random() * -100,
              x: Math.random() * window.innerWidth,
              opacity: 0,
            }}
            animate={{
              y: window.innerHeight + 100,
              opacity: [0, 0.3, 0.2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 10,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
            style={{
              fontSize: `${Math.random() * 10 + 8}px`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {String.fromCharCode(0x30a0 + Math.random() * 96)}
          </motion.span>
        ))}
      </div>

      {/* Sign-Up Card */}
      <motion.div
        className="bg-black/80 p-8 rounded-lg shadow-lg w-96 text-center z-10 border border-green-400/30 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center">
          <a href="/">
            <img
              src="src/assets/shellify-logo.webp"
              alt="Shellify Logo"
              className="w-13 mb-2"
            />
          </a>

          <h2 className="text-2xl font-bold mb-2 text-green-400">Shellify</h2>

          <h4 className="text-3xl font-bold mb-2 text-green-400">
            &gt; create_account
          </h4>
        </div>

        <div className="space-y-4">
          <div className="text-left">
            <label className="text-green-300 text-sm">$ name</label>
            <input
              type="text"
              className="w-full p-3 mt-1 border border-green-400/30 rounded-md bg-black text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 font-mono"
              placeholder="enter_your_name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              onKeyUp={handleInputEnter}
            />
          </div>

          <div className="text-left">
            <label className="text-green-300 text-sm">$ email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 border border-green-400/30 rounded-md bg-black text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 font-mono"
              placeholder="enter_your_email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onKeyUp={handleInputEnter}
            />
          </div>

          <div className="text-left">
            <label className="text-green-300 text-sm">$ password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 mt-1 border border-green-400/30 rounded-md bg-black text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 font-mono"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onKeyUp={handleInputEnter}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 cursor-pointer text-green-400/70 hover:text-green-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="text-left">
            <label className="text-green-300 text-sm">$ confirm_password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 mt-1 border border-green-400/30 rounded-md bg-black text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 font-mono"
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                onKeyUp={handleInputEnter}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 cursor-pointer text-green-400/70 hover:text-green-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <motion.button
            className="w-full bg-green-600 text-black p-3 rounded-md font-semibold hover:bg-green-500 transition-all mt-6 font-mono"
            onClick={handleSignUp}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "> processing..." : "> sign_up"}
          </motion.button>

          <p className="text-sm text-green-400/70 mt-4">
            $ already_have_account?{" "}
            <a
              href="/login"
              className="text-green-400 hover:underline hover:text-green-300"
            >
              &gt; login
            </a>
          </p>
        </div>
      </motion.div>

      {/* Add keyframes to your Tailwind config */}
      <style jsx global>{`
        @keyframes scanline {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
