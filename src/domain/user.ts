export interface User {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface TablePagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface TableResponse<T> extends TablePagination {
  data: T[];
}

export interface UsersTable extends TableResponse<User> {}

export interface UserTableRequestParams extends UserFilters {
  page: number;
  per_page: number;
}

export interface UserFilters {
  name: string;
  email: string;
}
