
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { MOCK_METERS } from '../constants/Meterconstants';
import { Meter } from '../../../types';

const EditMeter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Meter | null>(null);

  useEffect(() => {
    const foundMeter = MOCK_METERS.find(m => m.id === id);
    if (foundMeter) {
      setFormData({ ...foundMeter });
    }
  }, [id]);

  if (!formData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f8fafc]">
        <div className="text-slate-400 font-medium">Loading...</div>
      </div>
    );
  }

  const handleChange = (field: keyof Meter, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saved meter:', formData);
    alert('Meter information updated successfully!');
    navigate(`/meter/detail/${id}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">Update Meter</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below to create a meter entry</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* Meter Name */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Name</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Meter Category */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Category</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12 uppercase"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Meter Serial */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Serial</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.serial}
                  onChange={(e) => handleChange('serial', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Meter Group */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Group</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.group}
                  onChange={(e) => handleChange('group', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12 uppercase"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Meter Ratio */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Ratio</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.ration}
                  onChange={(e) => handleChange('ration', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Transformer Capacity */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Transformer Capacity</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.trCap}
                  onChange={(e) => handleChange('trCap', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Meter Brand */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Brand</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12 uppercase"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Transformer Brand */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Transformer Brand</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.trBrand}
                  onChange={(e) => handleChange('trBrand', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12 uppercase"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Customer Name */}
            <div className="md:col-span-1 space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Customer Name</label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner focus:ring-2 focus:ring-slate-300 outline-none transition-all pr-12 uppercase"
                />
                <Pencil size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
              </div>
            </div>

            <div className="hidden md:block"></div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-12 py-3 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
              >
                Save Change
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMeter;
