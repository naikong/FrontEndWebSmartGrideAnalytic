import React, { useState } from 'react';
import { 
  Download, 
  Calendar,
  Edit2,
  ChevronDown,
  X,
  FileText,
  Activity,
  BarChart3,
  Search,
  LayoutGrid
} from 'lucide-react';
import { Company } from '../../../types';

interface DailyDashboardProps {
  selectedCompany: Company;
  startDate: string;
  endDate: string;
}

const DailyDashboard: React.FC<DailyDashboardProps> = ({ selectedCompany }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleManualGenerate = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 800);
  };
  
  const EnergyRow = ({ label, value, trend, color, percentage }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div className="flex flex-col flex-1">
        <span className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
          <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-8 min-w-[140px] justify-end">
        <span className="text-[16px] font-black text-slate-800 tabular-nums">{value}</span>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 border ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
          {trend}
        </span>
      </div>
    </div>
  );

  return (
    <div className={`bg-[#eff2f5] min-h-full p-6 space-y-6 animate-in fade-in duration-500 transition-opacity ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* 1. REPORT FILTERS HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-6 items-end">
          {/* Customer Selection */}
          <div className="flex flex-col space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight ml-0.5">Customer:</label>
            <div className="relative min-w-[320px]">
              <div className="appearance-none w-full bg-slate-200/50 border border-slate-300 rounded-md py-1.5 pl-3 pr-10 text-[12px] font-bold text-slate-500 flex items-center justify-between shadow-sm cursor-pointer">
                <span className="truncate">{selectedCompany.name}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Report Date */}
          <div className="flex flex-col space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight ml-0.5">Report Date :</label>
            <div className="relative min-w-[240px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-slate-900">
                <Calendar size={14} />
              </div>
              <input 
                type="text" 
                value="18/October/2025"
                readOnly
                className="w-full bg-white border border-slate-300 rounded-md py-1.5 pl-9 pr-8 text-[12px] font-bold text-slate-700 shadow-sm outline-none"
              />
              <button className="absolute inset-y-0 right-0 px-2.5 text-slate-300 hover:text-slate-500">
                <X size={14} className="border border-slate-200 rounded-full" />
              </button>
            </div>
          </div>

          {/* Daily Energy Rate */}
          <div className="flex flex-col space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight ml-0.5">Daily Energy Rate</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value="$0.015"
                readOnly
                className="w-28 bg-white border border-slate-300 rounded-md py-1.5 px-3 text-[12px] font-bold text-slate-700 shadow-sm outline-none"
              />
              <button className="p-1.5 text-slate-400 hover:text-slate-600">
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2 rounded-lg text-[13px] font-bold text-slate-800 shadow-sm hover:bg-slate-50 transition-all">
             <Download size={16} className="text-slate-800" />
             <span>Download</span>
          </button>
          <button 
            onClick={handleManualGenerate}
            className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2 rounded-lg text-[13px] font-bold text-slate-800 shadow-sm hover:bg-slate-50 transition-all"
          >
             <LayoutGrid size={16} className="text-slate-800" />
             <span>Generate</span>
          </button>
        </div>
      </div>

      <div className="h-px bg-slate-200/60 w-full mb-6"></div>

      {/* 2. METER PROFILE & TRANSFORMER SECTION */}
      <div className="flex gap-6 items-stretch">
        {/* Meter Info Card */}
        <div className="flex-[2] bg-white p-10 rounded-2xl shadow-sm border border-slate-200 flex gap-12">
          <div className="w-48 h-48 flex-shrink-0 flex items-center justify-center p-2">
             <img src="https://m.media-amazon.com/images/I/41-lC3p-kKL._AC_UF894,1000_QL80_.jpg" alt="Meter" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-[48px] font-black text-[#1e293b] tracking-tight leading-none mb-2">SKS01 (Back Up)</h3>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-slate-400 text-[14px] font-bold uppercase tracking-widest">Meter Serial:</span>
              <span className="text-slate-800 text-[16px] font-black tabular-nums">219163044</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="border border-emerald-400 rounded-xl px-4 py-3 flex flex-col bg-white shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">Brand:</span>
                <span className="text-[18px] font-black text-slate-800">EDMI</span>
              </div>
              <div className="border border-orange-400 rounded-xl px-4 py-3 flex flex-col bg-white shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">Category:</span>
                <span className="text-[18px] font-black text-slate-800">Buy</span>
              </div>
              <div className="border border-blue-400 rounded-xl px-4 py-3 flex flex-col bg-white shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">Group:</span>
                <span className="text-[18px] font-black text-slate-800">MV</span>
              </div>
              <div className="border border-slate-300 rounded-xl px-4 py-3 flex flex-col bg-white shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">Ratio:</span>
                <span className="text-[18px] font-black text-slate-800">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transformer Spec Card */}
        <div className="flex-1 bg-white p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h4 className="text-[26px] font-black text-[#1e293b] tracking-tight text-right mb-8">Power Transformer</h4>
          <div className="flex-1 flex gap-8 items-center">
            <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center opacity-90">
               <img src="https://cdn-icons-png.flaticon.com/512/3103/3103233.png" alt="Transformer" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200 flex justify-between items-center shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Brand:</span>
                <span className="text-[18px] font-black text-slate-800">Precise</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 flex justify-between items-center shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cap. (kVA):</span>
                <span className="text-[22px] font-black text-slate-800 tracking-tight">1200</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONSUMPTION DATA SECTION */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100"><Activity size={28} /></div>
              <h4 className="text-2xl font-black text-slate-800 tracking-tight">Period Energy Consumption</h4>
           </div>
           <div className="space-y-1">
             <EnergyRow label="Active Energy Import:" value="87, 760" trend="+6%" color="bg-blue-500" percentage={75} />
             <EnergyRow label="Active Energy Export:" value="0" trend="0%" color="bg-slate-200" percentage={0} />
             <EnergyRow label="Reactive Energy Import:" value="14, 760" trend="+8%" color="bg-amber-400" percentage={35} />
             <EnergyRow label="Reactive Energy Export:" value="0" trend="0%" color="bg-slate-200" percentage={0} />
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100"><BarChart3 size={28} /></div>
              <h4 className="text-2xl font-black text-slate-800 tracking-tight">Meter Energy Monitor</h4>
           </div>
           <div className="space-y-1">
             <EnergyRow label="Total Active Energy Import (1.8.0):" value="19,638,850" trend="+21%" color="bg-indigo-500" percentage={85} />
             <EnergyRow label="Total Active Energy Export (2.8.0):" value="0" trend="0%" color="bg-slate-200" percentage={0} />
             <EnergyRow label="Total Reactive Energy Import (3.8.0):" value="3,638,850" trend="+13%" color="bg-amber-400" percentage={55} />
             <EnergyRow label="Total Reactive Energy Export (4.8.0):" value="10" trend="-5%" color="bg-rose-400" percentage={5} />
           </div>
        </div>
      </div>

    </div>
  );
};

export default DailyDashboard;