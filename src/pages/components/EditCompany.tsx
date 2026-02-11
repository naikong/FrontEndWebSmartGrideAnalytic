
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { MOCK_COMPANIES } from '../../../Companyconstants';
import { Company } from '../../../types';

const EditCompany: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    phone: '',
    commune: '',
    email: '',
    district: '',
    website: '',
    province: '',
    logoUrl: ''
  });

  useEffect(() => {
    const company = MOCK_COMPANIES.find(c => c.id === id);
    if (company) {
      setFormData({
        name: company.name,
        village: company.village || 'Ou Chum',
        phone: company.phone,
        commune: company.commune || 'Ou Chum',
        email: company.email,
        district: company.district || 'Ou chum',
        website: company.website,
        province: company.province || company.address,
        logoUrl: company.logoUrl
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating company:', formData);
    alert('Company information updated successfully!');
    navigate(`/company/detail/${id}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">Edit Company</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below to edit company entry</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full border border-dashed border-blue-400 bg-white flex items-center justify-center p-6 relative shadow-sm group cursor-pointer hover:bg-slate-50 transition-colors">
                {formData.logoUrl ? (
                  <img 
                    src={formData.logoUrl} 
                    alt="" 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <div className="text-slate-300">No Logo</div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-full">
                  <Pencil size={24} className="text-slate-600" />
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Company Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Village</label>
                <div className="relative">
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Contact Number</label>
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
                <label className="text-sm font-semibold text-slate-500 ml-1">Commune</label>
                <div className="relative">
                  <input
                    type="text"
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Email Address</label>
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
                <label className="text-sm font-semibold text-slate-500 ml-1">District</label>
                <div className="relative">
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Website URL</label>
                <div className="relative">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Province</label>
                <div className="relative">
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full bg-[#f0f2f5] border-none rounded-lg px-4 py-3.5 text-slate-700 font-bold focus:ring-2 focus:ring-slate-300 transition-all outline-none pr-12"
                  />
                  <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-12">
                <button
                  type="button"
                  onClick={() => navigate(`/company/detail/${id}`)}
                  className="px-10 py-2.5 rounded-lg border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-12 py-2.5 rounded-lg bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
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

export default EditCompany;
