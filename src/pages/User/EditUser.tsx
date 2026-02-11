
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Pencil, ArrowLeft } from 'lucide-react';
import { MOCK_USERS } from '../constants/Userconstants';
import { User } from '../../../types';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    address: '',
    email: '',
    company: '',
    role: '',
    password: '',
    confirmPassword: '',
    avatarUrl: ''
  });

  useEffect(() => {
    const user = MOCK_USERS.find(u => u.id === id);
    if (user) {
      const nameParts = user.name.split(' ');
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        gender: user.gender || 'Female',
        phone: user.phone,
        address: user.address,
        email: user.email,
        company: user.companyName,
        role: user.role,
        password: 'password123',
        confirmPassword: 'password123',
        avatarUrl: user.avatarUrl
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating user:', formData);
    alert('Information updated successfully!');
    navigate(`/user/detail/${id}`);
  };

  if (!formData.firstName) return <div className="p-8 text-slate-400">Loading user data...</div>;

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Edit User Information</h1>
          <p className="text-sm text-slate-400 mt-1">Fill in Detail below is a edit user information entry</p>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Form Card Section */}
      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Avatar Section */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-64 h-64 rounded-full border-[1.5px] border-blue-100 p-2 shadow-inner">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-slate-300">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Pencil size={28} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              {/* Row 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">First Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Last Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Gender</label>
                <div className="relative">
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Number Phone</label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              {/* Row 3 - Address & Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Address</label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              {/* Row 4 - Company & Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Company</label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <Pencil size={18} className="text-slate-600 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 5 - Roles & Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Roles</label>
                <div className="relative">
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-1 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-slate-400 hover:text-slate-600 transition-colors">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <Pencil size={18} className="text-slate-600 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(`/user/detail/${id}`)}
                  className="px-10 py-3 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-10 py-3 rounded-lg bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                >
                  Save Change
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
