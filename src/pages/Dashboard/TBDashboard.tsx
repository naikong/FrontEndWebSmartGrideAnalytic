import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight,
  ChevronDown,
  Moon,
  Bell,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Activity,
  AlertCircle,
  FileDown,
  FileChartColumnIncreasing,
  Calendar,
  User as UserIcon,
  LogOut,
  Zap,
  X,
  ArrowUp,
  ArrowDown,
  Search,
  RefreshCw,
  Maximize2,
  Minimize2,
  Building2,
  ArrowRight,
  CalendarDays
} from 'lucide-react';
import DailyDashboard from './DailyDashboard';
import MonthlyDashboard from './MonthlyDashboard';
import { MOCK_COMPANIES } from '../constants/Companyconstants';

// --- T&B DASHBOARD COMPONENTS ---
const StandardKpiCard = ({ icon, title, value, unit, trend, trendUp, colorClass, bgIcon, isLoss, subValue, isTrade, date }: any) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col w-[240px] h-[110px] justify-between hover:shadow-md transition-all hover:-translate-y-0.5 shrink-0">
    <div className="flex justify-between items-start">
      <div className="flex items-start gap-2.5">
        <div className={`w-9 h-9 rounded-xl ${bgIcon} flex items-center justify-center shadow-sm`}>{icon}</div>
        <div className="flex flex-col">
          <h3 className={`text-[9.5px] font-bold uppercase tracking-tight ${colorClass}`}>{title}</h3>
        </div>
      </div>
      <div className="text-right">
        {isTrade ? (
          <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">{date}</p>
        ) : (
          trend && (
            <div className={`flex items-center justify-end font-bold text-[11px] ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend} {trendUp ? <TrendingUp size={12} className="ml-0.5" /> : <TrendingDown size={12} className="ml-0.5" />}
            </div>
          )
        )}
        {!isTrade && trend && <p className="text-[7px] font-bold text-slate-300 uppercase tracking-tighter -mt-0.5">FROM YESTERDAY</p>}
      </div>
    </div>
    
    <div className="flex justify-between items-end">
      <div className="flex items-baseline gap-1.5">
        <span className={`text-[26px] font-bold leading-none tracking-tight ${colorClass}`}>{value}</span>
        {isLoss && subValue && (
           <div className="flex items-center gap-1.5 mb-1">
              <div className="h-4 w-[1px] bg-slate-200 mx-0.5"></div>
              <span className="text-[13px] font-bold text-rose-500 whitespace-nowrap">{subValue}</span>
           </div>
        )}
      </div>
      <div className="mb-0.5">
        <span className={`text-[12px] font-bold uppercase tracking-tight text-blue-600`}>
          {isTrade ? 'Percentage' : unit}
        </span>
      </div>
    </div>
  </div>
);

const ChartKpiCard = ({ title, value, unit, trend, trendUp, data, highlightedIndex }: any) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isLossChart = title.includes('LOSS');
  const titleColor = isLossChart ? 'text-rose-500' : title.includes('SALE') ? 'text-emerald-600' : 'text-orange-500';
  const strokeColor = isLossChart ? '#f43f5e' : title.includes('SALE') ? '#059669' : '#f97316';

  const chartMax = isLossChart ? 5 : 100;
  const totalDays = 30;

  const generateAreaPath = () => {
    if (!data.length) return "";
    const visibleData = data.slice(0, highlightedIndex + 1);
    const points = visibleData.map((val: number, i: number) => {
      const x = (i / (totalDays - 1)) * 100;
      const y = 100 - (val / chartMax) * 100;
      return `${x},${y}`;
    });
    
    if (points.length === 0) return "";
    const lastX = (highlightedIndex / (totalDays - 1)) * 100;
    return `M 0,100 L ${points.join(" L ")} L ${lastX},100 Z`;
  };

  const generateLinePath = () => {
    if (!data.length) return "";
    const visibleData = data.slice(0, highlightedIndex + 1);
    const points = visibleData.map((val: number, i: number) => {
      const x = (i / (totalDays - 1)) * 100;
      const y = 100 - (val / chartMax) * 100;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  const highlightX = (highlightedIndex / (totalDays - 1)) * 100;
  const highlightY = 100 - (data[highlightedIndex] / chartMax) * 100;

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col min-w-[340px] h-[220px] shrink-0 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-1">
        <h3 className={`text-[11px] font-bold uppercase tracking-tight ${titleColor}`}>{title}</h3>
        <div className="flex flex-col items-end">
          {trend && (
            <div className="flex items-center gap-1">
              <span className={`text-[13px] font-bold ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>
              {trendUp ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-rose-500" />}
            </div>
          )}
          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">FROM LAST MONTH</span>
        </div>
      </div>
      
      <div className="flex justify-between items-end mb-4">
        <span className="text-[34px] font-bold text-[#1a2b4b] leading-none tracking-tighter tabular-nums">{value}</span>
        <span className="text-[20px] font-bold text-slate-500 mb-0.5">{unit}</span>
      </div>
      
      <div className="flex-1 flex relative mt-1">
        <div className="flex flex-col justify-between h-[60px] text-[8px] font-bold text-slate-300 w-8 -mt-1 tabular-nums">
           {isLossChart ? <><span className="text-[9px]">5</span><span className="text-[9px]">2</span><span className="text-[9px]">0</span></> : <><span className="text-[8px]">100K</span><span className="text-[8px]">50K</span><span className="text-[8px]">0</span></>}
        </div>
        
        <div className="flex-1 h-[60px] relative ml-1">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-100"></div>
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {isLossChart && (
              <defs>
                <linearGradient id="lossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
                </linearGradient>
              </defs>
            )}
            {isLossChart && <path d={generateAreaPath()} fill="url(#lossGradient)" />}
            <path d={generateLinePath()} fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            {isLossChart && (
              <>
                <line x1={highlightX} y1="100" x2={highlightX} y2={highlightY} stroke="#f43f5e" strokeWidth="1" />
                <circle cx={highlightX} cy={highlightY} r="1.5" fill="black" />
              </>
            )}
          </svg>

          <div className="flex items-end justify-between h-full px-0 relative z-10">
               {Array.from({ length: totalDays }).map((_, i) => (
                  <div key={i} className="flex-1 h-full cursor-pointer group" onMouseEnter={() => i <= highlightedIndex && setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                     {hoveredIdx === i && i <= highlightedIndex && (
                        <div className="absolute bottom-full left-[var(--hover-x)] -translate-x-1/2 mb-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150" style={{ '--hover-x': `${(i / (totalDays - 1)) * 100}%` } as any}>
                          <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-slate-100 p-3 min-w-[140px] relative">
                            <div className="text-[10px] font-bold text-slate-300 mb-0.5">{i + 1}/Oct/2025</div>
                            <div className="flex items-baseline gap-1.5 mb-1">
                              <span className="text-[18px] font-bold text-slate-600 leading-none">{(data[i] * (isLossChart ? 1 : 1000)).toLocaleString()}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`text-[11px] font-bold ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>
                              {trendUp ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-rose-500" />}
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white drop-shadow-sm"></div>
                          </div>
                        </div>
                      )}
                  </div>
               ))}
            </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3 ml-8 text-[10px] font-bold text-slate-400 uppercase tracking-tighter tabular-nums">
        <span>01/Oct/2025</span>
        <span className={`${titleColor} font-bold`}>{highlightedIndex + 1}/Oct/2025</span>
        <span>30/Oct/2025</span>
      </div>
    </div>
  );
};

const TBDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tb');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTableMaximized, setIsTableMaximized] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Date Range Popover States
  const [startDate, setStartDate] = useState('2025-10-01');
  const [endDate, setEndDate] = useState('2025-10-18');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Company Selector State
  const [selectedCompanyId, setSelectedCompanyId] = useState(MOCK_COMPANIES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const selectedCompany = MOCK_COMPANIES.find(c => c.id === selectedCompanyId) || MOCK_COMPANIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) setIsProfileOpen(false);
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) setIsDatePickerOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1200);
  };

  const formatDateLabel = (dateStr: string) => {
    return dateStr.split('-').reverse().join('/');
  };

  const kpiGroups = [
    {
      top: { title: "ENERGY PURCHASE", value: "79,090", unit: "kWh", trend: "+18.34%", trendUp: true, colorClass: "text-orange-500", bgIcon: "bg-orange-50", icon: <ShoppingCart size={20} className="text-orange-500" /> },
      bottom: { title: "ENERGY SALES", value: "75, 000", unit: "kWh", trend: "-7.69%", trendUp: false, colorClass: "text-emerald-600", bgIcon: "bg-emerald-50", icon: <DollarSign size={20} className="text-emerald-600" /> }
    },
    {
      top: { title: "ENERGY TRADE", value: "0.23", isTrade: true, date: formatDateLabel(endDate), colorClass: "text-blue-600", bgIcon: "bg-blue-50", icon: <Activity size={20} className="text-blue-600" /> },
      bottom: { title: "MAX POWER", value: "4,071", unit: "kW", trend: "+3.4%", trendUp: true, colorClass: "text-amber-500", bgIcon: "bg-amber-50", icon: <Zap size={20} className="text-amber-500" /> }
    },
    {
      top: { title: "AVERAGE POWER", value: "3,300", unit: "kW", trend: "+8.34%", trendUp: true, colorClass: "text-purple-500", bgIcon: "bg-purple-50", icon: <Zap size={20} className="text-purple-500" /> },
      bottom: { title: "22KV ENERGY LOSS", value: "-7.15 %", isLoss: true, subValue: "-5,659 kWh", colorClass: "text-rose-500", bgIcon: "bg-rose-50", icon: <AlertCircle size={20} className="text-rose-500" /> }
    }
  ];

  const chartKpis = [
    { title: "TOTAL ENERGY PURCHASE", value: "2,575,210", unit: "kWh", trend: "+8.34%", trendUp: true, data: [20, 35, 48, 40, 55, 60, 50, 45, 65, 75, 80, 70, 60, 65, 70, 85, 90, 82, 95], highlightedIndex: 18 },
    { title: "TOTAL ENERGY SALE", value: "2,468,404", unit: "kWh", trend: "-2.69%", trendUp: false, data: [25, 40, 45, 38, 50, 55, 60, 55, 65, 70, 75, 80, 75, 82, 85, 88, 80, 85, 92], highlightedIndex: 18 },
    { title: "TOTAL 22KV ENERGY LOSS", value: "4.15", unit: "%", trend: "-4.69%", trendUp: false, data: [1.2, 1.5, 2.8, 2.1, 2.8, 3.4, 4.2, 3.8, 4.5, 3.2, 4.0, 3.5, 3.8, 4.1, 4.3, 4.6, 3.2, 4.4, 5.0], highlightedIndex: 18 }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#eff2f5] overflow-hidden font-sans">
      {/* TOP HEADER */}
      <div className="bg-white px-8 py-3 flex items-center justify-between z-30 border-b border-slate-200">
        <div className="flex items-center space-x-3 w-1/4">
          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center p-1 shadow-sm bg-slate-50 ring-2 ring-slate-50 ring-offset-2">
             <img src={selectedCompany.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight leading-none max-w-[200px] truncate">{selectedCompany.name}</span>
        </div>
        <h1 className="flex-1 text-center text-[22px] font-bold text-[#1e293b] tracking-tight">
          {activeTab === 'tb' ? 'Technical & Business Reporting' : 
           activeTab === 'daily' ? 'VP.Start Daily Energy Meter Monitoring Report' : 
           'VP.Start Monthly Energy Trade Report'}
        </h1>
        <div className="flex items-center space-x-4 w-1/4 justify-end">
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight text-right">VP.START TECHNOLOGY CO., LTD</span>
          <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-sm">
             <img src="https://i.pravatar.cc/150?u=vpstart" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto custom-scrollbar bg-[#eff2f5] ${isTableMaximized ? 'overflow-hidden' : ''}`}>
        {activeTab === 'daily' ? (
          <DailyDashboard selectedCompany={selectedCompany} startDate={startDate} endDate={endDate} />
        ) : activeTab === 'monthly' ? (
          <MonthlyDashboard selectedCompany={selectedCompany} startDate={startDate} endDate={endDate} />
        ) : (
          <div className={`p-6 space-y-6 transition-opacity duration-300 ${isGenerating ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {/* FILTERS */}
            {!isTableMaximized && (
              <div className="flex items-end justify-between gap-6 px-2 mb-2">
                <div className="flex items-end gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">CUSTOMER:</label>
                    <div className="relative group min-w-[280px]">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                        <Building2 size={16} />
                      </div>
                      <select 
                        value={selectedCompanyId}
                        onChange={(e) => setSelectedCompanyId(e.target.value)}
                        className="appearance-none w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer shadow-sm hover:border-slate-300 transition-all"
                      >
                        {MOCK_COMPANIES.map(company => (
                          <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>

                  {/* UNIFIED DATE RANGE PICKER */}
                  <div className="flex flex-col space-y-1.5 relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">REPORTING PERIOD :</label>
                    <div className="relative" ref={datePickerRef}>
                      <button 
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        className={`flex items-center space-x-3 px-4 py-2.5 border rounded-xl transition-all shadow-sm min-w-[260px] text-left bg-white ${
                          isDatePickerOpen ? 'border-slate-800 ring-2 ring-slate-800/10' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <CalendarDays size={18} className="text-slate-300" />
                        <div className="flex-1 font-bold text-[11px] text-slate-700">
                           {formatDateLabel(startDate)} <span className="mx-2 text-slate-300">to</span> {formatDateLabel(endDate)}
                        </div>
                        <ChevronDown size={14} className={`text-slate-300 transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isDatePickerOpen && (
                        <div className="absolute top-full left-0 mt-2 w-[340px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-[100] p-6 animate-in slide-in-from-top-2 duration-200">
                          <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-2">
                             <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Select Date Range</span>
                             <button onClick={() => setIsDatePickerOpen(false)} className="text-slate-300 hover:text-slate-600"><X size={16} /></button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Start Day</label>
                              <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:border-slate-400"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">End Day</label>
                              <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:border-slate-400"
                              />
                            </div>
                          </div>
                          <button 
                            onClick={() => setIsDatePickerOpen(false)}
                            className="w-full mt-6 bg-slate-900 text-white font-bold text-[11px] uppercase py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                          >
                            Apply Range
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                    <FileDown size={18} className="text-slate-800" />
                    <span>Download</span>
                  </button>
                  <button 
                    onClick={handleGenerateReport}
                    className={`bg-slate-900 text-white border border-slate-800 px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all font-bold text-sm hover:bg-slate-800 active:scale-95 ${isGenerating ? 'animate-pulse' : ''}`}
                  >
                    <FileChartColumnIncreasing size={18} />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            )}

            {/* UNIFIED METRIC SCROLLING ROW */}
            {!isTableMaximized && (
              <div className="overflow-x-auto custom-scrollbar-h pb-4">
                <div className="flex items-start gap-4 px-1 min-w-max">
                  <div className="flex gap-3 shrink-0">
                    {kpiGroups.map((group, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                        <StandardKpiCard {...group.top} />
                        <StandardKpiCard {...group.bottom} />
                      </div>
                    ))}
                  </div>
                  <div className="w-[1.5px] bg-slate-200 self-stretch my-2 shrink-0"></div>
                  <div className="flex gap-4 shrink-0">
                    {chartKpis.map((kpi, idx) => (
                      <ChartKpiCard key={idx} {...kpi} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DATA TABLE CONTAINER */}
            <div className={`bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden mx-1 mb-8 transition-all duration-300 ${isTableMaximized ? 'fixed inset-6 z-[60] flex flex-col mb-0 m-0 rounded-[2rem]' : 'relative'}`}>
              
              {/* TABLE HEADER ACTION BAR */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-[#f8fafc]/50">
                <div className="relative w-72">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-300">
                    <Search size={18} />
                  </div>
                  <input 
                    type="text"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    placeholder="Search Grid..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-slate-400 font-medium text-slate-600 shadow-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsTableMaximized(!isTableMaximized)}
                    className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200 group"
                    title={isTableMaximized ? "Minimize Table" : "Maximize Table"}
                  >
                    {isTableMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} className="group-hover:scale-110 transition-transform" />}
                  </button>
                  <button 
                    onClick={handleRefresh}
                    className={`p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200 ${isRefreshing ? 'animate-spin text-slate-800 bg-white border-slate-200' : ''}`}
                    title="Refresh Data"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>

              {/* THE GRID */}
              <div className={`overflow-x-auto custom-scrollbar ${isTableMaximized ? 'flex-1' : ''}`}>
                <table className="w-full text-center border-collapse min-w-[3200px] text-[11px] font-bold">
                  <thead>
                    {/* Level 1 Group Headers */}
                    <tr className="bg-[#64748b] text-white border-b border-slate-400">
                      <th colSpan={6} className="py-2 border-r border-slate-400">Meter</th>
                      <th colSpan={16} className="py-2 border-r border-slate-400 bg-[#7b8ea3]">Daily Energy</th>
                      <th colSpan={3} className="py-2 border-r border-slate-400 bg-rose-200 text-rose-800">Alarm</th>
                      <th colSpan={3} className="py-2 border-r border-slate-400 bg-[#cbd5e1] text-slate-700 uppercase">AVG Current Unbalance(A)</th>
                      <th colSpan={6} className="py-2 border-r border-slate-400 bg-[#d1d5db] text-slate-700">Demand Indicator</th>
                      <th colSpan={6} className="py-2 border-r border-slate-400 bg-[#e2e8f0] text-slate-700">Voltage Indicator</th>
                      <th rowSpan={4} className="py-2 w-24 bg-[#5c6b8a] align-middle text-white border-l border-slate-400">Minimum PF</th>
                    </tr>
                    
                    {/* Level 2 Sub-Group Headers */}
                    <tr className="bg-[#94a3b8] text-white border-b border-slate-400">
                      <th rowSpan={3} className="w-12 border-r border-slate-400">No.</th>
                      <th rowSpan={3} className="w-20 border-r border-slate-400">Category</th>
                      <th rowSpan={3} className="w-16 border-r border-slate-400">Group</th>
                      <th rowSpan={3} className="w-64 border-r border-slate-400 text-left px-4">Name</th>
                      <th rowSpan={3} className="w-32 border-r border-slate-400">S/N</th>
                      <th rowSpan={3} className="w-16 border-r border-slate-400">Ratio</th>
                      <th colSpan={8} className="py-1 border-r border-slate-400 bg-[#f8fafc] text-slate-600">Daily Consumption</th>
                      <th colSpan={8} className="py-1 border-r border-slate-400 bg-[#f1f5f9] text-slate-600">Reading</th>
                      <th rowSpan={3} className="w-24 border-r border-rose-300 bg-rose-50 text-rose-800">Source OFF</th>
                      <th rowSpan={3} className="w-24 border-r border-rose-300 bg-rose-50 text-rose-800">Door Open</th>
                      <th rowSpan={3} className="w-24 border-r border-slate-400 bg-rose-50 text-rose-800">Loss of Phase</th>
                      <th rowSpan={3} className="w-16 border-r border-slate-300 bg-[#f8fafc] text-slate-600">A</th>
                      <th rowSpan={3} className="w-16 border-r border-slate-300 bg-[#f8fafc] text-slate-600">B</th>
                      <th rowSpan={3} className="w-16 border-r border-slate-400 bg-[#f8fafc] text-slate-600">C</th>
                      <th colSpan={3} className="py-1 border-r border-slate-400 bg-[#f1f5f9] text-slate-600">Max Current (Amp)</th>
                      <th colSpan={3} className="py-1 border-r border-slate-400 bg-[#f1f5f9] text-slate-600">Power</th>
                      <th colSpan={3} className="py-1 border-r border-slate-400 bg-[#f8fafc] text-slate-600 uppercase">Max</th>
                      <th colSpan={3} className="py-1 border-r border-slate-400 bg-[#f8fafc] text-slate-600 uppercase">Min</th>
                    </tr>

                    {/* Level 3 Detailed Headers */}
                    <tr className="bg-[#cbd5e1] text-slate-700 border-b border-slate-300">
                      <th colSpan={2} className="py-1 border-r border-slate-300">Active (kWh)</th>
                      <th colSpan={2} className="py-1 border-r border-slate-400">Reactive (kVar)</th>
                      <th colSpan={2} className="py-1 border-r border-slate-300">Active (kWh)</th>
                      <th colSpan={2} className="py-1 border-r border-slate-400">Reactive (kVar)</th>
                      <th colSpan={2} className="py-1 border-r border-slate-300">Active (kWh)</th>
                      <th colSpan={2} className="py-1 border-r border-slate-400">Reactive (kVar)</th>
                      <th colSpan={2} className="py-1 border-r border-slate-300">Active (kWh)</th>
                      <th colSpan={2} className="py-1 border-r border-slate-400">Reactive (kVar)</th>
                      <th rowSpan={2} className="w-16 border-r border-slate-300">A</th>
                      <th rowSpan={2} className="w-16 border-r border-slate-300">B</th>
                      <th rowSpan={2} className="w-16 border-r border-slate-400">C</th>
                      <th rowSpan={2} className="w-32 border-r border-slate-300 text-[10px]">CT Ratio/ Tr. Cap (KVA)</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-300 uppercase">Max Active Power (kW)</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-400 uppercase">Avg Active Power (kW)</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-300 bg-rose-100">A</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-300 bg-orange-100">B</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-400 bg-blue-100">C</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-300 bg-rose-100/50">A</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-300 bg-orange-100/50">B</th>
                      <th rowSpan={2} className="w-24 border-r border-slate-400 bg-blue-100/50">C</th>
                    </tr>

                    {/* Level 4 Column Level Headers */}
                    <tr className="bg-[#f1f5f9] text-slate-500 text-[9px] uppercase tracking-tighter">
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-200">Export</th>
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-300">Export</th>
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-200">Export</th>
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-400">Export</th>
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-200">Export</th>
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-300">Export</th>
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-200">Export</th>
                      <th className="py-1 border-r border-slate-200">Import</th><th className="py-1 border-r border-slate-400">Export</th>
                    </tr>
                  </thead>

                  <tbody className={`text-slate-700 bg-white transition-opacity duration-300 ${isRefreshing ? 'opacity-30' : 'opacity-100'}`}>
                    {/* Row 1 - Example Buy Category */}
                    <tr className="h-10 hover:bg-slate-50 transition-colors border-b border-slate-100">
                      <td className="border-r">1</td>
                      <td className="border-r"><span className="bg-rose-50 text-rose-500 px-2 py-0.5 rounded text-[9px] uppercase">Buy</span></td>
                      <td className="border-r">MV</td>
                      <td className="border-r text-left px-4 font-bold">SKS01 (Back Up)</td>
                      <td className="border-r">219163044</td>
                      <td className="border-r">1</td>
                      <td className="border-r bg-emerald-50/20 text-emerald-700">0% <div className="inline-block w-2.5 h-2.5 bg-emerald-500 transform rotate-45 ml-1"></div></td>
                      <td className="border-r text-right pr-4 font-bold">79,090</td>
                      <td className="border-r">0</td><td className="border-r font-bold">11,910</td><td className="border-r">0</td>
                      <td className="border-r font-bold">16,907,550</td><td className="border-r">0</td><td className="border-r font-bold">16,907,550</td><td className="border-r">0</td>
                      <td className="border-r">16,907,550</td><td className="border-r">0</td><td className="border-r">16,907,550</td><td className="border-r">0</td>
                      <td className="border-r">0</td><td className="border-r">0</td><td className="border-r">0</td>
                      <td className="border-r text-slate-400">0 <div className="inline-block w-2.5 h-2.5 bg-emerald-500 transform rotate-45 ml-1"></div></td>
                      <td className="border-r text-slate-400">0 <div className="inline-block w-2.5 h-2.5 bg-emerald-500 transform rotate-45 ml-1"></div></td>
                      <td className="border-r text-slate-400">0 <div className="inline-block w-2.5 h-2.5 bg-emerald-500 transform rotate-45 ml-1"></div></td>
                      <td className="border-r">109</td><td className="border-r">106</td><td className="border-r">108</td>
                      <td className="border-r text-slate-400">12,000</td>
                      <td className="border-r bg-emerald-100/30 text-emerald-600 font-bold">4,071</td>
                      <td className="border-r bg-purple-100/30 text-purple-500 font-bold">3,300</td>
                      
                      {/* Voltage Indicator - Row 1 emerald pattern */}
                      <td className="border-r bg-emerald-100/50">22,731</td><td className="border-r bg-emerald-100/50">22,731</td><td className="border-r bg-emerald-100/50">22,731</td>
                      <td className="border-r bg-emerald-100/50">22,731</td><td className="border-r bg-emerald-100/50">22,731</td><td className="border-r bg-emerald-100/50">22,731</td>
                      
                      <td className="text-right pr-4 font-bold">0.98</td>
                    </tr>

                    {/* Summary Row for Buy */}
                    <tr className="h-10 bg-slate-50 font-bold text-slate-800">
                      <td colSpan={6} className="text-left px-8 text-[12px] uppercase">Daily Total Buy (kWh)</td>
                      <td colSpan={2} className="text-right pr-4">84,054</td>
                      <td colSpan={1} className="text-right pr-4">0</td>
                      <td colSpan={1} className="text-right pr-4 font-bold text-slate-900">8,881</td>
                      <td colSpan={1} className="text-right pr-4">83</td>
                      <td colSpan={30}></td>
                    </tr>

                    {/* Generate Sales Rows - Matching screenshot pattern exactly */}
                    {Array.from({ length: 33 }).map((_, idx) => {
                      const meterNo = idx + 1;
                      
                      // Pattern for specific row background colors based on the photo logic
                      let minA_Bg = 'bg-emerald-100/30';
                      let minB_Bg = 'bg-emerald-100/30';
                      let minC_Bg = 'bg-emerald-100/30';
                      let max_Bg = 'bg-emerald-100/30';
                      
                      let pfVal = "0.98";
                      let pfBg = "";

                      // Row logic matching the user's provided photos
                      if (idx === 0) { // Meter 1
                        pfVal = "0.33"; pfBg = "bg-rose-500 text-white font-black"; 
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-100/60 text-slate-800'; 
                      }
                      else if (idx === 2) { // Meter 3
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }
                      else if (idx === 6) { // Meter 7
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }
                      else if (idx === 8) { // Meter 9
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }
                      else if (idx === 10) { // Meter 11
                        pfVal = "0.43"; pfBg = "bg-rose-500 text-white font-black"; 
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }
                      else if (idx === 13) { // Meter 14
                        pfVal = "0.41"; pfBg = "bg-rose-500 text-white font-black"; 
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-100/60 text-slate-800'; 
                      }
                      else if (idx >= 15 && idx <= 18) { // Meters 16 to 19
                        minA_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                        minB_Bg = minC_Bg = 'bg-orange-100/30';
                      }
                      else if (idx === 20) { // Meter 21
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }
                      else if (idx === 23 || idx === 24) { // Meter 24, 25
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }
                      else if (idx === 26) { // Meter 27
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }
                      else if (idx === 27) { // Meter 28
                        max_Bg = 'bg-orange-100/60 text-slate-800';
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-100/30';
                      }
                      else if (idx === 30 || idx === 31) { // Meter 31, 32
                        minA_Bg = minB_Bg = minC_Bg = 'bg-orange-500 text-slate-900 font-bold'; 
                      }

                      return (
                        <tr key={idx} className="h-10 hover:bg-slate-50 transition-colors border-b border-slate-100">
                          <td className="border-r">{meterNo}</td>
                          <td className="border-r"><span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] uppercase font-bold">Sale</span></td>
                          <td className="border-r text-slate-500">Tr</td>
                          <td className="border-r text-left px-4 truncate text-slate-700">KSN-P{meterNo + 20}-50kVA({meterNo + 100})</td>
                          <td className="border-r text-slate-500">2330448{meterNo + 10}</td>
                          <td className="border-r text-slate-500">1</td>
                          <td className="border-r text-slate-700">0% <div className="inline-block w-2.5 h-2.5 bg-emerald-500 transform rotate-45 ml-1"></div></td>
                          <td className="border-r text-right pr-4 font-bold">79,090</td>
                          <td className="border-r">0</td><td className="border-r font-bold text-slate-800">11,910</td><td className="border-r">0</td>
                          <td className="border-r font-bold text-slate-600">16,907,550</td><td className="border-r">0</td><td className="border-r font-bold text-slate-600">16,907,550</td><td className="border-r">0</td>
                          <td className="border-r text-slate-400">16,907,550</td><td className="border-r">0</td><td className="border-r text-slate-400">16,907,550</td><td className="border-r">0</td>
                          <td className="border-r">0</td><td className="border-r">0</td><td className="border-r">0</td>
                          <td className="border-r text-rose-400">0 <ArrowDown size={10} className="inline ml-1" /></td>
                          <td className="border-r text-emerald-400">0 <ArrowUp size={10} className="inline ml-1" /></td>
                          <td className="border-r text-emerald-400">0 <ArrowUp size={10} className="inline ml-1" /></td>
                          <td className="border-r text-slate-500">0</td><td className="border-r text-slate-500">0</td><td className="border-r text-slate-500">0</td>
                          
                          <td className="border-r text-slate-400 font-bold">{meterNo * 10}</td>
                          <td className={`border-r font-bold ${meterNo === 11 ? 'bg-rose-100 text-rose-700' : 'text-emerald-600'}`}>{meterNo === 11 ? '189' : meterNo}</td>
                          <td className="border-r font-bold text-slate-500">{meterNo}</td>
                          
                          {/* Voltage Indicator - Max Columns */}
                          <td className={`border-r ${max_Bg}`}>22,731</td>
                          <td className={`border-r ${max_Bg}`}>22,731</td>
                          <td className={`border-r ${max_Bg}`}>22,731</td>
                          
                          {/* Voltage Indicator - Min Columns populated with number 22,731 */}
                          <td className={`border-r ${minA_Bg}`}>22,731</td>
                          <td className={`border-r ${minB_Bg}`}>22,731</td>
                          <td className={`border-r ${minC_Bg}`}>22,731</td>
                          
                          <td className={`text-right pr-4 font-bold ${pfBg}`}>{pfVal}</td>
                        </tr>
                      );
                    })}

                    {/* Remaining Meter Row */}
                    <tr className="h-10 hover:bg-slate-50 transition-colors border-b border-slate-100">
                      <td className="border-r">33</td>
                      <td className="border-r"><span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] uppercase font-bold">Sale</span></td>
                      <td className="border-r text-slate-400 uppercase">R</td>
                      <td className="border-r text-left px-4 font-bold text-slate-800">Remaining Meter</td>
                      <td className="border-r text-slate-400 uppercase">N-0000000</td>
                      <td className="border-r text-slate-400">1</td>
                      <td className="border-r text-slate-700">0% <div className="inline-block w-2.5 h-2.5 bg-emerald-500 transform rotate-45 ml-1"></div></td>
                      <td className="border-r text-right pr-4 font-bold">33,090</td>
                      <td className="border-r">0</td><td className="border-r font-bold text-slate-800">8,540</td><td className="border-r">0</td>
                      <td className="border-r font-bold text-slate-600">12,450,000</td><td className="border-r">0</td><td className="border-r font-bold text-slate-600">12,450,000</td><td className="border-r">0</td>
                      <td className="border-r text-slate-400">12,450,000</td><td className="border-r">0</td><td className="border-r text-slate-400">12,450,000</td><td className="border-r">0</td>
                      
                      <td colSpan={11} className="bg-slate-50/20"></td>
                      
                      <td className="border-r bg-emerald-100/30">22,731</td><td className="border-r bg-emerald-100/30">22,731</td><td className="border-r bg-emerald-100/30">22,731</td>
                      <td className="border-r bg-orange-100/60 font-bold text-orange-800">22,731</td><td className="border-r bg-orange-100/60 font-bold text-orange-800">22,731</td><td className="border-r bg-orange-100/60 font-bold text-orange-800">22,731</td>
                      <td className="text-right pr-4 font-bold">0.98</td>
                    </tr>

                    {/* Summary Row for Sale */}
                    <tr className="h-10 bg-slate-100 font-bold text-slate-800">
                      <td colSpan={6} className="text-left px-12 text-[12px] uppercase">Daily Total Sale (kWh)</td>
                      <td colSpan={2} className="text-right pr-4 font-bold text-slate-900">79,090</td>
                      <td colSpan={1} className="text-right pr-4">0</td>
                      <td colSpan={1} className="text-right pr-4 font-bold text-slate-900">11,910</td>
                      <td colSpan={1} className="text-right pr-4">0</td>
                      <td colSpan={30}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Resize Overlay Close Button (visible when maximized) */}
              {isTableMaximized && (
                <button 
                  onClick={() => setIsTableMaximized(false)}
                  className="absolute top-4 right-20 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600 transition-all z-[70]"
                  title="Close Fullscreen"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DASHBOARD BOTTOM NAVIGATION */}
      <div className="flex-shrink-0 px-6 py-3 bg-[#eff2f5] border-t border-slate-200 flex items-center justify-between z-40">
        <div className="flex items-center space-x-2 w-1/4">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center p-1.5 shadow-md">
             <img src="https://cdn-icons-png.flaticon.com/512/1053/1053155.png" alt="Logo" className="w-full h-full invert" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-slate-900 uppercase leading-none tracking-tight">WEB SMART</span>
            <span className="text-[7px] text-gray-400 uppercase leading-none mt-0.5 font-bold tracking-[0.2em]">GRID ANALYTICS</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 bg-[#1e293b] rounded-full p-1 shadow-xl">
          <button onClick={() => setActiveTab('tb')} className={`px-7 py-2 rounded-full text-[10px] font-bold uppercase tracking-tight transition-all duration-200 ${activeTab === 'tb' ? 'bg-[#334155] text-white shadow' : 'text-slate-400 hover:text-white'}`}>T&B Dashboard</button>
          <button onClick={() => setActiveTab('daily')} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-tight transition-all duration-200 ${activeTab === 'daily' ? 'bg-[#334155] text-white shadow' : 'text-slate-400 hover:text-white'}`}>Daily Dashboard</button>
          <button onClick={() => setActiveTab('monthly')} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-tight transition-all duration-200 ${activeTab === 'monthly' ? 'bg-[#334155] text-white shadow' : 'text-slate-400 hover:text-white'}`}>Monthly Dashboard</button>
        </div>

        <div className="flex items-center space-x-5 w-1/4 justify-end">
           <div className="flex items-center space-x-3">
              <button className="text-slate-400 hover:text-slate-800 transition-colors"><Moon size={18} /></button>
              <button className="text-slate-400 hover:text-slate-800 transition-colors relative"><Bell size={18} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#eff2f5]"></span></button>
           </div>
           <div className="relative" ref={profileDropdownRef}>
              <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-all group">
                <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden border border-slate-100 group-hover:border-slate-200"><img src="https://i.pravatar.cc/150?u=admin" alt="U" className="w-full h-full object-cover" /></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">USER</span>
              </div>
              {isProfileOpen && (
                <div className="absolute bottom-full right-0 mb-4 w-[240px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="py-2 px-1">
                    <button onClick={() => { setIsProfileOpen(false); navigate('/user/detail/u1'); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-[13px] font-bold text-slate-700 transition-colors"><UserIcon size={16} /> My Profile</button>
                    <button onClick={() => { setIsProfileOpen(false); navigate('/login'); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-[13px] font-bold text-red-600 transition-colors"><LogOut size={16} /> Log Out</button>
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar-h::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar-h::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-h::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar-h::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default TBDashboard;