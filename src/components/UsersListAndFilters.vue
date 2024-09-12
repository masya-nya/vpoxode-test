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
          v-show="usersStore.hasMore"
          @click="loadMoreUsers"
          :label="`Показать ещё ${usersStore.moreLoadCount > 0 ? usersStore.moreLoadCount : ''}`"
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
import { debounce } from 'quasar';
import { useUsers } from 'src/hooks/useUsers';
import { useUsersStore } from 'src/stores/usersListPageStore';
import UsersList from './users-list/UsersList.vue';

const usersStore = useUsersStore();
const { filters, perPage, perPageOptions, loadMoreUsers, loadPageUsers } =
  useUsers();

const debounceLoadPageUsers = debounce(loadPageUsers, 500);
</script>

<style scoped></style>
