// アプリケーション全体で使用される共通の型定義

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  timestamp: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface QueryFilters {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  [key: string]: unknown;
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: Address;
}

export type SortOrder = "asc" | "desc";
export type Status = "active" | "inactive" | "pending" | "archived";
