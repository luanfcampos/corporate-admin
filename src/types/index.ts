
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
  status?: UserStatus | 'ALL';
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
}
