
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User as UserIcon } from 'lucide-react';

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
    console.log('Creating user:', formData);
    alert('User created successfully!');
    navigate('/user/vpstart');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">Create New User</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below to create a user</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                   <UserIcon size={80} className="text-slate-300 group-hover:text-slate-400" />
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Gender</label>
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Number Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-semibold text-slate-500 ml-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-semibold text-slate-500 ml-1">Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="**********"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
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

              <div className="space-y-1.5 md:col-span-1">
                <label className="text-sm font-semibold text-slate-500 ml-1">Roles</label>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
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

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/user/vpstart')}
                  className="px-10 py-3 rounded-xl border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-12 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                >
                  Create
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
