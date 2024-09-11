<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="onSelectChange"
    :options="options"
    :label="label"
  />
</template>
<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const props = defineProps<{
  modelValue: number;
  options: (number | string)[];
  queryKey: string;
  defaultValue: number | string;
  label?: string;
}>();

const route = useRoute();
const router = useRouter();

const onSelectChange = (newValue: number) => {
  if (newValue !== props.defaultValue) {
    router.replace({ query: { [props.queryKey]: newValue } });
  }
  emit('update:modelValue', newValue);
};

onMounted(() => {
  const query = route.query;
  const queryValue = parseInt(query[props.queryKey] as string);
  if (queryValue) {
    if (queryValue === props.defaultValue) {
      router.replace({ query: { [props.queryKey]: null } });
    }
    emit('update:modelValue', queryValue);
  }
});
</script>
<style scoped></style>
