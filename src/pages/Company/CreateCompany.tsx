
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus } from 'lucide-react';

const CreateCompany: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    phone: '',
    district: '',
    email: '',
    commune: '',
    website: '',
    province: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating company:', formData);
    alert('Company created successfully!');
    navigate('/company');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">Create New Company</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below to create a new company entry</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-20">
            
            {/* Logo Upload Section */}
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full border border-gray-200 bg-white flex flex-col items-center justify-center p-8 relative shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Upload size={32} className="text-slate-300" />
                  <p className="text-[10px] text-slate-400 font-medium px-4">
                    Browse and chose the image you want to upload from your computer
                  </p>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#0f172a] rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-slate-800 transition-colors">
                  <Plus size={20} />
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Company Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Company Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Village</label>
                <input
                  type="text"
                  name="village"
                  placeholder="Village"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Contact Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="XXXX-XXXX-XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">District</label>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Commune</label>
                <input
                  type="text"
                  name="commune"
                  placeholder="Commune"
                  value={formData.commune}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Web Sit URL</label>
                <input
                  type="text"
                  name="website"
                  placeholder="https://"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Province</label>
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-medium placeholder-slate-300 focus:ring-2 focus:ring-slate-300 transition-all outline-none"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-12">
                <button
                  type="button"
                  onClick={() => navigate('/company')}
                  className="px-10 py-2.5 rounded-lg border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-12 py-2.5 rounded-lg bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
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

export default CreateCompany;
