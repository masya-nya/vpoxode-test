import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

import type { FetchDataDTO, PageData, User, UserData } from 'components/models';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const usersData = ref<UserData>({
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  });

  async function fetchUsers(params: FetchDataDTO): Promise<void> {
    try {
      const { data } = await axios.get<PageData>(
        'https://reqres.in/api/users',
        {
          params,
        },
      );
      const { data: fetchUsers, ...fetchUsersData } = data;
      users.value = fetchUsers;
      usersData.value = fetchUsersData;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  async function fetchMoreUsers(params: FetchDataDTO): Promise<void> {
    try {
      const { data } = await axios.get<PageData>(
        'https://reqres.in/api/users',
        {
          params,
        },
      );
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
