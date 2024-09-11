<template>
  <q-card class="t-my-2">
    <q-card-section>
      <q-avatar>
        <img
          :src="avatar"
          alt="User Avatar"
          class="t-w-full t-h-40 t-object-cover"
        />
      </q-avatar>

      <div class="t-text-lg t-font-bold">{{ first_name }} {{ last_name }}</div>
      <div>{{ email }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { User } from '../models';

defineProps<User>();
</script>
<style scoped></style>
