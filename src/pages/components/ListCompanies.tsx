
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  MoreVertical, 
  Edit2,
  ChevronLeft
} from 'lucide-react';
import { MOCK_COMPANIES, PROVINCES } from '../../../Companyconstants';
import { Company } from '../../../types';

const CompanyList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(PROVINCES[0]);
  const [currentPage, setCurrentPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter(company => 
      (searchTerm === '' || company.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedProvince === PROVINCES[0] || company.address === selectedProvince)
    );
  }, [searchTerm, selectedProvince]);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Search & Actions Bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex flex-1 items-center space-x-3">
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded-md py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 w-48"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-[#1a1c24] text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
            <Plus size={16} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="py-5 px-6 w-12">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th className="py-5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="py-5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="py-5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="py-5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
              <th className="py-5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Website</th>
              <th className="py-5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="py-4 px-6">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-50 mr-3 flex-shrink-0 flex items-center justify-center p-1 shadow-sm">
                       <img src={company.logoUrl} alt="" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{company.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{company.phone}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{company.email}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{company.address}</td>
                <td className="py-4 px-4">
                  <a href={`https://${company.website}`} className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block max-w-[200px]" target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                    <button className="p-1.5 text-gray-300 group-hover:text-gray-500 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
          Showing 1 - {filteredCompanies.length} of 45 Companies
        </p>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-1 px-2">
            {[1, 2, 3, 4, 5, 6, 7, '...', 20].map((page, idx) => (
              <button 
                key={idx}
                className={`w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors ${
                  page === currentPage 
                    ? 'bg-[#1a1c24] text-white' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <span>Next</span>
            <ChevronRight size={16} />
          </button>

          <div className="relative pl-4 ml-4 border-l border-gray-200">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
