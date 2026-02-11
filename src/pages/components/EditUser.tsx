
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Pencil } from 'lucide-react';
import { MOCK_USERS } from '../Userconstants';
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

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">Edit User Information</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below is a edit user information entry</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-300">No Image</div>
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Pencil size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">First Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Last Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Gender</label>
                <div className="relative">
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Number Phone</label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Address</label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Company</label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <Pencil size={18} className="text-slate-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Roles</label>
                <div className="relative">
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-slate-400">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <Pencil size={18} className="text-slate-600" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate(`/user/detail/${id}`)}
                  className="px-10 py-3 rounded-xl border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-12 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
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
