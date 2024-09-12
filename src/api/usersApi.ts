import { UserTableRequestParams, UsersTable } from 'src/domain/user';
import $axios from './axios';

export class UsersApi {
  static async fetchUsers(params: UserTableRequestParams): Promise<UsersTable> {
    // ? Здесь также можно было добавить дополнительную прослойку с валидацией приходящих данных, например при помощи zod
    const { data } = await $axios.get('/users', { params });
    return data;
  }
}
