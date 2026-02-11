import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FaUserLarge } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Validate input
  const validate = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Login handler (Simple JWT)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      // ✅ Fixed URL for Django Simple JWT
      const res = await axios.post("http://localhost:8000/api/auth/login/", {
        username,
        password,
      });

      // ✅ Save tokens in localStorage
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      navigate("/company"); 
    } catch (error: any) {
      // ✅ Show basic error
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-[440px] bg-white rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="../../logo/Web Smart Grid Analytics logo.png"
            alt="Logo"
            className="w-10 h-10 mb-4 opacity-80"
          />
          <h3 className="text-slate-800 text-2xl font-black uppercase">
            Web Smart Grid
          </h3>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-1">
            Data Analytics
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Username */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <FaUserLarge size={14} />
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full bg-slate-50 border ${
                errors.username ? "border-red-500" : "border-slate-200"
              } rounded-xl px-4 py-3.5 text-sm focus:outline-none`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <RiLockPasswordFill size={14} />
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-50 border ${
                  errors.password ? "border-red-500" : "border-slate-200"
                } rounded-xl px-4 py-3.5 text-sm pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="w-4 h-4" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-bold text-slate-500 hover:text-blue-600"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a1c24] hover:bg-slate-800 text-white font-bold text-sm py-4 rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
