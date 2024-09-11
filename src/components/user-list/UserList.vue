<template>
  <div class="t-grid t-grid-cols-1 md:t-grid-cols-2 lg:t-grid-cols-3 t-gap-4">
    <UserCard
      v-for="user in users"
      :key="user.id"
      v-bind="user"
      class="t-my-2"
    />
  </div>
</template>
<script setup lang="ts">
import { User } from '../models';
import UserCard from '../user-card/UserCard.vue';

defineProps<{
  users: User[];
}>();
</script>
<style scoped></style>
