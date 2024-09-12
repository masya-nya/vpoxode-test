import { FetchDataDTO, PageData } from 'src/components/models';
import $axios from './axios';

export class UsersApi {
  static async fetchUsers(params: FetchDataDTO): Promise<PageData> {
    // ? Здесь также можно было добавить дополнительную прослойку с валидацией приходящих данных, например при помощи zod
    const { data } = await $axios.get('/users', { params });
    return data;
  }
}
