import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CreateMeter: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    serial: '',
    group: '',
    ratio: '',
    trCap: '',
    brand: '',
    trBrand: '',
    customer: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Meter created successfully!');
    navigate('/upload');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="px-10 py-8">
        <h1 className="text-2xl font-bold text-slate-800">Create New Meter</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below to create a meter entry</p>
      </div>

      {/* Form Container */}
      <div className="px-10 pb-12">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-14 max-w-full">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Meter Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Meter Name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Meter Serial</label>
                <input 
                  type="text" 
                  name="serial"
                  placeholder="Serial Number" 
                  value={formData.serial}
                  onChange={handleChange}
                  className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Meter Ratio</label>
                <input 
                  type="text" 
                  name="ratio"
                  placeholder="Meter Ratio" 
                  value={formData.ratio}
                  onChange={handleChange}
                  className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Meter Brand</label>
                <div className="relative group cursor-pointer">
                  <input 
                    type="text" 
                    name="brand"
                    placeholder="Meter Brand" 
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all pr-12" 
                  />
                  <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Customer Name</label>
                <div className="relative group cursor-pointer">
                  <input 
                    type="text" 
                    name="customer"
                    placeholder="Cusomter" 
                    value={formData.customer}
                    onChange={handleChange}
                    className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all pr-12" 
                  />
                  <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Meter Category</label>
                <div className="relative group cursor-pointer">
                  <input 
                    type="text" 
                    name="category"
                    placeholder="Meter Category" 
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all pr-12" 
                  />
                  <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Meter Group</label>
                <div className="relative group cursor-pointer">
                  <input 
                    type="text" 
                    name="group"
                    placeholder="Meter Group" 
                    value={formData.group}
                    onChange={handleChange}
                    className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all pr-12" 
                  />
                  <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Transformer Capacity</label>
                <div className="relative group cursor-pointer">
                  <input 
                    type="text" 
                    name="trCap"
                    placeholder="Transformer Capacity" 
                    value={formData.trCap}
                    onChange={handleChange}
                    className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all pr-12" 
                  />
                  <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Transformer Brand</label>
                <div className="relative group cursor-pointer">
                  <input 
                    type="text" 
                    name="trBrand"
                    placeholder="Transformer Brand" 
                    value={formData.trBrand}
                    onChange={handleChange}
                    className="w-full bg-[#eef0f4] border-none rounded-lg px-4 py-4 text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all pr-12" 
                  />
                  <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-6 pt-12">
                <button 
                  type="button" 
                  onClick={() => navigate('/upload')} 
                  className="px-12 py-3 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-14 py-3 rounded-lg bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md"
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

export default CreateMeter;