import type { User } from '../types';
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
  }
];

export const userService = {
  getUsers: async (): Promise<User[]> => {
    await delay(800);
    return [...MOCK_USERS]; // Retorna uma cópia para evitar mutação direta externa
  },

  createUser: async (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User> => {
    await delay(800);
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(), // Simula login imediato ou nulo
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