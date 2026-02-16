export type UserRole = 'ADMIN' | 'MANAGER' | 'USER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string; // ISO String
  createdAt: string; // ISO String
  avatarUrl?: string;
}

export interface UserFilters {
  search: string;
  role?: UserRole | 'ALL';
  status?: UserStatus | 'ALL';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}