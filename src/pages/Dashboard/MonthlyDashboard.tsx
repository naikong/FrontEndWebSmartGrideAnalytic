import React, { useState } from 'react';
import { 
  Download, 
  FileBarChart, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { Company } from '../../../types';

interface MonthlyDashboardProps {
  selectedCompany: Company;
  startDate: string;
  endDate: string;
}

const MonthlyDashboard: React.FC<MonthlyDashboardProps> = ({ selectedCompany, startDate, endDate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleManualGenerate = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 800);
  };
  
  const TradeCard = ({ title, currentVal, prevVal, unit, change, changeText, colorClass, icon, isLoss }: any) => (
    <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <h4 className={`text-[12px] font-black uppercase tracking-[0.2em] ${colorClass}`}>{title}</h4>
        <div className={`text-slate-300 group-hover:scale-110 transition-transform`}>{icon}</div>
      </div>
      
      <div className="mb-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Period</p>
        <div className="flex items-center gap-1.5 text-[9px] font-medium text-slate-400">
          <span>{startDate.split('-').reverse().join('/')}</span>
          <ArrowRight size={10} />
          <span>{endDate.split('-').reverse().join('/')}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-[42px] font-black text-slate-800 tracking-tighter tabular-nums leading-none">{currentVal}</span>
        <span className="text-sm font-bold text-slate-400 uppercase">{unit}</span>
      </div>

      {!isLoss ? (
        <>
          <div className="flex justify-between items-center py-4 border-t border-slate-50">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Previous Period</span>
              <span className="text-[9px] font-medium text-slate-400">Comparative Stats</span>
            </div>
            <span className="text-[16px] font-bold text-slate-600 tabular-nums">{prevVal} {unit}</span>
          </div>

          <div className={`mt-2 p-3 rounded-xl flex items-center justify-between border ${changeText.includes('-') ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
            <span className={`text-[13px] font-black ${changeText.includes('-') ? 'text-rose-500' : 'text-emerald-500'}`}>{change} ({changeText})</span>
            <TrendingDown size={18} className={changeText.includes('-') ? 'text-rose-400' : 'text-emerald-400'} />
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col justify-center mt-4">
           <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100/50 flex flex-col items-center justify-center text-center">
              <span className="text-[46px] font-black text-orange-500 leading-none">1.68%</span>
              <span className="text-[10px] font-black text-orange-700/60 uppercase tracking-[0.2em] mt-2">Loss Percentage</span>
           </div>
        </div>
      )}
    </div>
  );

  const dates = Array.from({ length: 31 }, (_, i) => `${i + 1}/10/2025`);
  const yLabels = [7268, 6528, 5440, 4352, 3264, 2176, 1088, 0];

  return (
    <div className={`bg-[#eff2f5] min-h-full p-6 space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-12 transition-opacity ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* 1. REPORT FILTERS HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4 bg-white/40 p-4 rounded-2xl border border-white/60 shadow-sm backdrop-blur-sm">
        <div className="flex flex-wrap gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Customer:</label>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-3 text-slate-700 text-sm font-bold shadow-sm cursor-default">
               <span className="truncate max-w-[240px]">{selectedCompany.name}</span>
               <ChevronRight size={16} className="text-slate-300" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Reporting Period:</label>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-3 text-slate-700 text-sm font-bold shadow-sm">
               <Calendar size={18} className="text-slate-300" />
               <div className="flex items-center gap-2 tabular-nums">
                 <span>{startDate.split('-').reverse().join('/')}</span>
                 <ArrowRight size={14} className="text-slate-300" />
                 <span>{endDate.split('-').reverse().join('/')}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2.5 bg-white border border-slate-200 px-6 py-2.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
             <Download size={18} />
             <span>Download</span>
          </button>
          <button 
            onClick={handleManualGenerate}
            className="flex items-center gap-2.5 bg-white border border-slate-200 px-6 py-2.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
          >
             <FileBarChart size={18} />
             <span>Generate</span>
          </button>
        </div>
      </div>

      {/* 2. MONTHLY TRADE CARDS */}
      <div className="flex gap-6 items-stretch">
        <TradeCard 
          title="Energy Purchase Range" 
          currentVal="825,240" 
          prevVal="880,230" 
          unit="kWh" 
          change="2.58%" 
          changeText="-65,760 kWh" 
          colorClass="text-rose-500" 
          icon={<DollarSign size={24} className="text-rose-500" />} 
        />
        <TradeCard 
          title="Energy Sale Range" 
          currentVal="821,545" 
          prevVal="906,350" 
          unit="kWh" 
          change="5.19%" 
          changeText="-78,454 kWh" 
          colorClass="text-emerald-500" 
          icon={<DollarSign size={24} className="text-emerald-500" />} 
        />
        <TradeCard 
          title="Energy Loss Range" 
          currentVal="16,345" 
          unit="kWh" 
          colorClass="text-orange-500" 
          isLoss={true}
          icon={<AlertTriangle size={24} className="text-orange-400" />} 
        />
      </div>

      {/* 3. DAILY ACTIVE AND REACTIVE ENERGY (FULL RANGE VIEW) */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <h4 className="text-[13px] font-black text-slate-800 tracking-tight uppercase">Daily Active and Reactive Energy (Period View)</h4>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5">
               <div className="w-10 h-1.5 rounded-full bg-[#5b89f7]"></div>
               <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Energy Buy</span>
            </div>
            <div className="flex items-center gap-2.5">
               <div className="w-10 h-1.5 rounded-full bg-[#ffcd32]"></div>
               <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Energy Sale</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-8 items-end h-[420px]">
          <div className="col-span-10 flex items-end justify-between px-2 relative border-b border-slate-100 pb-2 h-full">
            <div className="absolute -left-14 bottom-0 top-0 flex flex-col justify-between py-10 pointer-events-none items-end">
               {[115025, 92020, 69015, 46010, 23005, 0].map(val => (
                 <span key={val} className="text-[9px] font-bold text-slate-300 tabular-nums">
                   {val.toLocaleString()}
                 </span>
               ))}
            </div>

            {Array(31).fill(0).map((_, i) => {
              const buyHeight = i < 19 ? (Math.random() * 180 + 140) : 0;
              const saleHeight = i < 19 ? (Math.random() * 40 + 130) : 0;
              const isUp = i % 3 === 0;
              const trendVal = i % 3 === 0 ? 6 : i % 3 === 1 ? 2 : 1;

              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group ml-1">
                  {i < 19 && (
                    <div className="flex flex-col items-center mb-2 transition-transform group-hover:-translate-y-1">
                      <span className={`text-[8px] font-black flex items-center gap-0.5 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isUp ? '▲' : '▼'}{trendVal}%
                      </span>
                    </div>
                  )}
                  <div className="flex items-end gap-[1px] w-full justify-center">
                    <div className={`w-3.5 ${i < 19 ? 'bg-[#5b89f7]' : 'bg-slate-50'} rounded-t-sm shadow-sm transition-all hover:brightness-95`} style={{ height: `${buyHeight}px` }}></div>
                    <div className={`w-3.5 ${i < 19 ? 'bg-[#ffcd32]' : 'bg-slate-50'} rounded-t-sm shadow-sm transition-all hover:brightness-95`} style={{ height: `${saleHeight}px` }}></div>
                  </div>
                  <div className="mt-4 h-6 w-px bg-slate-100"></div>
                  <span className="text-[8px] font-bold text-slate-300 mt-2 [writing-mode:vertical-lr] whitespace-nowrap opacity-80 tracking-tighter">
                    {1 + i}/10/2025
                  </span>
                </div>
              );
            })}
          </div>

          <div className="col-span-2 flex flex-col items-center justify-center h-full">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffcd32" strokeWidth="12" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#5b89f7" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="113.04" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-[18%] shadow-inner border border-slate-50">
                 <span className="text-lg font-black text-slate-800 tracking-tighter">Total</span>
              </div>
              <div className="absolute top-2 right-2 transform translate-x-4 -translate-y-2 bg-[#5b89f7] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg">55%</div>
              <div className="absolute bottom-4 left-0 transform -translate-x-4 bg-[#ffcd32] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg">45%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyDashboard;