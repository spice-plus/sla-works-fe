import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "@/models/common";
import type { CreateUserDto, UpdateUserDto, User } from "@/models/user";

// これはモックサービスです。実際のアプリケーションでは、これらはAPI呼び出しを行います

/**
 * ページネーション付きで全ユーザーを取得
 */
export async function getUsers(
  params?: PaginationParams
): Promise<PaginatedResponse<User>> {
  // モック実装
  const mockResponse: PaginatedResponse<User> = {
    data: [],
    pagination: {
      page: params?.page || 1,
      limit: params?.limit || 10,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };

  return Promise.resolve(mockResponse);
}

/**
 * IDで単一ユーザーを取得
 */
export async function getUserById(_id: string): Promise<ApiResponse<User>> {
  // モック実装
  const mockResponse: ApiResponse<User> = {
    data: {} as User,
    status: 200,
    timestamp: new Date().toISOString(),
  };

  return Promise.resolve(mockResponse);
}

/**
 * 新しいユーザーを作成
 */
export async function createUser(_data: CreateUserDto): Promise<ApiResponse<User>> {
  // モック実装
  const mockResponse: ApiResponse<User> = {
    data: {} as User,
    message: "ユーザーが正常に作成されました",
    status: 201,
    timestamp: new Date().toISOString(),
  };

  return Promise.resolve(mockResponse);
}

/**
 * 既存ユーザーを更新
 */
export async function updateUser(
  _id: string,
  _data: UpdateUserDto
): Promise<ApiResponse<User>> {
  // モック実装
  const mockResponse: ApiResponse<User> = {
    data: {} as User,
    message: "ユーザーが正常に更新されました",
    status: 200,
    timestamp: new Date().toISOString(),
  };

  return Promise.resolve(mockResponse);
}

/**
 * ユーザーを削除
 */
export async function deleteUser(_id: string): Promise<ApiResponse<void>> {
  // モック実装
  const mockResponse: ApiResponse<void> = {
    data: undefined,
    message: "ユーザーが正常に削除されました",
    status: 200,
    timestamp: new Date().toISOString(),
  };

  return Promise.resolve(mockResponse);
}

/**
 * クエリでユーザーを検索
 */
export async function searchUsers(_query: string): Promise<ApiResponse<User[]>> {
  // モック実装
  const mockResponse: ApiResponse<User[]> = {
    data: [],
    status: 200,
    timestamp: new Date().toISOString(),
  };

  return Promise.resolve(mockResponse);
}
