import React, { useState, useMemo ,useEffect} from 'react';
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
  FileText,
  MoreVertical
} from 'lucide-react';
import { MOCK_COMPANIES, PROVINCES } from '../constants/Companyconstants';
import { MOCK_USERS } from '../constants/Userconstants';
import ActionMenu from '../components/ActionMenu';
import QuickEditModal from '../components/QuickEditModal';
import { Company, User } from '../../../types';
// import axios from "axios";
const CompanyList: React.FC = () => {
 
  //   const [companies, setCompanies] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   axios.get("http://127.0.0.1:8000/api/companies/", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(res => setCompanies(res.data))
  //   .catch(err => console.log(err));
  // }, []);


  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(PROVINCES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);
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
    if (allSelected) paginatedCompanies.forEach(c => newSelected.delete(c.id));
    else paginatedCompanies.forEach(c => newSelected.add(c.id));
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

  const getCompanyUsers = (companyName: string) => {
    return MOCK_USERS.filter(u => u.companyName === companyName);
  };

  const renderPageButtons = () => {
    const pages = totalPages > 10 ? [1, 2, 3, 4, 5, 6, 7, '...', totalPages] : Array.from({length: totalPages}, (_, i) => i + 1);
    return pages.map((page, idx) => (
      <button 
        key={idx}
        className={`w-10 h-10 flex items-center justify-center text-sm rounded-md border transition-colors font-medium ${
          page === currentPage 
            ? 'bg-[#1a1c24] text-white border-[#1a1c24]' 
            : page === '...' ? 'border-transparent text-slate-400 cursor-default' : 'text-slate-700 bg-white border-gray-200 hover:bg-gray-50'
        } ${page === '...' ? 'cursor-default border-transparent' : ''}`}
        onClick={() => typeof page === 'number' && setCurrentPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-b border-gray-100 bg-[#f8fafc]/30 z-20">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-56">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-slate-300 text-slate-300 font-medium cursor-pointer shadow-sm" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-300"><ChevronDown size={14} /></div>
            </div>

            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-300 pointer-events-none">
                <Search size={22} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                className="block w-full pl-11 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 font-medium bg-white shadow-sm text-slate-900" 
                placeholder="Search Company" 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {selectedIds.size > 0 && <div className="flex items-center space-x-2 mr-4 pr-4 border-r border-slate-100 animate-in slide-in-from-right-2"><button onClick={handleBulkDelete} className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-md text-sm font-bold hover:bg-red-100 transition-colors border border-red-100 shadow-sm"><Trash2 size={16} /><span>Delete ({selectedIds.size})</span></button></div>}
            <div className="relative group"><button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm"><Download size={16} /><span>Export</span></button><div className="absolute right-0 mt-1 w-44 bg-white border border-slate-100 rounded-md shadow-xl hidden group-hover:block z-50 overflow-hidden ring-1 ring-black ring-opacity-5"><button onClick={() => handleExport('csv')} className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium border-b border-slate-50"><FileText size={14} className="mr-3 text-slate-400" /> CSV</button><button onClick={() => handleExport('excel')} className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium"><FileSpreadsheet size={14} className="mr-3 text-slate-400" /> Excel</button></div></div>
            <button onClick={() => navigate('/company/create')} className="flex items-center space-x-2 px-4 py-2.5 bg-[#1a1c24] text-white rounded-md text-sm font-bold hover:bg-slate-800 shadow-md transition-all"><Plus size={16} /><span>Add Company</span></button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white custom-scrollbar">
        <table className="w-full text-left table-fixed border-collapse min-w-[1400px]">
          <thead className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
            <tr className="h-[50px]">
              <th className="px-6 w-16 text-center bg-white"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-slate-800 focus:ring-slate-500 cursor-pointer" checked={allSelected} onChange={toggleSelectAll}/></th>
              <th className="px-4 w-[25%] text-[12px]  text-slate-400 uppercase tracking-widest bg-white">Company Name</th>
              <th className="px-4 w-[12%] text-[12px]  text-slate-400 uppercase tracking-widest bg-white">Phone Number</th>
              <th className="px-4 w-[18%] text-[12px]  text-slate-400 uppercase tracking-widest bg-white">Email</th>
              <th className="px-4 w-[12%] text-[12px]  text-slate-400 uppercase tracking-widest bg-white">Address</th>
              <th className="px-4 w-[18%] text-[12px]  text-slate-400 uppercase tracking-widest bg-white">Website</th>
              <th className="px-4 w-[10%] text-[12px]  text-slate-600 uppercase tracking-widest text-right pr-12 bg-white">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedCompanies.length > 0 ? paginatedCompanies.map((company) => {
              const isSelected = selectedIds.has(company.id);
              const isExpanded = expandedCompanyId === company.id;
              const companyUsers = getCompanyUsers(company.name);
              return (
                <React.Fragment key={company.id}>
                  <tr className={`h-[50px] transition-all cursor-default group border-b border-gray-50 ${isSelected ? 'bg-slate-50' : 'hover:bg-gray-50/80'}`}>
                    <td className="px-6 text-center"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-slate-800 checked:bg-slate-800 focus:ring-slate-500 cursor-pointer" checked={isSelected} onChange={() => toggleSelectRow(company.id)}/></td>
                    <td className="px-4 overflow-hidden"><div className="flex items-center"><div className="w-9 h-9 rounded-full border border-slate-200 bg-white mr-4 flex-shrink-0 flex items-center justify-center p-1 shadow-sm ring-1 ring-slate-100 ring-offset-1"><img src={company.logoUrl} alt="" className="w-full h-full object-contain rounded-full" /></div><span className="text-sm font-bold text-slate-700 truncate">{company.name}</span></div></td>
                    <td className="px-4 text-sm text-slate-600 truncate">{company.phone}</td>
                    <td className="px-4 text-sm text-slate-600 truncate">{company.email}</td>
                    <td className="px-4 text-sm text-slate-600 truncate">{company.address}</td>
                    <td className="px-4 text-sm text-blue-600 truncate"><a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="hover:underline">{company.website}</a></td>
                    <td className="px-4 text-right"><div className="flex items-center justify-end space-x-1 pr-2"><button className="p-1.5 text-slate-400 hover:text-slate-800 transition-all group-hover:scale-110" onClick={() => setEditingCompany(company)}><SquarePen size={18} /></button><ActionMenu onEdit={() => navigate(`/company/edit/${company.id}`)} onView={() => navigate(`/company/detail/${company.id}`)}/><button className={`p-1.5 transition-all duration-300 ${isExpanded ? 'text-slate-800 rotate-90' : 'text-slate-400 hover:text-slate-700'}`} onClick={() => setExpandedCompanyId(isExpanded ? null : company.id)}><ChevronRight size={18} /></button></div></td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-white"><td colSpan={7} className="p-0"><div className="mx-6 mb-6 mt-1 border border-gray-100 rounded-xl bg-slate-50/30 shadow-inner overflow-hidden animate-in slide-in-from-top-2 duration-300"><div className="flex border-l-[3px] border-[#1a1c24]"><div className="w-full"><table className="w-full text-left"><tbody className="divide-y divide-gray-100">{companyUsers.length > 0 ? companyUsers.map((user) => (<tr key={user.id} className="h-[50px] hover:bg-gray-100 transition-colors group/sub"><td className="px-6 w-16 text-center"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-slate-700 focus:ring-slate-500 cursor-pointer" /></td><td className="px-4 w-[25%]"><div className="flex items-center"><div className="w-8 h-8 rounded-full border border-gray-200 bg-white mr-3 flex-shrink-0 flex items-center justify-center p-0.5 shadow-sm"><img src={user.avatarUrl} alt="" className="w-full h-full object-cover rounded-full" /></div><span className="text-[13px] font-bold text-slate-600">{user.name}</span></div></td><td className="px-4 w-[12%] text-[13px] text-slate-500">{user.phone}</td><td className="px-4 w-[18%] text-[13px] text-slate-500">{user.email}</td><td className="px-4 w-[12%] text-[13px] text-slate-500">{user.address}</td><td className="px-4 w-[13%]"><span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{user.role}</span></td><td className="px-4 w-[10%] text-right pr-12"><div className="flex items-center justify-end space-x-2"><button className="p-1 text-slate-300 hover:text-slate-600 transition-all"><SquarePen size={16} /></button><button className="p-1 text-slate-300 hover:text-slate-600"><MoreVertical size={16} /></button></div></td></tr>)) : (<tr className="h-[50px]"><td colSpan={7} className="px-12 text-[12px] font-bold text-slate-400 uppercase tracking-widest italic text-center">No linked network personnel</td></tr>)}</tbody></table></div></div></div></td></tr>
                  )}
                </React.Fragment>
              );
            }) : (
              <tr><td colSpan={7} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest opacity-40">No companies found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-t border-gray-100 bg-white z-20"><div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div className="text-[13px] font-medium text-slate-500">Showing {paginatedCompanies.length} of {filteredCompanies.length} Companies</div><div className="flex items-center space-x-4"><div className="flex items-center space-x-2"><button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-4 py-2 flex items-center space-x-2 text-sm font-bold text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"><ChevronLeft size={18} /><span>Previous</span></button><div className="flex items-center space-x-2">{renderPageButtons()}</div><button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages || totalPages === 0} className="px-4 py-2 flex items-center space-x-2 text-sm font-bold text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all shadow-sm"><span>Next</span><ChevronRight size={18} /></button></div></div></div></div>
      <QuickEditModal item={editingCompany} isOpen={editingCompany !== null} onClose={() => setEditingCompany(null)} onSave={(updated) => { console.log('Saved:', updated); setEditingCompany(null); }} />
    </div>
  );
};

export default CompanyList;