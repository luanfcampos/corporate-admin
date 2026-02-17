import type { User, UserFilters, PaginationParams, PaginatedResponse } from '../types';
import { delay } from '../utils/delay';

// Dados mockados mutáveis para simulação
let MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@corp.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    lastLogin: '2024-02-15T10:30:00Z',
    createdAt: '2023-01-10T09:00:00Z',
    avatarUrl: 'https://ui-avatars.com/api/?name=Ana+Silva&background=6366f1&color=fff'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    email: 'carlos.m@corp.com',
    role: 'MANAGER',
    status: 'ACTIVE',
    lastLogin: '2024-02-14T16:20:00Z',
    createdAt: '2023-03-15T14:30:00Z',
  },
  {
    id: '3',
    name: 'Beatriz Costa',
    email: 'bia.costa@corp.com',
    role: 'USER',
    status: 'INACTIVE',
    lastLogin: '2023-12-20T09:15:00Z',
    createdAt: '2023-06-10T11:00:00Z',
  },
  {
    id: '4',
    name: 'João Pedro',
    email: 'jp.souza@corp.com',
    role: 'USER',
    status: 'PENDING',
    lastLogin: '2024-02-15T08:00:00Z',
    createdAt: '2024-02-14T10:00:00Z',
  },
  {
    id: '5',
    name: 'Mariana Oliveira',
    email: 'mari.oli@corp.com',
    role: 'MANAGER',
    status: 'ACTIVE',
    lastLogin: '2024-02-12T18:45:00Z',
    createdAt: '2023-08-05T16:20:00Z',
  },
  {
    id: '6',
    name: 'Roberto Santos',
    email: 'roberto.s@corp.com',
    role: 'USER',
    status: 'ACTIVE',
    lastLogin: '2024-02-10T11:00:00Z',
    createdAt: '2024-01-05T14:00:00Z',
  },
  {
    id: '7',
    name: 'Fernanda Lima',
    email: 'fernanda.l@corp.com',
    role: 'USER',
    status: 'INACTIVE',
    lastLogin: '2023-11-20T09:00:00Z',
    createdAt: '2023-05-12T10:00:00Z',
  }
];

export const userService = {
  getUsers: async (filters: UserFilters, pagination: PaginationParams): Promise<PaginatedResponse<User>> => {
    await delay(600); // Delay reduzido para melhor UX na demo

    let filteredUsers = [...MOCK_USERS];

    // 1. Filtro por Busca (Nome ou Email)
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        user => 
          user.name.toLowerCase().includes(lowerSearch) || 
          user.email.toLowerCase().includes(lowerSearch)
      );
    }

    // 2. Filtro por Status
    if (filters.status && filters.status !== 'ALL') {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    // 3. Paginação
    const total = filteredUsers.length;
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const paginatedData = filteredUsers.slice(start, end);

    return {
      data: paginatedData,
      total,
      totalPages: Math.ceil(total / pagination.pageSize)
    };
  },

  createUser: async (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User> => {
    await delay(800);
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
    };
    MOCK_USERS = [newUser, ...MOCK_USERS];
    return newUser;
  },

  updateUser: async (user: User): Promise<User> => {
    await delay(800);
    MOCK_USERS = MOCK_USERS.map(u => u.id === user.id ? user : u);
    return user;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await delay(800);
    MOCK_USERS = MOCK_USERS.filter(u => u.id !== userId);
  }
};