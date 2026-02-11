import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Download, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  CalendarDays,
  Trash2,
  X,
  ArrowRight,
  Download as ImportIcon,
  AlertTriangle,
  Upload,
  ArrowLeft
} from 'lucide-react';

// Mock Alarm Data
const MOCK_ALARM_DATA = Array.from({ length: 45 }, (_, i) => ({
  id: `alarm-${i}`,
  name: i % 2 === 0 ? 'KSN-WS HengLeaksmey(MV) 100kVA' : 'PPN-Substation Zeta 250kVA',
  vpStartId: `+8556950${127 + i}`,
  serial: (25347448 + i).toString(),
  zone: i % 2 === 0 ? 'KSN' : 'PPN',
  date: '01-11-2025',
  event: 'KSN-Heng Leaksmey 100kVA(MV) Low Current Warning at: 01-11-2025 23:59:19, I1=0.00A, I2=0.02A, I3=0.02A'
}));

const UploadAlarm: React.FC = () => {
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
    if (isDatePickerOpen) document.addEventListener('mousedown', handleClickOutside);
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

  const filteredData = useMemo(() => {
    return MOCK_ALARM_DATA.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serial.includes(searchTerm) ||
      item.event.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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

  // RENDER UPLOAD VIEW (MATCHES SCREENSHOT)
  if (viewMode === 'import') {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Import Alarm Data</h2>
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
              
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] py-2">OR</p>
              
              <button 
                className="px-10 py-3 bg-[#0f172a] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Browser File
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER LIST VIEW
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-b border-gray-100 bg-[#f8fafc]/30 z-40">
        <div className="max-w-full mx-auto flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-40 lg:w-48">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-slate-300 text-slate-400 font-medium cursor-pointer shadow-sm">
                <option>Zone</option><option>KSN</option><option>PPN</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-300"><ChevronDown size={14} /></div>
            </div>

            <div className="relative">
              <button onClick={openDatePicker} className={`flex items-center space-x-3 px-4 py-2.5 border rounded-lg transition-all shadow-sm w-full sm:min-w-[260px] text-left group ${startDate || endDate ? 'border-slate-800 bg-white ring-1 ring-slate-800' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                <CalendarDays size={18} className={`${startDate || endDate ? 'text-slate-800' : 'text-slate-300'}`} />
                <div className="flex-1 font-medium text-[13px] text-slate-600 truncate">{startDate || endDate ? <span className="flex items-center font-bold whitespace-nowrap">{startDate || 'Start'} <ArrowRight size={12} className="mx-2 opacity-50" /> {endDate || 'End'}</span> : <span className="text-slate-300">Select Alarm Period</span>}</div>
                <ChevronDown size={14} className="text-slate-300 flex-shrink-0" />
              </button>

              {isDatePickerOpen && (
                <>
                  <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[1px] z-[45]" onClick={() => setIsDatePickerOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-[320px] bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-200" ref={datePickerRef}>
                    <div className="bg-[#1a1c24] px-5 py-3 flex items-center justify-between"><span className="text-xs font-bold text-white uppercase tracking-wider">Alarm Filter</span><button onClick={() => setIsDatePickerOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button></div>
                    <div className="p-5 space-y-4">
                      <div className="space-y-4">
                        <div><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Start Date</label><input type="date" value={tempStartDate} onChange={(e) => setTempStartDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-slate-300 outline-none" /></div>
                        <div><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">End Date</label><input type="date" value={tempEndDate} onChange={(e) => setTempEndDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-slate-300 outline-none" /></div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100"><button onClick={() => { setTempStartDate(''); setTempEndDate(''); }} className="text-[11px] font-bold text-slate-400 hover:text-red-500 uppercase">Clear</button><button onClick={applyDateRange} className="px-5 py-2 bg-[#1a1c24] text-white text-[11px] font-bold rounded-lg hover:bg-slate-800 transition-all uppercase tracking-widest">Apply</button></div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-300 pointer-events-none">
                <Search size={20} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 font-medium bg-white shadow-sm text-slate-900" 
                placeholder="Search Name or Serial"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {selectedIds.size > 0 && (
              <button onClick={() => { if (confirm(`Delete ${selectedIds.size}?`)) setSelectedIds(new Set()); }} className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-all border border-red-100 shadow-sm"><Trash2 size={16} /><span>Delete ({selectedIds.size})</span></button>
            )}
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm"><Download size={16} /><span>Export</span></button>
            <button onClick={() => setViewMode('import')} className="flex items-center space-x-2 px-4 py-2 bg-[#0f172a] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md"><ImportIcon size={16} /><span>Import</span></button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white custom-scrollbar">
        <table className="w-full text-left table-fixed border-collapse min-w-[1000px]">
          <thead className="bg-[#f8fafc] sticky top-0 z-30 border-b border-slate-100 shadow-sm">
            <tr className="h-[50px] bg-white">
              <th className="px-6 w-14 text-center"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 cursor-pointer" checked={paginatedData.length > 0 && paginatedData.every(i => selectedIds.has(i.id))} onChange={toggleSelectAll}/></th>
              <th className="px-2 w-[18%] text-[11px] font-bold text-slate-400 uppercase tracking-tight">Name</th>
              <th className="px-2 w-[12%] text-[11px] font-bold text-slate-400 uppercase tracking-tight">VP Start ID</th>
              <th className="px-2 w-[12%] text-[11px] font-bold text-slate-400 uppercase tracking-tight">Serial Number</th>
              <th className="px-2 w-[7%] text-[11px] font-bold text-slate-400 uppercase tracking-tight text-center">Zone</th>
              <th className="px-2 w-[11%] text-[11px] font-bold text-slate-400 uppercase tracking-tight text-center">Date</th>
              <th className="px-4 w-auto text-[11px] font-bold text-slate-400 uppercase tracking-tight">Event Log Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.length > 0 ? paginatedData.map((item) => {
              const isSelected = selectedIds.has(item.id);
              return (
                <tr key={item.id} className={`h-[50px] transition-all border-b border-slate-50/50 ${isSelected ? 'bg-slate-50' : 'hover:bg-gray-50/80'}`}>
                  <td className="px-6 text-center"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-800 checked:bg-slate-800 cursor-pointer" checked={isSelected} onChange={() => toggleSelectRow(item.id)}/></td>
                  <td className="px-2 text-[13px] text-slate-700 font-bold truncate">{item.name}</td>
                  <td className="px-2 text-[13px] text-slate-500 font-medium truncate">{item.vpStartId}</td>
                  <td className="px-2 text-[13px] text-slate-500 font-medium truncate">{item.serial}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center">{item.zone}</td>
                  <td className="px-2 text-[13px] text-slate-500 text-center whitespace-nowrap">{item.date}</td>
                  <td className="px-4 text-[12px] text-slate-600 leading-tight pr-8"><div className="truncate xl:whitespace-normal" title={item.event}>{item.event}</div></td>
                </tr>
              );
            }) : (
              <tr><td colSpan={7} className="py-32 text-center text-slate-300"><div className="flex flex-col items-center space-y-3 opacity-40 uppercase tracking-[0.2em] font-bold text-xs"><AlertTriangle size={48} strokeWidth={1} /><span>No alarm logs detected</span></div></td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-shrink-0 px-8 py-4 bg-white border-t border-slate-100 flex items-center justify-between z-20">
        <div className="text-[13px] font-medium text-slate-500">Showing {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(filteredData.length, currentPage * pageSize)} of {filteredData.length} Logs</div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-10 h-10 flex items-center justify-center text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"><ChevronLeft size={20} /></button>
            <div className="flex items-center space-x-2">{renderPageNumbers()}</div>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="w-10 h-10 flex items-center justify-center text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"><ChevronRight size={20} /></button>
          </div>
          <div className="relative pl-6 ml-6 border-l border-slate-100 hidden md:block">
            <select className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-4 pr-10 text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-300 cursor-pointer shadow-sm" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value={10}>10 / Page</option><option value={20}>20 / Page</option><option value={50}>50 / Page</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400"><ChevronDown size={14} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAlarm;