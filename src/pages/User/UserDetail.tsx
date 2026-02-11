
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { MOCK_USERS } from '../constants/Userconstants';
import { User } from '../../../types';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const foundUser = MOCK_USERS.find(u => u.id === id);
    if (foundUser) setUser(foundUser);
  }, [id]);

  if (!user) return <div className="p-8 text-slate-400">User not found</div>;

  const nameParts = user.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Information</h1>
          <p className="text-sm text-slate-400 mt-1">Detailed view of user profile and access levels</p>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full border-4 border-white shadow-xl overflow-hidden">
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="mt-4 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-full border border-indigo-100">
                {user.role}
              </span>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase ml-1">First Name</label><div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-bold">{firstName}</div></div>
              <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase ml-1">Last Name</label><div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-bold">{lastName}</div></div>
              <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase ml-1">Gender</label><div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-bold">{user.gender || 'N/A'}</div></div>
              <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase ml-1">Phone Number</label><div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-bold">{user.phone}</div></div>
              <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label><div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-bold">{user.email}</div></div>
              <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase ml-1">Company</label><div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-bold">{user.companyName}</div></div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
                <div className="relative">
                  <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-bold pr-12">
                    {showPassword ? "vpstart_secret_123" : "**********"}
                  </div>
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8">
                <button onClick={() => navigate(-1)} className="px-10 py-3 rounded-xl border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Cancel</button>
                <button onClick={() => navigate(`/user/edit/${user.id}`)} className="px-12 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 shadow-md">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
