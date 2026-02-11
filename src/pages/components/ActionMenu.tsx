
import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, Eye, Trash2 } from 'lucide-react';

interface ActionMenuProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onView, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleAction = (e: React.MouseEvent, action?: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (action) action();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors focus:outline-none"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-[100] overflow-hidden focus:outline-none py-1.5 border border-slate-100 animate-in fade-in zoom-in duration-100 origin-top-right">
          <button
            onClick={(e) => handleAction(e, onView)}
            className="flex items-center w-full px-4 py-3 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors group font-medium"
          >
            <Eye size={16} className="mr-3 text-slate-400 group-hover:text-slate-900" />
            View Meter
          </button>
          <button
            onClick={(e) => handleAction(e, onEdit)}
            className="flex items-center w-full px-4 py-3 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors group font-medium"
          >
            <Edit2 size={16} className="mr-3 text-slate-400 group-hover:text-slate-900" />
            Edit Meter
          </button>
          <div className="h-px bg-slate-100 my-1"></div>
          <button
            onClick={(e) => handleAction(e, onDelete)}
            className="flex items-center w-full px-4 py-3 text-[13px] text-red-600 hover:bg-red-50 transition-colors font-bold group"
          >
            <Trash2 size={16} className="mr-3 text-red-400 group-hover:text-red-600" />
            Delete Meter
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
