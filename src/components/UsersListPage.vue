<template>
  <q-page padding>
    <div class="t-flex t-justify-between t-items-center t-mb-4">
      <q-input
        v-model="filters.name"
        label="Фильтр по имени"
        @update:model-value="debounceLoadPageUsers()"
        class="t-w-1/4"
      />
      <q-input
        v-model="filters.email"
        label="Фильтр по email"
        @update:model-value="debounceLoadPageUsers()"
        class="t-w-1/4"
      />
      <q-select
        v-model="perPage"
        :options="perPageOptions"
        label="Элементов на странице"
        @update:model-value="loadPageUsers()"
        class="t-w-1/6"
      />
    </div>

    <UsersList :users="usersStore.users" />

    <div class="t-flex t-justify-between t-items-center t-mt-6">
      <div>
        <q-btn
          v-show="hasMore"
          @click="loadMoreUsers"
          :label="`Показать ещё ${moreLoadCount > 0 ? moreLoadCount : ''}`"
        />
      </div>
      <q-pagination
        v-model="usersStore.usersData.page"
        :max="usersStore.usersData.total_pages"
        @update:model-value="loadPageUsers"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UsersList from './users-list/UsersList.vue';
import { useUsersStore } from 'src/stores/usersListPageStore';
import { debounce } from 'quasar';
import { UserQueryKeys } from './consts';
import { Filters } from './models';

const router = useRouter();
const route = useRoute();
const usersStore = useUsersStore();
const { fetchMoreUsers, fetchUsers } = usersStore;

const perPageOptions = [2, 5, 10, 20];
const perPageDefault = perPageOptions[1];
const pageDefault = 1;
const perPage = ref<number>(perPageDefault);
const filters = ref<Filters>({
  [UserQueryKeys.name]: '',
  [UserQueryKeys.email]: '',
});

const hasMore = computed<boolean>(() => {
  return usersStore.usersData.total_pages > usersStore.usersData.page;
});

const moreLoadCount = computed<number>(() => {
  const remainingUsers =
    usersStore.usersData.total -
    usersStore.usersData.page * usersStore.usersData.per_page;
  return remainingUsers > perPage.value ? perPage.value : remainingUsers;
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

const debounceLoadPageUsers = debounce(loadPageUsers, 500);

async function loadMoreUsers() {
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
  const queryParams = {
    [UserQueryKeys.page]:
      usersStore.usersData.page !== pageDefault
        ? usersStore.usersData.page
        : undefined,
    [UserQueryKeys.perPage]:
      perPage.value !== perPageDefault ? perPage.value : undefined,
    [UserQueryKeys.name]:
      filters.value.name !== '' ? filters.value.name : undefined,
    [UserQueryKeys.email]:
      filters.value.email !== '' ? filters.value.email : undefined,
  };
  router.replace({ query: queryParams });
}

onMounted(() => {
  const query = route.query;
  if (query[UserQueryKeys.page]) usersStore.usersData.page = Number(query.page);
  if (query[UserQueryKeys.perPage]) perPage.value = Number(query.per_page);
  if (query[UserQueryKeys.name]) filters.value.name = query.name as string;
  if (query[UserQueryKeys.email]) filters.value.email = query.email as string;
  loadPageUsers(usersStore.usersData.page);
});
</script>

<style scoped></style>
