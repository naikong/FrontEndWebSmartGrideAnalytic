import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email) { setError("Email is required"); return false; }
    if (!email.includes("@") || !email.endsWith(".com")) { setError("Invalid email format"); return false; }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) navigate("/reset-password", { state: { email } });
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
          <h2 className="text-slate-800 font-bold text-lg uppercase tracking-wide">Reset Password</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">Enter your email and we'll send a link to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              <Mail size={14} className="text-blue-500" /> Email Address
            </label>
            <input type="email" placeholder="example@vpstart.com" value={email} onChange={e => setEmail(e.target.value)} className={`w-full bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 font-medium`} />
            {error && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{error}</p>}
          </div>
          <button type="submit" className="w-full bg-[#1a1c24] hover:bg-slate-800 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-slate-200">Send Request</button>
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

export default ForgotPassword;