import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User as UserIcon, ArrowLeft } from 'lucide-react';

const CreateUser: React.FC = () => {
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
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('User created:', formData);
    alert('User created successfully!');
    navigate('/user/vpstart');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Create New User</h1>
          <p className="text-sm text-slate-400 mt-1">Fill in the details below to create a new platform user</p>
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full bg-slate-50 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative group cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center">
                   <UserIcon size={80} className="text-slate-200 group-hover:text-slate-300" />
                </div>
              </div>
              <p className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select Profile Image</p>
            </div>

            {/* Form Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 transition-all outline-none appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+855 XXX XXX XXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Physical Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Assign to Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Select company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">User Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 transition-all outline-none appearance-none"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Administrator</option>
                  <option value="User">Standard User</option>
                  <option value="Viewer">Viewer Only</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Account Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="**********"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                    required
                  />
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
                <label className="text-sm font-semibold text-slate-500 ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="**********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-10 py-3 rounded-xl border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-12 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                >
                  Create User
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;