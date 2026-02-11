
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User as UserIcon } from 'lucide-react';
import { MOCK_USERS } from '../Userconstants';
import { User } from '../../../types';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const foundUser = MOCK_USERS.find(u => u.id === id);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [id]);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f8fafc]">
        <div className="text-slate-400 font-medium">User not found</div>
      </div>
    );
  }

  const nameParts = user.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const handleEditClick = () => {
    navigate(`/user/edit/${user.id}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">User Information</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below is a user information entry</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Information Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">First Name</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {firstName}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Last Name</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {lastName}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Gender</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {user.gender || 'Female'}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Number Phone</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {user.phone}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Address</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {user.address}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Email</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {user.email}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Company</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {user.companyName}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Password</label>
                <div className="relative">
                  <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium pr-12">
                    {showPassword ? "vpstart_secret" : "**********"}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Roles</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {user.role || 'Admin'}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Confirm Password</label>
                <div className="relative">
                  <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium pr-12">
                    {showConfirmPassword ? "vpstart_secret" : "**********"}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8">
                <button
                  onClick={() => navigate('/user/vpstart')}
                  className="px-10 py-3 rounded-xl border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditClick}
                  className="px-12 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                >
                  Edit Information
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
