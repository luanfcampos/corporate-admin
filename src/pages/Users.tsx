import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userServices';
import UserTable from '../components/users/UserTable';
import { Plus } from 'lucide-react';

const Users: React.FC = () => {
  // Busca dados mockados usando React Query
  // O cache key ['users'] garante que os dados sejam cacheados
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar usuários. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header da Página */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Usuários</h1>
          <p className="mt-2 text-sm text-slate-500">
            Gerencie os membros da sua organização, suas funções e status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus size={16} />
            Novo Usuário
          </button>
        </div>
      </div>

      {/* Tabela de Listagem */}
      <UserTable users={users || []} isLoading={isLoading} />
    </div>
  );
};

export default Users;