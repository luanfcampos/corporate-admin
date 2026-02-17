import React from 'react';
import type { User } from '../../types';
import Badge from '../ui/Badge';
import { Edit2, Trash2, SearchX } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { useSettings } from '../../hooks/useSettings';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, isLoading, onEdit, onDelete }) => {
  const { settings } = useSettings();
  const densityClass = settings.tableDensity === 'compact' ? 'py-2' : 'py-4';

  // Skeleton Loading State
  if (isLoading) {
    return (
      <div className="overflow-hidden bg-white dark:bg-slate-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-900/50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left sm:pl-6"><Skeleton className="h-4 w-20" /></th>
                <th className="px-3 py-3.5"><Skeleton className="h-4 w-16" /></th>
                <th className="px-3 py-3.5"><Skeleton className="h-4 w-16" /></th>
                <th className="px-3 py-3.5"><Skeleton className="h-4 w-24" /></th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="ml-4 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4"><Skeleton className="h-5 w-16 rounded-full" /></td>
                  <td className="whitespace-nowrap px-3 py-4"><Skeleton className="h-5 w-20 rounded-full" /></td>
                  <td className="whitespace-nowrap px-3 py-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right sm:pr-6">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Empty State
  if (users.length === 0) {
    return (
      <EmptyState 
        icon={SearchX}
        title="Nenhum usuário encontrado"
        description="Não encontramos registros com os filtros atuais. Tente buscar outro termo ou limpar os filtros."
      />
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
      case 'PENDING': return 'warning';
      default: return 'neutral';
    }
  };

  const getRoleVariant = (role: string) => {
    return role === 'ADMIN' ? 'default' : 'neutral';
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-slate-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 sm:rounded-lg transition-all">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-900/50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-400 sm:pl-6">
                Usuário
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-400">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-400">
                Função
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-400">
                Último Login
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className={`whitespace-nowrap ${densityClass} pl-4 pr-3 sm:pl-6`}>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {user.avatarUrl ? (
                        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-medium">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-gray-500 dark:text-slate-400 text-sm">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className={`whitespace-nowrap px-3 ${densityClass}`}>
                  <Badge variant={getStatusVariant(user.status)}>
                    {user.status}
                  </Badge>
                </td>
                <td className={`whitespace-nowrap px-3 ${densityClass}`}>
                  <Badge variant={getRoleVariant(user.role)}>
                    {user.role}
                  </Badge>
                </td>
                <td className={`whitespace-nowrap px-3 ${densityClass} text-sm text-gray-500 dark:text-slate-400`}>
                  {new Date(user.lastLogin).toLocaleDateString()}
                  <span className="text-xs ml-1 opacity-70">
                     {new Date(user.lastLogin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </td>
                <td className={`relative whitespace-nowrap ${densityClass} pl-3 pr-4 text-right text-sm font-medium sm:pr-6`}>
                  <button 
                    onClick={() => onEdit(user)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4 transition-colors p-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    aria-label={`Editar usuário ${user.name}`}
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(user)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
                    aria-label={`Excluir usuário ${user.name}`}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
