import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { userService } from '../services/UserServices';
import UserTable from '../components/users/UserTable';
import UserFilters from '../components/users/UserFilters';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import UserForm from '../components/users/UserForm';
import { Plus } from 'lucide-react';
import type { User, UserStatus } from '../types';
import { useDebounce } from '../hooks/useDebounce';

const Users: React.FC = () => {
  const queryClient = useQueryClient();
  
  // States para Filtros e Paginação
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Define 5 itens por página para facilitar teste
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');
  
  // Debounce na busca para evitar requisições excessivas
  const debouncedSearch = useDebounce(search, 500);

  // States para Modais
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Busca dados com Paginação e Filtros
  // A chave da query inclui as dependências para refetch automático
  const { data: response, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['users', page, pageSize, debouncedSearch, statusFilter],
    queryFn: () => userService.getUsers(
      { search: debouncedSearch, status: statusFilter },
      { page, pageSize }
    ),
    placeholderData: keepPreviousData, // Mantém dados antigos enquanto carrega novos (UX melhor)
  });

  // Resetar página quando mudar filtros
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  // Mutations (CRUD)
  const createMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsFormOpen(false);
      setEditingUser(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsDeleteOpen(false);
      setUserToDelete(null);
    },
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
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus size={16} />
            Novo Usuário
          </button>
        </div>
      </div>

      {/* Filtros */}
      <UserFilters 
        searchTerm={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Tabela de Listagem */}
      <div className="relative">
        {/* Overlay de loading sutil ao trocar páginas/filtros */}
        {isLoading && isPlaceholderData && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
             {/* Spinner opcional ou apenas opacidade */}
          </div>
        )}
        
        <UserTable 
          users={response?.data || []} 
          isLoading={isLoading && !isPlaceholderData} // Só mostra spinner no load inicial
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Paginação */}
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
          <p className="text-sm text-gray-500">
            Tem certeza que deseja remover o usuário <span className="font-bold text-gray-700">{userToDelete?.name}</span>? Esta ação não pode ser desfeita.
          </p>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
            onClick={handleConfirmDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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