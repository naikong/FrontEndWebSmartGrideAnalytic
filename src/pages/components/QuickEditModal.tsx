
import React, { useState, useEffect } from 'react';
import { X, SquarePen } from 'lucide-react';
import { User, Company, Meter } from '../../../types';

interface QuickEditModalProps {
  item: User | Company | Meter | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: any) => void;
}

const QuickEditModal: React.FC<QuickEditModalProps> = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (item) {
      if ('serial' in item) {
        setFormData({ ...item });
      } else if ('name' in item && !('website' in item)) {
        const names = (item as User).name.split(' ');
        setFormData({
          ...item,
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          gender: (item as User).gender || 'Female',
          roles: (item as User).role || 'Admin'
        });
      } else {
        const company = item as Company;
        setFormData({ 
          ...company,
          village: company.village || 'Ta Khmau',
          commune: company.commune || 'Ta Khmau',
          district: company.district || 'Ta Khmau.',
          province: company.province || company.address || 'Kandal'
        });
      }
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const isMeter = 'serial' in item;
  const isUser = !isMeter && 'name' in item && !('website' in item);
  const isCompany = !isMeter && !isUser;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <SquarePen className="text-slate-800" size={24} />
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Quick Edit</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {isMeter ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Meter Name</label>
                  <input type="text" value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Meter Category</label>
                  <input type="text" value={formData.type || ''} onChange={(e) => handleChange('type', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Meter Serial</label>
                  <input type="text" value={formData.serial || ''} onChange={(e) => handleChange('serial', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Meter Group</label>
                  <input type="text" value={formData.group || ''} onChange={(e) => handleChange('group', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Meter Ratio</label>
                  <input type="text" value={formData.ration || ''} onChange={(e) => handleChange('ration', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Tr-Capacity</label>
                  <input type="text" value={formData.trCap || ''} onChange={(e) => handleChange('trCap', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Meter Brand</label>
                  <input type="text" value={formData.brand || ''} onChange={(e) => handleChange('brand', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Tr-Brand</label>
                  <input type="text" value={formData.trBrand || ''} onChange={(e) => handleChange('trBrand', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 outline-none" />
                </div>
              </>
            ) : isCompany ? (
              /* Company Quick Edit - Exact match to user screenshot */
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Company Name</label>
                  <input type="text" value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Village</label>
                  <input type="text" value={formData.village || ''} onChange={(e) => handleChange('village', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Contact Number</label>
                  <input type="text" value={formData.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Commune</label>
                  <input type="text" value={formData.commune || ''} onChange={(e) => handleChange('commune', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Email Address</label>
                  <input type="email" value={formData.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">District</label>
                  <input type="text" value={formData.district || ''} onChange={(e) => handleChange('district', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Website URL</label>
                  <input type="text" value={formData.website || ''} onChange={(e) => handleChange('website', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Province</label>
                  <input type="text" value={formData.province || ''} onChange={(e) => handleChange('province', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
              </>
            ) : (
              /* User Quick Edit */
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">First Name</label>
                  <input type="text" value={formData.firstName || ''} onChange={(e) => handleChange('firstName', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Last Name</label>
                  <input type="text" value={formData.lastName || ''} onChange={(e) => handleChange('lastName', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Gender</label>
                  <select value={formData.gender || ''} onChange={(e) => handleChange('gender', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none appearance-none">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Address</label>
                  <input type="text" value={formData.address || ''} onChange={(e) => handleChange('address', e.target.value)} className="w-full bg-[#f0f2f5] border-none rounded-md px-4 py-3.5 text-slate-700 font-medium outline-none" />
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 mt-12 pt-8 border-t border-gray-50">
            <button type="button" onClick={onClose} className="px-10 py-3 rounded-md border border-gray-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-10 py-3 rounded-md bg-[#0f172a] text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-200">
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickEditModal;
