import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md md:hidden"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-slate-700 hidden md:block">
          Painel Administrativo
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;