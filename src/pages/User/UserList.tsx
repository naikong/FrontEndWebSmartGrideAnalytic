import React, { useState, useMemo } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download, 
  ChevronDown, 
  SquarePen, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Building2,
  Trash2,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { MOCK_USERS } from '../constants/Userconstants';
import { PROVINCES, MOCK_COMPANIES } from '../constants/Companyconstants';
import ActionMenu from '../components/ActionMenu';
import QuickEditModal from '../components/QuickEditModal';
import { User } from '../../../types';

const UserList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchTermParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(PROVINCES[0]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const companyFilter = searchParams.get('company') || 'All Companies';
  const isVPStartMode = location.pathname.includes('vpstart');

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user => {
      const matchesSearch = searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvince = selectedProvince === PROVINCES[0] || user.address === selectedProvince;
      const matchesCompany = companyFilter === 'All Companies' || user.companyName === companyFilter;
      return matchesSearch && matchesProvince && (isVPStartMode ? true : matchesCompany);
    });
  }, [searchTerm, selectedProvince, companyFilter, isVPStartMode]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const allSelected = paginatedUsers.length > 0 && paginatedUsers.every(u => selectedIds.has(u.id));

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedIds);
    if (allSelected) {
      paginatedUsers.forEach(u => newSelected.delete(u.id));
    } else {
      paginatedUsers.forEach(u => newSelected.add(u.id));
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
    if (confirm(`Are you sure you want to delete ${selectedIds.size} users?`)) {
      alert(`Deleted ${selectedIds.size} users.`);
      setSelectedIds(new Set());
    }
  };

  const handleExport = (type: 'csv' | 'excel') => {
    const count = selectedIds.size > 0 ? selectedIds.size : filteredUsers.length;
    alert(`Exporting ${count} users to ${type.toUpperCase()}...`);
  };

  const handleSaveUser = (updatedUser: any) => {
    console.log('Saving user:', updatedUser);
    alert(`User ${updatedUser.firstName} ${updatedUser.lastName} updated successfully!`);
    setEditingUser(null);
  };

  const renderPageButtons = () => {
    const pages = totalPages > 10 ? [1, 2, 3, 4, 5, 6, 7, '...', totalPages] : Array.from({length: totalPages}, (_, i) => i + 1);
    return pages.map((page, idx) => (
      <button 
        key={idx}
        onClick={() => typeof page === 'number' && setCurrentPage(page)}
        disabled={page === '...'}
        className={`w-10 h-10 flex items-center justify-center text-sm rounded-md border transition-colors font-semibold ${
          currentPage === page 
            ? 'bg-[#1a1c24] text-white border-[#1a1c24] shadow-sm' 
            : 'text-slate-700 bg-white border-gray-200 hover:bg-gray-50'
        } ${page === '...' ? 'cursor-default border-transparent' : ''}`}
      >
        {page}
      </button>
    ));
  };

  const columns = isVPStartMode ? [
    { label: 'User Name', width: '25%' },
    { label: 'Phone', width: '15%' },
    { label: 'Email', width: '20%' },
    { label: 'Address', width: '12%' },
    { label: 'Role', width: '8%' },
    { label: 'Joined Date', width: '10%' },
    { label: 'Action', width: '10%', align: 'right' }
  ] : [
    { label: 'User Name', width: '18%' },
    { label: 'Phone', width: '10%' },
    { label: 'Email', width: '16%' },
    { label: 'Address', width: '10%' },
    { label: 'Role', width: '8%' },
    { label: 'Company', width: '18%' },
    { label: 'Joined Date', width: '10%' },
    { label: 'Action', width: '10%', align: 'right' }
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-b border-gray-100 bg-[#f8fafc]/30 z-20">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-48">
              <select 
                className="appearance-none w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-slate-300 text-slate-300 font-medium cursor-pointer shadow-sm"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-300">
                <ChevronDown size={14} />
              </div>
            </div>
            
            {!isVPStartMode && (
              <div className="relative w-full sm:w-64">
                <select 
                  className="appearance-none w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-slate-300 text-slate-300 font-medium cursor-pointer shadow-sm"
                  value={companyFilter}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    if (e.target.value === 'All Companies') params.delete('company');
                    else params.set('company', e.target.value);
                    setSearchTermParams(params);
                  }}
                >
                  <option value="All Companies">All Companies</option>
                  {MOCK_COMPANIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-300">
                  <ChevronDown size={14} />
                </div>
              </div>
            )}

            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-300 pointer-events-none">
                <Search size={22} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                className="block w-full pl-11 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-300 focus:outline-none focus:border-slate-300 font-medium bg-white shadow-sm text-slate-900" 
                placeholder="Search User"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {selectedIds.size > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
              >
                <Trash2 size={16} />
                <span>Delete ({selectedIds.size})</span>
              </button>
            )}

            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
                <Download size={16} />
                <span>Export</span>
              </button>
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-100 rounded-md shadow-xl hidden group-hover:block z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                <button onClick={() => handleExport('csv')} className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium border-b border-slate-50"><FileText size={14} className="mr-3 text-slate-400" /> CSV</button>
                <button onClick={() => handleExport('excel')} className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium"><FileSpreadsheet size={14} className="mr-3 text-slate-400" /> Excel</button>
              </div>
            </div>

            <button 
              onClick={() => navigate('/user/create')}
              className="flex items-center space-x-2 px-4 py-2 bg-[#1a1c24] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
            >
              <Plus size={16} />
              <span>Add New User</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white custom-scrollbar">
        <div className="w-full min-h-full">
          <table className="w-full text-left table-fixed border-collapse min-w-[1100px]">
            <thead className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
              <tr className="h-[50px]">
                <th className="px-6 w-16 text-center bg-white">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-slate-800 focus:ring-slate-500 cursor-pointer" 
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                {columns.map((col, idx) => (
                  <th 
                    key={idx} 
                    style={{ width: col.width }} 
                    className={`px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white ${col.align === 'right' ? 'text-right pr-12' : ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => {
                  const isSelected = selectedIds.has(user.id);
                  return (
                    <tr 
                      key={user.id} 
                      className={`h-[50px] transition-colors cursor-default group border-b border-gray-50 ${isSelected ? 'bg-slate-50' : 'hover:bg-gray-50/80'}`}
                    >
                      <td className="px-6 text-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 text-slate-800 focus:ring-slate-500 cursor-pointer" 
                          checked={isSelected}
                          onChange={() => toggleSelectRow(user.id)}
                        />
                      </td>
                      <td className="px-4 overflow-hidden">
                        <div className="flex items-center max-w-full">
                          <div className="w-8 h-8 rounded-full border border-slate-100 overflow-hidden mr-3 flex-shrink-0 bg-gray-50 flex items-center justify-center shadow-sm">
                            <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 truncate">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 text-sm text-slate-600 truncate">{user.phone}</td>
                      <td className="px-4 text-sm text-slate-600 truncate">{user.email}</td>
                      <td className="px-4 text-sm text-slate-600 truncate">{user.address}</td>
                      <td className="px-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${isVPStartMode ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-600'}`}>
                          {user.role}
                        </span>
                      </td>
                      {!isVPStartMode && (
                        <td className="px-4 overflow-hidden">
                          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 truncate max-w-full">
                            <Building2 size={14} className="text-slate-300 flex-shrink-0" />
                            <span className="truncate">{user.companyName}</span>
                          </div>
                        </td>
                      )}
                      <td className="px-4 text-sm text-slate-600 font-medium truncate">{user.joinedDate || user.createdAt}</td>
                      <td className="px-4 text-right">
                        <div className="flex items-center justify-end space-x-1 pr-2">
                          <button 
                            className="p-1.5 text-slate-400 hover:text-slate-800 transition-all group-hover:scale-110"
                            onClick={() => { setEditingUser(user); }}
                          >
                            <SquarePen size={18} />
                          </button>
                          <ActionMenu 
                            onEdit={() => navigate(`/user/edit/${user.id}`)} 
                            onView={() => navigate(`/user/detail/${user.id}`)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={isVPStartMode ? 8 : 9} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest opacity-40">No records matched</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex-shrink-0 px-4 py-4 sm:px-8 border-t border-gray-100 bg-white z-20">
        <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[13px] font-medium text-slate-500">
            Showing {filteredUsers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(filteredUsers.length, currentPage * pageSize)} of {filteredUsers.length} Users
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 flex items-center space-x-2 text-sm font-bold text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </button>
              <div className="flex items-center space-x-2">
                {renderPageButtons()}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 flex items-center space-x-2 text-sm font-bold text-slate-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuickEditModal
        item={editingUser}
        isOpen={editingUser !== null}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UserList;