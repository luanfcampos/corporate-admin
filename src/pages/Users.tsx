import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { userService } from '../services/userServices';
import UserTable from '../components/users/UserTable';
import UserFilters from '../components/users/UserFilters';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import UserForm from '../components/users/UserForm';
import ErrorState from '../components/ui/ErrorState';
import { Plus } from 'lucide-react';
import type { User, UserStatus } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../hooks/useToast';

const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  
  // States para Filtros e Paginação
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');
  
  const debouncedSearch = useDebounce(search, 500);

  // States para Modais
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Busca dados
  const { 
    data: response, 
    isLoading, 
    isError, 
    isPlaceholderData, 
    refetch 
  } = useQuery({
    queryKey: ['users', page, pageSize, debouncedSearch, statusFilter],
    queryFn: () => userService.getUsers(
      { search: debouncedSearch, status: statusFilter },
      { page, pageSize }
    ),
    placeholderData: keepPreviousData,
  });

  // Resetar página quando mudar filtros
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsFormOpen(false);
      addToast('Usuário criado com sucesso!', 'success');
    },
    onError: () => {
      addToast('Erro ao criar usuário.', 'error');
    }
  });

  const updateMutation = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsFormOpen(false);
      setEditingUser(null);
      addToast('Usuário atualizado com sucesso!', 'success');
    },
    onError: () => {
      addToast('Erro ao atualizar usuário.', 'error');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsDeleteOpen(false);
      setUserToDelete(null);
      addToast('Usuário removido com sucesso!', 'success');
    },
    onError: () => {
      addToast('Erro ao remover usuário.', 'error');
    }
  });

  // Handlers
  const handleCreate = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (editingUser) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          {/* ✅ CORRIGIDO: Adicionado dark:text-white */}
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Usuários</h1>
          {/* ✅ CORRIGIDO: Adicionado dark:text-slate-400 */}
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Gerencie os membros da sua organização, suas funções e status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            <Plus size={16} />
            Novo Usuário
          </button>
        </div>
      </div>

      <UserFilters 
        searchTerm={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <>
          <div className="relative">
            {/* ✅ CORRIGIDO: Adicionado dark:bg-slate-900/50 */}
            {isLoading && isPlaceholderData && (
              <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 transition-opacity" />
            )}
            
            <UserTable 
              users={response?.data || []} 
              isLoading={isLoading && !isPlaceholderData}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>

          {response && (
            <Pagination 
              currentPage={page}
              totalPages={response.totalPages}
              totalItems={response.total}
              pageSize={pageSize}
              onPageChange={setPage}
              disabled={isLoading || isPlaceholderData}
            />
          )}
        </>
      )}

      {/* Modal de Formulário (Criar/Editar) */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
      >
        <UserForm
          initialData={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Excluir Usuário"
        maxWidth="sm"
      >
        <div className="mt-2">
          {/* ✅ CORRIGIDO: Adicionado dark:text-gray-400 e dark:text-gray-300 */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tem certeza que deseja remover o usuário{' '}
            <span className="font-bold text-gray-700 dark:text-gray-300">
              {userToDelete?.name}
            </span>
            ? Esta ação não pode ser desfeita.
          </p>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2 transition-colors disabled:opacity-70"
            onClick={handleConfirmDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
          </button>
          {/* ✅ CORRIGIDO: Adicionado dark:bg-slate-800, dark:text-white, dark:ring-slate-600, dark:hover:bg-slate-700 */}
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 sm:col-start-1 sm:mt-0 transition-colors"
            onClick={() => setIsDeleteOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;