import React, { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { Save, User, Monitor, Settings as SettingsIcon, Moon, Sun } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';

const Settings: React.FC = () => {
  const { settings, isLoading, updateSettings, saveSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveSettings();
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="h-8 w-48" />
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          Configurações
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Gerencie suas preferências de perfil e interface.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Seção 1: Perfil do Usuário */}
        <section className="bg-white dark:bg-slate-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="flex items-center gap-x-3 mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Perfil do Usuário</h2>
            </div>
            
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
                  Nome de Exibição
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={settings.userName}
                    onChange={(e) => updateSettings({ userName: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
                  Endereço de Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    value={settings.userEmail}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-slate-400 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-slate-700 bg-gray-50 dark:bg-slate-900/50 sm:text-sm sm:leading-6 px-3 cursor-not-allowed opacity-75"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">O email é gerenciado pelo administrador do sistema.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Preferências de Interface */}
        <section className="bg-white dark:bg-slate-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="flex items-center gap-x-3 mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Aparência e Interface</h2>
            </div>

            <div className="space-y-8">
              {/* Tema */}
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Tema da Aplicação</legend>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Escolha como a interface deve ser apresentada.</p>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {/* Opção CLARO */}
                  <div 
                    onClick={() => updateSettings({ theme: 'light' })}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${
                      settings.theme === 'light' 
                      ? 'border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' 
                      : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="flex items-center gap-2 block text-sm font-medium text-gray-900 dark:text-white">
                          <Sun className="h-4 w-4" /> Claro
                        </span>
                        <span className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">Padrão visual limpo e clássico.</span>
                      </span>
                    </span>
                    <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${settings.theme === 'light' ? 'border-indigo-600' : 'border-gray-300 dark:border-slate-500'}`}>
                      {settings.theme === 'light' && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                    </span>
                  </div>

                  {/* Opção ESCURO */}
                  <div 
                    onClick={() => updateSettings({ theme: 'dark' })}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${
                      settings.theme === 'dark' 
                      ? 'border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' 
                      : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="flex items-center gap-2 block text-sm font-medium text-gray-900 dark:text-white">
                          <Moon className="h-4 w-4" /> Escuro
                        </span>
                        <span className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">Melhor para ambientes com pouca luz.</span>
                      </span>
                    </span>
                    <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${settings.theme === 'dark' ? 'border-indigo-600' : 'border-gray-300 dark:border-slate-500'}`}>
                      {settings.theme === 'dark' && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                    </span>
                  </div>
                </div>
              </fieldset>

              {/* Densidade */}
              <div className="border-t border-gray-100 dark:border-slate-700 pt-8">
                <div className="flex items-center justify-between">
                  <label htmlFor="density" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Densidade das Tabelas
                  </label>
                  <select
                    id="density"
                    value={settings.tableDensity}
                    onChange={(e) => updateSettings({ tableDensity: e.target.value as any })}
                    className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-slate-900 ring-1 ring-inset ring-gray-300 dark:ring-slate-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="normal">Normal (Confortável)</option>
                    <option value="compact">Compacta (Mais dados)</option>
                  </select>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Define o espaçamento vertical nas listagens de dados.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: Configurações Gerais */}
        <section className="bg-white dark:bg-slate-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="flex items-center gap-x-3 mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <SettingsIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Geral</h2>
            </div>
            
            <div className="max-w-xl">
              <label htmlFor="itemsPerPage" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Itens por página
              </label>
              <div className="mt-2">
                <select
                  id="itemsPerPage"
                  name="itemsPerPage"
                  value={settings.itemsPerPage}
                  onChange={(e) => updateSettings({ itemsPerPage: Number(e.target.value) })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={10}>10 itens</option>
                  <option value={20}>20 itens</option>
                  <option value={50}>50 itens</option>
                </select>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Define a quantidade padrão de registros exibidos nas tabelas do sistema.
              </p>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-x-6 py-4">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-wait transition-all"
          >
            <Save size={16} />
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
