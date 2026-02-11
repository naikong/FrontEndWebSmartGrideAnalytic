
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Filter,
  Download as ImportIcon
} from 'lucide-react';

// Enhanced mock data to fill the wide table
const MOCK_INSTANT_DATA = Array.from({ length: 45 }, (_, i) => ({
  id: `inst-${i}`,
  name: 'KSN-Big Factory(MV) (1000kvar)',
  serial: '57845911',
  zone: 'KSN',
  date: '2025-09-25',
  time: '23:45',
  pkw: '24.05',
  q_kvar: '12.54',
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
  createdAt: '2025-10-17 10:40'
}));

const InstantUpload: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredData = useMemo(() => {
    return MOCK_INSTANT_DATA.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serial.includes(searchTerm)
    );
  }, [searchTerm]);

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
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedData.map(i => i.id)));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
      {/* Top Filter Bar */}
      <div className="flex-shrink-0 px-4 py-3 sm:px-8 border-b border-gray-100 flex items-center justify-between bg-white z-20">
        <div className="flex items-center space-x-3 flex-1">
          {/* Zone Selector */}
          <div className="relative w-44">
            <select className="appearance-none w-full bg-white border border-slate-200 rounded-md py-1.5 pl-3 pr-10 text-[13px] text-slate-400 font-medium focus:outline-none focus:border-slate-300 cursor-pointer shadow-sm">
              <option>Zone</option>
              <option>KSN</option>
              <option>PPN</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-300">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Date Picker Mock */}
          <div className="relative w-48">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
              <Calendar size={16} />
            </div>
            <input 
              type="text" 
              readOnly 
              value="18/October/2025" 
              className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-md text-[13px] text-slate-600 font-medium focus:outline-none shadow-sm cursor-default"
            />
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-300 pointer-events-none">
              <Search size={18} strokeWidth={1.5} />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-1.5 border border-slate-200 rounded-md text-[13px] placeholder-slate-300 focus:outline-none focus:border-slate-300 font-medium bg-white shadow-sm" 
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-4">
          <button className="flex items-center space-x-2 px-4 py-1.5 border border-slate-200 rounded-md text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-1.5 bg-[#0f172a] text-white rounded-md text-[13px] font-bold hover:bg-slate-800 transition-all shadow-md">
            <ImportIcon size={16} />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* High Density Data Table */}
      <div className="flex-1 overflow-auto bg-white custom-scrollbar border border-gray-100 mx-4 my-4 rounded-md">
        <table className="w-full text-left table-fixed border-collapse min-w-[3000px]">
          <thead className="bg-[#f8fafc] sticky top-0 z-30 border-b border-gray-200">
            <tr className="bg-white">
              <th className="py-3 px-4 w-12 text-center">
                <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-400" checked={selectedIds.size === paginatedData.length} onChange={toggleSelectAll}/>
              </th>
              <th className="py-3 px-2 w-[220px] text-[10px] font-bold text-gray-500 uppercase tracking-tight">Meter Name</th>
              <th className="py-3 px-2 w-[120px] text-[10px] font-bold text-gray-500 uppercase tracking-tight">Meter Serial</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Zone</th>
              <th className="py-3 px-2 w-[100px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Date</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Time</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">PKW</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Q-KVAR</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Limit</th>
              <th className="py-3 px-2 w-[100px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">V1</th>
              <th className="py-3 px-2 w-[100px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">V2</th>
              <th className="py-3 px-2 w-[100px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">V3</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">I1</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">I2</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">I3</th>
              <th className="py-3 px-2 w-[60px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">PF</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">FREQ</th>
              <th className="py-3 px-2 w-[110px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E180</th>
              <th className="py-3 px-2 w-[80px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E280</th>
              <th className="py-3 px-2 w-[110px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E380</th>
              <th className="py-3 px-2 w-[110px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E480</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E181</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E281</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E381</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E481</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E182</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E282</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E382</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E482</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E183</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E283</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E383</th>
              <th className="py-3 px-2 w-[70px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">E483</th>
              <th className="py-3 px-2 w-[140px] text-[10px] font-bold text-gray-500 uppercase tracking-tight text-right pr-4">Create At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                <td className="py-2.5 px-4 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-400" checked={selectedIds.has(item.id)} onChange={() => toggleSelectRow(item.id)}/>
                </td>
                <td className="py-2.5 px-2 text-[11px] text-slate-700 font-bold truncate">{item.name}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 font-medium">{item.serial}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.zone}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center whitespace-nowrap">{item.date}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.time}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center font-bold">{item.pkw}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center font-bold">{item.q_kvar}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.limit}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.v1}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.v2}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.v3}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.i1}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.i2}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.i3}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.pf}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.freq}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.e180}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.e280}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.e380}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{item.e480}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e181}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e281}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e381}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e481}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e182}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e282}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e382}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e482}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e183}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e283}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e383}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-400 text-center italic">{item.e483}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-500 text-right pr-4 whitespace-nowrap">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex-shrink-0 px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
        <div className="text-[12px] text-slate-500 font-medium">
          Showing {(currentPage-1)*pageSize + 1} - {Math.min(currentPage*pageSize, filteredData.length)} of {filteredData.length} Instant
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-3 py-1.5 flex items-center space-x-1 text-[12px] font-bold text-slate-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-1 mx-2">
            {[1, 2, 3, 4, 5, 6, 7, '...', 20].map((p, idx) => (
              <button 
                key={idx}
                onClick={() => typeof p === 'number' && setCurrentPage(p)}
                className={`w-8 h-8 flex items-center justify-center text-[12px] font-bold rounded-md border transition-all ${
                  p === currentPage 
                    ? 'bg-[#1a1c24] text-white border-[#1a1c24]' 
                    : 'text-slate-500 bg-white border-gray-200 hover:bg-gray-50'
                } ${p === '...' ? 'cursor-default border-transparent hover:bg-white' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(20, p + 1))}
            className="px-3 py-1.5 flex items-center space-x-1 text-[12px] font-bold text-slate-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all shadow-sm"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>

          <div className="relative pl-4 ml-4 border-l border-gray-200">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-md py-1.5 pl-3 pr-10 text-[12px] font-bold focus:outline-none focus:ring-1 focus:ring-slate-300 text-slate-600 cursor-pointer shadow-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
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
