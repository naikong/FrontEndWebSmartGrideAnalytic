
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  SquarePen, 
  ChevronLeft,
  Trash2,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { MOCK_COMPANIES, PROVINCES } from '../../../Companyconstants';
import { MOCK_USERS } from '../Userconstants';
import ActionMenu from './ActionMenu';
import QuickEditModal from './QuickEditModal';
import { Company } from '../../../types';

const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(PROVINCES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);

  // Quick Edit State
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter(company => 
      (searchTerm === '' || company.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedProvince === PROVINCES[0] || company.address === selectedProvince)
    );
  }, [searchTerm, selectedProvince]);

  const totalPages = Math.ceil(filteredCompanies.length / pageSize);
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCompanies.slice(start, start + pageSize);
  }, [filteredCompanies, currentPage, pageSize]);

  const allSelected = paginatedCompanies.length > 0 && paginatedCompanies.every(c => selectedIds.has(c.id));

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedIds);
    if (allSelected) {
      paginatedCompanies.forEach(c => newSelected.delete(c.id));
    } else {
      paginatedCompanies.forEach(c => newSelected.add(c.id));
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.size} selected companies?`)) {
      alert(`Deleted ${selectedIds.size} items.`);
      setSelectedIds(new Set());
    }
  };

  const handleExport = (type: 'csv' | 'excel') => {
    const count = selectedIds.size > 0 ? selectedIds.size : filteredCompanies.length;
    alert(`Exporting ${count} companies to ${type.toUpperCase()}...`);
  };

  const handleQuickEdit = (company: Company) => {
    setEditingCompany(company);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/company/detail/${id}`);
  };

  const handleFullEdit = (id: string) => {
    navigate(`/company/edit/${id}`);
  };

  const handleSaveCompany = (updatedCompany: any) => {
    console.log('Saving company:', updatedCompany);
    alert(`Company ${updatedCompany.name} updated successfully!`);
    setEditingCompany(null);
  };

  const renderPageButtons = () => {
    const pages = totalPages > 10 ? [1, 2, 3, 4, 5, 6, 7, '...', totalPages] : Array.from({length: totalPages}, (_, i) => i + 1);
    return pages.map((page, idx) => (
      <button 
        key={idx}
        className={`w-10 h-10 flex items-center justify-center text-sm rounded-md border transition-colors font-medium ${
          page === currentPage 
            ? 'bg-[#1a1c24] text-white border-[#1a1c24]' 
            : 'text-slate-700 bg-white border-gray-200 hover:bg-gray-50'
        } ${page === '...' ? 'cursor-default border-transparent' : ''}`}
        onClick={() => typeof page === 'number' && setCurrentPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* FIXED HEADER */}
      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-b border-gray-100 bg-white z-20">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-56">
              <select 
                className="appearance-none w-full bg-white border border-gray-200 rounded-md py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 text-slate-600 font-medium cursor-pointer"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 font-medium" 
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {selectedIds.size > 0 && (
              <div className="flex items-center space-x-2 mr-4 pr-4 border-r border-slate-100 animate-in slide-in-from-right-2">
                <button 
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-md text-sm font-bold hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete ({selectedIds.size})</span>
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 border border-slate-200 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-100 rounded-md shadow-xl hidden group-hover:block z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                    <button onClick={() => handleExport('csv')} className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium border-b border-slate-50">
                      <FileText size={14} className="mr-3 text-slate-400" /> Export to CSV
                    </button>
                    <button onClick={() => handleExport('excel')} className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium">
                      <FileSpreadsheet size={14} className="mr-3 text-slate-400" /> Export to Excel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button 
              onClick={() => navigate('/company/create')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#1a1c24] text-white rounded-md text-sm font-bold hover:bg-slate-800 transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>Add New Company</span>
            </button>
          </div>
        </div>
      </div>

      {/* SCROLLABLE TABLE */}
      <div className="flex-1 overflow-auto bg-white custom-scrollbar">
        <table className="w-full text-left table-fixed border-collapse min-w-[1200px]">
          <thead className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
            <tr>
              <th className="py-5 px-6 w-16 text-center bg-white">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-slate-800 focus:ring-slate-500 cursor-pointer" 
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-5 px-4 w-[25%] text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">Company Name</th>
              <th className="py-5 px-4 w-[12%] text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">Phone</th>
              <th className="py-5 px-4 w-[20%] text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">Email</th>
              <th className="py-5 px-4 w-[15%] text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">Address</th>
              <th className="py-5 px-4 w-[18%] text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">Website</th>
              <th className="py-5 px-4 w-[10%] text-[10px] font-bold text-slate-600 uppercase tracking-widest text-right pr-12 bg-white">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedCompanies.length > 0 ? (
              paginatedCompanies.map((company) => {
                const isSelected = selectedIds.has(company.id);
                const isExpanded = expandedCompanyId === company.id;
                return (
                  <React.Fragment key={company.id}>
                    <tr className={`transition-colors cursor-default ${isSelected ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
                      <td className="py-4 px-6 text-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 text-slate-800 focus:ring-slate-500 cursor-pointer" 
                          checked={isSelected}
                          onChange={() => toggleSelectRow(company.id)}
                        />
                      </td>
                      <td className="py-4 px-4 overflow-hidden">
                        <div className="flex items-center">
                          {/* UPDATED LOGO STYLE: Double border / ring effect as per user request */}
                          <div className="w-11 h-11 rounded-full border border-slate-200 bg-white mr-4 flex-shrink-0 flex items-center justify-center p-1 shadow-sm ring-1 ring-slate-100 ring-offset-1">
                             <img src={company.logoUrl} alt="" className="w-full h-full object-contain" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 truncate">{company.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600 truncate">{company.phone}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 truncate">{company.email}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 truncate">{company.address}</td>
                      <td className="py-4 px-4 text-sm text-blue-600 truncate">
                        <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="hover:underline">{company.website}</a>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1 pr-2">
                          <button 
                            className="p-1.5 text-slate-400 hover:text-slate-800 rounded transition-colors"
                            title="Quick Edit"
                            onClick={() => handleQuickEdit(company)}
                          >
                            <SquarePen size={18} />
                          </button>
                          <ActionMenu 
                            onEdit={() => handleFullEdit(company.id)} 
                            onView={() => handleViewDetail(company.id)}
                          />
                          <button 
                            className={`p-1.5 transition-all ${isExpanded ? 'text-slate-800 rotate-90' : 'text-slate-400'}`}
                            onClick={() => setExpandedCompanyId(isExpanded ? null : company.id)}
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50/30">
                        <td colSpan={7} className="p-0">
                          <div className="px-12 py-5 border-l-2 border-[#1a1c24] bg-white shadow-inner m-4 rounded-md border border-slate-100 animate-in slide-in-from-top-1">
                             <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-3">Associated Network Nodes</p>
                             <div className="text-sm text-slate-400 font-medium italic">No sub-data currently linked to this entity.</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr><td colSpan={7} className="py-20 text-center text-slate-400 font-medium">No company records match your current view.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FIXED FOOTER */}
      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-t border-gray-100 bg-white z-20">
        <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500 font-bold bg-slate-50/50 px-3 py-1.5 rounded-full border border-slate-100">
            Showing {filteredCompanies.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(filteredCompanies.length, currentPage * pageSize)} of {filteredCompanies.length} Companies
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 flex items-center space-x-2 text-sm font-bold text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} className="text-slate-500" />
                <span>Previous</span>
              </button>
              <div className="flex items-center space-x-2">
                {renderPageButtons()}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 flex items-center space-x-2 text-sm font-bold text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <span>Next</span>
                <ChevronRight size={18} className="text-slate-500" />
              </button>
            </div>

            <div className="relative border-l border-slate-100 pl-4 ml-4">
              <select 
                className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 text-slate-600 font-bold shadow-sm cursor-pointer"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={10}>10 / Page</option>
                <option value={20}>20 / Page</option>
                <option value={50}>50 / Page</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Edit Modal */}
      <QuickEditModal
        item={editingCompany}
        isOpen={editingCompany !== null}
        onClose={() => setEditingCompany(null)}
        onSave={handleSaveCompany}
      />
    </div>
  );
};

export default CompanyList;
