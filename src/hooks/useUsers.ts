import { UserFilters } from 'src/domain/user';
import { useUsersStore } from 'src/stores/usersListPageStore';
import { onMounted, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface UseUsers {
  filters: Ref<UserFilters>;
  perPage: Ref<number>;
  perPageOptions: number[];
  loadPageUsers(page?: number): Promise<void>;
  loadMoreUsers(): Promise<void>;
}

export const useUsers = (): UseUsers => {
  const router = useRouter();
  const route = useRoute();
  const usersStore = useUsersStore();
  const { fetchMoreUsers, fetchUsers } = usersStore;

  const perPageOptions = [2, 5, 10, 20];
  const perPageDefault = perPageOptions[1];
  const pageDefault = 1;
  const perPage = ref<number>(perPageDefault);
  const filters = ref<UserFilters>({
    name: '',
    email: '',
  });

  async function loadPageUsers(page: number = pageDefault) {
    await fetchUsers({
      page: page,
      per_page: perPage.value,
      name: filters.value.name,
      email: filters.value.email,
    });
    updateQueryParams();
  }

  async function loadMoreUsers() {
    if (usersStore.hasMore) {
      await fetchMoreUsers({
        page: usersStore.usersData.page + 1,
        per_page: perPage.value,
        name: filters.value.name,
        email: filters.value.email,
      });
      updateQueryParams();
    }
  }

  function updateQueryParams() {
    const queryParams = {
      page:
        usersStore.usersData.page !== pageDefault
          ? usersStore.usersData.page
          : undefined,
      per_page: perPage.value !== perPageDefault ? perPage.value : undefined,
      name: filters.value.name !== '' ? filters.value.name : undefined,
      email: filters.value.email !== '' ? filters.value.email : undefined,
    };
    router.replace({ query: queryParams });
  }
  onMounted(() => {
    const query = route.query;
    if (query.page) usersStore.usersData.page = Number(query.page);
    if (query.per_page) perPage.value = Number(query.per_page);
    if (query.name) filters.value.name = query.name as string;
    if (query.email) filters.value.email = query.email as string;
    loadPageUsers(usersStore.usersData.page);
  });
  return {
    filters,
    perPage,
    perPageOptions,
    loadPageUsers,
    loadMoreUsers,
  };
};
