import { FetchDataDTO, PageData } from 'src/components/models';
import $axios from './axios';

export class UsersApi {
  static async fetchUsers(params: FetchDataDTO): Promise<PageData> {
    const { data } = await $axios.get('/users', { params });
    return data;
  }
}
