import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FetchDataDTO, User, UserData } from 'components/models';
import { UsersApi } from 'src/api/usersApi';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const usersData = ref<UserData>({
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  });

  // ? Хоть фильтрация через API и не работает (по причине неработающего API), все равно считаю эту реализацию
  // ? верной так как локальная фильтрация данных одной страницы является плохим UX кейсом

  async function fetchUsers(params: FetchDataDTO): Promise<void> {
    try {
      const data = await UsersApi.fetchUsers(params);
      const { data: fetchUsers, ...fetchUsersData } = data;
      users.value = fetchUsers;
      usersData.value = fetchUsersData;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  async function fetchMoreUsers(params: FetchDataDTO): Promise<void> {
    try {
      const data = await UsersApi.fetchUsers(params);
      const { data: fetchUsers, ...fetchUsersData } = data;
      users.value = [...users.value, ...fetchUsers];
      usersData.value = fetchUsersData;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  return {
    users,
    usersData,
    fetchUsers,
    fetchMoreUsers,
  };
});
