
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { MOCK_METERS } from '../constants/Meterconstants';
import { Meter } from '../../../types';

const MeterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meter, setMeter] = useState<Meter | null>(null);

  useEffect(() => {
    const foundMeter = MOCK_METERS.find(m => m.id === id);
    if (foundMeter) {
      setMeter(foundMeter);
    }
  }, [id]);

  if (!meter) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f8fafc]">
        <div className="text-slate-400 font-medium">Meter not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">Meter in formation</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below to create a meter entry</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* Meter Name */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Name</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner">
                {meter.name}
              </div>
            </div>

            {/* Meter Category */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Category</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner">
                {meter.type}
              </div>
            </div>

            {/* Meter Serial */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Serial</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner">
                {meter.serial}
              </div>
            </div>

            {/* Meter Group */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Group</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner uppercase">
                {meter.group}
              </div>
            </div>

            {/* Meter Ratio */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Ratio</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner">
                {meter.ration}
              </div>
            </div>

            {/* Transformer Capacity */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Transformer Capacity</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner">
                {meter.trCap}
              </div>
            </div>

            {/* Meter Brand */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Meter Brand</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner uppercase">
                {meter.brand}
              </div>
            </div>

            {/* Transformer Brand */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Transformer Brand</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner uppercase">
                {meter.trBrand}
              </div>
            </div>

            {/* Customer Name */}
            <div className="md:col-span-1 space-y-2">
              <label className="text-[13px] font-semibold text-slate-400 ml-1">Customer Name</label>
              <div className="w-full bg-[#f0f2f5] rounded-md px-4 py-4 text-slate-700 font-medium shadow-inner flex items-center justify-between">
                <span className="truncate">{meter.company}</span>
                <ChevronRight size={18} className="text-slate-400 ml-2 flex-shrink-0" />
              </div>
            </div>

            {/* Empty space for grid alignment if needed */}
            <div className="hidden md:block"></div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-8 pt-4">
              <button
                onClick={() => navigate('/upload')}
                className="px-12 py-3 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate(`/meter/edit/${meter.id}`)}
                className="px-8 py-3 rounded-lg bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
              >
                Edit Information
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterDetail;
