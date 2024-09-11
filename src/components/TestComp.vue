<template>
  <q-page padding>
    <div class="t-flex t-justify-between t-items-center t-mb-4">
      <q-input
        v-model="filters.name"
        label="Фильтр по имени"
        @keydown.enter="loadPageData()"
        class="t-w-1/4"
      />
      <q-input
        v-model="filters.email"
        label="Фильтр по email"
        @keydown.enter="loadPageData()"
        class="t-w-1/4"
      />
      <q-select
        v-model="perPage"
        :options="perPageOptions"
        label="Элементов на странице"
        @update:model-value="loadPageData()"
        class="t-w-1/6"
      />
    </div>

    <UserList :users="usersStore.users" />

    <div class="t-flex t-justify-between t-items-center t-mt-6">
      <q-btn
        @click="loadMoreData"
        :label="`Показать ещё ${moreLoadCount > 0 ? moreLoadCount : ''}`"
        :disable="!hasMore"
      />
      <q-pagination
        v-model="usersStore.usersData.page"
        :max="usersStore.usersData.total_pages"
        @update:model-value="loadPageData"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserList from './user-list/UserList.vue';
import { useUsersStore } from 'src/stores/users';

const usersStore = useUsersStore();

const perPageOptions = [2, 5, 10, 20];
const perPage = ref(perPageOptions[1]);
const filters = ref({ name: '', email: '' });

const hasMore = computed(() => {
  return usersStore.usersData.total_pages > usersStore.usersData.page;
});

const moreLoadCount = computed(() => {
  const remainingUsers =
    usersStore.usersData.total -
    usersStore.usersData.page * usersStore.usersData.per_page;
  return remainingUsers > perPage.value ? perPage.value : remainingUsers;
});

const router = useRouter();
const route = useRoute();

const { fetchMoreUsers, fetchUsers } = usersStore;

async function loadPageData(page: number = 1) {
  await fetchUsers({
    page: page,
    per_page: perPage.value,
    name: filters.value.name,
    email: filters.value.email,
  });
  updateQueryParams();
}

async function loadMoreData() {
  if (hasMore.value) {
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
  const queryParams: Record<string, string | number> = {
    ...(usersStore.usersData.page !== 1
      ? { page: usersStore.usersData.page }
      : {}),
    ...(perPage.value !== 5 ? { per_page: perPage.value } : {}),
  };
  router.replace({ query: queryParams });
}

onMounted(() => {
  const query = route.query;
  if (query.page) usersStore.usersData.page = Number(query.page);
  if (query.per_page) perPage.value = Number(query.per_page);
  loadPageData(usersStore.usersData.page);
});
</script>

<style scoped></style>
