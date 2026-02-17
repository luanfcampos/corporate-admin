import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { UserStatus } from '../../types';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: UserStatus | 'ALL';
  onStatusChange: (status: UserStatus | 'ALL') => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="sm:w-48">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as UserStatus | 'ALL')}
          >
            <option value="ALL">Todos os Status</option>
            <option value="ACTIVE">Ativo</option>
            <option value="INACTIVE">Inativo</option>
            <option value="PENDING">Pendente</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;