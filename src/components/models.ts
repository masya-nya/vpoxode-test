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
  page: number;
  per_page: number;
  name: string;
  email: string;
}
