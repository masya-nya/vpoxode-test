import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type {
  UserTableRequestParams,
  User,
  TablePagination,
} from 'src/domain/user';
import { UsersApi } from 'src/api/usersApi';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const usersData = ref<TablePagination>({
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  });

  // ? Хоть фильтрация через API и не работает (по причине неработающего API), я все равно считаю эту реализацию
  // ? верной так как локальная фильтрация данных одной страницы является плохим UX кейсом
  async function fetchUsers(params: UserTableRequestParams): Promise<void> {
    try {
      const data = await UsersApi.fetchUsers(params);
      const { data: fetchUsers, ...fetchUsersData } = data;
      users.value = fetchUsers;
      usersData.value = fetchUsersData;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  async function fetchMoreUsers(params: UserTableRequestParams): Promise<void> {
    try {
      const data = await UsersApi.fetchUsers(params);
      const { data: fetchUsers, ...fetchUsersData } = data;
      users.value = [...users.value, ...fetchUsers];
      usersData.value = fetchUsersData;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  const hasMore = computed<boolean>(() => {
    return usersData.value.total_pages > usersData.value.page;
  });

  const moreLoadCount = computed<number>(() => {
    const remainingUsers =
      usersData.value.total - usersData.value.page * usersData.value.per_page;
    return remainingUsers > usersData.value.per_page
      ? usersData.value.per_page
      : remainingUsers;
  });

  return {
    users,
    usersData,
    fetchUsers,
    fetchMoreUsers,
    moreLoadCount,
    hasMore,
  };
});
