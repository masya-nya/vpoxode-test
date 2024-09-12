import { UserQueryKeys } from './consts';

export interface User {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface UserData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface PageData extends UserData {
  data: User[];
}

export interface FetchDataDTO {
  [UserQueryKeys.page]: number;
  [UserQueryKeys.perPage]: number;
  [UserQueryKeys.name]: string;
  [UserQueryKeys.email]: string;
}

export interface Filters {
  [UserQueryKeys.name]: string;
  [UserQueryKeys.email]: string;
}
