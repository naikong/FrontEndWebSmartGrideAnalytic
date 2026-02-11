import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  ChevronDown, 
  LayoutDashboard,
  Menu as MenuIcon,
  X,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const TopNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/company", label: "Company" },
    { to: "/user", label: "User" },
    { to: "/upload", label: "Upload" },
    { to: "/dashboard", label: "Dashboard" }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 z-50 h-[58px] flex-shrink-0">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between h-full sm:justify-center">
        <div className="flex items-center space-x-2 sm:hidden">
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold tracking-widest text-gray-900 uppercase">Web Smart</span>
        </div>

        <div className="hidden sm:flex h-full space-x-8 md:space-x-12">
          {navLinks.map(link => (
            <NavLink 
              key={link.to}
              to={link.to} 
              className={({ isActive }) => 
                `flex items-center px-2 font-medium border-b-2 transition-all duration-200 ${isActive ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button 
          className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-[58px] left-0 right-0 bg-white shadow-xl border-b border-gray-100 sm:hidden z-50 py-2 flex flex-col space-y-1">
          {navLinks.map(link => (
            <NavLink 
              key={link.to}
              to={link.to} 
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `px-4 py-3 font-medium transition-colors ${isActive ? 'bg-slate-50 text-gray-900 border-l-4 border-gray-800' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const [lang, setLang] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/dashboard';
  const isUserModule = location.pathname.startsWith('/user');
  const isCompanyModule = location.pathname.startsWith('/company');
  const isUploadModule = location.pathname.startsWith('/upload');

  const isCustomer = isUserModule && (location.pathname === '/user' || location.pathname === '/user/customer');
  const isVPStart = isUserModule && location.pathname === '/user/vpstart';
  const isMeter = isUploadModule && (location.search === '' || location.search.includes('tab=meter'));
  const isAlarm = isUploadModule && location.search.includes('tab=alarm');
  const isInstant = isUploadModule && location.search.includes('tab=instant');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) setIsLangOpen(false);
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'kh', name: 'Khmer', flag: 'https://flagcdn.com/w40/kh.png' }
  ];
  const currentLang = languages.find(l => l.code === lang);

  const handleLogout = () => {
    setIsProfileOpen(false);
    navigate('/login');
  };

  if (isDashboard) return null;

  return (
    <footer className="bg-[#eff2f5] border-t border-gray-200 px-4 sm:px-8 flex items-center justify-between z-50 h-[64px] flex-shrink-0 relative transition-colors duration-300">
      <div className="flex items-center space-x-3 w-1/4">
        <div className="w-9 h-9 flex items-center justify-center">
            <img src="https://cdn-icons-png.flaticon.com/512/1053/1053155.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-extrabold tracking-widest text-gray-800 uppercase leading-none">Web Smart</span>
          <span className="text-[9px] text-gray-400 uppercase leading-none mt-1 font-bold tracking-widest">Grid Analytics</span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center space-x-8">
        {isUploadModule ? (
          <>
            <button onClick={() => navigate('/upload?tab=meter')} className={`text-[12px] px-4 py-1.5 font-bold transition-all duration-200 ${isMeter ? 'bg-[#1a1c24] text-white rounded-lg shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Upload Meter</button>
            <button onClick={() => navigate('/upload?tab=alarm')} className={`text-[12px] px-4 py-1.5 font-bold transition-all duration-200 ${isAlarm ? 'bg-[#1a1c24] text-white rounded-lg shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Upload Alarm</button>
            <button onClick={() => navigate('/upload?tab=instant')} className={`text-[12px] px-4 py-1.5 font-bold transition-all duration-200 ${isInstant ? 'bg-[#1a1c24] text-white rounded-lg shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Upload Instant</button>
          </>
        ) : isUserModule ? (
            <>
              <button onClick={() => navigate('/user/vpstart')} className={`text-[12px] px-4 py-1.5 font-bold transition-all duration-200 ${isVPStart ? 'bg-[#1a1c24] text-white rounded-lg shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>VPStart User</button>
              <button onClick={() => navigate('/user')} className={`text-[12px] px-4 py-1.5 font-bold transition-all duration-200 ${isCustomer ? 'bg-[#1a1c24] text-white rounded-lg shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Customer</button>
            </>
        ) : isCompanyModule ? (
          <>
            <button onClick={() => navigate('/company')} className={`text-[12px] px-4 py-1.5 font-bold transition-all duration-200 ${location.pathname === '/company' ? 'bg-[#1a1c24] text-white rounded-lg shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>List Companies</button>
            <button onClick={() => navigate('/company/create')} className={`text-[12px] px-4 py-1.5 font-bold transition-all duration-200 ${location.pathname === '/company/create' ? 'bg-[#1a1c24] text-white rounded-lg shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Create Company</button>
          </>
        ) : (
          <div className="px-4 py-1.5 text-[11px] text-gray-500 font-bold uppercase tracking-widest bg-white/50 rounded-full border border-gray-100">System Monitoring Active</div>
        )}
      </div>

      <div className="flex items-center space-x-6 w-1/4 justify-end">
        <div className="relative" ref={langDropdownRef}>
          <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center hover:opacity-80 transition-opacity">
            <img src={currentLang?.flag} alt={currentLang?.name} className="w-6 h-4.5 object-cover rounded-sm shadow-sm" />
          </button>
          {isLangOpen && (
            <div className="absolute bottom-full right-0 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl w-36 py-1 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              {languages.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setIsLangOpen(false); }} className={`flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${lang === l.code ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600'}`}>
                  <img src={l.flag} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="text-[#1a1c24] hover:opacity-70 transition-opacity relative">
          <Bell size={20} strokeWidth={2} />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="relative" ref={profileDropdownRef}>
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-3 pl-1 pr-4 py-1 bg-[#cbd5e1]/40 hover:bg-[#cbd5e1]/60 rounded-full transition-all group">
            <div className="w-9 h-9 rounded-full border border-white overflow-hidden shadow-sm">
              <img src="https://i.pravatar.cc/150?u=admin" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <p className="text-[13px] font-bold text-[#5c6b8a] tracking-wider uppercase hidden lg:block">User</p>
          </button>

          {isProfileOpen && (
            <div className="absolute bottom-full right-0 mb-6 w-[320px] bg-white rounded-[2rem] shadow-[0_10px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 z-50 border border-slate-100">
              <div className="px-6 py-8 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full border-[5px] border-white bg-white overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                    <img src="https://i.pravatar.cc/150?u=admin" alt="User Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800 leading-none">User</h3>
                  <p className="text-sm text-slate-500 font-medium mt-2">user@gmail.com</p>
                </div>
              </div>
              <div className="mx-8 h-[1px] bg-slate-100"></div>
              <div className="py-4 px-3 space-y-1">
                <button onClick={() => { setIsProfileOpen(false); navigate('/user/detail/u1'); }} className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors rounded-2xl group"><div className="flex items-center space-x-5"><UserIcon size={22} className="text-slate-700" strokeWidth={1.5} /><span className="text-[15px] font-semibold text-slate-800">My Profile</span></div><ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400" /></button>
                <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors rounded-2xl group"><div className="flex items-center space-x-5"><Settings size={22} className="text-slate-700" strokeWidth={1.5} /><span className="text-[15px] font-semibold text-slate-800">Account Settings</span></div><ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400" /></button>
                <div className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors rounded-2xl group cursor-default"><div className="flex items-center space-x-5"><Bell size={22} className="text-slate-700" strokeWidth={1.5} /><span className="text-[15px] font-semibold text-slate-800">Notification</span></div><span className="text-[14px] font-medium text-slate-400">Allow</span></div>
                <button onClick={handleLogout} className="w-full flex items-center space-x-5 px-6 py-4 hover:bg-red-50 transition-colors rounded-2xl group text-slate-800 hover:text-red-600"><LogOut size={22} className="group-hover:text-red-500" strokeWidth={1.5} /><span className="text-[15px] font-bold">Log Out</span></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Explicitly ensure the app is in light mode by removing 'dark' class
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <TopNav />
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};