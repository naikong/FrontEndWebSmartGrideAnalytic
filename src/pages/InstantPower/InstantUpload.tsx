import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Download, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Trash2,
  X,
  Check,
  CalendarDays,
  ArrowRight,
  Download as ImportIcon,
  Upload,
  ArrowLeft
} from 'lucide-react';

// Helper to generate random dates within late 2025
const getRandomDate = (i: number) => {
  const day = (i % 28) + 1;
  return `2025-10-${day.toString().padStart(2, '0')}`;
};

// Enhanced mock data
const MOCK_INSTANT_DATA = Array.from({ length: 155 }, (_, i) => {
  const date = getRandomDate(i);
  return {
    id: `inst-${i}`,
    name: i % 3 === 0 ? 'KSN-Big Factory(MV) (1000kvar)' : i % 3 === 1 ? 'PPN-Industrial Hub' : 'STG-Substation Alpha',
    serial: (57845911 + i).toString(),
    zone: i % 2 === 0 ? 'KSN' : 'PPN',
    date: date,
    time: `${Math.floor((i % 1440) / 60).toString().padStart(2, '0')}:${(i % 60).toString().padStart(2, '0')}`,
    pkw: (Math.random() * 50).toFixed(2),
    q_kvar: (Math.random() * 20).toFixed(2),
    limit: '300.0',
    v1: '2291.0',
    v2: '22138.0',
    v3: '22291.0',
    i1: '0.78',
    i2: '0.66',
    i3: '0.79',
    pf: '0.79',
    freq: '50.07',
    e180: '3562237.6',
    e280: '7.6',
    e380: '1723995.2',
    e480: '97149.6',
    e181: 'N/A',
    e281: 'N/A',
    e381: 'N/A',
    e481: 'N/A',
    e182: 'N/A',
    e282: 'N/A',
    e382: 'N/A',
    e482: 'N/A',
    e183: 'N/A',
    e283: 'N/A',
    e383: 'N/A',
    e483: 'N/A',
    createdAt: `${date} 09:00`
  };
});

const InstantUpload: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'import'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };
    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDatePickerOpen]);

  const openDatePicker = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setIsDatePickerOpen(true);
  };

  const applyDateRange = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, pageSize]);

  const filteredData = useMemo(() => {
    return MOCK_INSTANT_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.serial.includes(searchTerm);
      
      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      const matchesStart = !start || itemDate >= start;
      const matchesEnd = !end || itemDate <= end;

      return matchesSearch && matchesStart && matchesEnd;
    });
  }, [searchTerm, startDate, endDate]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const toggleSelectRow = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (paginatedData.every(i => selectedIds.has(i.id))) {
      const newSet = new Set(selectedIds);
      paginatedData.forEach(i => newSet.delete(i.id));
      setSelectedIds(newSet);
    } else {
      const newSet = new Set(selectedIds);
      paginatedData.forEach(i => newSet.add(i.id));
      setSelectedIds(newSet);
    }
  };

  const renderPageNumbers = () => {
    const pages = totalPages > 10 ? [1, 2, 3, 4, 5, 6, 7, '...', totalPages] : Array.from({length: totalPages}, (_, i) => i + 1);
    return pages.map((p, idx) => (
      <button 
        key={idx}
        disabled={p === '...'}
        onClick={() => typeof p === 'number' && setCurrentPage(p)}
        className={`w-10 h-10 flex items-center justify-center text-sm rounded-md border transition-colors font-medium ${
          p === currentPage 
            ? 'bg-[#1a1c24] text-white border-[#1a1c24]' 
            : p === '...' ? 'border-transparent text-slate-400 cursor-default' : 'text-slate-700 bg-white border-gray-200 hover:bg-gray-50'
        }`}
      >
        {p}
      </button>
    ));
  };

  if (viewMode === 'import') {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Import Instant Power Data</h2>
          <button 
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to List
          </button>
        </div>
        <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col">
          <div className="flex-1 w-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50/20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="text-lg font-bold text-slate-600">Drag Drop a file here</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">OR</p>
              <button className="mt-4 px-10 py-3 bg-[#0f172a] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Browser File
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-b border-gray-100 bg-[#f8fafc]/30 z-40">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-48">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-slate-300 text-slate-300 font-medium cursor-pointer shadow-sm">
                <option>All Zones</option>
                <option>KSN</option>
                <option>PPN</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-300">
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={openDatePicker}
                className={`flex items-center space-x-3 px-4 py-2.5 border rounded-lg transition-all shadow-sm min-w-[260px] text-left group ${
                  startDate || endDate ? 'border-slate-800 bg-white ring-1 ring-slate-800' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <CalendarDays size={18} className={`${startDate || endDate ? 'text-slate-800' : 'text-slate-300'}`} />
                <div className="flex-1 font-medium text-[13px] text-slate-600">
                  {startDate || endDate ? (
                    <span className="flex items-center font-bold">
                      {startDate || 'Start'} <ArrowRight size={12} className="mx-2 opacity-50" /> {endDate || 'End'}
                    </span>
                  ) : (
                    <span className="text-slate-300">Select Instant Period</span>
                  )}
                </div>
                {(startDate || endDate) && (
                  <div onClick={(e) => { e.stopPropagation(); setStartDate(''); setEndDate(''); }} className="p-0.5 hover:bg-slate-100 rounded-full">
                    <X size={14} className="text-slate-400" />
                  </div>
                )}
                <ChevronDown size={14} className="text-slate-300" />
              </button>

              {isDatePickerOpen && (
                <>
                  <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[1px] z-[45]" onClick={() => setIsDatePickerOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-[320px] bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-200" ref={datePickerRef}>
                    <div className="bg-[#1a1c24] px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Instant Filter</span>
                      <button onClick={() => setIsDatePickerOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Start Date</label>
                          <input type="date" value={tempStartDate} onChange={(e) => setTempStartDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-slate-300 outline-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">End Date</label>
                          <input type="date" value={tempEndDate} onChange={(e) => setTempEndDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-slate-300 outline-none" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button onClick={() => { setTempStartDate(''); setTempEndDate(''); }} className="text-[11px] font-bold text-slate-400 hover:text-red-500 uppercase">Clear</button>
                        <button onClick={applyDateRange} className="px-5 py-2 bg-[#1a1c24] text-white text-[11px] font-bold rounded-lg hover:bg-slate-800 transition-all uppercase tracking-widest">Apply</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-300 pointer-events-none">
                <Search size={22} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                className="block w-full pl-11 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-300 focus:outline-none focus:border-slate-300 font-medium bg-white shadow-sm text-slate-900" 
                placeholder="Search Meter"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            {selectedIds.size > 0 && (
              <button 
                onClick={() => { if (confirm(`Delete ${selectedIds.size}?`)) setSelectedIds(new Set()); }}
                className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-all border border-red-100 shadow-sm"
              >
                <Trash2 size={16} />
                <span>Delete ({selectedIds.size})</span>
              </button>
            )}
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setViewMode('import')}
              className="flex items-center space-x-2 px-4 py-2 bg-[#0f172a] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
            >
              <ImportIcon size={16} />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white custom-scrollbar">
        <table className="w-full text-left table-fixed border-collapse min-w-[3000px]">
          <thead className="bg-[#f8fafc] sticky top-0 z-30 border-b border-slate-100 shadow-sm">
            <tr className="h-[50px] bg-white">
              <th className="px-6 w-16 text-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 cursor-pointer" 
                  checked={paginatedData.length > 0 && paginatedData.every(i => selectedIds.has(i.id))} 
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-2 w-[240px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Meter Name</th>
              <th className="px-2 w-[140px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Meter Serial</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">Zone</th>
              <th className="px-2 w-[110px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">Date</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">Time</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-slate-900 uppercase tracking-tight text-center bg-slate-50/50">PKW</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-slate-900 uppercase tracking-tight text-center bg-slate-50/50">Q-KVAR</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">Limit</th>
              <th className="px-2 w-[100px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">V1</th>
              <th className="px-2 w-[100px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">V2</th>
              <th className="px-2 w-[100px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">V3</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">I1</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">I2</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">I3</th>
              <th className="px-2 w-[70px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">PF</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">FREQ</th>
              <th className="px-2 w-[120px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E180</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E280</th>
              <th className="px-2 w-[120px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E380</th>
              <th className="px-2 w-[120px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E480</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E181</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E281</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E381</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E481</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E182</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E282</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E382</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E482</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E183</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E283</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E383</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center">E483</th>
              <th className="px-2 w-[160px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-right pr-8">Import Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.length > 0 ? paginatedData.map((item) => {
              const isSelected = selectedIds.has(item.id);
              return (
                <tr key={item.id} className={`h-[50px] transition-all border-b border-slate-50/50 ${isSelected ? 'bg-slate-50' : 'hover:bg-gray-50/80'}`}>
                  <td className="px-6 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-slate-800 checked:bg-slate-800 cursor-pointer" 
                      checked={isSelected} 
                      onChange={() => toggleSelectRow(item.id)}
                    />
                  </td>
                  <td className="px-2 text-[13px] text-slate-700 font-bold truncate">{item.name}</td>
                  <td className="px-2 text-[13px] text-slate-500 font-medium">{item.serial}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.zone}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center whitespace-nowrap">{item.date}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.time}</td>
                  <td className="px-2 text-[13px] text-slate-900 text-center font-black bg-slate-50/30">{item.pkw}</td>
                  <td className="px-2 text-[13px] text-slate-900 text-center font-black bg-slate-50/30">{item.q_kvar}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.limit}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.v1}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.v2}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.v3}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.i1}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.i2}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.i3}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.pf}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.freq}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.e180}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.e280}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.e380}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.e480}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e181}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e281}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e381}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e481}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e182}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e282}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e382}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e482}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e183}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e283}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e383}</td>
                  <td className="px-2 text-[12px] text-slate-300 text-center italic">{item.e483}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-right pr-8 whitespace-nowrap">{item.createdAt}</td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={34} className="py-32 text-center text-slate-300">
                  <div className="flex flex-col items-center space-y-3 opacity-40 uppercase tracking-[0.2em] font-bold text-xs">
                    <CalendarDays size={48} strokeWidth={1} />
                    <span>No records found for the selected period</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-shrink-0 px-8 py-4 bg-white border-t border-slate-100 flex items-center justify-between z-20">
        <div className="text-[13px] font-medium text-slate-500">
          Showing {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(filteredData.length, currentPage * pageSize)} of {filteredData.length} Instants
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-10 h-10 flex items-center justify-center text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              {renderPageNumbers()}
            </div>

            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="w-10 h-10 flex items-center justify-center text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="relative pl-6 ml-6 border-l border-slate-100 hidden md:block">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-4 pr-10 text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-300 cursor-pointer shadow-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10 / Page</option>
              <option value={20}>20 / Page</option>
              <option value={50}>50 / Page</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantUpload;