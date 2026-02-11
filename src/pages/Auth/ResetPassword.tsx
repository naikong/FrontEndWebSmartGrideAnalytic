import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state?.email || "admin@vpstart.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password reset successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-[440px] bg-white rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
            <img src="https://cdn-icons-png.flaticon.com/512/1053/1053155.png" alt="Logo" className="w-9 h-9 object-contain invert opacity-80" />
          </div>
          <h1 className="text-slate-800 text-2xl font-black uppercase tracking-tight">Web Smart</h1>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-1 opacity-70">Grid Analytics</p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-emerald-600 font-bold text-lg uppercase tracking-wide">Confirm Reset</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">Create a new password for <br/> <span className="text-blue-600 font-bold">{email}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">New Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-slate-800">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-[#1a1c24] hover:bg-slate-800 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-slate-200 mt-4">Reset Password</button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <Link to="/login" className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Return to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;