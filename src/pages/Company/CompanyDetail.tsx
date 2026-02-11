
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COMPANIES } from './CompanyConstants';
import { Company } from '../../../types';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const foundCompany = MOCK_COMPANIES.find(c => c.id === id);
    if (foundCompany) {
      setCompany(foundCompany);
    }
  }, [id]);

  if (!company) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f8fafc]">
        <div className="text-slate-400 font-medium">Company not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">Company Information</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in Detail below is a company information entry</p>
      </div>

      <div className="flex-1 px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-full">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full border border-gray-100 bg-white flex items-center justify-center p-6 relative shadow-sm">
                <img 
                  src={company.logoUrl} 
                  alt={company.name} 
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>

            {/* Information Fields Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Company Name</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.name}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Village</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.village || 'Ou Chum'}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Contact Number</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.phone}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Commune</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.commune || 'Ou Chum'}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Email Address</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.email}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">District</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.district || 'Ou Chum'}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Web Sit URL</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.website}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-500 ml-1">Province</label>
                <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3.5 text-slate-700 font-medium">
                  {company.province || company.address}
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-12">
                <button
                  onClick={() => navigate('/company')}
                  className="px-10 py-2.5 rounded-lg border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate(`/company/edit/${id}`)}
                  className="px-12 py-2.5 rounded-lg bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                >
                  Edit Information
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
