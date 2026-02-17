import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { settings, updateSettings } = useSettings();

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md md:hidden"
          aria-label="Abrir menu principal"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 hidden md:block">
          Painel Administrativo
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Botão de Tema */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          aria-label="Alternar tema"
          title={settings.theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          {settings.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notificações */}
        <button 
          className="p-2 text-slate-400 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative"
          aria-label="Notificações"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;