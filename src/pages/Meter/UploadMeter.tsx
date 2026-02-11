import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Download as ImportIcon,
  ChevronRight, 
  ChevronLeft,
  SquarePen,
  Trash2,
  Upload,
  ArrowLeft,
  ChevronDown,
  Plus
} from 'lucide-react';
import { MOCK_METERS, METER_BRANDS } from '../constants/Meterconstants';
import QuickEditModal from '../components/QuickEditModal';
import ActionMenu from '../components/ActionMenu';
import { Meter } from '../../../types';

const UploadMeter: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'import'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(METER_BRANDS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingMeter, setEditingMeter] = useState<Meter | null>(null);

  const filteredMeters = useMemo(() => {
    return MOCK_METERS.filter(meter => {
      const matchesSearch = searchTerm === '' || 
        meter.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        meter.serial.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === METER_BRANDS[0] || meter.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [searchTerm, selectedBrand]);

  const totalPages = Math.ceil(filteredMeters.length / pageSize);
  const paginatedMeters = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMeters.slice(start, start + pageSize);
  }, [filteredMeters, currentPage, pageSize]);

  const allSelected = paginatedMeters.length > 0 && paginatedMeters.every(m => selectedIds.has(m.id));

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedIds);
    if (allSelected) paginatedMeters.forEach(m => newSelected.delete(m.id));
    else paginatedMeters.forEach(m => newSelected.add(m.id));
    setSelectedIds(newSelected);
  };

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  if (viewMode === 'import') {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Import Meter Data</h2>
          <button onClick={() => setViewMode('list')} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={18} />Back to List
          </button>
        </div>
        <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col">
          <div className="flex-1 w-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50/20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="text-lg font-bold text-slate-600">Drag Drop a file here</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">OR</p>
              <button className="mt-4 px-10 py-3 bg-[#0f172a] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Browser File</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-b border-gray-100 bg-[#f8fafc]/30 z-20">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-56">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-slate-300 text-slate-400 font-medium cursor-pointer shadow-sm" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                {METER_BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-300"><ChevronRight size={14} /></div>
            </div>

            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-300 pointer-events-none">
                <Search size={22} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                className="block w-full pl-11 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 font-medium bg-white shadow-sm text-slate-900" 
                placeholder="Search Name or Serial"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm"><Download size={16} /><span>Export</span></button>
            <button onClick={() => setViewMode('import')} className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm"><ImportIcon size={16} /><span>Import</span></button>
            <button 
              onClick={() => navigate('/meter/create')}
              className="flex items-center space-x-2 px-4 py-2 bg-[#1a1c24] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
            >
              <Plus size={16} />
              <span>Create Meter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white custom-scrollbar">
        <table className="w-full text-left table-fixed border-collapse min-w-[1500px]">
          <thead className="bg-white sticky top-0 z-30 border-b border-gray-100">
            <tr className="h-[50px] bg-white">
              <th className="px-6 w-16 text-center"><input type="checkbox" className="w-4 h-4 rounded-sm border-gray-400 text-slate-800 cursor-pointer" checked={allSelected} onChange={toggleSelectAll}/></th>
              <th className="px-2 w-[110px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Meter Serial</th>
              <th className="px-2 w-[240px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Meter Name</th>
              <th className="px-2 w-[80px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Ration</th>
              <th className="px-2 w-[110px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Meter Brand</th>
              <th className="px-2 w-[110px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Meter Type</th>
              <th className="px-2 w-[110px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Meter Group</th>
              <th className="px-2 w-[90px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Tr-Cap</th>
              <th className="px-2 w-[100px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Tr-Brand</th>
              <th className="px-2 w-[280px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Company</th>
              <th className="px-2 w-[110px] text-[11px] font-bold text-gray-500 uppercase tracking-tight">Create At</th>
              <th className="px-2 w-[100px] text-[11px] font-bold text-gray-500 uppercase tracking-tight text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedMeters.map((meter) => {
              const isSelected = selectedIds.has(meter.id);
              return (
                <tr key={meter.id} className={`h-[50px] transition-colors border-b border-gray-50 ${isSelected ? 'bg-gray-50' : 'hover:bg-gray-50/80'}`}>
                  <td className="px-6 text-center"><input type="checkbox" className="w-4 h-4 rounded-sm border-gray-400 text-slate-800 cursor-pointer" checked={isSelected} onChange={() => toggleSelectRow(meter.id)}/></td>
                  <td className="px-2 text-[13px] text-slate-500 font-medium">{meter.serial}</td>
                  <td className="px-2 text-[13px] text-slate-900 font-bold truncate" title={meter.name}>{meter.name}</td>
                  <td className="px-2 text-[13px] text-slate-500">{meter.ration}</td>
                  <td className="px-2 text-[13px] text-slate-500 uppercase font-medium">{meter.brand}</td>
                  <td className="px-2 text-[13px] text-slate-500 uppercase font-medium">{meter.type}</td>
                  <td className="px-2 text-[13px] text-slate-500 uppercase font-medium">{meter.group}</td>
                  <td className="px-2 text-[13px] text-slate-500">{meter.trCap}</td>
                  <td className="px-2 text-[13px] text-slate-500 uppercase font-medium">{meter.trBrand}</td>
                  <td className="px-2 text-[12px] text-slate-700 font-bold uppercase truncate">{meter.company}</td>
                  <td className="px-2 text-[12px] text-slate-500">{meter.createdAt}</td>
                  <td className="px-2 text-right pr-6"><div className="flex items-center justify-end space-x-1"><button className="p-1.5 text-slate-400 hover:text-slate-900 transition-all hover:scale-110" onClick={() => setEditingMeter(meter)}><SquarePen size={18}/></button><ActionMenu onView={() => navigate(`/meter/detail/${meter.id}`)} onEdit={() => setEditingMeter(meter)} onDelete={() => alert('Delete ' + meter.serial)}/></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex-shrink-0 px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
        <div className="text-[13px] font-medium text-slate-500">Showing {paginatedMeters.length} of {filteredMeters.length} Meters</div>
        <div className="flex items-center space-x-2"><button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-3 py-1.5 border border-gray-200 rounded-md text-[12px] font-bold text-slate-600 hover:bg-gray-50"><ChevronLeft size={16}/></button><button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1.5 border border-gray-200 rounded-md text-[12px] font-bold text-slate-600 hover:bg-gray-50"><ChevronRight size={16}/></button></div>
      </div>
      <QuickEditModal item={editingMeter} isOpen={editingMeter !== null} onClose={() => setEditingMeter(null)} onSave={() => setEditingMeter(null)}/>
    </>
  );
};

export default UploadMeter;